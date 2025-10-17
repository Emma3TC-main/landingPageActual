import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

type Course = Tables<'courses'>;

const Courses = () => {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set());
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);

      // 1. Obtener el ID del estudiante actual
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user.email) {
        setLoading(false);
        return;
      }
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('id')
        .eq('email', session.user.email)
        .single();
      
      if (studentError || !student) {
        console.error("No se encontró el perfil del estudiante:", studentError);
        setLoading(false);
        return;
      }
      const currentStudentId = student.id;
      setStudentId(currentStudentId);

      // 2. Obtener todos los cursos disponibles y los cursos en los que ya está inscrito
      const [coursesRes, enrolledRes] = await Promise.all([
        supabase.from('courses').select('*'),
        supabase.from('student_courses').select('course_id').eq('student_id', currentStudentId)
      ]);

      if (coursesRes.data) setAllCourses(coursesRes.data);
      if (enrolledRes.data) {
        const ids = new Set(enrolledRes.data.map(e => e.course_id));
        setEnrolledCourseIds(ids);
      }
      
      setLoading(false);
    };
    initialize();
  }, []);

  const handleEnroll = async (courseId: string) => {
    if (!studentId) return;

    // Insertar la nueva inscripción en la base de datos
    const { error } = await supabase
      .from('student_courses')
      .insert({ student_id: studentId, course_id: courseId, progreso: 0 });
    
    if (error) {
      toast({ title: "Error al inscribirse", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "¡Inscripción exitosa!", description: "Ahora puedes ver el curso en tu dashboard." });
      // Actualizar la UI para reflejar la nueva inscripción
      setEnrolledCourseIds(prevIds => new Set(prevIds).add(courseId));
    }
  };

  if (loading || !studentId) {
    return (
        <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
            Cargando cursos...
        </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex">
      <Sidebar studentId={studentId} />
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <Navbar />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto w-full max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Cursos Disponibles</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses.map(course => {
              const isEnrolled = enrolledCourseIds.has(course.id);
              return (
                <div key={course.id} className="bg-card p-6 rounded-lg shadow-lg flex flex-col justify-between" style={{ boxShadow: 'var(--shadow-card)' }}>
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-2">{course.nombre}</h2>
                    <p className="text-muted-foreground text-sm mb-4">{course.descripcion}</p>
                  </div>
                  <Button 
                    onClick={() => handleEnroll(course.id)}
                    disabled={isEnrolled}
                    className="w-full mt-4"
                  >
                    {isEnrolled ? 'Ya estás inscrito' : 'Inscribirme'}
                  </Button>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;
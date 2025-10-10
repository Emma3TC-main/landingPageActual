import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type CourseProgressData = {
  progreso: number | null;
  courses: {
    nombre: string;
  } | null;
}[];

const CourseProgress: React.FC<{ studentId: string }> = ({ studentId }) => {
  const [courses, setCourses] = useState<CourseProgressData>([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from('student_courses')
        .select('progreso, courses(nombre)')
        .eq('student_id', studentId);
      
      if (error) console.error("Error fetching course progress:", error);
      else if (data) setCourses(data as CourseProgressData);
    };
    fetchProgress();
  }, [studentId]);

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg" style={{ boxShadow: 'var(--shadow-card)' }}>
      <h3 className="text-lg font-bold text-foreground mb-4">Progreso de Cursos</h3>
      <div className="space-y-4">
        {courses.length > 0 ? courses.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-foreground">{item.courses?.nombre || 'Curso Desconocido'}</span>
              <span className="text-sm font-bold text-primary">{item.progreso || 0}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="h-2 rounded-full" style={{ width: `${item.progreso || 0}%`, background: 'var(--gradient-primary)' }}></div>
            </div>
          </div>
        )) : <p className="text-muted-foreground text-sm">No hay cursos inscritos.</p>}
      </div>
    </div>
  );
};

export default CourseProgress;
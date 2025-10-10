import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import ProfileDashboard from '@/components/dashboard/ProfileDashboard';

import '@/App.css'; 

const StudentDashboard = () => {
  const { studentId: studentIdFromUrl } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState<string | null>(studentIdFromUrl || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // La lógica para buscar datos no ha cambiado
    const fetchStudentId = async () => {
      if (studentIdFromUrl) {
        setStudentId(studentIdFromUrl); setLoading(false); return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { navigate('/'); return; }
      const userEmail = session.user.email;
      if (!userEmail) { setError("Error: No se pudo obtener el email del usuario."); setLoading(false); return; }
      const { data: student, error: studentError } = await supabase.from('students').select('id').eq('email', userEmail).single();
      if (studentError || !student) {
        console.error("Error al buscar perfil:", studentError);
        setError("No tienes un perfil de estudiante asignado.");
        setLoading(false);
        return;
      }
      setStudentId(student.id);
      setLoading(false);
    };
    fetchStudentId();
  }, [studentIdFromUrl, navigate]);

  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Cargando Dashboard...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-destructive">{error}</div>;
  if (!studentId) return <div className="flex justify-center items-center h-screen text-xl">No se pudo determinar el estudiante a mostrar.</div>;

  return (
    // Contenedor principal de pantalla completa (esto está bien)
    <div className="bg-background text-foreground min-h-screen flex">
      <Sidebar studentId={studentId} />
      
      {/* Contenedor para la parte derecha (Navbar + Contenido) */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <Navbar />

        {/* --- ESTE ES EL CAMBIO CLAVE --- */}
        {/* Envolvemos el contenido principal en un div que lo centra y le da un ancho máximo */}
        <div className="w-full max-w-7xl mx-auto flex-1 p-6">
          <ProfileDashboard studentId={studentId} />
        </div>
        
      </div>
    </div>
  );
};

export default StudentDashboard;


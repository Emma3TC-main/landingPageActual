import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- PASO 1: Importar useNavigate
import { supabase } from '@/integrations/supabase/client'; // <--- PASO 2: Importar Supabase
import type { Tables } from '@/integrations/supabase/types';

type Student = Tables<'students'>;
interface SidebarProps {
  studentId: string;
}

// --- Iconos SVG ---
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const CoursesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"></path></svg>;
// ---> PASO 3: Añadir un ícono para Cerrar Sesión <---
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;


const Sidebar: React.FC<SidebarProps> = ({ studentId }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const navigate = useNavigate(); // <--- PASO 4: Inicializar useNavigate

  useEffect(() => {
    // ... (la lógica de fetch no cambia) ...
    const fetchStudent = async () => {
      if (!studentId) return;
      const { data, error } = await supabase.from('students').select('*').eq('id', studentId).single();
      if (error) console.error("Error fetching student for sidebar:", error);
      else setStudent(data);
    };
    fetchStudent();
  }, [studentId]);

  // ---> PASO 5: Crear la función para manejar el logout <---
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error);
    } else {
      navigate('/'); // Redirige al inicio después de cerrar sesión
    }
  };

  if (!student) {
    return <aside className="hidden lg:block w-72 flex-shrink-0 p-6 animate-pulse"></aside>;
  }

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0 p-6 border-r border-border">
      <div className="bg-card p-6 rounded-lg text-center shadow-lg h-full flex flex-col" style={{ boxShadow: 'var(--shadow-card)' }}>
        <img
          className="w-24 h-24 rounded-full mx-auto border-4 border-primary"
          style={{ boxShadow: 'var(--shadow-glow)' }}
          src={student.avatar || `https://i.pravatar.cc/150?u=${student.id}`}
          alt="Profile"
        />
        <h2 className="mt-4 text-xl font-bold text-foreground">{student.nombre} {student.apellido}</h2>
        <p className="text-sm text-muted-foreground">ID: {student.id.substring(0, 8).toUpperCase()}</p>
        <div className="border-t border-border my-6"></div>
        <nav className="space-y-2 text-left flex-grow">
          <a href="#" className="flex items-center space-x-3 px-4 py-2 rounded-md bg-secondary text-primary-foreground font-semibold">
            <DashboardIcon />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-secondary transition-colors">
            <ProfileIcon />
            <span>Perfil</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-secondary transition-colors">
            <CoursesIcon />
            <span>Cursos</span>
          </a>
        </nav>
        {/* ---> PASO 6: Añadir el botón de logout al final <--- */}
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-2 mt-6 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogoutIcon />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;


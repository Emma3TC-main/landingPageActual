import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useToast } from "@/hooks/use-toast";

type Student = Tables<'students'>;
interface SidebarProps {
  studentId: string;
}

// --- Iconos SVG (sin cambios) ---
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const CoursesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"></path></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const LoaderIcon = () => <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>;


const Sidebar: React.FC<SidebarProps> = ({ studentId }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- ¡CORRECCIÓN CLAVE AQUÍ! Restauramos la lógica dentro del useEffect ---
  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) return;
      const { data, error } = await supabase.from('students').select('*').eq('id', studentId).single();
      if (error) {
        console.error("Error fetching student for sidebar:", error);
      } else {
        setStudent(data);
      }
    };
    fetchStudent();
  }, [studentId]);
  // --------------------------------------------------------------------

  const handleLogout = async () => {
    console.log("Botón de Cerrar Sesión clickeado.");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({ title: "Sesión cerrada", description: "Has salido de tu cuenta de forma segura." });
      navigate('/');
    } catch (error: any) {
      console.error("Error detallado al cerrar sesión:", error);
      toast({ title: "Error al cerrar sesión", description: error.message, variant: "destructive" });
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) throw new Error('Debes seleccionar una imagen.');
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const userId = (await supabase.auth.getUser()).data.user?.id;
      if (!userId) throw new Error("No se pudo obtener el ID del usuario.");
      
      const filePath = `${userId}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      const { error: updateError } = await supabase.from('students').update({ avatar: publicUrl }).eq('id', studentId);
      if (updateError) throw updateError;
      
      if (student) setStudent({ ...student, avatar: publicUrl });
      toast({ title: "¡Foto de perfil actualizada!" });
    } catch (error: any) {
      toast({ title: "Error al subir la imagen", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  if (!student) {
    return <aside className="hidden lg:block w-72 flex-shrink-0 p-6 animate-pulse"></aside>;
  }

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0 p-6 border-r border-border">
      <div className="bg-card p-6 rounded-lg text-center shadow-lg h-full flex flex-col" style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="relative mx-auto group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <img
            className="w-24 h-24 rounded-full border-4 border-primary group-hover:opacity-75 transition-opacity"
            style={{ boxShadow: 'var(--shadow-glow)' }}
            src={student.avatar || `https://i.pravatar.cc/150?u=${student.id}`}
            alt="Profile"
          />
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {uploading ? <LoaderIcon /> : <span className="text-xs font-bold text-white">Cambiar</span>}
          </div>
        </div>
        <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} accept="image/png, image/jpeg" style={{ display: 'none' }} disabled={uploading} />
        <h2 className="mt-4 text-xl font-bold text-foreground">{student.nombre} {student.apellido}</h2>
        <p className="text-sm text-muted-foreground">ID: {student.id.substring(0, 8).toUpperCase()}</p>
        <div className="border-t border-border my-6"></div>
        <nav className="space-y-2 text-left flex-grow">
          <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-secondary transition-colors">
            <DashboardIcon />
            <span>Dashboard</span>
          </Link>
          <Link to="#" className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-secondary transition-colors">
            <ProfileIcon />
            <span>Perfil</span>
          </Link>
          <Link to="/courses" className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-secondary transition-colors">
            <CoursesIcon />
            <span>Cursos</span>
          </Link>
        </nav>
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
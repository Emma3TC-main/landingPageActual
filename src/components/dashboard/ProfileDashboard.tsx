import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import StudentInfo from './StudentInfo';
import CourseProgress from './CourseProgress';
import Recommendations from './Recommendations';
import StatsCard from './StatsCard';
import DataDetails from './DataDetails';

interface ProfileDashboardProps {
  studentId: string;
}

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ studentId }) => {
  return (
    // --- CAMBIO AQUÍ: Añadimos clases para controlar el ancho y centrado ---
    <main className="flex-1 p-6 space-y-6 overflow-y-auto w-full max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard del Estudiante</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Principal */}
        <div className="lg:col-span-2 space-y-6">
          <StudentInfo studentId={studentId} />
          <CourseProgress studentId={studentId} />
          <Recommendations studentId={studentId} />
        </div>
        {/* Columna Lateral */}
        <div className="space-y-6">
          <Stats studentId={studentId} />
          <DataDetails studentId={studentId} />
        </div>
      </div>
    </main>
  );
};

// Componente auxiliar para cargar y mostrar las estadísticas
const Stats: React.FC<{ studentId: string }> = ({ studentId }) => {
  const [stats, setStats] = useState<{ tasa_exito: number | null, promedio_general: number | null } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('students')
        .select('tasa_exito, promedio_general')
        .eq('id', studentId)
        .single();
      if (error) console.error("Error fetching stats:", error);
      else setStats(data);
    };
    fetchStats();
  }, [studentId]);

  return (
    <>
      <StatsCard title="Tasa de Éxito" value={`${stats ? parseFloat(stats.tasa_exito?.toString() || '0').toFixed(0) : 0}%`} description="Promedio de progreso" icon="trending" color="green" />
      <StatsCard title="Promedio General" value={`${stats ? parseFloat(stats.promedio_general?.toString() || '0').toFixed(2) : 0}`} description="Calificación media" icon="check" color="blue" />
    </>
  );
};

export default ProfileDashboard;


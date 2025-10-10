import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Stat = Tables<'student_stats'>;

const DataDetails: React.FC<{ studentId: string }> = ({ studentId }) => {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const { data, error } = await supabase.from('student_stats').select('*').eq('student_id', studentId);
      if (error) console.error("Error fetching student stats:", error);
      else setStats(data);
    };
    fetchDetails();
  }, [studentId]);

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg" style={{ boxShadow: 'var(--shadow-card)' }}>
      <h3 className="text-lg font-bold text-foreground mb-4">Estadísticas Mensuales</h3>
      <table className="w-full text-sm text-left">
        <thead className="border-b border-border">
          <tr>
            <th className="pb-2 font-semibold text-muted-foreground">Mes</th>
            <th className="pb-2 font-semibold text-muted-foreground text-center">Promedio</th>
            <th className="pb-2 font-semibold text-muted-foreground text-right">Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {stats.length > 0 ? stats.map(stat => (
            <tr key={stat.id} className="border-b border-border last:border-b-0">
              <td className="py-3 font-medium text-foreground">{stat.mes}</td>
              <td className="py-3 text-center text-muted-foreground">{stat.promedio}</td>
              <td className="py-3 text-right text-muted-foreground">{stat.asistencia}%</td>
            </tr>
          )) : (
            <tr>
              <td colSpan={3} className="py-3 text-center text-muted-foreground">No hay estadísticas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataDetails;
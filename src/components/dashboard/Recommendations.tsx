import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Tip = Tables<'ai_tips'>;

const Recommendations: React.FC<{ studentId: string }> = ({ studentId }) => {
  const [tips, setTips] = useState<Tip[]>([]);

  useEffect(() => {
    const fetchTips = async () => {
      const { data, error } = await supabase.from('ai_tips').select('*').eq('student_id', studentId).limit(3);
      if (error) console.error("Error fetching AI tips:", error);
      else setTips(data);
    };
    fetchTips();
  }, [studentId]);

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg" style={{ boxShadow: 'var(--shadow-card)' }}>
      <h3 className="text-lg font-bold text-foreground mb-4">Recomendaciones (IA)</h3>
      <ul className="space-y-3">
        {tips.length > 0 ? tips.map(tip => (
          <li key={tip.id} className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">{tip.categoria}:</span> {tip.contenido}
          </li>
        )) : <p className="text-muted-foreground text-sm">No hay recomendaciones disponibles.</p>}
      </ul>
    </div>
  );
};

export default Recommendations;
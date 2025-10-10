import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Student = Tables<'students'>;

const StudentInfo: React.FC<{ studentId: string }> = ({ studentId }) => {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      const { data, error } = await supabase.from('students').select('*').eq('id', studentId).single();
      if (error) console.error("Error fetching student info:", error);
      else setStudent(data);
    };
    fetchStudentInfo();
  }, [studentId]);

  if (!student) return <div className="bg-card rounded-lg p-6 animate-pulse h-40"></div>;

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg" style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-center space-x-6">
        <img src={student.avatar || `https://i.pravatar.cc/150?u=${student.id}`} alt="Profile" className="w-24 h-24 rounded-full border-4 border-primary" />
        <div>
          <h2 className="text-2xl font-bold text-foreground">{student.nombre} {student.apellido}</h2>
          <p className="text-muted-foreground">Ciclo: {student.ciclo}</p>
          <p className="text-muted-foreground">Email: {student.email}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
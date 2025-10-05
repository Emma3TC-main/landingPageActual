import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lightbulb, Loader2 } from "lucide-react";

interface RecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string | null;
}

interface Tip {
  id: string;
  student_id: string;
  categoria: string;
  contenido: string;
  created_at: string;
}

export const RecommendationsModal = ({ isOpen, onClose, studentId }: RecommendationsModalProps) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && studentId) {
      loadTips();
    }
  }, [isOpen, studentId]);

  const loadTips = async () => {
    if (!studentId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_tips')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTips((data as Tip[]) || []);
    } catch (error: unknown) {
      console.error('Error loading tips:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedTips = tips.reduce<Record<string, Tip[]>>((acc, tip) => {
    if (!acc[tip.categoria]) {
      acc[tip.categoria] = [];
    }
    acc[tip.categoria].push(tip);
    return acc;
  }, {});

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            Recomendaciones y Tips Personalizados
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No hay tips generados aún. Define el perfil de personalidad del estudiante para generar recomendaciones.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTips).map(([categoria, categoryTips]) => (
              <Card key={categoria}>
                <CardHeader>
                  <CardTitle className="text-lg">{categoria}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {categoryTips.map((tip) => (
                      <li key={tip.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <p className="text-sm flex-1">{tip.contenido}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-end pt-4">
              <Button onClick={onClose}>Cerrar</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

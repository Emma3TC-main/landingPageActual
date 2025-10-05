import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Award, Clock } from "lucide-react";
import type { StudentData } from "./AdminSidebar";

interface StudentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentData: StudentData | null;
}

export const StudentDetailsModal = ({ isOpen, onClose, studentData }: StudentDetailsModalProps) => {
  if (!studentData) return null;

  const mockStats = [
    { mes: "Enero", promedio: 85, asistencia: 95 },
    { mes: "Febrero", promedio: 87, asistencia: 92 },
    { mes: "Marzo", promedio: 90, asistencia: 98 },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Estadísticas Detalladas - {studentData.nombre} {studentData.apellido}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* KPIs Principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Tasa de Éxito
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{studentData.tasa_exito}%</span>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Promedio General
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{studentData.promedio_general}</span>
                  <Award className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Ciclo Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{studentData.ciclo}</span>
                  <Clock className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progreso Mensual */}
          <Card>
            <CardHeader>
              <CardTitle>Progreso Mensual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold">{stat.mes}</p>
                      <div className="flex gap-4 mt-2">
                        <Badge variant="secondary">Promedio: {stat.promedio}</Badge>
                        <Badge variant="outline">Asistencia: {stat.asistencia}%</Badge>
                      </div>
                    </div>
                    {stat.promedio > 85 ? (
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Análisis Predictivo */}
          <Card>
            <CardHeader>
              <CardTitle>Análisis Predictivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="text-sm">Riesgo de deserción: <strong className="text-green-600">Bajo</strong></p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="text-sm">Probabilidad de graduación: <strong className="text-green-600">Alta (92%)</strong></p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <p className="text-sm">Áreas de mejora: <strong className="text-yellow-600">Gestión del tiempo</strong></p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={onClose}>Cerrar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

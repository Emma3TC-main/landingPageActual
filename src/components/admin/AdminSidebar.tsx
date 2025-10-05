import { LayoutDashboard, Users, Mail, Settings, FileText, BarChart3 } from "lucide-react";
import { useState } from "react";
import { StudentDetailsModal } from "./StudentDetailsModal";
import { RecommendationsModal } from "./RecommendationsModal";

// Definimos la interfaz para los datos del estudiante
export interface StudentData {
  id: string;
  nombre: string;
  apellido: string;
  tasa_exito: number;
  promedio_general: number;
  ciclo: string;
}

interface AdminSidebarProps {
  selectedStudentId: string | null;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", action: "dashboard" },
  { icon: BarChart3, label: "Estadísticas", action: "stats" },
  { icon: FileText, label: "Recomendaciones", action: "recommendations" },
  { icon: Mail, label: "Mensajes", action: "messages" },
  { icon: Users, label: "Alumnos", action: "students" },
  { icon: Settings, label: "Configuración", action: "settings" },
];

export const AdminSidebar = ({ selectedStudentId }: AdminSidebarProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const handleItemClick = (action: string) => {
    if (!selectedStudentId && action !== "dashboard" && action !== "settings") {
      return;
    }
    setActiveModal(action);
  };

  return (
    <>
      <aside className="bg-card border-r border-border h-full flex flex-col items-center py-6 gap-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(item.action)}
            disabled={!selectedStudentId && item.action !== "dashboard" && item.action !== "settings"}
            className={`p-3 rounded-lg transition-all duration-200 hover:bg-accent group relative ${
              !selectedStudentId && item.action !== "dashboard" && item.action !== "settings"
                ? "text-muted-foreground/50 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title={item.label}
          >
            <item.icon className="h-6 w-6" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              {item.label}
              {!selectedStudentId && item.action !== "dashboard" && item.action !== "settings" && (
                <span className="block text-xs text-muted-foreground">(Selecciona un alumno)</span>
              )}
            </span>
          </button>
        ))}
      </aside>

      {/* Modales */}
      <StudentDetailsModal
        isOpen={activeModal === "stats"}
        onClose={() => setActiveModal(null)}
        studentData={studentData}
      />

      <RecommendationsModal
        isOpen={activeModal === "recommendations"}
        onClose={() => setActiveModal(null)}
        studentId={selectedStudentId}
      />
    </>
  );
};

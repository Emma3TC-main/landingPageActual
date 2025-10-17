import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Registro from "./pages/Registro";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/StudentDashboard";
import Courses from "./pages/Courses"; // <-- CAMBIO 1: Importamos la nueva página de cursos

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          {/* La vista de admin a un perfil específico */}
          <Route path="/admin/student/:studentId" element={<StudentDashboard />} />
          {/* La vista del propio estudiante a su perfil */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          {/* --- CAMBIO 2: Añadimos la nueva ruta para la página de cursos --- */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


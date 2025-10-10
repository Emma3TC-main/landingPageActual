import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Autenticación con Supabase (esto no cambia)
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData?.user) {
        // CAMBIO 1: La consulta ahora busca CUALQUIER rol, no solo 'admin'.
        // Usamos .single() porque esperamos que cada usuario tenga exactamente un rol.
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", authData.user.id)
          .single(); // .single() en lugar de .maybeSingle()

        if (roleError) throw roleError;

        // CAMBIO 2: Verificamos si se encontró un rol.
        if (!roleData) {
          await supabase.auth.signOut(); // Por seguridad, cerramos sesión si no tiene rol.
          throw new Error("El usuario no tiene un rol asignado.");
        }

        // CAMBIO 3: Lógica de redirección basada en el rol encontrado.
        const userRole = roleData.role;

        if (userRole === 'admin') {
          toast({
            title: "Inicio de sesión de Administrador exitoso",
            description: "Redirigiendo al panel de administración...",
          });
          onClose();
          navigate("/admin");
        } else if (userRole === 'user') {
          toast({
            title: "Inicio de sesión de Estudiante exitoso",
            description: "Redirigiendo a tu dashboard...",
          });
          onClose();
          navigate("/dashboard"); // <-- ¡Redirigimos al dashboard del estudiante!
        } else {
          // Si el rol no es ni 'admin' ni 'user'
          await supabase.auth.signOut();
          throw new Error("Rol de usuario no reconocido.");
        }
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      const message =
        error instanceof Error ? error.message : "Credenciales incorrectas";
      toast({
        title: "Error al iniciar sesión",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Iniciar Sesión
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

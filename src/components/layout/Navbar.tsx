import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Ghost, Snowflake, Sun, Leaf, Sparkles } from "lucide-react";

interface NavbarProps {
  onLoginClick: () => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export const Navbar = ({ onLoginClick, isAuthenticated, onLogout }: NavbarProps) => {
  const [seasonContent, setSeasonContent] = useState<{ icon: JSX.Element; text: string } | null>(null);

  useEffect(() => {
    const month = new Date().getMonth() + 1; // Enero = 1

    if (month === 12) {
      // 🎄 Navidad y Fin de Año
      setSeasonContent({
        icon: (
          <div className="relative flex items-center">
            <Snowflake className="h-7 w-7 text-blue-400 animate-spin-slow drop-shadow-glow" />
            <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-yellow-300 animate-ping" />
          </div>
        ),
        text: "🎄 Ofertas de Navidad & Fin de Año 🎁",
      });
    } else if (month === 11) {
      // 🛍️ Black Friday
      setSeasonContent({
        icon: (
          <div className="relative flex items-center">
            <Leaf className="h-7 w-7 text-amber-600 animate-float drop-shadow-md" />
          </div>
        ),
        text: "🔥 Black Friday: Descuentos especiales 🔥",
      });
    } else if (month === 10) {
      // 🎃 Halloween
      setSeasonContent({
        icon: (
          <div className="relative flex items-center">
            <Ghost className="h-7 w-7 text-orange-500 animate-bounce" />
            <span className="absolute -bottom-1 text-xs text-purple-500 animate-pulse">👻</span>
          </div>
        ),
        text: "🎃 Halloween: Dulce o descuento 👀",
      });
    } else if (month >= 6 && month <= 8) {
      // ☀️ Verano
      setSeasonContent({
        icon: (
          <div className="relative flex items-center">
            <Sun className="h-7 w-7 text-yellow-400 animate-spin-slow" />
            <span className="absolute -top-2 -left-2 animate-pulse text-orange-300">✨</span>
          </div>
        ),
        text: "☀️ Promos de Verano: Refresca tus compras 🌴",
      });
    } else if (month >= 9 && month <= 11) {
      // 🍂 Otoño (genérico si no es Black Friday)
      setSeasonContent({
        icon: (
          <div className="relative flex items-center">
            <Leaf className="h-7 w-7 text-amber-600 animate-float drop-shadow-md" />
          </div>
        ),
        text: "🍂 Otoño de ofertas 🍁",
      });
    } else {
      // ❄️ Invierno (Enero - Marzo, por ejemplo)
      setSeasonContent({
        icon: (
          <div className="relative flex items-center">
            <Snowflake className="h-7 w-7 text-cyan-300 animate-pulse" />
          </div>
        ),
        text: "❄️ Ofertas de Invierno ⛄",
      });
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-lg">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + icono y oferta */}
        <div className="flex items-center gap-3">
          {seasonContent?.icon && (
            <span className="transition-transform hover:scale-110">{seasonContent.icon}</span>
          )}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
            Naje
          </h1>
          {seasonContent?.text && (
            <span className="ml-3 text-sm font-semibold text-primary animate-pulse">
              {seasonContent.text}
            </span>
          )}
        </div>

        {/* Botón Login/Logout */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Button
              variant="outline"
              onClick={onLogout}
              className="gap-2 hover:shadow-glow transition-all"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          ) : (
            <Button
              variant="cta"
              onClick={onLoginClick}
              className="shadow-glow hover:scale-105 transition-transform"
            >
              Iniciar Sesión
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

// src/components/landing/SeasonalDecorations.tsx
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // si usas shadcn, si no, reemplaza por `${className}` directo

type SeasonalDecorationsProps = {
  className?: string;
};

export const SeasonalDecorations = ({
  className = "fixed inset-0 -z-10 pointer-events-none",
}: SeasonalDecorationsProps) => {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setMonth(new Date().getMonth() + 1);
    }, 1000 * 60 * 60); // actualiza cada hora
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("absolute w-full h-full overflow-hidden", className)}>
{/* 🎃 Halloween */}
{month === 10 && (
  <div className={className}>
    {/* Calabazas saltando */}
    {[...Array(6)].map((_, i) => (
      <span
        key={`pumpkin-${i}`}
        className="absolute text-5xl animate-bounce"
        style={{
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 90 + 5}%`,
          animationDelay: `${i * 0.5}s`,
        }}
      >
        🎃
      </span>
    ))}

    {/* Fantasmas flotando */}
    {[...Array(4)].map((_, i) => (
      <span
        key={`ghost-${i}`}
        className="absolute text-4xl animate-float"
        style={{
          top: `${Math.random() * 85}%`,
          left: `${Math.random() * 95}%`,
          animationDelay: `${i * 0.7}s`,
        }}
      >
        👻
      </span>
    ))}

    {/* Murciélagos que revolotean */}
    {[...Array(5)].map((_, i) => (
      <span
        key={`bat-${i}`}
        className="absolute text-3xl animate-pulse"
        style={{
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 95}%`,
          animationDuration: `${2 + Math.random() * 3}s`,
        }}
      >
        🦇
      </span>
    ))}

    {/* Telarañas en esquinas */}
    <span className="absolute top-0 left-0 text-5xl">🕸️</span>
    <span className="absolute top-0 right-0 text-5xl">🕸️</span>
    <span className="absolute bottom-0 left-0 text-5xl">🕸️</span>
    <span className="absolute bottom-0 right-0 text-5xl">🕸️</span>
  </div>
)}


      {/* ❄️ Navidad */}
      {month === 12 &&
        [...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute text-xl animate-fall"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 95}%`,
              animationDuration: `${5 + Math.random() * 5}s`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ❄️
          </span>
        ))}

      {/* 🌸 Primavera */}
      {month >= 3 &&
        month <= 5 &&
        [...Array(10)].map((_, i) => (
          <span
            key={i}
            className="absolute text-3xl animate-float"
            style={{
              top: `${Math.random() * 85}%`,
              left: `${Math.random() * 95}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            🌸
          </span>
        ))}

      {/* ✨ Partículas de luz genéricas */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`glow-${i}`}
          className="absolute w-32 h-32 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 90}%`,
            backgroundColor: i % 2 === 0 ? "#60a5fa" : "#f472b6", // azul y rosa
            animationDelay: `${i * 1.2}s`,
          }}
        />
      ))}
    </div>
  );
};

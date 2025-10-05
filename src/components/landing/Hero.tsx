import { Button } from "@/components/ui/button";
import { Code2, Rocket, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onCTAClick?: () => void;
}

export const Hero = ({ onCTAClick }: HeroProps) => {
  const navigate = useNavigate();

  const handleCTA = () => {
    if (onCTAClick) {
      onCTAClick(); // Si desde afuera te pasan un handler, lo usas
    } else {
      navigate("/registro"); // Si no, por defecto redirige al registro
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/4827823/4827823-uhd_2732_1440_25fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2732_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </div>

      {/* Animated Tech Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-tech-blue/20 font-mono text-lg transform -rotate-12 animate-pulse">
          const fullStack = {"{"}
          <br />
          &nbsp;&nbsp;frontend: ['React', 'TypeScript', 'Tailwind'],
          <br />
          &nbsp;&nbsp;backend: ['Node.js', 'Express', 'MongoDB'],
          <br />
          &nbsp;&nbsp;tools: ['Git', 'Docker', 'AWS'],
          <br />
          &nbsp;&nbsp;career: 'unlimited'
          <br />
          {"}"}
        </div>
        <div className="absolute bottom-32 right-32 text-tech-green/20 font-mono text-lg transform rotate-12 animate-pulse delay-1000">
          function transformLife() {"{"}
          <br />
          &nbsp;&nbsp;const currentSalary = 30000;
          <br />
          &nbsp;&nbsp;const newSalary = currentSalary * 3;
          <br />
          &nbsp;&nbsp;return {"{"}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;freedom: true,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;growth: 'infinite',
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;happiness: newSalary
          <br />
          &nbsp;&nbsp;{"}"};
          <br />
          {"}"}
        </div>
        <div className="absolute top-1/3 left-10 text-tech-purple/20 font-mono text-base animate-bounce">
          {"<YourFuture />"}
        </div>
        <div className="absolute top-2/3 right-20 text-tech-orange/20 font-mono text-base animate-bounce delay-500">
          npm install success
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center px-4 py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border mb-8 animate-fade-up">
          <Zap className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium">
            Próximo grupo inicia en enero 2025
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Conviértete en
          </span>
          <br />
          <span className="text-foreground">Full Stack Developer</span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-normal">
            en solo 6 meses intensivos
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 animate-fade-up">
          Domina el stack tecnológico más demandado:{" "}
          <span className="text-tech-blue font-semibold">
            React, Node.js, MongoDB/PostgreSQL
          </span>
          . Construye 6 proyectos profesionales, recibe mentoría personalizada
          de desarrolladores senior, y únete a una comunidad activa de{" "}
          <span className="text-accent font-semibold">
            +500 graduados empleados
          </span>
          .
        </p>

        <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
          <div className="grid md:grid-cols-3 gap-4 text-sm bg-card/30 rounded-xl p-6 backdrop-blur-sm border border-border/50">
            <div className="text-center">
              <div className="text-tech-blue font-bold mb-1">
                🎯 100% Práctico
              </div>
              <p className="text-muted-foreground">
                Sin teoría aburrida, solo proyectos reales desde el día 1
              </p>
            </div>
            <div className="text-center">
              <div className="text-tech-green font-bold mb-1">
                💼 Garantía Laboral
              </div>
              <p className="text-muted-foreground">
                95% de nuestros graduados consigue trabajo en 6 meses
              </p>
            </div>
            <div className="text-center">
              <div className="text-tech-purple font-bold mb-1">
                🚀 Mentoría 1:1
              </div>
              <p className="text-muted-foreground">
                Acompañamiento personal de developers senior
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-up">
          <Button
            size="lg"
            variant="cta"
            onClick={handleCTA}
            className="text-lg px-12 py-6 animate-glow"
          >
            <Rocket className="w-6 h-6 mr-3" />
            Comenzar Ahora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 border-border hover:bg-secondary"
          >
            <Code2 className="w-6 h-6 mr-3" />
            Ver Temario
          </Button>
        </div>
        {/* Expanded Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-6xl mx-auto">
          <div className="text-center p-4 bg-card/20 rounded-lg backdrop-blur-sm border border-border/30">
            <div className="text-4xl font-bold text-tech-blue mb-2">500+</div>
            <p className="text-muted-foreground text-sm">Graduados empleados</p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              En empresas como MercadoLibre, Globant, Rappi
            </p>
          </div>
          <div className="text-center p-4 bg-card/20 rounded-lg backdrop-blur-sm border border-border/30">
            <div className="text-4xl font-bold text-tech-green mb-2">95%</div>
            <p className="text-muted-foreground text-sm">
              Tasa de empleabilidad
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Dentro de los primeros 6 meses
            </p>
          </div>
          <div className="text-center p-4 bg-card/20 rounded-lg backdrop-blur-sm border border-border/30">
            <div className="text-4xl font-bold text-tech-purple mb-2">$85K</div>
            <p className="text-muted-foreground text-sm">
              Salario promedio USD
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Primer trabajo como Full Stack
            </p>
          </div>
          <div className="text-center p-4 bg-card/20 rounded-lg backdrop-blur-sm border border-border/30">
            <div className="text-4xl font-bold text-tech-orange mb-2">6</div>
            <p className="text-muted-foreground text-sm">
              Proyectos profesionales
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Para tu portfolio completo
            </p>
          </div>
        </div>

        {/* Company Logos Section */}
        <div className="mt-16 animate-fade-up">
          <p className="text-sm text-muted-foreground mb-6">
            Nuestros graduados trabajan en:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-muted-foreground">
              MercadoLibre
            </div>
            <div className="text-2xl font-bold text-muted-foreground">
              Globant
            </div>
            <div className="text-2xl font-bold text-muted-foreground">
              Rappi
            </div>
            <div className="text-2xl font-bold text-muted-foreground">
              Platzi
            </div>
            <div className="text-2xl font-bold text-muted-foreground">Ualá</div>
            <div className="text-2xl font-bold text-muted-foreground">
              Auth0
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-tech-blue/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-10 w-32 h-32 bg-tech-green/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-tech-purple/20 rounded-full blur-xl animate-pulse delay-500" />
    </section>
  );
};

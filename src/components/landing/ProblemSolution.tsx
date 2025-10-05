import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
} from "lucide-react";
import problemSalaryImg from "@/assets/problem-salary.jpg";
import solutionCareerImg from "@/assets/solution-career.jpg";
import { useNavigate } from "react-router-dom";

interface ProblemSolutionProps {
  onCTAClick?: () => void;
}

export const ProblemSolution = ({ onCTAClick }: ProblemSolutionProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/registro");
  };

  const problems = [
    {
      icon: AlertTriangle,
      title: "Salario que no alcanza para nada",
      description:
        "Trabajas 8+ horas diarias pero tu sueldo apenas cubre los gastos básicos. Sin posibilidades de ahorro ni inversión.",
      details: [
        "Salarios promedio de $500-800 USD/mes en roles tradicionales",
        "Sin aumentos significativos por años",
        "Dependes de un solo ingreso vulnerable",
        "No tienes tiempo para desarrollar nuevas skills",
      ],
    },
    {
      icon: Target,
      title: "Trabajo repetitivo y sin crecimiento",
      description:
        "Haces lo mismo todos los días, sin aprender nada nuevo. Tu CV sigue igual que hace 2 años y las oportunidades no llegan.",
      details: [
        "Tareas mecánicas que no agregan valor a tu perfil",
        "Cero posibilidades de promoción interna",
        "Skills obsoletas que no demanda el mercado",
        "Competencia feroz por trabajos mal pagados",
      ],
    },
    {
      icon: TrendingUp,
      title: "Sin skills digitales demandados",
      description:
        "Ves ofertas de trabajo tech con sueldos increíbles, pero no sabes programar. Los tutoriales online te confunden más de lo que te ayudan.",
      details: [
        "Las empresas pagan 3x más a developers",
        "Tutoriales gratuitos están desactualizados",
        "No sabes por dónde empezar ni qué tecnologías aprender",
        "Falta de estructura y mentoría profesional",
      ],
    },
  ];

  const solutions = [
    {
      icon: Users,
      title: "Mentoría personalizada con developers senior",
      description:
        "Acompañamiento directo de profesionales que trabajan en empresas como Mercado Libre, Globant, y startups internacionales. No estás solo en este proceso.",
      details: [
        "2 sesiones semanales de mentoría 1:1 (52 sesiones totales)",
        "Code reviews personalizados de todos tus proyectos",
        "Orientación profesional y preparación para entrevistas",
        "Acceso directo a mentores vía Discord 24/7",
        "Networking con developers trabajando en grandes empresas",
      ],
    },
    {
      icon: Target,
      title: "Proyectos que empresas realmente usan",
      description:
        "No construirás 'to-do lists'. Desarrollarás aplicaciones complejas que resuelven problemas reales de empresas, equivalentes a 1+ año de experiencia laboral.",
      details: [
        "E-commerce completo con pasarela de pagos (Stripe/MercadoPago)",
        "Red social con chat en tiempo real (WebSockets)",
        "Dashboard empresarial con analytics y reportes",
        "API REST escalable con autenticación y roles",
        "App mobile-first con PWA capabilities",
        "Sistema de gestión completo (CRM/ERP básico)",
      ],
    },
    {
      icon: TrendingUp,
      title: "Metodología probada por +500 graduados",
      description:
        "Ruta de aprendizaje estructurada y validada. El 95% de nuestros estudiantes que completan el programa consigue trabajo como developer en menos de 6 meses.",
      details: [
        "Curriculum diseñado con hiring managers de tech companies",
        "Proyectos basados en casos reales de la industria",
        "Metodologías ágiles (Scrum) aplicadas desde día 1",
        "Testing automático y mejores prácticas de desarrollo",
        "Portfolio profesional que impresiona a reclutadores",
        "Certificación avalada por empresas tech partner",
      ],
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container px-4">
        {/* Problem Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Te identificas con alguna de estas situaciones?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Miles de personas talentosas están atrapadas en trabajos que no les
            permiten crecer profesional ni económicamente. Si te sientes
            estancado, sin oportunidades reales de progreso, o simplemente
            quieres un cambio radical en tu carrera,
            <span className="text-tech-orange font-semibold">
              {" "}
              no estás solo
            </span>
            .
          </p>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-destructive">
                Realidad cruda:
              </span>{" "}
              El 78% de los profesionales en LATAM sienten que sus trabajos
              actuales no tienen futuro. Mientras tanto, la demanda de
              desarrolladores Full Stack creció un 340% en los últimos 3 años.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <img
            src={problemSalaryImg}
            alt="Problemas Comunes de Carrera"
            className="w-full max-w-5xl mx-auto h-80 object-cover rounded-lg border border-border"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className="p-8 bg-card/50 border border-destructive/20 hover:border-destructive/40 transition-all group"
            >
              <problem.icon className="w-12 h-12 text-destructive mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-destructive">
                {problem.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {problem.description}
              </p>
              <ul className="space-y-2">
                {problem.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-destructive mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Solution Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-tech-green">La solución está aquí</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Un programa completo que te lleva desde cero hasta desarrollador
            full stack empleable en solo 6 meses.
          </p>
          <div className="mb-8">
            <img
              src={solutionCareerImg}
              alt="Solución Profesional"
              className="w-full max-w-5xl mx-auto h-80 object-cover rounded-lg border border-border"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <Card
              key={index}
              className="p-8 bg-card/80 border border-tech-green/20 hover:border-tech-green/40 transition-all hover:shadow-glow group"
            >
              <solution.icon className="w-12 h-12 text-tech-green mb-6" />
              <h3 className="text-xl font-semibold mb-4">{solution.title}</h3>
              <p className="text-muted-foreground mb-6">
                {solution.description}
              </p>
              <ul className="space-y-3">
                {solution.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="text-sm flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-tech-green flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            variant="cta"
            onClick={handleClick}
            className="text-lg px-12 py-6"
          >
            Cambiar Mi Futuro Ahora
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Próximo grupo limitado a 50 estudiantes
          </p>
        </div>
      </div>
    </section>
  );
};

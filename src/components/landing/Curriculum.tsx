import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, Clock, Users } from "lucide-react";
import module1Image from "@/assets/module1-frontend.jpg";
import module2Image from "@/assets/module2-react.jpg";
import module3Image from "@/assets/module3-backend.jpg";
import module4Image from "@/assets/module4-database.jpg";
import module5Image from "@/assets/module5-fullstack.jpg";
import module6Image from "@/assets/module6-devops.jpg";
import { useNavigate } from "react-router-dom";

interface CurriculumProps {
  onCTAClick?: () => void;
}

export const Curriculum = ({ onCTAClick }: CurriculumProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/registro");
  };

  const modules = [
    {
      id: "module1",
      title: "Módulo 1: Fundamentos y Frontend",
      duration: "6 semanas",
      image: module1Image,
      topics: [
        "HTML5 semántico y accesibilidad",
        "CSS3 avanzado y Flexbox/Grid",
        "JavaScript ES6+ y DOM manipulation",
        "React fundamentals y componentes",
        "Hooks y state management",
        "TypeScript básico",
        "Proyecto: Landing page responsive",
      ],
    },
    {
      id: "module2",
      title: "Módulo 2: React Avanzado y Herramientas",
      duration: "4 semanas",
      image: module2Image,
      topics: [
        "React Router y navegación",
        "Context API y Redux Toolkit",
        "Testing con Jest y React Testing Library",
        "Tailwind CSS y componentes reutilizables",
        "Optimización de performance",
        "Proyecto: Dashboard administrativo",
      ],
    },
    {
      id: "module3",
      title: "Módulo 3: Backend con Node.js",
      duration: "5 semanas",
      image: module3Image,
      topics: [
        "Node.js fundamentals y NPM",
        "Express.js y middleware",
        "API REST y arquitectura MVC",
        "Autenticación JWT y bcrypt",
        "Validación de datos con Joi/Yup",
        "Testing de APIs con Postman",
        "Proyecto: API completa para e-commerce",
      ],
    },
    {
      id: "module4",
      title: "Módulo 4: Bases de Datos",
      duration: "4 semanas",
      image: module4Image,
      topics: [
        "MongoDB y Mongoose ODM",
        "PostgreSQL y queries avanzadas",
        "Relaciones y normalización",
        "Migrations y seeders",
        "Optimización y índices",
        "Proyecto: Sistema de gestión completo",
      ],
    },
    {
      id: "module5",
      title: "Módulo 5: Full Stack Integration",
      duration: "4 semanas",
      image: module5Image,
      topics: [
        "Conexión Frontend-Backend",
        "Manejo de estados globales",
        "File upload y procesamiento",
        "Real-time con Socket.io",
        "Error handling y logging",
        "Proyecto: Red social completa",
      ],
    },
    {
      id: "module6",
      title: "Módulo 6: Deploy y DevOps",
      duration: "3 semanas",
      image: module6Image,
      topics: [
        "Git avanzado y GitHub workflows",
        "Docker y containerización",
        "Deploy en Vercel y Heroku",
        "AWS basics y S3",
        "CI/CD pipelines",
        "Monitoring y analytics",
        "Proyecto: Portfolio profesional deployado",
      ],
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Currículum Completo
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            26 semanas de contenido estructurado. Cada módulo incluye teoría,
            práctica y proyectos reales.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-tech-blue/10 rounded-lg border border-tech-blue/20">
            <Clock className="w-8 h-8 text-tech-blue mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">26 Semanas</h3>
            <p className="text-muted-foreground text-sm">
              Programa intensivo estructurado
            </p>
          </div>
          <div className="text-center p-6 bg-tech-green/10 rounded-lg border border-tech-green/20">
            <CheckCircle className="w-8 h-8 text-tech-green mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">6 Proyectos</h3>
            <p className="text-muted-foreground text-sm">
              Portfolio completo al finalizar
            </p>
          </div>
          <div className="text-center p-6 bg-tech-purple/10 rounded-lg border border-tech-purple/20">
            <Users className="w-8 h-8 text-tech-purple mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Mentoría 1:1</h3>
            <p className="text-muted-foreground text-sm">
              Acompañamiento personalizado
            </p>
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          className="max-w-4xl mx-auto mb-12"
        >
          {modules.map((module, index) => (
            <AccordionItem key={module.id} value={module.id} className="mb-4">
              <AccordionTrigger className="text-left bg-card/50 px-6 py-4 rounded-t-lg hover:bg-card/80 transition-colors border border-border hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-tech-blue/20 rounded-full flex items-center justify-center text-tech-blue font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{module.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {module.duration}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-card/30 px-6 py-6 border-x border-b border-border rounded-b-lg">
                <div className="mb-6">
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-48 object-cover rounded-lg border border-border"
                  />
                </div>
                <ul className="grid md:grid-cols-2 gap-3">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-tech-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center bg-gradient-hero p-8 rounded-2xl border border-border">
          <h3 className="text-2xl font-bold mb-4">
            ¿Listo para comenzar tu transformación?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            En 6 meses tendrás el conocimiento y portfolio necesario para
            trabajar como Full Stack Developer en cualquier empresa.
          </p>
          <Button
            size="lg"
            variant="cta"
            onClick={handleClick}
            className="text-lg px-12 py-6"
          >
            Inscribirme al Programa
          </Button>
        </div>
      </div>
    </section>
  );
};

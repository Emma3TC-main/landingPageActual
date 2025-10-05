import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Users,
  Briefcase,
  Code,
  MessageCircle,
  Award,
  Clock,
  CheckCircle,
  Zap,
} from "lucide-react";
import mentoringImg from "@/assets/mentoring.jpg";
import projectsImg from "@/assets/projects.jpg";
import communityImg from "@/assets/community.jpg";
import guaranteeImg from "@/assets/guarantee.jpg";
import { useNavigate } from "react-router-dom";

interface BenefitsProps {
  onCTAClick?: () => void;
}

export const Benefits = ({ onCTAClick }: BenefitsProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/registro");
  };

  const benefits = [
    {
      icon: Code,
      title: "Aprendizaje 100% Basado en Proyectos Reales",
      description:
        "Olvídate de tutoriales básicos y ejercicios sin sentido. Desde el primer día construyes aplicaciones que realmente importan, con la complejidad y calidad que exigen las empresas tech más exigentes.",
      image: projectsImg,
      features: [
        "6 proyectos full-stack completos de nivel empresarial",
        "Código revisado línea por línea por mentores senior",
        "Deploy en producción con tráfico real de usuarios",
        "Metodologías ágiles aplicadas en cada proyecto",
        "Code reviews profesionales como en empresas reales",
        "Portfolio que te diferencia de 95% de candidatos",
      ],
      color: "tech-blue",
      metrics: "95% de empleabilidad vs 23% promedio del mercado",
    },
    {
      icon: Users,
      title: "Mentoría 1:1 con Desarrolladores Senior Activos",
      description:
        "No instructores que leyeron un libro. Developers que trabajan en Mercado Libre, Globant, startups unicornio y empresas internacionales. Te guían paso a paso con experiencia real del mercado laboral.",
      image: mentoringImg,
      features: [
        "2 sesiones semanales de mentoría personalizada (52 total)",
        "Mentores con salarios de $80K-150K USD trabajando activamente",
        "Code reviews detallados con feedback profesional real",
        "Preparación específica para entrevistas técnicas",
        "Orientación de carrera y negociación salarial",
        "Networking directo con líderes tech de la industria",
      ],
      color: "tech-green",
      metrics: "Incremento salarial promedio de +250% en primer trabajo",
    },
    {
      icon: Briefcase,
      title: "Proyectos de Nivel Empresarial (No Juguetes)",
      description:
        "Construyes aplicaciones que resuelven problemas reales, con la arquitectura, seguridad y escalabilidad que demandan empresas serias. Experiencia equivalente a 12-18 meses de trabajo junior.",
      image: projectsImg,
      features: [
        "E-commerce con +10,000 productos y pasarela de pagos real",
        "Red social con 1M+ usuarios simulados y chat en tiempo real",
        "Dashboard empresarial con big data y analytics avanzados",
        "API REST que maneja 100K+ requests por segundo",
        "App PWA mobile-first con notificaciones push",
        "Sistema CRM/ERP completo para empresas medianas",
      ],
      color: "tech-purple",
      metrics: "Proyectos usados por +50 empresas reales como base",
    },
    {
      icon: MessageCircle,
      title: "Comunidad Activa de +500 Developers Empleados",
      description:
        "No estás solo. Únete a la red profesional tech más activa de LATAM. Oportunidades laborales exclusivas, colaboraciones, mentorías peer-to-peer y networking que dura toda la vida.",
      image: communityImg,
      features: [
        "Discord con +500 miembros activos disponibles 24/7",
        "Eventos mensuales con líderes tech de grandes empresas",
        "Bolsa de trabajo exclusiva con +100 empresas partner",
        "Grupos de estudio y pair programming constante",
        "Hackathons internos con premios reales en USD",
        "Red de contactos que te consigue trabajo por referidos",
      ],
      color: "tech-orange",
      metrics: "78% consigue trabajo por referidos de la comunidad",
    },
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tech-green/10 rounded-full border border-tech-green/20 mb-6">
            <Award className="w-4 h-4 text-tech-green" />
            <span className="text-sm font-medium text-tech-green">
              Metodología Revolucionaria
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            No es solo otro curso online
            <span className="text-tech-green">
              {" "}
              es tu transformación completa
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Mientras otros te dan videos pregrabados y te abandonan, nosotros
            construimos developers profesionales con
            <span className="text-tech-blue font-semibold">
              {" "}
              acompañamiento real, proyectos de impacto y una comunidad que se
              convierte en tu red profesional de por vida
            </span>
            .
          </p>
          <div className="bg-tech-orange/10 border border-tech-orange/20 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="font-semibold text-tech-orange mb-3">
              ⚡ La Diferencia Que Cambia Todo
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <strong className="text-tech-green">
                  ✅ Nuestro Programa:
                </strong>
                <p className="text-muted-foreground mt-1">
                  Mentoría real con developers que ganan +$100K USD, proyectos
                  que usarías para aplicar a Google, comunidad activa que te
                  ayuda 24/7.
                </p>
              </div>
              <div>
                <strong className="text-destructive">❌ Otros Cursos:</strong>
                <p className="text-muted-foreground mt-1">
                  Videos obsoletos de 2020, proyectos básicos que no impresionan
                  a nadie, foros muertos donde nadie responde.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-8 bg-card/80 hover:bg-card transition-all hover:shadow-card border-l-4 border-l-tech-blue/40 hover:border-l-tech-green/60"
            >
              <div className="mb-6">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-56 object-cover rounded-lg border border-border"
                />
              </div>
              <div className="flex items-start gap-6">
                <div
                  className={`p-4 rounded-lg ${
                    benefit.color === "tech-blue"
                      ? "bg-tech-blue/10 border border-tech-blue/20"
                      : benefit.color === "tech-green"
                      ? "bg-tech-green/10 border border-tech-green/20"
                      : benefit.color === "tech-purple"
                      ? "bg-tech-purple/10 border border-tech-purple/20"
                      : "bg-tech-orange/10 border border-tech-orange/20"
                  }`}
                >
                  <benefit.icon
                    className={`w-8 h-8 ${
                      benefit.color === "tech-blue"
                        ? "text-tech-blue"
                        : benefit.color === "tech-green"
                        ? "text-tech-green"
                        : benefit.color === "tech-purple"
                        ? "text-tech-purple"
                        : "text-tech-orange"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {benefit.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {benefit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-tech-green flex-shrink-0 mt-1" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-gradient-hero p-4 rounded-lg border border-border/50">
                    <div className="text-xs font-semibold text-tech-blue mb-1">
                      📊 Resultado Medible:
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {benefit.metrics}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Guarantee Section */}
        <div className="bg-gradient-accent/5 border border-accent/20 rounded-2xl p-8 mb-12">
          <div className="mb-8">
            <img
              src={guaranteeImg}
              alt="Garantía de Empleabilidad"
              className="w-full h-64 object-cover rounded-lg border border-border"
            />
          </div>
          <div className="text-center">
            <Zap className="w-16 h-16 text-accent mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">
              Garantía Blindada de Empleabilidad
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              Estamos tan seguros de la calidad de nuestro programa que si
              completas el 100% del curso, entregas todos los proyectos y no
              consigues trabajo como desarrollador en 6 meses,
              <span className="font-bold text-accent">
                {" "}
                te devolvemos cada centavo de tu inversión
              </span>
              .
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-card/30 rounded-lg p-4 border border-border/50">
                <Clock className="w-8 h-8 text-tech-blue mx-auto mb-2" />
                <h4 className="font-semibold mb-2">6 Meses Completos</h4>
                <p className="text-sm text-muted-foreground">
                  Tiempo garantizado para conseguir empleo después de graduarte
                </p>
              </div>
              <div className="bg-card/30 rounded-lg p-4 border border-border/50">
                <CheckCircle className="w-8 h-8 text-tech-green mx-auto mb-2" />
                <h4 className="font-semibold mb-2">100% Sin Letra Pequeña</h4>
                <p className="text-sm text-muted-foreground">
                  Sin condiciones ocultas ni excusas. Cumples, nosotros
                  cumplimos.
                </p>
              </div>
              <div className="bg-card/30 rounded-lg p-4 border border-border/50">
                <Award className="w-8 h-8 text-tech-orange mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Soporte Post-Graduación</h4>
                <p className="text-sm text-muted-foreground">
                  Seguimos ayudándote con CV, entrevistas y negociación salarial
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-tech-green">
                  95% de nuestros graduados
                </strong>{" "}
                consigue trabajo en los primeros 4 meses
              </p>
              <p className="text-xs text-muted-foreground">
                Solo 3 personas de 500+ han necesitado usar esta garantía (y las
                3 consiguieron trabajo al mes 7)
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            variant="cta"
            onClick={handleClick}
            className="text-lg px-12 py-6 animate-glow"
          >
            Asegurar Mi Cupo Ahora
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Solo quedan{" "}
            <span className="text-accent font-semibold">12 cupos</span>{" "}
            disponibles
          </p>
        </div>
      </div>
    </section>
  );
};

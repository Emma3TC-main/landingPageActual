import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import faqHeroImg from "@/assets/faq-hero.jpg";
import { useNavigate } from "react-router-dom";

interface FAQProps {
  onCTAClick?: () => void;
}

export const FAQ = ({ onCTAClick }: FAQProps) => {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate("/registro");
  };

  const faqs = [
    {
      id: "faq1",
      question: "¿Necesito conocimientos previos de programación?",
      answer: "No, el programa está diseñado para principiantes absolutos. Empezamos desde los fundamentos y avanzamos gradualmente. Solo necesitas ganas de aprender y dedicación."
    },
    {
      id: "faq2", 
      question: "¿Cuánto tiempo debo dedicar por semana?",
      answer: "Recomendamos 15-20 horas semanales para completar el programa exitosamente. Esto incluye clases, práctica y proyectos. El horario es flexible y puedes adaptar el estudio a tu ritmo."
    },
    {
      id: "faq3",
      question: "¿Qué pasa si no puedo seguir el ritmo del grupo?",
      answer: "Tienes acceso de por vida al contenido y puedes repetir módulos las veces que necesites. Además, ofrecemos sesiones de nivelación para estudiantes que necesiten apoyo extra."
    },
    {
      id: "faq4",
      question: "¿La mentoría realmente es personalizada?",
      answer: "Sí, cada estudiante tiene asignado un mentor senior que lo acompaña durante todo el programa. Son 2 sesiones 1:1 por semana para resolver dudas específicas y revisar tu código."
    },
    {
      id: "faq5",
      question: "¿Qué tipo de proyectos voy a construir?",
      answer: "Construirás 6 proyectos completos: landing page, dashboard administrativo, API de e-commerce, sistema de gestión, red social y portfolio profesional. Todos deployados y funcionales."
    },
    {
      id: "faq6",
      question: "¿Cómo funciona la garantía de empleabilidad?",
      answer: "Si completas el 100% del programa, entregas todos los proyectos y no consigues trabajo como developer en 6 meses, te devolvemos el dinero completo. Sin excepciones ni letra pequeña."
    },
    {
      id: "faq7",
      question: "¿El programa incluye ayuda para conseguir trabajo?",
      answer: "Sí, incluye preparación para entrevistas técnicas, revisión de CV, optimización de LinkedIn y acceso a nuestra bolsa de trabajo exclusiva con +100 empresas aliadas."
    },
    {
      id: "faq8",
      question: "¿Puedo pagar en cuotas?",
      answer: "Sí, ofrecemos planes de financiación flexible hasta en 12 cuotas sin interés. También aceptamos todos los medios de pago y criptomonedas."
    },
    {
      id: "faq9",
      question: "¿Hay certificación al completar el curso?",
      answer: "Sí, recibes un certificado de finalización avalado por nuestros partners tecnológicos. Pero lo más importante es tu portfolio de proyectos reales que demuestran tus habilidades."
    },
    {
      id: "faq10",
      question: "¿Cuál es la diferencia con otros bootcamps?",
      answer: "Nosotros nos enfocamos en 3 pilares únicos: mentoría 1:1 real, proyectos del mundo real (no tutoriales), y una comunidad activa que se convierte en tu red profesional de por vida."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <div className="mb-8">
            <img 
              src={faqHeroImg} 
              alt="Preguntas Frecuentes"
              className="w-full max-w-4xl mx-auto h-64 object-cover rounded-lg border border-border"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Resolvemos todas tus dudas sobre el programa. Si tienes otras preguntas, contáctanos directamente.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="mb-4">
                <AccordionTrigger className="text-left bg-card/50 px-6 py-4 rounded-lg hover:bg-card/80 transition-colors border border-border hover:no-underline">
                  <span className="font-semibold pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="bg-card/30 px-6 py-6 border-x border-b border-border rounded-b-lg mt-1">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16 bg-gradient-hero p-8 rounded-2xl border border-border">
          <h3 className="text-2xl font-bold mb-4">¿Aún tienes dudas?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Agenda una llamada gratuita de 15 minutos con nuestro equipo. Te contaremos todo sobre el programa 
            y resolveremos cualquier pregunta específica que tengas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="cta" 
              onClick={handleClick}
              className="text-lg px-12 py-6"
            >
              Inscribirme Ahora
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-border hover:bg-secondary"
            >
              Agendar Llamada Gratuita
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
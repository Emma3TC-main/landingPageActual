import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MessageCircle,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import successStoryImg from "@/assets/success-story.jpg";
import { useNavigate } from "react-router-dom";
interface FooterProps {
  onCTAClick?: () => void;
}

export const Footer = ({ onCTAClick }: FooterProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/registro");
  };

  return (
    <footer className="bg-secondary/40 border-t border-border">
      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container px-4 text-center">
          <div className="mb-8">
            <img
              src={successStoryImg}
              alt="Historia de Éxito"
              className="w-full max-w-4xl mx-auto h-80 object-cover rounded-lg border border-border"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Tu futuro como <span className="text-tech-green">Developer</span>
            <br />
            empieza hoy
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            No dejes que otro año pase sin tomar acción. Miles de personas ya
            transformaron sus vidas con nuestro programa.{" "}
            <span className="font-semibold text-tech-orange">Es tu turno.</span>
          </p>

          <Button
            size="lg"
            variant="cta"
            onClick={handleClick}
            className="text-xl px-16 py-8 animate-glow mb-6"
          >
            COMENZAR MI TRANSFORMACIÓN AHORA
          </Button>

          <p className="text-sm text-muted-foreground">
            ⏰ Solo quedan{" "}
            <span className="font-semibold text-tech-orange">12 cupos</span>{" "}
            para enero 2025
          </p>
        </div>
      </section>

      {/* Footer Content */}
      <div className="container px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              FullStack Pro
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              La academia #1 en LATAM para convertirte en Full Stack Developer.
              Más de 500 graduados trabajando en las mejores empresas tech.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-tech-blue transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-tech-blue transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-tech-blue transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-tech-blue" />
                <span>info@fullstackpro.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-tech-blue" />
                <span>+54 9 11 1234-5678</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-tech-green" />
                <span>WhatsApp: +54 9 11 1234-5678</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <div className="space-y-3 text-sm">
              <a
                href="#curriculum"
                className="block text-muted-foreground hover:text-tech-blue transition-colors"
              >
                Currículum
              </a>
              <a
                href="#testimonios"
                className="block text-muted-foreground hover:text-tech-blue transition-colors"
              >
                Testimonios
              </a>
              <a
                href="#faq"
                className="block text-muted-foreground hover:text-tech-blue transition-colors"
              >
                FAQ
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-tech-blue transition-colors"
              >
                Blog
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            <p>&copy; 2024 FullStack Pro. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-tech-blue transition-colors">
              Términos y Condiciones
            </a>
            <a href="#" className="hover:text-tech-blue transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-tech-blue transition-colors">
              Política de Reembolso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

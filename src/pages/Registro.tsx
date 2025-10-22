import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Esquema de validación para el primer paso (sin cambios)
const stepOneSchema = z.object({
  nombre: z.string().min(2, "El nombre es muy corto"),
  apellido: z.string().min(2, "El apellido es muy corto"),
  email: z.string().email("Email inválido"),
  ciclo: z.string().min(1, "El ciclo es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const learningStyles = [
  { value: "Visual", label: "Visual", description: "Aprendo mejor con diagramas y mapas conceptuales" },
  { value: "Auditivo", label: "Auditivo", description: "Aprendo mejor escuchando y en discusiones" },
  { value: "Kinestésico", label: "Kinestésico", description: "Aprendo mejor con práctica y ejercicios" },
  { value: "Visual-Kinestésico", label: "Visual-Kinestésico", description: "Combino diagramas con práctica" },
  { value: "Auditivo-Visual", label: "Auditivo-Visual", description: "Combino lectura con audio" },
];

const Registro = () => {
  const [step, setStep] = useState(1);
  // --- CAMBIO 1: Damos un tipo más específico al estado del formulario ---
  const [formData, setFormData] = useState<z.infer<typeof stepOneSchema> | null>(null);
  const [estiloAprendizaje, setEstiloAprendizaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: { nombre: "", apellido: "", email: "", ciclo: "", password: "" },
  });

  const handleStepOneSubmit = (values: z.infer<typeof stepOneSchema>) => {
    setFormData(values);
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    if (!estiloAprendizaje) {
      toast({ title: "Por favor, selecciona un estilo de aprendizaje.", variant: "destructive" });
      return;
    }
    // --- CAMBIO 2: Verificación más robusta ---
    if (!formData) {
      toast({ title: "Error: Faltan los datos del primer paso.", variant: "destructive" });
      setStep(1); // Regresa al paso 1 si faltan datos
      return;
    }

    setIsLoading(true);
    console.log("Iniciando envío final..."); // <-- LOG 1

    const finalData = { ...formData, estiloAprendizaje };

    try {
      console.log("Enviando datos a la Edge Function 'create-student':", finalData); // <-- LOG 2
      
      const { data, error } = await supabase.functions.invoke('create-student', {
        body: { studentData: finalData },
      });

      console.log("Respuesta de la Edge Function:", { data, error }); // <-- LOG 3

      if (error) throw new Error(`Error de red o de la función: ${error.message}`);
      if (data.error) throw new Error(`Error devuelto por la lógica de la función: ${data.error}`);
      
      toast({ title: "¡Registro exitoso!", description: "Serás redirigido a tu dashboard." });
      
      console.log("Iniciando sesión con el nuevo usuario..."); // <-- LOG 4
      
      // --- CAMBIO 3: Acceso seguro a los datos ---
      await supabase.auth.signInWithPassword({
        email: finalData.email,
        password: finalData.password,
      });
      
      console.log("Redirigiendo al dashboard..."); // <-- LOG 5
      navigate('/dashboard');

    } catch (error: any) {
      console.error("Error detallado en handleFinalSubmit:", error); // <-- LOG DE ERROR
      toast({ title: "Error en el registro", description: error.message, variant: "destructive" });
    } finally {
      console.log("Finalizando envío."); // <-- LOG FINAL
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg">
        <button onClick={() => step === 2 ? setStep(1) : navigate('/')} className="text-sm text-muted-foreground mb-4 flex items-center">
          &larr; Volver
        </button>

        {step === 1 && (
          <>
            <h1 className="text-3xl font-bold text-primary mb-2 text-center">Regístrate en Naje</h1>
            <p className="text-muted-foreground text-center mb-6">Completa tus datos básicos para comenzar</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleStepOneSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="nombre" render={({ field }) => ( <FormItem><FormLabel>Nombre</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="apellido" render={({ field }) => ( <FormItem><FormLabel>Apellido</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                </div>
                <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="password" render={({ field }) => ( <FormItem><FormLabel>Contraseña</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="ciclo" render={({ field }) => ( <FormItem><FormLabel>Ciclo Académico</FormLabel><FormControl><Input placeholder="Ej: 2024-2" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <Button type="submit" className="w-full">Continuar al Test</Button>
              </form>
            </Form>
            <p className="text-xs text-muted-foreground text-center mt-4">Paso 1 de 2</p>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-3xl font-bold text-primary mb-2 text-center">Test de Personalidad</h1>
            <p className="text-muted-foreground text-center mb-6">Selecciona tu estilo de aprendizaje preferido</p>
            <RadioGroup onValueChange={setEstiloAprendizaje} value={estiloAprendizaje} className="space-y-3">
              <p className="font-semibold">¿Cómo prefieres aprender?</p>
              {learningStyles.map(style => (
                <Label key={style.value} className="flex items-center space-x-3 border border-border p-4 rounded-md hover:bg-secondary cursor-pointer">
                  <RadioGroupItem value={style.value} id={style.value} />
                  <div>
                    <p className="font-medium">{style.label}</p>
                    <p className="text-sm text-muted-foreground">{style.description}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
            <p className="text-xs text-muted-foreground mt-6">
              <b>Nota:</b> Basándonos en tu perfil, generaremos automáticamente tus estadísticas iniciales y recomendaciones.
            </p>
            <Button onClick={handleFinalSubmit} disabled={isLoading} className="w-full mt-4">
              {isLoading ? "Completando..." : "Completar Registro"}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-4">Paso 2 de 2</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Registro;
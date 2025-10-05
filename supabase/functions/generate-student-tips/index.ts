import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request): Promise<Response> => {
  // Manejo de preflight CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parseo del body de la request
    const { tipoPersonalidad, estiloAprendizaje, promedioActual } =
      await req.json();

    // Obtención de API Key desde variables de entorno
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Prompts para la IA
    const systemPrompt = `Eres un experto en pedagogía y psicología educativa. 
Tu tarea es generar tips personalizados y específicos para mejorar el rendimiento académico de estudiantes 
según su perfil de personalidad y estilo de aprendizaje.`;

    const userPrompt = `Genera 5 tips específicos y prácticos para un estudiante con:
- Tipo de personalidad: ${tipoPersonalidad}
- Estilo de aprendizaje: ${estiloAprendizaje}
- Promedio actual: ${promedioActual}

Los tips deben estar categorizados en:
1. Concentración (2 tips)
2. Técnicas de estudio (2 tips)
3. Gestión del tiempo (1 tip)

Formato de respuesta: Devuelve un objeto JSON con esta estructura:
{
  "concentracion": ["tip1", "tip2"],
  "tecnicas_estudio": ["tip1", "tip2"],
  "gestion_tiempo": ["tip1"]
}`;

    // Llamada al endpoint de IA
    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    // Respuesta de la IA
    const data = await response.json();
    const content = data.choices[0]?.message?.content ?? "";

    // Intento de parseo del JSON
    let tips;
    try {
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) ||
        content.match(/```\n([\s\S]*?)\n```/) || [null, content];

      tips = JSON.parse(jsonMatch[1] || content);
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", content);
      // Estructura de fallback
      tips = {
        concentracion: [
          "Establece un espacio de estudio libre de distracciones",
          "Usa técnicas de respiración antes de estudiar",
        ],
        tecnicas_estudio: [
          "Divide el material en sesiones cortas",
          "Usa mapas mentales para organizar información",
        ],
        gestion_tiempo: ["Crea un horario de estudio semanal"],
      };
    }

    // Respuesta final al cliente
    return new Response(JSON.stringify({ tips }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in generate-student-tips:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Error generating tips" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

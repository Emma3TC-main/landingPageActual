import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// --- CAMBIO CLAVE: Definimos los corsHeaders aquí mismo ---
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
// ---------------------------------------------------------

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { studentData } = await req.json();
    const { email, password, nombre, apellido, ciclo, estiloAprendizaje } = studentData;

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SERVICE_KEY") ?? ""
    );

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("No se pudo crear el usuario en Auth.");

    const userId = authData.user.id;

    // El resto de la lógica no cambia...

    const { data: student, error: studentError } = await supabaseAdmin
      .from("students")
      .insert({ nombre, apellido, email, ciclo, avatar: `https://i.pravatar.cc/150?u=${userId}` })
      .select('id')
      .single();
    if (studentError) throw studentError;
    if (!student) throw new Error("No se pudo crear el perfil del estudiante.");
    const studentId = student.id;

    const { error: personalityError } = await supabaseAdmin
      .from("student_personalities")
      .insert({ student_id: studentId, tipo_personalidad: estiloAprendizaje, estilo_aprendizaje: estiloAprendizaje });
    if (personalityError) throw personalityError;

    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "user" });
    if (roleError) throw roleError;
    
    return new Response(JSON.stringify({ user: authData.user }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error en la función de registro 'create-student':", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
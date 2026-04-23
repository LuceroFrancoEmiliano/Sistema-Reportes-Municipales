import { oracleService } from "@/lib/oracleService";

export async function POST(request) {
  const { user, password } = await request.json();
  
  try {
    const result = await oracleService.login(user, password);
    
    // IMPORTANTE: Comparamos con el mensaje exacto que tira tu base de datos
    // Usamos .toUpperCase() y .includes() para evitar errores de espacios o mayúsculas
    if (result.status === "OK" && result.message.toUpperCase().includes("LOGUEADO")) {
      return Response.json({ 
        success: true, 
        user: user,
        dbMsg: result.message 
      });
    } else {
      // Si el mensaje no es "LOGUEADO", devolvemos el error real de la DB
      return Response.json({ 
        success: false, 
        error: result.message 
      }, { status: 401 });
    }
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
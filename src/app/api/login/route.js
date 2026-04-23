import { oracleService } from "@/lib/oracleService";

export async function POST(request) {
  const { user, password } = await request.json();
  
  try {
    const result = await oracleService.login(user, password);
    
    if (result.message === "OK") { // O el mensaje de éxito que devuelva tu PKG
      return Response.json({ success: true, user: user });
    } else {
      return Response.json({ success: false, error: result.message }, { status: 401 });
    }
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
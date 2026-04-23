import { oracleService } from "@/lib/oracleService";

export async function GET() {
  try {
    const data = await oracleService.getPadronInmuebles("1", "15");
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
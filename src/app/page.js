// src/app/page.js
import { oracleService } from "../lib/db.js";

export default async function Page() {
  let datos = [];
  let errorMsg = null;
  
  try {
    // Usamos parámetros de prueba, ajustalos según lo que necesite tu DB
    datos = await oracleService.getPadronInmuebles("1", "10");
    
    // ESTO SE VERÁ EN TU CONSOLA (DONDE CORRES NPM RUN DEV)
    console.log("--- DATOS RECIBIDOS DE ORACLE ---");
    console.log(datos);
    console.log("---------------------------------");

  } catch (error) {
    errorMsg = error.message;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-10 text-white">
      <div className="rounded-lg bg-slate-800 p-8 shadow-2xl border border-slate-700 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-emerald-400">
          Prueba de Datos Oracle
        </h1>
        
        {errorMsg ? (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded text-red-200">
            <strong>Error:</strong> {errorMsg}
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-slate-400">
              Se encontraron <span className="text-white font-bold">{datos.length}</span> registros.
            </p>
            <p className="text-xs text-slate-500 mb-4 italic">
              (Revisa la terminal de tu PC para ver el console.log detallado)
            </p>
            
            <div className="bg-black/50 p-4 rounded-md overflow-auto max-h-[400px]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-emerald-500">
                    <th className="p-2">Finca</th>
                    <th className="p-2">Calle</th>
                    <th className="p-2">Número</th>
                    <th className="p-2">Barrio</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.map((d, i) => (
                    <tr key={i} className="border-b border-slate-800 hover:bg-slate-700/50">
                      <td className="p-2">{d.finca}</td>
                      <td className="p-2">{d.calle}</td>
                      <td className="p-2">{d.numero}</td>
                      <td className="p-2">{d.barrio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
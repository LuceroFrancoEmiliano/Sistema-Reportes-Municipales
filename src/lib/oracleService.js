// src/lib/oracleService.js
import { execSync } from 'child_process';
import path from 'path';

class OracleService {
  async getPadronInmuebles(pFincaD, pFincaH) {
    try {
      const binPath = path.join(process.cwd(), 'bin');
      const command = `java -cp "${binPath}:${binPath}/ojdbc11.jar" OracleBridge ${pFincaD} ${pFincaH}`;
      const output = execSync(command, { encoding: 'utf-8' });
      return JSON.parse(output);
    } catch (error) {
      console.error("Error en el puente Java:", error.message);
      return [];
    }
  }
}

export const oracleService = new OracleService();
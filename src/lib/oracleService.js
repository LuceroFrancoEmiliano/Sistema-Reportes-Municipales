// src/lib/oracleService.js
import { execSync } from 'child_process';
import path from 'path';

class OracleService {
  async login(user, password) {
    try {
      const binPath = path.join(process.cwd(), 'bin');
      // Cambiamos los argumentos para que el Bridge sepa que es un LOGIN
      const command = `java -cp "${binPath}:${binPath}/ojdbc11.jar" OracleBridge LOGIN ${user} ${password}`;
      const output = execSync(command, { encoding: 'utf-8' });
      return JSON.parse(output); // El Java debería devolver { status: "OK", message: "..." }
    } catch (error) {
      console.error("Error en login Oracle:", error.message);
      return { status: "ERROR", message: error.message };
    }
  }
}

export const oracleService = new OracleService();
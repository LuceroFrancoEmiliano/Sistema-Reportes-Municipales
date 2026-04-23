// src/lib/oracleService.js
import oracledb from 'oracledb';



class OracleService {
  constructor() {
    this.connectionConfig = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING,
    };
  }

  async getPadronInmuebles(pFincaD, pFincaH) {
    let connection;
    try {
      connection = await oracledb.getConnection(this.connectionConfig);

      const result = await connection.execute(
        'BEGIN BATCHREPORT.REPORT_APIS_PKG.P_GET_PADRON_INMUEBLES(:p_finca_d, :p_finca_h, :p_result); END;',
        {
          p_finca_d: { dir: oracledb.BIND_IN, val: pFincaD, type: oracledb.STRING },
          p_finca_h: { dir: oracledb.BIND_IN, val: pFincaH, type: oracledb.STRING },
          p_result:  { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
        }
      );

      const resultSet = result.outBinds.p_result;
      const rows = [];
      let row;

      while ((row = await resultSet.getRow())) {
        rows.push({
          finca: row[0],
          calle: row[1],
          numero: row[2],
          barrio: row[3],
        });
      }

      await resultSet.close();
      return rows;

    } catch (error) {
      console.error('Error en Oracle Procedure:', error.message);
      throw error;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error cerrando conexión:', err);
        }
      }
    }
  }
}

export const oracleService = new OracleService();
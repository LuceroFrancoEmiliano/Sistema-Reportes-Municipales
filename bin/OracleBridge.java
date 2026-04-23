import java.sql.*;
import java.util.Properties;

public class OracleBridge {
    public static void main(String[] args) {
        // Verificamos que vengan los dos parámetros: finca_desde y finca_hasta
        if (args.length < 2) {
            System.err.println("Error: Faltan argumentos (finca_inicio finca_fin)");
            System.exit(1);
        }

        // Configuración de conexión (Ajusta USER y PASSWORD)
        String url = "jdbc:oracle:thin:@192.168.100.81:1521/prod.jotafi";
        String user = "batchreport"; 
        String pass = "brep";

        try (Connection conn = DriverManager.getConnection(url, user, pass)) {
            // Llamada al procedimiento con el CURSOR de salida
            String sql = "{call BATCHREPORT.REPORT_APIS_PKG.P_GET_PADRON_INMUEBLES(?,?,?)}";
            CallableStatement stmt = conn.prepareCall(sql);

            stmt.setString(1, args[0]); // p_finca_d
            stmt.setString(2, args[1]); // p_finca_h
            
            // El tipo 2001 es el valor numérico para OracleTypes.CURSOR 
            // Lo usamos así para no tener que importar librerías extra de Oracle al compilar
            stmt.registerOutParameter(3, -10); 

            stmt.execute();
            
            // Obtenemos el cursor como un ResultSet
            ResultSet rs = (ResultSet) stmt.getObject(3);

            // Construimos el JSON manualmente para enviarlo a Node.js
            StringBuilder json = new StringBuilder();
            json.append("[");
            boolean first = true;
            
            while (rs.next()) {
                if (!first) json.append(",");
                json.append("{");
                json.append("\"finca\":\"").append(rs.getString(1)).append("\",");
                json.append("\"calle\":\"").append(rs.getString(2)).append("\",");
                json.append("\"numero\":\"").append(rs.getString(3)).append("\",");
                json.append("\"barrio\":\"").append(rs.getString(4)).append("\"");
                json.append("}");
                first = false;
            }
            json.append("]");

            // IMPORTANTE: Esta es la única salida que debe leer Node.js
            System.out.print(json.toString());

            rs.close();
            stmt.close();

        } catch (Exception e) {
            // Si hay error, lo mandamos al canal de error para que Node no se confunda
            System.err.println("Error en Java: " + e.getMessage());
            System.exit(1);
        }
    }
}

// bin/OracleBridge.java (Fragmento principal)
import java.sql.*;

public class OracleBridge {
    public static void main(String[] args) {
        if (args.length < 3) {
            System.out.println("{\"status\":\"ERROR\", \"message\":\"Faltan argumentos\"}");
            return;
        }

        String tipoAccion = args[0]; // "LOGIN"
        String user = args[1];
        String pass = args[2];

        // ... Configuración de conexión (DriverManager) ...

        if ("LOGIN".equals(tipoAccion)) {
            try (CallableStatement cstmt = conn.prepareCall("{call BATCHREPORT.PKG_REPORTS_MANAGER.PRC_LOGIN(?, ?, ?)}")) {
                cstmt.setString(1, user);
                cstmt.setString(2, pass);
                cstmt.registerOutParameter(3, Types.VARCHAR);
                cstmt.execute();
                
                String mensaje = cstmt.getString(3);
                System.out.println("{\"status\":\"OK\", \"message\":\"" + mensaje + "\"}");
            } catch (Exception e) {
                System.out.println("{\"status\":\"ERROR\", \"message\":\"" + e.getMessage() + "\"}");
            }
        }
    }
}
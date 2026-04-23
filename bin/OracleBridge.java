import java.sql.*;

public class OracleBridge {
    public static void main(String[] args) {
        // 1. Validar argumentos
        if (args.length < 3) {
            System.out.println("{\"status\":\"ERROR\", \"message\":\"Faltan argumentos\"}");
            return;
        }

        String tipoAccion = args[0];
        String user = args[1];
        String pass = args[2];

        // 2. Datos de conexión (Asegúrate que coincidan con tu .env)
        String jdbcUrl = "jdbc:oracle:thin:@tu_host:1521:tu_servicio"; 
        String dbUser = "tu_usuario_db";
        String dbPass = "tu_password_db";

        // 3. Ejecución
        try (Connection conn = DriverManager.getConnection(jdbcUrl, dbUser, dbPass)) {
            if ("LOGIN".equals(tipoAccion)) {
                try (CallableStatement cstmt = conn.prepareCall("{call BATCHREPORT.PKG_REPORTS_MANAGER.PRC_LOGIN(?, ?, ?)}")) {
                    cstmt.setString(1, user);
                    cstmt.setString(2, pass);
                    cstmt.registerOutParameter(3, Types.VARCHAR);
                    cstmt.execute();
                    
                    String v_msg = cstmt.getString(3);
                    System.out.println("{\"status\":\"OK\", \"message\":\"" + v_msg + "\"}");
                }
            }
        } catch (Exception e) {
            System.out.println("{\"status\":\"ERROR\", \"message\":\"" + e.getMessage().replace("\"", "'") + "\"}");
        }
    }
}
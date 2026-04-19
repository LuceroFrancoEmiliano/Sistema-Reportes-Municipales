
import "./globals.css";


export const metadata = {
  title: "Sistema de reportes municipales",
  description: "Sistema de reportes municipales",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

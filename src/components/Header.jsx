"use client";
import { useState, useEffect } from 'react';
import setIsLoginOpen from './LoginModal'; 
export default function Header() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Al cargar, verificamos si hay sesión
    const sesion = localStorage.getItem('user');
    if (sesion) setUsuario(JSON.parse(sesion));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUsuario(null);
    window.location.reload();
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <img src="/muni-header.png" alt="Logo" className="h-10" />
      
      <div className="flex items-center gap-4">
        {usuario ? (
          <>
            <span className="text-cyan-900 font-medium">Hola, {usuario.name}</span>
            <button onClick={handleLogout} className="text-red-600 text-sm underline">Salir</button>
          </>
        ) : (
          <button onClick={() => setIsLoginOpen(true)} className="...">
            Ingresar
          </button>
        )}
      </div>
    </header>
  );
}
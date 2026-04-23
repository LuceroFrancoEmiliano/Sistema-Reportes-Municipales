"use client";
import { useState, useEffect } from 'react';
import Login from './Login';

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
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
          <button 
            onClick={() => setIsLoginOpen(true)} // Cambia el estado a verdadero para abrirlo
            className="bg-cyan-800 text-white px-4 py-2 rounded-lg font-bold"
          >
            Ingresar
          </button>
        )}
      </div>

      {/* IMPORTANTE: Debes colocar el componente aquí para que Next.js sepa dónde mostrarlo */}
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </header>
  );
}
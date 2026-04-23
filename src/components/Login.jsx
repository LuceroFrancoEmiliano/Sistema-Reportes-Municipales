"use client";
import React from 'react';

export default function Login({ isOpen, onClose }) {
  if (!isOpen) return null; 

    // Fragmento a actualizar en Login.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = e.target[0].value;
    const password = e.target[1].value;

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ user, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem('user', JSON.stringify({ name: data.user }));
      onClose();
      window.location.reload(); // Recargamos para que el Header detecte al usuario
    } else {
      alert("Error: " + data.error);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* CAPA TRASLÚCIDA: El onClick aquí permite cerrar al tocar fuera */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* CONTENEDOR DEL LOGIN: relative para estar sobre la capa oscura */}
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 animate-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-cyan-900">Bienvenido</h2>
          <p className="text-gray-500 text-sm">Ingresa tus credenciales para continuar</p>
        </div>

        <form className="space-y-4" onClick={(e) => e.stopPropagation()}>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Usuario</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-cyan-800 outline-none transition-all"
              placeholder="ej: juan.perez"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Contraseña</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-cyan-800 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full bg-cyan-800 hover:bg-cyan-900 text-white font-bold py-3 rounded-lg shadow-lg transition-transform active:scale-95">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
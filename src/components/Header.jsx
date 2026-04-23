"use client";
import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import Login from './Login';
export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu =() => {
        setIsOpen(!isOpen);
    }

  return (
    <header className="flex justify-between items-center  bg-white p-3 ">
          
            <Image
              src="/muni-header.png" 
              alt="Logo Municipalidad"
              width={350} 
              height={100} 
              priority 
            />
     
          <h1 className="text-xl justify-content font-bold tracking-tight text-cyan-900 p-2 mr-15">
            Administrador de reportes 
          </h1>
        
        <div className="">
          <p className="text-sm">Usuario: <strong>Juan Perez</strong> </p>
          <button className="text-blue-600 hover:text-blue-800 underline text-xs font-medium"
          
            onClick={toggleMenu}>
            {isOpen ? 'Cerrar sesión' : 'Iniciar sesión'}
          </button>
        </div>

        <Login isOpen={isOpen} onClose={toggleMenu} />
      </header>
  )
}

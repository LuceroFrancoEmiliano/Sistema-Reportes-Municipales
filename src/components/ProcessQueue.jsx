"use client";
import React from 'react';
import TableHeader from './TableHeader';

export default function ProcessQueue() {
  const headers = [
    'id', 'Reporte', 'Usuario', 'Parámetros', 'Creación', 
    'Inicio', 'Fin', 'Estado', 'Acciones', 'Link descarga / Errores'
  ];

  return (
    <section className="bg-white">
      
      <TableHeader 
        placeholder="Filtro de procesos" 
        title="Cola de procesos" 
        onFilter={() => console.log('Filtrando procesos...')}
      />

      <div className="overflow-x-auto px-2">
        
        <table className="w-full text-left border-separate border-spacing-y-1 border-spacing-x-1">
          <thead>
            <tr className="text-white text-xs uppercase text-center">
              {headers.map((h) => (
                <th key={h} className="p-2 bg-sky-800 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm">
            {[1, 2,3,4,5,6].map((i) => (
              <tr key={i} className="text-center">
                
                {headers.map((_, index) => (
                  <td key={index} className="h-10 bg-gray-100 hover:bg-gray-200">
                    {/* Aquí iría tu dato real */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
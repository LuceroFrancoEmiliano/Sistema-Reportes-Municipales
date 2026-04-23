"use client";
import React from 'react';
import TableHeader from './TableHeader';

export default function ReportList() {
  const columns = ['Reporte', 'Grupo', 'Nombre', 'Descripción', 'Ejecutar'];

  return (
    <section className="bg-white mb-6 shadow-sm">
      <TableHeader 
        placeholder="Filtro de reportes" 
        title="Listado de reportes disponibles" 
        onFilter={() => console.log('Filtrando reportes...')}
      />

      <div className="overflow-x-auto px-2">
        <table className="w-full text-left border-separate border-spacing-y-1 border-spacing-x-1">
          <thead>
            <tr className="text-white text-xs uppercase text-center">
              {columns.map((col) => (
                <th key={col} className="p-2 bg-sky-800 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm">
          
            {[1, 2, 3,4,5,6].map((i) => (
              <tr key={i} className="h-10 text-center">
                {columns.map((_, index) => (
                  <td key={index} className="bg-gray-100 hover:bg-gray-200"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
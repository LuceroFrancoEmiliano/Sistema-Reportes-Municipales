
export default function TableHeader({ placeholder, title, onFilter }) {
  return (
    <div className="p-2 flex justify-between items-center">
      <div className="flex space-x-2">
        <input 
          type="text" 
          placeholder={placeholder}
          className="border px-4 text-sm w-96 outline-none rounded-md border-gray-900" 
        />
        <button 
          onClick={onFilter} 
          className="bg-cyan-800 hover:bg-cyan-900 text-white px-7 py-1 text-sm transition-colors rounded-lg border-2 border-black cursor-pointer"
        >
          Filtrar 
        </button>
      </div>
      <h2 className="font-bold text-gray-700">{title}</h2> 
    </div>
  );
}
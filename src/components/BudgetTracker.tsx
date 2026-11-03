import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/image.jpg" alt="Grafica de gastos" />
      </div>

      <div className="flex flex-col justify-center">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
        >
          Resetear App
        </button>

        <AmountDisplay label="Presupuesto" ammount={300} />

        <AmountDisplay label="Disponible" ammount={200} />

        <AmountDisplay label="Gastado" ammount={100} />
      </div>
    </div>
  );
}

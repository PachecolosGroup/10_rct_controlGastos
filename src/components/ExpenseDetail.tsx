import type { Expense } from "../types/index";
import { formatDate } from "../helpers/index";
import AmountDisplay from "./AmountDisplay";
import { useMemo } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";
import SwipeableItem from "./SwipeableItem";

type ExpenseDetailProps = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { dispatch } = useBudget();

  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense],
  );

  return (
    <SwipeableItem
      destructive
      onSwipeRight={() => {
        dispatch({ type: "get-expense-by-id", payload: { id: expense.id } });
      }}
      onSwipeLeft={() =>
        dispatch({ type: "remove-expense", payload: { id: expense.id } })
      }
    >
      <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
        <div>
          <img
            src={`/icono_${categoryInfo.icon}.svg`}
            alt="Icono de la categoría"
            className="w-20"
          />
        </div>

        <div className="flex-1 space-y-3">
          <p className="text-sm font-bold uppercase text-slate-500">
            {categoryInfo.name}
          </p>
          <p>{expense.expenseName}</p>
          <p className="text-slate-600 text-sm">
            {formatDate(expense.date!.toString())}
          </p>
        </div>

        <AmountDisplay amount={expense.amount} />
      </div>
    </SwipeableItem>
  );
}

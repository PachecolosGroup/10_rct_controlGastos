import { formatCurrency } from "../helpers/index";

type AmountDisplayProps = {
  label: string;
  ammount: number;
};

export default function AmountDisplay({ label, ammount }: AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {label}: {""}
      <span className="font-black text-black"> {formatCurrency(ammount)}</span>
    </p>
  );
}

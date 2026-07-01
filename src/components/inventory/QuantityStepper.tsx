

import { useEffect, useRef } from "react";
import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 999999,
}: QuantityStepperProps) {

  // Works in browser + React + TypeScript
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ================= UPDATE VALUE ================= */

  const updateValue = (newValue: number) => {
    const clamped = Math.min(max, Math.max(min, newValue));
    onChange(clamped);
  };

  /* ================= HOLD BUTTON ================= */

  const startHolding = (step: number) => {
    stopHolding();

    let current = value;

    current += step;
    updateValue(current);

    intervalRef.current = setInterval(() => {
      current += step;
      updateValue(current);
    }, 120);
  };

  const stopHolding = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopHolding();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-xl shadow-sm p-5">

      <label className="block text-sm font-medium text-slate-600 mb-3">
        Quantity
      </label>

      <div className="flex items-center gap-4">

        {/* Minus */}

        <button
          type="button"
          onClick={() => updateValue(value - 1)}
          onMouseDown={() => startHolding(-1)}
          onMouseUp={stopHolding}
          onMouseLeave={stopHolding}
          onTouchStart={() => startHolding(-1)}
          onTouchEnd={stopHolding}
          className="w-12 h-12 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition active:scale-95"
        >
          <Minus size={20} />
        </button>

        {/* Input */}

        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => updateValue(Number(e.target.value))}
          className="flex-1 h-12 rounded-xl border border-slate-200 text-center text-lg font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {/* Plus */}

        <button
          type="button"
          onClick={() => updateValue(value + 1)}
          onMouseDown={() => startHolding(1)}
          onMouseUp={stopHolding}
          onMouseLeave={stopHolding}
          onTouchStart={() => startHolding(1)}
          onTouchEnd={stopHolding}
          className="w-12 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition active:scale-95"
        >
          <Plus size={20} />
        </button>

      </div>

      <div className="mt-3 flex justify-between text-sm text-slate-500">
        <span>Minimum: {min}</span>
        <span>Maximum: {max.toLocaleString()}</span>
      </div>

    </div>
  );
}
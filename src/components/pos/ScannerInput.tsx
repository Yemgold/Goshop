

import { useEffect, useRef, useState } from "react";

type Props = {
  onScan: (code: string) => void;
  autoFocus?: boolean;
};

export default function ScannerInput({ onScan, autoFocus = true }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 🔹 Auto focus (important for POS speed)
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  // 🔹 Handle scan submit
  const handleSubmit = () => {
    const code = value.trim();
    if (!code) return;

    onScan(code);
    setValue("");
    inputRef.current?.focus();
  };

  // 🔹 Barcode scanners usually send "Enter"
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full mb-3">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Scan barcode or type product code..."
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
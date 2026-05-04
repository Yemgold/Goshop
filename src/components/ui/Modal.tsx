
import type{ ReactNode } from "react";

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-[400px]">
        {children}

        <button
          className="mt-4 px-3 py-1 bg-black text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>

    </div>
  );
}
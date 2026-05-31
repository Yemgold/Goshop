import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import CartIcon from "../../cart/CartIcon";

interface Props {
  loading?: boolean;
  hasItems?: boolean;
}

export function EmptyCartState({
 
  hasItems = false,
}: Props) {
  const navigate = useNavigate();

  const [stage, setStage] = useState<
    "init" | "checking" | "done"
  >("init");

  const [visible, setVisible] = useState(false);

  /* ================= FIX: FORCE STAGE VISIBILITY ================= */
  useEffect(() => {
    setVisible(true); // ensures first render always shows INIT

    setStage("init");

    const t1 = setTimeout(() => {
      setStage("checking");
    }, 400);

    const t2 = setTimeout(() => {
      setStage("done");
    }, 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const getTitle = () => {
    if (stage === "init") return "Your cart is Loading...";
    if (stage === "checking") return "Checking your cart...";
    return hasItems ? "Your cart has items" : "Your cart is empty";
  };

  const getSubtitle = () => {
    if (stage === "init")
      return "Preparing your shopping session...";
    if (stage === "checking")
      return "Hang on while we load your items...";
    return "Looks like you haven’t added anything yet.";
  };

  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-24 px-6 space-y-6 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* ICON */}
      <div className="relative">
        <div className="bg-gray-100 p-6 rounded-full shadow-sm flex items-center justify-center">
          {stage !== "done" ? (
            <Loader2
              size={48}
              className="text-gray-500 animate-spin"
            />
          ) : (
            <CartIcon />
          )}
        </div>

        {stage !== "done" && (
          <span className="absolute inset-0 rounded-full animate-ping bg-gray-200 opacity-40" />
        )}
      </div>

      {/* TEXT */}
      <div className="space-y-2 max-w-sm">
        <h2 className="text-xl font-semibold text-gray-800">
          {getTitle()}
        </h2>

        <p className="text-sm text-gray-500">
          {getSubtitle()}
        </p>
      </div>

      {/* CTA */}
      {stage === "done" && !hasItems && (
        <>
          <Button
            onClick={() => navigate("/buyers/home")}
            className="px-6 py-3 w-52"
          >
            Start Shopping
          </Button>

          <button
            onClick={() =>
              navigate("/buyers/deals")
            }
            className="text-sm text-blue-600 hover:underline"
          >
            View deals & discounts
          </button>
        </>
      )}
    </div>
  );
}











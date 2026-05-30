

import { Copy, ExternalLink } from "lucide-react";
import { Button } from "../../components/ui/Button";

export function ShareProduct({ productId }: { productId: string }) {
  const url = `${window.location.origin}/products/${productId}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    } catch (err) {
      console.error(err);
      alert("Failed to copy link");
    }
  };

  const openLink = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex gap-2">
      <Button onClick={copyLink} variant="outline">
        <Copy size={16} /> Copy
      </Button>

      <Button onClick={openLink}>
        <ExternalLink size={16} /> Preview
      </Button>
    </div>
  );
}
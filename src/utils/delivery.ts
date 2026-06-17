

export const formatDeliveryMode = (mode?: string | null) => {
  switch (mode) {
    case "pickUpFromOurNearestOffice":
      return "Pick Up From Our Nearest Office";

    case "homeDelivery":
      return "Home Delivery";

    default:
      return "N/A";
  }
};




export const formatPickupCenter = (centers: any[], id: string): string => {
  const center = centers.find((c) => c._id === id);

  if (!center?.name) return "N/A";

  return center.name.replace(/\b\w/g, (c: string) =>
    c.toUpperCase()
  );
};


export const safeArray = <T,>(arr: T[] | null | undefined): T[] => {
  return Array.isArray(arr) ? arr : [];
};


export const formatLabel = (value?: string | null) => {
  if (!value) return "";

  return value
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
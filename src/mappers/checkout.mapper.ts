



export function extractCollectionFee(data: any): number {
  return (
    data?.data?.fee ??
    data?.data?.collectionFee ??
    data?.fee ??
    data?.collectionFee ??
    0
  );
}
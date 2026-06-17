






export const extractCartItems = (res: any) => {
  return Array.isArray(res?.data?.data?.items)
    ? res.data.data.items
    : [];
};

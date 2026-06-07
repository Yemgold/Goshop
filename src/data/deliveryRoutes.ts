


export const nearbyRoutes: Record<string, string[]> = {
  ikeja: ["yaba", "surulere"],
  yaba: ["ikeja", "lekki"],
  adoekiti: ["ikereekiti"],

  lekki: ["ajah"],
  ajah: ["lekki"],
};

export const neighboringStates: Record<string, string[]> = {
  lagos: ["ogun"],
  ogun: ["lagos", "oyo"],
  oyo: ["ogun", "osun"],

  ekiti: ["ondo", "osun" , "ogun"],
  ondo: ["ekiti"],
};
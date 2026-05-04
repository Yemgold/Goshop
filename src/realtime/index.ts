

import { eventBus } from "../utils/eventBus";

export const realtime = {
  emit: (event: string, data?: any) => {
    eventBus.emit(event, data);
  },

  on: (event: string, callback: (data: any) => void) => {
    eventBus.on(event, callback);
  },
};
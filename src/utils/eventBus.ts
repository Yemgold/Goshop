

type EventCallback = (data: any) => void;

class EventBus {
  private events: Record<string, EventCallback[]> = {};

  on(event: string, callback: EventCallback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  emit(event: string, data?: any) {
    (this.events[event] || []).forEach((cb) => cb(data));
  }
}

export const eventBus = new EventBus();
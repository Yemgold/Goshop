

import type { Notification } from "../types/notification.types";

type Listener = (notifications: Notification[]) => void;

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    listener(this.notifications);

    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private emit() {
    this.listeners.forEach(l => l(this.notifications));
  }

  getAll() {
    return this.notifications;
  }

  push(notification: Notification) {
    this.notifications = [notification, ...this.notifications];
    this.emit();
  }

  markAsRead(id: string) {
    this.notifications = this.notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this.emit();
  }

  clear() {
    this.notifications = [];
    this.emit();
  }

  // 🔥 simulate real-time (Uber-like incoming events)
  simulateIncoming() {
    setInterval(() => {
      this.push({
        id: Date.now().toString(),
        title: "New Delivery Update",
        message: "A new order has been assigned to you",
        type: "delivery",
        read: false,
        createdAt: Date.now(),
        link: "/rider/jobs"
      });
    }, 15000); // every 15s
  }
}

export const notificationService = new NotificationService();


import { useEffect, useState } from "react";
import type { Notification } from "../types/notification.types";
import { notificationService } from "../services/notification.service";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe(setNotifications);
    notificationService.simulateIncoming(); // demo real-time
    return unsubscribe;
  }, []);

  return {
    notifications,
    add: notificationService.push.bind(notificationService),
    markAsRead: notificationService.markAsRead.bind(notificationService),
    clear: notificationService.clear.bind(notificationService),
  };
};
export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "order"
  | "delivery";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: number;
  link?: string; // deep link (e.g. /rider/delivery/123)
}
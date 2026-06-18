import { create } from "zustand";

export type AlertType = "success" | "info" | "warning" | "error";

type AlertState = {
  message: string | null;
  type: AlertType;
  showAlert: (message: string, type?: AlertType) => void;
  clearAlert: () => void;
};

export const useAlertStore = create<AlertState>((set) => ({
  message: null,
  type: "info",
  showAlert: (message, type = "info") =>
    set({
      message,
      type,
    }),
  clearAlert: () =>
    set({
      message: null,
      type: "info",
    }),
}));
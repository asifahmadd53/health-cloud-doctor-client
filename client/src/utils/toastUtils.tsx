// toastUtils.tsx
import React from "react"; // must be imported for JSX
import { toast } from "sonner-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type ToastType = "success" | "error" | "warning" | "info";

export const showToast = (type: ToastType, message: string) => {
  let icon: JSX.Element;

  switch (type) {
    case "success":
      icon = <MaterialCommunityIcons name="check-circle" size={22} color="#22c55e" />;
      break;
    case "error":
      icon = <MaterialCommunityIcons name="close-circle" size={22} color="#ef4444" />;
      break;
    case "warning":
      icon = <MaterialCommunityIcons name="alert-circle" size={22} color="#f59e0b" />;
      break;
    case "info":
    default:
      icon = <MaterialCommunityIcons name="information" size={22} color="#3b82f6" />;
      break;
  }

  toast(message, { icon });
};

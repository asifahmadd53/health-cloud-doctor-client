// toastUtils.tsx
import React from "react"; // required for JSX
import { toast } from "sonner-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type ToastType = "success" | "error" | "warning" | "info" | "loading";

export const showToast = (type: ToastType, message: string) => {
  switch (type) {
    case "success":
      toast.success(message, {
        icon: <MaterialCommunityIcons name="check-circle" size={22} color="#22c55e" />,
      });
      break;

    case "error":
      toast.error(message, {
        icon: <MaterialCommunityIcons name="close-circle" size={22} color="#ef4444" />,
      });
      break;

    case "warning":
      toast.warning(message, {
        icon: <MaterialCommunityIcons name="alert-circle" size={22} color="#f59e0b" />,
      });
      break;

    case "loading":
      toast.loading(message, {
        icon: <MaterialCommunityIcons name="loading" size={22} color="#3b82f6" />,
      });
      break;

    case "info":
    default:
      toast(message, {
        icon: <MaterialCommunityIcons name="information" size={22} color="#3b82f6" />,
      });
      break;
  }
};

import { useEffect, type JSX } from "react";
import { useAlertStore } from "@/stores/alert.store";
import { Alert, AlertTitle } from "../ui/alert";
import {
  CheckCircle2Icon,
  AlertCircleIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";

export default function AlertComponents(){
  const { message, type, clearAlert } = useAlertStore();

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      clearAlert();
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, clearAlert])

  if (!message) return null;

  const alertMap: Record<
    string,
    {
      bg: string;
      text: string;
      icon: JSX.Element;
    }
  > = {
    success: {
      bg: "bg-green-50",
      text: "text-green-800",
      icon: <CheckCircle2Icon className="mr-2 h-5 w-5 text-green-500" />,
    },

    info: {
      bg: "bg-blue-50",
      text: "text-blue-800",
      icon: <InfoIcon className="mr-2 h-5 w-5 text-blue-500" />,
    },

    error: {
      bg: "bg-red-50",
      text: "text-red-800",
      icon: <AlertCircleIcon className="mr-2 h-5 w-5 text-red-500" />,
    },

    warning: {
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      icon: <TriangleAlertIcon className="mr-2 h-5 w-5 text-yellow-500" />,
    },
  };

  const { bg, text, icon } = alertMap[type];

  return (
    <div className="fixed top-4 right-4 z-50 w-[320px]">
      <Alert className={`${bg} ${text} flex items-center`}>
        {icon}
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../schemas/auth.schema";
import { useAuthStore } from "@/stores/auth.store";
import { useAlertStore } from "@/stores/alert.store";

export function useLoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const showAlert = useAlertStore((state) => state.showAlert);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const validEmail = import.meta.env.VITE_AUTH_EMAIL;
      const validPassword = import.meta.env.VITE_AUTH_PASSWORD;
      const token = import.meta.env.VITE_AUTH_TOKEN;

      const isValid =
        values.email === validEmail && values.password === validPassword;

      if (!isValid) {
        showAlert("Email atau password salah", "error");

        return;
      }

      login(token, values.email);
      showAlert("Login berhasil", "success");
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    showPassword,
    togglePassword,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
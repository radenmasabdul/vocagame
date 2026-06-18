import { AtSign, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/assets/logo-vocagame.webp";
import HeroImage from "@/assets/overbearing.webp";
import { useLoginForm } from "../hooks/useLoginForm";

export default function LoginPage() {
  const {
    form,
    showPassword,
    togglePassword,
    isLoading,
    onSubmit
  } = useLoginForm();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="flex w-full flex-col items-center justify-center px-8 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex justify-center items-center gap-2">
            <img
              src={Logo}
              alt="logo"
              className="object-contain"
            />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="masukan email"
                  {...register("email")}
                  className="h-12 pl-10 text-sm placeholder:text-gray-400 border-gray-300 focus-visible:ring-red-500 focus-visible:border-red-500"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="masukan password"
                  {...register("password")}
                  className="h-12 pl-10 pr-10 text-sm placeholder:text-gray-400 border-gray-300 focus-visible:ring-red-500 focus-visible:border-red-500"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="mt-2 h-12 w-full bg-red-500 text-sm font-semibold text-white hover:bg-red-600 transition-colors duration-150 disabled:opacity-60"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 items-stretch">
        <div className="relative w-full rounded-l-3xl overflow-hidden">
          <img
            src={HeroImage}
            alt="Illustration"
            className="absolute inset-0 h-full w-full object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
}

import AlertComponents from "@/components/common/Alert";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TooltipProvider>
        <AlertComponents />
        {children}
      </TooltipProvider>
    </>
  );
}

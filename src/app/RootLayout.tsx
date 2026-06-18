import AlertComponents from "@/components/common/Alert";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AlertComponents />
      {children}
    </>
  );
}


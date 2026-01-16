// src/layout/AppLayout.tsx
import Header from "./Header";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-muted/40">
      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

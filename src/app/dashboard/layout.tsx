import { ReactNode } from "react";
import ReduxProvider from "../provider";

export default function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  )
}


import "../styles/globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Parlios — Ton premier employé IA",
  description: "Assistant IA pour entrepreneurs et artistes : gagne du temps, réussis plus, vis mieux."
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return (<html lang="fr"><body>{children}</body></html>);
}

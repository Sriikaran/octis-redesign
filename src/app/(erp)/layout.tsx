import type { Metadata } from "next";
import { ErpShell } from "@/components/erp/ErpShell";

export const metadata: Metadata = {
  title: "Octis ERP | Jewellery Showroom Suite",
  description:
    "Octis ERP local demonstration environment — showroom billing, inventory, and party ledger management.",
};

export default function ErpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ErpShell>{children}</ErpShell>;
}

import { AudioLines } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "../../app/favicon.ico"
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
    >
      <Image src={logo} alt="Logo" height={30} width={30}/>
      <span>EchoGPT</span>
    </span>
  );
}

"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { Bug, Home, KeyRound, MessageCircle, UserCog } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  return (
    <div className={cn("pb-12 relative", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant={pathname === "/home" ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/home">
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Link>
            </Button>
            <Button
              variant={pathname.includes("/my-posts") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/my-posts">
                <MessageCircle className="mr-2 h-4 w-4" />
                Mes posts
              </Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Réglages et sécurité
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <UserCog className="mr-2 h-4 w-4" />
              Compte
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <KeyRound className="mr-2 h-4 w-4" />
              Sécurité
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bug className="mr-2 h-4 w-4" />
              Rapporter un bug
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full p-12">
        {/* <Button
          className=" w-full text-center"
          onClick={() => {
            session ? signOut() : signIn();
          }}
        >
          {session ? "Déconnexion" : "Connexion"}
        </Button> */}
      </div>
    </div>
  );
}

"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { Bug, Home, KeyRound, MessageCircle, UserCog } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useQuery, gql } from "@apollo/client";
import { getCookie } from "cookies-next";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { data, loading, error } = useQuery(
    gql`
      query Query {
        user {
          username
          name
          id
        }
      }
    `,
    {
      context: {
        headers: {
          authorization: `Bearer ${getCookie("token")}`,
        },
      },
    }
  );
  const pathname = usePathname();
  return (
    <div className={cn("pb-12 relative", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Image
            src="/logo.webp"
            width={100}
            height={100}
            alt="logo"
            className="mx-auto rounded-lg"
          />
          <Separator className="my-4" />
          <div className="space-y-1">
            <div className="flex items-center justify-center p-4">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/300" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <h2 className="text-lg font-semibold">
                  {loading ? "Chargement..." : data.user.name}
                </h2>
                <p className="text-muted-foreground">
                  {loading ? "Chargement..." : data.user.username}
                </p>
              </div>
            </div>
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

import { Badge } from "@/components/ui/badge";
import React from "react";
import SearchComponent from "./search";
import UserList from "../components/userList";
import PostList from "../components/postList";
import { Sidebar } from "../components/custom/sidebar";

const menu = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

function HomeLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <div className="bg-background">
      <div className="grid lg:grid-cols-5">
        <Sidebar className="hidden lg:block" />
        <div className="col-span-3 lg:col-span-4 lg:border-l h-screen">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;

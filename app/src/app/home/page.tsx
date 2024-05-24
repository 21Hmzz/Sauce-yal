"use client";
import React from "react";
import PostList from "../components/postList";
import UserList from "../components/userList";
import SearchComponent from "./search";
import { SlidersHorizontal } from "lucide-react";
import AddPostHome from "../components/AddPostHome";
import { Separator } from "@/components/ui/separator";
import LastActivity from "../components/LastActivity";
import FilterHome from "../components/FilterHome";

function Home() {
  const [selected, setSelected] = React.useState<string>("");
  return (
    <main className="w-full h-screen flex">
      <div className="w-3/5 h-full flex flex-col p-4">
        <div className="flex w-full items-center flex-col gap-4 h-full overflow-y-auto">
          <div className="w-full">
            <AddPostHome />
          </div>
          {/* <SearchComponent /> */}
          <Separator />
          <div className={"w-full  "}>
            <div className="flex justify-between items-center gap-4 ">
              {/* icone filtres */}
              <FilterHome selected={selected} setSelected={setSelected} />
            </div>
            <PostList selected={selected} />
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="w-2/5 h-full flex flex-col">
        <SearchComponent />
        <LastActivity />
        <UserList />
      </div>
    </main>
  );
}

export default Home;

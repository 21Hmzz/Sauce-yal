import React from "react";
import PostList from "../components/postList";
import UserList from "../components/userList";
import SearchComponent from "./search";
import { SlidersHorizontal } from "lucide-react";

function Home() {
  return (
    <main className="w-full h-screen flex">
      <div className="w-3/4 h-full flex flex-col p-4 ">
        <div className="flex w-full items-center flex-col gap-4 h-full overflow-y-auto">
          <SearchComponent />
          <div className="w-full">
            <div className="flex justify-end items-center gap-4 py-4">
              {/* icone filtres */}
              <SlidersHorizontal className="h-6 w-6" />
            </div>
            <PostList />
          </div>
        </div>
      </div>
      <div className="w-1/4 h-full flex flex-col  ">
        <UserList />
      </div>
    </main>
  );
}

export default Home;

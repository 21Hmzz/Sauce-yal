"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Flame, Lollipop, Popcorn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { gql, useQuery } from "@apollo/client";
import { getCookie } from "cookies-next";

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function PostList({ selected }: { selected: string }) {
  const router = useRouter();
  const { data, loading, error } = useQuery(
    gql`
      query Posts {
        posts {
          id
          title
          content
          author {
            username
          }
          likes {
            id
          }
          spicy
          salty
          sweet
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

  console.log(data);

  return (
    <div className={"w-full overflow-y-auto py-2"}>
      {/* {PostQuery.isLoading && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {Array.isArray(PostQuery.data) && PostQuery.data && (
        <div className={"grid gap-4 "}>
          {PostQuery.data.map((post: any) => (
            <Card
              onClick={() => router.push(`/posts/${post.id}`)}
              key={post.id}
              className={
                "p-4 bg-slate-50 rounded-lg flex flex-col cursor-pointer hover:bg-slate-300 transition-colors relative " +
                (selected === "spicy"
                  ? "border-red-500 border-4"
                  : selected === "salty"
                  ? "border-blue-500 border-4"
                  : selected === "sweet"
                  ? "border-yellow-500 border-4"
                  : "")
              }
            >
              {selected === "spicy" && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg">
                  <Flame className="h-4 w-4" />
                </span>
              )}
              {selected === "salty" && (
                <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-lg">
                  <Popcorn className="h-4 w-4" />
                </span>
              )}
              {selected === "sweet" && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-lg">
                  <Lollipop className="h-4 w-4" />
                </span>
              )}

              <CardHeader className="flex flex-row gap-2 ">
                <Avatar>
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?u=${randomNumber(1, 50)}`}
                  />
                  <AvatarFallback>
                    {post.title.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>
                  {UserPostQuery.data
                    ? UserPostQuery.data.map((user: any) => {
                        if (user.id === post.userId) {
                          return user.name;
                        }
                      })
                    : "Chargement..."}
                </span>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <h1 className="text-lg font-bold capitalize">{post.title}</h1>

                  <p className="text-sm">{post.body}</p>
                </div>
              </CardContent>
              <CardFooter className="relative">
                <div className="flex flex-row gap-2">
                  <Button variant="outline" className="flex items-center gap-1">
                    🌶️
                    <Badge variant="outline">
                      {randomNumber(1, 50).toFixed(0)}
                    </Badge>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    🍿
                    <Badge variant="outline">
                      {randomNumber(1, 50).toFixed(0)}
                    </Badge>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    🍭
                    <Badge variant="outline">
                      {randomNumber(1, 50).toFixed(0)}
                    </Badge>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default PostList;

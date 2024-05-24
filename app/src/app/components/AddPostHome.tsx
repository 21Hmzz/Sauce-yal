"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

function AddPostHome() {
  const [selected, setSelected] = React.useState("public");
  return (
    <div className="w-full flex flex-col gap-4">
      <Textarea placeholder="Exprimez-vous..." />
      <span className="text-sm text-gray-500">
        {selected === "public"
          ? "Votre publication sera visible par tout le monde."
          : selected === "private"
          ? "Votre publication sera visible uniquement par vous."
          : "Votre publication sera visible uniquement par vos amis."}
      </span>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Badge
            className="cursor-pointer"
            variant={selected === "public" ? "default" : "outline"}
            onClick={() => setSelected("public")}
          >
            Public
          </Badge>
          <Badge
            className="cursor-pointer"
            variant={selected === "private" ? "default" : "outline"}
            onClick={() => setSelected("private")}
          >
            Privé
          </Badge>
          <Badge
            className="cursor-pointer"
            variant={selected === "friends" ? "default" : "outline"}
            onClick={() => setSelected("friends")}
          >
            Amis
          </Badge>
        </div>
        <div>
          <Button className="bg-primary text-white rounded-md px-4 py-2">
            Publier
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddPostHome;

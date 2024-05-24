"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

function FilterHome({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (value: string) => void;
}) {
  return (
    <div className="w-full flex justify-between items-center gap-4">
      <div className="flex space-x-2">
        <Badge
          className="cursor-pointer"
          onClick={() => setSelected("spicy")}
          variant={selected === "spicy" ? "default" : "outline"}
        >
          Pimenté 🌶️
        </Badge>
        <Badge
          className="cursor-pointer"
          onClick={() => setSelected("salty")}
          variant={selected === "salty" ? "default" : "outline"}
        >
          Salé 🍿
        </Badge>
        <Badge
          className="cursor-pointer"
          onClick={() => setSelected("sweet")}
          variant={selected === "sweet" ? "default" : "outline"}
        >
          Sucré 🍭
        </Badge>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <SlidersHorizontal className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              <Label>Filtres</Label>
            </DialogTitle>
            <DialogDescription>
              Trier les publications par date, popularité, etc.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tri</SelectLabel>
                    <SelectItem value="recent">Plus récent</SelectItem>
                    <SelectItem value="oldest">Plus ancien</SelectItem>
                    <SelectItem value="popular">Populaire</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="submit">Appliquer</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Annuler
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FilterHome;

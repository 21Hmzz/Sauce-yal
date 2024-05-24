import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import React from "react";
import { CommentForm } from "./AddCommentForm";

function AddComment() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="absolute bottom-0 right-0 mb-4 mr-4">
          Ajouter un commentaire
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Êtes-vous sûr de vouloir ajouter ce commentaire ?
          </DrawerTitle>
          <DrawerDescription>
            <CommentForm />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Annuler</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddComment;

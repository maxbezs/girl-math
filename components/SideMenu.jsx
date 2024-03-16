import React from "react";
import { Separator } from "@/components/ui/separator";
import { MdMenu, MdUpload, MdOutlineGridView } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PageContent from "./PageContent";
import Link from "next/link";
const SideMenu = ({ currentUser }) => {
  return (
    <Sheet key="left">
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MdMenu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex py-2 items-center gap-2 w-fit ">
              <Avatar>
                <AvatarImage
                  src={currentUser?.photoURL}
                  alt={currentUser?.displayName + "profile picture"}
                />
                <AvatarFallback>
                  {currentUser?.displayName
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {currentUser?.displayName}
            </div>
          </DialogTrigger>
          <DialogContent className="p-4">
            <PageContent variant="" currentUser={currentUser} />
          </DialogContent>
        </Dialog>

        <div className="flex flex-col">
          <Separator />
          {/*<Link
            href={"/add-category?type=expenses"}
            className="flex items-center py-2 gap-2"
          >
            <MdOutlineGridView size="18" />
            Categories
          </Link>
          <Separator />
          <div className="flex items-center py-2 gap-2">
            <MdUpload size="18" />
            Export
          </div>{" "}
          <Separator />*/}
          <ModeToggle></ModeToggle>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;

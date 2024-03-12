"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MdLightMode } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex gap-2 py-2">
      <SheetClose asChild>
        <Button
          variant="outline"
          type="submit"
          size="icon"
          onClick={() => setTheme("light")}
        >
          <MdLightMode />
        </Button>
      </SheetClose>{" "}
      <SheetClose asChild>
        <Button
          variant="outline"
          type="submit"
          size="icon"
          onClick={() => setTheme("dark")}
        >
          <MdNightlightRound />
        </Button>
      </SheetClose>
    </div>
  );
}

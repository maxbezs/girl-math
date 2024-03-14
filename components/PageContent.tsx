"use client";

import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

import { UserRecord } from "firebase-admin/auth";
import SignIn from "../public/sign-in.svg";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";

export default function PageContent({
  variant,
  currentUser,
}: {
  variant: "sign-in" | "";
  currentUser?: UserRecord;
}) {
  const router = useRouter();

  const handleSignIn = async () => {
    const isOk = await signInWithGoogle();

    if (isOk) router.push("/");
  };

  const handleSignOut = async () => {
    const isOk = await signOut();

    if (isOk) router.push("/sign-in");
  };

  if (variant === "sign-in")
    return (
      <div className="w-full h-[90vh] flex flex-col items-center text-center justify-evenly p-4">
        <h1 className=" text-2xl	">Your ✨girly✨ way to track 🩷expenses🩷</h1>
        <Image src={SignIn} alt="" />
        <Button onClick={handleSignIn}>
          <FaGoogle className="mr-2 h-4 w-4" />
          Sign In with Google
        </Button>
      </div>
    );
  else if (variant === "")
    return (
      <>
        <DialogHeader>
          <DialogTitle>Do you really want to sign out?</DialogTitle>
          <DialogDescription>
            You can Sign in again any time or choose another account
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full gap-2 justify-end">
          <Button variant={"outline"} onClick={handleSignOut}>
            Sign Out
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </div>
      </>
    );
  else return null;
}

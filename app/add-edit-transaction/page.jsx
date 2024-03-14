import React from "react";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import TransitionType from "@/components/TransitionType";
import AddEditTransaction from "@/components/AddEditTransaction";
import { redirect } from "next/navigation";

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/sign-in");
  return (
    <div className="flex h-full flex-col  w-full">
      <Tabs defaultValue="expenses">
        <div className="flex justify-between p-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <MdArrowBack />
            </Link>
          </Button>
          <TransitionType />
        </div>
        <TabsContent value="income">
          <AddEditTransaction
            key="income"
            typee="income"
            uidd={currentUser.uid}
          />
        </TabsContent>
        <TabsContent value="expenses">
          <AddEditTransaction
            key="expenses"
            typee="expenses"
            uidd={currentUser.uid}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;

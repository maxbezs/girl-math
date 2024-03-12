import { MdArrowBack } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CategoryGrid from "@/components/CategoryGrid";
import TransitionType from "@/components/TransitionType";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/firebase/firebase-admin";
const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/sign-in");
  return (
    <div className="flex min-h-screen flex-col  w-full">
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
          <CategoryGrid type="income" uid={currentUser.uid} />
        </TabsContent>
        <TabsContent value="expenses">
          <CategoryGrid type="expenses" uid={currentUser.uid} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default page;

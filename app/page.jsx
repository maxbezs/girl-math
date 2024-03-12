import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import MainComponent from "@/components/MainComponent";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/sign-in");

  return (
    <main className="flex min-h-screen flex-col p-4 w-full">
      <MainComponent currentUser={currentUser} />
    </main>
  );
}

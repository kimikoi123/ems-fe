import { redirect } from "next/navigation";

export default async function Home() {
  // TODO: Replace with auth logic
  const isAuthenticated = false;

  if (!isAuthenticated) {
    redirect("/login");
  }
}

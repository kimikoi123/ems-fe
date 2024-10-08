import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navbar />
      <div className="flex p-4 gap-4">
        <Sidebar />
        <div className="bg-slate-100 w-[700px] rounded-lg p-4 ">{children}</div>
      </div>
    </section>
  );
}

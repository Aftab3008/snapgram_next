import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen">
      <div className="w-full md:flex">
        <Topbar />
        <LeftSidebar />

        <section className="flex flex-1 h-full">{children}</section>

        <Bottombar />
      </div>
    </main>
  );
}

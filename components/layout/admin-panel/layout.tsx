"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Footer } from "@/components/layout/admin-panel/footer";
// import { Sidebar } from "@/components/layout/admin-panel/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Navbar } from "./navbar";

export default function AdminPanelLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <>
            {/* <Sidebar /> */}
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
                    "lg:ml-0" // 修复左边的空白
                )}
            >
                <div>
                    <Navbar title={""} />
                    <div className="container mx-auto pt-8 pb-8">
                        {children}
                    </div>
                </div>
            </main>
            <footer
                className={cn(
                    "transition-[margin-left] ease-in-out duration-300",
                    "lg:ml-0" // 修复左边的空白
                )}
            >
                <Footer />
            </footer>
        </>
    );
}
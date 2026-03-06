import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex pt-14 md:pt-16">
            {/* Sidebar only visible on md and above */}
            <div className="hidden md:block fixed top-16 bottom-0 left-0 w-64 z-20">
                <Sidebar />
            </div>

            <main className="flex-1 md:ml-64 relative min-h-[calc(100vh-64px)] overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

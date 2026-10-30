import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({ children }) {
    return (
        <div className="w-full h-full flex items-center justify-center p-2">
            <Sidebar />

            {children}           
        </div>
    );
}

import Sidebar from "@/components/layout/sidebar";

export default function MainLayout({ children }) {
    return (
        <div className="w-full h-full flex items-center justify-center p-2">
            <Sidebar />

            {children}           
        </div>
    );
}

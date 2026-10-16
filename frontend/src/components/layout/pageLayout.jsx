import { Button } from "../ui/button";

export default function PageLayout({ pageConfig, children }) {
    const { page, button } = pageConfig;
    
    return (
        <main className="w-full h-full flex flex-col gap-4 p-4 rounded-2xl border bg-surface-bg">
            <header className="w-full h-15 flex items-center justify-between">
                <h1 className="flex items-center gap-2 text-xl font-semibold">
                    {page.icon}
                    {page.title}
                </h1>

                <Button>
                    {button.icon}
                    <span>{button.text}</span>
                </Button>
            </header>

            <section className="w-full h-full">
                {children}
            </section>
        </main>
    );
}

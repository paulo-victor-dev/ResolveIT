import { Button } from "../ui/button";

export default function PageLayout({ pageConfig, children }) {
    const { page, button } = pageConfig;
    
    return (
        <main className="w-full h-full flex flex-col gap-4 p-6 rounded-2xl border bg-surface-bg">
            <header className="w-full h-15 flex items-center justify-between">
                <div className="flex justify-center gap-3">
                    <span>{page.icon}</span>
                    
                    <div className="flex flex-col -mt-1">
                        <h1 className="flex text-xl font-bold">
                            {page.title}
                        </h1>

                        <h2 className="text-sm opacity-60">
                            {page.subTitle}
                        </h2>
                    </div>
                </div>

                <Button className="p-4">
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

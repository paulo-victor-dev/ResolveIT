
export default function DashboardLayout({ dashboardConfig, children }) {
    const { title, subTitle, icon } = dashboardConfig;

    return (
        <main className="w-full h-full flex flex-col gap-4 p-6 rounded-2xl border bg-surface-bg">
            <header className="w-full h-15 flex">
                <div className="flex justify-center gap-3">
                    <span>{icon}</span>
                    
                    <div className="flex flex-col -mt-1">
                        <h1 className="flex text-xl font-bold">
                            {title}
                        </h1>

                        <h2 className="text-sm opacity-60">
                            {subTitle}
                        </h2>
                    </div>
                </div>
            </header>

            <section className="w-full h-full flex flex-col gap-4">
                {children}
            </section>
        </main>
    );
}

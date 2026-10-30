
export default function PageHeader({ pageConfig }) {
    return (
        <header className="w-full h-15 flex">
            <div className="flex justify-center gap-3">
                <span>{pageConfig.page.icon}</span>
                
                <div className="flex flex-col -mt-1">
                    <h1 className="flex text-xl font-bold">
                        {pageConfig.page.title}
                    </h1>

                    <h2 className="text-sm opacity-60">
                        {pageConfig.page.subTitle}
                    </h2>
                </div>
            </div>
        </header>
    );
}

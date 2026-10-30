import PageHeader from "./page-header";
import PageSection from "./page-section";

export default function PageLayout({ 
    pageConfig = {}, 
    paramsConfig = {}, 
    tableConfig = {}, 
    type="default",
    children = null
}) {
    return (
        <main className="w-full h-full flex flex-col gap-6 p-6 rounded-2xl border bg-surface-bg">
            <PageHeader pageConfig={pageConfig} />

            {type === "default" ? (
                <PageSection
                    pageConfig={pageConfig}
                    paramsConfig={paramsConfig}
                    tableConfig={tableConfig}
                />
            ) : (
                children
            )}
        </main>
    );
}

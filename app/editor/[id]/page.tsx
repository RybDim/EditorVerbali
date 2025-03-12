"use client";
import { lazy, Profiler, Suspense } from "react";
import { Presenze } from "@/components/sections/presenze/presenze";
import { ApprovazioneVerbalePrecedente } from "@/components/sections/approvazione_verbale/approvazione_verbale";
import { VerbaleHeader } from "@/components/verbale_header";
import { PdfViewer } from "@/components/pdf-viewer/pdfViewer";
import { Loader2 } from "lucide-react";
import { useVerbale } from "@/hooks/useVerbale";
import { FormProvider } from "react-hook-form";
import { DbVerbaleData } from "@/types/types";

const AssegniDiRicerca = lazy(() => import("@/components/sections/assegni_ricerca/main_assegni"));
const BorseDiStudio = lazy(() => import("@/components/sections/borse_studio/main_borse_studio"));

function SectionComponent({ type, verbale }: { type: string; verbale: DbVerbaleData }) {
	return (
		<Suspense fallback={<SectionSkeleton />}>
			{type === "Assegni di ricerca" ? (
				<AssegniDiRicerca verbale={verbale} />
			) : type === "Borse di studio" ? (
				<BorseDiStudio verbale={verbale} />
			) : null}
		</Suspense>
	);
}

function SectionSkeleton() {
	return (
		<div className="animate-pulse space-y-3 mb-6">
			<div className="h-7 bg-gray-200 rounded w-1/3"></div>
			<div className="h-24 bg-gray-200 rounded"></div>
		</div>
	);
}

SectionComponent.displayName = "SectionComponent";

export default function Editor() {
	const { verbale, error, loading, sezioni, setSezioni, formContext, updateVerbale } = useVerbale();

	if (error) return <div>Error: {error.message}</div>;
	if (loading)
		return (
			<div className="flex flex-col gap-2 items-center justify-center h-screen text-muted-foreground">
				<Loader2 className="animate-spin" />
			</div>
		);
	if (!verbale)
		return (
			<div className="flex flex-col gap-2 items-center justify-center h-screen text-muted-foreground">
				No verbale data available
			</div>
		);

	return (
		<Profiler id="Editor" onRender={(id, phase, actualDuration) => console.log(`${id} rendered in ${phase} phase for ${actualDuration}ms`)}>
			<>
				<VerbaleHeader numero={verbale.data?.numero || ""} sezioni={sezioni} setSezioni={setSezioni} />
				<div className="grid grid-cols-5 grid-rows-1">
					<div className="col-span-3 p-4">
						<FormProvider {...formContext}>
							<form className="flex-col space-y-5" id="verbale-form" onSubmit={formContext.handleSubmit(updateVerbale)}>
								<Presenze verbale={verbale} />
								<ApprovazioneVerbalePrecedente verbale={verbale} />
								{sezioni.map((type) => (
									<SectionComponent key={type} type={type} verbale={verbale} />
								))}
							</form>
						</FormProvider>
					</div>
					<div className="col-span-2 col-start-4 p-4">
						<div className="sticky top-[calc(4rem+7px)] h-[calc(100vh-5rem)]">
							<PdfViewer base64={verbale.base64} />
						</div>
					</div>
				</div>
			</>
		</Profiler>
	);
}

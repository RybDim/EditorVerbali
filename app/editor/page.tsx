"use client";
import { verbaleAtom } from "@/atoms/verbale";
import { activeSectionsVerbaleAtom } from "@/atoms/verbale_sections";
import { Presenze } from "@/components/sections/presenze/presenze";
import { AssegniDiRIcerca } from "@/components/sections/assegni_ricerca/main_assegni";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { template } from "@/lib/template";
import { FormValues } from "@/types/types";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { BorseDiStudio } from "@/components/sections/borse_studio/main_borse_studio";

async function generateVerbale(formData: FormValues): Promise<string> {
	const texDoc = template(formData);
	try {
		const response = await fetch("/api/compile", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tex_string: texDoc }),
		});

		if (!response.ok) {
			throw new Error("Pdf generation failed");
		}

		const data = await response.json();
		return data.pdf;
	} catch (error) {
		console.log("Error generating pdf: ", error);
		throw error;
	}
}

export default function Editor() {
	const [sezioni, setSezioni] = useState<string[]>([]);
	const [value, setValue] = useState<string | null>(null);
	const [verbale, setVerbale] = useAtom(verbaleAtom);
	const [, setSections] = useAtom(activeSectionsVerbaleAtom);

	const searchParams = useSearchParams();
	const formContext = useForm<FormValues>({
		defaultValues: {
			numero: searchParams.get("numero_verbale") as string,
			data: searchParams.get("data") as string,
			verbalizzante: searchParams.get("verbalizzante") as string,
			direttore: searchParams.get("direttore") as string,
		},
	});

	const handleFormSubmit = useCallback(async () => {
		const formValues = formContext.getValues();
		setVerbale({ ...verbale, isLoading: true });
		setSections(sezioni);
		try {
			const nuovoUrlverbale = await generateVerbale(formValues);
			setVerbale({ ...verbale, url: nuovoUrlverbale, isLoading: false });
		} catch (error) {
			console.error(error);
			setVerbale({ ...verbale, isError: true, isLoading: false });
		}
	}, [formContext, verbale, setVerbale, sezioni, setSections]);

	const renderComponent = (type: string) => {
		switch (type) {
			case "assegniDiRicerca":
				return <AssegniDiRIcerca key="assegniDiRicerca" />;
			case "borseDiStudio":
				return <BorseDiStudio key="borseDiStudio" />;
		}
	};

	const handleAdd = () => {
		if (value && !sezioni.includes(value)) {
			setSezioni((prev) => [...prev, value]);
		}
	};

	const PdfViewer = dynamic(
		() => import("../components/pdf-viewer/pdfViewer"),
		{ ssr: false },
	);

	return (
		<>
			<div className="sticky top-0 z-50 bg-slate-50 flex items-center justify-between w-full p-2 border-b border-border shadow-md">
				<div className="flex space-x-2">
					<Select onValueChange={setValue}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Sottosezioni" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="assegniDiRicerca">
									Assegni di ricerca
								</SelectItem>
								<SelectItem value="borseDiStudio">Borse di studio</SelectItem>
								<SelectItem value="conclusione">Conclusione</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Button type="button" size={"sm"} onClick={handleAdd}>
						Aggiungi
					</Button>
				</div>
				<div className="text-center w-full">
					Verbale n. {searchParams.get("numero_verbale") as string}
				</div>
				<div>
					<Button form="verbale-form">Compila</Button>
				</div>
			</div>
			<div className="grid grid-cols-5 grid-rows-1">
				<div className="col-span-3 p-4">
					<div className="flex-col space-y-5">
						<FormProvider {...formContext}>
							<form
								className="flex-col space-y-5"
								id="verbale-form"
								onSubmit={formContext.handleSubmit(handleFormSubmit)}
							>
								<Presenze />
								{sezioni.map((type) => renderComponent(type))}
							</form>
						</FormProvider>
					</div>
				</div>
				<div className="col-span-2 col-start-4 p-4">
					<div className="sticky top-[calc(4rem+7px)]">
						<PdfViewer />
					</div>
				</div>
			</div>
		</>
	);
}

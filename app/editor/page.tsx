"use client";
import { PdfViewer } from "@/components/pdf-viewer/pdfViewer";
import { Presenze } from "@/components/sections/presenze/presenze";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { template } from "@/lib/template";
import { FormValues } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

async function generateVerbale(formData: FormValues) : Promise<string> {
	const texDoc = template(formData);
	try {
		const response = await fetch("/api/compile", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ latex: texDoc }),
		});

		if(!response.ok){
			throw new Error("Pdf generation failed");
		}

		const data = await response.json();
		return data;
	}catch(error){
		console.log("Error generating pdf: ", error);
		throw error;
	}
}

export default function Editor() {
	const [sezioni, setSezioni] = useState<string[]>([]);
	const [value, setValue] = useState<string | null>(null);
	const searchParams = useSearchParams();
	
	const handleAdd = () => {
		if (value && !sezioni.includes(value)) {
			setSezioni((prev) => [...prev, value]);
		}
	};

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
								<SelectItem value="richiesta">Richiesta</SelectItem>
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
                        <Presenze />
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

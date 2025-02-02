"use client";
import { PdfViewer } from "@/components/pdf-viewer/pdfViewer";
import { Presenze } from "@/components/sections/presenze/presenze";
import { template } from "@/lib/template";
import { FormValues } from "@/types/types";

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
	return (
		<>
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

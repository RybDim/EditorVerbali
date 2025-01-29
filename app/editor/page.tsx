"use client";
import { PdfViewer } from "@/components/pdf-viewer/pdfViewer";
import { Presenze } from "@/components/sections/presenze/presenze";

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

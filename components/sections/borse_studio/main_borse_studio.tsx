"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RinnovoBorsaDiStudio } from "./rinnovo";
import { DbVerbaleData } from "@/types/types";

export default function BorseDiStudio({ verbale }: { verbale: DbVerbaleData}) {
	const [sottosezioni, setSottosezioni] = useState<string[]>([]);
	const [value, setSelectedValue] = useState<string | null>(null);

	useEffect(() => {
		if (!verbale?.data?.borseDiStudio) return;
		
		const subsections = [];
		
		if (verbale.data.borseDiStudio.rinnovi?.length > 0) {
			subsections.push("rinnovo");
		}
		
		if (subsections.length > 0) {
			setSottosezioni(subsections);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderComponent = (type: string) => {
		switch (type) {
			case "rinnovo":
				return <RinnovoBorsaDiStudio key="rinnovo" verbale={verbale} />;
			default:
				return null;
		}
	};

	const handleAdd = () => {
		if (value && !sottosezioni.includes(value)) {
			setSottosezioni((prev) => [...prev, value]);
		}
	};
	return (
		<>
			<Card className="shadow-none rounded-sm hover:shadow-md ">
				<CardHeader className="border-b p-3">
					<div className="flex justify-between">
						<CardTitle className="text-lg inline">Borse di studio</CardTitle>
						<div className="flex space-x-2">
							<Select onValueChange={setSelectedValue}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Sottosezioni" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="rinnovo">Rinnovo</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<Button type="button" size={"sm"} onClick={handleAdd}>
								Aggiungi
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent className="rounded-sm p-5">
					<div className="flex-col gap-5">
						{/* <RinunciaBorsaRicerca /> */}
						{sottosezioni.map((type) => renderComponent(type))}
					</div>
				</CardContent>
			</Card>
		</>
	);
}

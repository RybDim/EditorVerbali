"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RinunciaAssegnoRicerca } from "./rinuncia";
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
import { ConclusioneAssegnoRicerca } from "./conclusione";
import { DbVerbaleData } from "@/types/types";

export default function AssegniDiRicerca({ verbale }: { verbale: DbVerbaleData }) {
	const [sottosezioni, setSottosezioni] = useState<string[]>([]);
	const [value, setSelectedValue] = useState<string | null>(null);

	useEffect(() => {
		if (!verbale?.data?.assegniDiRicerca) return;
		
		const subsections = [];
		
		if (verbale.data.assegniDiRicerca.rinunce?.length > 0) {
			subsections.push("rinuncia");
		}
		
		if (verbale.data.assegniDiRicerca.conclusioni?.length > 0) {
			subsections.push("conclusione");
		}
		
		if (subsections.length > 0) {
			setSottosezioni(subsections);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderComponent = (type: string) => {
		switch (type) {
			case "rinuncia":
				return <RinunciaAssegnoRicerca key="rinuncia" verbale={verbale}/>;
			case "conclusione":
				return <ConclusioneAssegnoRicerca key="conclusione" verbale={verbale} />;
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
						<CardTitle className="text-lg inline">Assegni di ricerca</CardTitle>
						<div className="flex space-x-2 items-center">
							<Select onValueChange={setSelectedValue}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Sottosezioni" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="rinuncia">Rinuncia</SelectItem>
										<SelectItem value="conclusione">Conclusione</SelectItem>
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
					<div className="flex-col gap-5 space-y-5">
						{sottosezioni.map((type) => renderComponent(type))}
					</div>
				</CardContent>
			</Card>
		</>
	);
}

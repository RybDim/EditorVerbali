"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RinunciaAssegnoRicerca } from "./rinuncia";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	// SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function AssegniDiRIcerca() {
	const [sottosezioni, setSottosezioni] = useState<string[]>([]);
	const [value, setSelectedValue] = useState<string | null>(null);

	const renderComponent = (type: string) => {
		console.log(type);
		switch (type) {
			case "rinuncia":
				return <RinunciaAssegnoRicerca key="rinuncia" />;
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
						<div className="flex space-x-2">
							<Select onValueChange={setSelectedValue}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Sottosezioni" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{/* <SelectLabel>Fruits</SelectLabel> */}
										<SelectItem value="rinuncia">Rinuncia</SelectItem>
										<SelectItem value="richiesta">Richiesta</SelectItem>
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
					<div className="flex-col gap-5">
						{/* <RinunciaBorsaRicerca /> */}
						{sottosezioni.map((type) => renderComponent(type))}
					</div>
				</CardContent>
			</Card>
		</>
	);
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RinunciaAssegnoRicerca } from "./rinuncia";
import { useState } from "react";
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

export function AssegniDiRIcerca() {
	const [sottosezioni, setSottosezioni] = useState<string[]>([]);
	const [value, setSelectedValue] = useState<string | null>(null);

	const renderComponent = (type: string) => {
		switch (type) {
			case "rinuncia":
				return <RinunciaAssegnoRicerca key="rinuncia" />;
			case "conclusione":
				return <ConclusioneAssegnoRicerca key="conclusione" />;
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

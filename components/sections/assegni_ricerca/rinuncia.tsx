"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DbVerbaleData } from "@/types/types";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function RinunciaAssegnoRicerca({ verbale }: { verbale: DbVerbaleData }) {
	const formContext = useFormContext();
	const { fields, append, replace } = useFieldArray({
		name: "assegniDiRicerca.rinunce",
		control: formContext.control
	});

	useEffect(() => {
		const rinunce = verbale?.data?.assegniDiRicerca?.rinunce;
		
		if (rinunce && Array.isArray(rinunce) && rinunce.length > 0 && fields.length === 0) {
			replace(rinunce);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAdd = () => {
		append({
			numeroProtocollo: "",
			rinunciatario: "",
			numeroBando: "",
			responsabileScientifico: "",
			motivoRinuncia: "",
		});
	};

	return (
		<Card className="shadow-none rounded-sm hover:shadow-md">
			<CardHeader className="border-b p-3">
				<CardTitle className="text-lg">Rinunce</CardTitle>
			</CardHeader>
			<CardContent className="rounded-sm p-5">
				{fields.map((field, index) => (
					<Card
						key={field.id}
						className="shadow-none rounded-sm hover:shadow-md mt-4"
					>
						<CardHeader>
							<CardTitle>
								<div className="flex gap-2 items-center">
									<span className="whitespace-nowrap">Rinuncia dott.</span>
									<Input
										type="text"
										name={`assegniDiRicerca.rinunce.${index}.rinunciatario`}
										placeholder="Rinunciatario"
									/>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent className="rounded-sm p-2">
							<div className="flex gap-3">
								<Input
									type="text"
									name={`assegniDiRicerca.rinunce.${index}.numeroProtocollo`}
									placeholder="Numero protocollo"
								/>
								<Input
									type="text"
									name={`assegniDiRicerca.rinunce.${index}.numeroBando`}
									placeholder="Numero bando"
								/>
								<Input
									type="text"
									name={`assegniDiRicerca.rinunce.${index}.responsabileScientifico`}
									placeholder="Responsabile scientifico"
								/>
							</div>
							<Textarea
								name={`assegniDiRicerca.rinunce.${index}.motivoRinuncia`}
								placeholder="Motivo della rinuncia"
								rows={5}
								className="mt-4"
							/>
						</CardContent>
					</Card>
				))}
				<Button
					type="button"
					onClick={handleAdd}
					className="mt-6 "
					variant="outline"
				>
					Aggiungi rinuncia
				</Button>
			</CardContent>
		</Card>
	);
}

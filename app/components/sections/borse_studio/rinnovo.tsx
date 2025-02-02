"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray } from "react-hook-form";

export function RinnovoBorsaDiStudio() {
	const { fields, append } = useFieldArray({
		name: "borseDiStudio.rinnovi",
	});

	const handleAdd = () => {
		append({
            responsabile: "",
            mesi_prolungamento: "",
            data_partenza: "",
            importo: "",
            tema: "",
            numero_bando: "",
            data_bando: "",
            assegnatario: "",
            numero_protocollo: "",
            upb: "",
            upb_prof: "",
		});
	};


	return (
		<Card className="shadow-none rounded-sm hover:shadow-md">
			<CardHeader className="border-b p-3">
				<CardTitle className="text-lg">Rinnovi</CardTitle>
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
									<span className="whitespace-nowrap">Rinnovo borsa di studio dott.</span>
									<Input
										type="text"
										name={`borseDiStudio.rinnovi.${index}.assegnatario`}
										placeholder="Assegnatario"
									/>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent className="rounded-sm p-2">
							<div className="flex gap-3">
								<Input
									type="text"
									name={`borseDiStudio.rinnovi.${index}.responsabile`}
									placeholder="Responsabile scientifico"
								/>
								<Input
									type="number"
									name={`borseDiStudio.rinnovi.${index}.mesi_prolungamento`}
									placeholder=""
								/>
								<Input
									type="Number"
									name={`borseDiStudio.rinnovi.${index}.importo`}
									placeholder="Importo"
								/>
							</div>
                            <div className="flex gap-3">
								<Input
									type="number"
									name={`borseDiStudio.rinnovi.${index}.upb`}
									placeholder="UPB"
								/>
								<Input
									type="text"
									name={`borseDiStudio.rinnovi.${index}.upb_prof`}
									placeholder="UPB del prof."
								/>
							</div>
							<Textarea
								name={`borseDiStudio.rinnovi.${index}.tema`}
								placeholder="Tema borsa"
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
					Aggiungi rinnovo
				</Button>
			</CardContent>
		</Card>
	);
}

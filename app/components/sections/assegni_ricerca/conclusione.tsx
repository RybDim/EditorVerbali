"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFieldArray } from "react-hook-form";

export function ConclusioneAssegnoRicerca() {
	const { fields, append } = useFieldArray({
		name: "assegniDiRicerca.conclusioni",
	});

	const handleAdd = () => {
		append({
			dottore: "",
			ssd: "",
			titolo: "",
			responsabile_scientifico: "",
		});
	};

	return (
		<Card className="shadow-none rounded-sm hover:shadow-md">
			<CardHeader className="border-b p-3">
				<CardTitle className="text-lg">Conclusioni</CardTitle>
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
									<span className="whitespace-nowrap">
										Conclusione assegno di ricerca del dott.
									</span>
									<Input
										type="text"
										name={`assegniDiRicerca.conclusioni.${index}.dottore`}
										placeholder="Dottore"
									/>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent className="rounded-sm p-2">
							<div className="flex gap-3">
								<Input
									type="text"
									name={`assegniDiRicerca.conclusioni.${index}.ssd`}
									placeholder="SSD"
								/>
								<Input
									type="text"
									name={`assegniDiRicerca.conclusioni.${index}.titolo`}
									placeholder="Titolo"
								/>
								<Input
									type="text"
									name={`assegniDiRicerca.conclusioni.${index}.responsabile_scientifico`}
									placeholder="Responsabile scientifico"
								/>
							</div>
						</CardContent>
					</Card>
				))}
				<Button
					type="button"
					onClick={handleAdd}
					className="mt-6 "
					variant="outline"
				>
					Aggiungi conclusione
				</Button>
			</CardContent>
		</Card>
	);
}

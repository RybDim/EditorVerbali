"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFieldArray } from "react-hook-form";

export function ApprovazioneVerbalePrecedente() {
	const {} = useFieldArray({
		name: "approvazione",
	});

	return (
		<Card className="shadow-none rounded-sm hover:shadow-md">
			<CardHeader className="border-b p-3">
				<CardTitle className="text-lg">
					Approvazione verbale precedente
				</CardTitle>
			</CardHeader>
			<CardContent className="rounded-sm p-5 flex space-x-5">
				<Input
					type="number"
					name={`approvazione.numero_verbale`}
					placeholder="Numero verbale"
				/>
				<Input
					type="date"
					name={`approvazione.data_verbale`}
					placeholder="Data verbale"
				/>
			</CardContent>
		</Card>
	);
}

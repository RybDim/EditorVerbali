"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DbVerbaleData } from "@/types/types";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export function ApprovazioneVerbalePrecedente({ verbale }: { verbale: DbVerbaleData}) {
	const formContext = useFormContext();

	useEffect(() => {
		if(verbale.data?.approvazione !== undefined){
			formContext.setValue("approvazione.numero_verbale", verbale.data?.approvazione.numero_verbale);
			formContext.setValue("approvazione.data_verbale", verbale.data?.approvazione.data_verbale);
		}
	}, [formContext, verbale.data?.approvazione]);

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

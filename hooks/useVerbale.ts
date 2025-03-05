import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import axios from "axios";
import { generateVerbale } from "@/lib/utils";
import { DbVerbaleData, FormValues } from "@/types/types";

export function useVerbale() {
	const { id } = useParams();
	const [verbale, setVerbale] = useState<DbVerbaleData | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [sezioni, setSezioni] = useState<string[]>([]);

	const formContext = useForm<FormValues>({
		defaultValues: {
			numero: "",
			data: "",
			verbalizzante: "",
			direttore: "",
		},
	});

	useEffect(() => {
		if (!id) return;

		const fetchVerbale = async () => {
			try {
				const { data } = await axios.get(`/api/verbale/${id}`);
				setVerbale(data.verbale);
				setSezioni(data.verbale.sections);

				if (data.verbale.data) {
					formContext.reset(
						{
							numero: data.verbale.data.numero || "",
							data: data.verbale.data.data || "",
							verbalizzante: data.verbale.data.verbalizzante || "",
							direttore: data.verbale.data.direttore || "",
						},
						{ keepDefaultValues: true }
					);
				}
			} catch (err) {
				setError(err instanceof Error ? err : new Error("An error occurred"));
			} finally {
				setLoading(false);
			}
		};

		fetchVerbale();
	}, [id, formContext]);

	const updateVerbale = useCallback(
		async (formData: FormValues) => {
			if (!id) return;

			try {
				const base64 = await generateVerbale(formData, sezioni);
				const { data } = await axios.put(`/api/verbale/${id}`, {
					data: formData,
					sections: sezioni,
					base64,
				});
				setVerbale(data.updatedVerbale);
			} catch (err) {
				console.error("Error updating verbale:", err);
			}
		},
		[id, sezioni]
	);

	return { verbale, error, loading, sezioni, setSezioni, formContext, updateVerbale };
}

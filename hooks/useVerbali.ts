import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { verbaleSchema } from '@/lib/schemas/verbale_schema';
import axios from 'axios';

type VerbaleFormData = z.infer<typeof verbaleSchema>;

interface Verbale {
	id: string;
	data: {
		numero: string;
		data: string;
		verbalizzante: string;
		direttore: string;
	};
	createdAt: string;
}

export function useVerbali() {
	const [verbali, setVerbali] = useState<Verbale[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchVerbali = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await axios.get("/api/verbale");
			setVerbali(response.data.verbali);
		} catch (err) {
			setError(err instanceof Error ? err : new Error("Erorre sconosciuto"));
			console.error("Errore nel recupero dei verbali :", err);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const createVerbale = useCallback(async (data: VerbaleFormData) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await axios.post("/api/verbale", data);
			setVerbali(prev => [...prev, response.data.verbale]);
			return response.data;
		} catch (err) {
			setError(err instanceof Error ? err : new Error("An unknown error occurred"));
			console.error("Error creating verbale:", err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	}, []);

	const deleteVerbale = useCallback(async (id: string) => {
		setIsLoading(true);
		setError(null);
		try {
			await axios.delete(`/api/verbale/${id}`);
			setVerbali(prev => prev.filter(verbale => verbale.id !== id));
		} catch (err) {
			setError(err instanceof Error ? err : new Error("An unknown error occurred"));
			console.error("Error deleting verbale:", err);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchVerbali();
	}, [fetchVerbali]);

	return {
		verbali,
		isLoading,
		error,
		fetchVerbali,
		createVerbale,
		deleteVerbale,
	};
}

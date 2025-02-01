export type Presenza = {
	nome: string;
	ruolo: string;
	presente: string;
	assente: string;
	assente_giustificato: string;
};

export type RinunciaBorsaDiRicerca = {
	numeroProtocollo: string;
	rinunciatario: string;
	numeroBando: string;
	responsabileScientifico: string;
	motivoRinuncia: string;
};

export type AssegniDiRicerca = {
	rinunce: RinunciaBorsaDiRicerca[];
}

export type Verbale = {
	numero: string;
	data: string;
	verbalizzante: string;
	direttore: string;
	presenze: Presenza[];
	assegniDiRicerca: AssegniDiRicerca;
}

export type FormValues = Verbale;
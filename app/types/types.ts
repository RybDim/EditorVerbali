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
};

export type RinnovoBorsaDiStudio = {
	richiedente: string;
	mesi: string;
	data_partenza: string;
	importo: string;
	tema: string;
	numero_bando: string;
	data_bando: string;
	assegnatario: string;
	numero_protocollo: string;
	upb: string;
	upb_prof: string;
}

export type BorseDiStudio = {
	rinnovi: RinnovoBorsaDiStudio[];
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
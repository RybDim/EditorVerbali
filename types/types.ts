export type Presenza = {
	nome: string;
	ruolo: string;
	presente: string;
	assente: string;
	assente_giustificato: string;
};

export type ApprovazioneVerbalePrecedente = {
	numero_verbale: string;
	data_verbale: string;
};

export type RinunciaAssegnoRicerca = {
	numeroProtocollo: string;
	rinunciatario: string;
	numeroBando: string;
	responsabileScientifico: string;
	motivoRinuncia: string;
};

export type ConclusioneAssegnoRicerca = {
	dottore: string;
	ssd: string;
	titolo: string;
	responsabile_scientifico: string;
};

export type AssegniDiRicerca = {
	rinunce: RinunciaAssegnoRicerca[];
	conclusioni: ConclusioneAssegnoRicerca[];
};

export type RinnovoBorsaStudio = {
	responsabile: string;
	mesi_prolungamento: string;
	data_partenza: string;
	importo: string;
	tema: string;
	numero_bando: string;
	data_bando: string;
	assegnatario: string;
	numero_protocollo: string;
	upb: string;
	upb_prof: string;
};

export type BorseDiStudio = {
	rinnovi: RinnovoBorsaStudio[];
};

export type Verbale = {
	numero: string;
	data: string;
	verbalizzante: string;
	direttore: string;
	presenze: Presenza[];
	approvazione: ApprovazioneVerbalePrecedente;
	assegniDiRicerca?: AssegniDiRicerca;
	borseDiStudio?: BorseDiStudio;
};

export type FormValues = Verbale;

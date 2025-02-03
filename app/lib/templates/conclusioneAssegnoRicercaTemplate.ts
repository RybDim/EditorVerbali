import { ConclusioneAssegnoRicerca } from "@/types/types";

export function conclusioneAssegnoRicercaTemplate({
	dottore,
	ssd,
	titolo,
	responsabile_scientifico,
}: ConclusioneAssegnoRicerca) {
	return `
		\\subsection{Conclusione assegno di ricerca del dott. ${dottore}}
		Il Direttore comunica di aver ricevuto la comunicazione della conclusione delle attività di ricerca relative all’assegno di ricerca attribuito al/alla dott. ${dottore}, SSD ${ssd}, dal titolo "${titolo}". Il responsabile scientifico proff. ${responsabile_scientifico} ha inviato il sup parere scientifico sulle attività svolte (Allegato x), presentate nel dettaglio dal dott. ${dottore} nella relazione, qui allegata (Allegato x).
	`;
}

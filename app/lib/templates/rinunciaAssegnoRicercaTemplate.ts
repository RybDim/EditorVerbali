import { RinunciaAssegnoRicerca } from "@/types/types";

export function rinunciaAssegnoRicercaTemplate({
	rinunciatario,
	numeroProtocollo,
	numeroBando,
	responsabileScientifico,
	motivoRinuncia,
}: RinunciaAssegnoRicerca) {
	return `\\subsection{Rinuncia dott. ${rinunciatario}}
		Il Direttore comunica che con nota protocollo ${numeroProtocollo} il dott. ${rinunciatario} ha dichiarato di voler rinunciare all'assegno di ricerca su xxxxxxx emanato con DR ${numeroBando} del xx.xx.2xx, in quanto ${motivoRinuncia}. A tale scopo consegna la relazione conclusiva delle attività svolte (Allegato x) congiuntamente al parere del responsabile scientifico prof. ${responsabileScientifico} (Allegato x). Il Consiglio inanime approva`;
}

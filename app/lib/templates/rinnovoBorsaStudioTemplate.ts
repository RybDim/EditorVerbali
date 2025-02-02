import { RinnovoBorsaDiStudio } from "@/types/types";

export function rinnovoBorsaDiStudioTemaplate({
    responsabile,
	mesi_prolungamento,
	data_partenza,
	importo,
	tema,
	numero_bando,
	data_bando,
	assegnatario,
	numero_protocollo,
	upb,
	upb_prof,
}: RinnovoBorsaDiStudio){
    return `
        Il Direttore informa di aver ricevuto richiesta dal responsabile scientifico prof. ${responsabile} (Allegato 13) di prolungamento di ulteriori mesi ${mesi_prolungamento} a partire da ${data_partenza} della borsa di studio assegnata al dott. ${assegnatario} per un importo complessivo di euro ${importo}. Il tema della borsa verte su “${tema}" all'interno del progetto Ego4D, bando nr. ${numero_bando} del ${data_bando}, assegnata al dott. ${assegnatario} con protocollo ${numero_protocollo}. La borsa trova regolare copertura su fondi UPB ${upb} del prof. ${upb_prof}. \\textbf{Il Consiglio, unanime, approva}.`
}
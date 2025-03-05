"use server";
import {
	AssegniDiRicerca,
	BorseDiStudio,
	ConclusioneAssegnoRicerca,
	FormValues,
	RinnovoBorsaStudio,
	RinunciaAssegnoRicerca,
} from "@/types/types";
import { source, stripIndent } from "common-tags";
import { rinunciaAssegnoRicercaTemplate } from "./templates/rinunciaAssegnoRicercaTemplate";
import { rinnovoBorsaStudioTemaplate } from "./templates/rinnovoBorsaStudioTemplate";
import { conclusioneAssegnoRicercaTemplate } from "./templates/conclusioneAssegnoRicercaTemplate";

const generator = {
	assegniDiRicercaSection(subsections: AssegniDiRicerca | undefined) {
		if (!subsections) return "";
		
		const rinuncePart = this.rinunciaAssegnoSubsection(subsections.rinunce);
		const conclusioniPart = this.conclusioneAssegnoSubsection(subsections.conclusioni);
		
		if (!rinuncePart && !conclusioniPart) return "";
		if (!rinuncePart) return conclusioniPart;
		if (!conclusioniPart) return rinuncePart;
		
		return [rinuncePart, conclusioniPart].join("\n\n");
	},

	rinunciaAssegnoSubsection(
		rinunciaBorsa: Array<RinunciaAssegnoRicerca> | null | undefined,
	) {
		if (!rinunciaBorsa || rinunciaBorsa.length === 0) return "";
		
		return source`
			${rinunciaBorsa.map((rinuncia) => {
				return stripIndent(rinunciaAssegnoRicercaTemplate(rinuncia));
			})}
		`;
	},

	conclusioneAssegnoSubsection(
		conclusioneAssegno: Array<ConclusioneAssegnoRicerca> | null | undefined,
	) {
		if (!conclusioneAssegno || conclusioneAssegno.length === 0) return "";
		
		return source`
				${conclusioneAssegno.map((conclusione) => {
					return stripIndent(conclusioneAssegnoRicercaTemplate(conclusione));
				})}
			`;
	},

	borseDiStudioSection(subsections: BorseDiStudio | undefined) {
		if (!subsections) return "";
		return this.rinnovoBorsaStudioSubsection(subsections.rinnovi);
	},

	rinnovoBorsaStudioSubsection(rinnovi: Array<RinnovoBorsaStudio> | null | undefined) {
		if (!rinnovi || rinnovi.length === 0) return "";
		
		return source`
		${rinnovi.map((rinnovo) => {
			return stripIndent(rinnovoBorsaStudioTemaplate(rinnovo));
		})}`;
	},
};

export async function template(values: FormValues, sections: string[]) {
	const normalizzaData = (data: string | undefined) => {
		if (!data) return "";
		const [anno, mese, giorno] = data.split("-");
		return `${giorno}/${mese}/${anno}`;
	};

	const validSections = sections.filter(section => !!section);
	
	const items = validSections
		.map((section) => "\\item " + section)
		.join("\n");

	const itemList = items.length > 0 ? `${items}\n` : "";

	return stripIndent`
		\\documentclass[a4paper]{article}

		\\usepackage[utf8]{inputenc}
		\\usepackage{graphicx}
		\\usepackage{fancyhdr}
		\\usepackage{geometry}
		\\usepackage{lipsum}
		\\usepackage{xltabular}

		\\geometry{top=2cm, bottom=5cm, left=2.5cm, right=2.5cm}
		\\setlength{\\headheight}{80pt}
		\\setlength{\\headsep}{0.5cm}
		\\setlength{\\footskip}{0.5cm}
		\\setlength{\\tabcolsep}{5pt}
		\\renewcommand{\\arraystretch}{1.5}
		% \\newcolumntype{Y}{>{\\centering\\arraybackslash}}X}

		\\pagestyle{fancy}
		\\renewcommand{\\headrulewidth}{0pt}
		\\fancyhf{}

		\\fancyhead[CO]{
			\\includegraphics[scale=0.2]{logo_dmi.png}\\\\[0.5em]
			\\textbf{Verbale n. ${values.numero || ""} — ${normalizzaData(values.data)}}
		}

		\\fancyfoot[C]{
			\\hrule
			\\vspace{0.5em}
			\\begin{tabular}{p{0.5\\textwidth}c p{0.4\\textwidth}}
			La segretaria verbalizzante & & Il Direttore \\\\
			Prof./Prof.ssa ${values.verbalizzante || ""} & & Prof./Prof.ssa ${values.direttore || ""}
			\\end{tabular}
			\\\\ \\vspace{1em}
			Pag. \\thepage
		}



    \\begin{document}

			Verbale dell'adunanza del Consiglio di Dipartimento di Matematica e Informatica, convocata per
			il giorno ${normalizzaData(
				values.data,
			)} alle ore 08:00 in prima convocazione e per il giorno 25.09.2024 alle ore 11:00
			in seconda convocazione, presso l'aula Magna del DMI in viale A. Doria 6, per discutere il
			seguente ordine del giorno:

			\\begin{enumerate}\n
				\\item{Approvazione verbale precedente}\n
				${itemList}
			\\end{enumerate}

			Sono presenti, assenti giustificati o assenti i seguenti componenti del Consiglio:
			\\begin{xltabular}{\\textwidth}{@{} |l|l|l|X|X|X| @{}}\n
			\\hline\n
			& & \\textbf{Qualifica} & \\textbf{Presente} & \\textbf{Assente} & \\textbf{Assente Giustificato} \\\\ \\hline\n
			${values.presenze
			.map((presenza, index) =>
				`${index+1} & ${presenza.nome} & ${presenza.ruolo} & ${presenza.presente} & ${presenza.assente} & ${presenza.assente_giustificato} \\\\ \\hline`
			)
			.join("\n")}
			\\end{xltabular}\n

			\\section{Approvazione verbale precedente}
			${values.approvazione ? 
				`Il Direttore mette ai voti l'approvazione del verbale nr. ${values.approvazione.numero_verbale || ""} del ${normalizzaData(values.approvazione.data_verbale)} inviato in bozza a tutti i componenti del Consiglio. Nella forma emendata esso viene approvato da tutti i presenti alla seduta odierna, presenti anche nella sopracitata seduta, con l'astensione degli assenti (Allegato x). \\textbf{Il Consiglio, unanime, approva.}` : 
				"Approvazione del verbale precedente."
			}

			${validSections
				.map((section) => {
					switch (section) {
						case "Assegni di ricerca": {
							const content = generator.assegniDiRicercaSection(values.assegniDiRicerca);
							return content ? "\\section{Assegni di ricerca}" + content : "";
						}
						case "Borse di studio": {
							const content = generator.borseDiStudioSection(values.borseDiStudio);
							return content ? "\\section{Borse di studio}" + content : "";
						}
						default:
							return "";
					}
				})
				.filter(content => !!content)
				.join("\n\n")}
    \\end{document}
		`;
}
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
import { getDefaultStore } from "jotai";
import { verbaleAtom } from "@/atoms/verbale";
import { rinnovoBorsaStudioTemaplate } from "./templates/rinnovoBorsaStudioTemplate";
import { conclusioneAssegnoRicercaTemplate } from "./templates/conclusioneAssegnoRicercaTemplate";

const generator = {
	assegniDiRicercaSection(subsections: AssegniDiRicerca) {
		return [
			this.rinunciaAssegnoSubsection(subsections.rinunce),
			this.conclusioneAssegnoSubsection(subsections.conclusioni),
		].join("\n\n");
	},

	rinunciaAssegnoSubsection(
		rinunciaBorsa: Array<RinunciaAssegnoRicerca> | null,
	) {
		return source`
			${rinunciaBorsa?.map((rinuncia) => {
				return stripIndent(rinunciaAssegnoRicercaTemplate(rinuncia));
			})}
		`;
	},

	conclusioneAssegnoSubsection(
		conclusioneAssegno: Array<ConclusioneAssegnoRicerca> | null,
	) {
		return source`
				${conclusioneAssegno?.map((conclusione) => {
					return stripIndent(conclusioneAssegnoRicercaTemplate(conclusione));
				})}
			`;
	},

	borseDiStudioSection(subsections: BorseDiStudio) {
		return this.rinnovoBorsaStudioSubsection(subsections.rinnovi);
	},

	rinnovoBorsaStudioSubsection(rinnovi: Array<RinnovoBorsaStudio> | null) {
		return source`
		${rinnovi?.map((rinnovo) => {
			return stripIndent(rinnovoBorsaStudioTemaplate(rinnovo));
		})}`;
	},
};

export function template(values: FormValues) {
	const normalizzaData = (data: string) => {
		const [anno, mese, giorno] = data.split("-");
		return `${giorno}/${mese}/${anno}`;
	};

	const store = getDefaultStore();
	const verbale = store.get(verbaleAtom);

	const items = verbale.sections
		.map((section) => "\\item " + section)
		.join("\n");

	const itemList =
		items.length > 0 ? `\\begin{enumerate}\n${items}\n\\end{enumerate}` : "";

	return stripIndent`
		\\documentclass[a4paper]{article}

		\\usepackage[utf8]{inputenc}
		\\usepackage{graphicx}
		\\usepackage{fancyhdr}
		\\usepackage{geometry}
		\\usepackage{lipsum}

		\\geometry{top=2cm, bottom=5cm, left=2.5cm, right=2.5cm}
		\\setlength{\\headheight}{80pt}
		\\setlength{\\headsep}{0.5cm}
		\\setlength{\\footskip}{0.5cm}

		\\pagestyle{fancy}
		\\renewcommand{\\headrulewidth}{0pt}
		\\fancyhf{}

		\\fancyhead[CO]{
			\\includegraphics[scale=0.2]{logo_dmi.png}\\\\[0.5em]
			\\textbf{Verbale n. ${values.numero} — ${normalizzaData(values.data)}}
		}

		\\fancyfoot[C]{
			\\hrule
			\\vspace{0.5em}
			\\begin{tabular}{p{0.5\\textwidth}c p{0.4\\textwidth}}
			La segretaria verbalizzante & & Il Direttore \\\\
			Prof./Prof.ssa ${values.verbalizzante} & & Prof./Prof.ssa ${values.direttore}
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

			${itemList}

	    ${verbale.sections
				.map((section) => {
					switch (section) {
						case "assegniDiRicerca":
							return (
								"\\section{Assegni di ricerca}" +
								generator.assegniDiRicercaSection(
									values.assegniDiRicerca as AssegniDiRicerca,
								)
							);
						case "borseDiStudio":
							return (
								"\\section{Borse di studio}" +
								generator.borseDiStudioSection(
									values.borseDiStudio as BorseDiStudio,
								)
							);
						default:
							return "";
					}
				})
				.join("\n\n")}
    \\end{document}
		`;
}

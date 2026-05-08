import '../../bundles/blog.css';
import { expect } from 'storybook/test';

const renderBody = (content) => {
    const root = document.createElement('div');
    root.innerHTML = `<div class="article-body">${content}</div>`;
    return root;
};

const intro = `
    <p>Una pagina articolo deve restare leggibile anche quando arriva da un CMS con paragrafi di lunghezza diversa. Il blocco rich text controlla ritmo, larghezza e stile degli elementi di base.</p>
    <p>Il backend mantiene la responsabilita del contenuto, mentre la libreria definisce il comportamento visivo del testo.</p>
`;

export default {
    title: 'Blog Page/ArticleBody',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Blocco rich text per contenuti articolo: paragrafi, heading, liste, strong e link.'
            }
        }
    }
};

export const Paragraphs = {
    render: () => renderBody(intro),
    play: async ({ canvas }) => {
        await expect(canvas.getByText(/pagina articolo/)).toBeInTheDocument();
    }
};

export const HeadingAndParagraphs = {
    render: () => renderBody(`
        ${intro}
        <h2>Prima di preparare il file</h2>
        <p>Definisci formato chiuso, numero pagine e tipo di rilegatura. Queste scelte influenzano abbondanze, impostazione del dorso e sequenza delle pagine.</p>
    `)
};

export const Lists = {
    render: () => renderBody(`
        <h2>Controlli consigliati</h2>
        <ul>
            <li>Verifica che tutte le immagini siano ad alta risoluzione.</li>
            <li>Controlla abbondanze e margini di sicurezza.</li>
            <li>Esporta il PDF con font incorporati.</li>
        </ul>
        <ol>
            <li>Apri il file in anteprima.</li>
            <li>Controlla pagine e orientamento.</li>
            <li>Carica il PDF definitivo.</li>
        </ol>
    `)
};

export const StrongAndLinks = {
    render: () => renderBody(`
        <p>Usa <strong>testo forte</strong> per evidenziare vincoli tecnici, non per sostituire titoli o call to action.</p>
        <p>I link interni, per esempio <a href="#preventivo">richiedi un preventivo</a>, devono restare visibili e riconoscibili nel corpo articolo.</p>
    `)
};

export const LongContent = {
    render: () => renderBody(`
        ${intro}
        <h2>Scelta della carta</h2>
        <p>La carta naturale restituisce un aspetto piu materico e una lettura morbida. La patinata valorizza immagini e fotografie, ma puo richiedere attenzione quando il progetto include molto testo.</p>
        <p>Per cataloghi tecnici e listini, la priorita e spesso la consultazione ripetuta: grammatura, opacita e rilegatura devono essere valutate insieme.</p>
        <h2>Impostazione del PDF</h2>
        <p>Prima dell invio, controlla abbondanze, margini, profili colore e font. Una revisione coerente riduce scambi di email e blocchi in prestampa.</p>
        <ul>
            <li>Immagini in CMYK o profilo concordato.</li>
            <li>Testi non troppo vicini al taglio.</li>
            <li>Pagine ordinate secondo il formato finale.</li>
        </ul>
        <h2>Quando chiedere supporto</h2>
        <p>Se il progetto include pieghe, fustelle, dorso o finiture speciali, condividi un campione o una bozza prima di chiudere il file. Il confronto preventivo evita correzioni costose in una fase avanzata.</p>
    `)
};

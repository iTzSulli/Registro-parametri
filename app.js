/**
 * Registro Parametri: logica della pagina.
 *
 * Cosa fa:
 *   1. aspetta l'invio del modulo (clic su "Registra");
 *   2. legge i cinque valori come numeri;
 *   3. aggiunge una riga con quei valori alla tabella;
 *   4. svuota il modulo, pronto per la registrazione successiva.
 *
 * Il file è collegato in index.html con l'attributo "defer", quindi parte
 * quando la pagina è già caricata e tutti gli elementi esistono.
 */

// ---------------------------------------------------------------------------
// Configurazione
// ---------------------------------------------------------------------------

// Id dei campi del modulo, nello stesso ordine delle colonne della tabella.
// Per aggiungere un parametro: aggiungi il campo in index.html, la colonna <th>
// nella tabella e il suo id in questo elenco. Il resto del codice non cambia.
const CAMPI = ["velFilm", "velCatene", "porAcqua", "tempAcqua", "velTriangolo", "posTriangolo"];

// ---------------------------------------------------------------------------
// Elementi della pagina
// ---------------------------------------------------------------------------

const form = document.getElementById("parForm");
const corpoTabella = document.getElementById("regValori");

// Se un id è sbagliato getElementById restituisce null: meglio un errore chiaro subito
// che un messaggio criptico più avanti ("Cannot read properties of null").
if (!form || !corpoTabella) {
  throw new Error("Elementi non trovati: controlla gli id 'parForm' e 'regValori' in index.html.");
}

// ---------------------------------------------------------------------------
// Funzioni
// ---------------------------------------------------------------------------

/**
 * Legge i campi del modulo e li raccoglie in un oggetto,
 * ad esempio { velFilm: 1.55, velCatene: 2, ... }.
 *
 * valueAsNumber restituisce un numero vero (il solo "value" sarebbe un testo).
 * form.elements cerca solo tra i campi del modulo, quindi non può confondersi
 * con altri elementi della pagina che abbiano lo stesso id.
 */
function leggiRegistrazione() {
  const registrazione = {};
  for (const nome of CAMPI) {
    registrazione[nome] = form.elements[nome].valueAsNumber;
  }
  return registrazione;
}

/**
 * Costruisce una riga <tr> della tabella a partire da una registrazione.
 * Usa textContent: il valore viene inserito come semplice testo, mai come codice HTML,
 * quindi non c'è rischio di iniettare codice nella pagina.
 */
function creaRiga(registrazione) {
  const riga = document.createElement("tr");
  riga.className = "hover:bg-zinc-50";

  for (const nome of CAMPI) {
    const cella = document.createElement("td");
    cella.className = "cella";
    cella.textContent = registrazione[nome];
    riga.append(cella);
  }

  return riga;
}

// ---------------------------------------------------------------------------
// Eventi
// ---------------------------------------------------------------------------

form.addEventListener("submit", (evento) => {
  // Senza questa riga il modulo ricaricherebbe la pagina e perderemmo i dati inseriti
  evento.preventDefault();

  const registrazione = leggiRegistrazione();
  console.log("Nuova registrazione:", registrazione); // utile per controllare i dati dalla console (F12)

  corpoTabella.append(creaRiga(registrazione));

  // Modulo vuoto e cursore sul primo campo, pronto per l'inserimento successivo
  form.reset();
  form.elements[CAMPI[0]].focus();
});

## 📝 Todo App con LocalStorage

Benvenuto nel progetto Todo App! Questo progetto è un'applicazione web semplice che permette di creare, modificare e cancellare note utilizzando la funzionalità di localStorage del browser per memorizzare i dati in modo persistente.

Questo è il decimo esercizio del corso di freecodecamp.org (https://www.freecodecamp.org/), nello specifico https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/#learn-localstorage-by-building-a-todo-app

Lezione: **Learn localStorage by Building a Todo App**

## 🚀 Funzionalità

**Aggiungi Nota**: Puoi creare nuove note con titolo, data e descrizione. 🆕
**Modifica Nota**: Aggiorna le tue note esistenti in modo semplice. ✏️
**Cancella Nota:** Rimuovi le note che non ti servono più. 🗑️
**Conferma Chiusura**: Se stai modificando una nota e tenti di chiudere senza salvare, ti verrà chiesta una conferma. ⚠️

## 🛠️ Tecnologie Utilizzate

HTML: Struttura dell'applicazione.
CSS: Stili e layout responsivo.
JavaScript: Logica dell'app, gestione degli eventi e interazione con il DOM.
**localStorage**: Memorizzazione persistente delle note.

## 💻 Apprendimento JavaScript

**const taskData = JSON.parse(localStorage.getItem("data")) || [];**

 - **LocalStorage**: Questa funzione accede al localStorage del browser e cerca di ottenere un elemento con la chiave "data". localStorage è uno spazio di archiviazione del browser che permette di salvare dati in forma di chiave-valore, e i dati salvati persistono anche dopo il riavvio del browser.
 - Per visualizzare i dati raccolti nel Browser: Ispeziona, Application, LocalStorage
 - ⚠️ Importante: **JSON.parse(...)**: Se localStorage.getItem("data") restituisce una stringa JSON, questa stringa viene convertita in un oggetto JavaScript tramite JSON.parse. JSON.parse prende una stringa JSON e la trasforma in un oggetto JavaScript.


**taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addOrUpdateTask();
});**

 - L'oggetto evento **e** viene passato come argomento alla funzione di callback. Il metodo **preventDefault()** viene chiamato su questo oggetto per prevenire il comportamento predefinito del form. Normalmente, l'invio di un form provoca il ricaricamento della pagina. preventDefault() impedisce che ciò accada, permettendo di gestire l'invio del form con JavaScript senza ricaricare la pagina.

## 📝 Licenza

Questo progetto è sotto licenza MIT. Consulta il file LICENSE per maggiori dettagli.

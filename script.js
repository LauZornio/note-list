const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

//taskData contiene elementi oppure è vuoto
  //localStorage.getItem("data"): Questa funzione accede al localStorage del browser e cerca di ottenere un elemento con la chiave "data". localStorage è uno spazio di archiviazione del browser che permette di salvare dati in forma di chiave-valore, e i dati salvati persistono anche dopo il riavvio del browser.
  //JSON.parse(...): Se localStorage.getItem("data") restituisce una stringa JSON, questa stringa viene convertita in un oggetto JavaScript tramite JSON.parse. JSON.parse prende una stringa JSON e la trasforma in un oggetto JavaScript.
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

const addOrUpdateTask = () => {
  //findIndex restituisce l'indice del primo elemento che soddisfa la condizione: id della task selezionata con id della task corrente
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  //viene creato un oggetto con
    //id --> il titolo dell'input in piccolo, concatenato alla data di creazione
    //.split(" "): Questo metodo divide la stringa in un array di sottostringhe utilizzando lo spazio (" ") come delimitatore.
    //.join("-"): Questo metodo unisce gli elementi dell'array in una singola stringa, inserendo un trattino ("-") tra ogni elemento.
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  //Questo blocco condizionale controlla se l'attività corrente è una nuova attività o un aggiornamento di una esistente.
  if (dataArrIndex === -1) {
    //significa che non esiste l'id nello storage e quindi è un nuovo post
    taskData.unshift(taskObj);
  } else {
    //significa che esiste l'id e che quindi il dataArrIndex viene aggiornato con il task corrispondente
    taskData[dataArrIndex] = taskObj;
  }

  //salva nel browser l'array taskData convertendolo in una stringa json
  localStorage.setItem("data", JSON.stringify(taskData));

  updateTaskContainer(); //aggiorna la visualizzazione dell'interfaccia utente
  reset(); //reimposta gli input
};


//questa funzione imposta la visualizzazione delle note nel container delle task.
const updateTaskContainer = () => {
  //prima cosa, lo inizializza a vuoto
  tasksContainer.innerHTML = "";

  //per ogni elemento della task data memorizzata in Local Storage
  //il ciclo forEach ha una Arrow Function che usa la destrutturazione degli oggetti estrarre direttamente le proprietà id, title ecc 
  //attributo onclick nei button stanno a chiamare la funzione js editTask (o delete) passando anche l'elemento corrente (this)
  taskData.forEach(
    ({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Titolo:</strong> ${title}</p>
          <p><strong>Data:</strong> ${date}</p>
          <p><strong>Descrizione:</br></strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Modifica</button>
          <button onclick="deleteTask(this)" type="button" class="btn red">Cancella</button> 
        </div>
      `)
    }
  );
};

//funzione richiamata dal button delete nella task singola in container
const deleteTask = (buttonEl) => {
  //trova l'indice dell'array taskData corrispondente al id del genitore del button premuto
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  //eliminazione della task perché rimuove il genitore del button cliccato
  buttonEl.parentElement.remove();

  //questo elimina l'elemento nei dati memorizzati nel Local Storage
  taskData.splice(dataArrIndex, 1);

  //aggiorna i dati presenti nel local storage
  localStorage.setItem("data", JSON.stringify(taskData));
}

//funzione richiamata dal button Edit nella task singola in container
const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  //visualizza i dati presenti in memoria, in modo da poterli aggiornare
  currentTask = taskData[dataArrIndex];

  //salavataggio dei nuovi dati
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  //modifica del btn da crea in aggiorna
  addOrUpdateTaskBtn.innerText = "Aggiorna Nota";

  //mostrare o meno la task
  taskForm.classList.toggle("hidden");  
}


const reset = () => {
  //ripristino delle task
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
}

//se l'oggetto taskData ha indici, vuol dire che non è vuoto, quindi la funzione updateTaskContainer mostrerà tutte le task
if (taskData.length) {
  updateTaskContainer();
}

//il pulsante per la creazione nuova nota, al click apparirà la task modale
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

//viene verificata che i vari input contengano valori o siano stati aggiornati
  // se non c'è stata modifica o inserimento, allora con reset si ritorna indietro
  // se c'è modifica o inserimento, si visualizza la finestra modale creata in HTML, nel quale si chiede la conferma o meno della chiusura
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

//al click della x
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

//siamo nella task modale, se clicchiamo chiudi, viene chiusa la modale e resettati i dati
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset()
});

//Questo pezzo di codice aggiunge un event listener al form taskForm, in modo che quando viene inviato (submit), venga eseguita una funzione specifica.

taskForm.addEventListener("submit", (e) => {
  //L'oggetto evento e viene passato come argomento alla funzione di callback. Il metodo preventDefault() viene chiamato su questo oggetto per prevenire il comportamento predefinito del form. Normalmente, l'invio di un form provoca il ricaricamento della pagina. preventDefault() impedisce che ciò accada, permettendo di gestire l'invio del form con JavaScript senza ricaricare la pagina.
  e.preventDefault();

  addOrUpdateTask();
});
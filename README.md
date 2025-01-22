# template-express

## Step 1 - Scaffolding
```bash
# clone repository
# add package-lock.json to .gitignore
# edit README.md

# create file server.js
ni server.js

#init 
npm init -y

# create env file
ni .env

# add in env PORT = 3000
# configure package json with dev and start script (env e watch)

```
```json
"scripts": {
    "start": "node --env-file=.env server.js",
    "dev": "node --env-file=.env --watch server.js"
  }
```

```bash
# install express 
npm install express

```

```javascript
// import express in server js
const express = require("express");

// create a server instance
const app = express();

// set costant to port
const port = process.env.PORT || 3000;


//Other imports

//define static assets path 
// create public directory inside root directory mkdir public
app.use(express.static("public"));


//add root route
app.get("/", (req, res) => {
  res.send("Home Page");
});

//other routes


//server must listen on your host and your port
app.listen(port,  () => {
    console.log(`Server is running on http://localhost:${port}}`);
});

```

```bash
# launch server to test 
npm run dev 

```


```bash
# make other directories 
mkdir routes
mkdir middlewares
mkdir controllers
mkdir classes
mkdir models


# create models data
 cd models
 ni examples.js

# make example controller
cd controllers
ni exampleController.js
```
## Step 2 - Controller and Routing

- Controller

```javascript
// import model  in controller
const examples = require("../models/examples.js"); 


function index(req, res) {  
  const response = {
    totalCount: menu.length,
    data: [...examples],
  };
  res.json(response);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const item = examples.find((item) => item.id === id);
  if (!item) {
    throw new CustomError("La pizza non esiste", 404);   
  }
  res.json({ success: true, item });
}

function store(req, res) {
  let newId = 0;
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].id > newId) {
      newId = menu[i].id;
    }
  }
  newId += 1;

  // new data is in req.body
  const newItem = {
    id: newId,
    title: req.body.title
  };

  examples.push(newItem);
  res.status(201).json(newItem);
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const item = exmples.find((item) => item.id === id);
  if (!item) {
    res.status(404).json({ success: false, message: "Item non esiste" });
    return;
  }

  //console.log(req.body);
    for (key in item) {
    if (key !== "id") {
      item[key] = req.body[key];
    }
  }

  //console.log(examples);
  res.json(item);
}
function destroy(req, res) {
  const id = parseInt(req.params.id);
  const index = example.findIndex((item) => item.id === id);
  if (index !== -1) {
    menu.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404);
    res.json({
      error: "404",
      message: "Item non trovato",
    });
  }
}

// esporto le funzioni
module.exports = { index, show, store, update, destroy };

```
- Routes
```bash
 # creo first example route
 cd routes
 ni examples.js
```

```javascript
//in routes/examples.js

// import express
const express = require("express");

//create an instance of router
const router = express.Router();


//importfunction from controller
const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/exampleController");

//Rotte

// Index - Read all
router.get("/", index);

// Show - Read one - 
router.get("/:id", show);

//Store - Create
router.post("/", store);

//Update - Update  totale
router.put("/:id", update);

// Modify - Update (partial)  
// router.patch("/:id", (req, res) => {
//   res.send("Modifica parziale item con id: " + req.params.id);
// });

// Destroy - Delete 
router.delete("/:id", destroy);

//esport router
module.exports = router;
```
```javascript
// in server.js

//Import router

//Imports 
const examplesRouter = require("./routes/examples");

// add router middelware to routes
app.use("/examples", examplesRouter);

//TEST WITH POSTMAN

```

## Step 3 - Other Middlewares

```bash
 # create other middlewares at least error middleware
 cd middleware
 ni errorsHandler.js
 ni notFound.js
```

```javascript
// errors handler example

function errorsHandler(err, req, res, next) { 
  console.error(err.stack.split("\n")[1]);
  //console.log(err);
  res.status(err.statusCode || 500);
  res.json({
    error: err.message,
  });
}

module.exports = errorsHandler;


// 404 not found example
function notFound(req, res, next) {
  res.status(404);
  res.json({ error: "Not Found", message: "Risorsa non trovata" });
}

module.exports = notFound;
```
```javascript
// import in server.js
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");

// register middleware as last routes in server.js

app.use(errorsHandler);

app.use(notFound);

```

## Step 4 - custom error 

```bash
 # create custom error class extending Error class
 cd classes
 ni CustomError.js
 
```

```javascript
// custom error class

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
```
```javascript
//import class where you need it (example in controller)
const CustomError = require("../classes/CustomError");

// use 
throw new CustomError("Questo item non esiste", 404);

```



```bash
esercizio di oggi 22/01/2025: *ex-express-blog-sql*
repo: express-blog-sql
### Esercizio
Prendiamo le API precedentemente create per il vostro blog ed aggiungiamo la persistenza tramite la connessione a un DB
*Milestone 1*
- Importiamo il db in allegato su MySQL Workbench
- Installiamo il client *mysql2* con npm i mysql2 nell’app Express
- Creiamo un file di configurazione per connettere il database
- Inseriamo un console.log nella logica di connessione e proviamo ad avviare l’applicazione per verificare che non ci siano errori.
*Milestone 2*
- Facciamo sì che l’API di INDEX restituisca la lista di post recuperata dal database in formato JSON
- Verifichiamo su Postman che la risposta sia corretta
*Milestone 3*
- Facciamo sì che l’API di DESTROY permetta di eliminare un post dal database
- Verifichiamo su Postman che la chiamata non dia errore e risponda 204
- Verifichiamo su MySQL Workbench che il post venga effettivamente rimosso
*Milestone 4*
- Facciamo sì che l’API di SHOW restituisca il post desiderato in formato JSON
- Verifichiamo su Postman che la risposta sia corretta
*Bonus:*
- Far sì che la SHOW restituisca il post comprensivo di tag, recuperandoli grazie alla relazione tra post e tags, esistente sul database
```
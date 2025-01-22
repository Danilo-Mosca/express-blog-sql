import connection from "../connection.js";  // Importo il file connection.js che crea la connesione al database
import CustomError from "../classes/CustomError.js";

function index(req, res) {
  // Creo la query SQL:
  const sql = "SELECT * FROM `posts`";
  // Uso il metodo query() per passargli la query SQL e una funzione di callback:
  connection.query(sql, (err, result) => {
    if (err) {
      // Se rilevo un errore restituisco l'errore HTTP 500 Internal Server Error” e un messaggio personalizzato:
      return res.status(500).json({ error: "Interrogazione del database non riuscita" });
    }
    console.log(result);
    let data = result;
    const response = {
      totalCount: result.length,
      data,
    };
    res.json(response);   //Rispondo con l'oggetto JSON riempito con i data ricevuti dall'interrogazione fatta al database
  });
}

function show(req, res) {
  const id = parseInt(req.params.id);
  /* PRIMA QUERY: per prendere i dati della pizza: */
  // Creo la query SQL con le Prepared statements (? al posto di id perchè successivamente gli passerò il valore di id, non la variabile stessa) per evitare le SQL Injections:
  const sql = "SELECT * FROM `posts` WHERE `id` =?";
  // Uso il metodo query() per passargli la query SQL, il valore di "?", e una funzione di callback:
  connection.query(sql, [id], (err, results) => {
    // Se rilevo un errore restituisco l'errore HTTP 500 Internal Server Error” e un messaggio personalizzato:
    if (err) {
      return res.status(500).json({ error: "Interrogazione al database fallita" });
      // console.log(result);
    }
    // Assegno alla costante item i dati ritornati dalla query:
    const item = results[0];
    console.log(item);

    // Avvio un try/catch per catturare eventuali errori:
    try {
      // Verifico se l'interrogazione al database ha tornato qualche dato (se l'id passato non esiste la query non ritorna dati):
      if (!item) {
        throw new CustomError("L'elemento non esiste", 404);
      }
    }
    catch (err) {
      console.log(err.message)
      return res.status(404).json({ error: "L'elemento non esiste" });
    }
    /* Al posto del try/catch avrei potuto inserire tutto qui senza lanciare la throw con l'errore personalizzato: 
    if (!item) {
      return res.status(500).json({ error: "L'elemento non esiste" });
    }
    */

    /* SECONDA QUERY: Se trova la pizza allora eseguo la seconda query per prendere i tags */
    const sqlTags = `SELECT DISTINCT posts.id, posts.title FROM posts
JOIN post_tag ON post_tag.post_id = posts.id
WHERE post_tag.post_id = ?`;
    // Uso il metodo query() per passargli la query SQL, il valore di "?", e una funzione di callback:
    connection.query(sqlTags, [id], (err, results) => {
      console.log(results);
      // Dopo che ho sia il post che i suoi tag
      if (err) return res.status(500).json({ error: "Database query failed" });
      // Aggiungo la proprietà tags all'oggetto post
      item.tags = results;
      // Ritorno l'oggetto (item) con tutti i tags in esso contenuto (se presenti)
      res.json({ success: true, item });
    });
  });
}
function store(req, res) {
  // console.log(req.body);

  // l'id me lo vado a creare:
  let newId = 0;
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id > newId) {
      newId = posts[i].id;
    }
  }
  newId += 1;
  console.log(req.body);
  // // new data is in req.body
  const newPost = { id: newId, ...req.body };
  posts.push(newPost);
  // res.status(201).json(newItem);
  res.json({ success: true, item: newPost });
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const item = posts.find((item) => item.id === id);
  if (!item) {
    throw new CustomError("L'elemento non esiste", 404);
  }

  //console.log(req.body);
  for (let key in item) {
    if (key !== "id") {
      item[key] = req.body[key];
    }
  }
  //console.log(examples);
  res.json({ success: true, item });
}
function destroy(req, res) {
  const id = parseInt(req.params.id);
  // const index = posts.findIndex((item) => item.id === id);
  // Creo la query SQL con le Prepared statements (? al posto di id perchè successivamente gli passerò il valore di id, non la variabile stessa) per evitare le SQL Injections
  const sql = "DELETE FROM `posts` WHERE `id` = ?";
  // Uso il metodo query() per passargli la query SQL, il valore di "?", e una funzione di callback:
  connection.query(sql, [id], (err, results) => {
    // Se rilevo un errore restituisco l'errore HTTP 500 Internal Server Error” e un messaggio personalizzato:
    if (err) return res.status(500).json({ error: "Database query failed! Cancellazione del post non riuscita" });
    //Altrimenti rispondo con uno status 204: che indica che la richiesta del client è stata elaborata correttamente
    res.sendStatus(204);
  });
}

export { index, show, store, update, destroy };

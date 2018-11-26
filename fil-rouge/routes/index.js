/* eslint-disable import/newline-after-import */
import express from 'express';
const app = express();
const port = 3000;
const connection = require('./conf');

const bodyParser = require('body-parser');
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.send('Bienvenue sur Express');
});

router.get('/api/Football', (req, res) => {
  connection.query('SELECT * from Joueurs', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération d\'un joueur');
    } else {
      res.json(results);
    }
  });
});

router.get('/api/Football/name', (req, res) => {
  connection.query('SELECT name from Joueurs', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des noms des joueurs');
    } else {
      res.json(results);
    }
  });
});
router.get('/api/Football/:name', (req, res) => {
  const name = req.params.name;
  connection.query('SELECT * FROM Joueurs WHERE name=?', name, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des noms des joueurs');
    } else {
      res.json(results);
    }
  });
});
router.get('/api/Football/name/:name', (req, res) => {
  connection.query(`SELECT * FROM Joueurs WHERE name LIKE '${req.params.name}%'`, (err, result) => {
    if (err) {
      console.log('Erreur : ', err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
});
router.get('/api/search/:date', (req, res) => {
  connection.query('SELECT * FROM Joueurs WHERE date > ?', req.params.date, (err, result) => {
    if (err) {
      console.log('Erreur : ', err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
});
router.get('/api/order', (req, res) => {
  const type = req.query.type;
  const sql = (type === 'desc') ?
    'SELECT * FROM Joueurs ORDER BY age DESC' :
    'SELECT * FROM Joueurs ORDER BY age ASC';
  connection.query(sql, (err, result) => {
    if (err) {
      console.log('Erreur : ', err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
});
router.post('/api/Football/joueurs', (req, res) => {
  const formData = req.body;

  connection.query('INSERT INTO Joueurs SET ?', formData, (err, result) => {
    if (err) {
      console.log('Erreur : ', err);
      res.status(500).send('Erreur lors de l\'ajout...');
    } else {
      res.sendStatus(200);
    }
  });
});
router.put('/api/Football/joueurs/:id', (req, res) => {
  const formData = req.body;
  const idPlayers = req.params.id;

  connection.query('UPDATE Joueurs SET ? WHERE id=?', [formData, idPlayers], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un joueur");
    } else {
      res.sendStatus(200);
    }
  });
});
router.put('/api/Football/joueurs/actif/:id', (req, res) => {
  const playersId = req.params.id;

  connection.query('UPDATE Joueurs SET `En activité` = 1 ^ `En activité` WHERE id = ?', playersId, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la modification');
    } else {
      res.sendStatus(200);
    }
  });
});
router.delete('/api/Football/:id', (req, res) => {
  const playersId = req.params.id;

  connection.query('DELETE FROM Joueurs WHERE id = ?', playersId, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un joueur");
    } else {
      res.sendStatus(200);
    }
  });
});
router.delete('/api/Football/actif', (req, res) => {
  connection.query('DELETE FROM Joueurs WHERE `En activité` = 0', (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un joueur");
    } else {
      res.sendStatus(200);
    }
  });
});


export default router;


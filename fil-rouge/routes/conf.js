
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // adresse du serveur
  user: 'root', // le nom d'utilisateur
  password: 'LAgenette17!', // le mot de passe
  database: 'Football', // le nom de la base de données
});
module.exports = connection;

import mysql from 'mysql2';
import Promise from 'bluebird'
const escape = (str) => str.replace(/'/g, "\\'").replace(/"/g, '\\"');

async function main(name) {
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'lesson1',
    Promise,
  });
  const gender = 'f';

  const db = connection.promise();
  const [results] = await db.execute(`SELECT * FROM animals where name = ? or owner = ? or gender = ?`, [name, name, gender]);
}

main(`rex`).catch(console.error);




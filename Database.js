var sqlite3 = require('sqlite3').verbose()

// open the database
let db = new sqlite3.Database('patient.db', (err) => {
    if (err) {
      console.error(err.message);
      throw err
    }
    console.log('Connected to the patient database.');
  });


  // create table 'book'
  const sql='CREATE TABLE patient(name text)';
  db.run(sql, (err) => {
    if (err) {
        // Table already created
        console.log('Table already created.');
    }else{
      console.log('Table created.');
      
      // First time Table created, insert some rows
      console.log('First time Table created, creating some rows.');
      
      var insert = 'INSERT INTO patients(name) VALUES(?)';
      db.run(insert, ['"treatId": "LHM908, "treatCourseId:"40220", "type:"long term", "category": "Asthma", "name": "Josh Drakeson", "startDate": "28-03-2021" ']);
      db.run(insert, ['JavaScript Programming']);
      db.run(insert, ['React with Hooks']);
     
    }
  });

// export as module, called db
module.exports = db

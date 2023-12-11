import fs from 'fs';
import pdfParse from 'pdf-parse-fork';
import mysql from 'mysql2/promise';

// A small function for a query
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0];
}

const db = await mysql.createConnection({
  host: '161.97.144.27', // 127.0.0.1 if you want to run local db
  port: 8096,               // change to your port
  user: 'root',
  password: 'guessagain96',  // change to your password
  database: 'T6SearchLabbOlga'
});  

const files = await fs.readdirSync('pdfs');

for (let file of files) {

  let data = await pdfParse(fs.readFileSync('./pdfs/' + file));

  // create a new object which only contains the parts I'm interested in.
  // there are other parts we don't use:
  // numrender, metadata, version,
  let metadata = {
    numpages: data.numpages,
    info: data.info
  };

  // get the full text of the pdf as well
  // let fullText = data.text;

  // todo - thing we might want to do with the data
  // when we write it to a table in the database

  // todo: write to a column of type varchar
  // console.log(file);

  // todo: write to a column of type json
  // console.log(metadata);

  // todo: write to a column of type LONGTEXT
  // console.log(fullText);
  
  let newRow = ['.pdf', file, JSON.stringify(metadata)]; // Transform metadata into JSON-string
  
  let result = await query(`
        INSERT INTO pdf (fileType, fileName, metadata)
        VALUES(?, ?, ?)
    `, newRow); 

    // console.log(file, test);

}

// exit/stop the script when everything is imported
// so you don't have to precc Ctrl+C
process.exit();
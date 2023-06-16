//-- The openDB function is imported from the 'idb' library. This function is used to open a connection to the IndexedDB database--//
//-- The initdb function is defined as an asynchronous function. It initializes the 'jate' database--//
//-- The putDb function is defined as an asynchronous function that accepts content as input--//
//-- The getDb function is defined as an asynchronous function. It connects to the 'jate' database, opens a transaction with read-only privileges--//
//--The initdb() function is called to initialize the database when the script runs--//


import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  console.log('PUT to the database');

  const jateDb = await openDB('jate', 1); 
  const tx = jateDb.transaction('jate', 'readwrite'); 
  const store = tx.objectStore('jate'); 
  const request = store.put({ id: 1, value: content }); 
  const result = await request;

  console.log('Data saved.', result); 
};


export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1); 
  const tx = jateDb.transaction('jate', 'readonly'); 
  const store = tx.objectStore('jate'); 
  const request = store.getAll(); 
  const result = await request; 
  
  console.log('result.value', result); 

  return result.value; 
};

initdb();


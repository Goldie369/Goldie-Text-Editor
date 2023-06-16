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

// Accept input and add content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  const jateDb = await openDB('jate', 1); // connect 
  const tx = jateDb.transaction('jate', 'readwrite'); // new transaction and privileges to edit
  const store = tx.objectStore('jate'); // obj to store
  const request = store.put({ id: 1, value: content }); // put data
  const result = await request;

  console.log('Data saved.', result); // confirm result
};

// Get all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1); 
  const tx = jateDb.transaction('jate', 'readonly'); // speficy privileges
  const store = tx.objectStore('jate'); 
  const request = store.getAll(); // get all data
  const result = await request; 
  
  console.log('result.value', result); // confirm result

  return result.value; // return only string 
};

initdb();


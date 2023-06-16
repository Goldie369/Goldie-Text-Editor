//-- The getDb and putDb functions are imported from the ./database module--//
//--The header is imported from the ./header module--//
//--The default class is defined, which is exported from the module--//
//--The class constructor initializes the code editor using the CodeMirror library--//
//--The constructor checks if CodeMirror is loaded by verifying the presence of the CodeMirror global variable--//
//--The constructor retrieves the stored content from the IndexedDB database using the getDb function--//
//--The constructor sets up an event listener on the editor's 'change' event. When the content of the editor changes, it updates the value stored in localStorage with the new content--//
//--The constructor sets up an event listener on the editor's 'blur' event--//


import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

   
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}

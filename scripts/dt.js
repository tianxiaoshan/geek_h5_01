var fs = require('fs');

var filePath = './src/acting/dateVersion.js';

const d = new Date().toLocaleString('en', { hour12: false });

var data = `export default "${d}"`;

fs.access(filePath, (err) => {
  if (!err) {
    fs.writeFile(filePath, data, 'utf-8', (err) => {
      if (err) {
        console.log('write failed');
      }
    });
  }
});

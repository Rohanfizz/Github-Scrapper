let path = require('path');
let fs = require('fs');

fs.rmdirSync('./Answer', { recursive: true });

fs.mkdirSync('./Answer');
const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
    .command( 'count')
    .argument('<file>')
    .action((path) =>{
        fs.readFile(path, 'utf8', (err, data) =>{
            if (err) {
                console.log(err);
            }
            else {
                const lines = data.split('\n').length;
                console.log(`There are ${lines} lines in ${path} `);
            }
        });
        
    })

program.parse();
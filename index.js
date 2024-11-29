const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
    .command( 'countLines')
    .description("Counts the lines from the given files")
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
        
    });

program
    .command('countWords')
    .description("Counts the number of words from the give file")
    .argument('<files>')
    .action((file) => {
        fs.readFile(file, "utf-8", (err, data)=>{
            if(err){
                console.log(err);
            }
            else{
                const words = data.split(" ");
                console.log(`There are ${words.length} words in ${file} `);
            }
        })
    });

program.parse();
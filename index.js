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
program
    .command('add')
    .description("Lets you add new todo")
    .argument("name", "Name of Todo")
    .argument("date", "Time of todo")
    .action((name, date) =>{
        const todo = { name, date };
    fs.readFile("/Users/csuftitan/Desktop/study/cli-project/todos.json", "utf-8", (err, data) => {
        if (err && err.code === "ENOENT") {
            // If file doesn't exist, initialize an empty array
            fs.writeFileSync("/Users/csuftitan/Desktop/study/cli-project/todos.json", JSON.stringify([todo], null, 2));
        } else {
            const todos = JSON.parse(data);
            todos.push(todo);
            fs.writeFileSync("/Users/csuftitan/Desktop/study/cli-project/todos.json", JSON.stringify(todos, null, 2));
        }
        console.log("Todo added successfully!");
    });}
    );
program
    .command('remove')
    .description("Lets you remove todo")
    .argument("name")
    .action((name) => {
        fs.readFile("cli-project/todos.json", "utf-8", (err, data) => {
            if (err) {
                console.log("Error reading file:", err);
                return;
            }
            const todos = JSON.parse(data);
            const updatedTodos = todos.filter(todo => todo.name !== name);
            if (todos.length === updatedTodos.length) {
                console.log("Todo not found!");
            } else {
                fs.writeFileSync("cli-project/todos.json", JSON.stringify(updatedTodos, null, 2));
                console.log("Todo removed successfully!");
            }
        });
    });

program
    .command('show-all')
    .description("Shows all todos")
    .action(() => {
        fs.readFile("cli-project/todos.json", "utf-8", (err, data) => {
            if (err) {
                console.error("Error reading todos:", err);
                return;
            }
            const todos = JSON.parse(data);
            console.log("Todo List:");
            todos.forEach((todo, index) => {
                console.log(`${index + 1}. ${todo.name} - ${todo.date}`);
            });
        });
    });

program.parse();
const todoLista = document.getElementById("todo-lista");
const btnAdicionar = document.getElementById("btn-adicionar");
const form = document.getElementById("todo-form");
const input = document.getElementById("task-title");
let tasks = [];

form.addEventListener('submit', (event)=>{
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

    const taskTitle = input.value

    if (taskTitle.length < 3) {
        alert('Sua tarefa ' + taskTitle + ' precisa ter, pelo menos, 3 caracteres.');
        return;
    }

    // Adicionando a nova tarefa no array de tasks
    tasks.push(taskTitle);

    // Adicionando a nova tarefa no HTML
    const li = document.createElement('li'); // Cria um novo elemento da lista ('li')
    li.textContent = taskTitle; // Atribui ao elemento 'li' criado o conteúdo de taskTitle
    todoLista.appendChild(li); // Insere ao elemento 'todoLista' o elemento 'li' criado acima

    input.value = "";
})
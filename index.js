const todoLista = document.getElementById("todo-lista");
const btnAdicionar = document.getElementById("btn-adicionar");
const form = document.getElementById("todo-form");
const input = document.getElementById("task-title");
const todoListaRemovida = document.getElementById("todo-lista-removida");
let tasks = [];

window.onload = () => {
    const tasksOnLocalStorage = localStorage.getItem('tasks');
    if(!tasksOnLocalStorage) return

    tasks = JSON.parse(tasksOnLocalStorage)

    tasks.forEach(task => {
        renderTaskOnHtml(task.title, task.done)
    })
}

function renderTaskOnHtml(taskTitle, done = false) {
    
    const li = document.createElement('li'); // Cria um novo elemento da lista ('li')
    const inputCheckbox = document.createElement('input'); // Cria um novo elemento para ser inserido dentro do 'li'
    const span = document.createElement('span'); // Cria um novo elemento span para guardar o texto da task
    const btnRemover = document.createElement('button');

    inputCheckbox.setAttribute('type', 'checkbox'); // Seta o input como do tipo checkbox
    inputCheckbox.addEventListener('change', (event) => {
        const liToDisable = event.target.parentElement;
        const titleToDisable = liToDisable.querySelector('span');
        const done = event.target.checked;

        if(done) {
            titleToDisable.style.textDecoration = 'line-through'
            tasks = tasks.map(task => {
                if(task.title === titleToDisable.textContent){
                    return {
                        title: titleToDisable.textContent,
                        done: !task.done
                    }
                }

                return task;
            })
        }
        else{
            titleToDisable.style.textDecoration = 'none'
        }

        localStorage.setItem('tasks',JSON.stringify(tasks))

    })

    inputCheckbox.checked = done;
    span.textContent = taskTitle; // Seta o texto da task dentro do span
    if(done) {
        span.style.textDecoration = 'line-through'
    }


    btnRemover.textContent = 'X';
    btnRemover.addEventListener('click', (event) =>{
        const liToRemove = event.target.parentElement;
        const titleToRemove = liToRemove.querySelector('span').textContent;
        
        tasks = tasks.filter(t => t.title != titleToRemove)
        todoLista.removeChild(liToRemove);
        
        
        localStorage.setItem('tasks',JSON.stringify(tasks))
        
    })
    li.appendChild(inputCheckbox); // Insere ao elemento li o elemento checkbox
    li.appendChild(span); //Insere ao elemento li o elemento span
    li.appendChild(btnRemover); //Insere ao elemento li o elemento button

    todoLista.appendChild(li); // Insere ao elemento 'todoLista' o elemento 'li' criado acima

}
form.addEventListener('submit', (event)=>{
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

    const taskTitle = input.value

    if (taskTitle.length < 3) {
        alert('Sua tarefa ' + taskTitle + ' precisa ter, pelo menos, 3 caracteres.');
        return;
    }

    // Adicionando a nova tarefa no array de tasks
    tasks.push({title: taskTitle, done: false});
    localStorage.setItem('tasks',JSON.stringify(tasks))
    
    // Adicionando a nova tarefa no HTML
    renderTaskOnHtml(taskTitle);
    input.value = "";
})


const taskInput = document.querySelector('.taskInput')
const addNewTaskButton = document.querySelector('.addNewTaskButton')
const allTasks = document.querySelector('.allTasks')

function createListItem() // creates <li>
{
    const li = document.createElement('li')
    return li
}

function clearInput()
{
    taskInput.value = ''
    taskInput.focus() // adds focus to input field as if clicked
}

function createMarkAsDoneButton(li) 
{
    li.innerText += ' ' // empty space as if &nbsp entity
    const markAsDoneButton = document.createElement('button')
    markAsDoneButton.innerHTML = 'Mark as Done'
    markAsDoneButton.setAttribute('title', 'Mark this task as done')
    markAsDoneButton.setAttribute('class', 'done')
    li.appendChild(markAsDoneButton)
}

function addNewTask(taskText)
{
    const li = createListItem()
    li.innerText = taskText
    allTasks.appendChild(li)
    clearInput()
    createMarkAsDoneButton(li)
    recordTask()
}

// prevents empty task record, calls addNewTask() from 'click' event
addNewTaskButton.addEventListener('click', function() {
    if (!taskInput.value) return
    addNewTask(taskInput.value)
}); 

taskInput.addEventListener('keypress', function(e) {
    if (e.keyCode === 13)
    {
        if(!taskInput.value) return
        addNewTask(taskInput.value)
    }
});

document.addEventListener('click', function(e) {
    const element = e.target

    if (element.classList.contains('done'))
    {
        element.parentElement.remove()
        recordTask() 

       /* 
    
        the recordTask() function is called above because after removing the task 
        after clicking on "Mark as done",  the li of the task is deleted, so the 
        array of all tasks is re-recorded on localStorage without the deleted task

        */
    }
});

function recordTask()
{
   const listItems = allTasks.querySelectorAll('li')
   const tasksList = []

   for (let task of listItems)
   {
        taskText = task.innerText
        taskText = taskText.replace('Mark as Done', '').trim()
        tasksList.push(taskText)
   }

   const tasksJSON = JSON.stringify(tasksList)
   console.log(tasksJSON)
   localStorage.setItem('tasks', tasksJSON) // setItem.(name, value)
}

function getRecordedTasks()
{
    const tasks = localStorage.getItem('tasks')
    const tasksList = JSON.parse(tasks) 

    for (let task of tasksList)
    {
        addNewTask(task) // shows all tasks from localStorage 
    }
}

getRecordedTasks()







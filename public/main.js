// document.getElementById("tasks")
function appendTasks(tasks) {
  let taskList = document.querySelector("#tasks")
  tasks.forEach(task => {
    taskList.innerHTML += `<li>${task.description}</li>`;
  })
}

function getTasks() {
  fetch('/api/v1/tasks')
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        let error = new Error("Whoops something went bad")
        throw(error)
      }
    })
    .then(body => appendTasks(body.tasks))
    .catch(error => console.log(error.message))
}

function postTask(event) {
  event.preventDefault()
  let description = document.getElementById('description');
  let body = {
    task: { description: description.value }
  }

  let json_body = JSON.stringify(body)
  fetch('/api/v1/tasks', {
    method: 'post',
    body: json_body
  })
  .then(response => {
    if(response.ok) {
      appendTask(body.task)
      description.value = ''
    }
  })
}

function appendTask(task) {
  let taskList = document.querySelector("#tasks")
  taskList.innerHTML += `<li>${task.description}</li>`;
}

let button = document.getElementById("submit-button")
button.addEventListener("click", postTask)




// run on page load
getTasks()

function getTasks() {
  fetch('/api/v1/tasks')
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        let error = new Error("Error in fetch: GET '/api/v1/tasks'")
        throw(error)
      }
    })
    .then(json => appendTasks(json.tasks))
    .catch(error => {
      document.querySelector('#error').innerHTML += error.message
    })
}


function appendTasks(tasks) {
  let taskList = document.querySelector("#tasks");
  tasks.forEach(task => {
    taskList.innerHTML += `<li>${task.description}</li>`
  })
}

function appendTask(task) {
  let taskList = document.querySelector("#tasks");
  taskList.innerHTML += `<li>${task.description}</li>`
}

function postTask(event) {
  event.preventDefault();
  let description = document.querySelector("#description");
  body = {
    task: { description: description.value }
  };
  let json_body = JSON.stringify(body)

  fetch('/api/v1/tasks', { method: 'post', body: json_body })
  .then(response => {
    if(response.ok) {
      appendTask(body.task)
      description.value = ""
    } else {
      let error = new Error("Error in fetch: POST '/api/v1/tasks'")
      throw(error)
    }
  })
  .catch(error => {
    document.querySelector('#error').innerHTML += error.message
  })
}

// As soon as the page loads
getTasks()

document
  .querySelector("#new-task-submit-button")
  .addEventListener("click", postTask);

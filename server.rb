require "sinatra"
require 'json'
require 'pry'

set :bind, '0.0.0.0'  # bind to all interfaces
set :public_folder, File.join(File.dirname(__FILE__), "public")

def tasks
  file = File.read('tasks.json')
  JSON.parse(file)
end

def write_to_json_file(task)
  new_task = { id: 1, description: task["description"] }
  new_task_list = tasks["tasks"].concat([new_task])
  new_json = { tasks: new_task_list }
  json_tasks = JSON.pretty_generate(new_json)
  File.write("tasks.json", json_tasks)
end

get '/api/v1/tasks' do
  status 200
  tasks.to_json
  # status 400
end

post '/api/v1/tasks' do
  json = JSON.parse(request.body.read)
  if json["task"]
    write_to_json_file(json["task"])
    status 200
  else
    status 422
    { error: "Oops, something went wrong"}.to_json
  end
end

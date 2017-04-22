import Axios from "axios";
import {TaskModel} from "./TaskModel";

interface ITask {
    id: number,
    completed: boolean,
    title: string,
}

export default class TaskApi {
    private axios = Axios.create({
        // baseURL: "http://localhost:8080/api",
        baseURL: "https://larskj-task2.herokuapp.com/api",
        timeout: 50000,
    });


    public loadTasks(): Promise<TaskModel[]> {
        const axios = this.axios;

        return axios.get("/tasks")
                       .then(response => {
                           const data: ITask[] = response.data
                           return data.map(todo => new TaskModel(todo.id, todo.title, todo.completed))
                       })
    }

    public newTask(): Promise<TaskModel> {
        return this.axios.get("/create")
            .then(response => {
                const task: ITask = response.data;
                return new TaskModel(task.id, task.title, task.completed)
            });
    }

    public updateTask(task: TaskModel) {
        this.axios.post("/update", JSON.stringify(task), {
            headers: {'content-type': 'application/json'}
        }).catch(reason => console.error("Failed to update task: " + reason))
    }

    public deleteTask(task: TaskModel) {
        this.axios.delete(`/tasks/${task.id}`)
            .catch(reason => console.error("Failed to delete task: " + reason))
    }
}

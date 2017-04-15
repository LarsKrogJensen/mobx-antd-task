import {TaskModel} from "./TaskModel";
import Axios from "axios";

interface Todo {
    completed: boolean,
    title: string,
    order?: number,
    url?: string
}

export default class TaskApi {
    private axios = Axios.create({
        baseURL: "http://localhost:8080",
        timeout: 5000
    });


    loadTasks(): Promise<Array<TaskModel>> {
        const axios = this.axios;
        return new Promise<Array<TaskModel>>((resolve, reject) => {
            axios.get("/tasks")
                .then(response => {
                    const data: Array<Todo> = response.data
                    resolve(data.map(todo => new TaskModel(todo.title, todo.completed)))
                })
                .catch(reason => reject(reason))
        })

    }

    newTask(): Promise<TaskModel> {
        return this.axios.get("/create")
            .then(response => {
                const task = response.data;
                return new TaskModel(task.title, task.completed)
            });
    }

    updateTask(task: TaskModel) {
        this.axios.patch("/update", JSON.stringify(task), {
            headers: {'content-type': 'application/json'}
        })
            .catch(reason => console.error("Failed to update task: " + reason))
    }

    deleteTask(task: TaskModel) {
        this.axios.delete(`/delete/${task.id}`, {
            data: JSON.stringify(task)
        }).catch(reason => console.error("Failed to delete task: " + reason))
    }
}
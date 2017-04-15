import {TaskModel} from "./TaskModel";
import Axios from "axios";

interface Task {
    id: number,
    completed: boolean,
    title: string,
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
                    const data: Array<Task> = response.data
                    resolve(data.map(todo => new TaskModel(todo.id, todo.title, todo.completed)))
                })
                .catch(reason => reject(reason))
        })

    }

    newTask(): Promise<TaskModel> {
        return this.axios.get("/create")
            .then(response => {
                const task:Task = response.data;
                return new TaskModel(task.id, task.title, task.completed)
            });
    }

    updateTask(task: TaskModel) {
        this.axios.post("/update", JSON.stringify(task), {
            headers: {'content-type': 'application/json'}
        })
            .catch(reason => console.error("Failed to update task: " + reason))
    }

    deleteTask(task: TaskModel) {
        this.axios.delete(`/tasks/${task.id}`)
            .catch(reason => console.error("Failed to delete task: " + reason))
    }
}
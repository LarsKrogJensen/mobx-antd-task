import Axios, {AxiosRequestConfig} from "axios"
import {API_URL} from "./apiConf"

export default class AuthApi {
    public accessToken: string;

    private axios = Axios.create({
        baseURL: API_URL,
        timeout: 50000,
    })


    constructor() {
        this.fetchToken()
        setInterval(() => {this.fetchToken()}, 15 * 60 * 1000) // every 15 minutes
    }

    public authenticate(): Promise<string> {
        const axios = this.axios
        const body = JSON.stringify({
            client_id: "six",
            client_secret: "sixsixsix"
        })
        const config: AxiosRequestConfig = {
            headers: {'content-type': 'application/json'}
        }

        return axios.post("/authenticate", body, config)
            .then(response => {
                return response.data.access_token
            })
    }

    private fetchToken() {
        this.authenticate()
            .then(token => this.accessToken = token)
            .catch(reason => console.log("Failed to retriev token: " + reason))
    }
}

import Axios, {AxiosRequestConfig} from "axios"

export default class AuthApi {
    public accessToken: string;

    private axios = Axios.create({
        baseURL: "https://larskj-gql.herokuapp.com",
        timeout: 50000,
    })


    constructor() {
        this.fetchToken()
        setInterval(() => {this.fetchToken()}, 15 * 60 * 1000) // every 15 minutes
    }

    public authenticate(): Promise<string> {
        const axios = this.axios
        const body = JSON.stringify({
            client_id: "xxxx",
            client_secret: "xxxxx"
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

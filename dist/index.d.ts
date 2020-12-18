import * as axios from "axios";
export interface AxiosDigestAuthOpts {
    axios?: axios.AxiosInstance;
    password: string;
    username: string;
}
export default class AxiosDigestAuth {
    private axios;
    private count;
    private password;
    private username;
    constructor({ axios: axiosInst, password, username }: AxiosDigestAuthOpts);
    request(opts: axios.AxiosRequestConfig): Promise<axios.AxiosResponse>;
}

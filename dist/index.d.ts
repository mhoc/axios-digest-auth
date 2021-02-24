import * as axios from "axios";
/**
 * Options to configure the AxiosDigestAuth instance.
 */
export interface AxiosDigestAuthOpts {
    /**
     * optionally provide your own axios instance. if this is not provided, one will be created for
     * you with default settings.
     */
    axios?: axios.AxiosInstance;
    /** the http digest auth password */
    password: string;
    /** the http digest auth username */
    username: string;
}
export default class AxiosDigestAuth {
    private readonly axios;
    private count;
    private readonly password;
    private readonly username;
    constructor({ axios: axiosInst, password, username }: AxiosDigestAuthOpts);
    request(opts: axios.AxiosRequestConfig): Promise<axios.AxiosResponse>;
}

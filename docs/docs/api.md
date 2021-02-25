# API

## `class AxiosDigestAuth`

```ts
import AxiosDigestAuth from "@mhoc/axios-digest-auth";
```

Application-facing class which stores username/password state and executes requests.

### `new AxiosDigestAuth()`

```ts
const options: AxiosDigestAuthOpts = {
  axios,
  password,
  username,
};
const axiosDigestAuthInst = new AxiosDigestAuth(options);
```

- => `AxiosDigestAuthOpts`: input object (see below)

### `request()`

```ts
import * as axios from "axios";
// you dont have to import this or add it to your package.json.
// just using it to outline where these types are coming from.

const ExecuteMyRequest = async () => {
  const requestOptions: axios.AxiosRequestConfig = {
    headers: { Accept: "application/json" },
    method: "GET",
    url: "https://cloud.mongodb.com/api/atlas/v1.0/groups",
  };
  const response: axios.AxiosResponse = await axiosDigestAuthInst.request(requestOptions);
};
```

Executes a request. The signature of this function is identical to Axios's own `request` method.

- => `axios.AxiosRequestConfig`: refer to [the Axios documentation](https://github.com/axios/axios#request-config) for more information on this type.

- <= `axios.AxiosResponse`: refer to [the Axios documentation](https://github.com/axios/axios#response-schema) for more information on this type.

## `interface AxiosDigestAuthOpts`

```ts
import { AxiosDigestAuthOpts } from "@mhoc/axios-digest-auth";
```

- `axios` (`axios.Axios | undefined`): Optionally provide an axios object with which requests are made. If this is not provided, `axios-digest-auth` will create one for you by simply using the `axios` library default export, with no configuration.

- `password` (`string`): the HTTP digest authentication password to use.

- `username` (`string`): the HTTP digest authentication username to use.
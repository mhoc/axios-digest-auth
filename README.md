# axios-digest-auth

A library which implements HTTP digest authentication in a manner which should be familiar to any 
project which also uses Axios.

```
$ npm i @mhoc/axios-digest-auth
```

# Usage

```ts
import axios from 'axios'; // not necessary to import this; just including it for completeness
import AxiosDigestAuth, { AxiosDigestAuthOpts } from '@mhoc/axios-digest-auth';

// initialization
const digestAuthOpts: AxiosDigestAuthOpts = {
  // password & username are required fields
  password: PASSWORD,
  username: USERNAME,
  // you can also optionally provide your own axios object with whatever settings you'd like
  // configured. if this is not provided, we'll create one for you.
  axios: undefined,
};
const digestAuth = new AxiosDigestAuth(digestAuthOpts);

// this is a normal axios request object
const requestOpts: axios.AxiosRequestConfig = {
  headers: { Accept: "application/json" },
  method: "GET",
  url: "https://cloud.mongodb.com/api/atlas/v1.0/groups",
};

// and this is a normal axios response object
const resp = await digestAuth.request(requestOpts);
// right now, `.request` is the only method available. So, its not a full recreation of `axios`.
```

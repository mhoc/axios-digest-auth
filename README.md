# axios-digest-auth

This is a library which implements digest authentication for axios.

```
$ npm i @mhoc/axios-digest-auth
```

# Usage

```ts
// initialization
const digestAuth = new AxiosDigestAuth({
  password: PASSWORD,
  username: USERNAME,
});

// this is a normal axios request object
const requestOpts = {
  headers: { Accept: "application/json" },
  method: "GET",
  url: "https://cloud.mongodb.com/api/atlas/v1.0/groups",
};

// and this is a normal axios response object
const resp = await digestAuth.request(requestOpts);
// right now, `.request` is the only method available. So, its not a full recreation of `axios`.
```

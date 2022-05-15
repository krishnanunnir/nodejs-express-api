## Local Setup

Requirements: Docker

```
    cp .ex-env .env
    docker-compose up --build
```
This should start the server and the api should be usable.

## Api Endpoints

1. `GET /cache/` -> returns a list of all keys stored in the cache.
eg:
```
$ curl -X GET -H "Content-Type: application/json" http://localhost:3000/cache

> [{"_id":"6280f38ea06a284a5e4d098c","key":"rsebastian","__v":0,"created_at":"2022-05-15T12:35:22.124Z","ttl":60000,"value":"bbfcbe2e7a67acf3fcd6e4f9fcc40e5cebaa1295"}]%
```

2. `GET /cache/key` -> returns the details about the one key passed along with the request, if we cannot find a corresponding value for the key, we create that key.

```
$ curl -X GET -H "Content-Type: application/json"  -d '{"key": "rsebastian"}' http://localhost:3000/cache/key
> {"_id":"6280f38ea06a284a5e4d098c","key":"rsebastian","__v":0,"created_at":"2022-05-15T12:35:22.124Z","ttl":60000,"value":"bbfcbe2e7a67acf3fcd6e4f9fcc40e5cebaa1295"}%                                                             
```

3. `PUT /cache` -> If there is a corresponding key to the key passed in the request header, we can pass details to update the cache record. If there is no corresponding cache record, a new key is created for the key.
```
$ curl -X GET -H "Content-Type: application/json" -d '{"key": "rsebastian"}' http://localhost:3000/cache/key

> {"_id":"6280f38ea06a284a5e4d098c","key":"rsebastian","__v":0,"created_at":"2022-05-15T12:35:22.124Z","ttl":60000,"value":"1179440c0196fabf5eca71d92d27a3bbe9b8a4b9"}%                                                             
```

4. `DELETE /cache` -> Deletes all the cache records.
```
$ curl -X DELETE -H "Content-Type: application/json" \
    http://localhost:3000/cache/  
> Deleted 1 Cache keys%
```

5. `DELETE /cache/key` -> Deletes the cache record corresponding to the key passed.
```
$ curl -X PUT -H "Content-Type: application/json" -d '{"key": "rsebastian", "value": "hell1o"}' http://localhost:3000/cache
> Deleted Key :: rsebastian%
```

<!-- ### Features -->

### Todo
- [ ] Add unit tests
- [ ] Add middleware to check if  the ttl is expired.
- [x] More human readable error messges.
- [ ] Remove Id from being shown to user.
- [x] Setup enviroment variables for mongodb code

### Ambiguities
1. Cache data not used in case of outliving ttl - what does it mean? Does it mean the data is deleted?
2. What update a cache record mean? Since the value is randomly genreated, do we mean to just generate it again? - going with this assumption



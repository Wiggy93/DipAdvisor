# DipAdvisor- Back end.

An Express server serving up data from a MongoDB database.

Install packages with

```
    npm install
```

A .env file is needed to configure access rights to the DB.

The available endpoints are:

### GET /api/locations

```
    Description: Returns a list of all locations.
    Queries: dangerous (boolean) public (boolean).
    Response body: An array of locations on the key of 'locations'
```

### GET /api/locations/:location_id

```
Description: Returns a single location.
Response body: An object on a key of location.
```

### PATCH /api/locations/:location_id

```
Description: Change the details of a location.
Request body: Any valid field from the location schema.
Response body: The updated location object.
},
```

### POST /api/locations

```
Description: Adds a new location.
Request body: An object with keys of location_name, created_by, description and public.
Response body example: An object on the key of location.
},
```

### GET /api

```
Description: Returns all of the endpoints.
Response body : All endpoints on a key of endpoint.
```

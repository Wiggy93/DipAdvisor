# DipAdvisor- Back end.

An Express server serving up data from a MongoDB database.

Install packages with

```
    npm install
```

A .env file is needed to configure access rights to the DB with theo format:

```
DATABASE_URL = ...
```

The available endpoints are:

### GET /api/locations

```
    Description: Returns a list of all locations.
    Queries: dangerous (boolean) public (boolean).
    Response body: An array of locations on the key of 'locations'
{locations : [
      {
        _id: 1,
        location_name: 'Agden Resevoir',
        coordinates: [],
        created_by: 'Mitchel',
        image_urls: [
          'https://fastly.picsum.photos/id/125/1500/1000.jpg?hmac=s6pniw6JFp6F753Ow9mnVAVqt8tOcP8ZlZE5-aJ22co'
        ],
        votes: 0,
        comments: [],
        description: 'A water storage resevoir 6.5 miles west of Sheffield.',
        public: true,
        dangerous: false,
        created_at: '2023-02-23T09:33:41.223Z',
        __v: 0
      },
      {
        _id: 2,
        location_name: 'HedgeCourt Lake',
        coordinates: [ 51.146592, -0.063179 ],
        created_by: 'Alex',
        image_urls: [
          'https://media-cdn.tripadvisor.com/media/photo-s/11/0c/55/4f/beautiful-setting-on.jpg'
        ],
        votes: 0,
        comments: [],
        description: 'Open water swiming before 9:30am on most days',
        public: true,
        dangerous: false,
        created_at: '2023-02-23T09:33:41.225Z',
        __v: 0
      }
}

```

### GET /api/locations/:location_id

```
Description: Returns a single location.
Response body: An object on a key of location.

    {
      location:
        {
          _id: 6,
          location_name: 'Overbeck bridge, Wastwater',
          coordinates: [Array],
          created_by: 'Alex',
          image_urls: [Array],
          votes: 0,
          comments: [],
          description: 'A long lake with fantastic scenery and beautiful water',
          public: true,
          dangerous: false,
          created_at: '2023-02-23T09:33:41.549Z',
          __v: 0
        }
    }
```

### PATCH /api/locations/:location_id

```
Description: Change the details of a location.
Request body: Any valid field from the location schema.
Response body: The updated location object.
{ location :
    {
      _id: 1,
      location_name: 'Agden Resevoir',
      coordinates: [],
      created_by: 'Mitchel',
      image_urls: [
        'https://fastly.picsum.photos/id/125/1500/1000.jpg?hmac=s6pniw6JFp6F753Ow9mnVAVqt8tOcP8ZlZE5-aJ22co'
      ],
      votes: 0,
      comments: [],
      description: 'A water storage resevoir 6.5 miles west of Sheffield.',
      public: true,
      dangerous: true,
      created_at: '2023-02-23T09:33:42.924Z',
      __v: 0
    }
}


```

### POST /api/locations

```
Description: Adds a new location.
Request body: An object with keys of location_name, created_by, description and public.
Response body example: An object on the key of location.

{ location :
    {
      _id: 1,
      location_name: 'Agden Resevoir',
      coordinates: [],
      created_by: 'Mitchel',
      image_urls: [
        'https://fastly.picsum.photos/id/125/1500/1000.jpg?hmac=s6pniw6JFp6F753Ow9mnVAVqt8tOcP8ZlZE5-aJ22co'
      ],
      votes: 0,
      comments: [],
      description: 'A water storage resevoir 6.5 miles west of Sheffield.',
      public: true,
      dangerous: true,
      created_at: '2023-02-23T09:33:42.924Z',
      __v: 0
    }
}
```

### GET /api

```
Description: Returns all of the endpoints.
Response body : All endpoints on a key of endpoint.
```

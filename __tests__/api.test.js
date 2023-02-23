const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const seed = require("../seed_data/seed.js");
const sorted = require("jest-sorted");

require("dotenv").config();

beforeEach(async () => {
  await seed();
});

afterAll(() => {
  mongoose.connection.close();
});

describe("GET /api/locations (all locations)", () => {
  it("returns 200", () => {
    return request(app).get("/api/locations").expect(200);
  });
  it("returns an array of location objects", () => {
    return request(app)
      .get("/api/locations")
      .expect(200)
      .then(({ body: { locations } }) => {
        expect(locations).toBeInstanceOf(Array);
      });
  });
});

describe("Post /api/locations", () => {
  test("201: POST to /api/location should add the input location data to th database, responding with the posted location summary", () => {
    return request(app)
      .post("/api/locations")
      .send({
        location_name: "Overbeck bridge, Wastwater",
        coordinates: [54.449505, -3.284804],
        created_by: "Alex",
        image_urls: [
          "https://www.wildswimming.co.uk/wp-content/uploads/place/_MG_5638.jpg",
        ],
        description: "A long lake with fantastic scenery and beautiful water",
        public: true,
      })
      .expect(201)
      .then(({ body }) => {
        const newLocation = body.location[0];

        expect(typeof newLocation).toBe("object");
        expect(newLocation.location_name).toBe("Overbeck bridge, Wastwater");
        expect(newLocation.coordinates).toEqual([54.449505, -3.284804]);
        expect(newLocation.created_by).toBe("Alex");
        expect(newLocation.image_urls).toEqual([
          "https://www.wildswimming.co.uk/wp-content/uploads/place/_MG_5638.jpg",
        ]);
        expect(newLocation.description).toBe(
          "A long lake with fantastic scenery and beautiful water"
        );
        expect(newLocation.public).toBe(true);
        expect(newLocation.id).to;
      });
  });

  test("201: should confirm that posted location has actually added to database by using getLocationsById", () => {
    return request(app)
      .post("/api/locations")
      .send({
        location_name: "The North Sea",
        coordinates: [53.863369, , 0.47472],
        created_by: "Alex",
        image_urls: [
          "https://lh5.googleusercontent.com/p/AF1QipM5pelCh9LS5GAv7XUt2eO2SPVu5ocTCFjzuyGy=w408-h272-k-no",
        ],
        description: "A big sea",
        public: true,
      })
      .expect(201)
      .then(() => {
        return request(app)
          .get("/api/locations")
          .expect(200)
          .then(({ body: { locations } }) => {
            expect(locations[locations.length - 1].location_name).toBe(
              "The North Sea"
            );
          });
      });
  });

  test("201: should replace mongoDB automatic objectId hex code with increasing integer", () => {
    return request(app)
      .post("/api/locations")
      .send({
        location_name: "Andark Lake",
        coordinates: [50.879926, , -1.290888],
        created_by: "Alex",
        image_urls: [
          "https://andarklake.co.uk/wp-content/uploads/2021/03/swim1-300x200.jpg",
        ],
        description: "Organised open water swimming, with set opening times",
        public: false,
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.location[0]._id).toEqual(expect.any(Number));
      });
  });

  test("400: missing required fields", () => {
    return request(app)
      .post("/api/locations")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad Request");
      });
  });

  test("409: should not be able able to make 2 locations with the same location_name, sends back error if tries", () => {
    return request(app)
      .post("/api/locations")
      .send({
        location_name: "Agden Resevoir",
        created_by: "Mitchel",
        description: "A water storage resevoir 6.5 miles west of Sheffield.",
        public: true,
      })
      .expect(409)
      .then(({ body }) => {
        expect(body.message).toBe("Location name already exists");
      });
  });
});

describe("GET /api/locations/:id", () => {
  test("200: Responds with the location object", async () => {
    const {
      body: { location },
    } = await request(app).get("/api/locations/1").expect(200);
    expect(location).toMatchObject({
      _id: 1,
      location_name: expect.any(String),
      coordinates: expect.any(Array),
      created_by: expect.any(String),
      image_urls: expect.any(Array),
      votes: 0,
      comments: expect.any(Array),
      description: expect.any(String),
      public: expect.any(Boolean),
      dangerous: false,
      created_at: expect.any(String),
    });
  });
  test("404: Location Not Found", async () => {
    const {
      body: { message },
    } = await request(app).get("/api/locations/203874923").expect(404);
    expect(message).toEqual("Not Found");
  });
  test("400: Invalid datatype for location_id", async () => {
    const {
      body: { message },
    } = await request(app).get("/api/locations/eeee").expect(400);
    expect(message).toEqual("Bad Request");
  });
});

describe("PATCH /api/locations/:id", () => {
  test("200: Updates the dangerous property to true", () => {
    return request(app)
      .patch("/api/locations/1")
      .expect(200)
      .then(({ body: { updatedLocation } }) => {
        expect(updatedLocation).toHaveProperty("dangerous", true);
      });
  });
  test("200: Updates the dangerous property to false", () => {
    return request(app).get("/api/locations").expect(200);
  });
  it("returns an array of location objects", () => {
    return request(app)
      .patch("/api/locations/2")
      .expect(200)
      .then(({ body: { updatedLocation } }) => {
        expect(updatedLocation).toHaveProperty("dangerous", true);
      });
  });
  test("404: Location Not Found", () => {
    return request(app)
      .patch("/api/locations/999999999999999999999999999")
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toEqual("Not Found");
      });
  });
  test("400: Invalid datatype for location_id", () => {
    return request(app)
      .patch("/api/locations/a")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toEqual("Bad Request");
      });
  });
});

describe("GET /api/locations queries", () => {
  it("returns a status 200 and an array of safe locations ", () => {
    return request(app)
      .get("/api/locations?dangerous=false")
      .expect(200)
      .then(({ body }) => {
        body.locations.forEach((location) => {
          expect(location.dangerous).toBe(false);
        });
      });
  });
  it("returns a staus 200 and an array of unsafe locations", () => {
    return request(app)
      .get("/api/locations?dangerous=true")
      .expect(200)
      .then(({ body }) => {
        body.locations.forEach((location) => {
          expect(location.dangerous).toBe(true);
        });
      });
  });
  it("rejects unacceptable fields", () => {
    return request(app)
      .get("/api/locations?bananas=true")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad request");
      });
  });
});

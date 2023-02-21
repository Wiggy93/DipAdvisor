const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const seed = require("../seed_data/seed.js");
const { fetchLocations } = require("../models/models");

require("dotenv").config();

beforeAll(async () => {
  await seed();
});

afterAll(async () => {
  mongoose.connection.close();
});

describe("Post Locations", () => {
  test("201: POST to /api/location should add the input location data to th database, responding with the posted location summary", () => {
    return request(app)
      .post("/api/locations")
      .send({
        location_name: "Overbeck bridge, Wastwater",
        coordinates: [54.449505, -3.284804],
        created_by: "Alex",
        image_url:
          "https://www.wildswimming.co.uk/wp-content/uploads/place/_MG_5638.jpg",
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
        expect(newLocation.image_url).toBe(
          "https://www.wildswimming.co.uk/wp-content/uploads/place/_MG_5638.jpg"
        );
        expect(newLocation.description).toBe(
          "A long lake with fantastic scenery and beautiful water"
        );
        expect(newLocation.public).toBe(true);
        expect(newLocation.id).to;
      });
  });

  test("should confirm that posted location has actually added to database by using getLocationsById", () => {
    return request(app)
      .post("/api/locations")
      .send({
        location_name: "The North Sea",
        coordinates: [53.863369, , 0.47472],
        created_by: "Alex",
        image_url:
          "https://lh5.googleusercontent.com/p/AF1QipM5pelCh9LS5GAv7XUt2eO2SPVu5ocTCFjzuyGy=w408-h272-k-no",
        description: "A big sea",
        public: true,
      })
      .expect(201)
      .then(() => {
        return request(app)
          .get("/api/locations")
          .expect(200)
          .then(({ body }) => {
            console.log(body, "get all locations");
            expect(body[body.length - 1].location_name).toBe("The North Sea");
          });
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

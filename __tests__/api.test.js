const request = require("supertest");
const app = require("../index");
const seed = require("../seed_data/seed.js");
const mongoose = require("mongoose");

beforeAll(async () => {
  await seed();
});

afterAll(async () => {
  mongoose.connection.close();
});

describe("GET /api/locations", () => {
  it("returns 200", () => {
    return request(app).get("/api/locations").expect(200);
  });
  it("returns an array of location objects", () => {
    return request(app)
      .get("/api/locations")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Array);
      });
  });
});

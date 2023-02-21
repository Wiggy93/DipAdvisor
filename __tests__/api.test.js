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

describe("GET /api/locations/:id", () => {
  it("returns 200", () => {
    return request(app)
      .get("/api/locations/1")
      .expect(200)
      .then(({ body, body: { location } }) => {
        console.log(body);
      });
  });
});

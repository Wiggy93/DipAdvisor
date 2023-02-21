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
  test("200: Responds with the location object", async () => {
    const {
      body: { location },
    } = await request(app).get("/api/locations/1").expect(200);
    expect(location).toMatchObject({
      _id: 1,
      location_name: expect.any(String),
      coordinates: expect.any(Array),
      created_by: expect.any(String),
      image_url: expect.any(String),
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

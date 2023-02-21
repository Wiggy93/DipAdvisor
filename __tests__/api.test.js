const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const seed = require("../seed_data/seed.js");

require("dotenv").config();

beforeEach(async () => {
  await seed();
});

afterEach(async () => {
  mongoose.connection.close();
});

describe("Post Locations", () => {
  test("201: POST to /api/location should add the input location data to th database, responding with the posted location summary", () => {
    return request(index)
      .post("/api/location")
      .send({
        title: "Overbeck bridge, Wastwater",
        coordinate: [54.449505, -3.284804],
        created_by: "Alex",
        image_url:
          "https://www.wildswimming.co.uk/wp-content/uploads/place/_MG_5638.jpg",
        description: "A long lake with fantastic scenery and beautiful water",
        public: true,
      })
      .expect(201)
      .then(({ body }) => {
        console.log(body);
        const newLocation = body.addedLocation;

        expect(typeof newLocation).toBe("object");
        expect(newLocation.title).toBe("Overbeck bridge, Wastwater");
        expect(newLocation.coordinate).toEqual([54.449505, -3.284804]);
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
    ///once this function is written in another branch
  });
});

// describe("insert", () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = await connection.db(globalThis.__MONGO_DB_NAME__);
//   });

//   afterAll(async () => {
//     await connection.close();
//   });

//   it("returns 200", () => {});

//   it("should insert a doc into collection", async () => {
//     const users = db.collection("users");

//     const mockUser = { _id: "some-user-id", name: "John" };
//     await users.insertOne(mockUser);

//     const insertedUser = await users.findOne({ _id: "some-user-id" });
//     expect(insertedUser).toEqual(mockUser);
//   });
// });

const app = require("./index.js");

const seed = require("./seed_data/seed.js");

seed();

app.listen(3000, () => console.log("Listening on port 3000..."));

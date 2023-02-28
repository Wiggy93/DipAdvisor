const locations = [
  {
    location_name: "Agden Resevoir",
    created_by: "Mitchel",
    coordinates: [53.42642, -1.612444],
    image_urls: [
      "https://fastly.picsum.photos/id/125/1500/1000.jpg?hmac=s6pniw6JFp6F753Ow9mnVAVqt8tOcP8ZlZE5-aJ22co",
    ],
    description: "A water storage resevoir 6.5 miles west of Sheffield.",
    public: true,
  },
  {
    location_name: "HedgeCourt Lake",
    created_by: "Alex",
    coordinates: [51.146592, -0.063179],
    description: "Open water swiming before 9:30am on most days",
    image_urls: [
      "https://media-cdn.tripadvisor.com/media/photo-s/11/0c/55/4f/beautiful-setting-on.jpg",
    ],
    public: true,
    dangerous: true,
  },
  {
    location_name: "Manley Mere",
    coordinates: [53.244975, -2.772986],
    created_by: "George",
    description:
      "Open Water Swimming with marked courses (we have a 250m loop especially for beginners) 500 and 750m loop and safety cover On site parking, toilet & changing and shower facilities, Chameleon Cafe Bar.",
    public: true,
    dangerous: false,
  },
  {
    location_name: "Shepperton Lake",
    created_by: "Ben",
    image_urls: [
      "https://www.sheppertonopenwaterswim.co.uk/assets/img/sows-lake-swimmers.jpg",
    ],
    coordinates: [51.386396, -0.454182],
    description:
      "Open water swimming at Shepperton lake is on a booking only basis so you must make a booking with us before you arrive at the lake. New swimmmers must complete an induction.",
    public: false,
    dangerous: false,
  },
  {
    location_name: "Askham & Helton Lido",
    created_by: "Admin",
    image_urls: [
      "https://www.askhamandhelton.co.uk/wp-content/uploads/2014/04/Pool2-1024x192.jpg",
      "http://www.askhamandhelton.co.uk/wp-content/uploads/2014/04/pool5.jpg",
      "http://www.askhamandhelton.co.uk/wp-content/uploads/2014/04/pool5.jpg",
      "https://www.askhamandhelton.co.uk/wp-content/uploads/2014/04/Pool2-1024x192.jpg",
    ],
    coordinates: [54.60639918801785, -2.7553538728462184],
    description:
      "Community outdoor swimming pool staffed by qualified lifeguards",
    public: false,
    dangerous: false,
    depth: "2 m",
  },
];
module.exports = locations;

const bcrypt = require("bcryptjs");

const seedUsers = [
  {
    email: "user1@user.io",
    username: "User1",
    hashedPassword: bcrypt.hashSync("password", 10),
    firstName: "FakeFirst1",
    lastName: "FakeLast1",
  },
  {
    email: "user2@user.io",
    username: "User2",
    hashedPassword: bcrypt.hashSync("password2", 10),
    firstName: "FakeFirst2",
    lastName: "FakeLast2",
  },
  {
    email: "user3@user.io",
    username: "User3",
    hashedPassword: bcrypt.hashSync("password3", 10),
    firstName: "FakeFirst3",
    lastName: "FakeLast3",
  },
  {
    email: "user4@user.io",
    username: "User4",
    hashedPassword: bcrypt.hashSync("password4", 10),
    firstName: "FakeFirst4",
    lastName: "FakeLast4",
  },
  {
    email: "user5@user.io",
    username: "User5",
    hashedPassword: bcrypt.hashSync("password5", 10),
    firstName: "FakeFirst5",
    lastName: "FakeLast5",
  },
  {
    email: "user6@user.io",
    username: "User6",
    hashedPassword: bcrypt.hashSync("password6", 10),
    firstName: "FakeFirst6",
    lastName: "FakeLast6",
  },
  {
    email: "user7@user.io",
    username: "User7",
    hashedPassword: bcrypt.hashSync("password7", 10),
    firstName: "FakeFirst7",
    lastName: "FakeLast7",
  },
  {
    email: "user8@user.io",
    username: "User8",
    hashedPassword: bcrypt.hashSync("password8", 10),
    firstName: "FakeFirst8",
    lastName: "FakeLast8",
  },
  {
    email: "user9@user.io",
    username: "User9",
    hashedPassword: bcrypt.hashSync("password9", 10),
    firstName: "FakeFirst9",
    lastName: "FakeLast9",
  },
  {
    email: "user10@user.io",
    username: "User10",
    hashedPassword: bcrypt.hashSync("password10", 10),
    firstName: "FakeFirst10",
    lastName: "FakeLast10",
  },
];

const seedSpots = [
  {
    ownerId: 1,
    address: "123 Fake Street",
    city: "Fake Town",
    state: "California",
    country: "United States",
    lat: 23.56,
    lng: 45.66,
    name: "Big Rock Cabin",
    description:
      "A beautiful Log Cabin Home  On riverfront.  Kayaks, Biking and hiking trails in a remote, peaceful location.",
    price: 125.0,
  },
  {
    ownerId: 2,
    address: "555 Phony Avenue",
    city: "Phony City",
    state: "New York",
    country: "United States",
    lat: 53.66,
    lng: 75.54,
    name: "Cozy Apartment",
    description:
      "With stunning sea views of the Biscayne Bay, this unique condo of 1,347 sq will captivate you. Two Bedrooms and 2 bathrooms, open living space with floor-to-ceiling windows and kitchen completely equipped.",
    price: 275.0,
  },
  {
    ownerId: 3,
    address: "9999 Not Real Drive",
    city: "Madeupton",
    state: "Florida",
    country: "United States",
    lat: 100.44,
    lng: 48.98,
    name: "Private Island Spot",
    description:
      "You own private island right off the City of Marathon in the Florida Keys. 3 bedrooms, two baths, 12 ft veranda that surrounds the house and it even comes with a 21 ft. Carolina Skiff for transportation to and from the island.",
    price: 1585.0,
  },
  {
    ownerId: 4,
    address: "456 Imaginary Lane",
    city: "Dreamville",
    state: "Texas",
    country: "United States",
    lat: 62.33,
    lng: 84.12,
    name: "Enchanted Cottage",
    description:
      "Escape to this charming cottage nestled in the heart of Dreamville. Surrounded by lush gardens and fairy lights, this cozy getaway offers a truly magical experience.",
    price: 180.0,
  },
  {
    ownerId: 5,
    address: "789 Mirage Road",
    city: "Fantasyburg",
    state: "Colorado",
    country: "United States",
    lat: 35.78,
    lng: 68.21,
    name: "Mystic Retreat",
    description:
      "Discover the secrets of Fantasyburg at this enchanting retreat. Hidden among the ancient trees, this spot is perfect for those seeking solitude and adventure.",
    price: 210.0,
  },
  {
    ownerId: 6,
    address: "987 Whimsical Street",
    city: "Whimsyville",
    state: "Oregon",
    country: "United States",
    lat: 42.15,
    lng: 57.89,
    name: "Quirky Loft",
    description:
      "Step into a world of whimsy in this eclectic loft. Vibrant colors, funky decor, and a rooftop garden create an unforgettable stay.",
    price: 150.0,
  },
  {
    ownerId: 7,
    address: "234 Fictional Avenue",
    city: "Storyville",
    state: "Louisiana",
    country: "United States",
    lat: 74.92,
    lng: 21.36,
    name: "Book Lover's Haven",
    description:
      "Immerse yourself in literature at this charming spot. Cozy up with a book by the fireplace or explore the nearby streets that inspired countless tales.",
    price: 95.0,
  },
  {
    ownerId: 8,
    address: "678 Wonderland Lane",
    city: "Wonderland",
    state: "Nevada",
    country: "United States",
    lat: 12.34,
    lng: 98.76,
    name: "Fantasy Castle",
    description:
      "Live out your fairy tale dreams at this opulent castle. With grand halls, secret passages, and breathtaking views, this spot is fit for royalty.",
    price: 1200.0,
  },
  {
    ownerId: 9,
    address: "876 Magic Road",
    city: "Mysticville",
    state: "Arizona",
    country: "United States",
    lat: 56.21,
    lng: 32.45,
    name: "Ethereal Cabin",
    description:
      "Experience the magic of nature in this ethereal cabin. Nestled beside a tranquil lake, this spot offers a serene escape from the ordinary.",
    price: 280.0,
  },
  {
    ownerId: 10,
    address: "543 Fantasy Avenue",
    city: "Imagination City",
    state: "Utah",
    country: "United States",
    lat: 89.12,
    lng: 43.21,
    name: "Immersive Retreat",
    description:
      "Embark on a journey of imagination at this one-of-a-kind retreat. Surreal landscapes and artistic touches create an immersive experience like no other.",
    price: 195.0,
  },
];

const seedBookings = [
  {
    userId: 1,
    spotId: 2,
    startDate: "2023-10-01",
    endDate: "2023-10-15",
  },
  {
    userId: 2,
    spotId: 3,
    startDate: "2023-08-15",
    endDate: "2023-08-25",
  },
  {
    userId: 3,
    spotId: 1,
    startDate: "2023-09-01",
    endDate: "2023-09-15",
  },
  {
    userId: 4,
    spotId: 5,
    startDate: "2023-11-10",
    endDate: "2023-11-20",
  },
  {
    userId: 5,
    spotId: 4,
    startDate: "2023-12-05",
    endDate: "2023-12-15",
  },
  {
    userId: 6,
    spotId: 7,
    startDate: "2023-09-20",
    endDate: "2023-09-25",
  },
  {
    userId: 7,
    spotId: 6,
    startDate: "2023-10-10",
    endDate: "2023-10-20",
  },
  {
    userId: 8,
    spotId: 9,
    startDate: "2023-08-01",
    endDate: "2023-08-10",
  },
  {
    userId: 9,
    spotId: 8,
    startDate: "2023-11-01",
    endDate: "2023-11-15",
  },
  {
    userId: 3,
    spotId: 1,
    startDate: "2023-12-20",
    endDate: "2023-12-31",
  },
  {
    userId: 1,
    spotId: 7,
    startDate: "2023-10-01",
    endDate: "2023-10-10",
  },
  {
    userId: 2,
    spotId: 8,
    startDate: "2023-08-26",
    endDate: "2023-09-05",
  },
  {
    userId: 3,
    spotId: 4,
    startDate: "2023-09-16",
    endDate: "2023-09-25",
  },
  {
    userId: 4,
    spotId: 2,
    startDate: "2023-11-21",
    endDate: "2023-11-30",
  },
  {
    userId: 5,
    spotId: 1,
    startDate: "2023-12-16",
    endDate: "2023-12-31",
  },
  {
    userId: 6,
    spotId: 10,
    startDate: "2023-09-26",
    endDate: "2023-10-05",
  },
  {
    userId: 7,
    spotId: 9,
    startDate: "2023-10-21",
    endDate: "2023-10-31",
  },
  {
    userId: 8,
    spotId: 5,
    startDate: "2023-08-11",
    endDate: "2023-08-20",
  },
  {
    userId: 9,
    spotId: 6,
    startDate: "2023-11-16",
    endDate: "2023-11-25",
  },
  {
    userId: 10,
    spotId: 3,
    startDate: "2023-12-10",
    endDate: "2023-12-15",
  },
];

const seedReviews = [
  {
    userId: 1,
    spotId: 2,
    review:
      "Amazing getaway with stunning views. The spacious rooms and modern amenities were a highlight of our trip.",
    stars: 5,
  },
  {
    userId: 2,
    spotId: 3,
    review:
      "The location was beautiful, but the cleanliness of the bathroom left much to be desired. Everything else was okay.",
    stars: 3,
  },
  {
    userId: 3,
    spotId: 1,
    review:
      "Had a fantastic time at this spot. The cabin was cozy, and the riverfront location provided plenty of outdoor activities.",
    stars: 5,
  },
  {
    userId: 4,
    spotId: 5,
    review:
      "The charm of the enchanted cottage made for a magical stay. A perfect retreat from the city!",
    stars: 4,
  },
  {
    userId: 5,
    spotId: 4,
    review:
      "Not as mystical as expected, but the nearby hiking trails were wonderful. The cottage itself was cozy and comfortable.",
    stars: 3,
  },
  {
    userId: 6,
    spotId: 7,
    review:
      "The quirky loft was an adventure in itself! From the rooftop garden to the vibrant decor, it was an unforgettable experience.",
    stars: 4,
  },
  {
    userId: 7,
    spotId: 6,
    review:
      "This spot was a book lover's paradise. Spending evenings by the fireplace with a good book was the highlight of our stay.",
    stars: 5,
  },
  {
    userId: 8,
    spotId: 9,
    review:
      "The ethereal cabin by the tranquil lake provided the perfect escape. We enjoyed kayaking and star-gazing at night.",
    stars: 4,
  },
  {
    userId: 9,
    spotId: 8,
    review:
      "Living like royalty at the fantasy castle was a dream come true. The grand halls and secret passages added to the magic.",
    stars: 5,
  },
  {
    userId: 3,
    spotId: 1,
    review:
      "A serene and picturesque spot. We enjoyed kayaking and exploring the surrounding nature.",
    stars: 5,
  },
  {
    userId: 1,
    spotId: 7,
    review:
      "The eclectic loft was a colorful and vibrant space. We loved the funky decor and the rooftop garden.",
    stars: 4,
  },
  {
    userId: 2,
    spotId: 8,
    review:
      "The private island spot was an adventure to reach, but the stunning views and tranquil surroundings were worth it.",
    stars: 4,
  },
  {
    userId: 3,
    spotId: 4,
    review:
      "A majestic stay at the fantasy castle. The breathtaking views and luxurious amenities made it a truly memorable experience.",
    stars: 5,
  },
  {
    userId: 4,
    spotId: 2,
    review:
      "This spot provided a cozy and charming atmosphere, perfect for a quiet and relaxing getaway.",
    stars: 4,
  },
  {
    userId: 5,
    spotId: 1,
    review:
      "An imaginative escape at the immersive retreat. The artistic details and surreal landscapes created a unique ambiance.",
    stars: 5,
  },
  {
    userId: 6,
    spotId: 10,
    review:
      "The enchanted cottage offered a quaint and magical setting. It was a cozy and peaceful escape.",
    stars: 4,
  },
  {
    userId: 7,
    spotId: 9,
    review:
      "The cozy apartment had stunning sea views and a well-equipped kitchen. The open living space was a plus.",
    stars: 4,
  },
  {
    userId: 8,
    spotId: 5,
    review:
      "The immersive retreat truly lived up to its name. Surreal landscapes and artistic touches made it a unique and creative stay.",
    stars: 5,
  },
  {
    userId: 9,
    spotId: 6,
    review:
      "The mystic retreat provided a peaceful escape. The hidden location and serene environment were perfect for relaxation.",
    stars: 4,
  },
  {
    userId: 10,
    spotId: 3,
    review:
      "Mixed feelings about this spot. The beautiful sea views were marred by the condition of the bathroom.",
    stars: 3,
  },
];

const seedSpotImages = [
  {
    url: "http://spotImageForId1true.jpg",
    spotId: 1,
    preview: true,
  },
  {
    url: "http://spotImageForId2true.jpg",
    spotId: 2,
    preview: true,
  },
  {
    url: "http://spotImageForId3true.jpg",
    spotId: 3,
    preview: true,
  },
  {
    url: "http://spotImageForId1false.jpg",
    spotId: 1,
    preview: false,
  },
  {
    url: "http://spotImageForId2false.jpg",
    spotId: 2,
    preview: false,
  },
  {
    url: "http://spotImageForId3false.jpg",
    spotId: 3,
    preview: false,
  },
  {
    url: "http://spotImageForId4true.jpg",
    spotId: 4,
    preview: true,
  },
  {
    url: "http://spotImageForId5true.jpg",
    spotId: 5,
    preview: true,
  },
  {
    url: "http://spotImageForId6true.jpg",
    spotId: 6,
    preview: true,
  },
  {
    url: "http://spotImageForId4false.jpg",
    spotId: 4,
    preview: false,
  },
  {
    url: "http://spotImageForId5false.jpg",
    spotId: 5,
    preview: false,
  },
  {
    url: "http://spotImageForId6false.jpg",
    spotId: 6,
    preview: false,
  },
  {
    url: "http://spotImageForId7true.jpg",
    spotId: 7,
    preview: true,
  },
  {
    url: "http://spotImageForId8true.jpg",
    spotId: 8,
    preview: true,
  },
  {
    url: "http://spotImageForId9true.jpg",
    spotId: 9,
    preview: true,
  },
  {
    url: "http://spotImageForId7false.jpg",
    spotId: 7,
    preview: false,
  },
  {
    url: "http://spotImageForId8false.jpg",
    spotId: 8,
    preview: false,
  },
  {
    url: "http://spotImageForId9false.jpg",
    spotId: 9,
    preview: false,
  },
  {
    url: "http://spotImageForId10false.jpg",
    spotId: 10,
    preview: true,
  },
  {
    url: "http://spotImageForId10false.jpg",
    spotId: 10,
    preview: false,
  },
];

const seedReviewImages = [
  {
    url: "http://reviewImageForId1true.jpg",
    reviewId: 1,
    preview: true,
  },
  {
    url: "http://reviewImageForId2true.jpg",
    reviewId: 2,
    preview: true,
  },
  {
    url: "http://reviewImageForId3true.jpg",
    reviewId: 3,
    preview: true,
  },
  {
    url: "http://reviewImageForId1false.jpg",
    reviewId: 1,
    preview: false,
  },
  {
    url: "http://reviewImageForId2false.jpg",
    reviewId: 2,
    preview: false,
  },
  {
    url: "http://reviewImageForId3false.jpg",
    reviewId: 3,
    preview: false,
  },
  {
    url: "http://reviewImageForId4true.jpg",
    reviewId: 4,
    preview: true,
  },
  {
    url: "http://reviewImageForId5true.jpg",
    reviewId: 5,
    preview: true,
  },
  {
    url: "http://reviewImageForId6true.jpg",
    reviewId: 6,
    preview: true,
  },
  {
    url: "http://reviewImageForId4false.jpg",
    reviewId: 4,
    preview: false,
  },
  {
    url: "http://reviewImageForId5false.jpg",
    reviewId: 5,
    preview: false,
  },
  {
    url: "http://reviewImageForId6false.jpg",
    reviewId: 6,
    preview: false,
  },
  {
    url: "http://reviewImageForId7true.jpg",
    reviewId: 7,
    preview: true,
  },
  {
    url: "http://reviewImageForId8true.jpg",
    reviewId: 8,
    preview: true,
  },
  {
    url: "http://reviewImageForId9true.jpg",
    reviewId: 9,
    preview: true,
  },
  {
    url: "http://reviewImageForId7false.jpg",
    reviewId: 7,
    preview: false,
  },
  {
    url: "http://reviewImageForId8false.jpg",
    reviewId: 8,
    preview: false,
  },
  {
    url: "http://reviewImageForId9false.jpg",
    reviewId: 9,
    preview: false,
  },
  {
    url: "http://reviewImageForId10true.jpg",
    reviewId: 10,
    preview: true,
  },
  {
    url: "http://reviewImageForId10false.jpg",
    reviewId: 10,
    preview: false,
  },
  {
    url: "http://reviewImageForID11true.jpg",
    reviewId: 11,
    preview: true,
  },
  {
    url: "http://reviewImageForID11false.jpg",
    reviewId: 11,
    preview: false,
  },
  {
    url: "http://reviewImageForID12true.jpg",
    reviewId: 12,
    preview: true,
  },
  {
    url: "http://reviewImageForID12false.jpg",
    reviewId: 12,
    preview: false,
  },
  {
    url: "http://reviewImageForID13true.jpg",
    reviewId: 13,
    preview: true,
  },
  {
    url: "http://reviewImageForID13false.jpg",
    reviewId: 13,
    preview: false,
  },
  {
    url: "http://reviewImageForID14true.jpg",
    reviewId: 14,
    preview: true,
  },
  {
    url: "http://reviewImageForID14false.jpg",
    reviewId: 14,
    preview: false,
  },
  {
    url: "http://reviewImageForID15true.jpg",
    reviewId: 15,
    preview: true,
  },
  {
    url: "http://reviewImageForID15false.jpg",
    reviewId: 15,
    preview: false,
  },
  {
    url: "http://reviewImageForID16true.jpg",
    reviewId: 16,
    preview: true,
  },
  {
    url: "http://reviewImageForID16false.jpg",
    reviewId: 16,
    preview: false,
  },
  {
    url: "http://reviewImageForID17true.jpg",
    reviewId: 17,
    preview: true,
  },
  {
    url: "http://reviewImageForID17false.jpg",
    reviewId: 17,
    preview: false,
  },
  {
    url: "http://reviewImageForID18true.jpg",
    reviewId: 18,
    preview: true,
  },
  {
    url: "http://reviewImageForID18false.jpg",
    reviewId: 18,
    preview: false,
  },
  {
    url: "http://reviewImageForID19true.jpg",
    reviewId: 19,
    preview: true,
  },
  {
    url: "http://reviewImageForID19false.jpg",
    reviewId: 19,
    preview: false,
  },
  {
    url: "http://reviewImageForID20true.jpg",
    reviewId: 20,
    preview: true,
  },
  {
    url: "http://reviewImageForID20false.jpg",
    reviewId: 20,
    preview: false,
  },
];

// Use the seedReviews array as needed in your application

module.exports = {
  seedUsers,
  seedSpots,
  seedBookings,
  seedSpotImages,
  seedReviewImages,
  seedReviews,
};

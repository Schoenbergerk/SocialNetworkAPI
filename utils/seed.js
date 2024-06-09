const connection = require('../config/connection');
const { User, Thought } = require('../models');
const mongoose = require('mongoose');

const seedUsers = async () => {
  await mongoose.connection.dropDatabase();

  const thoughts = [
    {
      thoughtText: 'What a nice day for a white wedding',
      username: 'Billy',
    },
    {
      thoughtText: 'A cold November rain is best',
      username: 'Axel',
    },
    {
      thoughtText: 'What a wonderful world',
      username: 'Louis',
    },
  ]

const createdThoughts = await Thought.insertMany(thoughts);

const users = [
  {
      username: 'Billy',
      email: 'billy.idol@example.com',
      thoughts: [createdThoughts[0]._id],
      friends:[],
  },
  {
      username: 'Axel',
      email: 'axel.rose@example.com',
      thoughts: [createdThoughts[1]._id],
      friends: [],
  },
  {
      username: 'Louis',
      email: 'louis.armstrong@example.com',
      thoughts: [createdThoughts[2]._id],
      friends: [],
  },
];

try {
  await User.insertMany(users);
  console.log('Users seeded in database');
} catch (err) {
  console.error('error seeding users:', err);
} finally {
  mongoose.connection.close();
}
};

seedUsers();

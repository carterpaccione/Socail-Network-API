import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { users, thoughts } from './data.js';

try {
    await db();
    await cleanDB();

    const seedUsers = await User.insertMany(users);
    console.log(`${seedUsers.length} users seeded`);

    const seedThoughts = await Thought.insertMany(thoughts);
    console.log(`${seedThoughts.length} thoughts seeded`);

} catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
}

console.table(users);
console.table(thoughts);
process.exit(1);
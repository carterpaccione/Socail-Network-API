import { User, Thought } from '../models/index.js';

const cleanDB = async () => {
    try {
        await User.deleteMany({});
        console.log('User data cleaned');

        await Thought.deleteMany({});
        console.log('Thought data cleaned');

    } catch (err) {
        console.error('Error cleaning collections:', err);
        process.exit(1);
    }
};

export default cleanDB;
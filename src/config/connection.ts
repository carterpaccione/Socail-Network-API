import mongoose from 'mongoose';

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialchallengeDB')
        console.log('Database connected');
        return mongoose.connection;
    } catch (error) {
        console.log('Error connecting to database', error);
        throw new Error('Error connecting to database');
    }
};

export default db;
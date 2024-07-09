import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('MongoDB connected');
        })

        connection.on('error', (err) => {
            console.log('Mongo db connection error make sure db is running');
            console.log(err);
            process.exit()
            //TODO: exit with exit code
        })
    } catch (error) {
        console.log('Something went wrong in connect DB');
        console.log(error);        
        
    }
}
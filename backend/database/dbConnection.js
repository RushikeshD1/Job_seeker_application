import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL , {
        dbName : "job_seeker_application"
    }).then(() => {
        console.log("Successfully connected to database")
    }).catch((e) => {
        console.log(`Error while connecting to database ${e}`)
    })
}


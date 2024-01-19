const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectToDB = async () => {
    try {
        await mongoose.connect(config.mongoUrl, {
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err);
        return err;
    }
}

module.exports = connectToDB;

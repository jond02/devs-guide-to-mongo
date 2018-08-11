const mongoose = require("mongoose");

before((done) => {
    mongoose.connect("mongodb://localhost:27017/users_test", { useNewUrlParser: true });

    mongoose.connection
        .once("open", () => {
            done();
        }).on("error", error => {
            console.warn("Warning", error);
        });
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        //ready to run the next test
        done();
    });
});
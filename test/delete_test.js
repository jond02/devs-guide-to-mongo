const assert = require("assert");
const User = require("../src/user");


describe("Deleting records", () => {

    let joe;

    beforeEach(done => {
        joe = new User({ name: "Joe"});
        joe.save().then(() => done());
    });

    it("model instance remove", done => {

        //remove specific record
        joe.remove()
            .then(() => User.findOne({ name: "Joe"}))
            .then(user => {
                assert(user === null);
                done();
            });
    });

    it("class method remove", done => {

        //remove a bunch of records
        User.remove({ name: "Joe"})
            .then(() => User.findOne({ name: "Joe"}))
            .then(user => {
                assert(user === null);
                done();
            });
    });

    it("class method findAndRemove", done => {

        User.findOneAndRemove({ name: "Joe"})
            .then(() => User.findOne({ name: "Joe"}))
            .then(user => {
                assert(user === null);
                done();
            });
    });

    it("class method findByIdAndRemove", done => {

        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({ name: "Joe"}))
            .then(user => {
                assert(user === null);
                done();
            });
    });

});

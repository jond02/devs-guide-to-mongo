const assert = require("assert");
const User = require("../src/user");


describe("Updating records", () => {

    let joe;

    beforeEach(done => {
        joe = new User({ name: "Joe", likes: 0});
        joe.save().then(() => done());
    });

    const assertName = (job, done) => {

        job.then(() => User.find({}))
            .then(users => {
                assert(users.length === 1);
                assert(users[0].name === "Alex");
                done();
            });
    };

    it("instance type using set and save", done => {

        //in memory update, not persisted
        joe.set("name", "Alex");
        assertName(joe.save(), done);
    });

    it("a model instance can update", done => {

        //persist right away
        const update = joe.update({ name: "Alex"});
        assertName(update, done);
    });

    it("a model class can update", done => {

        const update = User.update({ name: "Joe" }, { name: "Alex"});
        assertName(update, done);
    });

    it("a model class can update one record", done => {

        const update = User.findOneAndUpdate({ name: "Joe" }, { name: "Alex"});
        assertName(update, done);
    });

    it("a model class can find a record with Id and update", done => {
        const update = User.findByIdAndUpdate(joe._id, { name: "Alex"});
        assertName(update, done);
    });

    it("a user can have their postCount incremented by 1", done => {

        //mongo update modifiers - change many records at once
        const update = User.update({ name: "Joe" }, { $inc: { likes: 1} });

        update
            .then(() => User.findOne({ name: "Joe"}))
            .then(user => {
                assert(user.likes === 1);
                done();
            });
    });

});
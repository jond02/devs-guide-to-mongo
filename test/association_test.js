const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blog_post");

describe("Associations", () => {

    let joe, blogPost, comment;

    beforeEach(done => {
        joe = new User({ name: "Joe"});
        blogPost = new BlogPost({ title: "This is a title", content: "More content"})
        comment = new Comment({ content: "Great post"});

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => done());
    });

    it("saves a relation between a user and a blog post", done => {

        User.findOne({ name: "Joe" })
            .populate("blogPosts")
            .then(user => {
                assert(user.blogPosts[0].title === "This is a title");
                done();
            });
    });

    it("saves a full relation graph", done => {

        User.findOne({ name: "Joe" })
            .populate({
                path: "blogPosts",
                populate: {
                    path: "comments",
                    model: "comment",
                    populate: {
                        path: "user",
                        model: "user"
                    }
                }
            })
            .then(user => {

                let [first] = user.blogPosts;

                assert(user.name === "Joe");
                assert(first.title === "This is a title");
                assert(first.comments[0].content === "Great post");
                assert(first.comments[0].user.name === "Joe");
                done();
            });
    });

});


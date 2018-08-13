const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blog_post");

describe("Middleware", () => {

    let joe, blogPost;

    beforeEach(done => {
        joe = new User({ name: "Joe"});
        blogPost = new BlogPost({ title: "This is a title", content: "More content"})

        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save()]).then(() => done());
    });

    it("users clean up dangling blog posts on remove", done => {

        joe.remove()
            .then(() => BlogPost.countDocuments())
            .then(count => {
                assert(count === 0);
                done();
            });

    });
});
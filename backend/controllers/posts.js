const Post = require("../models/post");

exports.createPost = (request, respond, next) => {
    const url = request.protocol + '://' + request.get("host");
    const post = new Post({
        title: request.body.title,
        content: request.body.content,
        imagePath: url + "/images/" + request.file.filename,
        creator: request.userData.userId
    });
    post.save().then(createdPost => {
        respond.status(201).json({
            message: "Post added successfully!",
            post: {
                ...createdPost,
                id: createdPost._id,
            }
        });
    }).catch(error => {
        respond.status(500).json({
            message: "Creating a post failed!"
        })
    });
}

exports.updatePost = (request, respond, next) => {
    let imagePath = request.body.imagePath;
    if(request.file) {
        const url = request.protocol + '://' +request.get("host");
        imagePath = url + "/images/" + request.file.filename
    }
    const post = new Post({
        _id: request.body.id,
        title: request.body.title,
        content: request.body.content,
        imagePath: imagePath,
        creator: request.userData.userId
    });
    Post.updateOne({ _id: request.params.id, creator: request.userData.userId }, post).then(result => {
        if (result.n > 0) {
            respond.status(200).json({ message: "Update successful!" });
        } else {
            respond.status(401).json({ message: "Not authorized! Can't update post" });
        }
    }).catch(error => {
        respond.status(500).json({
            message: "Couldn't update post!"
        })
    });
}

exports.getPosts = (request, respond, next) => {
    const pageSize = +request.query.pagesize;
    const currentPage = +request.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if(pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQuery.then(documents => {
        fetchedPosts = documents;
        return Post.count();  
    })
    .then(count => {
        respond.status(200).json({
            message: "Posts fetched successfully!",
            posts: fetchedPosts,
            maxPosts: count
        });
    }).catch(error => {
        respond.status(500).json({
            message: "Fetching posts failed!"
        })
    });
}

exports.getPost = (request, respond, next) => {
    Post.findById(request.params.id).then(post => {
        if (post) {
            respond.status(200).json(post);
        } else {
            respond.status(404).json({ message: "Post not found!" });
        }
    }).catch(error => {
        respond.status(500).json({
            message: "Fetching post failed!"
        })
    });;
}

exports.delePost = (request, respond, next) => {
    Post.deleteOne({ _id: request.params.id, creator: request.userData.userId }).then(result => {
        if (result.n > 0) {
            respond.status(200).json({ message: "Deletion successful!" });
        } else {
            respond.status(401).json({ message: "Not authorized! Can't delete post." });
        }
    }).catch(error => {
        respond.status(500).json({
            message: "Fetching posts failed during deleting!"
        })
    });
}
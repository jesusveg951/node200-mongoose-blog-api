const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req, res) => {
    Blog
        .find()
        .where('featured').equals(true)
        .then(featured => {
            res.status(200).json(featured);
        })
});

router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

// router.post('/', (req, res) => {
//     const newBlog = new Blog({
//         title: req.body.title,
//         article: req.body.article,
//         published: req.body.published,
//         feature: req.body.feature,
//         author: req.body.author,
//     });
//     newBlog.save()
//     .then(blogs => {
//         res.status(201).send("saved to database");
//     })
//     .catch(err =>{
//         res.status(400).send("cant save to database")
//     });
// });


router.post('/', (req, res) => {
    let dbUser = null;

    User
        .findById(req.body.author)
        .then(user => {
            dbUser = user;

            const newBlog = new Blog(req.body);

            newBlog.author = user._id;

            return newBlog.save();
        })
        .then(blog => {
            dbUser.blogs.push(blog);

            dbUser.save().then(() => res.status(201).json(blog));
        })

});

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id,
            {
            title: req.body.title,
            article: req.body.article,
            published: req.body.published,
            feature: req.body.feature,
            author: req.body.author,
            })
        .then(blogs => {
            res.status(204).send("item updated");
        })
        .catch(err => {
            res.status(400).send("cant update");
        });
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(blogs => {
            if (blogs) {
                res.status(200).json(blogs);
            } else {
                res.status(500)
            }
        });
});

// router.delete('/:id', (req, res) => {
//     Blog
//         .findByIdAndDelete(req.params.id)
//         .then(blog => {
//             if(!blog) return res.status(404).send('no blog found');
//             res.status(200).json(blog);
//         })
//         .catch(err => console.log(err))
// })

module.exports = router;
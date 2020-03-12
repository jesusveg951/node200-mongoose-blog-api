const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req, res) => {
    Blog
    .where({featured: true})
    .then(blogs => res.status(200).json(blogs))
    .catch(err => res.status(500).send(err))
});


router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.post('/', (req, res) => {
    const newBlog = new Blog({
        title: req.body.title,
        article: req.body.article,
        published: req.body.published,
        feature: req.body.feature,
        author: req.body.author,
    });
    newBlog.save()
    .then(blogs => {
        res.status(201).send("saved to database");
    })
    .catch(err =>{
        res.status(400).send("cant save to database")
    });
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

module.exports = router;
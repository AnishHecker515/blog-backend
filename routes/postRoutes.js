const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Create a new blog post
router.post('/posts', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const newPost = await Post.create({ title, content, tags });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Get all blog posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get a single blog post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the post' });
  }
});

// Update a blog post
router.put('/posts/:id', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, tags, updatedAt: new Date() },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete a blog post
// router.delete('/posts/:id', async (req, res) => {
//   try {
//     const post = await Post.findByIdAndDelete(req.params.id);
//     if (!post) return res.status(404).json({ error: 'Post not found' });
//     res.json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete post' });
//   }
// });

// Backend route for deleting a post by ID
router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Post.findByIdAndDelete(id); // Delete post from MongoDB
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete post', error });
    }
  });
  

module.exports = router;
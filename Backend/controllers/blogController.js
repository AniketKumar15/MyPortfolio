import Blog from '../models/Blog.js';

// @desc    Get all published blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' })
      .populate('category', 'name slug')
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all blogs (including drafts) for admin
// @route   GET /api/blogs/admin
// @access  Private/Admin
export const getAdminBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate('category', 'name slug')
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' })
      .populate('category', 'name slug')
      .populate('author', 'name');

    if (blog) {
      // Increment views
      blog.views += 1;
      await blog.save();
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res) => {
  const { title, slug, excerpt, content, featuredImage, category, tags, seoTitle, seoDescription, seoKeywords, status, readingTime } = req.body;

  try {
    const blogExists = await Blog.findOne({ slug });
    if (blogExists) {
      return res.status(400).json({ message: 'Blog with this slug already exists' });
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      author: req.user._id,
      seoTitle,
      seoDescription,
      seoKeywords,
      status,
      readingTime
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res) => {
  const { title, slug, excerpt, content, featuredImage, category, tags, seoTitle, seoDescription, seoKeywords, status, readingTime } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.title = title || blog.title;
      blog.slug = slug || blog.slug;
      blog.excerpt = excerpt || blog.excerpt;
      blog.content = content || blog.content;
      blog.featuredImage = featuredImage || blog.featuredImage;
      blog.category = category || blog.category;
      blog.tags = tags || blog.tags;
      blog.seoTitle = seoTitle || blog.seoTitle;
      blog.seoDescription = seoDescription || blog.seoDescription;
      blog.seoKeywords = seoKeywords || blog.seoKeywords;
      blog.status = status || blog.status;
      blog.readingTime = readingTime || blog.readingTime;

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

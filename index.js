import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

// Initialize app and fix __dirname for ES Modules
const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================
// MIDDLEWARE
// ======================
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(methodOverride('_method')); // Support for PUT and DELETE methods

// ======================
// VIEW ENGINE (EJS)
// ======================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ======================
// IN-MEMORY "DATABASE"
// ======================
let posts = [
  { 
    id: 1, 
    title: "How We Survived Our First Year of Marriage", 
    content: "When we first got married, we had no idea what challenges awaited us...", 
    excerpt: "The first year was particularly difficult because...",
    author: "Anonymous", 
    createdAt: new Date().toLocaleDateString() 
  }
];

// ======================
// ROUTES (UPDATED TO MATCH YOUR TEMPLATES)
// ======================
// Homepage (index.ejs)
app.get('/', (req, res) => {
    res.render('index', {
      title: 'C-Blog - Share Your Relationship Stories',
      featuredPosts: posts.slice(0, 6) // Show first 6 as featured
    });
  });

// Create post form (create.ejs)
app.get('/create', (req, res) => {
  res.render('create', { 
    title: 'Create Post' 
  });
});

// Handle post creation
app.post('/posts', (req, res) => {
    const { title, author, content } = req.body;
    
    const newPost = {
      id: posts.length + 1,
      title,
      content,
      excerpt: content.substring(0, 100) + '...',
      author: author || "Anonymous",
      createdAt: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    
    posts.unshift(newPost); // Add to beginning of array
    res.redirect(`/posts/${newPost.id}?success=true`);
  });
  
  // View all posts
  app.get('/posts', (req, res) => {
    const postId = req.query.newPostId || 1; // Show newest post or default to first
    const postToShow = posts.find(p => p.id === Number(postId)) || posts[0];
    
    res.render('posts', {
      title: 'View Posts',
      post: postToShow, // Pass the specific post to display
      posts: posts,     // Pass all posts (for future listing if needed)
      success: req.query.success
    });
  });
// Handle post update
app.post('/posts/:id/edit', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
      posts[postIndex] = {
        ...posts[postIndex],
        ...req.body,
        updatedAt: new Date().toLocaleDateString()
      };
      return res.redirect(`/posts/${postId}?updated=true`);
    }
    res.status(404).send('Post not found');
  });

// Handle post deletion (DELETE - from posts.ejs)
app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== postId);
  res.sendStatus(200); // Success response for frontend JS
});

// View single post
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    
    res.render('posts', {
      title: 'View Post',
      post: post,
      posts: posts, // All posts for listing
      success: req.query.success === 'true',
      updated: req.query.updated === 'true',
      currentUser: req.user || null // Add if using authentication
    });
  });
// ======================
// ERROR HANDLING
// ======================
// 404 Error Handler
app.use((req, res) => {
    res.status(404).render('404', {
      title: 'Page Not Found | C-Blog'
    });
  });

// ======================
// START SERVER
// ======================
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
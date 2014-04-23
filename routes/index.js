var express = require('express');
var router = express.Router();
var marked = require('marked');
var fs = require('fs');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm:          true,
  tables:       true,
  breaks:       false,
  pedantic:     false,
  sanatize:     true,
  smartLists:   true,
  smartypants:  false
});
var about = fs.readFileSync('content/about-me.md', 'utf8');
var blogs_directory = fs.readdirSync('content/blog');
var blogs = [];
for (var i = 0; i != blogs_directory.length; ++i){
  var blog_raw = fs.readFileSync('content/blog/' + blogs_directory[i], 'utf8');
  var blog = marked(blog_raw);
  blogs.push(blog);
}
blogs = blogs.reverse();

/* GET home page. */
router.get('/', function(req, res) {
  var about_parsed = marked(about);
  res.render('index', { 
    title: 'Jonathan E. Boone',
    description: 'Mobile Software Engineer',
    blogs: blogs,
    about: about_parsed
  });
});
 

module.exports = router;

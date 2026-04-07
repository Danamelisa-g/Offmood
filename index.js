import Post from './Src/components/post.js';
import PostImage from './Src/components/postImage.js';

async function init() {
  const response = await fetch('./Src/postdat.json');
  const posts = await response.json();

  posts.forEach(data => {
    // Si el post tiene imagen → PostImage, si no → Post
    const post = data.image ? new PostImage(data) : new Post(data);
    post.render();
  });
}

init();
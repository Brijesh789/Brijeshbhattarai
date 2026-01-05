fetch('/blogs/blogs.json')
  .then(res => res.json())
  .then(posts => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    // Blog list
    const list = document.getElementById('blog-list');
    if (list) {
      posts.forEach(post => {
        list.innerHTML += `
          <article>
            <h2>${post.title}</h2>
            <p>${post.excerpt}</p>
            <a href="post.html?id=${post.id}">Read more</a>
          </article>
        `;
      });
    }

    // Single blog
    if (postId) {
      const post = posts.find(p => p.id === postId);
      if (post) {
        document.getElementById('title').innerText = post.title;
        document.getElementById('meta').innerText =
          `${post.author} • ${post.date}`;
        document.getElementById('content').innerHTML = post.content;
        document.title = post.title;
      }
    }
  });

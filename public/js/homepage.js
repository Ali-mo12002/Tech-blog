const homepageDiv = document.querySelector('#homepage-div');
if (homepageDiv){
    document.addEventListener('DOMContentLoaded', async () => {
        try {
        const response = await fetch('/api/posts');
        if (response.ok) {
            const allPosts = await response.json();
            const allPostsList = document.getElementById('all-posts-list');
            allPosts.forEach(post => {
            // Create list item for each post
            const listItem = document.createElement('li');
            listItem.classList.add('home-post-item');

            // Create title element
            const link = document.createElement('a');
            link.classList.add('homepage-post-link');
            link.href = `/posts/${post.id}`;
            link.textContent = post.title;

            // Create content element
            const postContent = document.createElement('div');
            postContent.classList.add('post-content');
            postContent.textContent = post.content;

            // Create meta info element
            const postMeta = document.createElement('div');
            postMeta.classList.add('post-meta');
            postMeta.textContent = `by ${post.user.username} on ${new Date(post.createdAt).toLocaleDateString()}`;

            // Append title, content, and meta info to list item
            listItem.appendChild(link);
            listItem.appendChild(postContent);
            listItem.appendChild(postMeta);

            // Append list item to list
            allPostsList.appendChild(listItem);
            });
        } else {
            console.error('Failed to fetch posts');
        }
        } catch (error) {
        console.error('Error fetching posts:', error);
        }
    });
}
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/posts/user'); // Assuming this endpoint retrieves the user's posts
    if (response.ok) {
        const userPosts = await response.json();
        const userPostsList = document.getElementById('user-posts-list');
        userPosts.forEach(post => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `/posts/${post.id}`; // Assuming the post ID is used in the URL
            link.textContent = post.title;
            listItem.appendChild(link);
            userPostsList.appendChild(listItem);
        });
    } else {
        console.error('Failed to fetch user posts');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.getElementById('create-post-form');

    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(createPostForm);
        const title = formData.get('title');
        const content = formData.get('content');

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });

            if (response.ok) {
                console.log('Post created successfully');
                // Optionally, redirect the user to the dashboard or refresh the page
                window.location.href = '/dashboard';
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    });
});

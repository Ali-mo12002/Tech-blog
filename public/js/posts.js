
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/posts/userposts');
    if (response.ok) {
      const userPosts = await response.json();
      const userPostsList = document.getElementById('user-posts-list');
      userPosts.forEach(post => {
        // Create list item for each post
        const listItem = document.createElement('li');
        listItem.classList.add('post-item');

        // Create link for post title
        const link = document.createElement('a');
        link.href = `/posts/${post.id}`;
        link.textContent = post.title;
  // Create a container for the buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  // Create edit button with Font Awesome icon
  const editButton = document.createElement('button');
  editButton.classList.add('edit-button');
  editButton.innerHTML = '<i class="fas fa-edit"></i>'; // Font Awesome edit icon
  editButton.addEventListener('click', (event) => {
    event.preventDefault();
    editPost(post.id);
  });

  // Create delete button with Font Awesome icon
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Font Awesome delete icon
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    deletePost(post.id);
  });

  // Append buttons to the container
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  // Append link and button container to list item
  listItem.appendChild(link);
  listItem.appendChild(buttonContainer);

  // Append list item to list
  userPostsList.appendChild(listItem);
});
} else {
console.error('Failed to fetch user posts');
}
} catch (error) {
console.error('Error fetching user posts:', error);
}
});

// Example edit function
function editPost(postId) {
console.log('Editing post with ID:', postId);
// Implement edit logic
}

// Example delete function
function deletePost(postId) {
console.log('Deleting post with ID:', postId);
// Implement delete logic
}

document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.getElementById('create-post-form');

    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(createPostForm);
        const title = formData.get('post-title'); // Corrected form field name
        const content = formData.get('post-content'); // Corrected form field name

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
                window.location.href = '/dashboard';
            } else {
                console.error('Failed to create post:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    });
});

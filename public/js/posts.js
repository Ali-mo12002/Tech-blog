document.addEventListener('DOMContentLoaded', () => {
  const dashboard = document.getElementById('dashboard-container');

  if (dashboard) {
    fetchUserPosts();
  }

  async function fetchUserPosts() {
    try {
      const response = await fetch('/api/posts/userposts');
      if (response.ok) {
        const userPosts = await response.json();
        const userPostsList = document.getElementById('user-posts-list');
        userPostsList.innerHTML = ''; // Clear existing posts

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
            openEditModal(post);
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
  }

  let postId; // Define postId variable in a higher scope

  // Open the edit modal with the post data
  function openEditModal(post) {
    const modal = document.getElementById('editModal');
    const postTitleInput = document.getElementById('edit-post-title');
    const postContentTextarea = document.getElementById('edit-post-content');
    postId = post.id;
    console.log(postId);
    postTitleInput.value = post.title;
    postContentTextarea.value = post.content;

    modal.style.display = 'block';
  }

  // Close the modal
  const modal = document.getElementById('editModal');
  const closeModalButton = document.getElementsByClassName('close')[0];
  closeModalButton.onclick = function() {
    modal.style.display = 'none';
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  async function deletePost(postId) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Post deleted successfully');
        location.reload();
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  // Handle form submission for editing the post
  const editPostForm = document.getElementById('editPostForm');

  editPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const postTitle = document.getElementById('edit-post-title').value;
    const postContent = document.getElementById('edit-post-content').value;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: postTitle, content: postContent })
      });

      if (response.ok) {
        console.log('Post updated successfully');
        modal.style.display = 'none';
        location.reload();
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  });

  // Handle form submission for creating a post
  const createPostForm = document.getElementById('create-post-form');
  
  createPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

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

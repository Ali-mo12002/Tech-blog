document.addEventListener('DOMContentLoaded', async () => {
    const commentsList = document.getElementById('comments-list');
    const commentForm = document.getElementById('new-comment-form');
    const commentContent = document.getElementById('comment-content');
    const postId = document.getElementById('post-id').textContent;
    // Fetch and display comments
    async function loadComments() {
      try {
        const response = await fetch(`/api/comment/${postId}`);
        if (response.ok) {
          const comments = await response.json();
          console.log(comments);
          commentsList.innerHTML = ''; // Clear any existing comments
          comments.forEach(comment => {
            const commentItem = document.createElement('li');

            const commentText = document.createElement('p')
            commentText.textContent = comment.content;
            commentText.classList.add('commenttext');

            const commentUser = document.createElement('div');
            commentUser.classList.add('commentuser');
            commentUser.textContent = comment.user.username;

            const commentDate = document.createElement('div');
            commentDate.classList.add('commentdate');
            commentDate.textContent = `Created on ${new Date(comment.created_at).toLocaleDateString()}`;

            commentItem.appendChild(commentUser);
            commentItem.appendChild(commentText);
            commentItem.appendChild(commentDate);

            commentsList.appendChild(commentItem);
          });
        } else {
          console.error('Failed to load comments');
        }
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    }
  
    // Load post details
    
    // Handle new comment submission
    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const content = commentContent.value;
      console.log(content);
      try {
        const response = await fetch(`/api/comment/${postId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content })
        });
        if (response.ok) {
          commentContent.value = "" ; // Clear the textarea
          loadComments(); // Reload comments
        } else {
          console.error('Failed to post comment');
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    });
  
    // Initial load
   
    loadComments();
  });
  
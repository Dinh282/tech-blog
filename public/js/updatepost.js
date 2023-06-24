const updatePostHandler = async (event) => {
    event.preventDefault();
  
    const postId = event.target.getAttribute('data-post-id');
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
  
    
    if (title && content) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update the post');
      }
    }
  };
  
  document
    .querySelector('.update-post-form')
    .addEventListener('submit', updatePostHandler);
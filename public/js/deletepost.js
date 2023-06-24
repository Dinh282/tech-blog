const deletePostHandler = async (event) => {
    event.preventDefault();
  
    const postId = event.target.getAttribute('data-post-id');
    console.log("here", postId);
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete the post');
    }
  };
  
  document
    .querySelector('.delete-post-form')
    .addEventListener('submit', deletePostHandler);


const deletePostHandler = async (event) => {
    event.preventDefault();//prevent page from reloading on form submit.
  
    const postId = event.target.getAttribute('data-post-id');
    const response = await fetch(`/api/posts/${postId}`, {//Fetch is used to send request to /api/posts/:id to delete post with the id.
      method: 'DELETE',
    });
  
    if (response.ok) {//If post was deleted successfully, redirect user to dashboard page.
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete the post');
    }
  };
  
  document
    .querySelector('.delete-post-form')
    .addEventListener('submit', deletePostHandler);


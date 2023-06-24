const deletePostHandler = async (event) => {
    event.preventDefault();//prevent page from reloading on form submit.
  
    const postId = event.target.getAttribute('data-post-id');

    const confirmDelete = confirm('Are you sure you want to delete this post?'); //Prompt user to confirm if they wish to delete post

    if (confirmDelete) {//If they select yes, then will we use fetch request to delete the post.
    const response = await fetch(`/api/posts/${postId}`, {//Fetch is used to send request to /api/posts/:id to delete post with the id.
      method: 'DELETE',
    });
  
    if (response.ok) {//If post was deleted successfully, redirect user to dashboard page.
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete the post');
    }
  }
};

  document
    .querySelector('.delete-post-form')
    .addEventListener('submit', deletePostHandler);


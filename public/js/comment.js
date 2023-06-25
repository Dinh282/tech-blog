const redirectCommentHandler = async (event) => {
    event.preventDefault();//prevent page from reloading on form submit.

    const postId = event.target.getAttribute('data-post-id');
    const comment = document.querySelector('#comment-desc').value.trim();
  
    if(!comment){ //alert user to enter text to leave commit when they click sumbit.
      alert("You must provide a comment.")
    }

    if (comment) { //if user provides a comment, then we fetch request with POST method to create new post. 
      const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/comments/${postId}`);
      } else {
        alert('Failed to create the comment');
      }
    }
}
document
.querySelector('.new-comment-form')
.addEventListener('submit', redirectCommentHandler);

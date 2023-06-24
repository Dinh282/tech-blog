const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if(!username || !password){
        alert("You must enter a username and password for your account.")
    }

    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        const responseData = await response.json(); 
        alert(responseData.message);
      }
    }
  };


  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
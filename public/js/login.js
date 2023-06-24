const loginFormHandler = async (event) => {
    event.preventDefault();
  
    //Here we collect values user entered into login form.
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      //If user provides both username and password we send POST request to API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      // If successful, redirect the browser to the dashboard page
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in. Incorrect username or password.');
      }
    }
  };
  
  
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  

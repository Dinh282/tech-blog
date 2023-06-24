const logout = async () => {
    const response = await fetch('/api/users/logout', {//POST request is made to the /api/users/logout endpoint using the Fetch API
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
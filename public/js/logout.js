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


let idleTimer;
const IDLE_TIMEOUT = 5 * 60 * 1000;

function resetIdleTimer() {//if this function is called, it cancels any existing idle timer that may have been previously set.
  clearTimeout(idleTimer);
  idleTimer = setTimeout(logout, IDLE_TIMEOUT); //The logout function(to log the user out) will be called once the duration of IDLE_TIMEOUT reaches 0. 
}

function handleUserActivity() {//if This function is called we reset the ildetimer by calling resetIdleTimer function.
  resetIdleTimer();
}

// Here we attach event listeners to relevant elements or the document. If there are mouse movement or keypress, we call HandlerUserActivity
document.addEventListener('mousemove', handleUserActivity);
document.addEventListener('keypress', handleUserActivity);

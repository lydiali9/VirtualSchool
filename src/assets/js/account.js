function Login() {
  Cookies.set('loggedin', 'true');
  location.reload();
}

function Logout() {
  Cookies.set('loggedin', 'false');
  location.reload();
}

function login() {
    userName = document.getElementById("usernameInput").value;
    localStorage.setItem("Username", userName);
    window.location = "kwitter_room.html";
}
const firebaseConfig = {
    apiKey: "AIzaSyBS425aMLxZ5gvcnye2Eq2-tjCXq1carxM",
    authDomain: "kwitter-671d0.firebaseapp.com",
    databaseURL: "https://kwitter-671d0-default-rtdb.firebaseio.com",
    projectId: "kwitter-671d0",
    storageBucket: "kwitter-671d0.appspot.com",
    messagingSenderId: "327123996594",
    appId: "1:327123996594:web:c770af79f3426290ce1eab"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            roomNames = childKey;
            //Start code
            console.log(roomNames);
            div = document.createElement("div");
            div.id = roomNames;
            div.innerHTML = roomNames;
            div.onclick = goToRoom;
            var hr = document.createElement("hr");
            div.appendChild(hr);
            document.getElementById("output").appendChild(div);
            //End code
        });
    });
}
getData();

function getName() {
    username = localStorage.getItem("Username");
    document.getElementById("username").innerHTML = "Welcome " + username + "!";
}

dbRef = firebase.database().ref("/");

function addRoom() {
    roomName = document.getElementById("roomNameInput").value;
    localStorage.setItem("roomName", roomName);
    dbRef.child(roomName).update({
        purpose: "addingRoom"
    })
    window.location = "kwitterPage.html";
}

function logout() {
    window.location = "index.html";
    localStorage.removeItem("Username");
    localStorage.removeItem("roomName");
}

function goToRoom(e) {
    console.log(e.target.id);
    localStorage.setItem("currentRoom", e.target.id);
    window.location = "kwitterPage.html";
}
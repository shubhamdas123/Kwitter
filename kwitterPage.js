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
//YOUR FIREBASE LINKS

currentRoom = localStorage.getItem("currentRoom");

function getData() {
    firebase.database().ref("/" + currentRoom).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                msgName = message_data['message'];
                userName = message_data['username'];
                msgLikes = message_data['likes'];
                div = document.createElement("div");
                document.getElementById("output").appendChild(div);
                var hr = document.createElement("hr");
                var img = document.createElement("img");
                img.src = "tick.png";
                img.id = "imgTick";
                var lblUsername = document.createElement("h4");
                lblUsername.innerHTML = userName
                lblUsername.appendChild(img);
                div.appendChild(lblUsername);
                var lblMsg = document.createElement("label");
                lblMsg.innerHTML = msgName;
                div.appendChild(lblMsg);
                var br = document.createElement("br");
                div.appendChild(br);
                var imgLike = document.createElement("span");
                imgLike.id = "imgLike";
                imgLike.className = "glyphicon glyphicon-thumbs-up";
                imgLike.innerHTML = " Like : "
                var btnLike = document.createElement("button");
                btnLike.id = firebase_message_id;
                btnLike.value = msgLikes;
                btnLike.innerHTML = "Like";
                btnLike.className = "btn btn-warning";
                lbl = document.createElement("label");
                lbl.innerHTML = msgLikes;
                btnLike.onclick = likeMsg;
                imgLike.appendChild(lbl);
                div.appendChild(br);
                div.appendChild(imgLike);
                div.appendChild(br);
                div.appendChild(btnLike);
                div.appendChild(hr);
                //End code
            }
        });
    });
}
getData();


function logout() {
    window.location = "index.html";
    localStorage.removeItem("Username");
    localStorage.removeItem("roomName");
    localStorage.removeItem("currentRoom");
}

function getName() {
    username = localStorage.getItem("Username");
    console.log(currentRoom);
    console.log(username);
}

function send() {
    userMessage = document.getElementById("messageInput").value;
    dbRef = firebase.database().ref(currentRoom);
    dbRef.push({
        username: username,
        message: userMessage,
        likes: 0
    })
    document.getElementById("messageInput").value = "";
}

function likeMsg(e) {
    messageId = e.target.id;
    likes = e.target.value;
    updatedLike = Number(likes) + 1;
    dbRef = firebase.database().ref(currentRoom).child(messageId);
    dbRef.update({
        likes: updatedLike
    })
    lbl.innerHTML = updatedLike;
}
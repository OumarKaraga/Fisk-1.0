
var databaseRef = new Firebase("https://fisk-1.firebaseio.com/");

"https://fisk-1.firebaseapp.com/"


function collectDataFromNewUser() {

    var username = document.getElementById("usernameRegister").value;
    var password = document.getElementById("passwordRegister").value;
    var email = document.getElementById("emailRegister").value;

    var location = "";
    var preferences = {
    	education: "",
    	sport: "",
    }

    databaseRef.child("users").push(
    	{
    		username:username,
    		password:password,
    		email: email,
    		location:location,
    		preferences: preferences,
    		score : 0,
    	}
    );

    window.location.href  = "mainpage.html";
}


function currentUsers() {
    /*
     var users = new Map();
        databaseRef.child("users").on('child_added', function(snapshot) {
        var stuff = snapshot.val();
        //console.log(stuff);
        users.set(snapshot.key(), stuff);

        });
    return Array.from(users.keys());
    */
    var people = [];
    return  new Promise(function(resolve, reject) {
            //asynchronous code goes here
            databaseRef.child("users").on("value", function(snapshot) {
                   var users = snapshot.val();
                   if (users) {
                    resolve(users);
                   } else {
                    reject("Still retrieving data...")
                   }

                  resolve(snapshot.val());
                  //users.set(snapshot.key(), snapshot.val())
                });

    });

    // promise.then(function(data){
    //     //this.people = data;
    //     console.log(data);
    // })
    //console.log(people);
    // return promise;
}


function userNames(allUsers){
    var usernames = []
    for (var key in allUsers) {
        usernames.push(allUsers[key].username);
    }
    return usernames;

}

function passWords(allUsers){
    var passWords = []
    for (var key in allUsers) {
        passWords.push(allUsers[key].password);
    }
    return passWords;
}


function isAUserAlready(username, password, usernames, passWords) {
    for (var i =0; i<usernames.length; i++) {
        if (passWords[i] == password &&  usernames[i] == username) {
            return true;
        }
    }
    return false;
}


async function loginReturningUser() {
    console.log("logged in!");
    var username = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;

    var allUsers = await currentUsers();
    var usernames = userNames(allUsers);
    var passwords = passWords(allUsers);

    if (isAUserAlready(username, password, usernames, passwords)) {
        window.location.href = "mainpage.html";
    } else {
        window.alert("You've keyed in an incorrect username, password or both, please retry!")
    }
}




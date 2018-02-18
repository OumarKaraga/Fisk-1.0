var databaseRef = new Firebase("https://fisk-1.firebaseio.com/");

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


function getIDs(allUsers) {
    var ids = [];
    for (var key in allUsers){
        ids.push(key)
    }
    return ids;
}

function userNames(allUsers){
    var usernames = []
    for (var key in allUsers) {
        usernames.push(allUsers[key].username);
    }
    return usernames;

}

function eMails(allUsers) {
    var emails = []
    for (var key in allUsers) {
        emails.push(allUsers[key].email);
    }
    return emails;
}


async function myFunction(){


    var userName = document.getElementById("username").value;
    var sports = document.getElementById("sports").value;
    var education = document.getElementById("education").value;

    var allUsers = await currentUsers();
    var ids = getIDs(allUsers);
    var allNames = userNames(allUsers);
    var emails = eMails(allUsers);

    //console.log(allNames);

    for (var i=0; i<allNames.length; i++){
        console.log(allNames[i]);
        console.log(userName);
        if (allNames[i] == userName) {
            //console.log(ids[i]);
            // update user objectm
            databaseRef.child("users").child(ids[i]).set({
                  username: userName,
                  preferences: {
                    sports: sports,
                  education:education,
              },
              location : "",
              email : emails[i],
                  
            });
        }
    }
    console.log("successful update");
     

    if (sports == "" || education == "") {
        alert("Please fill your preferences, so that we could match with your friends!! ");
        return false;
    }
}
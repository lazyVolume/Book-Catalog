var userData = "Email:admin@gmail.com,Username:TheOverseer,Password:admin123,|"

let storagecheck = localStorage.getItem('storedData');
console.log("In storage: " + storagecheck)

if(storagecheck && storagecheck != ""){
    let usersFromStorage = storagecheck;
    userData = usersFromStorage;
    console.log("default and in storage: " + userData)
}
else{
    console.log("There is no stored data")
}

function addUser(userEmail, userName, userPass){
    const newUser = "Email:" + userEmail + ",Username:" + userName + ",Password:" + userPass + ",|";
    let storingData = userData.split("|")

    storingData.push(newUser);
    userData = storingData.join("|");

    localStorage.setItem('storedData', userData);
}

function submitData(event){
    event.preventDefault();

    var uEmail = document.getElementById('email').value.trim();
    var uName = document.getElementById('username').value.trim();
    var uPass = document.getElementById('password').value.trim();

    var emailCheck = false;
    var nameCheck = false;
    var passCheck = false;

    let dataCheck = "Email:" + uEmail + ",Username:" + uName + ",Password";


    //email
    const emailValidation = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if(uEmail == ""){
        document.getElementById("emailError").innerHTML = "Email field is empty. Please try again.<br>";
    }
    else if(!emailValidation.test(uEmail)){
        document.getElementById("emailError").innerHTML = "Invalid Email. Please try again.<br>";
    }
    else{
        let existingMail = duplicateEmailCheck(dataCheck);
        if(existingMail){
            document.getElementById("emailError").innerHTML = "Email already exists. Please try again.<br>";
        }
        else{
            document.getElementById("emailError").innerHTML = "";
            emailCheck = true;
        }
    }

    //username
    if(uName == ""){
        document.getElementById("usernameError").innerHTML = "Username field is empty. Please try again.<br>";
    }
    else{
        let existingName = duplicateNameCheck(dataCheck);
        if(existingName){
            document.getElementById("usernameError").innerHTML = "Username already exists. Please try again.<br>";
        }
        else{
            document.getElementById("usernameError").innerHTML = "";
            nameCheck = true;
        }
    }

    //password
    if(uPass == ""){
        document.getElementById("passwordError").innerHTML = "Password field is empty. Please try again.<br>";
    }
    else if(uPass.length < 8){
        document.getElementById("passwordError").innerHTML = "Password must be greater than 8 characters. Please try again.<br>";
    }
    else{
        document.getElementById("passwordError").innerHTML = "";
        passCheck = true;
    }



    if(emailCheck&&nameCheck&&passCheck){
        addUser(uEmail,uName,uPass);

        window.location.href = "html/home.html";
    }
    else{
        alert("Invalid Credentials");
    }
}

function duplicateEmailCheck(newData){
    var EmailDuplicate = false

    let mail = newData.indexOf("Username")
    let Mail = newData.slice(0,mail)

    let checking = userData.split("|");

    checking.forEach(data =>{
        if(data.toLowerCase().includes(Mail.toLowerCase())){
            EmailDuplicate = true;
        }
    }
    )

    return EmailDuplicate;
}

function duplicateNameCheck(newData){
    var NameDuplicate = false

    let name1 = newData.indexOf("Username")
    let name2 = newData.indexOf("Password")
    let Name = newData.slice(name1, name2)

    let checking = userData.split("|")

    checking.forEach(data =>{
        if(data.toLowerCase().includes(Name.toLowerCase())){
            NameDuplicate = true
        }
    }
    )
    return NameDuplicate;

}




//login
function loginSubmit(event) {
    event.preventDefault();

    var uName = document.getElementById('username').value.trim();
    var uPass = document.getElementById('password').value.trim();

    var dataCheck = "Username:" + uName + ",Password:" + uPass + ","
    let nameFound = false
    let dataMatch = false
    let uNameCheck = false
    let uPassCheck = false

    let name1 = dataCheck.indexOf("Username")
    let name2 = dataCheck.indexOf("Password")
    let Name = dataCheck.slice(name1, name2)

    matchCheck = userData.split("|")

    matchCheck.forEach(data => {
        if(data.toLowerCase().includes(Name.toLowerCase())){
            nameFound = true

            if(nameFound){
                if(data.toLowerCase().includes(dataCheck.toLowerCase())){
                    dataMatch = true
                }
            }
        }
    });
    

    if(uName == ""){
        document.getElementById("usernameError").innerHTML = "Username field is empty. Please try again.<br>";
    }
    else{
        if(!nameFound){
            document.getElementById("usernameError").innerHTML = "Username does not exist. Please try again.<br>";
        }
        else{
            document.getElementById("usernameError").innerHTML = "";
            uNameCheck = true
        }
    }

    if(uPass == ""){
        document.getElementById("passwordError").innerHTML = "Password field is empty. Please try again.<br>";
    }
    else{
        
        if(!dataMatch){
            document.getElementById("passwordError").innerHTML = "Wrong password. Please try again.<br>";
        }
        else{
            document.getElementById("passwordError").innerHTML = "";
            uPassCheck = true
        }
    }

    if(uNameCheck && uPassCheck){
        window.location.href = "home.html"
    }
    

}

document.addEventListener("DOMContentLoaded", function() {
    //signup
    const signBtn = document.getElementById("signBtn");
    if (signBtn) {
        signBtn.addEventListener("click", submitData);
    }
  
    //login
    const logBtn = document.getElementById("logBtn");
    if (logBtn) {
        logBtn.addEventListener("click", loginSubmit);
    }
});
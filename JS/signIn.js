const form = document.querySelector(".login-form")
const formEmail = document.querySelector("#email")
const formPassword = document.querySelector("#input")
const formretypePassword = document.querySelector("#retypeInput")
const formUsername = document.querySelector("#username")

const isRequired = (value) => value === "" ? true : false;
const isBetween = (length,min,max) => length < min || length > max ? true : false;

const showError = (input,message) => {
    const formField = input.parentElement;
    const error = formField.querySelector("small");

    error.innerText = message;
    input.style.borderColor = "Red";
}

const showSuccess = (input) => {
    const formField = input.parentElement;
    const error = formField.querySelector("small");

    error.innerText = "";
    input.style.borderColor = "Green";
}




// Utility functions


// Email validation
const isEmailValid = (email) => {
    const re = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    return re.test(email)
}

const checkEmail = () => {
    let valid = false
    const Text = formEmail.value.trim();
    if (isRequired(Text)){
        console.log(1)
        showError(formEmail,"Email cannot be blank.")
    }
    else if (!isEmailValid(Text)){
        console.log(2)
        showError(formEmail,"Email is not valid.")
    }
    else {
        console.log(3)
        showSuccess(email);
        valid = true;
    }
    return valid;
}

// Password validation
const isPasswordSecure = (value) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(value);
}

const CheckPassword = () => {
    let valid = false;
    const text =formPassword.value.trim();

    if (isRequired(text)){
        showError(formPassword,"Password cannot be blank.")
    }
    else if (!isPasswordSecure(text)){
        showError(formPassword,`Password must contain a Capital, lower, number and special key`)
    }
    else{
        showSuccess(formPassword)
        valid = true;
    }
    return valid;
};

const reCheckPassword = () => {
    let valid = false;
    const retype = formretypePassword.value.trim()
    if(retype != formPassword.value.trim()){
        showError(formretypePassword,"Passwords doesn't Match")
    }
    else {
        showSuccess(formretypePassword)
        valid = true
    }
    return valid;

}


function checkName(){
    let valid = false;
    const max = 25, min = 3;

    const username = formUsername.value.trim();

    if(isRequired(username)){
        showError(formUsername, 'Username cannot be blank!')
    }
    else if(isBetween(username.length, min, max)){
        showError(formUsername, `Username must be between ${min} and ${max}`)
    }
    else if(!validName(username)){
        showError(formUsername, 'Username cannot contain any numbers or special characters')
    }
    else{
        showSuccess(formUsername);
        valid = true;
    }
    return valid
    
}
const validName = (username) => {
    const re = /^[A-Za-z\s]*$/
    return re.test(username)
}

form.addEventListener("submit",function (e) {
    console.log("E")
    e.preventDefault();
    let check1 = checkName()
    let check2 = CheckPassword()
    let check3 = checkEmail()
    let check4 = reCheckPassword()
    let isFormValid = check1 && check2&& check3 &&check4;

    if(isFormValid){
        // resetForm()
        window.location.assign("../HTML/signIn.html")
    }
});

function resetForm(){
    userName.value = ""
    password.value = "" 
    email.value = "" 
}

// instant feedback
const debounce = (fn, delay = 500) => {
    let timeoutId;
     return(...args) => {
        //cancel the previous timer
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        //setup a new timer 
        timeoutId = setTimeout(() => {
            fn.apply(null,args)
        }, delay)
     }
}

form.addEventListener("input", debounce(function(e){
    switch(e.target.id){
        case 'username':
            checkName()
            break;
        case 'email':
            checkEmail()
            break;
        case 'input':
            CheckPassword()
            break;
        case 'retypeInput':
            reCheckPassword()
            break;
        default:
            break;
        
    }
}))
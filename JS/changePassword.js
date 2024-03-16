const form = document.querySelector(".login-form")
const formPassword = document.querySelector("#input")
const formretypePassword = document.querySelector("#retypeInput")

const isRequired = (value) => value === "" ? true: false;

const showError = (input, message) => {
    const formField = input.parentElement;
    const error = formField.querySelector("small")

    error.innerText = message;
    input.style.borderColor = "Red" 
}

const showSuccess = (input) => {
    const formField  = input.parentElement;
    const  error = formField.querySelector("small");

    error.innerText = "";
    input.style.borderColor = "Green";

}

const isPasswordSecure = (value) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    return re.test(value)
}

const CheckPassword = () => {
    let valid = false;
    const text = formPassword.value.trim();

    if(isRequired(text)){
        showError(formPassword, "Password cannot be blank")
    }
    else if (!isPasswordSecure(text)){
        showError(formPassword, "Password must contain a Capital, lower, number and a special character.")
    }
    else {
        showSuccess(formPassword)
        valid = true
    }
    return valid
}

const reCheckPassword = () => {
    let valid = false;
    const retype = formretypePassword.value.trim()

    if(isRequired(retype)){
        showError(formretypePassword, "Password cannot be left blank")
    }
    else if (retype != formPassword.value.trim()){
        showError(formretypePassword, "Passwords doesn't match")
    }
    else{
        showSuccess(formretypePassword)
        valid = true
    }
    return valid;
}

form.addEventListener("submit", function (e){
    console.log("worked");
    e.preventDefault();
    let check1 = CheckPassword();
    let check2 = reCheckPassword();

    let isFormValid = check1 && check2;
    if(isFormValid){
        window.location.assign("../HTML/signIn.html")
    }

});
form.addEventListener("input", debounce(function(e){
    switch(e.target.id){
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

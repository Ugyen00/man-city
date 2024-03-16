const hamburger = document.getElementsByClassName('button')[0]
const navbarLink = document.getElementsByClassName('navbar-link')[0]

hamburger.addEventListener('click', () => {
    navbarLink.classList.toggle('active')
})

const form = document.querySelector(".login-form")
const formEmail = document.querySelector("#email")

const showError = (input, message) => {
    const formField = input.parentElement;
    const error = formField.querySelector("small");
    error.innerText = message;
    input.style.borderColor= "Red"
}
const showSuccess = (input) => {
    const formField = input.parentElement;
    const error = formField.querySelector("small")
    error.innerText = "";
    input.style.borderColor = "Green"
}

const isRequired = (value) => value === "" ? true : false;
    


const isEmailValid = (email) => {
    const re = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    return re.test(email)
}

const checkEmail = () => {
    let valid = false;
    const text = formEmail.value.trim();
    if(isRequired(text)){
        showError(formEmail, "Email cannot be blank")
    }
    else if (!isEmailValid(text)){
        showError(formEmail,"Email is not valid")
    }
    else {
        showSuccess(email)
        valid = true
    }
    return valid
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    if(checkEmail() === true){
        window.location.assign("../HTML/OTP.html")
    }
});
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
        case 'email':
            checkEmail()
            break;
        default:
            break;
        
    }
}))


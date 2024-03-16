const form = document.querySelector(".form")
const formUsername = document.querySelector("#name")
const startDate = document.querySelector("#start-date")
const endDate = document.querySelector("#end-date")
const reason  = document.querySelector("#reason")

const isRequired = (value) => value === "" ? true: false;
const isBetween = (length, min,max) => length < min || length> max ? true : false;

const showError = (input,message) => {
    const formField = input.parentElement;
    const error = formField.querySelector("small")

    error.innerText = message;
    input.style.borderColor = "Red";
}
const showSuccess = (input) =>{
    const formField = input.parentElement;
    const error = formField.querySelector("small")

    error.innerText = "";
    input.style.borderColor = "Green";
}
const validName = (username) => {
    const re = /^[A-Za-z\s]*$/
    return re.test(username)
}

function checkName(){
    let valid = false;
     const max = 25, min =3;
     const username = formUsername.value.trim()

     if(isRequired(username)){
        showError(formUsername, "Name cannot be blank")
     }
     else if (isBetween(username.length, min, max)){
        showError(formUsername, `Username must be between ${min} and ${max} characters`)
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

function checkStartDate(){
    let valid = false;
    const startdate = startDate.value.trim()
    if(isRequired(startdate)){
        showError(startDate, "Start date Cannot be blank")
     }
     else{
        showSuccess(startDate);
        valid = true
     }
     return valid 
     
}

function checkEndDate(){
    let valid = false;
    const enddate = endDate.value.trim()
    if(isRequired(enddate)){
        showError(endDate, "End date Cannot be blank")
     }
     else{
        showSuccess(endDate);
        valid = true
     }
     return valid 
     
}

function reason(){
    let valid = false;
    const Reason = reason.value.trim()
    if(isRequired(Reason)){
        showError(reason, "Reason Cannot be blank")
     }
     else{
        showSuccess(reason);
        valid = true
     }
     return valid 
    
}

function resetForm(){
    username.value = "";
    startDate.value = ""; 
    endDate.value = "";
    reason.value=""
}

form.addEventListener("submit",function (e) {
    console.log("E")
    e.preventDefault();
    let check1 = checkName()
    let check2 = startDate()
    let check3 = endDate()
    let check4 = reason()
    let isFormValid = check1 && check2&& check3 &&check4;

    if(isFormValid){
        resetForm()
        
    }
});
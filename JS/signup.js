const btn = document.getElementById("show-btn");

function showPassword() {
  var password = document.getElementById("input");
  if (password.type === "password") {
    password.type = "text";
    btn.classList.remove("fa-eye-slash");
    btn.classList.add("fa-eye");
  } else {
    password.type = "password";
    btn.classList.remove("fa-eye");
    btn.classList.add("fa-eye-slash");
  }
}

function showRetypePassword() {
  var password = document.getElementById("retypeInput");
  if (password.type === "password") {
    password.type = "text";
    btn.classList.remove("fa-eye-slash");
    btn.classList.add("fa-eye");
  } else {
    password.type = "password";
    btn.classList.remove("fa-eye");
    btn.classList.add("fa-eye-slash");
  }
}

// form validation
const form = document.querySelector(".login-form");
const formEmail = document.querySelector("#email");
const formPassword = document.querySelector("#input");

// Message
const showError = (input, message) => {
  const formField = input.parentElement;
  const error = formField.querySelector("small");
  error.innerText = message;
  input.style.borderColor = "Red";
};

const showSuccess = (input) => {
  const formField = input.parentElement;
  const error = formField.querySelector("small");

  error.innerText = "";
  input.style.borderColor = "Green";
};

// Utility functions
const isRequired = (value) => (value === "" ? true : false);
const isBetween = (length, min, max) =>
  length < min || length > max ? true : false;

// Email validation
const isEmailValid = (email) => {
  const re = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  return re.test(email);
};

const checkEmail = () => {
  let valid = false;
  const Text = formEmail.value.trim();
  if (isRequired(Text)) {
    console.log(1);
    showError(formEmail, "Email cannot be blank.");
  } else if (!isEmailValid(Text)) {
    console.log(2);
    showError(formEmail, "Email is not valid.");
  } else {
    console.log(3);
    showSuccess(email);
    valid = true;
  }
  return valid;
};

// Password validation
const isPasswordSecure = (value) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(value);
};

const CheckPassword = () => {
  let valid = false;
  const text = formPassword.value.trim();

  if (isRequired(text)) {
    showError(formPassword, "Password cannot be blank.");
  } else if (!isPasswordSecure(text)) {
    showError(formPassword, `Invalid pasword`);
  } else {
    showSuccess(formPassword);
    valid = true;
  }
  return valid;
};

form.addEventListener("submit", function (e) {
  console.log("E");
  e.preventDefault();

  // let check1 = checkName()
  let check2 = CheckPassword();
  let check3 = checkEmail();
  let isFormValid = check2 && check3;

  if (isFormValid) {
    // resetForm()
    window.location.assign("../HTML/index.html");
  }
});

function resetForm() {
  username.value = "";
  password.value = "";
  email.value = "";
}

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    //cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    //setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "email":
        checkEmail();
        break;
      case "input":
        CheckPassword();
        break;
      default:
        break;
    }
  })
);

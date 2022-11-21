// selecting html elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Functions
// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// function to get fieldname by input id and make first letter uppercase
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// function to check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`,
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`,
    );
  } else {
    showSuccess(input);
  }
}

// function to check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value === '' || input2.value === '') {
    showError(input1, 'Password is required');
    showError(input2, 'Password is required');
  } else if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  } else {
    showSuccess(input2);
  }
}
// function to clear form fields
function clearForm(inputArr) {
    inputArr.forEach(function (input) {
        input.value = '';
    });
}


// Refactor code
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
    clearForm([username, email, password, password2]);
    
});

/*
form.addEventListener('submit', function (e) {
  e.preventDefault();
  // console.log('submit');
  // check if username is valid
  if (username.value === '') {
    showError(username, 'Username is required');
  } else {
    // add success class
    showSuccess(username);
  }
  // check if email is valid
  if (email.value === '' || !checkEmail(email)) {
      showError(email, 'Email is required');
    } else {
    showSuccess(email);
    // add success class
  }
  // check if password is valid
  if (password.value === '') {
    showError(password, 'Password is required');
  } else {
    // add success class
    showSuccess(password);
  }
  // check if password2 is valid
  if (password2.value === '') {
    showError(password2, 'Password2 is required');
  } else {
    // add success class
    showSuccess(password2);
  }
});
*/

// Selected HTML Elements
const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')


// Show Error
function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

// Show Success
function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

// Email Validity
function isValidEmail(input) {
    // return String(email)
    //     .toLowerCase()
    //     .match(
    //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //     );
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid')
    }

}

// If method for form Validation
// form.addEventListener('submit', function(e) {
//     e.preventDefault()
//     if (username.value === '') {
//         showError(username, 'username is required')
//     } else {
//         showSuccess(username)
//     }
//     if (email.value === '') {
//         showError(email, 'email is required')
//     } else if(!isValidEmail(email.value)) {
//         showError(email, 'email is not valid')
//     } 
//     else {
//         showSuccess(email)
//     }
//     if (password.value === '') {
//         showError(password, 'password is required')
//     } else {
//         showSuccess(password)
//     }
//     if (password2.value === '') {
//         showError(password2, 'password2 is required')
//     } else {
//         showSuccess(password2)
//     }
// })



// Check Required Fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}


// Check Input Length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)        
        return false
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
        return false
    } else {
        showSuccess(input)
        return true
    }
}

// Check Password match
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
}


// Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault()
    checkRequired([username, email, password, password2])
    checkLength(username, 3, 15)
    isValidEmail(email)
    checkPasswordsMatch(password, password2)
    if (checkLength(password, 6, 25) && strongPassword(password)) {
        strongPassword(password)
    }
})

// Get Fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1) ;
}

function strongPassword(input) {
    const firstLetter = input.value[0].toUpperCase()
    // console.log(firstLetter)
    // console.log(input.value)
    if(input.value[0] !== firstLetter) {
        showError(input, 'Password is not strong enough')
        return false
    } else {
        showSuccess(input)
        return true
    }
}
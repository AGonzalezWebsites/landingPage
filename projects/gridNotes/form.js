(function(){console.log("form validation")}());

const name = document.getElementById('name');
const animal = document.getElementById('animal');
const email = document.getElementById('email');
const email2 = document.getElementById('email2');
const password = document.getElementById('password');
const form = document.getElementById('form');
const openForm = document.getElementById('openForm');
const formSkip = document.getElementById('formSkip');
const errorElement = document.getElementById('error');
const userInfoContainer = document.querySelector('.userInfoContainer');
const userInfoContent = document.querySelector('.userInfoContent');

openForm.addEventListener('click', function(){
    console.log("open form");
    document.querySelector('.initialContainer').style.display = 'flex';
    document.querySelector('.initialContainer').style.opacity = '0';
    setTimeout(function(){document.querySelector('.initialContainer').style.opacity = '1';},1)

})

formSkip.addEventListener('submit', function(e){
    e.preventDefault()
    document.querySelector('.initialContainer').style.opacity = '0';
    setTimeout(function(){document.querySelector('.initialContainer').style.display = 'none';}, 500)
})

form.addEventListener('submit', function(e){
    console.log(e.target.parentElement.nextSibling.nextSibling)
    let messages = [];

    var checkSpecial = /[*@!#%&()^~{}]+/.test(password.value),
        checkUpper = /[A-Z]+/.test(password.value),
        checkLower = /[a-z]+/.test(password.value),
        checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
        
        
    if (name.value === '' || name.value == null) {
        messages.push('*Name is required');
    }

    if (email.value !== email2.value) {
        messages.push("*Both emails must match!");
        console.log("did not match");
    } else if (checkEmail == false) {
        messages.push("*Please enter a valid email address");
    }
    
    if (password.value.length <= 6) {
        messages.push("*Password must be longer than 6 characters!");
    } else if (password.value.length >= 18) {
        messages.push("*Password must be less than 18 characters!");
    } else if (password.value === "password" || password.value === "Password") {
        messages.push("*Password can not be 'Password'");
    } else if (checkUpper == false || checkLower == false || checkSpecial == false) {
        messages.push("*Password must contain one special character, an uppercase and a lowercase letter");
    }
    
    
    if (messages.length > 0) {
        errorElement.innerText = messages.join(', ')
        e.preventDefault()
    } else {
        e.preventDefault()
        formsubmitted(name.value, animal.value, email.value, password.value)
    }
    
})


function formsubmitted(name, animal, email, password) {
    console.log(name, animal, email, password)
    var user = document.querySelector('.user');
    //remove sign up button
    document.getElementById('openForm').style.display = 'none';

    document.querySelector('.initialContainer').style.opacity = '0';
    setTimeout(function(){document.querySelector('.initialContainer').style.display = 'none';}, 500)


    //Add user details

    userInfoContainer.style.display = 'flex';
    userInfoContent.innerHTML = "<b>Email:</b> "+ email+"<br><b>Spirit Animal:</b> "+animal+"<br><b>Password:</b> "+ password;
    userInfoContent.style.display = "inline";
    userInfoContent.style.height = "0px";
}

var toggle = "closed";
document.querySelector('.userInfoTitle').addEventListener('click', function(){
    if (toggle === "closed") {
        userInfoContent.style.height = "auto";
        toggle = "open";
        console.log(toggle)
        console.log("opened")
    } else if (toggle === "open") {
        userInfoContent.style.height = "0px";
        toggle = "closed";
        console.log(toggle)
        console.log("closed")
    }
})


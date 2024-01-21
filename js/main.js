var toggle = document.getElementById('accbtn');
var nameInput = document.getElementById('shift');
var acctext = document.getElementsByTagName('p');
var mainbtn = document.getElementById('main');
var Status = document.getElementById('status');
var SignUp = false;
var userList = [];

if (localStorage.getItem('Users')){
   userList = JSON.parse(localStorage.getItem('Users'));
}

var userName = document.getElementById('username');
var userEmail = document.getElementById('useremail');
var userPass = document.getElementById('userpassword');

var namereg = /^[a-zA-Z][a-zA-Z0-9]{2,}$/
var emailreg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
var passreg = /^.{8,}$/

function clearInput() {
   userName.value = "";
   userEmail.value = "";
   userPass.value = "";
   userName.classList.remove('is-valid', 'is-invalid');
   userEmail.classList.remove('is-valid', 'is-invalid');
   userPass.classList.remove('is-valid', 'is-invalid');
}

function toggling() {
   Status.innerHTML = "";
   if (nameInput.style.display == "block") {
      acctext[0].childNodes[0].textContent = "Don't have an account ? ";
      toggle.innerText = "Sign Up";
      mainbtn.innerText = "Login";
      SignUp = false;
      nameInput.style.display = "none";
   } else {
      acctext[0].childNodes[0].textContent = "You have an account ? ";
      toggle.innerText = "Sign In";
      mainbtn.innerText = "Sign Up"
      SignUp = true;
      nameInput.style.display = "block";
   }
   clearInput();
}

function checkEmail(em) {
   for (var i = 0; i < userList.length; ++i) {
      if (userList[i].email == em) {
         emailfeedback.innerHTML = "Email already exsits choose another one !!!";
         return false;
      }
   }
   return true;
}

function valid(input, reg, e) {
   if (SignUp) {
      if (reg.test(e.target.value)) {
         input.classList.remove('is-invalid');
         input.classList.add('is-valid');
         return true;
      } else if (e.target.value == "") {
         input.classList.remove('is-invalid');
         input.classList.remove('is-valid');
         return false;
      }
      else {
         input.classList.remove('is-valid');
         input.classList.add('is-invalid');
         return false;
      }
   } else {
      return false;
   }
}

function Login() {
   for (var i = 0; i < userList.length; ++i) {
      if (userEmail.value == userList[i].email) {
         if (userPass.value == userList[i].password) {
            Status.innerHTML = "User Logged-In Successfully !!!";
            Status.classList.remove('text-danger');
            Status.classList.add('text-success');
            localStorage.setItem('CurrentUser', userList[i].name);
            clearInput();
            setTimeout(function () {
               Status.innerHTML = "";
               window.location.href = "home.html";
            }, 1500)
            return;
         }
      }
   }
   Status.classList.remove('text-success');
   Status.classList.add('text-danger');
   if (userEmail.value == "" || userPass.value == "") {
      Status.innerHTML = "Inputs are empty !!!"
   } else {
      Status.innerHTML = "Incorrect Email or Password !!!"
   }
   setTimeout(function () {
      Status.innerHTML = "";
   }, 2500)
}

toggle.addEventListener('click', toggling);

userName.addEventListener('input', function (e) {
   valid(userName, namereg, e);
})

userEmail.addEventListener('input', function (e) {
   emailfeedback.innerHTML = 'Enter a valid email : "(example@example.com)"';
   if (valid(userEmail, emailreg, e)) {
      if (!checkEmail(e.target.value)) {
         userEmail.classList.add('is-invalid');
         userEmail.classList.remove('is-valid');
      }
   }
})

userPass.addEventListener('input', function (e) {
   valid(userPass, passreg, e);
})

mainbtn.addEventListener('click', function () {
   if (SignUp) {
      if (userName.classList.contains('is-valid') &&
         userEmail.classList.contains('is-valid') &&
         userPass.classList.contains('is-valid')) {
         var user = {
            name: userName.value,
            email: userEmail.value,
            password: userPass.value
         }
         userList.push(user);
         localStorage.setItem('Users', JSON.stringify(userList));
         clearInput();
         Status.innerHTML = "User Registered Successfully !!!";
         Status.classList.remove('text-danger');
         Status.classList.add('text-success');
         setTimeout(function () {
            Status.innerHTML = "";
            toggling();
         }, 1500)
      } else {
         Status.innerHTML = "Check your inputs !!!"
         Status.classList.add('text-danger');
         Status.classList.remove('text-success');
         setTimeout(function () {
            Status.innerHTML = "";
         }, 2500)
      }
   } else {
      Login();
   }

})

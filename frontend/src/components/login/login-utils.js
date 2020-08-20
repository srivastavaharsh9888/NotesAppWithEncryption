export const openRegisterForm = (event) => {
		document.getElementById("register-form").style.display="block";
		document.getElementById("login-form").style.display="none";
		document.getElementById("login-form-link").classList.remove('active');
		event.currentTarget.classList.add('active');
		event.preventDefault();
	}

export const openLoginForm = (event) => {
		document.getElementById("register-form").style.display="none";
		document.getElementById("login-form").style.display="block"; 
		document.getElementById("register-form-link").classList.remove('active');
		event.currentTarget.classList.add('active');
		event.preventDefault();
	}

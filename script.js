const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const formMessage = document.getElementById("formMessage");
const submitButton = form.querySelector(".submit-btn");

document.getElementById("year").textContent = new Date().getFullYear();

togglePassword.addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  togglePassword.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  togglePassword.setAttribute("aria-pressed", String(!showing));
});

function setError(input, message) {
  const error = document.getElementById(`${input.id}Error`);
  const wrapper = input.closest(".input-wrap");
  error.textContent = message;
  wrapper.classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("input", () => {
    setError(input, "");
    formMessage.textContent = "";
    formMessage.classList.remove("error");
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  formMessage.classList.remove("error");

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  let valid = true;

  if (!email) {
    setError(emailInput, "Please enter your email address.");
    valid = false;
  } else if (!isValidEmail(email)) {
    setError(emailInput, "Enter a valid email address.");
    valid = false;
  } else {
    setError(emailInput, "");
  }

  if (!password) {
    setError(passwordInput, "Please enter your password.");
    valid = false;
  } else if (password.length < 8) {
    setError(passwordInput, "Password must be at least 8 characters.");
    valid = false;
  } else {
    setError(passwordInput, "");
  }

  if (!valid) {
    formMessage.textContent = "Please correct the highlighted fields.";
    formMessage.classList.add("error");
    return;
  }

  // Front-end demo only. Send credentials to a secure backend for real authentication.
  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "Checking credentials...";
  window.setTimeout(() => {
    formMessage.textContent = "Form validated. Connect a secure backend to sign in.";
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "Sign in securely";
  }, 650);
});

document.getElementById("forgotLink").addEventListener("click", (event) => {
  event.preventDefault();
  formMessage.classList.remove("error");
  formMessage.textContent = "Password reset should be handled by your authentication backend.";
});

document.getElementById("signupLink").addEventListener("click", (event) => {
  event.preventDefault();
  formMessage.classList.remove("error");
  formMessage.textContent = "Connect this link to your registration page.";
});

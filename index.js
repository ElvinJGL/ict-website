function submitMsg() {
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");


    nameError.innerText = "";
    emailError.innerText = "";
    messageError.innerText = "";


    if (!name) {
        nameError.innerText = "Name is required.";
        isValid = false;
    }
    if (!email) {
        emailError.innerText = "Email is required.";
        isValid = false;
    }

    if (!message) {
        messageError.innerText = "Message is required.";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("form").innerHTML = `
            <h3 class="fw-bold">Message Sent</h3>
            <p>Thank you for reaching out! We will get back to you soon.</p>
        `;
    }
}
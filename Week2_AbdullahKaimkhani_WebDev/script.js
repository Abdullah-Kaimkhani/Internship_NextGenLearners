// Contact form validation
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const msg = document.getElementById("formMsg");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent form submission

            // Simple validation
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if ( !name || !email || !message) {
                msg.textContent = "Please fill in all fields.";
                msg.style.color = "red";
                return;
            }

            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(email)) {
                msg.textContent = "Please enter a valid email address.";
                msg.style.color = "red";
                return;
            }

            if (message.length < 20) {
                msg.textContent = "Message must be at least 20 characters long.";
                msg.style.color = "red";
                return;
            }

            msg.style.color = "green";
            msg.textContent = "Form submitted successfully!";
            form.reset(); // Reset the form after successful submission
        });
    }

    // FAQ toggle
    const questions = document.querySelectorAll(".question");

    questions.forEach(q => {
        q.addEventListener("click", () => {
           const answer = q.nextElementSibling;
           answer.style.display = answer.style.display === "block" ? "none" : "block";
        });
    });
});

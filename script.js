// PASTE YOUR NEW DEPLOYMENT URL HERE
const API_URL = "https://script.google.com/macros/s/AKfycbxZYZ7MY95IxdMfCNCl0r0V96un4VAWps24RIxrmMNhKj8ynYfK9MubW_kdNTWVB0oYfA/exec";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookingForm");
    const submitButton = form.querySelector('button[type="submit"]');
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        const booking = {
            name: document.getElementById("name").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            service: document.getElementById("service").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value
        };
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(booking),
                headers: { "Content-Type": "application/json" }
            });
            const result = await response.json();
            if (result.status === "success") {
                alert("Booking confirmed!");
                form.reset();
            } else {
                alert("Error: " + result.message);
            }
        } catch (err) {
            alert("Network Error: " + err.message);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
});
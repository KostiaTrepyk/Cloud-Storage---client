document.addEventListener("DOMContentLoaded", () => {
    const msg = document.getElementById("msg");
    
    setTimeout(() => {
        msg.innerHTML = "Oops! Something went wrong.";
    });
});

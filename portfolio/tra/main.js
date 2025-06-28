var typed= new Typed(".text", {
    strings: ["Fontend Developer", "Backend Developer", "Web Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


//hobbies
document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".toggle-btn");

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".hobby-card");
      const extraContent = card.querySelector(".extra-content");

      if (extraContent) {
        extraContent.classList.toggle("active");
        btn.textContent = extraContent.classList.contains("active") ? "Show less" : "View details";
      }
    });
  });
});



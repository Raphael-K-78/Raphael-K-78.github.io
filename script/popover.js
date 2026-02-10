// popover.js
function initPopover() {
    const popovers = document.querySelectorAll(".popover-overlay");

    popovers.forEach(popover => {
        const openBtns = document.querySelectorAll("[data-popover-open]");
        const closeBtn = popover.querySelector("[data-popover-close]");

        openBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                popover.style.display = "flex";
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                popover.style.display = "none";
            });
        }

        popover.addEventListener("click", (e) => {
            if (e.target === popover) popover.style.display = "none";
        });
    });
}

// On l’exécute directement
initPopover();

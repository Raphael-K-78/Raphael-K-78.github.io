// slider.js
export function initSlider() {
    const sliders = document.querySelectorAll("[data-slider]");

    sliders.forEach(slider => {
        const slides = slider.querySelector(".slides");
        const total = slides.children.length;
        let index = 0;

        const update = () => {
            slides.style.transform = `translateX(-${index * 100}%)`;
        };

        const prevBtn = slider.querySelector("[data-prev]");
        const nextBtn = slider.querySelector("[data-next]");

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                index = (index + 1) % total;
                update();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                index = (index - 1 + total) % total;
                update();
            });
        }
    });
}

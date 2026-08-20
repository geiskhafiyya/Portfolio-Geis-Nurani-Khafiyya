const scrolUp = document.querySelector
(".scroll-up");

window.onscroll = () => {
    if (window.scrollY > 500) {
        scrolUp.classList.add
        ("scroll-active");
    } else {
        scrolUp.classList.remove
        ("scroll-active")

    }
};

/* Generic Slider (used by Infographic slider & Graphic Design slider) */
function initSlider(trackId, prevId, nextId, dotsId, dotLabelPrefix) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const dotsWrap = document.getElementById(dotsId);

    if (!track) return;

    const slides = track.querySelectorAll(".slide");
    let current = 0;

    function goTo(index) {
        const total = slides.length;
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        updateDots();
    }

    function updateDots() {
        if (!dotsWrap) return;
        dotsWrap.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === current);
        });
    }

    if (slides.length > 0 && dotsWrap) {
        slides.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.setAttribute("aria-label", `${dotLabelPrefix} ${i + 1}`);
            dot.addEventListener("click", () => goTo(i));
            dotsWrap.appendChild(dot);
        });
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));
}

initSlider("infographicTrack", "infographicPrev", "infographicNext", "infographicDots", "Ke infografis");
initSlider("graphicTrack", "graphicPrev", "graphicNext", "graphicDots", "Ke event");
initSlider("dashboardTrack", "dashboardPrev", "dashboardNext", "dashboardDots", "Ke dashboard");
initSlider("videoTrack", "videoPrev", "videoNext", "videoDots", "Ke video");
initSlider("websiteTrack", "websitePrev", "websiteNext", "websiteDots", "Ke website");

/* Single Image Modal (Infographic Modal, reused for enlarging gallery images too) */
const infographicModal = document.getElementById("infographicModal");
const infographicModalImg = document.getElementById("infographicModalImg");
const infographicModalTitle = document.getElementById("infographicModalTitle");
const infographicModalText = document.getElementById("infographicModalText");
const infographicModalClose = document.getElementById("infographicModalClose");

function openImageModal(img, title, desc) {
    infographicModalImg.src = img;
    infographicModalImg.alt = title;
    infographicModalTitle.textContent = title;
    infographicModalText.textContent = desc || "";
    infographicModal.classList.add("modal-active");
}

document.querySelectorAll(".infographic-item").forEach((btn) => {
    btn.addEventListener("click", () => {
        openImageModal(btn.dataset.img, btn.dataset.title, btn.dataset.desc);
    });
});

function closeInfographicModal() {
    if (infographicModal) infographicModal.classList.remove("modal-active");
}

if (infographicModalClose) {
    infographicModalClose.addEventListener("click", closeInfographicModal);
}

if (infographicModal) {
    infographicModal.addEventListener("click", (e) => {
        if (e.target === infographicModal) closeInfographicModal();
    });
}

/* Gallery Modal (View All per event) */
const galleryModal = document.getElementById("galleryModal");
const galleryModalTitle = document.getElementById("galleryModalTitle");
const galleryModalGrid = document.getElementById("galleryModalGrid");
const galleryModalClose = document.getElementById("galleryModalClose");

document.querySelectorAll(".view-all-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const eventTitle = btn.dataset.event;
        const gallery = galleryData[eventTitle] || [];

        if (gallery.length === 0) {
            console.warn("Gak ada data galeri untuk event:", eventTitle);
        }

        galleryModalTitle.textContent = eventTitle;
        galleryModalGrid.innerHTML = "";

        gallery.forEach((item) => {
            const thumb = document.createElement("button");
            thumb.classList.add("gallery-thumb");

            const img = document.createElement("img");
            img.src = item.img;
            img.alt = item.title;

            thumb.appendChild(img);
            thumb.addEventListener("click", () => {
                openImageModal(item.img, item.title, "");
            });

            galleryModalGrid.appendChild(thumb);
        });

        galleryModal.classList.add("modal-active");
    });
});

function closeGalleryModal() {
    if (galleryModal) galleryModal.classList.remove("modal-active");
}

if (galleryModalClose) {
    galleryModalClose.addEventListener("click", closeGalleryModal);
}

if (galleryModal) {
    galleryModal.addEventListener("click", (e) => {
        if (e.target === galleryModal) closeGalleryModal();
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeInfographicModal();
        closeGalleryModal();
    }
});
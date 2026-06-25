document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("addCompanyModal");
    const form = document.getElementById("addCompanyForm");

    const showToast = (message, type = "success") => {
        const toast = document.createElement("div");
        toast.className = `admin-toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        window.setTimeout(() => {
            toast.classList.add("hide");
            window.setTimeout(() => toast.remove(), 220);
        }, 2400);
    };

    const openModal = () => {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.getElementById("companyName").focus();
    };

    const closeModal = () => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        form.reset();
    };

    document.querySelectorAll("[data-route]").forEach((button) => {
        button.addEventListener("click", () => {
            window.location.href = button.dataset.route;
        });
    });

    document.querySelectorAll("[data-action]").forEach((button) => {
        button.addEventListener("click", () => {
            const action = button.dataset.action;

            if (action === "open-company-modal") {
                openModal();
            }

            if (action === "close-company-modal") {
                closeModal();
            }

            if (action === "refresh-activity") {
                showToast("Recent activity refreshed");
                button.textContent = "Updated";
                window.setTimeout(() => {
                    button.textContent = "Refresh";
                }, 1300);
            }
        });
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const companyName = document.getElementById("companyName").value.trim();
        closeModal();
        showToast(`${companyName} added successfully`);
    });
});

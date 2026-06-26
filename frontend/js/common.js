// Sidebar Toggle

function toggleSidebar() {

    const sidebar =
    document.querySelector(".sidebar");

    sidebar.classList.toggle("hidden");

}

// Modal

function openModal(id){

    document
    .getElementById(id)
    .style.display = "flex";

}

function closeModal(id){

    document
    .getElementById(id)
    .style.display = "none";

}

// Toast Notification

function showToast(message){

    const toast =
    document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    },3000);

}

// Dark Mode

function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

}
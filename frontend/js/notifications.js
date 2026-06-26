// Notification Store

let notifications = [

    {
        id:1,
        title:"New Application Received",
        message:"A candidate applied for Frontend Developer.",
        read:false
    },

    {
        id:2,
        title:"Interview Scheduled",
        message:"Interview scheduled for tomorrow.",
        read:false
    }

];

// Load Notifications

function loadNotifications(){

    const container =
    document.getElementById("notificationList");

    if(!container) return;

    container.innerHTML = "";

    notifications.forEach(notification => {

        container.innerHTML += `

        <div class="notification-card">

            <h4>${notification.title}</h4>

            <p>${notification.message}</p>

            <button
            onclick="markAsRead(${notification.id})">
            Mark as Read
            </button>

        </div>

        `;

    });

}

// Mark As Read

function markAsRead(id){

    notifications =
    notifications.map(notification => {

        if(notification.id === id){

            notification.read = true;

        }

        return notification;

    });

    loadNotifications();

}

// Clear Notifications

function clearNotifications(){

    notifications = [];

    loadNotifications();

}

// Notification Counter

function getUnreadCount(){

    return notifications.filter(
        notification => !notification.read
    ).length;

}
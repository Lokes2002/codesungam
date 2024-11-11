import React, { useState, useEffect } from 'react';
import './notification.css'; 

// Sample initial notifications data
const initialNotifications = [
    { id: 1, message: "You have a new message from Tarun.", time: "6 min ago" },
    { id: 2, message: "Your event starts in 1 hour.", time: "15 min ago" },
    { id: 3, message: "You have 3 new followers.", time: "30 min ago" },
    { id: 4, message: "Your profile has been updated.", time: "1 hour ago" },
    { id: 5, message: "Reminder: Submit your assignment by tomorrow.", time: "2 hours ago" },
];

function Notification() {
    // State to hold notifications data
    const [notifications, setNotifications] = useState(initialNotifications);
    
    // Simulating an event that triggers new notifications (could be an API call or socket event)
    useEffect(() => {
        // Simulate a new message after 10 seconds (for example, a user receives a new message)
        const timer = setTimeout(() => {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                {
                    id: prevNotifications.length + 1,
                    message: "You have a new message from Amit.",
                    time: "Just now"
                }
            ]);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const handleFollowNotification = () => {
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            {
                id: prevNotifications.length + 1,
                message: "You have a new follower: John Doe.",
                time: "Just now"
            }
        ]);
    };

    const handleUnfollowNotification = () => {
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            {
                id: prevNotifications.length + 1,
                message: "Jane has unfollowed you.",
                time: "Just now"
            }
        ]);
    };

    const handleMessageNotification = () => {
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            {
                id: prevNotifications.length + 1,
                message: "You received a new message from Sarah.",
                time: "Just now"
            }
        ]);
    };

    return (
        <div className="notification-container">
            <h2>Notifications</h2>
            <div className="notification-box">
                {notifications.map((notification) => (
                    <div className="notification-card" key={notification.id}>
                        <p className="notification-message">{notification.message}</p>
                        <div className="notification-footer">
                            <span className="notification-time">{notification.time}</span>
                            <button className="open-button">Open</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="action-buttons">
                <button onClick={handleFollowNotification}>Simulate Follow</button>
                <button onClick={handleUnfollowNotification}>Simulate Unfollow</button>
                <button onClick={handleMessageNotification}>Simulate Message</button>
            </div>
        </div>
    );
}

export default Notification;

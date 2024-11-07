import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // CSS file for styling
import CollegeCarousel from '../BootStrap/BootStrap';
import { Navbar } from 'react-bootstrap';

function Home() {
    const [classes, setClasses] = useState([]);
    const [news, setNews] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/classes');
                setClasses(response.data);
            } catch (error) {
                console.error("Error fetching classes", error);
            }
        };

        const fetchNewsAndActivities = async () => {
            try {
                const newsResponse = await axios.get('http://localhost:5000/api/news'); // Update with your API endpoint
                const activitiesResponse = await axios.get('http://localhost:5000/api/activities'); // Update with your API endpoint
                setNews(newsResponse.data);
                setActivities(activitiesResponse.data);
            } catch (error) {
                console.error("Error fetching news or activities", error);
            }
        };

        fetchClasses();
        fetchNewsAndActivities();
    }, []);

    return (
        <div>
            <Navbar/> {/* Navbar at the top */}
            <div className="carousel-container">
                <CollegeCarousel /> {/* Centered Carousel */}
            </div>

            <div className="feature-container">
                <div className="feature-box">
                    <h3>Featured Events</h3>
                    <p>Important events, seminars, and workshops to keep track of.</p>
                </div>
                <div className="feature-box">
                    <h3>Announcements</h3>
                    <p>Latest announcements and notifications relevant to students.</p>
                </div>
                <div className="feature-box">
                    <h3>Student Resources</h3>
                    <p>Library information, department contact details, and course materials.</p>
                </div>
                <div className="feature-box">
                    <h3>News and Updates</h3>
                    <p>Articles and blog posts related to college activities.</p>
                </div>
                <div className="feature-box">
                    <h3>Clubs and Organizations</h3>
                    <p>List of clubs and organizations with events and activities.</p>
                </div>
                <div className="feature-box">
                    <h3>Upcoming Activities</h3>
                    <p>Details of upcoming sports events and cultural programs.</p>
                </div>
            </div>

            <div className="section">
                <h3>Classes</h3>
                <ul>
                    {classes.map(classItem => (
                        <li key={classItem.id}>{classItem.subject} - {classItem.schedule}</li>
                    ))}
                </ul>
            </div>

            <div className="map-section">
                <h3>Campus Map</h3>
                <div className="map-container">
                    <input type="text" placeholder="Search Location" className="search-input" />
                    <iframe
                        title="Campus Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.4951285588504!2d144.9560543156867!3d-37.81520627975187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f55ab45%3A0x50d0d2082fd2c0a4!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1612498789000!5m2!1sen!2sau"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
              {/* Contact and Social Media Section */}
              <footer className="footer-section">
                <div className="contact-info">
                    <h3>Contact Us</h3>
                    <p>Email: info@college.edu</p>
                    <p>Phone: +123-456-7890</p>
                    <p>Address: 123 College St, City, State, Zip</p>
                </div>
                <div className="social-media">
                    <h3>Follow Us</h3>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </footer>
        </div>
    );
}

export default Home;

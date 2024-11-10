import React, { useState } from 'react';
import './Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../Images/img1.jpg';
import img2 from '../Images/img2.jpg';
import img3 from '../Images/img3.jpg';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

function Home() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    // Handle form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form Submitted');
    };

    return (
        <div className="home-container">

            {/* Slider Section */}
            <div className="slider-container">
                <h2 className="slider-title">Welcome to Campus-Tracker</h2>
                <Slider {...sliderSettings}>
                    <div>
                        <img src={img1} alt="Campus 1" className="slider-image" />
                    </div>
                    <div>
                        <img src={img2} alt="Campus 2" className="slider-image" />
                    </div>
                    <div>
                        <img src={img3} alt="Campus 3" className="slider-image" />
                    </div>
                </Slider>
            </div>

            {/* Feature Section */}
            <div className="feature-container">
                {[{
                    title: 'Featured Events', description: 'Important events, seminars, and workshops to keep track of.'
                }, {
                    title: 'Announcements', description: 'Latest announcements and notifications relevant to students.'
                }, {
                    title: 'Student Resources', description: 'Library information, department contact details, and course materials.'
                }, {
                    title: 'News and Updates', description: 'Articles and blog posts related to college activities.'
                }, {
                    title: 'Clubs and Organizations', description: 'List of clubs and organizations with events and activities.'
                }, {
                    title: 'Upcoming Activities', description: 'Details of upcoming sports events and cultural programs.'
                }].map((feature, index) => (
                    <div key={index} className="feature-box">
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* Contact and Map Section */}
            <div className="contact-map-section">
                <div className="contact-form">
                    <h3>Contact Us</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="map-container">
                    <iframe
                        title="Campus Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.4951285588504!2d144.9560543156867!3d-37.81520627975187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f55ab45%3A0x50d0d2082fd2c0a4!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1612498789000!5m2!1sen!2sau"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="footer-section">
                <div className="contact-info">
                    <h3>Contact Us</h3>
                    <p>Email: info@college.edu</p>
                    <p>Phone: +123-456-7890</p>
                    <p>Address: 123 College St, City, State, Zip</p>
                </div>
                <div className="social-media">
                    <h3>Follow Us</h3>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={20} /> Facebook
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={20} /> Twitter
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={20} /> Instagram
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <FaYoutube size={20} /> YouTube
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Home;

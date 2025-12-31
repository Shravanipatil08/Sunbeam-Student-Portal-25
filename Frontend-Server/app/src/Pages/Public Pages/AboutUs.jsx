import React from 'react'
import Navbar from '../../Components/Navbar'

function AboutUs() {
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">About Us</h2>

                <div className="card p-4 shadow-sm">
                    <p>
                        We are a technology-driven learning platform designed to support
                        students throughout their learning journey. Our platform focuses on
                        providing structured, practical, and industry-oriented education
                        that helps students build real-world technical skills.
                    </p>

                    <h5 className="mt-4">Student Portal</h5>
                    <p>
                        This application functions as a <strong>Student Portal</strong>,
                        allowing students to securely log in, view their enrolled courses,
                        access learning videos, and manage their academic activities from a
                        single platform. The portal is built to ensure simplicity, security,
                        and ease of use.
                    </p>

                    <h5 className="mt-4">What We Offer</h5>
                    <p>
                        We offer well-structured courses in modern technologies such as Web
                        Development, Artificial Intelligence, Machine Learning, and Full
                        Stack Development. Each course includes video-based learning and
                        practical content to enhance understanding.
                    </p>

                    <h5 className="mt-4">Our Mission</h5>
                    <p>
                        Our mission is to make quality technical education accessible,
                        practical, and affordable while preparing students for real-world
                        challenges in the technology industry.
                    </p>

                    <h5 className="mt-4">Why Choose This Platform</h5>
                    <p>
                        With a student-centric approach, secure authentication, and
                        structured course management, this portal provides a reliable and
                        efficient learning environment for continuous growth.
                    </p>
                </div>
            </div>
        </div>
  )
}

export default AboutUs

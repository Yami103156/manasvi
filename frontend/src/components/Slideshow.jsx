// src/components/Slideshow.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import "./Slideshow.css"; // make sure this file exists

const slides = [
  {
    img: slide1,
    heading: "Pause. Breathe. Reflect.",
    text: "Moments of mindfulness at your fingertips.",
  },
  {
    img: slide2,
    heading: "Safe Spaces",
    text: "Talk without judgment. Heal with grace.",
  },
  {
    img: slide3,
    heading: "Gentle Growth",
    text: "Your journey to inner peace begins here.",
  },
];

const Slideshow = () => {
  return (
    <div className="slideshow-wrapper">
      <Carousel fade indicators={true} controls={true} interval={4000}>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img className="slide-img" src={slide.img} alt={`Slide ${index + 1}`} />
            <motion.div
              className="caption-box-below"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>{slide.heading}</h3>
              <p>{slide.text}</p>
            </motion.div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slideshow;

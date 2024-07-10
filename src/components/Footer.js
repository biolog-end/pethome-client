import React, { useEffect } from 'react';
import logo from './Assets/Img/logo.png';
import './Footer.css';

const Footer = () => {
  useEffect(() => {
    const basementDogGallery = document.getElementById('basementDogGallery');
    
    if (!basementDogGallery) {
      console.error('Dog gallery element not found');
      return;
    }
    
    const basementDogImages = [
      { src: "https://place.dog/300/200", alt: "Cute dog", width: 150, height: 100, top: 20, left: 5 },
      { src: "https://place.dog/400/300", alt: "Playful dog", width: 200, height: 150, top: 150, left: 30 },
      { src: "https://place.dog/250/250", alt: "Happy dog", width: 125, height: 125, top: 100, left: 60 },
      { src: "https://place.dog/350/200", alt: "Sleepy dog", width: 175, height: 100, top: 220, left: 75 },
      { src: "https://place.dog/200/300", alt: "Curious dog", width: 100, height: 150, top: 30, left: 45 },
      { src: "https://place.dog/320/240", alt: "Excited dog", width: 160, height: 120, top: 180, left: 15 },
      { src: "https://place.dog/280/220", alt: "Lazy dog", width: 140, height: 110, top: 70, left: 85 },
      { src: "https://place.dog/360/280", alt: "Friendly dog", width: 180, height: 140, top: 10, left: 5 }
    ];

    basementDogImages.forEach(dog => {
      const img = document.createElement('img');
      img.src = dog.src;
      img.alt = dog.alt;
      img.className = 'basement-dog-image';
      img.style.width = `${dog.width}px`;
      img.style.height = `${dog.height}px`;
      img.style.top = `${dog.top}px`;
      img.style.left = `${dog.left}%`;
      basementDogGallery.appendChild(img);
    });

    function basementHandleMouseMove(e) {
      const { left, top, width, height } = basementDogGallery.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;

      basementDogGallery.querySelectorAll('.basement-dog-image').forEach((img) => {
        const imgRect = img.getBoundingClientRect();
        const imgCenterX = imgRect.left + imgRect.width / 2 - left;
        const imgCenterY = imgRect.top + imgRect.height / 2 - top;

        const deltaX = (mouseX - imgCenterX) / width;
        const deltaY = (mouseY - imgCenterY) / height;

        const moveX = deltaX * 30;
        const moveY = deltaY * 30;

        const rotateZ = (deltaX * deltaY) * 15;

        const scale = 1 + Math.abs(deltaX * deltaY) * 0.1;

        img.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotateZ}deg) scale(${scale})`;
        img.style.transition = 'transform 0.2s ease-out';
      });
    }

    function basementHandleMouseLeave() {
      basementDogGallery.querySelectorAll('.basement-dog-image').forEach((img) => {
        img.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
        img.style.transition = 'transform 0.5s ease-out';
      });
    }

    basementDogGallery.addEventListener('mousemove', basementHandleMouseMove);
    basementDogGallery.addEventListener('mouseleave', basementHandleMouseLeave);

  }, []);

  return (
    <div className="basementBlock">
      <div className="basement-dog-gallery" id="basementDogGallery">
        {/* Dog images will be dynamically inserted here by JavaScript */}
      </div>
      
      <footer className="basement-footer">
        <div className="basement-footer-content">
          <div className="basement-footer-left">
            <div className="basement-footer-logo">
              <img src={logo} alt="PetHome Logo" className="basement-logo-image" />
              PetHome
            </div>
          </div>
          <div className="basement-footer-right">
            <nav className="basement-footer-links">
              <a href="#services" className="basement-footer-link">Services</a>
              <a href="#pet-care" className="basement-footer-link">Pet Care</a>
              <a href="#about" className="basement-footer-link">About Us</a>
              <a href="#contacts" className="basement-footer-link">Contact</a>
              <a href="#adoption" className="basement-footer-link">Adoption</a>
              <a href="#shop" className="basement-footer-link">Pet Shop</a>
              <a href="#faq" className="basement-footer-link">FAQ</a>
              <a href="#blog" className="basement-footer-link">Blog</a>
              <a href="#terms" className="basement-footer-link">Terms</a>
              <a href="#privacy" className="basement-footer-link">Privacy</a>
            </nav>
          </div>
        </div>
        <div className="basement-footer-bottom">
          © 2023 PetHome. All rights reserved. <span className="basement-underline-hover">Your pet's happy place!</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

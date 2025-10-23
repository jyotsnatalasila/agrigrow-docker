import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { useLocationContext } from "./LocationProvider";
import "leaflet/dist/leaflet.css"; 
import {
  FaSearch,
  FaChevronLeft, 
  FaChevronRight,
  FaHome,
  FaBars
} from "react-icons/fa";

const carouselSlides = [
  { id: 1, image: process.env.PUBLIC_URL +"/Images/Slide4.png", alt: "Fresh Vegetables" },
  { id: 2, image: process.env.PUBLIC_URL +"/Images/Slide5.png", alt: "Agricultural Field" },
  { id: 3, image: process.env.PUBLIC_URL +"/Images/Slide1.png", alt: "Fresh Fruits" },
  { id: 4, image: process.env.PUBLIC_URL +"/Images/Slide2.png", alt: "Farming Equipment" },
  { id: 5, image: process.env.PUBLIC_URL +"/Images/Slide3.png", alt: "Seeds and Planting" },
];

const SCROLL_PRODUCTS = [
  { img: process.env.PUBLIC_URL +"/Images/guava.jpg", alt: "Guava", link: "#/product/406" },
  { img: process.env.PUBLIC_URL +"/Images/pinkrose.jpg", alt: "Pink Rose", link: "#/product/507" },
  { img: process.env.PUBLIC_URL +"/Images/kiwi.jpg", alt: "Kiwi", link: "#/product/407" },
  { img: process.env.PUBLIC_URL +"/Images/potato.jpeg", alt: "Potatoes", link: "#/product/214" },
  { img: process.env.PUBLIC_URL +"/Images/cashew.webp", alt: "Cashews", link: "#/product/408" },
  { img: process.env.PUBLIC_URL +"/Images/grapes.jpg", alt: "Grapes", link: "#/product/409" },
  { img: process.env.PUBLIC_URL +"/Images/pista.webp", alt: "Pistachios", link: "#/product/1110" },
  { img: process.env.PUBLIC_URL +"/Images/blueberries.webp", alt: "Blueberries", link: "#/product/410" },
  { img: process.env.PUBLIC_URL +"/Images/almond.webp", alt: "Almonds", link: "#/product/1111" },
  { img: process.env.PUBLIC_URL +"/Images/blackberries.jpg", alt: "Blackberries", link: "#/product/411" },
  { img: process.env.PUBLIC_URL +"/Images/strawberry.jpg", alt: "Strawberries", link: "#/product/405" },
];

function ReactCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const slidesContainerRef = useRef(null); // ADDED: ref for slides container

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 60000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  return (
    <>
      <style>{`
        .carousel-container {
          position: relative;
          width: 100%; /* CHANGED: from 98% to 100% to fill available space */
          max-width: 1800px;
          height: 600px;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          margin: 0 auto;
        }

        .carousel-slides {
          display: flex;
          transition: transform 0.9s ease-in-out;
          height: 100%;
          width: 100%; /* ADDED: ensure full width */
        }

        .carousel-slide {
          min-width: 100%;
          height: 100%;
          position: relative;
          flex-shrink: 0; /* ADDED: prevent slides from shrinking */
        }

        .carousel-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 14px;
          z-index: 10;
        }

        .carousel-indicator {
          width: 24px;
          height: 5px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.4);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 4px rgba(0,0,0,0.2);
        }

        .carousel-indicator:hover {
          background: rgba(255, 255, 255, 0.7);
          transform: scale(1.1);
        }

        .carousel-indicator.active {
          background: #fff;
          transform: scale(1.3);
          box-shadow: 0 0 6px rgba(0,0,0,0.3);
        }

        .carousel-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 15px;
          cursor: pointer;
          font-size: 30px;
          font-weight: bold;
          transition: background 0.3s ease;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          z-index: 10;
        }

        .carousel-control:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        .carousel-control.prev {
          left: 20px;
        }

        .carousel-control.next {
          right: 20px;
        }

        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%);
          pointer-events: none;
        }
      `}</style>
      <div className="carousel-container">
        <div
          ref={slidesContainerRef} // ADDED: ref for the slides container
          className="carousel-slides"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselSlides.map((slide) => (
            <div key={slide.id} className="carousel-slide">
              <img src={slide.image} alt={slide.alt} loading="lazy" />
              <div className="carousel-overlay"></div>
            </div>
          ))}
        </div>

        <button className="carousel-control prev" onClick={prevSlide} aria-label="Previous slide">
          ‹
        </button>
        <button className="carousel-control next" onClick={nextSlide} aria-label="Next slide">
          ›
        </button>

        <div className="carousel-indicators">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function CategoryGrid() {
  const { darkTheme } = useLocationContext();
  
  const CATEGORY_CARDS = [
    { title: "Paddy/Rice", image: process.env.PUBLIC_URL +"/Images/paddy.jpg", link: "#/Rice" },
    { title: "Maize/Corn", image: process.env.PUBLIC_URL +"/Images/maize.webp", link: "#/Corn" },
    { title: "Spices", image: process.env.PUBLIC_URL +"/Images/spices.jpg", link: "#/Spices" },
    { title: "Grams/Pulses", image: process.env.PUBLIC_URL +"/Images/pulses.webp", link: "#/Pulses" },
    { title: "Indoor Plants", image: process.env.PUBLIC_URL +"/Images/plants.jpg", link: "#/IndoorPlants" },
    { title: "Saplings", image: process.env.PUBLIC_URL +"/Images/Sapplings.jpg", link: "#/Sapplings" },
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1120,
        margin: "40px auto 0",
        padding: "0 10px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 36,
        }}
      >
        {CATEGORY_CARDS.map(({ title, image, link }) => (
          <a
            href={link}
            key={title}
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              width: 260,
              height: 260,
              boxShadow: "0 8px 28px 0 rgba(50,70,60,0.20)",
              margin: "auto",
              background: darkTheme ? "#333" : "#ececec", 
              textDecoration: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.25s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            tabIndex={0}
            aria-label={title}
          >
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                borderRadius: 24,
                flexShrink: 0,
              }}
              loading="lazy"
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: 18,
                transform: "translateX(-50%)",
                width: "90%",
                padding: "5px 10px 4px 5px",
                borderRadius: 28,
                background: "rgba(255, 255, 255, 0.25)", 
                backdropFilter: "blur(8px)",          
                WebkitBackdropFilter: "blur(8px)",     
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", 
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",              
                zIndex: 2
              }}
            >
              <div
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: 25,
                  letterSpacing: 0.6,
                  fontFamily: "inherit",
                  textShadow: "0 0 5px rgba(0,0,0,0.3)",
                  wordBreak: "break-word", 
                  maxWidth: "83%"
                }}
              >
                {title}
              </div>
              <FaSearch
                style={{
                  color: "white",
                  fontSize: 30,
                  marginLeft: 24,
                  flexShrink: 0,
                  opacity: 0.94,
                  textShadow: "0 0 4px rgba(0,0,0,0.25)",
                }}
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function AgriGrowBrandCarousel({ darkTheme }) {
  const scrollRef = useRef();

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const scrollAmount = 170; 
    scrollRef.current.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
  };
  
  const mainBg = darkTheme ? "#1e1e1e" : "#f8fafd";
  const headerBg = darkTheme ? "#333" : "#f5f6f7";
  const borderColor = darkTheme ? "#444" : "#e5e5e6";
  const headerTextColor = darkTheme ? "#fff" : "#236A2C";
  const linkColor = darkTheme ? "#8dc63f" : "#3573b5";
  const cardBg = darkTheme ? "#222" : "#fff";

  return (
    <div
      style={{
        margin: "42px auto 0 auto",
        background: mainBg,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 8,
        maxWidth: 1300,
        boxShadow: "0 2px 10px 0 rgba(60,80,120,0.04)",
        overflow: "visible",
        padding: "0 0 18px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "13px 30px 4px 24px",
          background: headerBg,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottom: `1.5px solid ${borderColor}`,
          fontWeight: 650,
          fontSize: 25,
        }}
      >
        <span style={{ color: headerTextColor, fontWeight: 700 }}>
          Fresh Products | AgriGrow Brands
        </span>
        <a
          href="#"
          style={{
            marginLeft: 18,
            fontSize: 18,
            color: linkColor,
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          See all products
        </a>
      </div>
      <div style={{ position: "relative" }}>
        <button
          onClick={() => scroll(-1)}
          style={{
            position: "absolute",
            left: 4,
            top: "50%",
            zIndex: 9,
            transform: "translateY(-50%)",
            background: darkTheme ? "#444" : "rgba(255,255,255,0.95)",
            color: darkTheme ? "#fff" : "#000",
            border: "none",
            borderRadius: "50%",
            boxShadow: "0 2px 8px 0 rgba(150,150,150,0.08)",
            cursor: "pointer",
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          aria-label="Scroll left"
        >
          <FaChevronLeft size={20} />
        </button>
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            gap: 20,
            padding: "24px 40px 4px 60px",
            scrollbarWidth: "none",
            msOverflowStyle: 'none', 
          }}
        >
          {SCROLL_PRODUCTS.map((prod, i) => (
            <a
              key={i}
              href={prod.link}
              style={{
                textDecoration: "none",
                outline: "none",
                border: "none"
              }}
              tabIndex={0}
            >
              <div
                style={{
                  background: cardBg,
                  borderRadius: 10,
                  boxShadow: darkTheme ? "0 2px 10px rgba(0,0,0,0.3)" : "0 2px 10px rgba(80,82,80,0.07)",
                  width: 150,
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 150,
                  minHeight: 200,
                  overflow: "hidden",
                  transition: "transform 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <img
                  src={prod.img}
                  alt={prod.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 8,
                    display: "block",
                    background: cardBg
                  }}
                  loading="lazy"
                />
              </div>
            </a>
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          style={{
            position: "absolute",
            right: 4,
            top: "50%",
            zIndex: 9,
            transform: "translateY(-50%)",
            background: darkTheme ? "#444" : "rgba(255,255,255,0.95)",
            color: darkTheme ? "#fff" : "#000",
            border: "none",
            borderRadius: "50%",
            boxShadow: "0 2px 8px 0 rgba(150,150,150,0.08)",
            cursor: "pointer",
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          aria-label="Scroll right"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function HomeContent() {
  const { darkTheme } = useLocationContext();

  return (
    <>
      <Navbar />

      {/* CHANGED: Removed extra wrapper div and simplified structure */}
      <div
        style={{
          width: '100%',
          maxWidth: '1920px',
          margin: '0 auto', 
          padding: '0 22px',
          paddingTop: '135px',
          boxSizing: 'border-box' // ADDED: ensure padding is included in width calculation
        }}
      >
        <ReactCarousel />
      </div>
      <CategoryGrid />
      <AgriGrowBrandCarousel darkTheme={darkTheme} />
    </>
  );
}

export default function Home() {
  return (
    <HomeContent />
  );
}
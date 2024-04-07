import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CarouselComp() {
  return (
    <div
      style={{
        paddingBottom: "30px",
        width: "100%",
        position: "relative",
      }}
    >
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        <Link to="/category/home-decoration">
          <img
            src="https://rukminim1.flixcart.com/fk-p-flap/1000/170/image/ece413e0bec6e507.jpg?q=20"
            style={{
              display: "block",
              height: "100%",
              margin: "auto",
              width: "100%",
            }}
            alt="carousel_images"
          />
        </Link>
        <Link to="/category/tshirt">
          <img
            src="https://iili.io/JMi1679.jpg"
            style={{
              display: "block",
              height: "100%",
              margin: "auto",
              width: "100%",
            }}
            alt="fashion carousel_images"
          />
        </Link>
        <Link to="/category/air-conditioner">
          <img
            src="https://iili.io/JMiE2Ia.jpg"
            style={{
              display: "block",
              height: "100%",
              margin: "auto",
              width: "100%",
            }}
            alt="carousel_images"
          />
        </Link>
        <Link to="/product/realme-12+-5g">
          <img
            src="https://rukminim1.flixcart.com/fk-p-flap/1000/170/image/ce6cc3b532e714c6.jpg?q=20"
            style={{
              display: "block",
              height: "100%",
              margin: "auto",
              width: "100%",
            }}
            alt="carousel_images"
          />
        </Link>
      </Carousel>
    </div>
  );
}

export default CarouselComp;

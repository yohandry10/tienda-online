import React, { useState, useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import slider1 from '../assets/img/slider1.jpg';
import slider2 from '../assets/img/slider2.jpg';
import slider4 from '../assets/img/slider4.jpg';
import headerImg from "../assets/img/header-img.png";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const HeroSliderComponent = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);

  const toRotate = useMemo(() => ["Cloud Engineer", "AgileOps", "DevOps"], []);

  useEffect(() => {
    const period = 2000;

    let ticker = setInterval(() => {
      let i = loopNum % toRotate.length;
      let fullText = toRotate[i];
      let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta(prevDelta => prevDelta / 2);
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(period);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(500);
      }
    }, delta);

    return () => { clearInterval(ticker); };
  }, [text, isDeleting, loopNum, delta, toRotate]);

  return (
    <Slider {...settings}>
      {/* Usamos TrackVisibility en todas las diapositivas para el efecto */}
      {[slider1, slider2, slider4, headerImg].map((image, index) => (
        <TrackVisibility key={index}>
          {({ isVisible }) => (
            <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
              <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }}/>
              <div className="slider-text">
                {/* Ajusta los mensajes de acuerdo a cada imagen */}
                <h2>{index === 3 ? "Tu mensaje para la diapositiva del encabezado" : `Mensaje para la diapositiva ${index + 1}`}</h2>
              </div>
            </div>
          )}
        </TrackVisibility>
      ))}
    </Slider>
  );
};

export default HeroSliderComponent;

import React, { useState, useEffect } from 'react';

const MovingHero = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const heroScreens = [
    {
      title: "Best Prices",
      description: "Find Everything You Need at Prices You'll Love.",
      backgroundColor: "#5863F8",
      textColor: "#FFFFFF"
    },
    {
      title: "Shop the Latest Trends",
      description: "Stay ahead of the curve with our fashionable collection.",
      backgroundColor: "#171D1C",
      textColor: "#5FBFF9"
    },
    {
      title: "Quality Products Guaranteed",
      description: "Shop with confidence knowing you're getting top-notch items.",
      backgroundColor: "#5B5941",
      textColor: "#C9F2C7"
    }
  ];

  const switchToNextScreen = () => {
    setCurrentScreen(prevScreen => (prevScreen + 1) % heroScreens.length);
  };

  useEffect(() => {
    const interval = setInterval(switchToNextScreen, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '400px',
    overflow: 'hidden'
  };

  const contentStyle = {
    position: 'absolute',
    top: 0,
    left: `${-currentScreen * 100}%`,
    width: `${heroScreens.length * 100}%`,
    transition: 'left 1s ease'
  };

  const screenStyle = {
    float: 'left',
    height: '400px',
    width: 'calc(100% / ' + heroScreens.length + ')',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
    backgroundColor: heroScreens[currentScreen].backgroundColor,
    color: heroScreens[currentScreen].textColor
  };

  return (
    <div className="moving-hero-container" style={containerStyle}>
      <div className="moving-hero-content" style={contentStyle}>
        {heroScreens.map((screen, index) => (
          <div key={index} className="hero-screen" style={screenStyle}>
            <h1 className='text-4xl font-extrabold sm:text-5xl md:text-6xl'>{screen.title}</h1>
            <p className='my-4 text-xl'>{screen.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovingHero;

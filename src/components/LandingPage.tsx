import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LandingContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
`;

const BackgroundGif = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif') center/cover;
  opacity: 0.2;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  z-index: 1;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  color: white;
  font-size: 4rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const CtaButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  background: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
  color: white;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 219, 222, 0.3);
  transition: all 0.3s ease;
  outline: none;
  
  &:hover {
    box-shadow: 0 6px 20px rgba(0, 219, 222, 0.4);
    transform: translateY(-2px);
  }
`;

const FloatingElements = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
`;

const LandingPage = () => {
  const floatingElements = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 5 + 5,
  }));

  return (
    <LandingContainer>
      <BackgroundGif />
      
      <FloatingElements>
        {floatingElements.map((element) => (
          <FloatingElement
            key={element.id}
            initial={{ y: 0, x: 0 }}
            animate={{
              y: [0, 50, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
          />
        ))}
      </FloatingElements>

      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Welcome to Our Platform
        </Title>
        
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          Discover amazing features that will transform your workflow and boost your productivity to new heights.
        </Subtitle>
        
        <CtaButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          Get Started
        </CtaButton>
      </ContentWrapper>
    </LandingContainer>
  );
};

export default LandingPage;
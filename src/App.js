import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { useInView } from 'react-intersection-observer';

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    color: #fff;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(138, 43, 226, 0.7);
    border-radius: 5px;
  }
`;

// Animations
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(138, 43, 226, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(138, 43, 226, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(138, 43, 226, 0);
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const glowAnimation = keyframes`
  0% {
    filter: drop-shadow(0 0 5px rgba(138, 43, 226, 0.7));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(138, 43, 226, 0.9));
  }
  100% {
    filter: drop-shadow(0 0 5px rgba(138, 43, 226, 0.7));
  }
`;

const heatMapAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Styled Components
const LoaderText = styled(motion.div)`
  font-size: 2rem;
  color: white;
  background: linear-gradient(90deg, #9c27b0, #3f51b5, #00bcd4);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${css`${heatMapAnimation}`} 10s ease infinite;
`;

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(138, 43, 226, 0.2) 0%, rgba(25, 25, 112, 0.4) 100%);
    z-index: -1;
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
  z-index: -2;
  filter: hue-rotate(240deg) saturate(1.5);
  
  @media (max-width: 768px) {
    object-position: center;
    height: 100%;
    width: auto;
    min-width: 100%;
  }
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: ${props => props.$isMobile ? '2.5rem' : '4rem'};
  margin-bottom: 20px;
  background: linear-gradient(90deg, #ffffff, #e0e0ff, #ffffff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${css`${heatMapAnimation}`} 10s ease infinite;
  text-shadow: 0 0 15px rgba(138, 43, 226, 0.8), 0 0 30px rgba(138, 43, 226, 0.6);
  letter-spacing: 2px;
  font-weight: 700;
`;

const Subtitle = styled(motion.p)`
  font-size: ${props => props.$isMobile ? '1rem' : '1.5rem'};
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
`;

const GhostlyButton = styled(motion.button)`
  padding: 12px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  background: rgba(138, 43, 226, 0.7);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${css`${pulseAnimation}`} 2s infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const StepsSection = styled.section`
  padding: ${props => props.isMobile ? '60px 20px' : '100px 50px'};
  background: linear-gradient(to bottom, rgba(25, 25, 112, 0.8), rgba(138, 43, 226, 0.4));
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(138, 43, 226, 0.2) 0%, transparent 25%),
                radial-gradient(circle at 70% 60%, rgba(25, 25, 112, 0.2) 0%, transparent 25%),
                radial-gradient(circle at 40% 80%, rgba(138, 43, 226, 0.2) 0%, transparent 25%),
                radial-gradient(circle at 80% 20%, rgba(25, 25, 112, 0.2) 0%, transparent 25%);
    opacity: 0.3;
    z-index: 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.isMobile ? '2rem' : '3rem'};
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #9c27b0, #3f51b5);
    margin: 15px auto 0;
    border-radius: 2px;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.isMobile ? 'column' : 'row'};
  justify-content: space-around;
  align-items: ${props => props.isMobile ? 'center' : 'stretch'};
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const StepCard = styled(motion.div)`
  background: rgba(25, 25, 112, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(138, 43, 226, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(138, 43, 226, 0.4);
  }
`;

const StepImage = styled(motion.img)`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
  filter: hue-rotate(240deg) saturate(1.2);
  animation: ${css`${glowAnimation}`} 3s infinite ease-in-out;
`;

const StepNumber = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #9c27b0, #3f51b5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #fff;
  text-align: center;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  text-align: center;
`;

const FeaturesSection = styled.section`
  padding: ${props => props.isMobile ? '60px 20px' : '100px 50px'};
  background: linear-gradient(to top, rgba(25, 25, 112, 0.8), rgba(138, 43, 226, 0.4));
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 20%, rgba(138, 43, 226, 0.2) 0%, transparent 25%),
                radial-gradient(circle at 60% 40%, rgba(25, 25, 112, 0.2) 0%, transparent 25%),
                radial-gradient(circle at 30% 70%, rgba(138, 43, 226, 0.2) 0%, transparent 25%),
                radial-gradient(circle at 70% 90%, rgba(25, 25, 112, 0.2) 0%, transparent 25%);
    opacity: 0.3;
    z-index: 0;
  }
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.isMobile ? '1fr' : 'repeat(3, 1fr)'};
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(25, 25, 112, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(138, 43, 226, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(138, 43, 226, 0.4);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #9c27b0, #3f51b5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: white;
  animation: ${css`${floatAnimation}`} 3s infinite ease-in-out;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #fff;
  text-align: center;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  text-align: center;
`;

const Footer = styled.footer`
  padding: 30px 20px;
  background: rgba(25, 25, 112, 0.9);
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(138, 43, 226, 0.7), transparent);
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const ProjectsLink = styled.a`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  text-decoration: none;
  padding: 8px 20px;
  background: rgba(138, 43, 226, 0.3);
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(138, 43, 226, 0.5);
  
  &:hover {
    background: rgba(138, 43, 226, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4);
  }
`;

function App() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const stepsRef = React.useRef(null);
  const [stepsInViewRef, stepsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Combine refs
  const setStepsRefs = (element) => {
    stepsRef.current = element;
    stepsInViewRef(element);
  };
  
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Function to handle scroll to steps section
  const scrollToSteps = () => {
    stepsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AnimatePresence>
          {!isLoaded ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
              }}
            >
              <LoaderText
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                GhostVision
              </LoaderText>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <HeroSection ref={heroRef}>
          <VideoBackground autoPlay loop muted playsInline>
            <source src="/assets/LoopVid.mp4" type="video/mp4" />
          </VideoBackground>
          
          <HeroContent
            variants={fadeInUp}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <Title 
              $isMobile={isMobile}
              variants={fadeInUp}
            >
              GhostVision
            </Title>
            <Subtitle 
              $isMobile={isMobile}
              variants={fadeInUp}
            >
              Redefining safety and privacy with cutting-edge radar technology and machine learning
            </Subtitle>
            <GhostlyButton
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToSteps}
            >
              Discover More
            </GhostlyButton>
          </HeroContent>
        </HeroSection>

        <StepsSection isMobile={isMobile} ref={setStepsRefs}>
          <SectionTitle 
            isMobile={isMobile}
            variants={fadeInUp}
            initial="hidden"
            animate={stepsInView ? "visible" : "hidden"}
          >
            How GhostVision Works
          </SectionTitle>
          
          <StepsContainer 
            isMobile={isMobile}
            variants={staggerContainer}
            initial="hidden"
            animate={stepsInView ? "visible" : "hidden"}
          >
            <StepCard variants={fadeInUp} style={{ position: 'relative' }}>
              <StepNumber>1</StepNumber>
              <StepImage 
                src="/assets/step1.jpg" 
                alt="Step 1" 
                whileHover={{ scale: 1.05 }}
              />
              <StepTitle>Radar Sensing</StepTitle>
              <StepDescription>
                GhostVision uses harmless radar waves that bounce off people in the room, creating detailed heat signatures without capturing identifiable images.
              </StepDescription>
            </StepCard>
            
            <StepCard variants={fadeInUp} style={{ position: 'relative' }}>
              <StepNumber>2</StepNumber>
              <StepImage 
                src="/assets/step2.jpg" 
                alt="Step 2" 
                whileHover={{ scale: 1.05 }}
              />
              <StepTitle>Heat Mapping</StepTitle>
              <StepDescription>
                The radar data is transformed into precise heatmaps showing exactly where people are located, while maintaining complete privacy.
              </StepDescription>
            </StepCard>
            
            <StepCard variants={fadeInUp} style={{ position: 'relative' }}>
              <StepNumber>3</StepNumber>
              <StepImage 
                src="/assets/step3.jpg" 
                alt="Step 3" 
                whileHover={{ scale: 1.05 }}
              />
              <StepTitle>AI Analysis</StepTitle>
              <StepDescription>
                Advanced machine learning algorithms analyze movement patterns to detect falls and other events, providing safety without sacrificing privacy.
              </StepDescription>
            </StepCard>
          </StepsContainer>
        </StepsSection>

        <FeaturesSection isMobile={isMobile} ref={featuresRef}>
          <SectionTitle 
            isMobile={isMobile}
            variants={fadeInUp}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            Why GhostVision?
          </SectionTitle>
          
          <FeaturesContainer 
            isMobile={isMobile}
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            <FeatureCard variants={fadeInUp}>
              <FeatureIcon>🔒</FeatureIcon>
              <FeatureTitle>Privacy First</FeatureTitle>
              <FeatureDescription>
                No intrusive cameras or wearables. GhostVision captures movement and heat patterns without ever identifying individuals visually.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard variants={fadeInUp}>
              <FeatureIcon>✨</FeatureIcon>
              <FeatureTitle>Effortless Reliability</FeatureTitle>
              <FeatureDescription>
                No need to remember or wear anything. GhostVision works automatically, even in places cameras can't go—bathrooms, showers, and more.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard variants={fadeInUp}>
              <FeatureIcon>🚀</FeatureIcon>
              <FeatureTitle>Endless Possibilities</FeatureTitle>
              <FeatureDescription>
                Beyond fall detection, GhostVision can be applied to schools, public safety, home security, and more—ensuring safety without sacrificing privacy.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesContainer>
        </FeaturesSection>

        <Footer>
          <FooterText>© 2025 GhostVision. All rights reserved. Privacy meets protection, effortlessly.</FooterText>
          <ProjectsLink 
            href="https://shaikhatim.com/projects" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            See My Other Projects
          </ProjectsLink>
        </Footer>
      </AppContainer>
    </>
  );
}

export default App;

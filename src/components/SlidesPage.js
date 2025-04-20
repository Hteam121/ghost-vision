import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const SlidesPageContainer = styled.section`
  padding: ${props => props.$isMobile ? '80px 15px 40px' : '100px 50px'};
  background: linear-gradient(to bottom, rgba(25, 25, 112, 0.8), rgba(138, 43, 226, 0.4));
  position: relative;
  min-height: 100vh;
  
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

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.$isMobile ? '1.8rem' : '3rem'};
  text-align: center;
  margin-bottom: ${props => props.$isMobile ? '30px' : '50px'};
  position: relative;
  z-index: 1;
  color: #fff;
  
  &::after {
    content: '';
    display: block;
    width: ${props => props.$isMobile ? '80px' : '100px'};
    height: 4px;
    background: linear-gradient(90deg, #9c27b0, #3f51b5);
    margin: 15px auto 0;
    border-radius: 2px;
  }
`;

const SlidesContainer = styled(motion.div)`
  margin-bottom: ${props => props.$isMobile ? '40px' : '60px'};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(138, 43, 226, 0.5);
`;

const VideoSection = styled(motion.div)`
  background: rgba(25, 25, 112, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: ${props => props.$isMobile ? '20px 15px' : '30px'};
  margin-top: ${props => props.$isMobile ? '40px' : '60px'};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(138, 43, 226, 0.3);
`;

const VideoTitle = styled.h3`
  font-size: ${props => props.$isMobile ? '1.5rem' : '1.8rem'};
  margin-bottom: ${props => props.$isMobile ? '15px' : '20px'};
  color: #fff;
  text-align: center;
`;

const VideoContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(138, 43, 226, 0.3);
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const BackButton = styled(motion.button)`
  position: fixed;
  top: ${props => props.$isMobile ? '15px' : '20px'};
  left: ${props => props.$isMobile ? '15px' : '20px'};
  padding: ${props => props.$isMobile ? '8px 16px' : '10px 20px'};
  background: rgba(138, 43, 226, 0.7);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${props => props.$isMobile ? '0.9rem' : '1rem'};
  
  &:hover {
    background: rgba(138, 43, 226, 0.9);
  }
`;

const SlidesPage = ({ $isMobile: isMobile, goBack }) => {
  // Your YouTube video ID
  const videoId = 'hj0sTu7M9G8';
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <SlidesPageContainer $isMobile={isMobile}>
      <BackButton 
        $isMobile={isMobile}
        onClick={goBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back
      </BackButton>
      
      <ContentContainer>
        <SectionTitle 
          $isMobile={isMobile}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          GhostVision Presentation
        </SectionTitle>
        
        <SlidesContainer
          $isMobile={isMobile}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div style={{
            position: "relative",
            width: "100%",
            height: "0",
            paddingTop: "56.2500%",
            paddingBottom: "0",
            boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
            overflow: "hidden",
            borderRadius: "8px",
            willChange: "transform"
          }}>
            <iframe 
              loading="lazy" 
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0",
                border: "none",
                padding: "0",
                margin: "0"
              }}
              src="https://www.canva.com/design/DAGlJ-UaH_M/1FEJl3sZUDPx7AePfsR0QQ/view?embed" 
              allowFullScreen="allowfullscreen" 
              allow="fullscreen"
              title="GhostVision Presentation"
            />
          </div>
        </SlidesContainer>
        
        <VideoSection
          $isMobile={isMobile}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <VideoTitle $isMobile={isMobile}>GhostVision Video</VideoTitle>
          
          <VideoContainer $isMobile={isMobile}>
            <VideoIframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoContainer>
        </VideoSection>
      </ContentContainer>
    </SlidesPageContainer>
  );
};

export default SlidesPage;
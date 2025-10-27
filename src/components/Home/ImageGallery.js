import React, { useState } from "react";
import styled from "styled-components";

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (min-width: 37.5rem) {
    flex-direction: column;
    max-width: 200px;
  }
`;

const MainImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  aspect-ratio: 9/16;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.02);
  }
  
  @media (min-width: 37.5rem) {
    max-width: 200px;
    max-height: 400px;
  }
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: 37.5rem) {
    flex-direction: row;
    max-width: 200px;
  }
`;

const Thumbnail = styled.div`
  width: 50px;
  height: 80px;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  opacity: ${props => props.isActive ? 1 : 0.6};
  border: 2px solid ${props => props.isActive ? '#667eea' : 'transparent'};
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
    border-color: #667eea;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 37.5rem) {
    width: 40px;
    height: 60px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled.div`
  max-width: 90vw;
  max-height: 90vh;
  position: relative;

  img {
    max-width: 100%;
    max-height: 90vh;
    border-radius: 1rem;
    object-fit: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -2rem;
  right: -2rem;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  color: #667eea;
  font-weight: bold;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  color: #667eea;
  font-weight: bold;
  
  &:hover {
    background: white;
  }
  
  &.prev {
    left: -2rem;
  }
  
  &.next {
    right: -2rem;
  }
`;

function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <GalleryContainer>
        <MainImage onClick={() => setIsModalOpen(true)}>
          <img src={images[currentIndex]} alt={`Screenshot ${currentIndex + 1}`} />
        </MainImage>
        <Thumbnails>
          {images.map((image, index) => (
            <Thumbnail
              key={index}
              isActive={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </Thumbnail>
          ))}
        </Thumbnails>
      </GalleryContainer>

      <Modal isOpen={isModalOpen}>
        <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
        <ModalContent>
          <img src={images[currentIndex]} alt={`Full screenshot ${currentIndex + 1}`} />
          {images.length > 1 && (
            <>
              <NavButton className="prev" onClick={handlePrev}>‹</NavButton>
              <NavButton className="next" onClick={handleNext}>›</NavButton>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageGallery;


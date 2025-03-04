import React from 'react';
import styled from 'styled-components';
import Loader from './LoadingSpinner'; // Import the Loader component from paste-2.txt

const LoadingModal = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <Loader />
        <LoadingText>Processing your request...</LoadingText>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1e1e1e;
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const LoadingText = styled.p`
  color: #00FFFF;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 500;
`;

export default LoadingModal;
'use client'
import { Box, VStack, HStack, Button } from './common/components';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

export default function Home() {
  const handleNavigation = (url) => {
    window.location.href = url;
  };

  return (
    <Box
      w="100vw"
      h="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={8}>
        <HStack spacing={8}>
          <MotionButton
            colorScheme="teal"
            size="lg"
            width="200px"
            height="100px"
            fontSize="2xl"
            onClick={() => handleNavigation('/nanako')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            クイズ
          </MotionButton>
          <MotionButton
            colorScheme="blue"
            size="lg"
            width="200px"
            height="100px"
            fontSize="2xl"
            onClick={() => handleNavigation('/saku')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            家計簿
          </MotionButton>
          <MotionButton
            colorScheme="purple"
            size="lg"
            width="200px"
            height="100px"
            fontSize="2xl"
            onClick={() => handleNavigation('/ria')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Todo
          </MotionButton>
        </HStack>
      </VStack>
    </Box>
  );
};

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const FloatingText = ({ text, position, fontSize = 0.5 }) => {
  const textRef = useRef();

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={fontSize}
      color="#ffffff"
      font="/fonts/PlayfairDisplay-Bold.ttf"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
};

export default FloatingText;


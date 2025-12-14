import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { Box, Sphere } from '@react-three/drei';

const ScrollCharacter = () => {
  const groupRef = useRef();
  const headRef = useRef();
  const bodyRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const { viewport } = useThree();
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Follow scroll position - character moves down as you scroll
      const scrollProgress = scroll.offset;
      const maxY = viewport.height * 3; // Adjust based on page height
      groupRef.current.position.y = -scrollProgress * maxY;

      // Floating animation
      const floatOffset = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      groupRef.current.position.y += floatOffset;
      
      // Gentle rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      // Head bobbing
      if (headRef.current) {
        headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      }
      
      // Arm swinging
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.3;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -Math.sin(state.clock.elapsedTime * 1.2) * 0.3;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Simple character made of shapes */}
      {/* Head */}
      <group ref={headRef}>
        <Sphere args={[0.3, 32, 32]} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#d4c5b9" />
        </Sphere>
        
        {/* Eyes */}
        <Sphere args={[0.05, 16, 16]} position={[-0.1, 1.3, 0.25]}>
          <meshStandardMaterial color="#0a0a0a" />
        </Sphere>
        <Sphere args={[0.05, 16, 16]} position={[0.1, 1.3, 0.25]}>
          <meshStandardMaterial color="#0a0a0a" />
        </Sphere>
      </group>
      
      {/* Body */}
      <group ref={bodyRef}>
        <Box args={[0.4, 0.8, 0.3]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#b8a99d" />
        </Box>
      </group>
      
      {/* Arms */}
      <group ref={leftArmRef}>
        <Box args={[0.15, 0.6, 0.15]} position={[-0.3, 0.5, 0]} rotation={[0, 0, 0.2]}>
          <meshStandardMaterial color="#d4c5b9" />
        </Box>
      </group>
      <group ref={rightArmRef}>
        <Box args={[0.15, 0.6, 0.15]} position={[0.3, 0.5, 0]} rotation={[0, 0, -0.2]}>
          <meshStandardMaterial color="#d4c5b9" />
        </Box>
      </group>
      
      {/* Legs */}
      <Box args={[0.15, 0.5, 0.15]} position={[-0.15, -0.2, 0]}>
        <meshStandardMaterial color="#9a9a9a" />
      </Box>
      <Box args={[0.15, 0.5, 0.15]} position={[0.15, -0.2, 0]}>
        <meshStandardMaterial color="#9a9a9a" />
      </Box>
    </group>
  );
};

export default ScrollCharacter;


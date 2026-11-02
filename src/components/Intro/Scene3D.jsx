import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

// Floating torus knot — main hero object
function TorusKnot() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    mesh.current.rotation.x = clock.getElapsedTime() * 0.18;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.22;
  });
  return (
    <mesh ref={mesh} castShadow>
      <torusKnotGeometry args={[1.1, 0.35, 200, 32, 2, 3]} />
      <meshStandardMaterial
        color="#256d85"
        roughness={0.1}
        metalness={0.85}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

// Orbiting small spheres
function OrbitingSpheres() {
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.4;
    group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
  });

  const positions = useMemo(
    () => [
      [2.8, 0, 0],
      [-2.8, 0, 0],
      [0, 2.8, 0],
      [0, -2.8, 0],
      [2, 2, 0],
      [-2, -2, 0],
    ],
    [],
  );

  return (
    <group ref={group}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.12 + (i % 3) * 0.05, 16, 16]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#6fa6b8" : "#b9cbbe"}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

// Distorted blob behind
function BackgroundBlob() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    mesh.current.rotation.y = clock.getElapsedTime() * 0.08;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={mesh} args={[2.2, 64, 64]} position={[0, 0, -1.5]}>
        <MeshDistortMaterial
          color="#292a25"
          distort={0.4}
          speed={1.5}
          roughness={0}
          metalness={0.3}
          opacity={0.6}
          transparent
        />
      </Sphere>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#256d85" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#b9cbbe" />
      <pointLight position={[0, 10, -5]} intensity={1.5} color="#ffffff" />
      <spotLight
        position={[5, 5, 5]}
        intensity={3}
        angle={0.3}
        penumbra={1}
        color="#256d85"
        castShadow
      />

      {/* Stars background */}
      <Stars
        radius={80}
        depth={50}
        count={2000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Objects */}
      <BackgroundBlob />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <TorusKnot />
      </Float>
      <OrbitingSpheres />
    </Canvas>
  );
}

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Center, MeshTransmissionMaterial } from "@react-three/drei";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const isMobile = window.innerWidth < 768;

// Ukuran dan spacing disesuaikan per device
const LETTER_SIZE = isMobile ? 0.42 : 0.75;
const LETTER_HEIGHT = isMobile ? 0.1 : 0.2;
const SPACING_VAL = isMobile ? 0.65 : 1.12;

// Start positions per device
const START_POSITIONS = isMobile
  ? [
      [-2.5, 2, 0],
      [0, 3, 0],
      [2.5, 2, 0],
      [-2, -2, 0],
      [2, -2.5, 0],
    ]
  : [
      [-5, 3, 0],
      [0, 5, 0],
      [5, 3, 0],
      [-4.5, -3.5, 0],
      [4.5, -4, 0],
    ];

const START_ROTATIONS = [
  [0.8, -1.2, 0.5],
  [-0.5, 0.3, -0.8],
  [0.3, 1.0, 0.6],
  [-0.9, -0.4, 1.1],
  [0.6, 0.8, -0.7],
];

function Letter({ char, index, delayMs }) {
  const groupRef = useRef();
  const startTime = useRef(null);
  const triggered = useRef(false);
  const DURATION = 1.1;

  const TOTAL = 5;
  const totalW = (TOTAL - 1) * SPACING_VAL;
  const finalX = index * SPACING_VAL - totalW / 2;
  const finalPos = [finalX, 0, 0];
  const startPos = START_POSITIONS[index];
  const startRot = START_ROTATIONS[index];

  useEffect(() => {
    const t = setTimeout(() => {
      triggered.current = true;
    }, delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  useFrame(({ clock }) => {
    const mesh = groupRef.current;
    if (!mesh) return;
    const now = clock.getElapsedTime();

    if (!triggered.current) {
      mesh.position.set(startPos[0], startPos[1], -50);
      mesh.rotation.set(...startRot);
      mesh.scale.setScalar(1);
      return;
    }

    if (startTime.current === null) startTime.current = now;

    const elapsed = now - startTime.current;
    const raw = Math.min(1, elapsed / DURATION);
    const progress = easeOutExpo(raw);

    if (raw < 1) {
      mesh.position.x = startPos[0] + (finalPos[0] - startPos[0]) * progress;
      mesh.position.y = startPos[1] + (finalPos[1] - startPos[1]) * progress;
      mesh.position.z = (1 - progress) * 3;

      mesh.rotation.x = startRot[0] * (1 - progress);
      mesh.rotation.y = startRot[1] * (1 - progress);
      mesh.rotation.z = startRot[2] * (1 - progress);

      const scaleP = Math.min(1, raw / 0.25);
      mesh.scale.setScalar(0.1 + easeOutExpo(scaleP) * 0.9);
    } else {
      mesh.scale.setScalar(1);
      mesh.rotation.x = Math.sin(now * 0.5 + index * 0.6) * 0.02;
      mesh.rotation.y = Math.sin(now * 0.35 + index * 0.9) * 0.04;
      mesh.rotation.z = 0;
      mesh.position.x = finalPos[0];
      mesh.position.y = Math.sin(now * 0.65 + index * 1.1) * 0.05;
      mesh.position.z = 0;
    }
  });

  return (
    <group ref={groupRef} frustumCulled={false}>
      <Center>
        <Text3D
          font="/fonts/inter_bold.json"
          size={LETTER_SIZE}
          height={LETTER_HEIGHT}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.015}
          bevelSize={0.008}
          bevelSegments={4}
        >
          {char}
          <MeshTransmissionMaterial
            samples={isMobile ? 2 : 4}
            resolution={isMobile ? 64 : 128}
            transmission={0.92}
            roughness={0.05}
            thickness={0.4}
            ior={1.5}
            chromaticAberration={0.06}
            distortion={0.05}
            temporalDistortion={0}
            color="#b9cbbe"
            attenuationColor="#256d85"
            attenuationDistance={0.8}
            envMapIntensity={1.2}
          />
        </Text3D>
      </Center>
    </group>
  );
}

export default function FvnraText() {
  const letters = ["F", "V", "N", "R", "A"];
  return (
    <group position={[0, -0.1, 0]}>
      {letters.map((char, i) => (
        <Letter key={i} char={char} index={i} delayMs={300 + i * 300} />
      ))}
    </group>
  );
}

import { useRef, useImperativeHandle, forwardRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import FvnraText from "./FvnraText";
import * as THREE from "three";

const isMobile = window.innerWidth < 768;

// Ring — geometry segment dikurangi drastis, material ringan
function Ring({ radius, tube, speed, color, opacity }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * speed;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.2;
  });
  return (
    <mesh ref={ref} position={[0, 0.3, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, tube, 8, 80]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// Orbs — ganti meshPhysicalMaterial → meshBasicMaterial, kurangi jumlah
function Orbs() {
  const group = useRef();
  const orbs = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        angle: (i / 5) * Math.PI * 2,
        radius: 2.8 + (i % 2) * 0.5,
        speed: 0.18 + i * 0.03,
        size: 0.04 + (i % 3) * 0.025,
        yOff: (i - 2) * 0.3,
      })),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const o = orbs[i];
      child.position.x = Math.cos(t * o.speed + o.angle) * o.radius;
      child.position.z = Math.sin(t * o.speed + o.angle) * o.radius * 0.5;
      child.position.y = o.yOff + Math.sin(t * 0.6 + i) * 0.15;
    });
  });

  return (
    <group ref={group}>
      {orbs.map((o, i) => (
        <mesh key={i} scale={o.size * 10}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#b9cbbe" : "#256d85"}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// Camera zoom controller
const CameraController = forwardRef(function CameraController(_, ref) {
  const { camera } = useThree();
  const state = useRef({
    zooming: false,
    progress: 0,
    onDone: null,
    startZ: null, // dibaca dari kamera aktual saat startZoom dipanggil
    startFov: null,
  });

  useImperativeHandle(ref, () => ({
    startZoom: (cb) => {
      // Baca posisi kamera aktual — bukan hardcode
      state.current.startZ = camera.position.z;
      state.current.startFov = camera.fov;
      state.current.zooming = true;
      state.current.progress = 0;
      state.current.onDone = cb;
    },
  }));

  useFrame((_, delta) => {
    const s = state.current;
    if (!s.zooming || s.startZ === null) return;

    s.progress = Math.min(1, s.progress + delta * 0.55);
    const t = s.progress;
    // Ease: lambat di awal → cepat di akhir
    const eased =
      t < 0.6 ? (t / 0.6) * (t / 0.6) * 0.4 : 0.4 + ((t - 0.6) / 0.4) * 0.6;

    // Zoom dari posisi awal ke z = -3 (menembus teks)
    camera.position.z = s.startZ - eased * (s.startZ + 3);
    camera.position.y = eased * 0.15;

    // FOV melebar dari fov awal ke fov+43
    camera.fov = s.startFov + eased * 43;
    camera.updateProjectionMatrix();

    if (s.progress >= 1 && s.onDone) {
      s.onDone();
      s.onDone = null;
    }
  });

  return null;
});

function Scene({ cameraRef }) {
  return (
    <>
      {/* Lighting disederhanakan — 1 ambient + 1 directional + 1 point */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.8} />
      <pointLight position={[-3, -2, 2]} intensity={1.2} color="#256d85" />

      <FvnraText />
      <Ring
        radius={3.2}
        tube={0.012}
        speed={0.15}
        color="#256d85"
        opacity={0.4}
      />
      <Ring
        radius={3.8}
        tube={0.008}
        speed={-0.08}
        color="#6fa6b8"
        opacity={0.25}
      />
      <Orbs />

      {/* Sparkles dikurangi count */}
      <Sparkles
        count={30}
        scale={[8, 4, 4]}
        size={1.0}
        speed={0.2}
        opacity={0.4}
        color="#6fa6b8"
      />

      {/* Environment ringan — sunset lebih cepat load dari city */}
      <Environment preset="sunset" />

      <CameraController ref={cameraRef} />
    </>
  );
}

export default forwardRef(function LoaderScene(_, ref) {
  const cameraRef = useRef();

  useImperativeHandle(ref, () => ({
    startZoom: (cb) => cameraRef.current?.startZoom(cb),
  }));

  return (
    <Canvas
      camera={{
        position: [0, 0, isMobile ? 7.5 : 5.5],
        fov: isMobile ? 50 : 42,
      }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        powerPreference: "high-performance",
      }}
      dpr={Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1 : 1.5)}
      frameloop="always"
      performance={{ min: 0.5 }} // R3F adaptive performance
    >
      <Scene cameraRef={cameraRef} />
    </Canvas>
  );
});

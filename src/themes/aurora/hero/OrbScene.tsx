import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Orb() {
  const mesh = useRef<THREE.Mesh>(null!);
  const light = useRef<THREE.PointLight>(null!);
  const { pointer, viewport } = useThree();
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.12;
    if (light.current) {
      const tx = pointer.x * (viewport.width / 2);
      const ty = pointer.y * (viewport.height / 2);
      light.current.position.x += (tx - light.current.position.x) * 0.08;
      light.current.position.y += (ty - light.current.position.y) * 0.08;
    }
  });
  return (
    <group>
      <pointLight ref={light} position={[2, 2, 3]} intensity={30} distance={18} color="#aab6ff" />
      <mesh ref={mesh}>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshPhysicalMaterial color="#e9ecff" metalness={0.35} roughness={0.12} clearcoat={1} clearcoatRoughness={0.15} envMapIntensity={1.2} />
      </mesh>
    </group>
  );
}

export default function OrbScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-4, 5, 5]} intensity={1.1} />
      <Orb />
      <Environment preset="city" />
    </Canvas>
  );
}

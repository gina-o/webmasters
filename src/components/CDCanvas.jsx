import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import SpinningCD from "./SpinningCD";
import * as THREE from "three";


/* BACKGROUND: change images here */
function Background() {
  const texture = useTexture("/homebackground.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return <primitive attach="background" object={texture} />;
}

export default function CDCanvas() {
  return (
<Canvas
  camera={{ position: [5, 2, 2], fov: 55 }}
  gl={{
    toneMapping: THREE.NoToneMapping,
    outputColorSpace: THREE.SRGBColorSpace,
  }}
  style={{ position: "absolute", inset: 0 }}
>

      
      <Background />

      
      <ambientLight intensity={3} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />
      <directionalLight position={[-5, -5, 5]} intensity={1.5} />

     
      <Html fullscreen>
        <div className="w-full h-full flex flex-col items-center  py-24 pointer-events-none">
          <h1 className="animate-neon-pulse text-4xl mb-4 text-white font-['Workbench']">
            The Sounds of Houston
          </h1>
          <p className="text-white/80 text-xl">
            Click the CD to enter Houston vibes...
          </p>
        </div>
      </Html>

      
      <SpinningCD modelPath="/chicken.glb" />

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}





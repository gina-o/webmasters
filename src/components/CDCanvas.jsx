import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import SpinningCD from "./SpinningCD";
import * as THREE from "three";

  <audio id="background-audio" autoplay loop>
  <source src="citysounds.mp3" type="audio/mp3">
  </source>
  Your browser does not support the audio element.
</audio>



/* BACKGROUND: change images here */
function Background() {
  const texture = useTexture("/bruno.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return <primitive attach="background" object={texture} />;
  
}


export default function CDCanvas() {
  return (
    <>
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
          <div className="w-full font-rubik-80s animate-neon-pulse h-full flex flex-col items-center justify-between py-24 pointer-events-none">
            <h1 className="title">The Sounds of Houston</h1>
            <p className="text-white/80 text-xl">Let's listen ▶︎</p>
          </div>
        </Html>

      
      <SpinningCD modelPath="/chicken.glb" />

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}





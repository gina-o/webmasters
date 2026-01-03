import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function SpinningCD() {
  const cdRef = useRef();
  const gltf = useGLTF("/vinyl.glb");

  const { camera, size } = useThree(); // access camera

  useEffect(() => {
    if (!gltf || !gltf.scene) return;

    const scene = gltf.scene;

    // box
    const bbox = new THREE.Box3().setFromObject(scene);
    const sizeBBox = bbox.getSize(new THREE.Vector3());
    const center = bbox.getCenter(new THREE.Vector3());
    const maxDim = Math.max(sizeBBox.x, sizeBBox.y, sizeBBox.z);


    scene.position.set(-center.x, -center.y, -center.z);

    
    const fov = camera.fov * (Math.PI / 180); 
    const distance = maxDim / (2 * Math.tan(fov / 2));

    const scaleFactor = distance / maxDim * 0.8; 
    scene.scale.setScalar(scaleFactor);

    
    camera.position.z = distance * 1.2;

 
    camera.lookAt(0, 0, 0);
  }, [gltf, camera, size]);

  useFrame(() => {
    if (cdRef.current) cdRef.current.rotation.y += 0.003;
  });

  if (!gltf || !gltf.scene) return null;

  return (
    <primitive
      ref={cdRef}
      object={gltf.scene}
      onClick={() => {
        const audio = new Audio("/houston-sample.mp3");
        audio.play();
        window.location.href = "/enter";
      }}
    />
  );
}

export default function CDCanvas() {
  return (
    <Canvas
      className="fixed top-0 left-0 w-screen h-screen z-10"
      camera={{ position: [0, 0, 10], fov: 35 }}
      gl={{ alpha: true }}
    >
      <TransparentBackground />
      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 5, 10]} intensity={1.2} />
      <SpinningCD />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}

function TransparentBackground() {
  useThree(({ gl, scene }) => {
    gl.setClearColor(0x000000, 0);
    scene.background = null;
  });
  return null;
}

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

export default function SpinningCD({ modelPath }) {
  const group = useRef();
  const { scene } = useGLTF(modelPath);
  const navigate = useNavigate();

  useEffect(() => {
    if (!scene || !group.current) return;

    group.current.clear();

    const model = scene.clone(true);

    
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    model.position.sub(center);
    model.scale.setScalar(2 / maxDim);

    model.traverse((child) => {
      if (child.isMesh && child.material) {
        const material = child.material;
        Array.isArray(material)
          ? material.forEach(makeTransparent)
          : makeTransparent(material);

        child.renderOrder = 1;
      }
    });

    group.current.add(model);
  }, [scene, modelPath]);

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.01;
  });

  return (
    <group
      ref={group}
      onClick={(e) => {
        e.stopPropagation(); 
        navigate("/menu");   
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    />
  );
}

function makeTransparent(material) {
  material.transparent = true;
  material.opacity = 0.6;
  material.depthWrite = false;
  material.side = THREE.DoubleSide;
  material.metalness = 0.8;
  material.roughness = 0.2;
  material.needsUpdate = true;
}


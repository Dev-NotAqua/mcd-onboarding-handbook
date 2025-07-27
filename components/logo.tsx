"use client"

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image } from '@react-three/drei'
import * as THREE from 'three'

function Logo() {
  const imageRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  useFrame((_, delta) => {
    if (!imageRef.current) return

    imageRef.current.rotation.y += delta * 0.1
    const targetScale = hovered ? 1.1 : 1
    // The scale property of the mesh itself is a Vector3, so this part is correct.
    imageRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    )
  })

  return (
    <Image
      ref={imageRef}
      url="/Logo.png"
      transparent
      // The prop for the <Image> component expects [number, number]
      scale={[2, 2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  )
}

const LogoCanvas: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 25 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1.57} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Logo />
    </Canvas>
  )
}

export default LogoCanvas
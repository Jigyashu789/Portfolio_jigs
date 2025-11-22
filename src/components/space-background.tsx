"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Float, Stars, Trail } from "@react-three/drei"
import * as random from "maath/random/dist/maath-random.esm"
import * as THREE from "three"

function StarField(props: any) {
    const ref = useRef<THREE.Points>(null)
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

function StarCruiser() {
    const ref = useRef<THREE.Group>(null)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (ref.current) {
            // Gentle floating
            ref.current.rotation.z = Math.sin(t / 4) / 40
            ref.current.rotation.y = Math.sin(t / 2) / 20

            // Mouse interaction (banking)
            const mouseX = state.mouse.x
            const mouseY = state.mouse.y
            ref.current.rotation.z += -mouseX * 0.2
            ref.current.rotation.x = mouseY * 0.1
        }
    })

    return (
        <group ref={ref} scale={[0.5, 0.5, 0.5]}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                {/* Main Hull - Wedge Shape */}
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                    <coneGeometry args={[1, 3, 4]} />
                    <meshStandardMaterial color="#e2e8f0" roughness={0.6} metalness={0.8} />
                </mesh>

                {/* Bridge Tower */}
                <group position={[0, 0.3, 0.8]}>
                    <mesh position={[0, 0.1, 0]}>
                        <boxGeometry args={[0.4, 0.2, 0.3]} />
                        <meshStandardMaterial color="#cbd5e1" roughness={0.6} metalness={0.8} />
                    </mesh>
                    {/* Command Deck */}
                    <mesh position={[0, 0.25, 0]}>
                        <boxGeometry args={[0.2, 0.1, 0.1]} />
                        <meshStandardMaterial color="#94a3b8" roughness={0.6} metalness={0.8} />
                    </mesh>
                </group>

                {/* Engines */}
                <group position={[0, 0, 1.5]}>
                    <mesh position={[-0.3, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.15, 0.2, 0.1]} />
                        <meshStandardMaterial color="#334155" />
                        <mesh position={[0, -0.06, 0]}>
                            <circleGeometry args={[0.12, 32]} />
                            <meshBasicMaterial color="#3b82f6" toneMapped={false} />
                        </mesh>
                    </mesh>
                    <mesh position={[0.3, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.15, 0.2, 0.1]} />
                        <meshStandardMaterial color="#334155" />
                        <mesh position={[0, -0.06, 0]}>
                            <circleGeometry args={[0.12, 32]} />
                            <meshBasicMaterial color="#3b82f6" toneMapped={false} />
                        </mesh>
                    </mesh>
                    <mesh position={[0, 0.1, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.15, 0.2, 0.1]} />
                        <meshStandardMaterial color="#334155" />
                        <mesh position={[0, -0.06, 0]}>
                            <circleGeometry args={[0.12, 32]} />
                            <meshBasicMaterial color="#3b82f6" toneMapped={false} />
                        </mesh>
                    </mesh>
                </group>

                {/* Surface Details (Greebles) */}
                <mesh position={[0.3, 0.05, 0]}>
                    <boxGeometry args={[0.1, 0.05, 0.4]} />
                    <meshStandardMaterial color="#94a3b8" />
                </mesh>
                <mesh position={[-0.3, 0.05, 0]}>
                    <boxGeometry args={[0.1, 0.05, 0.4]} />
                    <meshStandardMaterial color="#94a3b8" />
                </mesh>
            </Float>
        </group>
    )
}

function CelestialObjects() {
    const groupRef = useRef<any>()

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Move objects past the camera to simulate cruising
            groupRef.current.position.z += delta * 0.5
            if (groupRef.current.position.z > 5) {
                groupRef.current.position.z = -10
            }
        }
    })

    return (
        <group ref={groupRef} position={[0, 0, -10]}>
            {/* Sun */}
            <mesh position={[2, 1, -5]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial color="#fbbf24" />
                <pointLight intensity={2} distance={10} color="#fbbf24" />
            </mesh>

            {/* Black Hole */}
            <group position={[-2, -1, -2]}>
                <mesh>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshBasicMaterial color="#000000" />
                </mesh>
                {/* Accretion Disk */}
                <mesh rotation={[Math.PI / 3, 0, 0]}>
                    <torusGeometry args={[0.5, 0.05, 16, 100]} />
                    <meshBasicMaterial color="#ec4899" />
                </mesh>
            </group>

            {/* Distant Galaxy */}
            <Points positions={new Float32Array(300).map(() => (Math.random() - 0.5) * 2)} stride={3} position={[0, 2, -8]}>
                <PointMaterial transparent color="#60a5fa" size={0.05} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    )
}

export function SpaceBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <color attach="background" args={['#030014']} />
                <fog attach="fog" args={['#030014', 5, 15]} />

                <ambientLight intensity={0.5} />
                <StarField />
                <CelestialObjects />

                {/* Ship is rendered in a separate layer or just in front */}
                <group position={[0, -0.2, 0.5]}>
                    <StarCruiser />
                </group>

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    )
}

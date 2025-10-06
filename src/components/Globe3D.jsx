import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

const Globe = ({ onLocationClick, selectedLocation }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(null);
  
  // Major cities with coordinates
  const cities = [
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Berlin', lat: 52.5200, lon: 13.4050 },
    { name: 'Rome', lat: 41.9028, lon: 12.4964 },
    { name: 'Barcelona', lat: 41.3851, lon: 2.1734 },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
    { name: 'Hong Kong', lat: 22.3193, lon: 114.1694 },
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
    { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
    { name: 'Toronto', lat: 43.6532, lon: -79.3832 }
  ];

  // Convert lat/lon to 3D coordinates
  const latLonToVector3 = (lat, lon, radius = 2) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Earth Sphere */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          map={new THREE.TextureLoader().load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')}
          bumpMap={new THREE.TextureLoader().load('https://unpkg.com/three-globe/example/img/earth-topology.png')}
          bumpScale={0.05}
        />
      </Sphere>

      {/* City Markers */}
      {cities.map((city, index) => {
        const position = latLonToVector3(city.lat, city.lon, 2.05);
        const isSelected = selectedLocation?.includes(city.name);
        
        return (
          <group key={city.name}>
            <Sphere
              position={[position.x, position.y, position.z]}
              args={[0.02, 8, 8]}
              onClick={() => onLocationClick(city.name)}
              onPointerOver={() => setHovered(city.name)}
              onPointerOut={() => setHovered(null)}
            >
              <meshBasicMaterial 
                color={isSelected ? '#FFD700' : hovered === city.name ? '#FF6B6B' : '#FF4444'} 
              />
            </Sphere>
            
            {(hovered === city.name || isSelected) && (
              <Text
                position={[position.x * 1.2, position.y * 1.2, position.z * 1.2]}
                fontSize={0.1}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {city.name}
              </Text>
            )}
          </group>
        );
      })}
    </group>
  );
};

const Globe3D = ({ onLocationSelect, selectedLocation }) => {
  const handleLocationClick = (cityName) => {
    onLocationSelect(cityName);
  };

  return (
    <div className="w-full h-96 glass rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Globe onLocationClick={handleLocationClick} selectedLocation={selectedLocation} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white/80 text-sm">
        <p>🌍 Click on red dots to explore weather</p>
        <p>🖱️ Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default Globe3D;
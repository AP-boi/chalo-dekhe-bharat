"use client";
import React, { useRef, useMemo, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { X, MapPin, Compass, ArrowRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// Types
// ============================================================================

export interface GlobeMarker {
  lat: number;
  lng: number;
  src: string;
  label?: string;
  size?: number;
  description?: string;
  state?: string;
  category?: string;
  linkHref?: string;
}

export interface Globe3DConfig {
  /** Globe radius */
  radius?: number;
  /** Globe base color (used as fallback or tint) */
  globeColor?: string;
  /** URL to the Earth texture map */
  textureUrl?: string;
  /** URL to the bump/elevation map for terrain */
  bumpMapUrl?: string;
  /** Whether to show atmosphere glow */
  showAtmosphere?: boolean;
  /** Atmosphere color */
  atmosphereColor?: string;
  /** Atmosphere intensity */
  atmosphereIntensity?: number;
  /** Atmosphere blur/softness (higher = more diffuse, default 3) */
  atmosphereBlur?: number;
  /** Terrain bump scale (0 = flat, higher = more pronounced) */
  bumpScale?: number;
  /** Auto rotate speed (0 = disabled) */
  autoRotateSpeed?: number;
  /** Enable zoom */
  enableZoom?: boolean;
  /** Enable pan */
  enablePan?: boolean;
  /** Min zoom distance */
  minDistance?: number;
  /** Max zoom distance */
  maxDistance?: number;
  /** Initial rotation */
  initialRotation?: { x: number; y: number };
  /** Marker default size */
  markerSize?: number;
  /** Show wireframe overlay */
  showWireframe?: boolean;
  /** Wireframe color */
  wireframeColor?: string;
  /** Ambient light intensity */
  ambientIntensity?: number;
  /** Point light intensity */
  pointLightIntensity?: number;
  /** Background color (null for transparent) */
  backgroundColor?: string | null;
}

interface Globe3DProps {
  /** Array of markers to display on the globe */
  markers?: GlobeMarker[];
  /** Globe configuration */
  config?: Globe3DConfig;
  /** Additional CSS classes */
  className?: string;
  /** Callback when a marker is clicked */
  onMarkerClick?: (marker: GlobeMarker) => void;
  /** Callback when a marker is hovered */
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

// ============================================================================
// Constants - Earth Texture URLs (NASA Blue Marble)
// ============================================================================

const DEFAULT_EARTH_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const DEFAULT_BUMP_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";

// ============================================================================
// Utility Functions
// ============================================================================

export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// ============================================================================
// Marker Component
// ============================================================================

interface MarkerProps {
  marker: GlobeMarker;
  radius: number;
  defaultSize: number;
  isSelected?: boolean;
  onClick?: (marker: GlobeMarker) => void;
  onHover?: (marker: GlobeMarker | null) => void;
}

function Marker({
  marker,
  radius,
  defaultSize,
  isSelected,
  onClick,
  onHover,
}: MarkerProps) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalActive, setIsModalActive] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const imageGroupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const surfacePosition = useMemo(() => {
    return latLngToVector3(marker.lat, marker.lng, radius * 1.001);
  }, [marker.lat, marker.lng, radius]);

  const topPosition = useMemo(() => {
    return latLngToVector3(marker.lat, marker.lng, radius * 1.18);
  }, [marker.lat, marker.lng, radius]);

  const lineHeight = topPosition.distanceTo(surfacePosition);

  useFrame(() => {
    if (typeof document !== 'undefined') {
      const modalOpen = document.body.style.overflow === 'hidden';
      if (modalOpen !== isModalActive) {
        setIsModalActive(modalOpen);
      }
    }

    if (!imageGroupRef.current) return;

    const worldPos = new THREE.Vector3();
    imageGroupRef.current.getWorldPosition(worldPos);

    const markerDirection = worldPos.clone().normalize();
    const cameraDirection = camera.position.clone().normalize();
    const dot = markerDirection.dot(cameraDirection);

    setIsVisible(dot > 0.05);
  });

  const handlePointerEnter = useCallback(() => {
    if (document.body.style.overflow === 'hidden') return;
    setHovered(true);
    onHover?.(marker);
  }, [marker, onHover]);

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    onHover?.(null);
  }, [onHover]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (document.body.style.overflow === 'hidden') return;
    onClick?.(marker);
  }, [marker, onClick]);

  const { lineCenter, lineQuaternion } = useMemo(() => {
    const center = surfacePosition.clone().lerp(topPosition, 0.5);
    const direction = topPosition.clone().sub(surfacePosition).normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

    return { lineCenter: center, lineQuaternion: quaternion };
  }, [surfacePosition, topPosition]);

  const isHighlighted = (hovered || isSelected) && !isModalActive;

  return (
    <group ref={groupRef} visible={isVisible}>
      <mesh position={lineCenter} quaternion={lineQuaternion}>
        <cylinderGeometry args={[0.003, 0.003, lineHeight, 8]} />
        <meshBasicMaterial
          color={isHighlighted ? "#FFB100" : "#94a3b8"}
          transparent
          opacity={isHighlighted ? 0.95 : 0.6}
        />
      </mesh>

      <mesh position={surfacePosition} quaternion={lineQuaternion}>
        <coneGeometry args={[0.018, 0.045, 8]} />
        <meshBasicMaterial color={isHighlighted ? "#FFB100" : "#FF6A2B"} />
      </mesh>

      <group ref={imageGroupRef} position={topPosition}>
        <Html
          transform
          center
          sprite
          distanceFactor={10}
          zIndexRange={[50, 0]}
          style={{
            pointerEvents: (isVisible && !isModalActive) ? "auto" : "none",
            opacity: (isVisible && !isModalActive) ? 1 : 0.2,
            transition: "opacity 0.2s ease-out, pointer-events 0.2s ease-out",
          }}
        >
          <div
            className={cn(
              "cursor-pointer overflow-hidden rounded-full bg-neutral-900 shadow-xl transition-all duration-300 relative group/marker",
              isHighlighted && "scale-135 ring-2 ring-[#FFB100] shadow-[0_0_20px_rgba(255,177,0,0.8)]",
              isModalActive && "pointer-events-none cursor-default opacity-40"
            )}
            style={{
              width: isHighlighted ? "22px" : "18px",
              height: isHighlighted ? "22px" : "18px",
            }}
            onMouseEnter={handlePointerEnter}
            onMouseLeave={handlePointerLeave}
            onClick={handleClick}
          >
            <img
              src={marker.src}
              alt={marker.label || "Marker"}
              className="h-full w-full object-cover"
              draggable={false}
            />

            {/* Hover Tooltip Tag */}
            {marker.label && !isModalActive && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/marker:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1B1410]/95 backdrop-blur-md border border-[#FF6A2B]/40 text-[#FFF6E9] text-[10px] font-bold tracking-wider whitespace-nowrap shadow-2xl z-50">
                <MapPin size={10} className="text-[#FF6A2B]" />
                <span>{marker.label}</span>
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
}

// ============================================================================
// Rotating Globe
// ============================================================================

interface RotatingGlobeProps {
  config: Required<Globe3DConfig>;
  markers: GlobeMarker[];
  selectedMarker: GlobeMarker | null;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

function RotatingGlobe({
  config,
  markers,
  selectedMarker,
  onMarkerClick,
  onMarkerHover,
}: RotatingGlobeProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [earthTexture, bumpTexture] = useTexture([
    config.textureUrl,
    config.bumpMapUrl,
  ]);

  useMemo(() => {
    if (earthTexture) {
      earthTexture.colorSpace = THREE.SRGBColorSpace;
      earthTexture.anisotropy = 16;
    }
    if (bumpTexture) {
      bumpTexture.anisotropy = 8;
    }
  }, [earthTexture, bumpTexture]);

  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius, 64, 64);
  }, [config.radius]);

  const wireframeGeometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius * 1.002, 32, 16);
  }, [config.radius]);

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={config.bumpScale * 0.05}
          roughness={0.7}
          metalness={0.0}
        />
      </mesh>

      {config.showWireframe && (
        <mesh geometry={wireframeGeometry}>
          <meshBasicMaterial
            color={config.wireframeColor}
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      )}

      {markers.map((marker, index) => (
        <Marker
          key={`marker-${index}-${marker.lat}-${marker.lng}`}
          marker={marker}
          radius={config.radius}
          defaultSize={config.markerSize}
          isSelected={selectedMarker?.label === marker.label}
          onClick={onMarkerClick}
          onHover={onMarkerHover}
        />
      ))}
    </group>
  );
}

// ============================================================================
// Atmosphere Component
// ============================================================================

interface AtmosphereProps {
  radius: number;
  color: string;
  intensity: number;
  blur: number;
}

function Atmosphere({ radius, color, intensity, blur }: AtmosphereProps) {
  const fresnelPower = Math.max(0.5, 5 - blur);

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        atmosphereColor: { value: new THREE.Color(color) },
        intensity: { value: intensity },
        fresnelPower: { value: fresnelPower },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 atmosphereColor;
        uniform float intensity;
        uniform float fresnelPower;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vPosition))), fresnelPower);
          gl_FragColor = vec4(atmosphereColor, fresnel * intensity);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
  }, [color, intensity, fresnelPower]);

  return (
    <mesh scale={[1.12, 1.12, 1.12]}>
      <sphereGeometry args={[radius, 64, 32]} />
      <primitive object={atmosphereMaterial} attach="material" />
    </mesh>
  );
}

// ============================================================================
// Scene Component with Smooth Camera Zoom & Target Lerping
// ============================================================================

interface SceneProps {
  markers: GlobeMarker[];
  config: Required<Globe3DConfig>;
  selectedMarker: GlobeMarker | null;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

function Scene({
  markers,
  config,
  selectedMarker,
  onMarkerClick,
  onMarkerHover,
}: SceneProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  // Initial camera placement focusing on India
  React.useEffect(() => {
    if (!selectedMarker) {
      const defaultPos = latLngToVector3(20.5937, 78.9629, config.radius * 3.5);
      camera.position.copy(defaultPos);
      camera.lookAt(0, 0, 0);
    }
  }, [camera, config.radius]);

  // Smooth lerp camera towards selected marker on click
  useFrame(() => {
    if (!controlsRef.current) return;

    if (selectedMarker) {
      // Zoomed in position offset
      const targetPos = latLngToVector3(
        selectedMarker.lat,
        selectedMarker.lng,
        config.radius * 2.3
      );
      camera.position.lerp(targetPos, 0.07);
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.07);
      controlsRef.current.update();
    } else {
      // Default viewpoint position when reset
      const defaultPos = latLngToVector3(20.5937, 78.9629, config.radius * 3.5);
      camera.position.lerp(defaultPos, 0.05);
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <ambientLight intensity={config.ambientIntensity} />
      <directionalLight
        position={[config.radius * 5, config.radius * 2, config.radius * 5]}
        intensity={config.pointLightIntensity}
        color="#ffffff"
      />
      <directionalLight
        position={[-config.radius * 3, config.radius, -config.radius * 2]}
        intensity={config.pointLightIntensity * 0.3}
        color="#88ccff"
      />

      <RotatingGlobe
        config={config}
        markers={markers}
        selectedMarker={selectedMarker}
        onMarkerClick={onMarkerClick}
        onMarkerHover={onMarkerHover}
      />

      {config.showAtmosphere && (
        <Atmosphere
          radius={config.radius}
          color={config.atmosphereColor}
          intensity={config.atmosphereIntensity}
          blur={config.atmosphereBlur}
        />
      )}

      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={config.enablePan}
        enableZoom={config.enableZoom}
        minDistance={config.minDistance}
        maxDistance={config.maxDistance}
        rotateSpeed={0.4}
        autoRotate={!selectedMarker && config.autoRotateSpeed > 0}
        autoRotateSpeed={config.autoRotateSpeed}
        enableDamping
        dampingFactor={0.1}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex shrink-0 flex-col items-center gap-3">
        <span className="inline-block shrink-0 text-sm text-neutral-400 font-body">
          Loading 3D Globe...
        </span>
      </div>
    </Html>
  );
}

const defaultConfig: Required<Globe3DConfig> = {
  radius: 2,
  globeColor: "#1a1a2e",
  textureUrl: DEFAULT_EARTH_TEXTURE,
  bumpMapUrl: DEFAULT_BUMP_TEXTURE,
  showAtmosphere: true,
  atmosphereColor: "#ff9933",
  atmosphereIntensity: 0.8,
  atmosphereBlur: 3,
  bumpScale: 2,
  autoRotateSpeed: 0.3,
  enableZoom: true,
  enablePan: false,
  minDistance: 2.2,
  maxDistance: 12,
  initialRotation: { x: 0, y: 0 },
  markerSize: 0.06,
  showWireframe: false,
  wireframeColor: "#FF6A2B",
  ambientIntensity: 0.6,
  pointLightIntensity: 1.5,
  backgroundColor: null,
};

export function Globe3D({
  markers = [],
  config = {},
  className,
  onMarkerClick,
  onMarkerHover,
}: Globe3DProps) {
  const [selectedMarker, setSelectedMarker] = useState<GlobeMarker | null>(null);
  const [zoomedPhoto, setZoomedPhoto] = useState<{ url: string; title: string; state?: string } | null>(null);
  const [photoScale, setPhotoScale] = useState(1);

  const mergedConfig = useMemo(
    () => ({ ...defaultConfig, ...config }),
    [config],
  );

  const handleMarkerClick = (marker: GlobeMarker) => {
    setSelectedMarker(marker);
    onMarkerClick?.(marker);
  };

  const handleResetView = () => {
    setSelectedMarker(null);
    setZoomedPhoto(null);
    setPhotoScale(1);
  };

  const handleOpenPhotoZoom = (url: string, title: string, state?: string) => {
    setZoomedPhoto({ url, title, state });
    setPhotoScale(1);
  };

  return (
    <div className={cn("relative h-[500px] w-full group overflow-hidden", className)}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, mergedConfig.radius * 3.5],
        }}
        style={{
          background: mergedConfig.backgroundColor || "transparent",
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene
            markers={markers}
            config={mergedConfig}
            selectedMarker={selectedMarker}
            onMarkerClick={handleMarkerClick}
            onMarkerHover={onMarkerHover}
          />
        </Suspense>
      </Canvas>

      {/* Floating Controls Overlay (Reset Button) */}
      {selectedMarker && (
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={handleResetView}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B1410]/90 backdrop-blur-md border border-[#FF6A2B]/40 text-[#FFF6E9] text-xs font-bold hover:bg-[#FF6A2B] hover:text-[#1B1410] transition-all shadow-xl cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Reset Globe View</span>
          </button>
        </div>
      )}

      {/* Floating Place Details Modal Card Overlay */}
      <AnimatePresence>
        {selectedMarker && !zoomedPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 p-5 rounded-2xl bg-[#1B1410]/92 backdrop-blur-2xl border border-[#FF6A2B]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-[#FFF6E9]"
          >
            <button
              onClick={() => setSelectedMarker(null)}
              aria-label="Close landmark details"
              className="absolute top-3 right-3 text-[#FFF6E9]/50 hover:text-[#FF6A2B] p-1 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-start gap-4">
              {/* Clickable Image Thumbnail with Zoom Overlay Hint */}
              <div 
                onClick={() => handleOpenPhotoZoom(selectedMarker.src, selectedMarker.label || "Landmark", selectedMarker.state)}
                className="relative group/photo cursor-pointer shrink-0 rounded-xl overflow-hidden border border-[#FF6A2B]/40 shadow-md hover:border-[#FFB100] transition-all"
                title="Click to Zoom Photo"
              >
                <img
                  src={selectedMarker.src}
                  alt={selectedMarker.label || "Landmark"}
                  className="w-20 h-20 object-cover group-hover/photo:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#1B1410]/50 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-[10px] font-bold text-[#FFB100] bg-[#1B1410]/80 px-1.5 py-0.5 rounded border border-[#FF6A2B]/40">
                    Zoom
                  </span>
                </div>
              </div>

              <div className="flex-1 pr-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#FFB100] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FFB100]/15 border border-[#FFB100]/30">
                    {selectedMarker.state || selectedMarker.category || "Heritage Landmark"}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#FFF6E9] leading-tight">
                  {selectedMarker.label}
                </h3>

                <p className="text-xs text-[#FFF6E9]/75 font-body line-clamp-3 mt-1.5 leading-relaxed">
                  {selectedMarker.description ||
                    `Explore the architectural wonder and rich historical heritage of ${selectedMarker.label} on your digital journey through India.`}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => handleOpenPhotoZoom(selectedMarker.src, selectedMarker.label || "Landmark", selectedMarker.state)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B1410] bg-[#FF6A2B] hover:bg-[#FFB100] px-4 py-2 rounded-full transition-all shadow-md cursor-pointer"
                  >
                    <Compass size={14} />
                    <span>Zoom Photo</span>
                    <ArrowRight size={14} />
                  </button>

                  <span className="text-[10px] font-mono text-stone-400">
                    {selectedMarker.lat.toFixed(2)}°N, {selectedMarker.lng.toFixed(2)}°E
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Interactive Picture Zoom Lightbox Modal */}
      <AnimatePresence>
        {zoomedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#1B1410]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6"
            onClick={() => setZoomedPhoto(null)}
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#FFB100] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FFB100]/15 border border-[#FFB100]/30">
                  {zoomedPhoto.state || "Landmark Photo"}
                </span>
                <h4 className="font-display text-lg font-bold text-[#FFF6E9]">
                  {zoomedPhoto.title}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoScale((prev) => Math.min(prev + 0.4, 3));
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#2A1F19] text-[#FFF6E9] hover:bg-[#FF6A2B] hover:text-[#1B1410] text-xs font-bold transition-all border border-[#FF6A2B]/30"
                  title="Zoom In"
                >
                  + Zoom In
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoScale((prev) => Math.max(prev - 0.4, 1));
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#2A1F19] text-[#FFF6E9] hover:bg-[#FF6A2B] hover:text-[#1B1410] text-xs font-bold transition-all border border-[#FF6A2B]/30"
                  title="Zoom Out"
                >
                  - Zoom Out
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedPhoto(null);
                  }}
                  className="p-1.5 rounded-full bg-[#2A1F19] text-[#FFF6E9] hover:text-[#FF6A2B] transition-colors border border-[#FF6A2B]/30"
                  title="Close Lightbox"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scalable Image Container */}
            <div 
              className="relative max-w-full max-h-[75%] overflow-hidden rounded-2xl border-2 border-[#FF6A2B]/40 shadow-[0_0_50px_rgba(255,106,43,0.3)] transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
              style={{ transform: `scale(${photoScale})` }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={zoomedPhoto.url}
                alt={zoomedPhoto.title}
                className="max-h-[65vh] w-auto object-contain rounded-xl"
              />
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-4 text-center">
              <p className="text-xs text-[#FFF6E9]/60 font-mono">
                Click anywhere outside or hit close to exit photo zoom ({photoScale.toFixed(1)}x)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Globe3D;



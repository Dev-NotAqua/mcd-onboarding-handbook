'use client'
import {
  useEffect,
  useRef,
  useState,
  useMemo,
  memo,
  useCallback
} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion
} from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card'
import {
  Home,
  ArrowLeft,
  FileQuestion,
  Sparkles,
  Rocket,
  Star,
  Satellite
} from 'lucide-react'

// --- TYPE DEFINITIONS ---
interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  speed: number
  twinklePhase: number
  twinkleSpeed: number
  color?: string
  layer: number
}

interface Particle {
  x: number
  y: number
  radius: number
  opacity: number
  speed: { x: number; y: number }
  rotation: number
  rotationSpeed: number
  color: string
  life: number
  maxLife: number
}

interface CosmicElement {
  id: number
  type: 'comet' | 'asteroid' | 'satellite' | 'planet'
  initialX: number
  initialY: number
  velocity: { vx: number; vy: number }
  size: number
  color?: string
  rotationSpeed?: number
}

// --- CUSTOM HOOKS ---

/**
 * Custom hook to track window dimensions.
 * @returns {{width: number, height: number}} The current window size.
 */
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    function onResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return size
}

/**
 * Custom hook to track the mouse position.
 * @returns {{x: number, y: number}} The current mouse position.
 */
function useMousePosition() {
  const mousePosRef = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  return mousePosRef
}

/**
 * Custom hook to detect the Konami code sequence.
 * @param {() => void} onActivate - The callback to run when the code is entered.
 */
function useKonamiCode(onActivate: () => void) {
  const code = useMemo(() => [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ], []);
  const positionRef = useRef(0);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    if (isActivated) return;
    
    const handler = (e: KeyboardEvent) => {
      if (e.key === code[positionRef.current]) {
        positionRef.current++;
        if (positionRef.current === code.length) {
          setIsActivated(true);
          onActivate();
          positionRef.current = 0;
        }
      } else {
        positionRef.current = 0;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [code, onActivate, isActivated]);

  return isActivated;
}


// --- STARFIELD COMPONENT ---
const Starfield = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const size = useWindowSize()
  const mousePosRef = useMousePosition()
  const animationFrameRef = useRef<number | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const starsRef = useRef<Star[]>([])
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || size.width === 0 || size.height === 0) return

    const ctx = canvas.getContext('2d')!
    canvas.width = size.width
    canvas.height = size.height

    // Initialize stars only once
    if (starsRef.current.length === 0) {
      const starLayers = [
        { count: 80, speed: 0.1, color: '#FFF' },   // Background
        { count: 50, speed: 0.3, color: '#DDD' },   // Middle
        { count: 20, speed: 0.5, color: '#FFA' }    // Foreground
      ]
      
      starsRef.current = starLayers.flatMap((layer, i) => 
        Array.from({ length: layer.count }, (): Star => ({
          x: Math.random() * size.width,
          y: Math.random() * size.height,
          radius: Math.random() * (i + 0.5),
          opacity: Math.random() * 0.8 + 0.2,
          speed: layer.speed * (Math.random() * 0.5 + 0.5),
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.005 + Math.random() * 0.02,
          color: layer.color,
          layer: i
        }))
      )
    }
    
    // Initialize nebula particles
    if (particlesRef.current.length === 0 && !shouldReduceMotion) {
      const nebulaColors = [
        'hsl(270, 100%, 70%)', // Purple
        'hsl(200, 100%, 70%)', // Blue
        'hsl(300, 100%, 70%)'  // Pink
      ]
      
      particlesRef.current = Array.from({ length: 40 }, (): Particle => ({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        speed: { 
          x: (Math.random() - 0.5) * 0.2, 
          y: (Math.random() - 0.5) * 0.2 
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
        life: 0,
        maxLife: 100 + Math.random() * 200
      }))
    }

    const animate = () => {
      ctx.clearRect(0, 0, size.width, size.height)

      // Draw cosmic background gradient
      const gradient = ctx.createRadialGradient(
        size.width / 2,
        size.height / 2,
        0,
        size.width / 2,
        size.height / 2,
        Math.max(size.width, size.height) * 0.8
      )
      gradient.addColorStop(0, 'rgba(30, 5, 40, 0.8)')
      gradient.addColorStop(0.5, 'rgba(10, 5, 30, 0.9)')
      gradient.addColorStop(1, '#090A0F')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size.width, size.height)
      
      // Draw nebula particles if motion is not reduced
      if (!shouldReduceMotion) {
        particlesRef.current.forEach((particle, i) => {
          particle.life++
          
          // Update position with gentle movement
          particle.x += particle.speed.x
          particle.y += particle.speed.y
          particle.rotation += particle.rotationSpeed
          
          // Mouse interaction - particles move away from cursor
          const dx = particle.x - mousePosRef.current.x
          const dy = particle.y - mousePosRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 200) {
            const force = (200 - distance) / 200
            particle.x += dx * force * 0.05
            particle.y += dy * force * 0.05
          }
          
          // Reset if out of bounds or life expired
          if (
            particle.x < -50 || 
            particle.x > size.width + 50 || 
            particle.y < -50 || 
            particle.y > size.height + 50 ||
            particle.life > particle.maxLife
          ) {
            particle.x = Math.random() * size.width
            particle.y = Math.random() * size.height
            particle.life = 0
          }
          
          // Draw particle
          ctx.save()
          ctx.translate(particle.x, particle.y)
          ctx.rotate((particle.rotation * Math.PI) / 180)
          
          // Particle glow effect
          const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.radius * 3)
          glow.addColorStop(0, `${particle.color}80`)
          glow.addColorStop(1, 'transparent')
          
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(0, 0, particle.radius * 3, 0, Math.PI * 2)
          ctx.fill()
          
          // Particle core
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(0, 0, particle.radius, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.restore()
        })
      }
      
      // Draw stars with parallax effect
      const parallaxX = (mousePosRef.current.x / size.width - 0.5) * 20
      const parallaxY = (mousePosRef.current.y / size.height - 0.5) * 20
      
      starsRef.current.forEach(star => {
        // Update twinkling effect
        if (!shouldReduceMotion) {
          star.twinklePhase += star.twinkleSpeed
        }
        const twinkleFactor = shouldReduceMotion ? 1 : (0.7 + 0.3 * Math.sin(star.twinklePhase))
        const finalOpacity = star.opacity * twinkleFactor
        
        // Apply parallax based on layer
        const parallaxOffsetX = parallaxX * (0.2 + star.layer * 0.3)
        const parallaxOffsetY = parallaxY * (0.2 + star.layer * 0.3)
        
        // Move stars downward with parallax
        star.y += star.speed
        
        // Reset stars that go off screen
        if (star.y > size.height) {
          star.y = -star.radius
          star.x = Math.random() * size.width
        }
        
        // Draw star
        ctx.beginPath()
        ctx.arc(
          star.x + parallaxOffsetX, 
          star.y + parallaxOffsetY, 
          star.radius, 
          0, 
          Math.PI * 2
        )
        
        ctx.fillStyle = `rgba(${parseInt(star.color!.slice(1, 3), 16) || 255}, ${parseInt(star.color!.slice(3, 5), 16) || 255}, ${parseInt(star.color!.slice(5, 7), 16) || 224}, ${finalOpacity})`
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [size, mousePosRef, shouldReduceMotion])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
        willChange: 'transform'
      }}
    />
  )
})
Starfield.displayName = 'Starfield'

// --- COSMIC ELEMENTS COMPONENT ---
const CosmicElements = memo(() => {
  const size = useWindowSize()
  const shouldReduceMotion = useReducedMotion()
  const cosmicElementsRef = useRef<CosmicElement[]>([])
  
  // Generate cosmic elements once
  useEffect(() => {
    if (cosmicElementsRef.current.length > 0 || shouldReduceMotion) return
    
    cosmicElementsRef.current = [
      // Comets
      ...Array.from({ length: 2 }, (_, i) => ({
        id: i,
        type: 'comet' as const,
        initialX: size.width + 50,
        initialY: Math.random() * size.height * 0.6,
        velocity: { 
          vx: -(Math.random() * 3 + 2), 
          vy: (Math.random() - 0.5) * 1 
        },
        size: Math.random() * 1.2 + 0.8,
        color: `hsl(${Math.random() * 40 + 180}, 100%, 80%)`
      })),
      
      // Asteroids
      ...Array.from({ length: 1 }, (_, i) => ({
        id: i + 10,
        type: 'asteroid' as const,
        initialX: Math.random() * size.width,
        initialY: -50,
        velocity: { 
          vx: (Math.random() - 0.5) * 0.5, 
          vy: Math.random() * 1.5 + 0.5 
        },
        size: Math.random() * 0.8 + 0.5,
        rotationSpeed: (Math.random() - 0.5) * 0.5
      })),
      
      // Satellites
      ...Array.from({ length: 1 }, (_, i) => ({
        id: i + 20,
        type: 'satellite' as const,
        initialX: -50,
        initialY: Math.random() * size.height,
        velocity: { 
          vx: Math.random() * 1.5 + 0.5, 
          vy: (Math.random() - 0.5) * 0.3 
        },
        size: Math.random() * 0.5 + 0.7
      }))
    ]
  }, [size, shouldReduceMotion])

  if (shouldReduceMotion || cosmicElementsRef.current.length === 0) {
    return null
  }

  return (
    <>
      {cosmicElementsRef.current.map(element => {
        const SUN_POSITION = { x: size.width / 2, y: size.height / 2 }
        const GRAVITY = 0.0005
        const DRAG_COEFFICIENT = 0.005
        
        const getVisuals = () => {
          switch (element.type) {
            case 'comet':
              return (
                <div
                  key={element.id}
                  className="fixed z-10 pointer-events-none"
                  style={{
                    left: `${element.initialX}px`,
                    top: `${element.initialY}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Comet tail */}
                  <div
                    style={{
                      width: `${200 * element.size}px`,
                      height: `${5 * element.size}px`,
                      background: `linear-gradient(to left, ${element.color}99, transparent)`,
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      opacity: 0.8,
                      filter: 'blur(4px)',
                      position: 'absolute',
                    }}
                  />
                  {/* Comet head */}
                  <div
                    style={{
                      width: `${15 * element.size}px`,
                      height: `${15 * element.size}px`,
                      background: `radial-gradient(circle, ${element.color} 20%, transparent 70%)`,
                      borderRadius: '50%',
                      filter: `blur(${element.size > 1.5 ? 8 : 6}px)`,
                      position: 'absolute',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>
              )
            
            case 'asteroid':
              return (
                <div
                  key={element.id}
                  className="fixed z-10 pointer-events-none"
                  style={{
                    left: `${element.initialX}px`,
                    top: `${element.initialY}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: `${30 * element.size}px`,
                      height: `${30 * element.size}px`,
                      background: `radial-gradient(circle, #8B4513, #5D4037)`,
                      boxShadow: 'inset -5px -5px 15px #3E2723, inset 5px 5px 10px #A52A2A',
                      border: '1px solid #D2B48C'
                    }}
                  >
                    {/* Crater details */}
                    <div 
                      className="absolute rounded-full"
                      style={{ 
                        width: `${30 * element.size * 0.3}px`,
                        height: `${30 * element.size * 0.3}px`,
                        background: 'rgba(0,0,0,0.3)',
                        top: '30%',
                        left: '40%'
                      }} 
                    />
                    <div 
                      className="absolute rounded-full"
                      style={{ 
                        width: `${30 * element.size * 0.2}px`,
                        height: `${30 * element.size * 0.2}px`,
                        background: 'rgba(0,0,0,0.2)',
                        top: '60%',
                        left: '20%'
                      }} 
                    />
                  </div>
                </div>
              )
            
            case 'satellite':
              return (
                <div
                  key={element.id}
                  className="fixed z-10 pointer-events-none"
                  style={{
                    left: `${element.initialX}px`,
                    top: `${element.initialY}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Satellite body */}
                  <div
                    className="rounded-lg"
                    style={{
                      width: `${20 * element.size}px`,
                      height: `${20 * element.size * 0.6}px`,
                      background: 'linear-gradient(to right, #E0E0E0, #B0BEC5)',
                      border: '1px solid #90A4AE',
                      boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                    }}
                  >
                    {/* Solar panels */}
                    <div 
                      className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full"
                      style={{ 
                        width: `${20 * element.size * 2}px`,
                        height: `${20 * element.size * 0.3}px`,
                        background: 'linear-gradient(to right, #2196F3, #1976D2)',
                        border: '1px solid #0D47A1'
                      }} 
                    />
                    <div 
                      className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-full"
                      style={{ 
                        width: `${20 * element.size * 2}px`,
                        height: `${20 * element.size * 0.3}px`,
                        background: 'linear-gradient(to right, #2196F3, #1976D2)',
                        border: '1px solid #0D47A1'
                      }} 
                    />
                    {/* Antenna */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 right-2"
                      style={{ 
                        width: '4px',
                        height: `${20 * element.size * 0.4}px`,
                        background: '#616161'
                      }} 
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 right-2"
                      style={{ 
                        width: '10px',
                        height: '10px',
                        background: '#FF5722',
                        borderRadius: '50%',
                        top: '-5px'
                      }} 
                    />
                  </div>
                </div>
              )
          }
        }
        
        return getVisuals()
      })}
    </>
  )
})
CosmicElements.displayName = 'CosmicElements'

// --- MAIN PAGE COMPONENT ---
export default function NotFound() {
  const router = useRouter()
  const controls = useAnimation()
  const warpControls = useAnimation()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { width, height } = useWindowSize()
  const shouldReduceMotion = useReducedMotion()
  const [warpProgress, setWarpProgress] = useState(0)
  const [showWarpEffect, setShowWarpEffect] = useState(false)
  const isKonamiActivated = useKonamiCode(() => {
    setShowWarpEffect(true)
    warpControls.start({
      scale: [1, 1.2, 1],
      rotate: [0, 360, 0],
      transition: { duration: 1, ease: "easeInOut" }
    }).then(() => {
      // Create warp animation effect
      animate(0, 100, {
        duration: 0.5,
        onUpdate(latest) {
          setWarpProgress(latest)
        },
        onComplete: () => {
          router.push('/')
        }
      })
    })
  })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [mouseX, mouseY])

  const cardX = useTransform(mouseX, [0, width], [-20, 20])
  const cardY = useTransform(mouseY, [0, height], [-20, 20])
  const cardScale = useTransform(
    [cardX, cardY],
    (values: number[]) => {
      const [x, y] = values
      return Math.min(1 + Math.sqrt(x * x + y * y) / 200, 1.05)
    }
  )

  useEffect(() => {
    const sequence = async () => {
      // Initial fade in
      await controls.start({ 
        opacity: 0, 
        y: 50, 
        scale: 0.9 
      })
      
      // Card entry
      await controls.start({ 
        opacity: 1, 
        y: 0, 
        scale: 1.02,
        transition: { 
          duration: 0.6,
          ease: "backOut"
        } 
      })
      
      // Gentle bounce
      await controls.start({ 
        scale: 1,
        transition: { 
          type: "spring",
          damping: 15,
          stiffness: 200
        }
      })
    }
    
    if (!shouldReduceMotion) {
      sequence()
    } else {
      controls.start({ opacity: 1, y: 0, scale: 1 });
    }
  }, [controls, shouldReduceMotion])

  const handleWarpEffect = (isActive: boolean) => {
    setShowWarpEffect(isActive)
    if (isActive) {
      const warpAnimation = animate(0, 100, {
        duration: 0.5,
        onUpdate(latest) {
          setWarpProgress(latest)
        }
      })
      
      return () => warpAnimation.stop()
    } else {
      setWarpProgress(0)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-[#090A0F]">
      <Starfield />
      
      {/* Cosmic elements */}
      <CosmicElements />
      
      {/* Warp effect overlay */}
      {showWarpEffect && (
        <motion.div
          className="fixed inset-0 z-40 pointer-events-none"
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(138, 43, 226, ${0.3 - warpProgress/300}) ${warpProgress}%,
              transparent ${warpProgress + 5}%
            )`
          }}
          animate={warpControls}
        />
      )}
      
      {/* 404 Card */}
      <motion.div
        style={{ 
          x: shouldReduceMotion ? 0 : cardX, 
          y: shouldReduceMotion ? 0 : cardY,
          scale: shouldReduceMotion ? 1 : cardScale
        }}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={controls}
        className="relative z-30"
      >
        <Card className="max-w-lg p-0 overflow-hidden text-white bg-black/20 border-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(138,43,226,0.15)] transition-all duration-300 hover:shadow-[0_0_70px_rgba(138,43,226,0.25)]">
          {/* Interactive background glow */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(147,51,234,0.3) 0%, transparent 50%)`,
            }}
          />
          
          {/* Card content */}
          <CardContent className="relative flex flex-col items-center justify-center p-8 space-y-6 text-center">
            {/* Floating icon with enhanced animation */}
            <motion.div
              animate={shouldReduceMotion ? {} : { 
                y: [0, -15, 0],
                rotate: [0, 5, -5, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="group relative flex items-center justify-center w-24 h-24 mx-auto rounded-full border-2 border-yellow-500/30 bg-gradient-to-br from-purple-500/20 to-yellow-500/20"
            >
              {/* Orbiting stars */}
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0"
              >
                <Star className="absolute text-yellow-300" size={12} style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                <Star className="absolute text-purple-300" size={10} style={{ top: '50%', left: '90%', transform: 'translate(-50%, -50%)' }} />
                <Star className="absolute text-blue-300" size={8} style={{ bottom: '20%', left: '20%', transform: 'translate(-50%, -50%)' }} />
              </motion.div>
              
              {/* Main icon with pulse effect */}
              <motion.div
                animate={shouldReduceMotion ? {} : { 
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FileQuestion className="w-12 h-12 text-yellow-400" />
              </motion.div>
            </motion.div>
            
            {/* Heading with enhanced animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-2"
            >
              <CardTitle className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                404 – Lost in Space
              </CardTitle>
              <CardDescription className="text-xl text-gray-300 max-w-md mx-auto">
                This page has drifted into an uncharted nebula beyond the event horizon.
              </CardDescription>
            </motion.div>
            
            {/* Action buttons */}
            <div className="flex flex-col w-full gap-5 mt-2">
              {/* Back button with warp effect */}
              <motion.div 
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => !shouldReduceMotion && handleWarpEffect(true)}
                onHoverEnd={() => !shouldReduceMotion && handleWarpEffect(false)}
                className="relative"
              >
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="w-full text-white border-purple-400/30 hover:bg-purple-400/15 hover:border-purple-400/60 transition-all duration-200 overflow-hidden group relative z-10 py-6 text-lg"
                >
                  <span className="z-10 relative flex items-center justify-center">
                    <Rocket className="w-5 h-5 mr-3 transform group-hover:translate-x-1 transition-transform" />
                    Engage Reverse Thrusters
                  </span>
                  {/* Warp trail effect */}
                  <motion.div
                    initial={{ x: '100%' }}
                    whileHover={{ x: '-100%' }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </Button>
              </motion.div>
              
              {/* Home button with enhanced effect */}
              <motion.div 
                whileHover={{ 
                  scale: 1.07,
                  boxShadow: "0 0 30px rgba(138, 43, 226, 0.5)"
                }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/" className="w-full block">
                  <Button className="relative w-full text-primary-foreground bg-gradient-to-r from-purple-600 to-indigo-900 shadow-lg hover:shadow-2xl transition-all duration-200 overflow-hidden group py-6 text-lg">
                    <span className="z-10 relative flex items-center justify-center">
                      <Home className="w-5 h-5 mr-3 transform group-hover:-translate-y-1 transition-transform" />
                      Return to MC&D Handbook
                    </span>
                    {/* Energy pulse effect */}
                    <motion.div
                      animate={shouldReduceMotion ? {} : {
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-300/20 to-transparent"
                    />
                    {/* Hover glow */}
                    <motion.div
                      initial={{ y: '100%' }}
                      whileHover={{ y: '-100%' }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-300/15 to-transparent"
                    />
                  </Button>
                </Link>
              </motion.div>
            </div>
            
            {/* Additional cosmic info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-4 text-sm text-gray-400 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              You're {Math.floor(Math.random() * 9000) + 1000} lightyears from home
              <Sparkles className="w-4 h-4 text-purple-400" />
            </motion.div>
            
            {/* Easter egg hint */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-2 text-xs text-gray-500 italic"
            >
              *Try pressing ↑↑↓↓←→←→BA for warp speed
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
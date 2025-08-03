'use client'

import { useEffect, useRef, useState, useMemo, memo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Home, ArrowLeft, FileQuestion } from 'lucide-react'

// Define the shape of a star for type safety
interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  speed: number
  twinklePhase: number
  twinkleSpeed: number
}

/**
 * Renders a performant starfield using an HTML canvas.
 */
const Starfield = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const starsRef = useRef<Star[]>([])

  // Track window size
  useEffect(() => {
    function onResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Initialize and animate starfield
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || size.width === 0) return

    // Assert non-null context
    const ctx = canvas.getContext('2d')!
    canvas.width = size.width
    canvas.height = size.height

    // Create stars only once
    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: 150 }, (): Star => ({
        x: Math.random() * size.width,
        y: Math.random() * size.height,
        radius: Math.random() * 1.2,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.01 + Math.random() * 0.03,
      }))
    }

    let frameId: number
    let lastTime = performance.now()

    function animate(now: number) {
      const delta = now - lastTime
      lastTime = now
      const deltaTime = delta / 16.67

      const gradient = ctx.createRadialGradient(
        size.width / 2,
        size.height / 2,
        0,
        size.width / 2,
        size.height / 2,
        Math.max(size.width, size.height)
      )
      gradient.addColorStop(0, 'rgba(40, 20, 60, 0.2)')
      gradient.addColorStop(0.5, 'rgba(15, 10, 30, 0.5)')
      gradient.addColorStop(1, '#090A0F')

      ctx.clearRect(0, 0, size.width, size.height)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size.width, size.height)

      for (const star of starsRef.current) {
        star.twinklePhase += star.twinkleSpeed * deltaTime
        const twinkleFactor = 0.7 + 0.3 * Math.sin(star.twinklePhase)
        const finalOpacity = star.opacity * twinkleFactor

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`
        ctx.fill()

        star.y += (star.speed * delta) / 16
        if (star.y > size.height) {
          star.y = -star.radius
          star.x = Math.random() * size.width
        }
      }

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)' }}
    />
  )
})
Starfield.displayName = 'Starfield'

interface CometProps {
  id: number
  initialX: number
  initialY: number
  velocity: { vx: number; vy: number }
  size: number
  color: string
}

/**
 * Simulates a distant comet moving slowly across the sky.
 */
const Comet = memo<CometProps>(({ id, initialX, initialY, velocity, size, color }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: initialX, y: initialY })

  useEffect(() => {
    let animationFrameId: number
    const animate = () => {
      setPosition(prev => {
        const newX = prev.x + velocity.vx
        const newY = prev.y + velocity.vy
        if (
          newX > window.innerWidth + 200 ||
          newX < -200 ||
          newY > window.innerHeight + 200 ||
          newY < -200
        ) {
          return { x: initialX, y: initialY }
        }
        return { x: newX, y: newY }
      })
      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [initialX, initialY, velocity.vx, velocity.vy])

  const sunPosition = { x: window.innerWidth / 2, y: -500 }
  const angleFromSun =
    (Math.atan2(position.y - sunPosition.y, position.x - sunPosition.x) * 180) / Math.PI
  const comaSize = 15 * size
  const tailLength = 150 * size

  return (
    <div
      className="fixed z-10 pointer-events-none"
      style={{ left: position.x, top: position.y }}
    >
      <div
        style={{
          width: `${tailLength}px`,
          height: `${3 * size}px`,
          background: `linear-gradient(to left, ${color}99, transparent)`,
          borderRadius: '50%',
          transform: `rotate(${angleFromSun}deg) translate(-${tailLength / 2}px, 0)`,
          transformOrigin: 'center left',
          opacity: 0.8,
          filter: 'blur(3px)',
          position: 'absolute',
        }}
      />
      <div
        style={{
          width: `${comaSize}px`,
          height: `${comaSize}px`,
          background: `radial-gradient(circle, ${color} 20%, transparent 70%)`,
          borderRadius: '50%',
          filter: `blur(${size > 1.5 ? 6 : 4}px)`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
})
Comet.displayName = 'Comet'

export default function NotFound() {
  const router = useRouter()
  const controls = useAnimation()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [viewport, setViewport] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    function onResize() {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [mouseX, mouseY])

  const cardX = useTransform(mouseX, [0, viewport.width], [-15, 15])
  const cardY = useTransform(mouseY, [0, viewport.height], [-15, 15])

  useEffect(() => {
    controls
      .start({ opacity: 0, y: 20, scale: 0.95 })
      .then(() => controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } }))
      .then(() => controls.start({ scale: 1, transition: { type: 'spring', damping: 15 } }))
  }, [controls])

  const comets = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        initialX: Math.random() * viewport.width,
        initialY: Math.random() * viewport.height,
        velocity: { vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 },
        size: Math.random() * 1.5 + 0.8,
        color: `hsl(${Math.random() * 40 + 180}, 100%, 80%)`,
      })),
    [viewport]
  )

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-[#090A0F]">
      <Starfield />
      {comets.map(comet => (
        <Comet key={comet.id} {...comet} />
      ))}

      <motion.div
        style={{ x: cardX, y: cardY }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={controls}
        className="relative z-20"
      >
        <Card className="max-w-lg p-0 overflow-hidden text-white bg-black/20 border-white/10 backdrop-blur-xl shadow-[0 0 50px rgba(138,43,226,0.15)]">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(147,51,234,0.2) 0%, transparent 40%)`,
            }}
          />
          <CardContent className="relative flex flex-col items-center justify-center p-8 space-y-6 text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center justify-center w-24 h-24 mx-auto rounded-full border-2 border-yellow-500/30 bg-gradient-to-br from-purple-500/20 to-yellow-500/20"
            >
              <FileQuestion className="w-12 h-12 text-yellow-400" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-2"
            >
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
                404 – Lost in Space
              </CardTitle>
              <CardDescription className="text-gray-300">
                This page has drifted into an uncharted nebula.
              </CardDescription>
            </motion.div>
            <div className="flex flex-col w-full gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="w-full text-white border-purple-400/30 hover:bg-purple-400/10 hover:border-purple-400/50 transition-all duration-200 overflow-hidden group"
                >
                  <span className="z-10 relative flex items-center justify-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Engage Reverse Thrusters
                  </span>
                  <motion.div
                    initial={{ x: '100%' }}
                    whileHover={{ x: '-100%' }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/" className="w-full block">
                  <Button className="relative w-full text-primary-foreground bg-gradient-to-r from-purple-600 to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group">
                    <span className="z-10 relative flex items-center justify-center">
                      <Home className="w-4 h-4 mr-2" />
                      Return to Mothership
                    </span>
                    <motion.div
                      initial={{ y: '100%' }}
                      whileHover={{ y: '-100%' }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-300/10 to-transparent"
                    />
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-4 text-sm text-gray-400"
            >
              A great 404 experience informs, entertains, and guides users back.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
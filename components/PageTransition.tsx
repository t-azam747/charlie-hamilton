'use client'

import { motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1]

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#36342bff',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />
      {children}
    </>
  )
}

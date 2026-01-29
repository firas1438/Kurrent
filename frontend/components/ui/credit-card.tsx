'use client'

import * as React from 'react'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { CreditCard as CreditCardIcon } from 'lucide-react'


export type CardStyle = 'base' | 'shiny-silver' | 'amex-green' | 'amex-black' | 'metal'

const cardStyles: Record<CardStyle, string> = {
  base: 'bg-gradient-to-br from-card via-white/12 to-card/60 border text-card-foreground shadow-sm dark:via-white/2 dark:to-card/85',
  'shiny-silver': 'bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 border-gray-200 text-gray-800 shadow-xl',
  'amex-green': 'bg-gradient-to-br from-green-700 via-green-600 to-green-800 border-green-500 text-white shadow-xl',
  'amex-black': 'bg-gradient-to-br from-gray-900 via-black to-gray-800 border-gray-600 text-white shadow-2xl',
  metal: 'bg-gradient-to-br from-slate-600 via-slate-500 to-slate-700 border-slate-400 text-white shadow-2xl backdrop-blur-sm',
}

export interface CreditCardValue {
  cardholderName: string
  cardNumber: string
  cin: string
}

export interface CreditCardProps {
  value?: CreditCardValue
  className?: string
  cardStyle?: CardStyle
}

function CreditCard({
  value,
  className,
  cardStyle = 'base',
}: CreditCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]))
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]))

  const containerRef = useRef<HTMLDivElement>(null)

  const currentValue = value || {
    cardholderName: '',
    cardNumber: '',
    cin: '',
  }

  const formatCardNumber = (val: string) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const parts: string[] = []
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4))
    }
    return parts.join(' ') || '•••• •••• •••• ••••'
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div ref={containerRef} className={cn('w-full max-w-sm py-2', className)}>
      {/* card preview */}
      <div className="relative h-56 mb-6 perspective-[1000px]">
        <motion.div
          className="relative w-full h-full transform-3d"
          style={{ rotateX, rotateY }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Card
            className={cn(
              'absolute inset-0 w-full h-full p-6 flex flex-col justify-between backface-hidden shadow-xl',
              cardStyles[cardStyle]
            )}
          >
            <div className="flex justify-between items-start">
              <div className={cn('w-12 h-8 rounded shadow-md bg-yellow-400')} />
            </div>

            <div className="space-y-4">
              
              {/* Card number */}
              <div className="text-xl font-mono tracking-wider font-bold">
                {formatCardNumber(currentValue.cardNumber)}
              </div>

              <div className="flex justify-between items-end">

                {/* Card holder */}
                <div className="flex-1">
                  <div className="text-xs opacity-70 uppercase font-medium">
                    Card Holder
                  </div>
                  <div className="font-bold text-sm">
                    {currentValue.cardholderName.toUpperCase() || 'YOUR NAME'}
                  </div>
                </div>

                {/* CIN */}
                <div>
                  <div className="text-xs opacity-70 uppercase font-medium">
                    CIN
                  </div>
                  <div className="font-mono font-bold text-sm">
                    {currentValue.cin || '12345678'}
                  </div>
                </div>

                <div className="flex-1 flex justify-end">
                  <CreditCardIcon className="w-10 h-6 opacity-60" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

    </div>
  )
}

CreditCard.displayName = 'CreditCard'
export { CreditCard }
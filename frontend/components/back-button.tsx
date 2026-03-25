'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function BackButton() {
  const router = useRouter()

  return (
    <Link href="/" passHref>
      <Button asChild variant="ghost" className="rounded-xl">
        <span>
          <ArrowLeft className="h-4 w-4" /> Return
        </span>
      </Button>
    </Link>
  )
}

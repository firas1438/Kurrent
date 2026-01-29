import { GalleryVerticalEnd } from "lucide-react"

export default function Logo() {
  return (
    <div>
      <div className="flex items-center gap-2 font-medium">
        <div className="bg-primary text-primary-foreground flex w-8 h-8 items-center justify-center rounded-md">
          <GalleryVerticalEnd className="w-4 h-4" />
        </div>
        <span className="text-lg md:text-base">Kurrent</span>
      </div>
    </div>
  )
}

"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

const Carousel = ({ children, title, className = "" }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef(null)

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth,
      )
    }
  }

  const scrollLeft = () => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" })
      setTimeout(checkScrollButtons, 300)
    }
  }

  const scrollRight = () => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" })
      setTimeout(checkScrollButtons, 300)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Título da seção */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase text-gray-400">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Container do carrossel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden"
        onScroll={checkScrollButtons}
      >
        {children}
      </div>
    </div>
  )
}

export default Carousel

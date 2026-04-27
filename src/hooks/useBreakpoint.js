import { useState, useEffect } from 'react'

function getBreakpoint(width) {
  if (width > 1024) return 'desktop'
  if (width > 768) return 'tablet'
  return 'mobile'
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(() => getBreakpoint(window.innerWidth))

  useEffect(() => {
    const handler = () => setBreakpoint(getBreakpoint(window.innerWidth))
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return breakpoint
}

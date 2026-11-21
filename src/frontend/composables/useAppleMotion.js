export const prefersReducedMotion = () => {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export const staggerMountElements = (rootEl, selector, maxItems = 12) => {
  if (!rootEl || prefersReducedMotion()) return

  const targets = Array.from(rootEl.querySelectorAll(selector)).slice(0, maxItems)
  targets.forEach((el, index) => {
    if (typeof el.animate !== 'function') return

    const anim = el.animate(
      [
        { opacity: 0.01, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      {
        duration: 260,
        delay: index * 32,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'both'
      }
    )

    anim.addEventListener('finish', () => {
      el.style.opacity = ''
      el.style.transform = ''
      try {
        anim.cancel()
      } catch {
        // Ignore cleanup errors on detached nodes
      }
    })
  })
}

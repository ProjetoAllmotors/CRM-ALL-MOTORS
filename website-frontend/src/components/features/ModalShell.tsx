import { useEffect, useRef } from 'react'
import type { KeyboardEvent, ReactNode, MouseEvent } from 'react'
import { X } from 'lucide-react'

interface ModalShellProps {
  title?: string
  description?: string
  children: ReactNode
  onClose(): void
  size?: 'medium' | 'large' | 'frame'
}

export function ModalShell({ title, description, children, onClose, size = 'medium' }: ModalShellProps) {
  const dialogRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [onClose])

  function closeFromBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose()
  }

  function keepFocusInDialog(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== 'Tab') return
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
    if (!focusable?.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={closeFromBackdrop}
    >
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={title ? 'quick-dialog-title' : undefined} aria-label={title ? undefined : 'Confirmação'} onKeyDown={keepFocusInDialog} className={`relative my-auto max-h-[calc(100dvh-1.5rem)] w-full overflow-y-auto rounded-xl border border-border bg-elevated p-5 shadow-2xl sm:p-6 ${size === 'frame' ? 'h-[550px] max-w-[600px]' : size === 'large' ? 'max-w-[600px]' : 'max-w-[560px]'}`}>
        <button ref={closeButtonRef} type="button" aria-label="Fechar janela" onClick={onClose} className="absolute right-4 top-4 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-raised hover:text-white">
          <X className="h-4 w-4" />
        </button>
        {title && <h2 id="quick-dialog-title" className="pr-10 font-heading text-lg font-semibold">{title}</h2>}
        {description && <p className="mt-1 pr-8 text-[10px] text-slate-400">{description}</p>}
        <div className="mt-5">{children}</div>
      </section>
    </div>
  )
}

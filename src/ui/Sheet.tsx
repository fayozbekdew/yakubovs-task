import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

interface SheetProps {
  open: boolean
  title: string
  eyebrow?: string
  onClose: () => void
  children: ReactNode
}

export function Sheet({ open, title, eyebrow, onClose, children }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog?.open) dialog?.showModal()
    if (!open && dialog?.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => event.target === ref.current && onClose()}
      className="border-line-strong bg-surface text-ink open:animate-sheet-in fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-[520px] border-l p-0"
    >
      <div className="flex h-full flex-col">
        <header className="border-line flex items-start justify-between gap-4 border-b px-6 py-5">
          <div>
            {eyebrow && <p className="text-ink-3 font-mono text-[11px] tracking-wider uppercase">{eyebrow}</p>}
            <h2 className="mt-0.5 text-lg font-semibold">{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="text-ink-3 hover:bg-sunken hover:text-ink -mr-2 rounded p-1.5"
          >
            <X size={18} />
          </button>
        </header>
        {open && children}
      </div>
    </dialog>
  )
}

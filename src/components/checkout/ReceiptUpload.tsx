import { useRef, useState } from 'react'
import { validateFile } from '../../utils/security'

interface Props {
  cedula: string
  onFile: (file: File | null) => void
  file: File | null
}

export default function ReceiptUpload({ cedula, onFile, file }: Props) {
  const inputRef   = useRef<HTMLInputElement>(null)
  const [dragging, setDragging]   = useState(false)
  const [preview,  setPreview]    = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  function handleFile(f: File) {
    const error = validateFile(f)
    if (error) {
      setFileError(error)
      onFile(null)
      return
    }
    setFileError(null)
    onFile(f)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(f)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }

  function remove() {
    onFile(null)
    setPreview(null)
    setFileError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const ext       = file?.name.split('.').pop() ?? 'jpg'
  const finalName = cedula ? `${cedula}.${ext}` : `comprobante.${ext}`
  const sizeMB    = file ? (file.size / 1024 / 1024).toFixed(1) : null

  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        background: 'linear-gradient(145deg, rgba(26,15,5,0.95), rgba(13,10,8,0.98))',
        border: '1px solid rgba(255,107,26,0.2)',
      }}
    >
      <h2 className="text-bebas mb-1" style={{ fontSize: '1.5rem', color: '#FFF0D4' }}>
        Comprobante de pago
      </h2>
      <p className="text-oswald text-xs mb-5 tracking-wide" style={{ color: 'rgba(255,240,212,0.4)' }}>
        Sube el pantallazo del pago en Nequi · JPG, PNG, WEBP · Máx. 5MB
      </p>

      {/* Zona de drop */}
      {!preview ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center gap-3 rounded-xl transition-all duration-200 cursor-pointer"
          style={{
            minHeight: '160px',
            border: `2px dashed ${fileError ? 'rgba(204,34,0,0.5)' : dragging ? '#FFD700' : 'rgba(255,107,26,0.3)'}`,
            background: dragging ? 'rgba(255,215,0,0.05)' : fileError ? 'rgba(204,34,0,0.04)' : 'rgba(13,10,8,0.5)',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>{fileError ? '⚠️' : '📸'}</span>
          <div className="text-center px-4">
            <p className="text-oswald font-semibold text-sm" style={{ color: fileError ? '#f87171' : '#FFF0D4' }}>
              {fileError ?? 'Arrastra el comprobante aquí'}
            </p>
            <p className="text-oswald text-xs mt-1" style={{ color: 'rgba(255,240,212,0.4)' }}>
              {fileError ? 'Toca para elegir otro archivo' : 'o toca para seleccionar'}
            </p>
          </div>
        </div>
      ) : (
        /* Preview */
        <div className="relative rounded-xl overflow-hidden" style={{ border: '2px solid rgba(255,215,0,0.3)' }}>
          <img src={preview} alt="Comprobante" className="w-full object-cover max-h-64" />
          <div
            className="absolute inset-0 flex items-end p-3"
            style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(13,10,8,0.9) 100%)' }}
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-oswald text-xs" style={{ color: 'rgba(255,240,212,0.5)' }}>
                  {finalName} {sizeMB && <span style={{ color: 'rgba(255,240,212,0.35)' }}>· {sizeMB}MB</span>}
                </p>
                <p className="text-oswald font-semibold text-xs mt-0.5" style={{ color: '#4ade80' }}>
                  ✓ Imagen válida
                </p>
              </div>
              <button
                type="button"
                onClick={remove}
                className="text-oswald text-xs px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(204,34,0,0.2)', border: '1px solid rgba(204,34,0,0.4)', color: '#FF6B1A' }}
              >
                Cambiar
              </button>
            </div>
          </div>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleInput} />

      {!cedula && (
        <p className="text-oswald text-xs mt-3 flex items-center gap-1.5" style={{ color: 'rgba(255,107,26,0.6)' }}>
          ⚠ Ingresa tu cédula arriba para que el comprobante quede registrado correctamente
        </p>
      )}
    </div>
  )
}

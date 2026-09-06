'use client'

import React, { useState } from 'react'
import { UploadCloud, Loader2, CheckCircle2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void
  label?: string
}

export function CloudinaryUpload({ onUploadSuccess, label = "Haz clic para seleccionar imagen" }: CloudinaryUploadProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError(null)
    setPreview(URL.createObjectURL(file))

    const formData = new FormData()
    formData.append('file', file)
    
    // Configuración de Cloudinary (debe estar en el .env)
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset || cloudName === 'your_cloud_name') {
      setError('Falta configurar Cloudinary en el archivo .env')
      setLoading(false)
      return
    }

    formData.append('upload_preset', uploadPreset)

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        onUploadSuccess(data.secure_url)
      } else {
        throw new Error(data.error?.message || 'Error al subir la imagen')
      }
    } catch (err: any) {
      console.error('Error Cloudinary:', err)
      setError(err.message || 'Error de conexión')
      setPreview(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <label className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors overflow-hidden ${preview ? 'border-emerald-500 bg-emerald-500/5' : 'border-zinc-700 bg-zinc-950 hover:bg-zinc-900'}`}>
        
        {preview && !loading && (
          <div className="absolute inset-0 w-full h-full">
            <Image src={preview} alt="Preview" fill className="object-cover opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
          </div>
        )}

        {!preview && (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
            {loading ? (
              <Loader2 className="w-8 h-8 mb-2 text-zinc-400 animate-spin" />
            ) : (
              <UploadCloud className="w-8 h-8 mb-2 text-zinc-500" />
            )}
            <p className="text-sm text-zinc-400 text-center px-4 font-mono">
              {loading ? 'Subiendo...' : label}
            </p>
          </div>
        )}

        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
          disabled={loading}
        />
      </label>

      {error && (
        <p className="text-red-400 text-xs mt-2 font-mono">{error}</p>
      )}
    </div>
  )
}

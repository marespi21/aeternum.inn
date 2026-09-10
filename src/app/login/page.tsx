'use client'

import { useState, Suspense, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Mail, Lock, AlertCircle, Check, X, Eye, EyeOff } from 'lucide-react'
import { login, signup } from './actions'
import { useSearchParams } from 'next/navigation'

function LoginContent() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const [isLogin, setIsLogin] = useState(mode !== 'signup')
  const [showPassword, setShowPassword] = useState(false)
  const error = searchParams.get('error')
  const message = searchParams.get('message')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  })
  const [isDirty, setIsDirty] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Prevenir salida accidental si hay datos sin guardar
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitting) {
        e.preventDefault()
        e.returnValue = '' // Requerido por la mayoría de los navegadores
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty, isSubmitting])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setIsDirty(true)
  }

  const passwordReqs = [
    { label: 'Mínimo 8 caracteres', met: formData.password.length >= 8 },
    { label: 'Una letra mayúscula', met: /[A-Z]/.test(formData.password) },
    { label: 'Una letra minúscula', met: /[a-z]/.test(formData.password) },
    { label: 'Un número', met: /[0-9]/.test(formData.password) },
    { label: 'Un carácter especial', met: /[^A-Za-z0-9]/.test(formData.password) },
  ]

  const isPasswordValid = passwordReqs.every(req => req.met)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!isLogin && !isPasswordValid) {
      e.preventDefault()
      // You can add a toast or error state here if needed, but the button will be visually disabled
      return
    }
    setIsSubmitting(true)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tighter mb-2">AETERNUM</h1>
          <p className="text-zinc-400">
            {isLogin ? 'Bienvenido de vuelta.' : 'Únete a la lista de invitados.'}
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{message}</p>
            </div>
          )}

          <form action={isLogin ? login : signup} onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="nextUrl" value={searchParams.get('next') || '/perfil'} />
            
            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-zinc-300">Nombre Completo</label>
                <input 
                  type="text" 
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                />
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                />
              </div>
            </div>

            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-zinc-300">Teléfono / WhatsApp</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+57 300 000 0000"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
              </motion.div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-zinc-300">Contraseña</label>
                {isLogin && (
                  <a href="/recuperar" className="text-xs text-zinc-400 hover:text-emerald-400 transition-colors">
                    ¿Olvidaste tu contraseña?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Requirements Checklist */}
              <AnimatePresence>
                {!isLogin && formData.password.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2 space-y-1.5"
                  >
                    {passwordReqs.map((req, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        {req.met ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-zinc-500" />
                        )}
                        <span className={req.met ? "text-emerald-400/90" : "text-zinc-500"}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              type="submit"
              disabled={!isLogin && !isPasswordValid}
              className={`w-full font-semibold rounded-xl py-3 flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                !isLogin && !isPasswordValid 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-zinc-200'
              }`}
            >
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => {
                setIsLogin(!isLogin)
                setFormData({ fullName: '', email: '', phone: '', password: '' })
                setIsDirty(false)
              }}
              type="button"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Cargando...</div>}>
      <LoginContent />
    </Suspense>
  )
}


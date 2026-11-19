import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const loginSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type LoginData = z.infer<typeof loginSchema>

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'operacao@allmotorsbrasil.com.br', password: 'demonstracao' },
  })

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 350))
    navigate('/dashboard')
  }

  return (
    <main className="grid min-h-screen bg-canvas text-slate-50 lg:grid-cols-2">
      <section className="flex flex-col bg-[#0B1A34] px-6 py-7 sm:px-12 lg:px-16">
        <div className="flex items-center gap-2 font-heading text-sm font-bold tracking-wide">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white">A</span>
          AIMA
        </div>
        <div className="mx-auto my-auto flex w-full max-w-lg flex-col py-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#66A5FF]">Energia que move vidas</p>
          <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
            O futuro da mobilidade.<br />Mais perto de você.
          </h1>
          <img
            src="/images/aima-k1-may.png"
            alt="Scooter elétrica AIMA K1-May"
            className="mt-6 aspect-square w-full max-w-[380px] self-center rounded-lg object-cover"
          />
          <p className="mt-5 text-xs font-semibold tracking-wide">AIMA K1-MAY</p>
          <p className="mt-1 text-[11px] text-slate-400">Mobilidade elétrica para transformar o Nordeste.</p>
          <p className="mt-6 text-[10px] tracking-[0.25em] text-[#8AB9FF]">PE&nbsp; • &nbsp;AL&nbsp; • &nbsp;PB&nbsp; • &nbsp;RN</p>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">CRM 360° / ALL MOTORS BRASIL</p>
          <p className="mt-2 text-[10px] text-slate-500">Ambiente demonstrativo</p>
          <h2 className="mt-12 font-heading text-2xl font-semibold">Bem-vindo de volta.</h2>
          <p className="mt-2 text-xs text-slate-400">Sua experiência começa com uma operação simples e segura.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-medium">E-mail</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="h-10 w-full rounded-md border border-[#26354D] bg-elevated px-3 text-xs text-slate-100"
                {...register('email')}
              />
              {errors.email && <p className="mt-1 text-[10px] text-rose-300">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-medium">Senha</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="h-10 w-full rounded-md border border-[#26354D] bg-elevated px-3 pr-12 text-xs text-slate-100"
                  {...register('password')}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 rounded-r-md px-3 text-[10px] text-slate-300 hover:bg-slate-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-[10px] text-rose-300">{errors.password.message}</p>}
            </div>
            <Link to="/recuperar-senha" className="block text-[10px] text-slate-300 hover:text-brand-100">Esqueci minha senha</Link>
            <button type="submit" disabled={isSubmitting} className="h-10 w-full rounded-md bg-brand-500 text-xs font-semibold hover:bg-brand-700 disabled:opacity-60">
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
            <button type="button" className="h-10 w-full rounded-md bg-raised text-xs font-medium hover:bg-slate-700">
              Acesso demo
            </button>
          </form>
          <p className="mt-5 text-[9px] leading-relaxed text-slate-500">
            Acesso demo: utilize a operação demonstrativa para conhecer a plataforma. Nenhuma venda será realizada.
          </p>
          <p className="mt-16 text-center text-[9px] text-slate-500">allmotorsbrasil.com.br&nbsp; · &nbsp;@allmotors.brasil</p>
        </div>
      </section>
    </main>
  )
}

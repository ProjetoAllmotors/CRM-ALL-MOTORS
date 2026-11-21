import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserRole, type UserRole } from '../auth/userRoleStore'

const loginSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type LoginData = z.infer<typeof loginSchema>

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const navigate = useNavigate()
  const { setProfile } = useUserRole()
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
    setProfile('admin')
    navigate('/dashboard')
  }

  function enterDemo(role: UserRole) {
    setProfile(role)
    navigate(role === 'admin' ? '/dashboard' : '/pipeline')
  }

  const isLight = theme === 'light'

  return (
    <main className={`relative grid min-h-screen lg:grid-cols-2 ${isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-canvas text-slate-50'}`}>
      <section className={`hidden min-h-screen items-center justify-center lg:flex ${isLight ? 'bg-white' : 'bg-elevated'}`}>
        <div className="text-center">
          <img
            src="/aima-motors-logo.png"
            alt="AIMA Motors Brasil"
            className="mx-auto h-[220px] w-[220px] rounded-full object-cover"
          />
          <p className="mt-4 font-heading text-xs font-semibold tracking-[0.22em] text-slate-200">ALL MOTORS</p>
          <p className="mt-2 text-[9px] tracking-[0.28em] text-[#66A5FF]">BRASIL</p>
        </div>
      </section>

      <section className={`flex min-h-screen items-center justify-center px-6 py-8 ${isLight ? 'bg-[#F8FAFC]' : 'bg-canvas'}`}>
        <div className="w-full max-w-[360px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#3978CF]">Gestão comercial</p>
          <h1 className={`mt-1 font-heading text-[24px] font-bold ${isLight ? 'text-[#102E61]' : 'text-slate-50'}`}>Acesso ao CRM</h1>
          <p className={`mt-1 text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Acompanhe clientes, oportunidades e resultados.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-3" noValidate>
            <div>
              <label htmlFor="email" className={`mb-1.5 block text-[9px] font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>E-mail profissional</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`h-9 w-full rounded-md px-3 text-[10px] focus:border-brand-500 ${isLight ? 'border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400' : 'border border-[#26354D] bg-elevated text-slate-100 placeholder:text-slate-500'}`}
                {...register('email')}
              />
              {errors.email && <p className="mt-1 text-[10px] text-rose-300">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className={`mb-1.5 block text-[9px] font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Senha</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`h-9 w-full rounded-md px-3 pr-12 text-[10px] focus:border-brand-500 ${isLight ? 'border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400' : 'border border-[#26354D] bg-elevated text-slate-100 placeholder:text-slate-500'}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  onClick={() => setShowPassword((value) => !value)}
                  className={`absolute inset-y-0 right-0 rounded-r-md px-2 text-[9px] ${isLight ? 'text-slate-500 hover:bg-slate-100' : 'text-slate-300 hover:bg-raised'}`}
                >
                  {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-[10px] text-rose-300">{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <label className={`flex items-center gap-1.5 text-[9px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <input type="checkbox" className="h-3 w-3 rounded border-[#26354D] accent-brand-500" />
                Lembrar de mim
              </label>
              <Link to="/recuperar-senha" className="text-[9px] text-[#66A5FF] hover:text-brand-100">Esqueci minha senha</Link>
            </div>
            <button type="submit" disabled={isSubmitting} className="h-9 w-full rounded-md bg-brand-500 text-[10px] font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <section className={`mt-3 rounded-md border p-3 ${isLight ? 'border-slate-200 bg-white' : 'border-border bg-elevated'}`} aria-label="Acesso de demonstração">
            <h2 className={`text-[9px] font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>Acesso de demonstração</h2>
            <p className={`mt-1 text-[8px] leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Escolha um perfil para apresentar o sistema, sem digitar dados.</p>
            <div className="mt-2 space-y-1.5">
              <button type="button" onClick={() => enterDemo('admin')} className={`flex h-8 w-full items-center justify-center rounded-md border text-[9px] ${isLight ? 'border-slate-300 text-slate-700 hover:bg-slate-50' : 'border-[#26354D] text-slate-200 hover:bg-raised'}`}>
                Entrar como Administrador
              </button>
              <button type="button" onClick={() => enterDemo('seller')} className={`flex h-8 w-full items-center justify-center rounded-md border text-[9px] ${isLight ? 'border-slate-300 text-slate-700 hover:bg-slate-50' : 'border-[#26354D] text-slate-200 hover:bg-raised'}`}>
                Entrar como Vendedor
              </button>
            </div>
            <p className={`mt-2 text-[7px] leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
              Administrador: Marina Costa. Vendedor: Rafael Mendes. Para login manual, use o e-mail do usuário e a senha demonstrativa.
            </p>
          </section>

          <p className={`mt-4 text-center text-[8px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>© 2026 ALL MOTORS Brasil. Todos os direitos reservados.</p>
        </div>
      </section>

      <button
        type="button"
        onClick={() => setTheme(isLight ? 'dark' : 'light')}
        className={`absolute bottom-5 right-5 flex h-10 items-center gap-2 rounded-lg border px-3 text-[11px] ${
          isLight ? 'border-slate-300 bg-white text-slate-700 shadow-sm' : 'border-[#26354D] bg-raised text-slate-200'
        }`}
        aria-label={`Ativar tema ${isLight ? 'escuro' : 'claro'}`}
      >
        <span className={`h-3 w-3 rounded-full ${isLight ? 'bg-slate-400' : 'bg-brand-500'}`} />
        {isLight ? 'Light Mode' : 'Dark Mode'}
      </button>
    </main>
  )
}

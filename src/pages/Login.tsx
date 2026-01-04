import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, Loader2, ArrowRight } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('username', email)
      formData.append('password', password)

      const response = await fetch('http://localhost:8000/api/v1/auth/login/access-token', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        await login(data.access_token)
        navigate('/')
      } else {
        const errData = await response.json()
        setError(errData.detail || 'Login failed')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-6">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold italic tracking-tighter">
            Welcome <span className="text-primary">Back.</span>
          </h1>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.3em]">
            Re-enter the cinematic archives
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-2">Email</label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-2xl bg-foreground/5 border-foreground/10 focus:border-primary/50 transition-all text-lg pl-6"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-2">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 rounded-2xl bg-foreground/5 border-foreground/10 focus:border-primary/50 transition-all text-lg pl-6"
              required
            />
          </div>

          {error && (
            <p className="text-destructive text-xs font-mono italic text-center">{error}</p>
          )}

          <Button
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg tracking-widest gap-2 shadow-2xl shadow-primary/20"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                SIGN IN <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-muted-foreground text-xs">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline font-bold">
            Create Profile
          </Link>
        </p>

        <div className="pt-8 border-t border-foreground/5 flex justify-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[9px] font-mono uppercase tracking-tighter text-primary/60">
              Encrypted Cinematic Access
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Input, Typography } from '@ictroot/ui-kit'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAdminLogin } from '@/features/admin/auth'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const router = useRouter()
  const { login, loading } = useAdminLogin()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    const success = await login(data.email, data.password)

    if (!success) {
      setError('password', { message: 'Login failed' })

      return
    }

    router.push('/users')
  }

  return (
    <div className={'flex min-h-screen items-center justify-center bg-black px-4'}>
      <Card className={'w-94.5 px-6 py-6'}>
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-4'}>
          <Typography className={'mb-4 text-center'} variant={'h1'}>
            Sign In
          </Typography>

          <Input
            id={'email'}
            inputType={'text'}
            label={'Email'}
            placeholder={'Epam@epam.com'}
            autoComplete={'email'}
            reserveErrorSpace
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            id={'password'}
            inputType={'hide-able'}
            label={'Password'}
            placeholder={'****************'}
            autoComplete={'current-password'}
            reserveErrorSpace
            error={errors.password?.message}
            {...register('password')}
          />

          <Button
            type={'submit'}
            variant={'primary'}
            fullWidth
            disabled={loading}
            className={'mt-2'}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

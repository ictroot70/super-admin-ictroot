'use client'

import { Button, Card, Input, Typography } from '@ictroot/ui-kit'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { useAdminLogin } from '@/features/admin/auth'

export const LoginForm = () => {
  const router = useRouter()
  const { login, loading, error } = useAdminLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginFailed, setLoginFailed] = useState(false)

  let authError: string | undefined

  if (loginFailed) {
    authError = 'Login failed'
  } else if (error) {
    authError = 'Request error'
  }

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoginFailed(false)

    const success = await login(email, password)

    if (!success) {
      setLoginFailed(true)

      return
    }

    router.push('/users')
  }

  return (
    <div className={'flex min-h-screen items-center justify-center bg-black px-4'}>
      <Card className={'w-94.5 border border-[#333333] bg-[#171717] px-6 py-6'}>
        <form onSubmit={handleSubmit} className={'flex flex-col gap-4'}>
          <h1 className={'mb-4 text-center'}>
            <Typography variant={'h2'}>Sign In</Typography>
          </h1>

          <Input
            id={'email'}
            name={'email'}
            autoComplete={'email'}
            inputType={'text'}
            label={'Email'}
            placeholder={'Epam@epam.com'}
            reserveErrorSpace
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <Input
            id={'password'}
            name={'password'}
            autoComplete={'current-password'}
            inputType={'hide-able'}
            label={'Password'}
            placeholder={'****************'}
            reserveErrorSpace
            error={authError}
            value={password}
            onChange={event => setPassword(event.target.value)}
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

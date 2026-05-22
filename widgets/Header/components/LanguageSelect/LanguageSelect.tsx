'use client'

import { useState, useSyncExternalStore } from 'react'

import { RussiaFlag, UkFlag, Select } from '@/shared/ui'

type Language = 'en' | 'rus'

const LANGUAGE_STORAGE_KEY = 'language'

const subscribe = () => () => {}

const getLanguageSnapshot = (): Language => {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)

  return savedLanguage === 'rus' ? 'rus' : 'en'
}

export const LanguageSelect = () => {
  const persistedLanguage = useSyncExternalStore(subscribe, getLanguageSnapshot, () => 'en')
  const [languageOverride, setLanguageOverride] = useState<Language | null>(null)
  const language = languageOverride ?? persistedLanguage

  const handleLanguageChange = (value: string) => {
    const newLanguage: Language = value === 'rus' ? 'rus' : 'en'

    setLanguageOverride(newLanguage)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage)
  }

  return (
    <div className={'w-40.75'}>
      <Select
        defaultValue={language}
        value={language}
        placeholder={'Select...'}
        items={[
          { value: 'en', label: 'English', icon: <UkFlag /> },
          { value: 'rus', label: 'Russian', icon: <RussiaFlag /> },
        ]}
        onValueChange={handleLanguageChange}
      />
    </div>
  )
}

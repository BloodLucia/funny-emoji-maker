import { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

export const Header: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })
  const toggleTheme = () => {
    const t = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', t)
    setTheme(t)
  }

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
  }, [theme])

  return (
    <>
      <header className='flex flex-row mb-4 items-center justify-between'>
        <h1 className='font-extrabold tracking-wide text-neutral-800 dark:text-neutral-200 text-xl cursor-pointer'>
          Funny Emoji Maker
        </h1>
        <div
          className='inline-flex justify-center items-center p-1 text-neutral-600 dark:text-neutral-200 opacity-50 hover:opacity-100 cursor-pointer transition-opacity'
          onClick={toggleTheme}>
          {theme === 'light' ? (
            <FiSun className='text-3xl' />
          ) : (
            <FiMoon className='text-3xl' />
          )}
        </div>
      </header>
    </>
  )
}

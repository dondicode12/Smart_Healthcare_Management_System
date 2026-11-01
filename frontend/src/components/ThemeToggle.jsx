import { useState } from 'react'
import { flushSync } from 'react-dom'
import { Moon, Sun } from 'lucide-react'

// Button that switches between light and dark mode.
// The choice is saved in the browser, so it is remembered next time.
function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  function toggle() {
    const next = !dark

    const apply = () => {
      document.documentElement.classList.toggle('dark', next)
      flushSync(() => setDark(next))
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light')
      } catch {
        // storage can be blocked; the toggle still works for this visit
      }
    }

    // Browsers that support it fade smoothly between the two themes
    if (document.startViewTransition) {
      document.startViewTransition(apply)
    } else {
      apply()
    }
  }

  return (
    <button
      onClick={toggle}
      className="rounded-xl p-2 text-gray-600 hover:bg-gray-100"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

export default ThemeToggle

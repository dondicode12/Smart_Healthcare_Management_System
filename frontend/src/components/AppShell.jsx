import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Bell, Menu, Search } from 'lucide-react'
import OfflineBanner from './OfflineBanner'
import ThemeToggle from './ThemeToggle'
import { getInitials } from '../lib/initials'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'bg-soft text-brand'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  }`

// The shared frame of every portal: sidebar + top bar + page area.
// Layout, DoctorLayout and AdminLayout only describe WHAT goes in it.
function AppShell({ children, portal, groups, user, searchPlaceholder = 'Search...' }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Dark backdrop behind the sidebar on phones. Tap it to close. */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar: slides in on phones, always visible on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white p-5 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-lg font-bold text-white">
            B
          </div>
          <div className="leading-tight">
            <h2 className="text-lg font-bold tracking-tight">BLASTCARE</h2>
            <p className="text-xs text-gray-500">{portal}</p>
          </div>
        </div>

        <nav onClick={() => setMenuOpen(false)}>
          {groups.map((group) => (
            <div key={group.label} className="mb-6">
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink key={item.to} to={item.to} className={linkClass}>
                      <Icon size={18} /> {item.label}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5 text-xs text-gray-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          All systems normal
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <OfflineBanner />
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            {/* Menu button: only shows on phones */}
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-xl p-2 text-gray-700 hover:bg-gray-100 md:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400 sm:flex">
              <Search size={16} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-48 bg-transparent text-gray-700 outline-none placeholder:text-gray-400 lg:w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />

            <button
              className="relative rounded-xl p-2 text-gray-600 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="ml-2 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-brand">
                {getInitials(user.name)}
              </div>
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <Link to="/"onClick={() => {localStorage.removeItem('token') 
                localStorage.removeItem('user')}}
                className="text-sm text-gray-500 hover:text-brand">
                Logout
              </Link>
            </div>
          </div>
        </header>

        <main className="page-enter mx-auto max-w-7xl p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}

export default AppShell

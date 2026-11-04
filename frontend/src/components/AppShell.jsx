import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Bell,
  ChevronsLeft,
  ChevronsRight,
  Ellipsis,
  LogOut,
  Sparkles,
} from 'lucide-react'
import AssistantChat from './AssistantChat'
import OfflineBanner from './OfflineBanner'
import ThemeToggle from './ThemeToggle'
import { getInitials } from '../lib/initials'

// ---------- Desktop sidebar link ----------
// When the sidebar is collapsed, only the icon shows and a tooltip appears on hover.
function SideLink({ item, collapsed }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-all duration-200 ${
          collapsed ? 'justify-center px-0' : 'px-3'
        } ${
          isActive
            ? 'bg-soft text-brand'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Little bar on the left of the active link */}
          {isActive && (
            <span className="absolute -left-3 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand"></span>
          )}
          <Icon size={20} className="shrink-0" />
          {!collapsed && <span className="truncate">{item.label}</span>}
          {collapsed && (
            <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-lg bg-black px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

// ---------- Mobile bottom tab ----------
function BottomTab({ item }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium ${
          isActive ? 'text-brand' : 'text-gray-500'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`rounded-full px-4 py-1 transition-colors ${
              isActive ? 'bg-soft' : ''
            }`}
          >
            <Icon size={20} />
          </span>
          <span className="max-w-full truncate px-1">{item.label}</span>
        </>
      )}
    </NavLink>
  )
}

// The shared frame of every portal: sidebar + top bar + page area.
// Layout, DoctorLayout and AdminLayout only describe WHAT goes in it.
function AppShell({ children, portal, groups, user }) {
  const navigate = useNavigate()

  // Desktop: is the sidebar collapsed? The choice is remembered in the browser.
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sidebar') === 'collapsed'
    } catch {
      return false
    }
  })

  // Mobile: is the "More" sheet open?
  const [moreOpen, setMoreOpen] = useState(false)

  // Is the AI chat panel open?
  const [chatOpen, setChatOpen] = useState(false)

  function toggleSidebar() {
    const next = !collapsed
    setCollapsed(next)
    try {
      localStorage.setItem('sidebar', next ? 'collapsed' : 'expanded')
    } catch {
      // storage can be blocked; it still works for this visit
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  // Ctrl+K (or Cmd+K) opens the chatbot
  useEffect(() => {
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setChatOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // All links in one flat list, for the mobile bottom bar
  const allItems = groups.flatMap((group) => group.items)
  const needsMore = allItems.length > 5
  const tabs = needsMore ? allItems.slice(0, 4) : allItems

  return (
    <div className="flex min-h-screen">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 p-3 transition-[width] duration-300 md:block ${
          collapsed ? 'w-24' : 'w-72'
        }`}
      >
        <div className="card flex h-full flex-col p-3">
          {/* Brand */}
          <div
            className={`mb-6 flex items-center gap-3 px-1 pt-1 ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-900 text-lg font-bold text-white">
              B
            </div>
            {!collapsed && (
              <div className="leading-tight">
                <h2 className="text-lg font-bold tracking-tight">BLASTCARE</h2>
                <p className="text-xs text-gray-500">{portal}</p>
              </div>
            )}
          </div>

          {/* Links */}
          <nav className="flex-1">
            {groups.map((group, index) => (
              <div key={group.label} className="mb-5">
                {collapsed ? (
                  // A thin line replaces the group name (skip it for the first group)
                  index > 0 && <div className="mx-3 mb-3 border-t border-gray-200"></div>
                ) : (
                  <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    {group.label}
                  </p>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <SideLink key={item.to} item={item} collapsed={collapsed} />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Collapse button */}
          <button
            onClick={toggleSidebar}
            className={`mb-3 flex items-center gap-3 rounded-xl py-2.5 text-sm text-gray-500 hover:bg-gray-100 ${
              collapsed ? 'justify-center px-0' : 'px-3'
            }`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
            {!collapsed && 'Collapse'}
          </button>

          {/* User + logout */}
          <div
            className={`flex items-center gap-3 rounded-xl bg-gray-50 p-2.5 ${
              collapsed ? 'flex-col' : ''
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-brand">
              {getInitials(user.name)}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="truncate text-xs text-gray-500">{user.role}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="min-w-0 flex-1">
        <OfflineBanner />

        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur md:px-8">
          {/* Phone: logo */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-900 font-bold text-white">
              B
            </div>
            <span className="font-bold tracking-tight">BLASTCARE</span>
          </div>

          {/* Desktop: the AI bar. It is a button that opens the chat panel. */}
          <button
            onClick={() => setChatOpen(true)}
            className="hidden w-full max-w-xl items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-left text-sm text-gray-500 hover:border-blue-700 md:flex"
          >
            <Sparkles size={18} className="shrink-0 text-blue-700" />
            <span className="flex-1">Ask BLASTCARE AI anything...</span>
            <kbd className="rounded-md border border-gray-200 px-1.5 py-0.5 text-[11px] text-gray-400">
              Ctrl K
            </kbd>
          </button>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Phone: AI button */}
            <button
              onClick={() => setChatOpen(true)}
              className="rounded-xl bg-blue-900 p-2 text-white hover:bg-blue-800 md:hidden"
              aria-label="Open AI assistant"
            >
              <Sparkles size={20} />
            </button>

            <ThemeToggle />

            <button
              className="relative rounded-xl p-2 text-gray-600 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </header>

        {/* Extra bottom padding on phones so the tab bar never covers content */}
        <main className="page-enter mx-auto max-w-7xl p-4 pb-28 md:p-8">{children}</main>
      </div>

      {/* ================= MOBILE BOTTOM TAB BAR ================= */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-gray-200 bg-white/80 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        {tabs.map((item) => (
          <BottomTab key={item.to} item={item} />
        ))}

        {needsMore && (
          <button
            onClick={() => setMoreOpen(true)}
            className="flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium text-gray-500"
          >
            <span className="px-4 py-1">
              <Ellipsis size={20} />
            </span>
            More
          </button>
        )}
      </nav>

      {/* ================= MOBILE "MORE" SHEET ================= */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMoreOpen(false)}></div>

          <div className="card page-enter relative w-full rounded-b-none rounded-t-3xl p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            {/* Little handle */}
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-300"></div>

            <div onClick={() => setMoreOpen(false)}>
              {groups.map((group) => (
                <div key={group.label} className="mb-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    {group.label}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {group.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          className={({ isActive }) =>
                            `flex flex-col items-center gap-2 rounded-2xl p-3 text-center text-xs font-medium ${
                              isActive ? 'bg-soft text-brand' : 'bg-gray-50 text-gray-600'
                            }`
                          }
                        >
                          <Icon size={22} />
                          {item.label}
                        </NavLink>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* User + logout */}
            <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-brand">
                {getInitials(user.name)}
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= AI CHAT PANEL ================= */}
      <AssistantChat open={chatOpen} onClose={() => setChatOpen(false)} portal={portal} />
    </div>
  )
}

export default AppShell

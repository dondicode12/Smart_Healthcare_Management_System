// Reads the logged-in user that Login.jsx saved in the browser.
export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

// "patient" -> "Patient"
export function roleLabel(role) {
  return role ? role[0].toUpperCase() + role.slice(1) : ''
}

// The { name, role } object the sidebar needs
export function getLayoutUser() {
  const stored = getStoredUser()
  return { name: stored?.name ?? 'Guest', role: roleLabel(stored?.role) }
}

import { useMemo, useState, type ReactNode } from 'react'
import { UserRoleContext, type UserRole, type UserSession } from './userRoleStore'

const profiles: Record<UserRole, string> = {
  admin: 'Marina Costa',
  seller: 'Rafael Mendes',
}

function readStoredRole(): UserRole {
  return window.localStorage.getItem('crm-user-role') === 'seller' ? 'seller' : 'admin'
}

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(readStoredRole)

  const session = useMemo<UserSession>(() => ({
    role,
    userName: profiles[role],
    setProfile(nextRole) {
      window.localStorage.setItem('crm-user-role', nextRole)
      setRole(nextRole)
    },
  }), [role])

  return <UserRoleContext.Provider value={session}>{children}</UserRoleContext.Provider>
}


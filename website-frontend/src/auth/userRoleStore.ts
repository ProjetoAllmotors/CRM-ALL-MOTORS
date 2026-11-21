import { createContext, useContext } from 'react'

export type UserRole = 'admin' | 'seller'

export interface UserSession {
  role: UserRole
  userName: string
  setProfile(role: UserRole): void
}

export const UserRoleContext = createContext<UserSession | null>(null)

export function useUserRole() {
  const session = useContext(UserRoleContext)
  if (!session) throw new Error('useUserRole precisa estar dentro de UserRoleProvider')
  return session
}

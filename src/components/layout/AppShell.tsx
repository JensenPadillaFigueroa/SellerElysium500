import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { BottomNav } from './BottomNav'

interface Props {
  children: ReactNode
}

export function AppShell({ children }: Props) {
  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[1600px] 2xl:border-x 2xl:border-white/5">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 pb-28 lg:pb-6">{children}</main>
        <BottomNav />
      </div>
    </div>
  )
}

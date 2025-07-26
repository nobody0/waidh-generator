import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { DiceBar } from './dice/DiceBar'

export function Layout() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/monster', label: 'Monster' },
    { path: '/kerker', label: 'Kerker' },
    { path: '/abenteuer', label: 'Abenteuer' },
    { path: '/nscs', label: 'NSCs' },
    { path: '/schicksal', label: 'Schicksal' },
    { path: '/vergiftung', label: 'Vergiftung' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center h-16 gap-6">
            <Link to="/" className="font-medieval text-xl font-bold">
              WAIDH
            </Link>
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md",
                    location.pathname === item.path
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
      
      <main className="pb-20">
        <Outlet />
      </main>
      
      <DiceBar />
    </div>
  )
}
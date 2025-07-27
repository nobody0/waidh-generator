import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { DiceBar } from './dice/DiceBar'
import { Pentagon } from './icons/Pentagon'

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
    <div className="min-h-screen bg-steel-900">
      {/* Parchment overlay for content */}
      <div className="min-h-screen parchment-bg">
        {/* Navigation with steel gradient */}
        <header className="bg-gradient-to-r from-steel-800 to-steel-700 border-b-2 border-rust-500/30 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto px-4">
            <nav className="flex items-center h-16 gap-6">
              {/* Pentagon logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <Pentagon className="w-8 h-8 text-aspect-denker group-hover:text-aspect-arbeiter transition-colors duration-200" />
                <h1 className="font-display text-2xl steel-emboss text-steel-100">
                  WAIDH Generator
                </h1>
              </Link>
              
              <div className="flex items-center gap-1 ml-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md",
                      "hover:bg-steel-600/50 hover:text-steel-100",
                      location.pathname === item.path
                        ? "bg-steel-600 text-steel-100 shadow-engraved"
                        : "text-steel-300"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </header>
        
        {/* Content with max-width like settlements */}
        <main className="max-w-7xl mx-auto p-6 pb-20">
          <Outlet />
        </main>
        
        <DiceBar />
      </div>
    </div>
  )
}
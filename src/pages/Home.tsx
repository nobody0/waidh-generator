import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Swords, Castle, Scroll, Users, Sparkles, Skull, Keyboard, RefreshCw, Trash2, ArrowLeft, ArrowRight } from 'lucide-react'

export function Home() {
  const features = [
    {
      icon: Swords,
      title: 'Monster Generator',
      description: 'Erstelle gefährliche Bestien mit komplexen Regeln und Eigenschaften',
      link: '/monster',
    },
    {
      icon: Castle,
      title: 'Kerker-Elementare',
      description: 'Generiere lebende Dungeons mit Kammern, Wächtern und Schätzen',
      link: '/kerker',
    },
    {
      icon: Scroll,
      title: 'Abenteuer',
      description: 'Erschaffe Story-Hooks und Aufgaben für deine Spielsitzungen',
      link: '/abenteuer',
    },
    {
      icon: Users,
      title: 'NSCs & Schergen',
      description: 'Erstelle Nicht-Spieler-Charaktere mit dem Schergen-System',
      link: '/nscs',
    },
    {
      icon: Sparkles,
      title: 'Schicksalswürfe',
      description: 'Generiere dramatische Wendungen für deine Geschichte',
      link: '/schicksal',
    },
    {
      icon: Skull,
      title: 'Vergiftungen',
      description: 'Erstelle tödliche Gifte und ihre Effekte',
      link: '/vergiftung',
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 font-display steel-emboss text-primary">
          WAIDH RPG Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
          Ein mächtiges Werkzeug für Spielleiter des WAIDH Tabletop-Rollenspiels.
          Erschaffe Monster, Dungeons, Abenteuer und mehr mit nur wenigen Klicks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title} className="hover:shadow-lg transition-all hover:-translate-y-1 duration-200">
              <CardHeader>
                <Icon className="w-8 h-8 mb-2 text-primary" />
                <CardTitle className="font-display">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={feature.link}>
                  <Button className="w-full" variant="steel">Zum Generator</Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-steel-700/50 border-rust-500/40">
          <CardHeader>
            <CardTitle className="font-display text-primary">Über WAIDH</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-steel-100">
            <p>
              WAIDH ist ein deutsches Tabletop-Rollenspiel in einer mittelalterlichen 
              Fantasywelt voller Magie. Die Spielwelt ist gefährlich - Monster, 
              Wandelholze und magische Phänomene bedrohen die Zivilisation. 
              Spielercharaktere ziehen als Problemlöser von Siedlung zu Siedlung.
            </p>
            <p>
              Dieser Generator hilft Spielleitern dabei, schnell und einfach Inhalte 
              für ihre Spielrunden zu erstellen. Alle generierten Elemente folgen den 
              offiziellen WAIDH-Regeln und können direkt im Spiel verwendet werden.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-primary">
              <Keyboard className="w-5 h-5" />
              Tastenkürzel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Neu generieren
                </span>
                <kbd className="px-2 py-1 text-xs bg-steel-700 rounded border border-steel-600 font-mono">Space</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Vorheriges Element
                </span>
                <kbd className="px-2 py-1 text-xs bg-steel-700 rounded border border-steel-600 font-mono">←</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Nächstes Element
                </span>
                <kbd className="px-2 py-1 text-xs bg-steel-700 rounded border border-steel-600 font-mono">→</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Löschen
                </span>
                <kbd className="px-2 py-1 text-xs bg-steel-700 rounded border border-steel-600 font-mono">Del</kbd>
              </div>
              <div className="border-t pt-2 mt-2">
                <p className="text-xs text-muted-foreground">
                  Diese Shortcuts funktionieren in den meisten Generatoren wenn der Fokus nicht in einem Eingabefeld ist.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
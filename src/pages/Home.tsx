import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Swords, Castle, Scroll, Users, Sparkles, Skull } from 'lucide-react'

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
        <h1 className="text-5xl font-bold mb-4 font-medieval">
          WAIDH RPG Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ein mächtiges Werkzeug für Spielleiter des WAIDH Tabletop-Rollenspiels.
          Erschaffe Monster, Dungeons, Abenteuer und mehr mit nur wenigen Klicks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon className="w-8 h-8 mb-2 text-primary" />
                <CardTitle className="font-medieval">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={feature.link}>
                  <Button className="w-full">Zum Generator</Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="font-medieval">Über WAIDH</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
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
    </div>
  )
}
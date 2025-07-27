import type { 
  AdventureQuest,
  AdventureProblem,
  AdventureTrigger,
  AdventureObstacle,
  AdventureLocation,
  AdventureQuestGiver,
  AdventureComplication,
  AdventureReward
} from '@/types/adventure'
import { locationNameParts } from '@/data/tables/adventureTables'

export class AdventureService {
  // Generiere einen deutschen Ortsnamen
  static generateLocationName(): string {
    const prefix = locationNameParts.prefixes[Math.floor(Math.random() * locationNameParts.prefixes.length)]
    const suffix = locationNameParts.suffixes[Math.floor(Math.random() * locationNameParts.suffixes.length)]
    return prefix + suffix
  }

  // Generiere eine Lokation
  static generateLocation(problem: AdventureProblem): AdventureLocation {
    const isSettlement = problem.category !== 'route' && problem.category !== 'ausbreitung'
    const type = isSettlement 
      ? (Math.random() > 0.5 ? 'siedlung' : 'dorf')
      : (Math.random() > 0.5 ? 'außenposten' : 'wildnis')
    
    const location: AdventureLocation = {
      name: this.generateLocationName(),
      type
    }

    if (type === 'siedlung' || type === 'dorf') {
      location.population = type === 'siedlung' 
        ? Math.floor(Math.random() * 150) + 50  // 50-200
        : Math.floor(Math.random() * 40) + 10   // 10-50
    }

    // Füge ein zufälliges Feature hinzu
    const featureIndex = Math.floor(Math.random() * locationNameParts.features.length)
    location.features = [locationNameParts.features[featureIndex]]

    return location
  }

  // Generiere einen Questgeber
  static generateQuestGiver(): AdventureQuestGiver {
    const roles = [
      'Bürgermeister', 'Dorfältester', 'Händler', 'Priester', 'Wache',
      'Gastwirt', 'Handwerker', 'Bauer', 'Gelehrter', 'Jäger'
    ]
    
    const motivations = [
      'will seine Familie schützen',
      'fürchtet um sein Geschäft',
      'sorgt sich um die Gemeinschaft',
      'hat bereits Angehörige verloren',
      'wurde selbst Opfer',
      'handelt im Auftrag anderer'
    ]

    const relations = [
      'ist direkt betroffen',
      'vertritt die Bewohner',
      'hat die Gefahr entdeckt',
      'kennt die Geschichte dahinter',
      'war Zeuge des Auslösers',
      'wurde um Hilfe gebeten'
    ]

    return {
      name: this.generateNPCName(),
      role: roles[Math.floor(Math.random() * roles.length)],
      motivation: motivations[Math.floor(Math.random() * motivations.length)],
      relationToProblem: relations[Math.floor(Math.random() * relations.length)]
    }
  }

  // Generiere einen NPC-Namen
  static generateNPCName(): string {
    const firstNames = [
      'Heinrich', 'Gertrud', 'Wilhelm', 'Margarete', 'Friedrich', 'Elisabeth',
      'Konrad', 'Brunhilde', 'Otto', 'Mathilde', 'Dietrich', 'Adelheid',
      'Günther', 'Hedwig', 'Siegfried', 'Irmgard'
    ]
    
    const lastNames = [
      'Schmied', 'Müller', 'Weber', 'Bauer', 'Koch', 'Schreiber',
      'Wagner', 'Zimmermann', 'Krämer', 'Fleischer', 'Bäcker', 'Schuster'
    ]

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    
    return `${firstName} ${lastName}`
  }

  // Berechne die Belohnung
  static calculateReward(
    problem: AdventureProblem,
    trigger: AdventureTrigger,
    obstacle: AdventureObstacle,
    complications?: AdventureComplication[]
  ): AdventureReward {
    // Basis: 20-40 Taler pro Charakter
    const baseTaler = 30 // Mittelwert

    // Modifikatoren basierend auf Schwierigkeit
    const problemMod = 0.8 + (problem.severity * 0.2)      // 1.0 - 1.4
    const triggerMod = 0.8 + (trigger.dangerLevel * 0.2)   // 1.0 - 1.4
    const obstacleMod = 0.9 + (obstacle.complexity * 0.1)  // 1.0 - 1.2
    
    // Komplikationen erhöhen die Belohnung
    const complicationMod = complications ? 1 + (complications.length * 0.1) : 1

    const totalMod = problemMod * triggerMod * obstacleMod * complicationMod
    const totalPerCharacter = Math.round(baseTaler * totalMod)

    // Zusätzliche Belohnungen
    const additionalRewards: string[] = []
    if (totalMod > 1.5) {
      additionalRewards.push('Ehrentitel oder Anerkennung')
    }
    if (trigger.type === 'artefakt') {
      additionalRewards.push('Magischer Gegenstand (nach SL-Ermessen)')
    }
    if (problem.category === 'wachstum') {
      additionalRewards.push('Handelsrabatte oder Gefallen')
    }

    return {
      baseTaler,
      modifiers: {
        problem: problemMod,
        trigger: triggerMod,
        obstacle: obstacleMod,
        complications: complicationMod
      },
      totalPerCharacter,
      additionalRewards: additionalRewards.length > 0 ? additionalRewards : undefined,
      influencePoints: totalMod > 1.3 ? Math.floor(totalMod) : undefined
    }
  }

  // Baue die Story zusammen
  static buildStory(
    problem: AdventureProblem,
    trigger: AdventureTrigger,
    obstacle: AdventureObstacle,
    location: AdventureLocation,
    questGiver?: AdventureQuestGiver,
    template: 'direkt' | 'mysterium' | 'düster' | 'hoffnungsvoll' = 'direkt'
  ): AdventureQuest['story'] {
    const locationDesc = location.features ? `${location.name} ${location.features[0]}` : location.name

    // Einleitung
    let introduction = ''
    switch (template) {
      case 'direkt':
        introduction = `Die Charaktere erreichen ${locationDesc}. ${questGiver ? `${questGiver.name}, ${questGiver.role} des Ortes, ${questGiver.relationToProblem} und bittet sie eindringlich um Hilfe.` : 'Die verzweifelten Bewohner bitten um Hilfe.'} ${problem.description}`
        break
      case 'mysterium':
        introduction = `Gerüchte über seltsame Vorkommnisse in ${locationDesc} haben die Charaktere erreicht. ${questGiver ? `Bei ihrer Ankunft werden sie von ${questGiver.name} empfangen, der nervös wirkt.` : 'Die Bewohner wirken verängstigt und misstrauisch.'} Etwas stimmt hier ganz und gar nicht...`
        break
      case 'düster':
        introduction = `Ein Schatten liegt über ${locationDesc}. ${questGiver ? `${questGiver.name} empfängt die Charaktere mit düsterer Miene.` : 'Die wenigen Bewohner, die sich noch auf die Straße trauen, sprechen nur im Flüsterton.'} ${problem.description} Die Situation ist verzweifelt.`
        break
      case 'hoffnungsvoll':
        introduction = `Trotz der Schwierigkeiten herrscht in ${locationDesc} noch immer ein Funken Hoffnung. ${questGiver ? `${questGiver.name} begrüßt die Charaktere mit vorsichtigem Optimismus.` : 'Die Bewohner schöpfen neue Hoffnung beim Anblick der Abenteurer.'} ${problem.description}`
        break
    }

    // Hauptteil
    const mainBody = `Die Ursache des Problems: ${trigger.description} ${trigger.details ? trigger.details[0] : ''} 
    
Die Bewohner können das Problem nicht selbst lösen, weil: ${obstacle.description} 
    
Die Charaktere müssen ${obstacle.solutions[0].toLowerCase()} und dabei ${trigger.name.toLowerCase()} überwinden oder besänftigen.`

    // Auflösung
    const resolution = `Gelingt es den Charakteren, das Problem zu lösen, ${questGiver ? `wird ${questGiver.name} ${questGiver.motivation} erfüllt sehen` : 'werden die Bewohner erleichtert aufatmen'}. Der Ort kann wieder zu seinem normalen Leben zurückkehren.`

    // Aufhänger
    const hooks = [
      `Die Charaktere hören in einer Taverne von den Problemen in ${location.name}`,
      `Ein verzweifelter Bote aus ${location.name} sucht nach Hilfe`,
      `Auf ihrer Reise kommen die Charaktere durch ${location.name} und bemerken die Probleme`,
      `Ein alter Freund/Kontakt bittet die Charaktere, nach ${location.name} zu reisen`
    ]

    return {
      introduction,
      mainBody,
      resolution,
      hooks
    }
  }

  // Erstelle eine komplette Quest
  static createQuest(
    problem: AdventureProblem,
    trigger: AdventureTrigger,
    obstacle: AdventureObstacle,
    options: {
      charactersCount?: number
      complications?: AdventureComplication[]
      storyTemplate?: 'direkt' | 'mysterium' | 'düster' | 'hoffnungsvoll'
      customLocation?: Partial<AdventureLocation>
      customQuestGiver?: Partial<AdventureQuestGiver>
    } = {}
  ): AdventureQuest {
    // Generiere Lokation
    const location = {
      ...this.generateLocation(problem),
      ...options.customLocation
    }

    // Generiere Questgeber
    const questGiver = options.customQuestGiver ? {
      ...this.generateQuestGiver(),
      ...options.customQuestGiver
    } : this.generateQuestGiver()

    // Berechne Belohnung
    const reward = this.calculateReward(
      problem,
      trigger,
      obstacle,
      options.complications
    )

    // Baue Story
    const story = this.buildStory(
      problem,
      trigger,
      obstacle,
      location,
      questGiver,
      options.storyTemplate || 'direkt'
    )

    // Generiere Titel
    const title = `${problem.name} in ${location.name}`

    return {
      problem,
      trigger,
      obstacle,
      location,
      questGiver,
      complications: options.complications,
      story,
      reward,
      title,
      createdAt: new Date(),
      storyTemplate: options.storyTemplate
    }
  }

  // Exportiere Quest als Text
  static exportAsText(quest: AdventureQuest): string {
    const lines: string[] = []
    
    lines.push(`=== ${quest.title || 'Unbenanntes Abenteuer'} ===`)
    lines.push(`Ort: ${quest.location.name} (${quest.location.type})`)
    if (quest.location.population) {
      lines.push(`Einwohner: ${quest.location.population}`)
    }
    lines.push('')
    
    if (quest.questGiver) {
      lines.push('QUESTGEBER:')
      lines.push(`${quest.questGiver.name}, ${quest.questGiver.role}`)
      lines.push(`Motivation: ${quest.questGiver.motivation}`)
      lines.push(`Bezug: ${quest.questGiver.relationToProblem}`)
      lines.push('')
    }
    
    lines.push('PROBLEM:')
    lines.push(quest.problem.name)
    lines.push(quest.problem.description)
    lines.push('')
    
    lines.push('AUSLÖSER:')
    lines.push(quest.trigger.name)
    lines.push(quest.trigger.description)
    lines.push('')
    
    lines.push('HINDERNIS:')
    lines.push(quest.obstacle.name)
    lines.push(quest.obstacle.description)
    lines.push('')
    
    if (quest.complications && quest.complications.length > 0) {
      lines.push('KOMPLIKATIONEN:')
      quest.complications.forEach(comp => {
        lines.push(`- ${comp.name}: ${comp.effect}`)
      })
      lines.push('')
    }
    
    lines.push('GESCHICHTE:')
    lines.push('Einleitung:')
    lines.push(quest.story.introduction)
    lines.push('')
    lines.push('Hauptteil:')
    lines.push(quest.story.mainBody)
    lines.push('')
    lines.push('Auflösung:')
    lines.push(quest.story.resolution)
    lines.push('')
    
    lines.push('BELOHNUNG:')
    lines.push(`${quest.reward.totalPerCharacter} Taler pro Charakter`)
    if (quest.reward.additionalRewards) {
      lines.push('Zusätzlich:')
      quest.reward.additionalRewards.forEach(reward => {
        lines.push(`- ${reward}`)
      })
    }
    if (quest.reward.influencePoints) {
      lines.push(`Einflusspunkte: ${quest.reward.influencePoints}`)
    }
    
    return lines.join('\n')
  }

  // Exportiere Quest als JSON
  static exportAsJSON(quest: AdventureQuest): string {
    return JSON.stringify(quest, null, 2)
  }
}
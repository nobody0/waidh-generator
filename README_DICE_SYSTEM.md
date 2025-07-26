# Würfeltabellen-System für WAIDH Generator

## Übersicht

Das Würfeltabellen-System bietet eine wiederverwendbare Infrastruktur für alle Generatoren im WAIDH RPG. Es unterstützt verschiedene Würfeltypen (1W6, 2W6, 3W6, custom) und ermöglicht die Konfiguration, Speicherung und Verwaltung von Tabellen.

## Komponenten

### 1. Type-Definitionen (`src/types/dice.ts`)
- `DiceTable<T>`: Hauptinterface für Tabellen
- `DiceTableEntry<T>`: Einzelne Tabelleneinträge
- `DiceRollResult<T>`: Würfelergebnisse
- Unterstützt generische Typen für flexible Wertetypen

### 2. DiceService (`src/lib/dice/diceService.ts`)
Kernfunktionalität:
- `rollOnTable<T>(table)`: Würfelt auf einer Tabelle
- `rollMultiple(count, table, unique)`: Mehrfachwürfe
- `rollWithOverride(table, fixedValue)`: Manuelle Werte
- `getTableProbabilities(table)`: Wahrscheinlichkeitsberechnung

### 3. UI-Komponenten

#### DiceTableDisplay
Zeigt Tabellen mit:
- Alle Einträge und deren Bereiche
- Wahrscheinlichkeiten pro Eintrag
- Kumulative Wahrscheinlichkeiten
- Visuelle Wahrscheinlichkeitsbalken

#### DiceTableRoller
Interaktives Würfeln:
- Animierte Würfelergebnisse
- Manuelle Werteingabe (optional)
- Neuwürfe-Funktion
- Integration mit Würfel-Historie

#### DiceTableConfigurator
Tabellen-Editor:
- Einträge hinzufügen/entfernen/bearbeiten
- Import/Export als JSON
- Änderungsverfolgung
- Validierung

### 4. TableStore (`src/store/tableStore.ts`)
Persistente Speicherung:
- Custom-Tabellen im localStorage
- Import/Export mehrerer Tabellen
- Versionsverwaltung

## Integration in Generatoren

### Beispiel: Monster-Generator

```typescript
import { DiceTableRoller, DiceTableDisplay } from '@/components/dice'
import { DiceService } from '@/lib/dice'
import type { DiceTable } from '@/types/dice'

// 1. Definiere deine Tabellen-Struktur
interface MonsterAge {
  name: string
  attributes: number
  // ...
}

// 2. Erstelle Tabellen
const monsterAgeTable: DiceTable<MonsterAge> = {
  id: 'monster-age',
  name: 'Monster-Alter',
  diceType: '1d6',
  entries: [
    { range: 1, value: { name: 'Jung', attributes: 3 } },
    // ...
  ]
}

// 3. Nutze die Komponenten
<DiceTableRoller 
  table={monsterAgeTable}
  onRoll={(result) => setMonsterAge(result.value)}
  allowManualOverride
/>
```

## Beste Praktiken

1. **Tabellen-IDs**: Verwende eindeutige, beschreibende IDs (z.B. `monster-age`, `dungeon-theme`)

2. **Type-Safety**: Definiere spezifische Interfaces für deine Tabellenwerte

3. **Bereiche**: Nutze Einzelwerte für 1W6, Bereiche `[min, max]` für größere Spreizungen

4. **Sub-Rolls**: Für "Würfle 2x neu" nutze das `subRolls` Array

5. **Konfiguration**: Erlaube Nutzern, Tabellen anzupassen und zu speichern

## Erweiterte Features

### Custom Würfelformeln
```typescript
const customTable: DiceTable<number> = {
  id: 'custom-damage',
  name: 'Schaden',
  diceType: 'custom',
  customFormula: '2d8+3',
  entries: [/* ... */]
}
```

### Einzigartige Werte
```typescript
// Für "2 verschiedene Eigenschaften"
const results = DiceService.rollMultiple(2, propertyTable, true)
```

### Wahrscheinlichkeiten nutzen
```typescript
const probabilities = DiceService.getTableProbabilities(table)
// Zeige die häufigsten/seltensten Ergebnisse
```

## Homebrew-Unterstützung

Nutzer können:
1. Bestehende Tabellen modifizieren
2. Eigene Tabellen erstellen
3. Tabellen exportieren und teilen
4. Community-Tabellen importieren

Die Custom-Tabellen überschreiben die Standard-Tabellen automatisch, wenn sie die gleiche ID haben.
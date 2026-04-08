import fs from 'node:fs/promises'
import path from 'node:path'

const TOPIC_CONFIG = {
  office: {
    label: 'office',
    prefix: 'off',
    words: [
      'agenda',
      'appointment',
      'deadline',
      'department',
      'document',
      'feedback',
      'meeting',
      'overtime',
      'proposal',
      'schedule',
      'supervisor',
      'workload',
    ],
  },
  finance: {
    label: 'finance',
    prefix: 'fin',
    words: [
      'asset',
      'budget',
      'capital',
      'debt',
      'expense',
      'invoice',
      'liability',
      'margin',
      'revenue',
      'salary',
      'tax',
      'transaction',
    ],
  },
}

function parseArgs() {
  const args = process.argv.slice(2)
  const options = {
    topic: 'office',
    output: '',
  }

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]

    if (arg === '--topic') {
      options.topic = args[i + 1] ?? options.topic
      i += 1
      continue
    }

    if (arg.startsWith('--topic=')) {
      options.topic = arg.split('=')[1] || options.topic
      continue
    }

    if (arg === '--output') {
      options.output = args[i + 1] ?? options.output
      i += 1
      continue
    }

    if (arg.startsWith('--output=')) {
      options.output = arg.split('=')[1] || options.output
    }
  }

  return options
}

function titleCase(value) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((token) => token[0].toUpperCase() + token.slice(1))
    .join('')
}

function normalizeIpa(value, fallbackWord) {
  if (!value) return `/${fallbackWord}/`
  return value.startsWith('/') ? value : `/${value}/`
}

async function translateToVietnamese(text) {
  const endpoint = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|vi`

  const response = await fetch(endpoint)
  if (!response.ok) {
    return text
  }

  const payload = await response.json()
  const translated = payload?.responseData?.translatedText

  if (typeof translated !== 'string' || translated.trim().length === 0) {
    return text
  }

  return translated
}

function pickMeaning(entry) {
  const meanings = entry?.meanings ?? []
  const selectedMeaning = meanings.find((item) => Array.isArray(item?.definitions) && item.definitions.length > 0)
  if (!selectedMeaning) {
    return {
      partOfSpeech: 'word',
      definition: `A useful English word in business context: ${entry?.word ?? 'unknown'}.`,
      example: `We often use "${entry?.word ?? 'this word'}" in workplace communication.`,
      synonyms: [],
      antonyms: [],
    }
  }

  const selectedDefinition = selectedMeaning.definitions[0]

  const synonyms = [
    ...(selectedMeaning.synonyms ?? []),
    ...(selectedDefinition.synonyms ?? []),
  ]

  const antonyms = [
    ...(selectedMeaning.antonyms ?? []),
    ...(selectedDefinition.antonyms ?? []),
  ]

  return {
    partOfSpeech: selectedMeaning.partOfSpeech ?? 'word',
    definition: selectedDefinition.definition ?? `Definition not available for ${entry?.word ?? 'word'}.`,
    example:
      selectedDefinition.example ??
      `The team used "${entry?.word ?? 'this term'}" during the weekly meeting.`,
    synonyms: Array.from(new Set(synonyms)).slice(0, 4),
    antonyms: Array.from(new Set(antonyms)).slice(0, 4),
  }
}

async function fetchWordData(word) {
  const endpoint = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`

  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`Cannot fetch "${word}": HTTP ${response.status}`)
  }

  const payload = await response.json()
  const entry = Array.isArray(payload) ? payload[0] : null
  if (!entry) {
    throw new Error(`No dictionary entry found for "${word}"`)
  }

  const phoneticFromField = entry?.phonetic
  const phoneticFromList = Array.isArray(entry?.phonetics)
    ? entry.phonetics.find((item) => typeof item?.text === 'string' && item.text.trim().length > 0)?.text
    : ''
  const ipa = normalizeIpa(phoneticFromField || phoneticFromList, word)

  const details = pickMeaning(entry)
  const vietnameseMeaning = await translateToVietnamese(details.definition)

  return {
    word,
    ipa,
    partOfSpeech: details.partOfSpeech,
    meaning: vietnameseMeaning,
    example: details.example,
    synonyms: details.synonyms,
    antonyms: details.antonyms,
  }
}

function toTsArrayLiteral(words) {
  return JSON.stringify(words, null, 2)
}

async function main() {
  const { topic, output } = parseArgs()
  const config = TOPIC_CONFIG[topic]

  if (!config) {
    const available = Object.keys(TOPIC_CONFIG).join(', ')
    throw new Error(`Unknown topic "${topic}". Available topics: ${available}`)
  }

  const outputPath = output
    ? path.resolve(process.cwd(), output)
    : path.resolve(process.cwd(), `src/data/vocabulary/${config.label}.ts`)

  const entries = []

  console.log(`Start crawling ${config.words.length} words for topic: ${topic}`)

  for (let index = 0; index < config.words.length; index += 1) {
    const word = config.words[index]

    try {
      const item = await fetchWordData(word)
      const id = `v-${config.prefix}-${String(index + 1).padStart(3, '0')}`

      entries.push({
        id,
        word: item.word,
        ipa: item.ipa,
        meaning: item.meaning,
        partOfSpeech: item.partOfSpeech,
        example: item.example,
        ...(item.synonyms.length > 0 ? { synonyms: item.synonyms } : {}),
        ...(item.antonyms.length > 0 ? { antonyms: item.antonyms } : {}),
        topic: config.label,
      })

      console.log(`✓ ${word}`)
    } catch (error) {
      console.warn(`✗ ${word} -> ${error.message}`)
    }
  }

  if (entries.length === 0) {
    throw new Error('No vocabulary item was generated. Please check your internet connection or source API availability.')
  }

  const exportName = `${config.label}Vocabulary`
  const fileContent = `import { VocabularyWord } from '../../types'\n\nexport const ${exportName}: VocabularyWord[] = ${toTsArrayLiteral(entries)}\n`

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, fileContent, 'utf-8')

  console.log('\nDone!')
  console.log(`Generated ${entries.length} words to: ${outputPath}`)
  console.log(`Import symbol: ${exportName}`)
  console.log(`Suggested label: ${titleCase(config.label)}`)
}

main().catch((error) => {
  console.error(`\n[Error] ${error.message}`)
  process.exitCode = 1
})

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { UserProgress, TestResult, VocabularyProgress, GrammarProgress } from '../types'

const STORAGE_KEY = 'toeic-progress'

function makeInitialProgress(): UserProgress {
  return {
    currentWeek: 1,
    startDate: new Date().toISOString().split('T')[0],
    completedTasks: [],
    testHistory: [],
    vocabularyProgress: [],
    grammarProgress: [],
    version: 1,
  }
}

type Action =
  | { type: 'ADD_TEST_RESULT'; payload: TestResult }
  | { type: 'UPDATE_VOCAB_PROGRESS'; payload: VocabularyProgress }
  | { type: 'UPDATE_GRAMMAR_PROGRESS'; payload: GrammarProgress }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'SET_WEEK'; payload: number }
  | { type: 'LOAD'; payload: UserProgress }

function reducer(state: UserProgress, action: Action): UserProgress {
  switch (action.type) {
    case 'ADD_TEST_RESULT':
      return { ...state, testHistory: [...state.testHistory, action.payload] }
    case 'UPDATE_VOCAB_PROGRESS': {
      const existing = state.vocabularyProgress.findIndex(
        (v) => v.wordId === action.payload.wordId
      )
      const updated = [...state.vocabularyProgress]
      if (existing >= 0) {
        updated[existing] = action.payload
      } else {
        updated.push(action.payload)
      }
      return { ...state, vocabularyProgress: updated }
    }
    case 'UPDATE_GRAMMAR_PROGRESS': {
      const existing = state.grammarProgress.findIndex(
        (g) => g.lessonId === action.payload.lessonId
      )
      const updated = [...state.grammarProgress]
      if (existing >= 0) {
        updated[existing] = action.payload
      } else {
        updated.push(action.payload)
      }
      return { ...state, grammarProgress: updated }
    }
    case 'COMPLETE_TASK':
      if (state.completedTasks.includes(action.payload)) return state
      return { ...state, completedTasks: [...state.completedTasks, action.payload] }
    case 'SET_WEEK':
      return { ...state, currentWeek: action.payload }
    case 'LOAD':
      return action.payload
    default:
      return state
  }
}

interface AppContextType {
  progress: UserProgress
  dispatch: React.Dispatch<Action>
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [progress, dispatch] = useReducer(reducer, null, () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress
        // Backfill version for existing sessions without it
        if (parsed.version === undefined) {
          parsed.version = 1 // Legacy sessions start at v1
        }
        return parsed
      }
      return makeInitialProgress()
    } catch {
      return makeInitialProgress()
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  return <AppContext.Provider value={{ progress, dispatch }}>{children}</AppContext.Provider>
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

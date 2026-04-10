import { useEffect, useState } from 'react'
import { VocabularyWord } from '../types'

interface FlashcardProps {
  word: VocabularyWord
  onRate: (quality: 1 | 3 | 5) => void
}

export function Flashcard({ word, onRate }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    setIsFlipped(false)
  }, [word.id])

  return (
    <div className="max-w-lg mx-auto">
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--accent)] transition-all duration-200"
      >
        {!isFlipped ? (
          <>
            <p className="text-3xl font-bold text-[var(--accent)] mb-2">{word.word}</p>
            <p className="text-[var(--text-secondary)] text-sm">{word.ipa}</p>
            <p className="text-[var(--text-secondary)] text-xs mt-2">({word.partOfSpeech})</p>
            <p className="text-[var(--text-secondary)] text-sm mt-6">Nhấn để xem nghĩa</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold text-[var(--accent)] mb-2">{word.meaning}</p>
            <p className="text-[var(--text-secondary)] text-sm mb-4">{word.word} ({word.partOfSpeech})</p>
            <div className="bg-[var(--bg-elevated)] rounded p-3 w-full">
              <p className="text-sm text-[var(--text-primary)] italic">"{word.example}"</p>
            </div>
            {word.synonyms && word.synonyms.length > 0 && (
              <p className="text-xs text-[var(--text-secondary)] mt-3">
                Đồng nghĩa: {word.synonyms.join(', ')}
              </p>
            )}
          </>
        )}
      </div>

      {isFlipped && (
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => { setIsFlipped(false); onRate(1) }}
            className="px-6 py-3 bg-[var(--danger-soft)] text-[var(--danger)] rounded-lg font-medium hover:brightness-110 active:scale-95 transition-all"
          >
            Chưa biết
          </button>
          <button
            onClick={() => { setIsFlipped(false); onRate(3) }}
            className="px-6 py-3 bg-[var(--warning-soft)] text-[var(--warning)] rounded-lg font-medium hover:brightness-110 active:scale-95 transition-all"
          >
            Hơi biết
          </button>
          <button
            onClick={() => { setIsFlipped(false); onRate(5) }}
            className="px-6 py-3 bg-[var(--success-soft)] text-[var(--success)] rounded-lg font-medium hover:brightness-110 active:scale-95 transition-all"
          >
            Biết rồi
          </button>
        </div>
      )}
    </div>
  )
}

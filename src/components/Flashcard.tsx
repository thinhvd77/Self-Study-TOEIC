import { useState } from 'react'
import { VocabularyWord } from '../types'

interface FlashcardProps {
  word: VocabularyWord
  onRate: (quality: 1 | 3 | 5) => void
}

export function Flashcard({ word, onRate }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="max-w-lg mx-auto">
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="bg-white rounded-xl shadow-lg p-8 min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
      >
        {!isFlipped ? (
          <>
            <p className="text-3xl font-bold text-gray-800 mb-2">{word.word}</p>
            <p className="text-gray-400 text-sm">{word.ipa}</p>
            <p className="text-gray-400 text-xs mt-2">({word.partOfSpeech})</p>
            <p className="text-gray-400 text-sm mt-6">Nhấn để xem nghĩa</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold text-blue-700 mb-2">{word.meaning}</p>
            <p className="text-gray-600 text-sm mb-4">{word.word} ({word.partOfSpeech})</p>
            <div className="bg-gray-50 rounded p-3 w-full">
              <p className="text-sm text-gray-700 italic">"{word.example}"</p>
            </div>
            {word.synonyms && word.synonyms.length > 0 && (
              <p className="text-xs text-gray-500 mt-3">
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
            className="px-6 py-3 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200"
          >
            Chưa biết
          </button>
          <button
            onClick={() => { setIsFlipped(false); onRate(3) }}
            className="px-6 py-3 bg-yellow-100 text-yellow-700 rounded-lg font-medium hover:bg-yellow-200"
          >
            Hơi biết
          </button>
          <button
            onClick={() => { setIsFlipped(false); onRate(5) }}
            className="px-6 py-3 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200"
          >
            Biết rồi
          </button>
        </div>
      )}
    </div>
  )
}

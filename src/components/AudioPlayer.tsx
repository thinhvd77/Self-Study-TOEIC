import { useRef, useState } from 'react'

interface AudioPlayerProps {
  src: string
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const changeSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5]
    const nextIndex = (speeds.indexOf(speed) + 1) % speeds.length
    const newSpeed = speeds[nextIndex]
    setSpeed(newSpeed)
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed
    }
  }

  return (
    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
      />
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
      <button
        onClick={changeSpeed}
        className="px-2 py-1 text-xs font-medium bg-gray-200 rounded hover:bg-gray-300"
      >
        {speed}x
      </button>
    </div>
  )
}

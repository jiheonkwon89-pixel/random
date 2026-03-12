import { useState, useMemo } from 'react'
import './App.css'

const CHARACTERS = [
  {
    id: 'cat',
    name: '고양이',
    emoji: '🐱',
    color: '#ff9ecd',
  },
  {
    id: 'dog',
    name: '강아지',
    emoji: '🐶',
    color: '#9ecbff',
  },
]

function CharacterCard({ character, count, percentage, onClick, isLeading }) {
  return (
    <button
      className={`character-card ${isLeading ? 'character-card--leading' : ''}`}
      onClick={onClick}
      type="button"
    >
      <div className="character-emoji" aria-hidden="true">
        {character.emoji}
      </div>
      <div className="character-name">{character.name}</div>
      <div className="character-count">
        {count.toLocaleString('ko-KR')} 클릭
      </div>
      <div className="character-progress-wrapper">
        <div className="character-progress-track">
          <div
            className="character-progress-bar"
            style={{
              width: `${percentage}%`,
              background: character.color,
            }}
          />
        </div>
        <span className="character-progress-label">
          {Math.round(percentage)}%
        </span>
      </div>
    </button>
  )
}

function Scoreboard({ catCount, dogCount }) {
  const total = catCount + dogCount
  const [catPercent, dogPercent] = useMemo(() => {
    if (total === 0) {
      return [50, 50]
    }
    const cat = (catCount / total) * 100
    const dog = (dogCount / total) * 100
    return [cat, dog]
  }, [catCount, dogCount, total])

  let statusText = '아직 시작 전! 첫 클릭의 주인공은 누구일까?'
  if (total > 0) {
    if (catCount === dogCount) {
      statusText = `현재 ${total.toLocaleString(
        'ko-KR',
      )}번의 클릭! 완전 박빙이에요 🔥`
    } else if (catCount > dogCount) {
      statusText = `고양이가 앞서가요! (차이: ${
        catCount - dogCount
      } 클릭) 🐱💨`
    } else {
      statusText = `강아지가 앞서가요! (차이: ${
        dogCount - catCount
      } 클릭) 🐶💨`
    }
  }

  return (
    <section className="scoreboard" aria-label="현재 클릭 대결 상황">
      <div className="scoreboard-bar">
        <div
          className="scoreboard-bar-segment scoreboard-bar-segment--cat"
          style={{ width: `${catPercent}%` }}
        />
        <div
          className="scoreboard-bar-segment scoreboard-bar-segment--dog"
          style={{ width: `${dogPercent}%` }}
        />
      </div>
      <div className="scoreboard-text">{statusText}</div>
    </section>
  )
}

function App() {
  const [catCount, setCatCount] = useState(0)
  const [dogCount, setDogCount] = useState(0)

  const total = catCount + dogCount
  const isCatLeading = catCount > dogCount
  const isDogLeading = dogCount > catCount

  const [catPercent, dogPercent] = useMemo(() => {
    if (total === 0) {
      return [50, 50]
    }
    const cat = (catCount / total) * 100
    const dog = (dogCount / total) * 100
    return [cat, dog]
  }, [catCount, dogCount, total])

  return (
    <div className="app">
      <header className="app-header">
        <p className="app-tagline">실시간 클릭 대결</p>
        <h1 className="app-title">
          고양이 vs 강아지 <span>클릭 배틀</span>
        </h1>
        <p className="app-subtitle">
          마음에 드는 캐릭터를 마구마구 클릭해서 응원해 주세요!
        </p>
      </header>

      <Scoreboard catCount={catCount} dogCount={dogCount} />

      <main className="battle-field" aria-label="캐릭터 선택 영역">
        <CharacterCard
          character={CHARACTERS[0]}
          count={catCount}
          percentage={catPercent}
          isLeading={isCatLeading}
          onClick={() => setCatCount((c) => c + 1)}
        />
        <div className="vs-badge" aria-hidden="true">
          VS
        </div>
        <CharacterCard
          character={CHARACTERS[1]}
          count={dogCount}
          percentage={dogPercent}
          isLeading={isDogLeading}
          onClick={() => setDogCount((c) => c + 1)}
        />
      </main>

      <footer className="app-footer">
        <div className="app-footer-row">
          <span className="chip chip--ghost">
            총 클릭 수: {total.toLocaleString('ko-KR')}
          </span>
          <button
            type="button"
            className="chip chip--reset"
            onClick={() => {
              setCatCount(0)
              setDogCount(0)
            }}
          >
            리셋하기
          </button>
        </div>
        <p className="app-footer-note">
          현재는 이 브라우저에서만 기록돼요.{' '}
          <span className="underline">
            추후 Firebase / Supabase로 전 세계 기록과 함께 경쟁도 가능
          </span>
          하도록 확장할 수 있는 구조로 만들어져 있습니다.
        </p>
      </footer>
    </div>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Books from './component/Books'
import Writers from './component/writers'

function App() {
  const [view, setView] = useState('books')

  // שם הספרנית — אם ריק, עדיין לא הוזן
  const [librarianName, setLibrarianName] = useState('')
  // האם להציג את טופס הכנסת השם (מופיע רק אם אין שם עדיין)
  const [showLibrarianForm, setShowLibrarianForm] = useState(false)

  // מטפל בשמירת שם הספרנית — שומר ומסתיר את הטופס
  function saveLibrarianName(name) {
    const trimmed = name.trim()
    if (trimmed) {
      setLibrarianName(trimmed)
      setShowLibrarianForm(false)
    }
  }

  return (
    <>
      <h1>ניהול ספרים וסופרים</h1>

      {/* ברכת שלום אם יש שם ספרנית */}
      {librarianName && (
        <p className="greeting">שלום {librarianName}</p>
      )}

      <div className="button-group">
        <button
          onClick={() => setView('books')}
          className={view === 'books' ? 'active' : ''}
        >
          ספרים
        </button>
        <button
          onClick={() => setView('writers')}
          className={view === 'writers' ? 'active' : ''}
        >
          סופרים
        </button>

        {/* כפתור לפרטי הספרנית: פותח את שדה הקלט אם עדיין אין שם */}
        <button
          onClick={() => { if (!librarianName) setShowLibrarianForm(true) }}
          disabled={Boolean(librarianName)}
        >
          פרטי ספרנית
        </button>
      </div>

      {/* טופס להוספת שם הספרנית — יופיע רק אם המשתמש לחץ על הכפתור ועדיין אין שם */}
      {showLibrarianForm && !librarianName && (
        <div className="librarian-form">
          <label>
            שם הספרנית:
            <input
              type="text"
              placeholder="הקלידי את שמך"
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveLibrarianName(e.target.value)
              }}
            />
          </label>
          <button
            onClick={() => {
              const input = document.querySelector('.librarian-form input')
              if (input) saveLibrarianName(input.value)
            }}
          >
            שמירה
          </button>
        </div>
      )}

      <div className="content">
        {view === 'books' && <Books />}
        {view === 'writers' && <Writers />}
      </div>
    </>
  )
}

export default App

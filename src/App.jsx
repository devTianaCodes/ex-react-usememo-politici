import { useEffect, useState } from 'react'

function App() {
  const [politicians, setPoliticians] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore durante il caricamento dei politici')
        }

        return response.json()
      })
      .then((data) => {
        setPoliticians(data)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, []) //dipendenza vuota che significa che l'effetto viene eseguito solo una volta al montaggio del componente

  return (
    <main className="app">
      <h1>Politici</h1>

      {loading && <p>Caricamento...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <section className="politicians-list">
          {politicians.map((politician) => (
            <article className="politician-card" key={politician.id}>
              <img
                className="politician-image"
                src={politician.image}
                alt={politician.name}
              />

              <h2>{politician.name}</h2>
              <h3>{politician.position}</h3>
              <p>{politician.biography}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default App

import { useEffect, useMemo, useState } from 'react'




function App() {
  const [politicians, setPoliticians] = useState([])
  const [search, setSearch] = useState('')
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


  //milesrone 2
  const filteredPoliticians = useMemo(() => {
    return politicians.filter((politician) => {
      const textToSearch = search.toLowerCase()
      const name = politician.name.toLowerCase()
      const biography = politician.biography.toLowerCase()

      return name.includes(textToSearch) || biography.includes(textToSearch)
    })
  }, [politicians, search]) //dipendenze: politicians e search. L'effetto viene eseguito ogni volta che politicians o search cambiano


  // const filteredPoliticians = useMemo(() => {
  //   return politicians.filter(politician => {
  //     const isInName = politician.name.toLowerCase().includes(search.toLowerCase());
  //     const isInBio = politician.biography.toLowerCase().includes(search.toLowerCase());

  //     return isInName || isInBio;
  //   });
  // }, [politicians, search]);


  return (
    <main className="app">
      <h1>Politici</h1>

      <input
        className="search-input"
        type="text"
        placeholder="Cerca per nome o biografia"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {loading && <p>Caricamento...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <section className="politicians-list">
          {filteredPoliticians.map((politician) => (
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

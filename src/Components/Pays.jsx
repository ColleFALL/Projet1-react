import React, { useState, useEffect } from "react";
import CountryModal from "./CountryModal";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,languages,population,area,currencies,maps,coatOfArms"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Erreur API:", err));
  }, []);

  const continents = [...new Set(countries.map((c) => c.region))].filter(Boolean);

  const countriesInContinent = selectedContinent
    ? countries.filter((c) => c.region === selectedContinent)
    : [];

  const filteredCountries = countriesInContinent.filter((c) =>
    c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCountries = [...filteredCountries].sort((a, b) =>
    sortOrder === "A-Z"
      ? a.name.common.localeCompare(b.name.common)
      : b.name.common.localeCompare(a.name.common)
  );

  // Styles communs
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "12px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  };

  const continentCardStyle = { ...cardStyle, padding: "8px" };
  const imgStyle = { width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px" };
  const continentImgStyle = { width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" };
  const titleStyle = { fontSize: "16px", fontWeight: "bold", margin: "8px 0" };
  const continentTitleStyle = { ...titleStyle, fontSize: "14px", margin: "6px 0" };
  const textStyle = { fontSize: "14px", margin: "4px 0" };
  const buttonStyle = { padding: "8px 14px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginBottom: "20px" };
  const searchBarStyle = { padding: "8px", margin: "0 10px", border: "1px solid #ccc", borderRadius: "6px", width: "200px" };

  const formatLanguages = (langs) => (langs ? Object.values(langs).join(", ") : "—");

  return (
    <div
      style={{
        padding: "80px 20px",
        textAlign: "center",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <h1>MondeConnecté : parcourez les continents et découvrez leurs pays</h1>

      {/* === Affichage des continents === */}
      {!selectedContinent && (
        <div className="continents-grid">
          {continents.map((continent) => {
            const countriesInCont = countries.filter((c) => c.region === continent);
            const randomCountry = countriesInCont[Math.floor(Math.random() * countriesInCont.length)];

            return (
              <div
                key={continent}
                style={continentCardStyle}
                onClick={() => setSelectedContinent(continent)}
              >
                <img
                  src={randomCountry?.flags.png || "https://via.placeholder.com/220x150?text=Continent"}
                  alt={continent}
                  style={continentImgStyle}
                />
                <h3 style={continentTitleStyle}>{continent}</h3>
              </div>
            );
          })}
        </div>
      )}

      {/* === Affichage des pays === */}
      {selectedContinent && (
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              gap: "10px",
            }}
          >
            <button style={buttonStyle} onClick={() => setSelectedContinent(null)}>
              &larr; Retour aux continents
            </button>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                borderRadius: "8px",
                gap: "10px",
              }}
            >
              <input
                type="text"
                placeholder="Rechercher un pays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchBarStyle}
              />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px" }}
              >
                <option value="A-Z">A → Z</option>
                <option value="Z-A">Z → A</option>
              </select>
            </div>
          </div>

          <h2 style={{ textAlign: "center" }}>{selectedContinent}</h2>

          <div className="countries-grid">
            {sortedCountries.map((c) => {
              const isHovered = hoveredCountry === c.name.common;
              return (
                <div
                  key={c.name.common}
                  style={{
                    ...cardStyle,
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                    boxShadow: isHovered
                      ? "0 6px 12px rgba(0,0,0,0.2)"
                      : "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={() => setHoveredCountry(c.name.common)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => setSelectedCountry(c)}
                >
                  <img src={c.flags.png} alt={c.name.common} style={imgStyle} />
                  <h3 style={titleStyle}>{c.name.common}</h3>

                  {isHovered && (
                    <div style={{ marginTop: "8px" }}>
                      <p style={textStyle}>
                        <strong>Capitale:</strong> {c.capital?.[0] || "—"}
                      </p>
                      <p style={textStyle}>
                        <strong>Population:</strong> {c.population?.toLocaleString() || "—"}
                      </p>
                      <p style={textStyle}>
                        <strong>Langues:</strong> {formatLanguages(c.languages)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedCountry && (
        <CountryModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />
      )}

      {/* === Responsivité === */}
      <style>{`
        /* === Par défaut === */
        .continents-grid {
          display: grid;
          grid-template-columns: repeat(3, 220px);
          gap: 70px;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          padding: 40px 0;
        }

        .countries-grid {
          display: grid;
          grid-template-columns: repeat(4, 220px);
          gap: 50px;
          justify-content: center;
          margin: 0 auto;
        }

        /* === Tablette (moins de 992px) === */
        @media (max-width: 992px) {
          .continents-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }

          .countries-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }

        /* === Mobile (moins de 600px) === */
        @media (max-width: 600px) {
          .continents-grid {
            grid-template-columns: repeat(1, 1fr);
            gap: 30px;
          }

          .countries-grid {
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
          }

          input, select {
            width: 100%;
          }

          h1 {
            font-size: 18px;
          }
        }
          .bouttonStyle{
          margin-left: 50px;}
      `}</style>
    </div>
  );
}

export default App;

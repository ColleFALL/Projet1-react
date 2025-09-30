import React, { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,languages,population"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Erreur API:", err));
  }, []);

  const continents = [...new Set(countries.map((c) => c.region))].filter(
    Boolean
  );

  const countriesInContinent = selectedContinent
    ? countries.filter((c) => c.region === selectedContinent)
    : [];

  const continentsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 220px)", // plus petit pour continents
    gap: "70px",
    justifyContent: "center",
    alignitems:   "center",
    // marginleft: "100px",
     margin: "0px auto", // espace autour du grid (haut/bas 40px)
  padding: "50px"
  };

  const countriesGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 220px)",
    gap: "50px",
    justifyContent: "center",
    margin: "0 auto",
  };

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

  const continentCardStyle = {
    ...cardStyle,
    padding: "8px",
  };

  const imgStyle = {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
  };

  const continentImgStyle = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  };

  const titleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "8px 0",
  };

  const continentTitleStyle = {
    ...titleStyle,
    fontSize: "14px",
    margin: "6px 0",
  };

  const textStyle = {
    fontSize: "14px",
    margin: "4px 0",
  };

  const buttonStyle = {
    padding: "8px 14px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  };

  const formatLanguages = (langs) =>
    langs ? Object.values(langs).join(", ") : "—";

  return (
    <div style={{ padding: "80px", textAlign: "center" }}>
      <h1>MondeConnecté : parcourez les continents et découvrez leurs pays »</h1>

      {!selectedContinent && (
        <div style={continentsGridStyle}>
          {continents.map((continent) => {
            const firstFlag = countries.find((c) => c.region === continent)?.flags?.png;

            return (
              <div
                style={continentCardStyle}
                key={continent}
                onClick={() => setSelectedContinent(continent)}
              >
                {firstFlag && (
                  <img
                    src={firstFlag}
                    alt={continent}
                    style={continentImgStyle}
                  />
                )}
                <h2 style={continentTitleStyle}>{continent}</h2>
              </div>
            );
          })}
        </div>
      )}

      {selectedContinent && (
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              style={buttonStyle}
              onClick={() => setSelectedContinent(null)}
            >
              &larr; Retour aux continents
            </button>
          </div>

          <h2 style={{ textAlign: "center" }}>{selectedContinent}</h2>

          <div style={countriesGridStyle}>
            {countriesInContinent.map((c) => {
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
                >
                  <img src={c.flags.png} alt={c.name.common} style={imgStyle} />
                  <h3 style={titleStyle}>{c.name.common}</h3>

                  {isHovered && (
                    <div
                      style={{
                        marginTop: "8px",
                        transition: "opacity 0.3s ease",
                        opacity: isHovered ? 1 : 0,
                      }}
                    >
                      <p style={textStyle}>
                        <strong>Capitale:</strong> {c.capital?.[0] || "—"}
                      </p>
                      <p style={textStyle}>
                        <strong>Population:</strong>{" "}
                        {c.population?.toLocaleString() || "—"}
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
    </div>
  );
}

export default App;

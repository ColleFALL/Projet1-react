import React from "react";

function CountryModal({ country, onClose }) {
  if (!country) return null;

  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  };

  const contentStyle = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    width: "100%",
    maxWidth: "900px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  };

  const cardStyle = {
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    padding: "15px 20px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
    borderBottom: "2px solid #007BFF",
    display: "inline-block",
  };

  const closeBtn = {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2>{country.name.common}</h2>
          <img
            src={country.flags.png}
            alt={country.name.common}
            width="180"
            style={{ borderRadius: "10px", marginTop: "10px" }}
          />
        </div>

        <div style={gridStyle}>
          {/* 🔹 Informations générales */}
          <div style={cardStyle}>
            <h3 style={titleStyle}>Informations générales</h3>
            <p><strong>Capitale :</strong> {country.capital?.[0] || "—"}</p>
            <p><strong>Population :</strong> {country.population?.toLocaleString()}</p>
            <p><strong>Langues :</strong> {Object.values(country.languages || {}).join(", ")}</p>
            <p><strong>Continent :</strong> {country.region}</p>
          </div>

          {/* 🔹 Économie */}
          <div style={cardStyle}>
            <h3 style={titleStyle}>Économie</h3>
            <p>
              <strong>Monnaie :</strong>{" "}
              {country.currencies
                ? Object.values(country.currencies)
                    .map((c) => `${c.name} (${c.symbol})`)
                    .join(", ")
                : "—"}
            </p>
          </div>

          {/* 🔹 Géographie */}
          <div style={cardStyle}>
            <h3 style={titleStyle}>Géographie</h3>
            <p><strong>Superficie :</strong> {country.area ? `${country.area.toLocaleString()} km²` : "—"}</p>
            <p><strong>Région :</strong> {country.subregion || "—"}</p>
          </div>

          {/* 🔹 Politique */}
          <div style={cardStyle}>
            <h3 style={titleStyle}>Politique</h3>
            <p><strong>Régime :</strong> {country.government || "Non spécifié"}</p>
          </div>

          {/* 🔹 Armoiries */}
          {country.coatOfArms?.png && (
            <div style={cardStyle}>
              <h3 style={titleStyle}>Armoiries</h3>
              <img
                src={country.coatOfArms.png}
                alt="Armoiries"
                width="150"
                style={{ marginTop: "10px" }}
              />
            </div>
          )}

          {/* 🔹 Liens utiles */}
          <div style={cardStyle}>
            <h3 style={titleStyle}>Liens utiles</h3>
            <p>
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#007BFF", textDecoration: "none" }}
              >
                🌍 Voir sur Google Maps
              </a>
            </p>
            <p>
              <a
                href={country.maps.openStreetMaps}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#007BFF", textDecoration: "none" }}
              >
                🗺️ Voir sur OpenStreetMap
              </a>
            </p>
          </div>
        </div>

        <button onClick={onClose} style={closeBtn}>
          Fermer
        </button>
      </div>
    </div>
  );
}

export default CountryModal;

import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("https://www.hubspot.com");
  const [oldPositioning, setOldPositioning] = useState("");
  const [newPositioning, setNewPositioning] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyzeWebsite() {
    setLoading(true);
    setResult(null);

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        old_positioning: oldPositioning,
        new_positioning: newPositioning,
      }),
    });

    const data = await response.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="app">
      <div className="hero">
        <h1>Website Repositioning Copilot</h1>

        <h2>Turn positioning intent into website execution.</h2>

        <p className="subtitle">
          Analyze a public website, identify messaging impacted by a positioning
          change, estimate effort, and generate suggested rewrites.
        </p>
      </div>

      <div className="form-grid">
        <div className="field">
          <label>Website URL</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>

        <div className="field">
          <label>Current Positioning</label>
          <textarea
            value={oldPositioning}
            onChange={(e) => setOldPositioning(e.target.value)}
            placeholder="Example: Go-to-market customer platform for marketing, sales, and service teams"
          />
        </div>

        <div className="field">
          <label>New Positioning</label>
          <textarea
            value={newPositioning}
            onChange={(e) => setNewPositioning(e.target.value)}
            placeholder="Example: AI content operations platform for enterprise marketing teams"
          />
        </div>
      </div>

      <button onClick={analyzeWebsite} disabled={loading}>
        {loading ? "Analyzing website..." : "Analyze Impact"}
      </button>

      {result && (
        <div className="results">
          <h2>Repositioning Impact Summary</h2>

          <div className="summary-grid">
            <div className="summary-card">
              <span>Impact</span>
              <strong>{result.analysis.impact_level}</strong>
            </div>

            <div className="summary-card">
              <span>Confidence</span>
              <strong>
                {result.analysis.confidence > 1
                ? `${Math.round(result.analysis.confidence)}%`
                : `${Math.round(result.analysis.confidence * 100)}%`}
              </strong>
            </div>

            <div className="summary-card">
              <span>Effort</span>
              <strong>{result.analysis.effort_estimate || "Medium"}</strong>
            </div>

            <div className="summary-card">
              <span>Pages Analyzed</span>
              <strong>{result.pages_analyzed || 1}</strong>
            </div>
          </div>

          <section className="insight-section">
            <h3>Why This Matters</h3>
            <p>{result.analysis.reason}</p>
          </section>

          <section className="insight-section">
            <h3>Affected Messaging</h3>
            <ul>
              {result.analysis.old_messaging_examples?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="insight-section">
            <h3>Suggested Rewrites</h3>

            <div className="rewrite-grid">
              {result.analysis.suggested_rewrites
                ?.slice(0, 5)
                .map((rewrite, index) => (
                  <div className="rewrite-card" key={index}>
                    <h4>Before</h4>
                    <p>{rewrite.before}</p>

                    <h4>After</h4>
                    <p>{rewrite.after}</p>

                    <h4>Why</h4>
                    <p>{rewrite.why}</p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
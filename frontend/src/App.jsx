import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("https://www.hubspot.com");
  const [oldPositioning, setOldPositioning] = useState("");
  const [newPositioning, setNewPositioning] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const examples = [
    {
      name: "B2B SaaS repositioning",
      url: "https://www.hubspot.com",
      oldPositioning:
        "Go-to-market customer platform for marketing, sales, and service teams.",
      newPositioning:
        "AI content operations platform for enterprise marketing teams.",
    },
    {
      name: "Developer platform shift",
      url: "https://www.vercel.com",
      oldPositioning:
        "Frontend cloud platform for developers and modern web teams.",
      newPositioning:
        "AI-native application deployment platform for product engineering teams.",
    },
    {
      name: "Fintech platform expansion",
      url: "https://stripe.com",
      oldPositioning:
        "Payments infrastructure for internet businesses.",
      newPositioning:
        "Financial operating system for AI-native companies.",
    },
  ];

  function loadExample(example) {
    setUrl(example.url);
    setOldPositioning(example.oldPositioning);
    setNewPositioning(example.newPositioning);
    setResult(null);
  }

  async function analyzeWebsite() {
    setLoading(true);
    setResult(null);

    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    const response = await fetch(`${apiUrl}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

  function getHostname(value) {
    try {
      return new URL(value).hostname;
    } catch {
      return value;
    }
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

      <div className="example-bar">
        <span>Demo scenarios:</span>

        {examples.map((example) => (
          <button
            key={example.name}
            type="button"
            className="example-button"
            onClick={() => loadExample(example)}
          >
            {example.name}
          </button>
        ))}
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

          {result.analysis.recommended_starting_points?.length > 0 && (
            <section className="insight-section">
              <h3>Recommended Starting Points</h3>
              <ol>
                {result.analysis.recommended_starting_points.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ol>
            </section>
          )}

          {result.analysis.effort_details && (
            <section className="insight-section">
              <h3>Effort Assessment</h3>
              <p>{result.analysis.effort_details}</p>
            </section>
          )}

          <section className="insight-section">
            <h3>Key Messaging Conflicts</h3>
            <ul>
              {result.analysis.old_messaging_examples?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="insight-section">
            <h3>Suggested Rewrites</h3>

            <p className="rewrite-summary">
              {result.analysis.suggested_rewrites?.length || 0} recommended
              changes for new positioning.
            </p>

            <div className="rewrite-grid">
              {result.analysis.suggested_rewrites
                ?.slice(0, 5)
                .map((rewrite, index) => (
                  <div className="rewrite-card" key={index}>
                    <div className="rewrite-header">
                      <span>
                        Change #{index + 1} • 📍{" "}
                        {rewrite.location || "Unknown"}
                      </span>

                      <a
                        href={rewrite.source_url || result.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        🌐 {getHostname(rewrite.source_url || result.url)}
                      </a>
                    </div>

                    <div className="before-block">
                      <h4>Before</h4>
                      <p>{rewrite.before}</p>
                    </div>

                    <div className="after-block">
                      <h4>After</h4>
                      <p>{rewrite.after}</p>
                    </div>

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
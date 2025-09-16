import React, { useState } from "react";
import "./dashboard.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export default function Dashboard() {
  const [files, setFiles] = useState({ lane1: null, lane2: null, lane3: null, lane4: null });
  const [filePreviews, setFilePreviews] = useState({});
  const [result, setResult] = useState(null);
  const [annotatedImages, setAnnotatedImages] = useState({});
  const [greenTime, setGreenTime] = useState(25);

  const handleFileChange = (lane, file) => {
    if (file) {
      setFiles(prev => ({ ...prev, [lane]: file }));
      setFilePreviews(prev => ({ ...prev, [lane]: URL.createObjectURL(file) }));
    }
  };

  const handleUpload = async () => {
    const form = new FormData();
    Object.values(files).forEach(f => { if (f) form.append("files", f); });

    if ([...form.entries()].length === 0) {
      alert("Please upload at least one lane image");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/upload/images`, { method: "POST", body: form });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Upload failed");
      }
      const data = await res.json();
      setResult(data);
      if (data.annotated_images) setAnnotatedImages(data.annotated_images);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload images. See console for details.");
    }
  };

  return (
    <div className="dashboard-layout">
      <main className="main">
        <header className="header">
          <h1>🚦 Smart Traffic Management</h1>
        </header>

        {/* Upload Section */}
        <div className="card">
          <h2>📸 Upload Lane Images</h2>
          <p>Select up to 4 lanes (Lane 1 → Lane 4):</p>
          <div className="lane-uploaders">
            {["lane1","lane2","lane3","lane4"].map((lane, idx) => (
              <div key={lane} className="lane-input">
                <label>
                  Lane {idx+1}: 
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,image/*"
                    onChange={(e)=>handleFileChange(lane, e.target.files[0])}
                  />
                </label>
                {/* Show preview until backend annotated image arrives */}
                <div className="preview-wrapper">
                  {annotatedImages[lane] ? (
                    <img src={annotatedImages[lane]} alt={`${lane} annotated`} className="preview-img" />
                  ) : filePreviews[lane] ? (
                    <img src={filePreviews[lane]} alt={`${lane} preview`} className="preview-img" />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <button className="btn" onClick={handleUpload}>🚀 Analyze Traffic</button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="card">
            <h2>📊 Analysis Results</h2>
            <div className="results-grid">
              {Object.entries(result.counts).map(([lane, counts]) => (
                <div key={lane} className={`lane-result ${result.signal_plan.lane_with_priority === lane ? "highlight" : ""}`}>
                  <h3>{lane.toUpperCase()}</h3>
                  
                  {/* Annotated image */}
                  {annotatedImages[lane] && (
                    <img
                      src={annotatedImages[lane]}
                      alt={`${lane} annotated`}
                      className="result-thumb"
                    />
                  )}

                  {/* Counts */}
                  <ul>
                    {Object.keys(counts).length === 0 ? <li>No detections</li> : null}
                    {Object.entries(counts).map(([vehicle, num]) => (
                      <li key={vehicle}><strong>{vehicle}</strong>: {num}</li>
                    ))}
                  </ul>

                  {/* Green signal time */}
                  <p className="lane-signal">
                    ⏱ Green: <strong>{result.per_lane_signal[lane]} sec</strong>
                  </p>
                </div>
              ))}
            </div>

            <div className="signal-summary">
              ✅ Priority: <strong>{(result.signal_plan.lane_with_priority || "").toUpperCase()}</strong>
              {" "}→ Green for <strong>{result.signal_plan.green_time_sec}</strong> sec
            </div>
          </div>
        )}

        {/* Signal Control */}
        <div className="card">
          <h2>🚦 Signal Control</h2>
          <p>Current Green Time: <strong>{greenTime} sec</strong></p>
          <div className="signal-buttons">
            <button className="btn extend" onClick={() => setGreenTime(greenTime + 5)}>Extend Green</button>
            <button className="btn reduce" onClick={() => setGreenTime(Math.max(0, greenTime - 5))}>Reduce Green</button>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function MultiImageUpload() {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFiles(Array.from(e.target.files).slice(0, 4)); // limit to 4
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("Select up to 4 images");

    const form = new FormData();
    files.forEach((f) => form.append("files", f));

    const res = await fetch(`${API_BASE}/upload/images`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Error" }));
      alert(err.detail);
      return;
    }

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="card">
      <h2>🚦 Multi-Lane Image Upload</h2>
      <input type="file" accept="image/*" multiple onChange={handleChange} />
      <button className="btn" onClick={handleUpload}>
        Analyze Traffic
      </button>

      {result && (
        <div className="result">
          <h3>Vehicle Counts (per lane)</h3>
          <pre>{JSON.stringify(result.counts, null, 2)}</pre>
          <h3>Optimized Signal Plan</h3>
          <pre>{JSON.stringify(result.signal_plan, null, 2)}</pre>
          <h3>Technical Notes</h3>
          <pre>{JSON.stringify(result.technical_notes, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

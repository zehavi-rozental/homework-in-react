import { useState, useEffect } from "react";
import { getBooks } from "../data/books";

function Writers() {
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    let mounted = true;
    getBooks().then((books) => {
      if (!mounted) return;
      const uniq = [...new Set((books || []).map((b) => b.author || "Unknown"))];
      setWriters(uniq);
    });
    return () => { mounted = false };
  }, []);

  return (
    <div>
      <h2>רשימת סופרים</h2>
      <ul>
        {writers.map((writer, index) => (
          <li key={index}>{writer}</li>
        ))}
      </ul>
    </div>
  );
}

export default Writers;
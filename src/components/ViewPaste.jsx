import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/formatDate";


export default function ViewPaste() {
  const { id } = useParams();
  const pastes = useSelector((s) => s.paste.pastes);

  // Find the paste by id (from Redux first, then localStorage as fallback)
  let paste = pastes.find((p) => String(p._id) === String(id));
  if (!paste) {
    try {
      const saved = JSON.parse(localStorage.getItem("pastes") || "[]");
      paste = saved.find((p) => String(p._id) === String(id));
    } catch {}
  }

  if (!paste) {
    return (
      <div className="w-full max-w-3xl text-center">
        <p className="text-gray-500">Paste not found.</p>
        <Link
          to="/pastes"
          className="mt-3 inline-block px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Back to all pastes
        </Link>
      </div>
    );
  }

// ...existing code...
  return (
    <article className="w-full max-w-3xl">
      <h1 className="text-2xl font-semibold text-white inline-block border-b-2 border-white/40 pb-1">
        {paste.title}
      </h1>
      <div className="mt-3 rounded-lg border border-gray-200 bg-white p-4 text-gray-900 whitespace-pre-wrap">
        {paste.content}
      </div>
      <p className="mt-3 text-sm text-gray-500">
        {formatDate(paste.updatedAt || paste.createdAt)}
      </p>
    </article>
  );
// ...existing code...
}
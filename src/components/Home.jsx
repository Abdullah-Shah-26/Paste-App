import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtoPaste, updateToPastes } from "../redux/pasteSlice.jsx";
import toast from "react-hot-toast";

export default function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);




// ...existing code...
useEffect(() => {
  if (!pasteId) return;
  const paste = allPastes.find(p => String(p._id) === String(pasteId));
  if (paste) {
    setTitle(paste.title ?? "");
    setValue(paste.content ?? "");
  }
}, [pasteId, allPastes]);

function createPaste() {
  const t = title.trim();
  const c = value.trim();
  if (!t || !c) { toast.error("Please enter a title and content"); return; }

  if (pasteId) {
    dispatch(updateToPastes({
      _id: pasteId,               // keep the same id
      title: t,
      content: c,
      updatedAt: new Date().toISOString(),
    }));
    toast.success("Paste updated");
  } else {
    dispatch(addtoPaste({
      _id: Date.now().toString(36),
      title: t,
      content: c,
      createdAt: new Date().toISOString(),
    }));
    toast.success("Paste created");
  }

  setTitle("");
  setValue("");
  setSearchParams({});
}
// ...existing code...

  return (
    <section className="w-full mx-auto max-w-3xl">
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <input
          className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
         className="w-full p-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>

        <textarea
          className="w-full min-h-[260px] p-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={12}
        />
      </div>
    </section>
  );
}

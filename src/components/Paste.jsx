import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId){
dispatch(removeFromPastes(pasteId))
  }

return (
<div className="w-full">
<input
  className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500"
  type="search"
  placeholder="search here"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

<div className="w-full flex flex-col gap-3 mt-5">
  {filteredData.length > 0 &&
    filteredData.map((paste) => (
     <div
  key={paste._id || paste.title}
  className="rounded-lg border border-gray-200 p-3"
>
 <h3 className="text-base font-semibold border-b border-gray-200 pb-1 mb-2">
             {paste.title}
           </h3>
             <div className=" whitespace-pre-wrap">
               {paste.content}
             </div>

  <div className="mt-3 mb-2 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-md bg-amber-500 text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  // ...existing code...
                 onClick={() => navigate(`/?pasteId=${paste._id}`)}
                 >
                 <a href={`/?pasteId=${paste?._id}`} />
                
                  Edit
                </button>

                <button
                  type="button"
                  className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => navigate(`/pastes/${paste._id}`)} // VIEW → detail route
                >
                  <a href={`/?pasteId=${paste?._id}`}/>
                  View
                </button>

          <button
          onClick={() => handleDelete(paste._id)}
            type="button"
            className="px-3 py-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-700
                      focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            Delete
          </button>

          <button

          onClick={() =>{
            navigator.clipboard.writeText(paste?.content)
            toast.success("Copied to Clipboard")
          }}
            type="button"
            className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200
                      focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Copy
          </button>
                   <button
            type="button"
            className="px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700
                      focus:outline-none focus:ring-2 focus:ring-emerald-400"
            onClick={async () => {
              const base = window.location.origin;
              const url = paste?._id ? `${base}/pastes/${paste._id}` : base;
              try {
                if (navigator.share) {
                  await navigator.share({
                    title: paste?.title || "Paste",
                    text: paste?.title || "Check this paste",
                    url,
                  });
                } else {
                  await navigator.clipboard.writeText(url);
                  toast.success("Link Copied");
                }
              } catch (err) {
                if (err?.name !== "AbortError") {
                  try {
                    await navigator.clipboard.writeText(url); // fixed here
                    toast.success("Link Copied");
                  } catch {
                    toast.error("Unable to Share");
                  }
                }
              }
            }}
          >
            Share

          </button>
        </div>
      <div>
     {formatDate(paste.updatedAt || paste.createdAt)}
      </div>

      </div>
    ))}
</div>
</div>
);
};

export default Paste;

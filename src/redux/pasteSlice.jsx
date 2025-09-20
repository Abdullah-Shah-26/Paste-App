import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: (() => {
    const raw = localStorage.getItem("pastes");
    try { return raw ? JSON.parse(raw) : []; } catch { return []; }
  })(),
};


export const pasteSlice = createSlice({
  name: "pastes",
  initialState,
  reducers: {
    addtoPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      -localStorage.setItem("pastes", state.pastes);
      -toast("Paste created successfully") +
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },
    updateToPastes: (state, action) => {
      const updated = action.payload;
      const i = state.pastes.findIndex(p => String(p._id) === String(updated._id));
      if (i !== -1) {
        state.pastes[i] = { ...state.pastes[i], ...updated };
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
          toast.success("Paste updated");
      }
    },
    // ...existing code...
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
     removeFromPastes: (state, action) => {
      const id =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?._id;

      state.pastes = state.pastes.filter((p) => p._id !== id);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
       toast.success("Paste deleted");
    },
  },
});


// Action creators are generated for each case reducer function
export const { addtoPaste, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;

"use client";
import { useEffect, useState } from "react";

export default function MenuButton() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const nav = document.getElementById("nav");
    nav?.classList.toggle("open", open);
    const close = () => setOpen(false);
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    nav?.addEventListener("click", close);
    document.addEventListener("keydown", escape);
    return () => {
      nav?.classList.remove("open");
      nav?.removeEventListener("click", close);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <button
      className="menu-btn"
      type="button"
      aria-expanded={open}
      aria-controls="nav"
      onClick={() => setOpen((value) => !value)}
    >
      Menu <span>☰</span>
    </button>
  );
}

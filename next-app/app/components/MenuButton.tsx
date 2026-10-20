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
    // A submenu chevron is a button: keep the mobile navigation open
    // until a real navigation link is clicked.
    const closeOnNavigation = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a")) close();
    };
    nav?.addEventListener("click", closeOnNavigation);
    document.addEventListener("keydown", escape);
    return () => {
      nav?.classList.remove("open");
      nav?.removeEventListener("click", closeOnNavigation);
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

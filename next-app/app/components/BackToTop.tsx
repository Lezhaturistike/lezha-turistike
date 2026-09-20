"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 300);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <a
      className={`back-to-top${visible ? " visible" : ""}`}
      href="#home"
      aria-label="Ngjitu në krye të faqes"
      title="Ngjitu lart"
    >
      ↑
    </a>
  );
}

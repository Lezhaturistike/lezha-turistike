"use client";
import { useEffect, useState } from "react";

export default function BackToTop({locale="sq"}:{locale?:"sq"|"en"}) {
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
      aria-label={locale === "en" ? "Back to top" : "Ngjitu në krye të faqes"}
      title={locale === "en" ? "Back to top" : "Ngjitu lart"}
    >
      ↑
    </a>
  );
}

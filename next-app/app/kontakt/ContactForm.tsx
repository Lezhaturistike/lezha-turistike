"use client";

import {FormEvent, useState} from "react";

type Locale = "sq" | "en";

const copy = {
  sq: {
    eyebrow: "NA SHKRUAJ",
    title: "Si mund të të ndihmojmë?",
    name: "Emri dhe mbiemri",
    email: "Email",
    subject: "Subjekti",
    message: "Mesazhi",
    placeholder: "Zgjidh një temë",
    subjects: ["Informacion turistik", "Web GIS", "Trashëgimi & Arkeologji", "Bashkëpunim", "Media / Kërkim shkencor", "Tjetër"],
    send: "Dërgo mesazhin",
    note: "Duke vazhduar, aplikacioni i emailit do të hapet me mesazhin tënd të përgatitur."
  },
  en: {
    eyebrow: "WRITE TO US",
    title: "How can we help?",
    name: "Full name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    placeholder: "Choose a topic",
    subjects: ["Tourist information", "Web GIS", "Heritage & Archaeology", "Collaboration", "Media / Research", "Other"],
    send: "Send message",
    note: "Your email app will open with your message prepared and ready to send."
  }
};

export default function ContactForm({locale = "sq"}: {locale?: Locale}) {
  const t = copy[locale];
  const [subject, setSubject] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const chosenSubject = String(data.get("subject") || "").trim();
    const body = locale === "sq"
      ? `Emri: ${name}\nEmail: ${email}\n\n${message}`
      : `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:lezhaturistike@gmail.com?subject=${encodeURIComponent(chosenSubject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form-card" onSubmit={submit}>
      <span className="overline">{t.eyebrow}</span>
      <h2>{t.title}</h2>
      <div className="contact-form-grid">
        <label><span>{t.name}</span><input name="name" type="text" autoComplete="name" required /></label>
        <label><span>{t.email}</span><input name="email" type="email" autoComplete="email" required /></label>
      </div>
      <label><span>{t.subject}</span><select name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required><option value="" disabled>{t.placeholder}</option>{t.subjects.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      <label><span>{t.message}</span><textarea name="message" rows={6} required /></label>
      <button className="contact-submit" type="submit"><span>{t.send}</span><span className="arrow-icon" aria-hidden="true">↗</span></button>
      <p className="contact-form-note">{t.note}</p>
      <style jsx>{`
        .contact-form-card{background:var(--surface,#fff);border:1px solid rgba(23,61,57,.14);padding:clamp(26px,4vw,46px);display:grid;gap:20px;box-shadow:0 24px 70px rgba(16,38,35,.08)}
        h2{font-size:clamp(1.8rem,4vw,3rem);margin:0 0 8px;line-height:1.05}.contact-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}label{display:grid;gap:8px}label>span{font-size:.72rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase}input,select,textarea{width:100%;box-sizing:border-box;border:1px solid rgba(23,61,57,.2);background:transparent;color:inherit;padding:14px 15px;font:inherit;border-radius:0;outline:none}textarea{resize:vertical;min-height:145px}input:focus,select:focus,textarea:focus{border-color:#b6763e;box-shadow:0 0 0 2px rgba(182,118,62,.12)}.contact-submit{min-height:58px;border:0;background:#173d39;color:#fff;padding:16px 19px;display:flex;align-items:center;justify-content:space-between;font:inherit;font-weight:800;cursor:pointer}.contact-form-note{font-size:.78rem;opacity:.66;margin:0;line-height:1.55}
        :global(html[data-theme="dark"]) .contact-form-card{background:#17302d;border-color:rgba(247,243,236,.14);box-shadow:none}:global(html[data-theme="dark"]) input,:global(html[data-theme="dark"]) select,:global(html[data-theme="dark"]) textarea{border-color:rgba(247,243,236,.2);color:#f7f3ec;background:#17302d}:global(html[data-theme="dark"]) option{background:#17302d;color:#f7f3ec}:global(html[data-theme="dark"]) .contact-submit{background:#f1e8da;color:#173d39}
        @media(max-width:620px){.contact-form-grid{grid-template-columns:1fr}.contact-form-card{padding:24px 20px}}
      `}</style>
    </form>
  );
}

"use client";

import {FormEvent, useState} from "react";

type Locale = "sq" | "en";

const copy = {
  sq: {
    eyebrow: "NA SHKRUAJ", title: "Dërgo një mesazh", subtitle: "Plotëso formularin dhe mesazhi yt do të mbërrijë direkt te Lezha Turistike.", name: "Emri dhe mbiemri", email: "Email", subject: "Subjekti", message: "Mesazhi", placeholder: "Zgjidh një temë",
    subjects: ["Informacion turistik", "Web GIS", "Trashëgimi & Arkeologji", "Bashkëpunim", "Media / Kërkim shkencor", "Tjetër"],
    send: "Dërgo mesazhin", sending: "Duke dërguar…", success: "Mesazhi u dërgua me sukses. Faleminderit që na kontaktuat!", error: "Mesazhi nuk u dërgua. Ju lutemi provoni përsëri.", note: "Zakonisht përgjigjemi sa më shpejt të jetë e mundur."
  },
  en: {
    eyebrow: "WRITE TO US", title: "Send a message", subtitle: "Complete the form and your message will be delivered directly to Lezha Turistike.", name: "Full name", email: "Email", subject: "Subject", message: "Message", placeholder: "Choose a topic",
    subjects: ["Tourist information", "Web GIS", "Heritage & Archaeology", "Collaboration", "Media / Research", "Other"],
    send: "Send message", sending: "Sending…", success: "Your message was sent successfully. Thank you for contacting us!", error: "Your message could not be sent. Please try again.", note: "We usually reply as soon as possible."
  }
};

export default function ContactForm({locale = "sq"}: {locale?: Locale}) {
  const t = copy[locale];
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:String(data.get("name")||"").trim(),email:String(data.get("email")||"").trim(),subject:String(data.get("subject")||"").trim(),message:String(data.get("message")||"").trim()})});
      if (!response.ok) throw new Error("Send failed");
      setStatus("success"); setSubject(""); form.reset();
    } catch { setStatus("error"); }
  }

  return (
    <form id="contact-form" className="contact-form-card" onSubmit={submit}>
      <div className="form-heading"><span className="overline">{t.eyebrow}</span><h2>{t.title}</h2><p>{t.subtitle}</p></div>
      <div className="contact-form-grid">
        <label><span>{t.name}</span><input name="name" type="text" autoComplete="name" maxLength={120} required /></label>
        <label><span>{t.email}</span><input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      </div>
      <label><span>{t.subject}</span><select name="subject" value={subject} onChange={(e)=>setSubject(e.target.value)} required><option value="" disabled>{t.placeholder}</option>{t.subjects.map((item)=><option key={item} value={item}>{item}</option>)}</select></label>
      <label><span>{t.message}</span><textarea name="message" rows={6} maxLength={5000} required /></label>
      <button className="contact-submit" type="submit" disabled={status==="sending"}><span>{status==="sending"?t.sending:t.send}</span><span className="arrow-icon" aria-hidden="true">↗</span></button>
      {status==="success"&&<p className="contact-status success" role="status">{t.success}</p>}
      {status==="error"&&<p className="contact-status error" role="alert">{t.error}</p>}
      <p className="contact-form-note">{t.note}</p>
      <style jsx>{`
        .contact-form-card{scroll-margin-top:120px;position:relative;overflow:hidden;background:linear-gradient(145deg,#fff 0%,#fbf8f3 100%);border:1px solid rgba(23,61,57,.12);border-radius:28px;padding:clamp(28px,4.5vw,54px);display:grid;gap:22px;box-shadow:0 30px 80px rgba(16,38,35,.11)}
        .contact-form-card:before{content:"";position:absolute;width:220px;height:220px;border-radius:50%;right:-90px;top:-110px;background:rgba(182,118,62,.09);pointer-events:none}.form-heading{position:relative;margin-bottom:8px}.form-heading h2{font-size:clamp(2rem,4vw,3.35rem);letter-spacing:-.035em;margin:12px 0 12px;line-height:1}.form-heading p{margin:0;max-width:520px;line-height:1.65;opacity:.67}.contact-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}label{display:grid;gap:9px}label>span{font-size:.69rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;opacity:.78}input,select,textarea{width:100%;box-sizing:border-box;border:1px solid rgba(23,61,57,.16);background:rgba(255,255,255,.7);color:inherit;padding:15px 16px;font:inherit;border-radius:12px;outline:none;transition:border-color .2s,box-shadow .2s,background .2s}textarea{resize:vertical;min-height:155px}input:focus,select:focus,textarea:focus{border-color:#b6763e;background:#fff;box-shadow:0 0 0 3px rgba(182,118,62,.1)}.contact-submit{min-height:60px;border:0;border-radius:12px;background:#173d39;color:#fff;padding:17px 20px;display:flex;align-items:center;justify-content:space-between;font:inherit;font-weight:800;cursor:pointer;transition:transform .2s,background .2s}.contact-submit:hover{transform:translateY(-2px);background:#204d48}.contact-submit:disabled{opacity:.65;cursor:wait;transform:none}.contact-form-note{font-size:.78rem;opacity:.58;margin:0;line-height:1.55}.contact-status{margin:0;padding:13px 15px;border-radius:10px;font-size:.9rem;font-weight:700}.contact-status.success{background:rgba(42,122,79,.1);color:#246c48}.contact-status.error{background:rgba(170,55,55,.1);color:#a13737}
        :global(html[data-theme="dark"]) .contact-form-card{background:linear-gradient(145deg,#17302d 0%,#102724 100%);border-color:rgba(247,243,236,.13);box-shadow:0 30px 80px rgba(0,0,0,.18)}:global(html[data-theme="dark"]) .contact-form-card:before{background:rgba(212,157,104,.1)}:global(html[data-theme="dark"]) input,:global(html[data-theme="dark"]) select,:global(html[data-theme="dark"]) textarea{border-color:rgba(247,243,236,.17);color:#f7f3ec;background:rgba(255,255,255,.035)}:global(html[data-theme="dark"]) input:focus,:global(html[data-theme="dark"]) select:focus,:global(html[data-theme="dark"]) textarea:focus{background:rgba(255,255,255,.06);border-color:#d49d68}:global(html[data-theme="dark"]) option{background:#17302d;color:#f7f3ec}:global(html[data-theme="dark"]) .contact-submit{background:#f1e8da;color:#173d39}:global(html[data-theme="dark"]) .contact-status.success{color:#bce4ca}:global(html[data-theme="dark"]) .contact-status.error{color:#ffc4c4}
        @media(max-width:620px){.contact-form-grid{grid-template-columns:1fr}.contact-form-card{padding:28px 20px;border-radius:20px}}
      `}</style>
    </form>
  );
}

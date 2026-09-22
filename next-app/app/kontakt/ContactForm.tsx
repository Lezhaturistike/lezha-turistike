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
      <div className="card-glow" aria-hidden="true" />
      <div className="form-heading"><span className="overline">{t.eyebrow}</span><h2>{t.title}</h2><p>{t.subtitle}</p></div>
      <div className="contact-form-grid">
        <label><span>{t.name}</span><input name="name" type="text" autoComplete="name" maxLength={120} required /></label>
        <label><span>{t.email}</span><input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      </div>
      <label><span>{t.subject}</span><select name="subject" value={subject} onChange={(e)=>setSubject(e.target.value)} required><option value="" disabled>{t.placeholder}</option>{t.subjects.map((item)=><option key={item} value={item}>{item}</option>)}</select></label>
      <label><span>{t.message}</span><textarea name="message" rows={6} maxLength={5000} required /></label>
      <div className="form-actions"><button className="contact-submit" type="submit" disabled={status==="sending"}><span>{status==="sending"?t.sending:t.send}</span><span className="submit-arrow" aria-hidden="true">↗</span></button><p className="contact-form-note">{t.note}</p></div>
      {status==="success"&&<p className="contact-status success" role="status">{t.success}</p>}
      {status==="error"&&<p className="contact-status error" role="alert">{t.error}</p>}
      <style jsx>{`
        .contact-form-card{scroll-margin-top:120px;position:relative;isolation:isolate;overflow:hidden;background:rgba(255,255,255,.78);border:1px solid rgba(23,61,57,.11);border-radius:36px;padding:clamp(30px,4.5vw,58px);display:grid;gap:24px;box-shadow:0 24px 70px rgba(16,38,35,.10),inset 0 1px 0 rgba(255,255,255,.9);backdrop-filter:blur(18px)}
        .contact-form-card:after{content:"";position:absolute;inset:0 0 auto 0;height:4px;background:linear-gradient(90deg,#173d39,#b6763e 55%,transparent);z-index:-1}.card-glow{position:absolute;width:360px;height:360px;border-radius:50%;right:-180px;top:-190px;background:radial-gradient(circle,rgba(182,118,62,.14),transparent 68%);pointer-events:none;z-index:-1}.form-heading{position:relative;margin-bottom:10px;padding-right:8%}.form-heading h2{font-size:clamp(2.15rem,4vw,3.6rem);letter-spacing:-.045em;margin:13px 0 14px;line-height:.98}.form-heading p{margin:0;max-width:560px;line-height:1.7;opacity:.64}.contact-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}label{display:grid;gap:9px}label>span{font-size:.67rem;font-weight:850;letter-spacing:.14em;text-transform:uppercase;opacity:.7}input,select,textarea{width:100%;box-sizing:border-box;border:1px solid rgba(23,61,57,.13);background:rgba(247,243,236,.56);color:inherit;padding:16px 17px;font:inherit;border-radius:15px;outline:none;transition:border-color .2s,box-shadow .2s,background .2s,transform .2s}textarea{resize:vertical;min-height:170px}input:hover,select:hover,textarea:hover{border-color:rgba(23,61,57,.28)}input:focus,select:focus,textarea:focus{border-color:#b6763e;background:#fff;box-shadow:0 0 0 4px rgba(182,118,62,.09);transform:translateY(-1px)}.form-actions{display:flex;align-items:center;gap:20px;margin-top:2px}.contact-submit{min-height:62px;border:0;border-radius:999px;background:#173d39;color:#fff;padding:9px 10px 9px 24px;display:inline-flex;align-items:center;gap:24px;font:inherit;font-weight:800;cursor:pointer;box-shadow:0 12px 28px rgba(23,61,57,.18);transition:transform .22s,box-shadow .22s,background .22s}.submit-arrow{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.13);font-size:1.15rem;transition:transform .22s}.contact-submit:hover{transform:translateY(-2px);background:#204d48;box-shadow:0 16px 34px rgba(23,61,57,.24)}.contact-submit:hover .submit-arrow{transform:rotate(45deg)}.contact-submit:disabled{opacity:.65;cursor:wait;transform:none}.contact-form-note{font-size:.76rem;opacity:.52;margin:0;line-height:1.55;max-width:220px}.contact-status{margin:0;padding:14px 16px;border-radius:14px;font-size:.9rem;font-weight:700}.contact-status.success{background:rgba(42,122,79,.1);color:#246c48}.contact-status.error{background:rgba(170,55,55,.1);color:#a13737}
        :global(html[data-theme="dark"]) .contact-form-card{background:rgba(16,39,36,.78);border-color:rgba(247,243,236,.12);box-shadow:0 28px 80px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.05)}:global(html[data-theme="dark"]) .contact-form-card:after{background:linear-gradient(90deg,#d8e4df,#d49d68 55%,transparent)}:global(html[data-theme="dark"]) .card-glow{background:radial-gradient(circle,rgba(212,157,104,.13),transparent 68%)}:global(html[data-theme="dark"]) input,:global(html[data-theme="dark"]) select,:global(html[data-theme="dark"]) textarea{border-color:rgba(247,243,236,.14);color:#f7f3ec;background:rgba(255,255,255,.035)}:global(html[data-theme="dark"]) input:hover,:global(html[data-theme="dark"]) select:hover,:global(html[data-theme="dark"]) textarea:hover{border-color:rgba(247,243,236,.28)}:global(html[data-theme="dark"]) input:focus,:global(html[data-theme="dark"]) select:focus,:global(html[data-theme="dark"]) textarea:focus{background:rgba(255,255,255,.06);border-color:#d49d68}:global(html[data-theme="dark"]) option{background:#17302d;color:#f7f3ec}:global(html[data-theme="dark"]) .contact-submit{background:#f1e8da;color:#173d39}:global(html[data-theme="dark"]) .submit-arrow{background:rgba(23,61,57,.1)}:global(html[data-theme="dark"]) .contact-status.success{color:#bce4ca}:global(html[data-theme="dark"]) .contact-status.error{color:#ffc4c4}
        @media(max-width:620px){.contact-form-grid{grid-template-columns:1fr}.contact-form-card{padding:30px 20px;border-radius:24px}.form-heading{padding-right:0}.form-actions{align-items:flex-start;flex-direction:column}.contact-submit{width:100%;justify-content:space-between}.contact-form-note{max-width:none}}
      `}</style>
    </form>
  );
}

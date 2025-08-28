import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Clock, ShieldCheck, MapPin, Car, Accessibility, Baby, PawPrint, Info, CheckCircle2, ChevronDown, Globe, Mail, Facebook, Instagram, Twitter, Building2, CreditCard, FileText, Lock } from "lucide-react";

const BRAND = "Taxi Bonjour";
const PHONE_DISPLAY = "+1 (438) 529-2358";
const PHONE_TEL = "+14385292358"; // tel: format (digits only), works for mobile click-to-call
const EMAIL_BOOKINGS = "reserve.taxibonjour@gmail.com";
const ADDRESS = "H2V, Montréal, QC";
const BUSINESS_HOURS = [
  { d: "Lun–Ven", h: "24/7" },
  { d: "Sam–Dim", h: "24/7" },
];

const SOCIAL = {
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  twitter: "https://x.com/",
};

const t = {
  fr: {
    nav: { home: "Accueil", services: "Services", prices: "Tarifs", enterprise: "Entreprise", faq: "FAQ", contact: "Contact" },
    hero: {
      headline: "Réservez un taxi fiable, facilement.",
      sub: "Service téléphonique 24/7 à Montréal. Chauffeurs qualifiés, facturation conforme, assistance humaine.",
      call: "Appeler maintenant",
      book: "Réserver en ligne",
    },
    badges: { b1: "24/7", b2: "Chauffeurs qualifiés", b3: "Facturation conforme", b4: "Couverture Montréal" },
    form: {
      title: "Réservation en ligne",
      name: "Nom complet",
      phone: "Téléphone",
      email: "Courriel (optionnel)",
      pickup: "Adresse de prise en charge",
      dropoff: "Destination",
      datetime: "Date & heure",
      options: "Options",
      wheelchair: "Véhicule accessible",
      baby: "Siège bébé",
      pets: "Animaux",
      notes: "Notes (code porte, étage, etc.)",
      consent: "J’accepte les conditions et la politique de confidentialité",
      submit: "Envoyer la demande",
      submitting: "Envoi…",
      success: "Demande envoyée ! Nous vous contactons très vite.",
      required: "Champ requis",
    },
    enterprise: {
      title: "Comptes entreprise",
      sub: "Hôtels, cliniques, bureaux : simplifiez vos déplacements avec une ligne dédiée et une facturation mensuelle.",
      org: "Nom de l’entreprise",
      contact: "Personne contact",
      email: "Courriel",
      phone: "Téléphone",
      message: "Message",
      submit: "Demander une démo",
      success: "Merci ! Nous vous écrivons sous peu pour planifier une démo.",
    },
    services: {
      title: "Services",
      s1: { title: "Courses à la demande", desc: "Appel direct ou réservation planifiée selon vos besoins." },
      s2: { title: "Transferts aéroports", desc: "Suivi des vols et départs matinaux sans stress." },
      s3: { title: "Accessibilité", desc: "Véhicules adaptés disponibles sur demande." },
      s4: { title: "Comptes corporatifs", desc: "Portail et rapports pour votre entreprise." },
    },
    prices: {
      title: "Tarifs & facturation",
      p1: "Tarification conforme à la réglementation en vigueur (frais réglementaires applicables).",
      p2: "Paiements acceptés : cartes, sans contact et espèces.",
      p3: "Facture électronique disponible sur demande.",
    },
    faq: {
      title: "Questions fréquentes",
      q1: { q: "Comment puis-je réserver ?", a: "Par téléphone 24/7 ou via le formulaire ci-dessus. Un agent confirme votre course." },
      q2: { q: "Puis-je réserver à l’avance ?", a: "Oui, choisissez la date et l’heure souhaitées et nous confirmerons la disponibilité." },
      q3: { q: "Avez-vous des véhicules accessibles ?", a: "Oui, sélectionnez l’option ’Véhicule accessible’ dans votre demande." },
      q4: { q: "Quels moyens de paiement ?", a: "Cartes, sans contact et espèces. Facture disponible." },
    },
    footer: {
      rights: "Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      terms: "Conditions d’utilisation",
    },
    cookie: {
      text: "Nous utilisons des témoins (cookies) pour améliorer votre expérience.",
      more: "En savoir plus",
      accept: "Accepter",
    },
    privacy: {
      title: "Politique de confidentialité",
      intro: "Votre vie privée est importante. Nous collectons uniquement les données nécessaires au traitement des réservations et au service client.",
      bullets: [
        "Données : nom, coordonnées, adresses de prise en charge/dépose, préférences.",
        "Finalités : réservation, assistance, facturation et amélioration du service.",
        "Conservation : durée nécessaire aux finalités; mesures de sécurité appropriées.",
        "Vos droits : accès, rectification, retrait du consentement lorsque applicable.",
      ],
    },
  },
  en: {
    nav: { home: "Home", services: "Services", prices: "Pricing", enterprise: "Business", faq: "FAQ", contact: "Contact" },
    hero: {
      headline: "Book a reliable taxi, the easy way.",
      sub: "24/7 phone service in Montréal. Qualified drivers, compliant invoicing, human assistance.",
      call: "Call now",
      book: "Book online",
    },
    badges: { b1: "24/7", b2: "Qualified drivers", b3: "Compliant billing", b4: "Montréal coverage" },
    form: {
      title: "Online booking",
      name: "Full name",
      phone: "Phone",
      email: "Email (optional)",
      pickup: "Pickup address",
      dropoff: "Destination",
      datetime: "Date & time",
      options: "Options",
      wheelchair: "Accessible vehicle",
      baby: "Baby seat",
      pets: "Pets",
      notes: "Notes (door code, floor, etc.)",
      consent: "I accept the terms and privacy policy",
      submit: "Send request",
      submitting: "Sending…",
      success: "Request sent! We’ll contact you shortly.",
      required: "Required",
    },
    enterprise: {
      title: "Business accounts",
      sub: "Hotels, clinics, offices: dedicated line and monthly invoicing.",
      org: "Company name",
      contact: "Contact person",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Request a demo",
      success: "Thanks! We’ll email you shortly to schedule a demo.",
    },
    services: {
      title: "Services",
      s1: { title: "On‑demand rides", desc: "Call now or schedule ahead." },
      s2: { title: "Airport transfers", desc: "Flight tracking and early departures handled." },
      s3: { title: "Accessibility", desc: "Accessible vehicles available on request." },
      s4: { title: "Corporate accounts", desc: "Portal and reporting for your company." },
    },
    prices: {
      title: "Pricing & billing",
      p1: "Pricing compliant with applicable regulations (regulatory fees apply).",
      p2: "Payments accepted: cards, contactless and cash.",
      p3: "Electronic invoice available upon request.",
    },
    faq: {
      title: "FAQ",
      q1: { q: "How do I book?", a: "By phone 24/7 or via the form above. An agent confirms your ride." },
      q2: { q: "Can I pre‑book?", a: "Yes, choose your desired date and time; we’ll confirm availability." },
      q3: { q: "Do you have accessible vehicles?", a: "Yes — select ’Accessible vehicle’ in your request." },
      q4: { q: "Accepted payment methods?", a: "Cards, contactless and cash. Invoice available." },
    },
    footer: {
      rights: "All rights reserved.",
      legal: "Legal",
      privacy: "Privacy policy",
      terms: "Terms of use",
    },
    cookie: {
      text: "We use cookies to improve your experience.",
      more: "Learn more",
      accept: "Accept",
    },
    privacy: {
      title: "Privacy policy",
      intro: "Your privacy matters. We only collect data necessary for bookings and customer service.",
      bullets: [
        "Data: name, contact details, pickup/drop‑off addresses, preferences.",
        "Purposes: booking, assistance, invoicing and service improvement.",
        "Retention: as needed for stated purposes; appropriate safeguards in place.",
        "Your rights: access, rectification, consent withdrawal where applicable.",
      ],
    },
  },
} as const;

function classNames(...a: (string | false | undefined)[]) {
  return a.filter(Boolean).join(" ");
}

function SectionTitle({ icon: Icon, children }: { icon?: any; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {Icon && <Icon className="h-6 w-6" aria-hidden />}
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{children}</h2>
    </div>
  );
}

export default function TaxiLanding() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const tr = t[lang];

  const [cookieOk, setCookieOk] = useState<boolean>(() => {
    try { return localStorage.getItem("cookie_ok") === "1"; } catch { return true; }
  });
  useEffect(() => {
    try { if (cookieOk) localStorage.setItem("cookie_ok", "1"); } catch {}
  }, [cookieOk]);

  const [b, setB] = useState({
    name: "",
    phone: "",
    email: "",
    pickup: "",
    dropoff: "",
    datetime: "",
    wheelchair: false,
    baby: false,
    pets: false,
    notes: "",
    consent: false,
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err" >(null);

  function onBChange(k, v) {
    setB(prev => ({ ...prev, [k]: v }));
  }

  function required(v) { return v.trim().length > 0; }
  const bErrors = {
    name: !required(b.name),
    phone: !required(b.phone),
    pickup: !required(b.pickup),
    dropoff: !required(b.dropoff),
    datetime: !required(b.datetime),
    consent: !b.consent,
  };

  function encodeMailto(subject, body) {
    return `mailto:${EMAIL_BOOKINGS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function submitBooking(e) {
    e.preventDefault();
    if (Object.values(bErrors).some(Boolean)) { setSent("err"); return; }
    setSending(true)
    const lines = [
      `Nom: ${b.name}`,
      `Téléphone: ${b.phone}`,
      `Courriel: ${b.email || "—"}`,
      `Prise en charge: ${b.pickup}`,
      `Destination: ${b.dropoff}`,
      `Date/Heure: ${new Date(b.datetime).toLocaleString()}`,
      `Options: ${[b.wheelchair && "Accessible", b.baby && "Siège bébé", b.pets && "Animaux"].filter(Boolean).join(", ") || "—"}`,
      `Notes: ${b.notes || "—"}`,
    ].join("\\n");

    const mailto = encodeMailto(`[Réservation] ${b.name} — ${b.pickup} → ${b.dropoff}`, lines);
    try {
      window.location.href = mailto;
      setSent("ok");
    } catch (err) {
      console.error(err);
      setSent("err");
    } finally {
      setSending(false);
    }
  }

  const [eState, setEState] = useState({ org: "", contact: "", email: "", phone: "", message: "" });
  const [eSent, setESent] = useState(null);
  function submitEnterprise(ev) {
    ev.preventDefault();
    if (!eState.org || !eState.contact || !eState.email) { setESent("err"); return; }
    const body = `Organisation: ${eState.org}\\nContact: ${eState.contact}\\nCourriel: ${eState.email}\\nTéléphone: ${eState.phone}\\nMessage: ${eState.message}`;
    const mailto = encodeMailto(`[Entreprise] ${eState.org} — ${eState.contact}`, body);
    try {
      window.location.href = mailto;
      setESent("ok");
    } catch(err) {
      console.error(err);
      setESent("err");
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: BRAND,
    telephone: PHONE_DISPLAY,
    areaServed: "Montréal, QC",
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS,
      addressLocality: "Montréal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    url: typeof window !== "undefined" ? window.location.href : undefined,
    openingHours: BUSINESS_HOURS.map(h => `${h.d} ${h.h}`),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center">
              <Car className="h-5 w-5" />
            </div>
            <div className="font-bold tracking-tight text-lg md:text-xl">{BRAND}</div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-slate-600" href="#services">{t[lang].nav.services}</a>
            <a className="hover:text-slate-600" href="#prices">{t[lang].nav.prices}</a>
            <a className="hover:text-slate-600" href="#enterprise">{t[lang].nav.enterprise}</a>
            <a className="hover:text-slate-600" href="#faq">{t[lang].nav.faq}</a>
            <a className="hover:text-slate-600" href="#contact">{t[lang].nav.contact}</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-slate-900 text-white text-sm shadow-sm hover:opacity-95">
              <Phone className="h-4 w-4" /> <span>{PHONE_DISPLAY}</span>
            </a>
            <button
              aria-label="Language"
              onClick={() => setLang(p => (p === "fr" ? "en" : "fr"))}
              className="ml-2 inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-slate-300 text-sm hover:bg-slate-50"
            >
              <Globe className="h-4 w-4" /> {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 px-3 py-1 text-xs text-slate-600 mb-4">
              <Clock className="h-3.5 w-3.5" /> 24/7
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {t[lang].hero.headline}
            </h1>
            <p className="mt-4 text-slate-600 text-base md:text-lg max-w-xl">
              {t[lang].hero.sub}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-slate-900 text-white shadow-sm hover:opacity-95">
                <Phone className="h-5 w-5" /> {t[lang].hero.call}
              </a>
              <a href="#booking" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 border border-slate-300 hover:bg-slate-50">
                <Car className="h-5 w-5" /> {t[lang].hero.book}
              </a>
            </div>
          </div>
          <div>
            <div className="relative bg-white rounded-3xl shadow-lg p-6">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-slate-200 to-white -z-10" aria-hidden />
              <BookingForm lang={lang} tr={t[lang]} b={b} onBChange={onBChange} onSubmit={submitBooking} errors={bErrors} sending={sending} sent={sent} />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-4 gap-4">
          <ServiceCard icon={Phone} title={t[lang].services.s1.title} desc={t[lang].services.s1.desc} />
          <ServiceCard icon={MapPin} title={t[lang].services.s2.title} desc={t[lang].services.s2.desc} />
          <ServiceCard icon={Accessibility} title={t[lang].services.s3.title} desc={t[lang].services.s3.desc} />
          <ServiceCard icon={Building2} title={t[lang].services.s4.title} desc={t[lang].services.s4.desc} />
        </div>
      </section>

      <section id="prices" className="mx-auto max-w-7xl px-4 py-16">
        <ul className="grid md:grid-cols-3 gap-4 text-slate-700">
          <li className="rounded-2xl border border-slate-200 p-5">{t[lang].prices.p1}</li>
          <li className="rounded-2xl border border-slate-200 p-5">{t[lang].prices.p2}</li>
          <li className="rounded-2xl border border-slate-200 p-5">{t[lang].prices.p3}</li>
        </ul>
      </section>

      <section id="enterprise" className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-slate-600 max-w-2xl mb-6">{t[lang].enterprise.sub}</p>
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <EnterpriseForm lang={lang} tr={t[lang]} eState={eState} setEState={setEState} onSubmit={submitEnterprise} eSent={eSent} />
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-4 py-16">
        <div className="space-y-3">
          <FAQItem q={t[lang].faq.q1.q} a={t[lang].faq.q1.a} />
          <FAQItem q={t[lang].faq.q2.q} a={t[lang].faq.q2.a} />
          <FAQItem q={t[lang].faq.q3.q} a={t[lang].faq.q3.a} />
          <FAQItem q={t[lang].faq.q4.q} a={t[lang].faq.q4.a} />
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 text-sm text-slate-600"><Phone className="h-4 w-4" /> <a className="hover:underline" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></div>
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-2"><Mail className="h-4 w-4" /> <a className="hover:underline" href={`mailto:${EMAIL_BOOKINGS}`}>{EMAIL_BOOKINGS}</a></div>
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-2"><MapPin className="h-4 w-4" /> {ADDRESS}</div>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold mb-2">Google Maps</h3>
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 grid place-items-center text-slate-500">
              <span>Intégrez votre carte Google Maps ici.</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div>© {new Date().getFullYear()} {BRAND}. Tous droits réservés.</div>
          <div className="flex items-center gap-4">
            <a href="#top" className="hover:underline">Haut de page</a>
          </div>
        </div>
      </footer>

      {!cookieOk && (
        <div className="fixed bottom-4 inset-x-0 px-4 z-40">
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-300 bg-white/95 backdrop-blur p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium">Nous utilisons des témoins (cookies) pour améliorer votre expérience.</div>
                <div className="mt-1">
                  <a href="#" className="underline" onClick={(e)=>{e.preventDefault(); alert("Politique de confidentialité");}}>En savoir plus</a>
                </div>
              </div>
              <button onClick={()=> setCookieOk(true)} className="ml-auto inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-slate-900 text-white text-sm"><CheckCircle2 className="h-4 w-4" /> Accepter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Badge({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <Icon className="h-4 w-4" aria-hidden />
      <span className="text-sm">{children}</span>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-slate-600 mt-2">{desc}</p>
    </div>
  );
}

function LabeledInput({ id, label, type = "text", value, onChange, required, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">{label}{required && <span className="text-red-600"> *</span>}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={"w-full rounded-xl border px-3 py-2 outline-none border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"}
      />
    </div>
  );
}

function CheckboxInput({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm">
      <input id={id} type="checkbox" checked={checked} onChange={(e)=> onChange(e.target.checked)} className="h-4 w-4" />
      <span>{label}</span>
    </label>
  );
}

function TextArea({ id, label, value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
      <textarea id={id} value={value} onChange={(e)=> onChange(e.target.value)} placeholder={placeholder} rows={4} className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
    </div>
  );
}

function FieldError({ show, text }) {
  if (!show) return null;
  return <div className="text-xs text-red-600 mt-1">{text}</div>;
}

function BookingForm({ lang, tr, b, onBChange, onSubmit, errors, sending, sent }) {
  return (
    <form id="booking" onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-2">{tr.form.title}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <LabeledInput id="name" label={tr.form.name} value={b.name} onChange={(v)=> onBChange("name", v)} required />
        <LabeledInput id="phone" label={tr.form.phone} value={b.phone} onChange={(v)=> onBChange("phone", v)} required placeholder={lang === 'fr' ? '+1 514…' : '+1 514…'} />
        <LabeledInput id="email" label={tr.form.email} type="email" value={b.email} onChange={(v)=> onBChange("email", v)} />
        <LabeledInput id="datetime" label={tr.form.datetime} type="datetime-local" value={b.datetime} onChange={(v)=> onBChange("datetime", v)} required />
        <LabeledInput id="pickup" label={tr.form.pickup} value={b.pickup} onChange={(v)=> onBChange("pickup", v)} required />
        <LabeledInput id="dropoff" label={tr.form.dropoff} value={b.dropoff} onChange={(v)=> onBChange("dropoff", v)} required />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 p-3"><CheckboxInput id="wheel" label={tr.form.wheelchair} checked={b.wheelchair} onChange={(v)=> onBChange("wheelchair", v)} /></div>
        <div className="rounded-xl border border-slate-200 p-3"><CheckboxInput id="baby" label={tr.form.baby} checked={b.baby} onChange={(v)=> onBChange("baby", v)} /></div>
        <div className="rounded-xl border border-slate-200 p-3"><CheckboxInput id="pets" label={tr.form.pets} checked={b.pets} onChange={(v)=> onBChange("pets", v)} /></div>
      </div>

      <TextArea id="notes" label={tr.form.notes} value={b.notes} onChange={(v)=> onBChange("notes", v)} />

      <div className="flex items-start gap-2">
        <input id="consent" type="checkbox" checked={b.consent} onChange={(e)=> onBChange("consent", e.target.checked)} className="h-4 w-4 mt-1" />
        <label htmlFor="consent" className="text-sm">{tr.form.consent} <a href="#" className="underline" onClick={(e)=>{e.preventDefault(); alert("Politique de confidentialité");}}>({t[lang].footer.privacy})</a></label>
      </div>
      <FieldError show={errors.name || errors.phone || errors.pickup || errors.dropoff || errors.datetime || errors.consent} text={tr.form.required} />

      <div className="flex items-center gap-3">
        <button disabled={sending} className={"inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-white " + (sending ? "bg-slate-400" : "bg-slate-900 hover:opacity-95")}>{sending ? tr.form.submitting : tr.form.submit}</button>
        {sent === "ok" && <span className="text-sm text-green-700">{tr.form.success}</span>}
        {sent === "err" && <span className="text-sm text-red-700">{tr.form.required}</span>}
      </div>
    </form>
  );
}

function EnterpriseForm({ lang, tr, eState, setEState, onSubmit, eSent }) {
  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
      <LabeledInput id="org" label={tr.enterprise.org} value={eState.org} onChange={(v)=> setEState((p)=> ({...p, org: v}))} required />
      <LabeledInput id="contact" label={tr.enterprise.contact} value={eState.contact} onChange={(v)=> setEState((p)=> ({...p, contact: v}))} required />
      <LabeledInput id="email2" label={tr.enterprise.email} type="email" value={eState.email} onChange={(v)=> setEState((p)=> ({...p, email: v}))} required />
      <LabeledInput id="phone2" label={tr.enterprise.phone} value={eState.phone} onChange={(v)=> setEState((p)=> ({...p, phone: v}))} />
      <div className="md:col-span-2"><TextArea id="message" label={tr.enterprise.message} value={eState.message} onChange={(v)=> setEState((p)=> ({...p, message: v}))} /></div>
      <div className="md:col-span-2 flex items-center gap-3">
        <button className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-slate-900 text-white hover:opacity-95">{tr.enterprise.submit}</button>
        {eSent === "ok" && <span className="text-sm text-green-700">{tr.enterprise.success}</span>}
        {eSent === "err" && <span className="text-sm text-red-700">{t[lang].form.required}</span>}
      </div>
    </form>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden">
      <button onClick={()=> setOpen(o=>!o)} className="w-full flex items-center justify-between text-left px-4 py-3 hover:bg-slate-50">
        <span className="font-medium">{q}</span>
        <ChevronDown className={"h-5 w-5 transition " + (open ? "rotate-180" : "")} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-slate-600">{a}</div>
      )}
    </div>
  );
}

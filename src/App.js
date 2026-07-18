import { useState, useEffect, useRef } from "react";

const ACCENT = "#2563eb";
const ACCENT_LIGHT = "#dbeafe";
const TEXT = "#0f172a";
const TEXT_SEC = "#334155";
const TEXT_TERT = "#64748b";
const BG = "#ffffff";
const BG_SEC = "#f8fafc";
const BORDER = "#e2e8f0";

const SIDEBAR_W = 340;
const CONTENT_MAX = 680;
const BREAKPOINT = 960;

const SECTIONS = ["About", "News", "Publications", "Research", "Teaching", "Contact"];

const PUBS = [
  {
    status: "accepted",
    authors: ["A. T. Issah", "C. B. Delahunt", "C. Mukamakuza"],
    title: "SGMCE: Segment-Grounded Morphological Concept Explanation for Malaria Parasite Species Identification in Thick Blood Smears",
    venue: "Medical Image Understanding and Analysis (MIUA)",
    location: "Dublin, Ireland",
    date: "2026",
    links: [],
  },
  {
    status: "accepted",
    authors: ["A. T. Issah", "I. Seidu", "C. Mukamakuza"],
    title: "Detection versus Instance Segmentation for Multi-Species Malaria Diagnosis: A Head-to-Head Comparison and Multi-Dataset Validation of YOLOv12 Architectures with Small Object Optimization",
    venue: "Medical Imaging with Deep Learning (MIDL)",
    location: "Taipei, Taiwan",
    date: "2026",
    links: [
      { label: "Paper", href: "https://proceedings.mlr.press/v315/issah26a.html", type: "paper" },
    ],
  },
  {
    status: "accepted",
    authors: ["A. T. Issah", "C. Mukamakuza"],
    title: "Bridging the Gap in Malaria Diagnostics: An Attention-Centric YOLO Framework with Species-Specific Augmentation for Tiny Parasite Detection in Low-Resource Settings",
    venue: "AIMedHealth Bridge, AAAI",
    location: "Singapore",
    date: "2026",
    links: [
      { label: "Paper", href: "https://proceedings.mlr.press/v317/issah26a.html", type: "paper" },
    ],
  },
  {
    status: "accepted",
    authors: ["A. T. Issah", "I. Seidu", "E. A. Adjei", "M. Aman", "A. A. Biyabani"],
    title: "KG-Rank-Plus: Enhancing LLM-Based Medical Question Answering with Multi-Hop Knowledge Graph Traversal and Ranking Techniques",
    venue: "IEEE AFRICON",
    location: "Polokwane, South Africa",
    date: "2025",
    links: [
      { label: "Paper", href: "https://ieeexplore.ieee.org/document/11533830", type: "paper" },
    ],
  },
  {
    status: "accepted",
    authors: ["A. L. Bernes", "A. T. Issah", "M. H. A. Baaki", "C. Ingabire", "T. Olusuyi", "M. Adewole", "U. C. Anazodo", "T. Brown"],
    title: "Empowering Medical Equipment Sustainability in Low-Resource Settings: An AI-Powered Diagnostic and Support Platform for Biomedical Technicians",
    venue: "MIRASOL Workshop, MICCAI",
    location: "Daejeon, South Korea",
    date: "2025",
    links: [
      { label: "Paper", href: "https://link.springer.com/chapter/10.1007/978-3-032-13654-1_22", type: "paper" },
      { label: "arXiv", href: "https://arxiv.org/abs/2601.16967", type: "arxiv" },
    ],
  },
];

const NEWS = [
  { date: "Jun 2026", text: "Paper accepted for oral presentation at MIUA 2026 Conference in Dublin, Ireland.", latest: true },
  { date: "Jun 2026", text: "Awarded a travel grant to attend the MIUA 2026 Conference in Dublin, Ireland." },
  { date: "Jun 2026", text: "Paper accepted at Medical Image Understanding and Analysis (MIUA) 2026 Conference in Dublin, Ireland." },
  { date: "Jun 2026", text: "Joined Zipline International Inc. as a Machine Learning Engineer on the Perception team, working on droid autonomy." },
  { date: "Feb 2026", text: "Paper accepted at MIDL 2026 Conference." },
  { date: "Jan 2026", text: "Paper accepted at AIMedHealth Bridge Workshop, AAAI 2026 in Singapore." },
  { date: "Dec 2025", text: "Paper accepted and presented at IEEE AFRICON 2025 in Polokwane, South Africa." },
  { date: "Sep 2025", text: "Presented co-first-authored paper at MIRASOL Workshop, MICCAI 2025 in Daejeon, South Korea." },
  { date: "May 2025", text: "Completed M.S. in Engineering Artificial Intelligence at Carnegie Mellon University." },
  { date: "Jan 2025", text: "Started as Graduate Teaching Assistant for Introduction to Deep Learning (11-785)." },
];

const RESEARCH = [
  {
    title: "Medical image analysis",
    desc: "Developing deep learning methods for diagnostic imaging across MRI, ultrasound, and microscopy modalities, with a focus on robust, interpretable models that generalize across acquisition protocols.",
  },
  {
    title: "Knowledge graphs and LLMs for healthcare",
    desc: "Engineering multi-hop knowledge graph traversal and retrieval-augmented generation to improve factual consistency in medical question answering.",
  },
  {
    title: "AI for low-resource settings",
    desc: "Designing scalable, clinically deployable AI solutions for healthcare and agriculture in resource-constrained environments across sub-Saharan Africa.",
  },
];

const IconEmail = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconScholar = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.242 13.769L0.5 9.5 12 1l11.5 8.5-4.742 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
  </svg>
);

const IconLinkedIn = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconGitHub = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const IconExternal = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 3, verticalAlign: "middle", marginTop: -2 }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconArxiv = <img src="https://cdn.simpleicons.org/arxiv" alt="" style={{ width: 13, height: 13 }} />;
const IconPaper = "\u{1F4C4}";

const SOCIALS = [
  { key: "email", label: "aissah@alumni.cmu.edu", href: "mailto:aissah@alumni.cmu.edu", icon: IconEmail },
  { key: "scholar", label: "Google Scholar", href: "https://scholar.google.com/citations?user=E2zJqAoAAAAJ", icon: IconScholar },
  { key: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/ahmed-tahiru-issah-18b8671a2", icon: IconLinkedIn },
  { key: "github", label: "GitHub", href: "https://github.com/ahmedinhotahiru", icon: IconGitHub },
];

function useVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function useViewport(bp = BREAKPOINT) {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < bp);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [bp]);
  return narrow;
}

function Fade({ children, delay = 0, style = {} }) {
  const [ref, vis] = useVisible();
  return (
    <div ref={ref} style={{
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(12px)",
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
    }}>{children}</div>
  );
}

function Sidebar({ active, narrow }) {
  const go = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  return (
    <aside style={{
      width: narrow ? "100%" : SIDEBAR_W,
      padding: narrow ? "48px 24px 32px" : "64px 40px 40px",
      borderRight: narrow ? "none" : `1px solid ${BORDER}`,
      borderBottom: narrow ? `1px solid ${BORDER}` : "none",
      background: BG,
      position: narrow ? "relative" : "fixed",
      top: 0, left: 0, bottom: 0,
      height: narrow ? "auto" : "100vh",
      overflowY: narrow ? "visible" : "auto",
      display: "flex", flexDirection: "column",
      boxSizing: "border-box",
    }}>
      <div style={{
        width: narrow ? 120 : 150, height: narrow ? 120 : 150,
        minWidth: narrow ? 120 : 150, minHeight: narrow ? 120 : 150,
        aspectRatio: "1 / 1", flexShrink: 0,
        borderRadius: "50%", overflow: "hidden",
        border: `1px solid ${BORDER}`, marginBottom: 20,
        alignSelf: narrow ? "center" : "flex-start",
      }}>
        <img
          src={process.env.PUBLIC_URL + "/profile.png"}
          alt="Ahmed Tahiru Issah"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div style={{ textAlign: narrow ? "center" : "left" }}>
        <h1 style={{
          fontSize: 22, fontWeight: 700, color: TEXT,
          letterSpacing: "-0.4px", lineHeight: 1.2, margin: "0 0 4px",
        }}>Ahmed Tahiru Issah</h1>
        <p style={{ fontSize: 13.5, color: TEXT_SEC, margin: "0 0 2px", lineHeight: 1.5 }}>
          Machine Learning Engineer
        </p>
        <p style={{ fontSize: 13, color: TEXT_TERT, margin: "0 0 4px", lineHeight: 1.5 }}>
          <a href="https://www.flyzipline.com"
            target="_blank" rel="noreferrer"
            style={{ color: TEXT_TERT, textDecoration: "none", borderBottom: `1px dotted ${BORDER}`, transition: "color 0.2s, border-color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderBottomColor = ACCENT; }}
            onMouseLeave={e => { e.currentTarget.style.color = TEXT_TERT; e.currentTarget.style.borderBottomColor = BORDER; }}
          >
            Zipline International Inc.{IconExternal}
          </a>
        </p>
        <p style={{ fontSize: 13, color: TEXT_TERT, margin: "0 0 24px" }}>
          Perception · Droid Autonomy
        </p>
      </div>

      {!narrow && (
        <nav style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 24 }}>
          {SECTIONS.map(s => {
            const a = active === s.toLowerCase();
            return (
              <button key={s} onClick={() => go(s)} style={{
                background: "none", border: "none", cursor: "pointer",
                textAlign: "left", padding: "6px 0",
                fontSize: 13.5, fontWeight: a ? 600 : 500,
                color: a ? ACCENT : TEXT_SEC,
                letterSpacing: "0.2px", transition: "color 0.2s",
                fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 10,
              }}
                onMouseEnter={e => e.currentTarget.style.color = ACCENT}
                onMouseLeave={e => e.currentTarget.style.color = a ? ACCENT : TEXT_SEC}
              >
                <span style={{
                  display: "inline-block", width: a ? 18 : 10, height: 1,
                  background: a ? ACCENT : BORDER, transition: "all 0.2s",
                }} />
                {s}
              </button>
            );
          })}
        </nav>
      )}

      <div style={{
        display: "flex", flexDirection: "column", gap: 10,
        marginTop: narrow ? 8 : "auto", paddingTop: narrow ? 0 : 16,
        alignItems: narrow ? "center" : "flex-start",
      }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: narrow ? "center" : "flex-start" }}>
          {SOCIALS.map(s => (
            <a key={s.key} href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
              title={s.label}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 34, height: 34, borderRadius: 8,
                border: `1px solid ${BORDER}`, color: TEXT_SEC, background: BG,
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT_SEC; }}
            >{s.icon}</a>
          ))}
        </div>
        <a href={`${process.env.PUBLIC_URL}/cv.pdf`} target="_blank" rel="noreferrer" style={{
          fontSize: 12.5, fontWeight: 600, color: ACCENT, textDecoration: "none",
          padding: "6px 14px", borderRadius: 6,
          border: `1px solid ${ACCENT}40`, background: `${ACCENT}08`,
          transition: "all 0.2s", marginTop: 4,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}08`; e.currentTarget.style.color = ACCENT; }}
        >Download CV ↗</a>
      </div>
    </aside>
  );
}

function SectionBreak() {
  return <div style={{ borderTop: `1px solid ${BORDER}`, opacity: 0.8 }} />;
}

function SectionHead({ children }) {
  return (
    <Fade>
      <h2 style={{
        fontSize: 22, fontWeight: 700, color: TEXT,
        letterSpacing: "-0.3px", margin: "0 0 10px", lineHeight: 1.2,
      }}>{children}</h2>
      <div style={{ width: 40, height: 2.5, background: ACCENT, borderRadius: 2, marginBottom: 28 }} />
    </Fade>
  );
}

function About() {
  return (
    <section id="about" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <SectionHead>About</SectionHead>
      <Fade>
        <div style={{ fontSize: 14.5, color: TEXT_SEC, lineHeight: 1.8 }}>
          <p style={{ margin: "0 0 16px" }}>
            I am a Machine Learning Engineer on the Perception team at Zipline International Inc., where I work on droid autonomy. Previously, I was a Research Associate in the AI Healthcare Research Laboratory at Carnegie Mellon University Africa, where I completed my M.S. in Engineering Artificial Intelligence (CQPA 3.64 / 4.00) in May 2025. I hold a B.S. in Computer Science from the University for Development Studies (CGPA 4.43 / 5.00).
          </p>
          <p style={{ margin: "0 0 16px" }}>
            My work lies at the intersection of <span style={{ color: TEXT, fontWeight: 600 }}>artificial intelligence and healthcare</span>, with a focus on medical imaging. I develop computer vision and deep learning methods for complex, high-dimensional medical data — building robust, interpretable diagnostic tools.
          </p>
          <p style={{ margin: 0 }}>
            I am especially drawn to research that bridges advances in AI with practical clinical deployment, emphasizing <span style={{ color: TEXT, fontWeight: 600 }}>solutions that scale to low-resource healthcare environments</span>. I am currently applying to PhD programs for Fall 2026.
          </p>
        </div>
      </Fade>
    </section>
  );
}

function News() {
  return (
    <section id="news" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <SectionHead>News & Updates</SectionHead>
      <div style={{ position: "relative", paddingLeft: 28 }}>
        <div style={{
          position: "absolute", left: 5, top: 6, bottom: 6,
          width: 2, background: BORDER,
        }} />
        {NEWS.map((item, i) => (
          <Fade key={i} delay={i * 0.04}>
            <div style={{
              position: "relative", paddingBottom: i < NEWS.length - 1 ? 22 : 0,
              display: "flex", gap: 16, alignItems: "flex-start",
            }}>
              <div style={{
                position: "absolute", left: -28, top: 5,
                width: 12, height: 12, borderRadius: "50%",
                background: item.latest ? ACCENT : BG,
                border: `2px solid ${item.latest ? ACCENT : BORDER}`,
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: 12.5, fontWeight: 600, color: ACCENT,
                minWidth: 72, flexShrink: 0, paddingTop: 1,
              }}>{item.date}</span>
              <p style={{
                fontSize: 14, color: TEXT_SEC, margin: 0, lineHeight: 1.65,
              }}>{item.text}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

function AuthorList({ authors }) {
  return (
    <span style={{ fontSize: 13.5, color: TEXT_TERT, lineHeight: 1.6 }}>
      {authors.map((a, i) => (
        <span key={i}>
          {a === "A. T. Issah" ? (
            <span style={{ color: TEXT, fontWeight: 600 }}>{a}</span>
          ) : a}
          {i < authors.length - 1 ? ", " : ""}
        </span>
      ))}
    </span>
  );
}

function PubItem({ pub, idx, isLast }) {
  return (
    <Fade delay={idx * 0.03}>
      <div style={{
        padding: "18px 16px 18px 14px", marginLeft: -14,
        borderBottom: isLast ? "none" : `1px solid ${BORDER}`,
        borderLeft: `2px solid transparent`,
        borderRadius: "0 6px 6px 0",
        transition: "background 0.2s, border-left-color 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = BG_SEC; e.currentTarget.style.borderLeftColor = ACCENT; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderLeftColor = "transparent"; }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline", marginBottom: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: TEXT_TERT, fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase" }}>
            {pub.venue} {pub.date && `· ${pub.date}`}
          </span>
          {pub.location && (
            <span style={{ fontSize: 12, color: TEXT_TERT, whiteSpace: "nowrap" }}>{pub.location}</span>
          )}
        </div>
        <h4 style={{
          fontSize: 14.5, fontWeight: 600, color: TEXT, lineHeight: 1.5,
          margin: "0 0 6px",
        }}>{pub.title}</h4>
        <div style={{ marginBottom: pub.links && pub.links.length ? 10 : 0 }}>
          <AuthorList authors={pub.authors} />
        </div>
        {pub.links && pub.links.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {pub.links.map((l, i) => (
              <a key={i} href={l.href} target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 12.5, color: ACCENT, textDecoration: "none", fontWeight: 500,
                padding: "4px 12px", borderRadius: 5,
                border: `1px solid ${ACCENT}30`, background: `${ACCENT}06`,
                transition: "all 0.2s", lineHeight: 1,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}06`; e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = `${ACCENT}30`; }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", fontSize: 12 }}>
                  {l.type === "arxiv" ? IconArxiv : IconPaper}
                </span>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </Fade>
  );
}

function Publications() {
  const accepted = PUBS.filter(p => p.status === "accepted");
  return (
    <section id="publications" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <SectionHead>Publications</SectionHead>
      <Fade>
        <p style={{ fontSize: 14, color: TEXT_TERT, marginBottom: 8, lineHeight: 1.6 }}>
          {PUBS.length} papers · {accepted.length} accepted. <span style={{ color: TEXT_SEC }}>Bold name indicates me.</span>
        </p>
      </Fade>
      {PUBS.map((p, i) => <PubItem key={i} pub={p} idx={i} isLast={i === PUBS.length - 1} />)}
    </section>
  );
}

function Research() {
  return (
    <section id="research" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <SectionHead>Research</SectionHead>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {RESEARCH.map((r, i) => (
          <Fade key={i} delay={i * 0.05}>
            <div style={{ paddingLeft: 14, borderLeft: `2px solid ${BORDER}`, transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderLeftColor = ACCENT}
              onMouseLeave={e => e.currentTarget.style.borderLeftColor = BORDER}
            >
              <h4 style={{
                fontSize: 14.5, fontWeight: 600, color: TEXT,
                margin: "0 0 6px", letterSpacing: "-0.2px",
              }}>{r.title}</h4>
              <p style={{ fontSize: 13.5, color: TEXT_SEC, margin: 0, lineHeight: 1.75 }}>{r.desc}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

function Teaching() {
  const courses = [
    { course: "Introduction to Deep Learning (11-785)", period: "Jan 2025 – May 2026" },
    { course: "Data Inference & Applied Machine Learning", period: "Sep – Dec 2024" },
  ];
  return (
    <section id="teaching" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <SectionHead>Teaching</SectionHead>
      <Fade>
        <p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.75, margin: "0 0 16px" }}>
          Graduate Teaching Assistant at Carnegie Mellon University.
        </p>
      </Fade>
      <div>
        {courses.map((t, i) => (
          <Fade key={i} delay={i * 0.06}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              padding: "14px 0", borderBottom: `1px solid ${BORDER}`, gap: 12, flexWrap: "wrap",
            }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: TEXT }}>{t.course}</span>
              <span style={{ fontSize: 12.5, color: TEXT_TERT }}>{t.period}</span>
            </div>
          </Fade>
        ))}
      </div>

      <Fade>
        <div style={{ marginTop: 32 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: TEXT_TERT, margin: "0 0 14px", letterSpacing: "1px", textTransform: "uppercase" }}>Technical Skills</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Python", "PyTorch", "LangChain", "LlamaIndex", "JavaScript", "Git", "AWS", "GCP", "SQL"].map(s => (
              <span key={s} style={{
                padding: "4px 12px", borderRadius: 6, fontSize: 12.5,
                background: BG_SEC, color: TEXT_SEC, border: `1px solid ${BORDER}`,
              }}>{s}</span>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <SectionHead>Contact</SectionHead>
      <Fade>
        <p style={{ fontSize: 14.5, color: TEXT_SEC, lineHeight: 1.8, margin: "0 0 20px" }}>
          I am open to research collaborations, PhD opportunities, and conversations about AI for healthcare. The fastest way to reach me is email.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SOCIALS.map(s => (
            <a key={s.key} href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                fontSize: 14, color: TEXT_SEC, textDecoration: "none",
                padding: "6px 0", transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = ACCENT}
              onMouseLeave={e => e.currentTarget.style.color = TEXT_SEC}
            >
              <span style={{ display: "flex", alignItems: "center" }}>{s.icon}</span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </Fade>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "24px 0 32px", borderTop: `1px solid ${BORDER}`, marginTop: 24 }}>
      <p style={{ margin: 0, fontSize: 12.5, color: TEXT_TERT }}>
        © {new Date().getFullYear()} Ahmed Tahiru Issah
      </p>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("about");
  const narrow = useViewport();

  useEffect(() => {
    const onScroll = () => {
      const ids = SECTIONS.map(s => s.toLowerCase());
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(ids[i]);
          return;
        }
      }
      setActive("about");
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: BG, color: TEXT, minHeight: "100vh",
      WebkitFontSmoothing: "antialiased",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${BG}; }
        ::selection { background: ${ACCENT_LIGHT}; }
      `}</style>

      <Sidebar active={active} narrow={narrow} />

      <main style={{
        marginLeft: narrow ? 0 : SIDEBAR_W,
        padding: narrow ? "40px 24px 0" : "72px 56px 0",
        maxWidth: narrow ? "100%" : SIDEBAR_W + CONTENT_MAX + 56 * 2,
      }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: "0 auto" }}>
          <About />
          <SectionBreak />
          <News />
          <SectionBreak />
          <Publications />
          <SectionBreak />
          <Research />
          <SectionBreak />
          <Teaching />
          <SectionBreak />
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}

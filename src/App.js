import { useState, useEffect, useRef } from "react";

const ACCENT = "#2563eb";
const ACCENT_LIGHT = "#dbeafe";
const TEXT = "#1e293b";
const TEXT_SEC = "#475569";
const TEXT_TERT = "#64748b";
const BG = "#ffffff";
const BG_SEC = "#f8fafc";
const BORDER = "#e2e8f0";

const SECTIONS = ["About", "Publications", "Research", "News", "Teaching", "Contact"];

const PUBS = [
  {
    status: "accepted",
    authors: ["A. T. Issah", "C. P. Mukamakuza"],
    title: "Bridging the Gap in Malaria Diagnostics: An Attention-Centric YOLO Framework with Species-Specific Augmentation for Tiny Parasite Detection in Low-Resource Settings",
    venue: "AIMedHealth Bridge, AAAI 2026",
    location: "Singapore",
    date: "2026",
    links: [
      { label: "Paper", href: "https://openreview.net/forum?id=miC6JHIQPg", icon: "\u{1F4C4}" },
      // { label: "arXiv", href: "#", icon: <img src="https://cdn.simpleicons.org/arxiv" alt="" style={{ width: 14, height: 14 }} /> },
      // { label: "Code", href: "#", icon: "\u{1F4BB}" },
      // { label: "Slides", href: "#", icon: "\u{1F4CA}" },
    ],
  },
  {
    status: "accepted",
    authors: ["A. T. Issah", "I. Seidu", "E. A. Adjei", "M. Aman", "A. A. Biyabani"],
    title: "KG-Rank-Plus: Enhancing LLM-Based Medical Question Answering with Multi-Hop Knowledge Graph Traversal and Ranking Techniques",
    venue: "IEEE AFRICON 2025",
    location: "Polokwane, South Africa",
    date: "2025",
    links: [
      { label: "Paper", href: "#", icon: "\u{1F4C4}" },
      { label: "arXiv", href: "#", icon: <img src="https://cdn.simpleicons.org/arxiv" alt="" style={{ width: 14, height: 14 }} /> },
    ],
  },
  {
    status: "accepted",
    authors: ["A. L. Bernes", "A. T. Issah", "M. H. A. Baaki", "C. Ingabire", "T. Olusuyi", "M. Adewole", "U. C. Anazodo", "T. Brown"],
    title: "Empowering Medical Equipment Sustainability in Low-Resource Settings: An AI-Powered Diagnostic and Support Platform for Biomedical Technicians",
    venue: "MIRASOL Workshop, MICCAI 2025",
    location: "Daejeon, South Korea",
    date: "2025",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2601.16967", icon: <img src="https://cdn.simpleicons.org/arxiv" alt="" style={{ width: 14, height: 14 }} /> },
    ],
  },
  // {
  //   status: "review",
  //   authors: ["A. T. Issah", "C. P. Mukamakuza"],
  //   title: "Detection versus Instance Segmentation for Multi-Species Malaria Diagnosis: A Head-to-Head Comparison and Multi-Dataset Validation of YOLOv12 Architectures with Small Object Optimization",
  //   venue: "MIDL 2026",
  //   date: "2026",
  //   links: [
  //     { label: "Preprint", href: "#", icon: "\u{1F4DD}" },
  //   ],
  //   note: "Under review",
  // },
  // {
  //   status: "prep",
  //   authors: ["I. Seidu", "A. Destin", "C. P. Mukamakuza", "K. Harerimana", "A. T. Issah", "H. Usman", "A. Apgar"],
  //   title: "Web-Based Automated Malaria Diagnosis Using YOLOv10: A Clinical Decision Support System",
  //   venue: "Pathogens, Parasitic Helminths and Control Strategies",
  //   date: "",
  //   links: [],
  // },
  // {
  //   status: "prep",
  //   authors: ["A. T. Issah", "G. Okeyo"],
  //   title: "Knowledge Graph-Constrained LLM for Pest and Disease Advisory",
  //   venue: "",
  //   date: "",
  //   links: [],
  // },
];

const NEWS = [
  { date: "Mar 2026", text: "Paper accepted at MIDL 2026, Validation Studies Track.", latest: true },
  { date: "Jan 2026", text: "Paper accepted and presented at AIMedHealth Bridge, AAAI 2026 in Singapore." },
  { date: "Dec 2025", text: "Paper accepted and presented at IEEE AFRICON 2025 in Polokwane, South Africa." },
  { date: "Sep 2025", text: "Presented co-first-authored paper at MIRASOL Workshop, MICCAI 2025 in Daejeon, South Korea." },
  { date: "May 2025", text: "Completed M.S. in Engineering Artificial Intelligence at Carnegie Mellon University." },
  { date: "Jan 2025", text: "Started as Graduate Teaching Assistant for Introduction to Deep Learning (11-785)." },
];

const RESEARCH = [
  {
    title: "Medical Image Analysis",
    desc: "Developing deep learning methods for diagnostic imaging across MRI, ultrasound, and microscopy modalities, with a focus on robust and interpretable models.",
  },
  // {
  //   title: "Automated Malaria Diagnostics",
  //   desc: "Building YOLO-based detection systems for multi-species Plasmodium parasite identification in thin blood smear microscopy, achieving 87.8% mAP@50.",
  // },
  {
    title: "Knowledge Graphs & LLMs for Healthcare",
    desc: "Engineering multi-hop knowledge graph traversal and retrieval-augmented generation to improve factual consistency in medical question answering.",
  },
  {
    title: "AI for Low-Resource Settings",
    desc: "Designing scalable, clinically deployable AI solutions for healthcare and agriculture in resource-constrained environments across sub-Saharan Africa.",
  },
];

function useVisible(threshold = 0.12) {
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

function useMobile(bp = 640) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.innerWidth < bp);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [bp]);
  return m;
}

function Fade({ children, delay = 0, style = {} }) {
  const [ref, vis] = useVisible();
  return (
    <div ref={ref} style={{
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>{children}</div>
  );
}

function Nav({ active, scrolled }) {
  const [open, setOpen] = useState(false);
  const mob = useMobile();
  const go = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || open ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled || open ? "blur(12px)" : "none",
      borderBottom: scrolled || open ? `1px solid ${BORDER}` : "none",
      transition: "all 0.3s",
    }}>
      <div style={{
        maxWidth: 820, margin: "0 auto", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 56, padding: "0 20px",
      }}>
        <span onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false); }} style={{
          cursor: "pointer", fontWeight: 700, fontSize: 16, color: TEXT, letterSpacing: "-0.3px",
        }}>Ahmed T. Issah</span>

        {mob ? (
          <button onClick={() => setOpen(!open)} aria-label="Menu" style={{
            background: "none", border: "none", cursor: "pointer", padding: 8,
            display: "flex", flexDirection: "column", gap: 5, justifyContent: "center",
          }}>
            <span style={{ display: "block", width: 22, height: 2, background: TEXT, borderRadius: 1, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(2.5px, 2.5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: TEXT, borderRadius: 1, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: TEXT, borderRadius: 1, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(2.5px, -2.5px)" : "none" }} />
          </button>
        ) : (
          <div style={{ display: "flex", gap: 4 }}>
            {SECTIONS.map(s => (
              <button key={s} onClick={() => go(s)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13.5, fontWeight: active === s.toLowerCase() ? 600 : 400,
                color: active === s.toLowerCase() ? ACCENT : TEXT_SEC,
                padding: "6px 12px", borderRadius: 6, transition: "all 0.2s",
                borderBottom: active === s.toLowerCase() ? `2px solid ${ACCENT}` : "2px solid transparent",
              }}
                onMouseEnter={e => e.target.style.color = ACCENT}
                onMouseLeave={e => e.target.style.color = active === s.toLowerCase() ? ACCENT : TEXT_SEC}
              >{s}</button>
            ))}
          </div>
        )}
      </div>

      {mob && open && (
        <div style={{
          padding: "8px 20px 16px", display: "flex", flexDirection: "column", gap: 4,
          background: "rgba(255,255,255,0.97)", borderBottom: `1px solid ${BORDER}`,
        }}>
          {SECTIONS.map(s => (
            <button key={s} onClick={() => go(s)} style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
              fontSize: 15, fontWeight: active === s.toLowerCase() ? 600 : 400,
              color: active === s.toLowerCase() ? ACCENT : TEXT_SEC,
              padding: "10px 4px", borderRadius: 6,
            }}>{s}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const mob = useMobile();
  return (
    <section style={{
      paddingTop: mob ? 90 : 120, paddingBottom: mob ? 48 : 80, background: BG,
    }}>
      <div style={{
        maxWidth: 820, margin: "0 auto", padding: mob ? "0 20px" : "0 24px",
        display: "flex", gap: mob ? 24 : 48, alignItems: mob ? "center" : "center",
        flexDirection: mob ? "column" : "row", flexWrap: "wrap",
        textAlign: mob ? "center" : "left",
      }}>
        <Fade>
          <div style={{
            width: mob ? 110 : 160, height: mob ? 110 : 160, borderRadius: "50%",
            background: BG_SEC, border: `2px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 42, color: TEXT_TERT, fontWeight: 600, flexShrink: 0,
            overflow: "hidden",
          }}>
            <img
              src={process.env.PUBLIC_URL + '/profile.png'}
              alt="Ahmed Tahiru Issah"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Fade>
        <Fade delay={0.1} style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{
            fontSize: mob ? 26 : 32, fontWeight: 700, color: TEXT, letterSpacing: "-0.5px",
            margin: "0 0 8px", lineHeight: 1.2,
          }}>Ahmed Tahiru Issah</h1>
          <p style={{ fontSize: mob ? 14.5 : 16, color: TEXT_SEC, margin: "0 0 6px", lineHeight: 1.5 }}>
            Research Associate, AI Healthcare Research Laboratory
          </p>
          <p style={{ fontSize: mob ? 14 : 15, color: TEXT_TERT, margin: "0 0 20px" }}>
            Carnegie Mellon University
          </p>
          <div style={{ display: "flex", gap: mob ? 8 : 10, flexWrap: "wrap", justifyContent: mob ? "center" : "flex-start" }}>
            {[
              { label: "Email", href: "mailto:aissah@andrew.cmu.edu" },
              { label: "Google Scholar", href: "https://scholar.google.com/citations?user=E2zJqAoAAAAJ" },
              { label: "LinkedIn", href: "https://linkedin.com/in/ahmed-tahiru-issah-18b8671a2" },
              { label: "GitHub", href: "https://github.com/ahmedinhotahiru" },
              { label: "CV", href: `${process.env.PUBLIC_URL}/cv.pdf` },
            ].map(l => (
              <a key={l.label} href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" style={{
                fontSize: mob ? 12 : 13, fontWeight: 500, color: ACCENT, textDecoration: "none",
                padding: mob ? "5px 11px" : "6px 14px", borderRadius: 6, border: `1px solid ${ACCENT}33`,
                background: `${ACCENT}08`, transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.target.style.background = ACCENT; e.target.style.color = "#fff"; }}
                onMouseLeave={e => { e.target.style.background = `${ACCENT}08`; e.target.style.color = ACCENT; }}
              >{l.label}</a>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

function Divider() {
  return <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 20px" }}><div style={{ borderTop: `1px solid ${BORDER}` }} /></div>;
}

function SectionHead({ children, id }) {
  const mob = useMobile();
  return (
    <Fade>
      <h2 id={id} style={{
        fontSize: mob ? 20 : 22, fontWeight: 700, color: TEXT, letterSpacing: "-0.3px",
        margin: "0 0 8px", paddingTop: mob ? 56 : 80,
      }}>{children}</h2>
      <div style={{ width: 40, height: 2.5, background: ACCENT, borderRadius: 2, marginBottom: mob ? 24 : 32 }} />
    </Fade>
  );
}

function About() {
  const mob = useMobile();
  return (
    <section id="about" style={{ background: BG }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: mob ? "0 20px 40px" : "0 24px 60px" }}>
        <SectionHead id="about-heading">About</SectionHead>
        <Fade>
          <div style={{ fontSize: mob ? 14 : 15, color: TEXT_SEC, lineHeight: 1.85, maxWidth: 680 }}>
            <p style={{ margin: "0 0 16px" }}>
              I am a Research Associate in the AI Healthcare Research Laboratory at Carnegie Mellon University Africa, where I completed my Master of Science in Engineering Artificial Intelligence (CQPA: 3.64/4.00) in May 2025. I also hold a Bachelor of Science in Computer Science from the University for Development Studies (CGPA: 4.43/5.00).
            </p>
            <p style={{ margin: "0 0 16px" }}>
              My research interests lie at the intersection of <strong style={{ color: TEXT, fontWeight: 600 }}>artificial intelligence and healthcare, with a focus on medical imaging</strong>. I develop and apply computer vision and deep learning techniques to complex, high-dimensional medical data, to build robust and interpretable diagnostic tools.
            </p>
            <p style={{ margin: 0 }}>
              I am particularly drawn to research that bridges advances in AI with practical clinical application, with an emphasis on <strong style={{ color: TEXT, fontWeight: 600 }}>solutions that scale to low-resource healthcare environments</strong>. I am currently applying to PhD programs for Fall 2026.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function StatusBadge({ status }) {
  const cfg = {
    accepted: { label: "Published", bg: "#dcfce7", color: "#166534" },
    review: { label: "Under Review", bg: "#fef3c7", color: "#92400e" },
    prep: { label: "In Preparation", bg: "#f1f5f9", color: "#475569" },
  };
  const c = cfg[status] || cfg.prep;
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 4,
      background: c.bg, color: c.color, letterSpacing: "0.3px", textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}>{c.label}</span>
  );
}

function AuthorList({ authors }) {
  return (
    <span style={{ fontSize: 14, color: TEXT_TERT }}>
      {authors.map((a, i) => (
        <span key={i}>
          {a === "A. T. Issah" ? (
            <span style={{ color: ACCENT, fontWeight: 600, textDecoration: "underline", textDecorationColor: `${ACCENT}40`, textUnderlineOffset: 2 }}>{a}</span>
          ) : a}
          {i < authors.length - 1 ? ", " : ""}
        </span>
      ))}
    </span>
  );
}

function PubItem({ pub, idx }) {
  return (
    <Fade delay={idx * 0.04}>
      <div style={{
        padding: "20px 0",
        borderBottom: `1px solid ${BORDER}`,
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
          <StatusBadge status={pub.status} />
          {pub.date && <span style={{ fontSize: 13, color: TEXT_TERT, fontWeight: 500 }}>{pub.date}</span>}
        </div>
        <h4 style={{
          fontSize: 15.5, fontWeight: 600, color: TEXT, lineHeight: 1.55,
          margin: "0 0 6px",
        }}>{pub.title}</h4>
        <div style={{ marginBottom: 4 }}>
          <AuthorList authors={pub.authors} />
        </div>
        {pub.venue && (
          <p style={{
            fontSize: 13.5, color: TEXT_SEC, margin: 0, fontStyle: "italic",
          }}>
            {pub.venue}{pub.location ? ` \u00B7 ${pub.location}` : ""}
          </p>
        )}
        {pub.links && pub.links.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            {pub.links.map((l, i) => (
              <a key={i} href={l.href} target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: 12.5, fontWeight: 500, color: ACCENT,
                textDecoration: "none", padding: "4px 12px", borderRadius: 5,
                border: `1px solid ${ACCENT}30`, background: `${ACCENT}06`,
                transition: "all 0.2s", lineHeight: 1,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${ACCENT}06`; e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = `${ACCENT}30`; }}
              >
                <span style={{ fontSize: 13 }}>{l.icon}</span>
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
  const mob = useMobile();
  const accepted = PUBS.filter(p => p.status === "accepted");
  const review = PUBS.filter(p => p.status === "review");
  const prep = PUBS.filter(p => p.status === "prep");
  return (
    <section id="publications" style={{ background: BG_SEC }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: mob ? "0 20px 40px" : "0 24px 60px" }}>
        <SectionHead>Publications</SectionHead>
        <Fade>
          <p style={{ fontSize: 14, color: TEXT_TERT, marginBottom: 24 }}>
            {PUBS.length} total {"\u00B7"} {accepted.length} published {"\u00B7"} {review.length} under review {"\u00B7"} {prep.length} in preparation
          </p>
        </Fade>

        {accepted.length > 0 && (
          <>
            <Fade><h3 style={{ fontSize: 13, fontWeight: 600, color: TEXT_TERT, textTransform: "uppercase", letterSpacing: 1.2, margin: "0 0 4px" }}>Accepted / Published</h3></Fade>
            {accepted.map((p, i) => <PubItem key={i} pub={p} idx={i} />)}
          </>
        )}

        {review.length > 0 && (
          <>
            <Fade><h3 style={{ fontSize: 13, fontWeight: 600, color: TEXT_TERT, textTransform: "uppercase", letterSpacing: 1.2, margin: "32px 0 4px" }}>Under Review</h3></Fade>
            {review.map((p, i) => <PubItem key={i} pub={p} idx={i} />)}
          </>
        )}

        {prep.length > 0 && (
          <>
            <Fade><h3 style={{ fontSize: 13, fontWeight: 600, color: TEXT_TERT, textTransform: "uppercase", letterSpacing: 1.2, margin: "32px 0 4px" }}>In Preparation</h3></Fade>
            {prep.map((p, i) => <PubItem key={i} pub={p} idx={i} />)}
          </>
        )}
      </div>
    </section>
  );
}

function Research() {
  const mob = useMobile();
  return (
    <section id="research" style={{ background: BG }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: mob ? "0 20px 40px" : "0 24px 60px" }}>
        <SectionHead>Research</SectionHead>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))", gap: mob ? 16 : 20 }}>
          {RESEARCH.map((r, i) => (
            <Fade key={i} delay={i * 0.06}>
              <div style={{
                padding: mob ? "20px 20px" : "24px 24px", borderRadius: 10,
                border: `1px solid ${BORDER}`, background: BG,
                transition: "box-shadow 0.25s, border-color 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = `${ACCENT}40`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = BORDER; }}
              >
                <h4 style={{ fontSize: 15, fontWeight: 600, color: TEXT, margin: "0 0 8px" }}>{r.title}</h4>
                <p style={{ fontSize: 14, color: TEXT_SEC, margin: 0, lineHeight: 1.7 }}>{r.desc}</p>
              </div>
            </Fade>
          ))}
        </div>

        <Fade>
          <div style={{ marginTop: mob ? 36 : 48 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: TEXT, margin: "0 0 20px" }}>Selected Experience</h3>
            {[
              {
                role: "Lead Researcher \u2014 Malaria Parasite Detection & Classification",
                org: "Carnegie Mellon University",
                detail: "Led end-to-end CV project across 7,000+ blood smear images for automated malaria detection; benchmarked models including YOLOv12, YOLOv8, Mask R-CNN, and Faster R-CNN.",
              },
              {
                role: "Co-first Author \u2014 AI-Powered Medical Equipment Platform",
                org: "Carnegie Mellon University",
                detail: "Developed an LLM-integrated diagnostic platform for real-time medical device repair support in LMICs. Presented at MICCAI 2025.",
              },
              {
                role: "Lead Researcher \u2014 KG-Driven Crop Advisory Platform",
                org: "Carnegie Mellon University & KCRC",
                detail: "Architecting a multi-agent advisory system combining iterative KG refinement with GraphRAG for smallholder farmers in Rwanda.",
              },
            ].map((e, i) => (
              <Fade key={i} delay={i * 0.06}>
                <div style={{ marginBottom: 24, paddingLeft: 16, borderLeft: `2px solid ${BORDER}` }}>
                  <h4 style={{ fontSize: mob ? 14 : 14.5, fontWeight: 600, color: TEXT, margin: "0 0 2px" }}>{e.role}</h4>
                  <p style={{ fontSize: 13, color: ACCENT, fontWeight: 500, margin: "0 0 6px" }}>{e.org}</p>
                  <p style={{ fontSize: 14, color: TEXT_SEC, margin: 0, lineHeight: 1.7 }}>{e.detail}</p>
                </div>
              </Fade>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

function News() {
  const mob = useMobile();
  return (
    <section id="news" style={{ background: BG_SEC }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: mob ? "0 20px 40px" : "0 24px 60px" }}>
        <SectionHead>News & Updates</SectionHead>
        <div style={{ position: "relative", paddingLeft: mob ? 28 : 36 }}>
          {/* Timeline line */}
          <div style={{
            position: "absolute", left: mob ? 5 : 7, top: 8, bottom: 8,
            width: 2, background: BORDER,
          }} />
          {NEWS.map((item, i) => (
            <Fade key={i} delay={i * 0.05}>
              <div style={{
                position: "relative", paddingBottom: i < NEWS.length - 1 ? 28 : 0,
                display: "flex", gap: mob ? 12 : 20, alignItems: "flex-start",
              }}>
                {/* Dot */}
                <div style={{
                  position: "absolute", left: mob ? -28 : -36,
                  top: 4, width: 12, height: 12, borderRadius: "50%",
                  background: item.latest ? ACCENT : BG,
                  border: `2px solid ${item.latest ? ACCENT : BORDER}`,
                  flexShrink: 0,
                }} />
                {/* Date */}
                <span style={{
                  fontSize: 13, fontWeight: 600, color: ACCENT,
                  minWidth: mob ? 70 : 80, flexShrink: 0, paddingTop: 1,
                }}>{item.date}</span>
                {/* Description */}
                <p style={{
                  fontSize: mob ? 14 : 15, color: TEXT_SEC, margin: 0, lineHeight: 1.65,
                }}>{item.text}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

function Teaching() {
  const mob = useMobile();
  return (
    <section id="teaching" style={{ background: BG }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: mob ? "0 20px 40px" : "0 24px 60px" }}>
        <SectionHead>Teaching</SectionHead>
        <Fade>
          <p style={{ fontSize: mob ? 14 : 15, color: TEXT_SEC, lineHeight: 1.8, marginBottom: 24, maxWidth: 600 }}>
            Graduate Teaching Assistant at Carnegie Mellon University.
          </p>
        </Fade>
        {[
          { course: "Introduction to Deep Learning (11-785)", period: "January 2025 \u2013 Present" },
          { course: "Data Inference & Applied Machine Learning", period: "September \u2013 December 2024" },
        ].map((t, i) => (
          <Fade key={i} delay={i * 0.08}>
            <div style={{
              display: "flex", flexDirection: mob ? "column" : "row",
              justifyContent: "space-between", alignItems: mob ? "flex-start" : "baseline",
              padding: "16px 0", borderBottom: `1px solid ${BORDER}`, gap: mob ? 2 : 8,
            }}>
              <span style={{ fontSize: mob ? 14 : 15, fontWeight: 500, color: TEXT }}>{t.course}</span>
              <span style={{ fontSize: 13, color: TEXT_TERT, flexShrink: 0 }}>{t.period}</span>
            </div>
          </Fade>
        ))}

        <Fade>
          <div style={{ marginTop: mob ? 32 : 40 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: TEXT, margin: "0 0 16px" }}>Technical Skills</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Python", "PyTorch", "LangChain", "LlamaIndex", "JavaScript", "Git", "AWS", "GCP", "SQL", "Flask"].map(s => (
                <span key={s} style={{
                  padding: "5px 14px", borderRadius: 6, fontSize: 13,
                  background: BG_SEC, color: TEXT_SEC, border: `1px solid ${BORDER}`,
                }}>{s}</span>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function Contact() {
  const mob = useMobile();
  return (
    <section id="contact" style={{ background: BG_SEC }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: mob ? "0 20px 60px" : "0 24px 80px" }}>
        <SectionHead>Contact</SectionHead>
        <Fade>
          <div style={{ maxWidth: 480 }}>
            <p style={{ fontSize: mob ? 14 : 15, color: TEXT_SEC, lineHeight: 1.8, margin: "0 0 24px" }}>
              I am open to research collaborations, PhD opportunities, and discussions about AI for healthcare. Feel free to reach out.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  icon: <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" style={{ width: 18, height: 18, verticalAlign: 'middle' }} />,
                  label: "aissah@andrew.cmu.edu",
                  href: "mailto:aissah@andrew.cmu.edu"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                      <path fill="#0077B5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                  label: "LinkedIn Profile",
                  href: "https://linkedin.com/in/ahmed-tahiru-issah-18b8671a2"
                },
                {
                  icon: <img src="https://cdn.simpleicons.org/googlescholar" alt="" style={{ width: 18, height: 18, verticalAlign: 'middle' }} />,
                  label: "Google Scholar",
                  href: "https://scholar.google.com/citations?user=E2zJqAoAAAAJ"
                },
                {
                  icon: <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" alt="GitHub" style={{ width: 18, height: 18, verticalAlign: 'middle' }} />,
                  label: "GitHub",
                  href: "https://github.com/ahmedinhotahiru"
                }
              ].map((c, i) => (
                <a key={i} href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 12, textDecoration: "none",
                  fontSize: mob ? 13.5 : 14.5, color: ACCENT, fontWeight: 500, transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
                  onMouseLeave={e => e.currentTarget.style.opacity = 1}
                >
                  <span style={{ fontSize: 16, flexShrink: 0, display: "flex", alignItems: "center" }}>{c.icon}</span>
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "24px 20px", textAlign: "center",
      borderTop: `1px solid ${BORDER}`, background: BG_SEC,
    }}>
      <p style={{ margin: 0, fontSize: 13, color: TEXT_TERT }}>
        {"\u00A9"} {new Date().getFullYear()} Ahmed Tahiru Issah
      </p>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = SECTIONS.map(s => s.toLowerCase());
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActive(ids[i]);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll);
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
      <Nav active={active} scrolled={scrolled} />
      <Hero />
      <Divider />
      <About />
      <Publications />
      <Research />
      <News />
      <Teaching />
      <Contact />
      <Footer />
    </div>
  );
}
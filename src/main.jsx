import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowUpRight, Network, ShieldCheck, Server, Activity, Github, Linkedin, Mail, MapPin, Menu, X, Download, Terminal, CheckCircle2, ChevronRight, Globe2, Router, LockKeyhole, Workflow } from 'lucide-react'
import './styles.css'

const projects = [
  {
    number: '01', category: 'NETWORK SECURITY', title: 'Site-to-site IPsec VPN design',
    summary: 'A restricted-access VPN pattern for secure partner connectivity to approved file-transfer services.',
    tags: ['Cisco ASA', 'IPsec', 'IKEv1 / IKEv2', 'Access control'],
    problem: 'A partner connection needed to support controlled file exchange without granting broad access to internal networks.',
    approach: 'Designed a least-privilege traffic scope, documented cryptographic parameters, and planned validation around the exact approved destinations and ports.',
    outcome: 'A repeatable implementation and test plan that prioritises segmentation, explicit access rules, and evidence-based validation.',
    note: 'Sanitised case study. Addresses, peer details, credentials, and production configuration are intentionally omitted.'
  },
  {
    number: '02', category: 'ENTERPRISE NETWORKING', title: 'DMZ connectivity & incident response',
    summary: 'Structured troubleshooting for a multi-link environment where an internet path behaved differently across upstream providers.',
    tags: ['Routing', 'Firewalls', 'DMZ', 'Troubleshooting'],
    problem: 'A DMZ service could not reach the internet through its expected upstream path, while an alternate path was available.',
    approach: 'Separate physical-link health, route selection, NAT, security policy, and return-path checks; identify the narrowest safe change before implementation.',
    outcome: 'A methodical diagnostic workflow designed to reduce unintended impact on other services and preserve existing VPN connectivity.',
    note: 'Generalised from operational troubleshooting. No live topology or sensitive network identifiers are published.'
  },
  {
    number: '03', category: 'DATA CENTRE', title: 'Data-centre infrastructure refresh',
    summary: 'Phased approach to cabinet relocation, core network changes, cooling improvements, and server virtualisation.',
    tags: ['Core switching', 'Virtualisation', 'Migration planning', 'Availability'],
    problem: 'Infrastructure refresh work must balance physical changes and modernisation with continuity of business-critical services.',
    approach: 'Break work into discovery, dependencies, change windows, migration waves, validation, rollback readiness, and post-change monitoring.',
    outcome: 'A staged delivery framework with clear checkpoints and rollback considerations instead of a high-risk single cutover.',
    note: 'Planning case study. Site diagrams, rack elevations, system names, and detailed security information are excluded.'
  },
  {
    number: '04', category: 'OPERATIONS', title: 'Enterprise network operations',
    summary: 'Operational practices for monitoring infrastructure health, triaging incidents, and keeping critical connectivity dependable.',
    tags: ['Monitoring', 'Incident response', 'Routing & switching', 'Documentation'],
    problem: 'Distributed services rely on dependable connectivity, timely fault isolation, and accurate operational records.',
    approach: 'Use layered checks across interface status, errors, routing, reachability, latency, firewall policy, and service-level validation.',
    outcome: 'A consistent incident workflow that supports quicker fault isolation, clear escalation, and stronger handover documentation.',
    note: 'Illustrative operational case study; no internal logs, service names, or identifiable customer information included.'
  }
]

const skills = [
  { icon: Router, title: 'Network engineering', items: ['LAN / WAN', 'VLANs & trunking', 'OSPF fundamentals', 'Routing & switching', 'DHCP, NAT & PAT', 'High availability'] },
  { icon: ShieldCheck, title: 'Network security', items: ['Cisco ASA', 'IPsec VPNs', 'Firewall policy', 'Network segmentation', 'Access control', 'Security troubleshooting'] },
  { icon: Server, title: 'Infrastructure', items: ['Data-centre operations', 'Core switching', 'Server connectivity', 'Virtualisation labs', 'Migration planning', 'Infrastructure documentation'] },
  { icon: Activity, title: 'Operations', items: ['Incident response', 'Monitoring & triage', 'Root-cause analysis', 'Change planning', 'Technical reporting', 'Stakeholder communication'] },
]

function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const email = 'YOUR_EMAIL@example.com'
  const nav = [['About', '#about'], ['Projects', '#projects'], ['Skills', '#skills'], ['Credentials', '#credentials']]
  const closeMenu = () => setMenuOpen(false)
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 1800) }
    catch { window.location.href = `mailto:${email}` }
  }
  return <div className="site-shell">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Ronald Soka home"><span className="brand-mark"><Network size={19}/></span><span>RS<span className="brand-dot">.</span></span></a>
      <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
        {nav.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15}/></a>
      </nav>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot"/> NETWORK ENGINEER <span className="eyebrow-divider">/</span> INFRASTRUCTURE & SECURITY</div>
          <h1>Building networks<br/>that <span className="gradient-text">keep business</span><br/>moving<span className="accent">.</span></h1>
          <p className="hero-lede">I'm <strong>Ronald T. Soka</strong> — a Network Engineer with a Software Engineering background, focused on enterprise connectivity, network security, and data-centre infrastructure.</p>
          <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <ArrowDownRight size={17}/></a><a className="button button-secondary" href="#contact">Get in touch <ArrowUpRight size={16}/></a><a className="cv-link" href="./Ronald-Soka-CV.pdf" download><Download size={15}/> Download CV</a></div>
          <div className="hero-meta"><span><MapPin size={14}/> Harare, Zimbabwe</span><span className="meta-separator"/><span><Globe2 size={14}/> Open to remote opportunities</span></div>
        </div>
        <div className="hero-visual" aria-label="Abstract network topology illustration">
          <div className="visual-topline"><span>NETWORK / OVERVIEW</span><span className="live-pill"><i/> SYSTEMS THINKING</span></div>
          <div className="network-art">
            <svg className="connection-lines" viewBox="0 0 500 420" fill="none" aria-hidden="true"><path d="M250 206 L112 104 L68 213 L157 321 L250 206 L362 101 L432 208 L345 322 L250 206"/><path d="M112 104 L362 101 M68 213 L432 208 M157 321 L345 322 M112 104 L157 321 M362 101 L345 322"/><path className="line-bright" d="M68 213 L250 206 L362 101 M250 206 L345 322"/></svg>
            <div className="node node-cloud"><Globe2 size={21}/><span>WAN / INTERNET</span></div>
            <div className="node node-core"><Network size={27}/><b>CORE</b><span>Routing & switching</span></div>
            <div className="node node-security"><ShieldCheck size={20}/><span>SECURITY</span></div>
            <div className="node node-server"><Server size={20}/><span>DATA CENTRE</span></div>
            <div className="node node-edge"><Router size={20}/><span>EDGE NETWORK</span></div>
            <div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="visual-caption"><span className="caption-icon"><Terminal size={15}/></span><div><b>Connect. Secure. Optimise.</b><small>Practical engineering. Reliable outcomes.</small></div><span className="caption-arrow"><ArrowUpRight size={17}/></span></div>
          </div>
          <div className="visual-footer"><span><i className="legend-cyan"/> NETWORK</span><span><i className="legend-purple"/> SECURITY</span><span><i className="legend-green"/> INFRASTRUCTURE</span></div>
        </div>
      </section>

      <section className="ticker" aria-label="Technical focus areas"><div className="ticker-track">{['ENTERPRISE NETWORKS','NETWORK SECURITY','DATA CENTRE','INCIDENT RESPONSE','IPSEC VPN','ROUTING & SWITCHING','INFRASTRUCTURE'].map((x,i)=><span key={x}><b>✳</b>{x}</span>)}</div></section>

      <section className="section-wrap about-section" id="about">
        <div className="section-heading"><div><span className="section-index">01 / ABOUT</span><h2>Engineering with<br/><span className="muted-heading">the bigger picture.</span></h2></div><p className="section-intro">A hands-on infrastructure mindset, backed by software engineering fundamentals and a commitment to secure, reliable services.</p></div>
        <div className="about-grid"><div className="about-card about-main"><div className="card-icon"><Workflow size={20}/></div><h3>Beyond connectivity.</h3><p>My work sits where network availability, security controls, and infrastructure operations meet. I approach technical problems systematically: understand the service, isolate the fault, make a controlled change, and validate the result.</p><p>I'm interested in teams that value clear engineering, thoughtful documentation, continuous improvement, and dependable production systems.</p><div className="about-tags"><span>Methodical</span><span>Security-minded</span><span>Service-focused</span></div></div>
          <div className="stat-card"><span className="stat-label">CORE FOCUS</span><ShieldCheck size={24}/><strong>Secure by design</strong><p>Least privilege, segmentation, and controlled change.</p></div>
          <div className="stat-card"><span className="stat-label">WORK STYLE</span><Activity size={24}/><strong>Evidence-led</strong><p>Diagnose methodically. Test thoroughly. Document clearly.</p></div>
        </div>
      </section>

      <section className="projects-section" id="projects"><div className="section-wrap"><div className="section-heading"><div><span className="section-index">02 / SELECTED WORK</span><h2>Projects with a<br/><span className="muted-heading">real-world lens.</span></h2></div><p className="section-intro">Sanitised case studies based on professional experience. Select a project to explore the challenge, approach, and outcome.</p></div>
        <div className="project-grid">{projects.map(p=><button className="project-card" key={p.number} onClick={()=>setActiveProject(p)}><div className="project-card-top"><span className="project-number">{p.number}</span><span className="project-open"><ArrowUpRight size={18}/></span></div><span className="project-category">{p.category}</span><h3>{p.title}</h3><p>{p.summary}</p><div className="tag-row">{p.tags.map(t=><span key={t}>{t}</span>)}</div><div className="project-card-bottom"><span>VIEW CASE STUDY</span><ChevronRight size={16}/></div></button>)}</div>
        <div className="confidential-note"><LockKeyhole size={16}/><p><strong>Confidentiality comes first.</strong> These summaries intentionally exclude internal IP addresses, production configurations, customer identifiers, credentials, and restricted diagrams.</p></div>
      </div></section>

      <section className="section-wrap skills-section" id="skills"><div className="section-heading"><div><span className="section-index">03 / CAPABILITIES</span><h2>Technical toolkit<span className="accent">.</span></h2></div><p className="section-intro">Core areas I work with and continue to develop through hands-on practice and professional learning.</p></div>
        <div className="skills-grid">{skills.map((s,i)=><div className="skill-card" key={s.title}><div className="skill-top"><span className="skill-icon"><s.icon size={20}/></span><span className="skill-index">0{i+1}</span></div><h3>{s.title}</h3><ul>{s.items.map(item=><li key={item}><CheckCircle2 size={14}/>{item}</li>)}</ul></div>)}</div>
        <p className="skills-disclaimer">Skills reflect a mix of professional experience, foundational knowledge, and lab-based practice. Specific depth can be discussed for each technology.</p>
      </section>

      <section className="credentials-section" id="credentials"><div className="section-wrap"><div className="section-heading"><div><span className="section-index">04 / CREDENTIALS</span><h2>Learning that<br/><span className="muted-heading">keeps moving.</span></h2></div><p className="section-intro">Formal education and professional learning that support my network and security engineering practice.</p></div>
        <div className="credential-list"><div className="credential-row"><div className="credential-logo">ZU</div><div className="credential-info"><h3>BSc Honours Degree in Software Engineering</h3><p>Zimbabwe Open University</p></div><span className="credential-type">DEGREE</span><ChevronRight size={17}/></div><div className="credential-row"><div className="credential-logo cisco-logo">C</div><div className="credential-info"><h3>Cisco Cybersecurity Essentials</h3><p>Cisco Networking Academy · 2022</p></div><span className="credential-type">CERTIFICATE</span><ChevronRight size={17}/></div><div className="credential-row"><div className="credential-logo cisco-logo">C</div><div className="credential-info"><h3>Cisco Cybersecurity Operations</h3><p>Cisco Networking Academy · 2022</p></div><span className="credential-type">CERTIFICATE</span><ChevronRight size={17}/></div><div className="credential-row"><div className="credential-logo">CC</div><div className="credential-info"><h3>CCNA 200-301</h3><p>Ongoing professional development</p></div><span className="credential-type credential-progress">IN PROGRESS</span><ChevronRight size={17}/></div></div>
      </div></section>

      <section className="contact-section" id="contact"><div className="section-wrap contact-wrap"><div><span className="section-index">05 / CONTACT</span><h2>Let's build something<br/><span className="gradient-text">reliable.</span></h2><p>Interested in remote network engineering, infrastructure, or network security opportunities? I'd be glad to connect.</p><div className="contact-actions"><a className="button button-secondary" href="./Ronald-Soka-CV.pdf" download><Download size={16}/> Download CV</a><button className="button button-primary" onClick={copyEmail}><Mail size={16}/>{copied ? 'Email copied' : 'Copy email address'} <ArrowUpRight size={16}/></button><a className="button button-secondary" href="https://www.linkedin.com/in/ronald-soka-552056158/" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={16}/></a></div><small className="contact-hint">Before publishing, replace the placeholder email and verify your LinkedIn profile URL.</small></div><div className="contact-side"><div className="contact-orb"><Network size={42}/></div><span className="contact-side-label">CURRENTLY OPEN TO</span><h3>Global opportunities</h3><p>Remote-first teams · Network engineering · Infrastructure & security</p><div className="contact-side-line"/><div className="contact-location"><MapPin size={15}/> Based in Harare, Zimbabwe</div></div></div></section>
    </main>
    <footer className="footer"><a className="brand" href="#home"><span className="brand-mark"><Network size={17}/></span><span>RS<span className="brand-dot">.</span></span></a><span>© {new Date().getFullYear()} Ronald T. Soka. Built for the next connection.</span><a href="#home" className="back-top">BACK TO TOP ↑</a></footer>

    {activeProject && <div className="modal-backdrop" role="presentation" onClick={()=>setActiveProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e=>e.stopPropagation()}><div className="modal-top"><span className="project-category">{activeProject.category}</span><button className="modal-close" onClick={()=>setActiveProject(null)} aria-label="Close case study"><X size={20}/></button></div><span className="modal-number">CASE STUDY / {activeProject.number}</span><h2 id="modal-title">{activeProject.title}</h2><p className="modal-summary">{activeProject.summary}</p><div className="modal-section"><h3>01 — The challenge</h3><p>{activeProject.problem}</p></div><div className="modal-section"><h3>02 — Engineering approach</h3><p>{activeProject.approach}</p></div><div className="modal-section"><h3>03 — Outcome</h3><p>{activeProject.outcome}</p></div><div className="tag-row modal-tags">{activeProject.tags.map(t=><span key={t}>{t}</span>)}</div><div className="modal-note"><LockKeyhole size={16}/>{activeProject.note}</div></div></div>}
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)

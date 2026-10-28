import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDownRight, ArrowUpRight, Network, ShieldCheck, Server, Activity,
  Linkedin, Mail, MapPin, Menu, X, Download, CheckCircle2, ChevronRight,
  Globe2, Router, LockKeyhole, Workflow, HeartHandshake, Compass, Sprout,
  GraduationCap, MessageCircle, CircleCheck, Clock3, Code2, Database, Monitor
} from 'lucide-react'
import './styles.css'

const projects = [
  {
    number: '01', category: 'ENTERPRISE NETWORKING', title: 'Bringing branch offices closer to headquarters',
    summary: 'Connecting branch locations to central services so teams can work across sites with dependable access.',
    tags: ['Branch connectivity', 'Routing', 'LAN / WAN', 'Troubleshooting'],
    challenge: 'Teams in branch locations need secure, reliable access to services and resources hosted at headquarters, even when sites have different local conditions.',
    approach: 'Support the end-to-end site connectivity path: understand the required services, check routing and reachability, confirm the relevant access controls, and validate connectivity from the branch to the central destination.',
    outcome: 'A more consistent approach to extending enterprise connectivity beyond the main office, with attention to service reachability and the boundaries between sites.',
    takeaway: 'A site link is only useful when the people and applications that depend on it can reliably reach what they need.',
    note: 'Sanitised case study. Branch names, addressing, network diagrams, service identifiers, and production configurations are omitted.'
  },
  {
    number: '02', category: 'NETWORK SECURITY', title: 'Connecting international sites with Sophos RED',
    summary: 'Using Sophos Remote Ethernet Devices to extend managed headquarters connectivity to remote international offices.',
    tags: ['Sophos RED', 'Sophos Firewall', 'Remote sites', 'Secure connectivity'],
    challenge: 'International offices need a dependable path to approved central services without losing visibility and control over how remote sites connect.',
    approach: 'Work through remote-device provisioning, central firewall integration, routing, access policy, and end-to-end checks to confirm that required services are reachable and unrelated network access remains appropriately limited.',
    outcome: 'A repeatable remote-site connectivity pattern built around central management, clear access boundaries, and validation from the remote location.',
    takeaway: 'Remote connectivity works best when the user experience is simple and the security controls remain deliberate.',
    note: 'Sanitised case study. Country names, site identities, public IPs, device serials, firewall rules, and tunnel details are intentionally excluded.'
  },
  {
    number: '03', category: 'DATA-CENTRE INFRASTRUCTURE', title: 'Relocating core network equipment to a new data-centre site',
    summary: 'Moving critical core network equipment with careful attention to dependencies, reconnection, and service validation.',
    tags: ['Core network', 'Data-centre migration', 'Change planning', 'Service validation'],
    challenge: 'Relocating core equipment affects the connectivity paths that many downstream systems rely on, so the move needs coordinated sequencing and clear recovery options.',
    approach: 'Treat the relocation as a controlled change: identify dependencies, coordinate disconnection and reconnection activities, verify physical and logical links, test core reachability and dependent services, and retain a clear escalation and rollback plan where applicable.',
    outcome: 'A migration approach focused on restoring core connectivity methodically and checking dependent services instead of treating equipment relocation as a purely physical task.',
    takeaway: 'A data-centre move is successful when the services behind the equipment are verified—not just when the hardware is in its new location.',
    note: 'Sanitised case study. No site layout, rack elevation, hardware placement, management addresses, or detailed topology is published.'
  },
  {
    number: '04', category: 'NETWORK SECURITY', title: 'Making partner connections safer',
    summary: 'A site-to-site VPN pattern designed to let a partner reach only the approved internal services it needs.',
    tags: ['Cisco ASA', 'IPsec VPN', 'Access control', 'Least privilege'],
    challenge: 'A partner needed to exchange files with selected internal services without receiving broad access to the wider data-centre network.',
    approach: 'Define the narrowest required traffic scope, review VPN security parameters, align routing and firewall rules, and validate both permitted and prohibited access paths.',
    outcome: 'A reusable implementation and validation approach centred on least privilege, explicit access rules, and evidence that the approved service path works as intended.',
    takeaway: 'A secure connection should enable the right work without opening unrelated systems.',
    note: 'Sanitised case study. Partner identity, server addresses, peer details, credentials, and production configurations are intentionally omitted.'
  },
  {
    number: '05', category: 'INCIDENT RESPONSE', title: 'Restoring a reliable internet path for a segmented service',
    summary: 'Investigating why a DMZ-hosted service could not use its expected internet connection while an alternative route was available.',
    tags: ['DMZ', 'Routing', 'Firewall policy', 'NAT'],
    challenge: 'A service in a segmented environment could not reach an external destination through its expected upstream path, although an alternate provider path was working.',
    approach: 'Separate the investigation into link health, route selection, policy-based routing where applicable, address translation, firewall rules, and return-path validation. Prefer a narrowly scoped change and verify it without disturbing unrelated services.',
    outcome: 'A disciplined path to restoring the specific connectivity requirement while keeping the impact on other services in view.',
    takeaway: 'When multiple internet paths exist, correct policy and return routing matter as much as link status.',
    note: 'Generalised from operational troubleshooting. Provider details, host addresses, policies, and sensitive network identifiers are not included.'
  },
  {
    number: '06', category: 'PUBLIC-SECTOR SYSTEMS', title: 'Supporting connectivity for a financial management platform',
    summary: 'Network operations and troubleshooting for a public-sector platform that depends on reliable access between users and central services.',
    tags: ['Enterprise networking', 'Service availability', 'Incident support', 'Coordination'],
    challenge: 'Financial and administrative platforms depend on a stable network path between users, application services, and supporting infrastructure.',
    approach: 'Approach faults from the service outward: establish the impact, validate network reachability, check routing and security boundaries, coordinate with the relevant technical teams, and record what has been tested.',
    outcome: 'Practical network support aimed at restoring service access, narrowing the fault domain, and making incidents easier to communicate and follow up.',
    takeaway: 'In business-critical systems, the network is part of the service experience—not just background infrastructure.',
    note: 'Deliberately anonymised public-sector case study. Platform names, user information, internal architecture, operational schedules, and system identifiers are excluded.'
  },
  {
    number: '07', category: 'EVENT & VENUE CONNECTIVITY', title: 'Helping prepare networks for busy event environments',
    summary: 'Connectivity support for exhibition and stadium environments where many users and services rely on the network at the same time.',
    tags: ['Venue networking', 'Switching', 'Connectivity checks', 'On-site support'],
    challenge: 'Large event environments bring time-sensitive connectivity requirements, multiple service dependencies, and limited tolerance for unresolved issues during live operations.',
    approach: 'Focus on the readiness basics: confirm intended connections, inspect link and device status, test reachability for the required services, and troubleshoot issues in coordination with the teams responsible for each component.',
    outcome: 'A practical, service-focused approach to venue connectivity that prioritises readiness, clear fault isolation, and responsive support during operational windows.',
    takeaway: 'For live events, testing the actual user and service path is more useful than assuming the network is ready because devices are powered on.',
    note: 'Sanitised summary of event and venue connectivity work. Venue-specific designs, equipment locations, service identifiers, and security details are omitted.'
  },
  {
    number: '08', category: 'DATA-CENTRE & APPLICATION HOSTING', title: 'Supporting network connectivity for enterprise applications',
    summary: 'Network and infrastructure support around hosted business applications, including SAP-related services.',
    tags: ['SAP hosting context', 'Data-centre networking', 'Routing', 'Service dependencies'],
    challenge: 'Enterprise applications rely on several connected components, so an issue experienced by a user may originate in the network path, a security boundary, a host, or another dependency.',
    approach: 'Help establish the affected service path, validate network reachability and policy, document findings, and coordinate with the teams responsible for the application and hosting layers.',
    outcome: 'An infrastructure-focused contribution that keeps application connectivity, service dependencies, and cross-team troubleshooting visible.',
    takeaway: 'Supporting an application means understanding the path it travels, while knowing where network responsibility ends and other teams take over.',
    note: 'This is a network/infrastructure case study, not a claim of SAP functional configuration or completion of an SAP S/4HANA migration.'
  },
  {
    number: '09', category: 'SOFTWARE & BUSINESS SYSTEMS', title: 'Simplifying everyday sales and stock work',
    summary: 'A point-of-sale prototype shaped around the practical needs of a small tuckshop and food business.',
    tags: ['POS workflow', 'Stock tracking', 'Product thinking'],
    challenge: 'Small operators need a simple way to record sales and understand stock usage without adding unnecessary complexity to a busy day.',
    approach: 'Translate the daily workflow into clear product and inventory records, straightforward sales actions, and stock rules that reflect how portions and consumables are used.',
    outcome: 'A practical prototype direction for bringing sales and inventory activities into one easier-to-follow workflow.',
    takeaway: 'Useful software starts with understanding the work people already do.',
    note: 'Prototype case study. It does not claim production adoption, financial impact, or live customer deployment.'
  },
  {
    number: '10', category: 'WEB DEVELOPMENT & UX', title: 'Making technical experience easier to understand',
    summary: 'A responsive portfolio experience that presents infrastructure work in clear language for recruiters and hiring teams.',
    tags: ['React', 'Vite', 'Responsive UI', 'UX writing'],
    challenge: 'Technical profiles can be difficult for non-specialist recruiters to scan when they rely too heavily on acronyms and tool lists.',
    approach: 'Build a responsive experience around a welcoming introduction, plain-language case studies, broader capability groups, education, and clear contact actions.',
    outcome: 'A live, mobile-friendly portfolio designed to help different audiences understand the candidate’s range and find relevant evidence.',
    takeaway: 'Good interface design connects the information people need with the decision they are trying to make.',
    note: 'Personal portfolio project. Technologies and project descriptions should stay aligned with work actually completed.'
  }
]

const strengths = [
  { icon: Network, title: 'Keep people connected', text: 'Design, support, and troubleshoot the networks that help teams and services work.' },
  { icon: ShieldCheck, title: 'Protect access', text: 'Apply security controls with a practical focus on appropriate access and segmentation.' },
  { icon: Activity, title: 'Respond with clarity', text: 'Investigate issues methodically, make controlled changes, and validate outcomes.' },
  { icon: Server, title: 'Plan for continuity', text: 'Approach infrastructure changes with dependencies, service availability, and recovery in mind.' },
  { icon: Code2, title: 'Build practical tools', text: 'Turn everyday workflows into clear, usable software and web experiences.' },
]

const skillGroups = [
  { icon: Router, title: 'Network engineering', intro: 'Building blocks for dependable connectivity', items: ['Routing and switching', 'VLANs and trunking', 'OSPF fundamentals', 'DHCP, NAT and PAT', 'High-availability concepts'] },
  { icon: ShieldCheck, title: 'Network security', intro: 'Controlled access and secure communication', items: ['Cisco ASA firewalls', 'Site-to-site IPsec VPNs', 'Firewall policy and access control', 'Network segmentation', 'Security troubleshooting'] },
  { icon: Monitor, title: 'Systems administration & IT support', intro: 'Supporting operating systems, users and day-to-day services', items: ['Solaris / UNIX command-line troubleshooting', 'Windows workstation support', 'Active Directory fundamentals', 'User and access support concepts', 'Service checks and issue documentation'] },
  { icon: Code2, title: 'Web development', intro: 'Building clear, responsive experiences for the browser', items: ['HTML, CSS and JavaScript', 'Responsive layouts', 'React and Vite', 'Next.js fundamentals', 'Tailwind CSS and component styling'] },
  { icon: Database, title: 'Software development & app prototyping', intro: 'Turning a workflow or problem into a useful application', items: ['Requirements and workflow breakdown', 'Reusable UI components', 'POS and inventory workflow design', 'Supabase / database fundamentals', 'Validation and iterative improvement'] },
  { icon: Server, title: 'Infrastructure & operations', intro: 'Reliable services through good operational practice', items: ['Data-centre operations', 'Server and service connectivity', 'Monitoring and incident response', 'Migration and change planning', 'Technical documentation and handover'] },
]

function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const email = 'sokatavadaishe@gmail.com'
  const nav = [['About', '#about'], ['How I work', '#approach'], ['Projects', '#projects'], ['What I do', '#skills'], ['Education', '#education']]
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!activeProject) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') setActiveProject(null) }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.add('modal-open')
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [activeProject])



  return <div className="site-shell" id="top">
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Ronald Soka home">
        <span className="brand-mark">RS<span>.</span></span>
        <span className="brand-name">Ronald Soka <small>Infrastructure · Systems · Software</small></span>
      </a>
      <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        {nav.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={closeMenu}>Let’s connect <ArrowUpRight size={15}/></a>
      </nav>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot"/> HELLO, I’M RONALD <span className="eyebrow-divider">·</span> TECHNOLOGY & INFRASTRUCTURE</div>
          <h1>Reliable technology.<br/><em>Practical solutions.</em></h1>
          <p className="hero-lede">From dependable networks and secure systems to practical web apps, I help turn technology problems into solutions people can rely on.</p>
          <p className="hero-support">My background brings together network engineering, systems support, and a Software Engineering degree—with hands-on work across infrastructure and growing software and web projects.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">See how I work <ArrowDownRight size={17}/></a>
            <a className="button button-secondary" href="./Ronald-Soka-CV.pdf" download><Download size={16}/> Download my CV</a>
          </div>
          <div className="hero-meta"><span><MapPin size={15}/> Harare, Zimbabwe</span><span className="meta-dot"/><span><Globe2 size={15}/> Open to remote opportunities</span></div>
        </div>

        <div className="hero-card" aria-label="Professional focus overview">
          <div className="hero-card-top"><span className="mini-label">MY PROFESSIONAL FOCUS</span><span className="sun-mark" aria-hidden="true">✳</span></div>
          <div className="hero-card-message">Technology that<br/><span>works for people.</span></div>
          <p className="hero-card-copy">Connecting the systems, supporting the people, and building tools that make work easier.</p>
          <div className="focus-list">
            <div className="focus-item"><span className="focus-icon focus-icon-green"><Network size={18}/></span><div><strong>Connect</strong><small>Build dependable pathways</small></div><ArrowUpRight size={16}/></div>
            <div className="focus-item"><span className="focus-icon focus-icon-amber"><ShieldCheck size={18}/></span><div><strong>Protect</strong><small>Keep access appropriate</small></div><ArrowUpRight size={16}/></div>
            <div className="focus-item"><span className="focus-icon focus-icon-blue"><Code2 size={18}/></span><div><strong>Build</strong><small>Create useful digital tools</small></div><ArrowUpRight size={16}/></div>
          </div>
          <div className="hero-card-foot"><span><span className="availability-dot"/> Open to the right opportunity</span><span>01 / 03</span></div>
          <div className="hero-decoration hero-decoration-one"/><div className="hero-decoration hero-decoration-two"/>
        </div>
      </section>

      <section className="value-strip" aria-label="Areas of professional focus">
        <div className="section-wrap value-strip-inner"><span className="value-label">WHAT I BRING</span>{['Networks & security', 'Systems & user support', 'Software & web apps', 'Calm problem-solving'].map(item => <span className="value-chip" key={item}><CheckCircle2 size={15}/>{item}</span>)}</div>
      </section>

      <section className="section-wrap about-section section-pad" id="about">
        <div className="section-heading"><div><span className="section-index">01 / A LITTLE ABOUT ME</span><h2>Technical thinking.<br/><em>Human perspective.</em></h2></div><p className="section-intro">I work across the layers behind useful technology: connectivity, system support, and software. The common goal is making systems dependable and tools easier for people to use.</p></div>
        <div className="about-grid">
          <div className="about-story"><span className="story-mark">“</span><p>I enjoy working through complex technical problems and turning them into clear, practical solutions. I aim to understand the service first, identify the real cause, and make changes thoughtfully—without losing sight of the people who rely on the result.</p><p>My Software Engineering background also draws me toward application and web development. I enjoy turning a workflow into a clearer interface and thinking through how the systems, data, and user experience fit together.</p><div className="about-signoff"><span className="signoff-line"/><span>Reliable by design. Thoughtful by approach.</span></div></div>
          <div className="strength-list">{strengths.map((item, i) => <article className="strength-item" key={item.title}><span className="strength-icon"><item.icon size={21}/></span><div><span className="strength-number">0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="approach-section section-pad" id="approach"><div className="section-wrap"><div className="section-heading"><div><span className="section-index">02 / HOW I WORK</span><h2>Steady under pressure.<br/><em>Clear on the details.</em></h2></div><p className="section-intro">Good engineering is not only about knowing commands. It is also about asking the right questions, communicating clearly, and leaving systems in a better place.</p></div>
        <div className="approach-grid"><article className="approach-card"><span className="approach-symbol"><Compass size={22}/></span><span className="approach-kicker">01 — UNDERSTAND</span><h3>Start with the service</h3><p>Understand what is affected, who depends on it, and what a successful outcome should look like before changing anything.</p></article><article className="approach-card"><span className="approach-symbol"><Workflow size={22}/></span><span className="approach-kicker">02 — RESOLVE</span><h3>Work the problem methodically</h3><p>Follow the evidence across the network, security rules, and service path. Prefer precise, controlled changes over guesswork.</p></article><article className="approach-card"><span className="approach-symbol"><HeartHandshake size={22}/></span><span className="approach-kicker">03 — LEAVE IT CLEARER</span><h3>Validate and communicate</h3><p>Confirm the service works, document what changed, and make the next handover easier for the team.</p></article></div>
      </div></section>

      <section className="projects-section section-pad" id="projects"><div className="section-wrap"><div className="section-heading"><div><span className="section-index">03 / SELECTED WORK</span><h2>Real problems.<br/><em>Practical responses.</em></h2></div><p className="section-intro">From branch and international connectivity to data-centre relocation, business-critical services, and software prototypes. Each story explains the challenge and engineering approach in plain language, while protecting sensitive operational details.</p></div>
        <div className="project-grid">{projects.map(p => <button className="project-card" key={p.number} onClick={() => setActiveProject(p)}><div className="project-card-top"><span className="project-number">{p.number}</span><span className="project-open" aria-hidden="true"><ArrowUpRight size={18}/></span></div><span className="project-category">{p.category}</span><h3>{p.title}</h3><p>{p.summary}</p><div className="tag-row">{p.tags.map(t => <span key={t}>{t}</span>)}</div><div className="project-card-bottom"><span>EXPLORE THE STORY</span><ChevronRight size={16}/></div></button>)}</div>
        <div className="confidential-note"><LockKeyhole size={18}/><p><strong>Professional discretion matters.</strong> These case studies intentionally omit internal addresses, production configurations, customer identifiers, credentials, and restricted diagrams.</p></div>
      </div></section>

      <section className="skills-section section-pad" id="skills"><div className="section-wrap"><div className="section-heading"><div><span className="section-index">04 / CAPABILITIES</span><h2>A toolkit built<br/><em>around reliability.</em></h2></div><p className="section-intro">My toolkit spans connectivity, systems support, software, and web development. The lists reflect a mix of professional work, fundamentals, and ongoing hands-on practice.</p></div>
        <div className="skills-grid">{skillGroups.map((s, i) => <article className="skill-card" key={s.title}><div className="skill-top"><span className="skill-icon"><s.icon size={21}/></span><span className="skill-index">0{i + 1}</span></div><h3>{s.title}</h3><p className="skill-intro">{s.intro}</p><ul>{s.items.map(item => <li key={item}><CircleCheck size={15}/>{item}</li>)}</ul></article>)}</div>
        <p className="skills-disclaimer">These areas reflect a mix of professional responsibility, training, practical projects, and continued development—not an equal level of depth in every tool. I’m happy to discuss the specific experience behind each area.</p>
      </div></section>

      <section className="education-section section-pad" id="education"><div className="section-wrap"><div className="section-heading"><div><span className="section-index">05 / EDUCATION & LEARNING</span><h2>Curious by nature.<br/><em>Always learning.</em></h2></div><p className="section-intro">My formal software engineering background complements my infrastructure work. I continue to build on it through security training, technical labs, and practical application ideas.</p></div>
        <div className="education-layout"><div className="education-feature"><span className="education-icon"><GraduationCap size={25}/></span><span className="mini-label">FORMAL EDUCATION</span><h3>BSc Honours Degree in Software Engineering</h3><p>Zimbabwe Open University</p><div className="education-footer"><span>Systems thinking</span><span>Problem-solving</span><span>Software foundations</span></div></div><div className="credential-list"><div className="credential-row"><span className="credential-logo cisco-logo">C</span><div className="credential-info"><h3>Cisco Cybersecurity Essentials</h3><p>Cisco Networking Academy · 2022</p></div><span className="credential-type">CERTIFICATE</span></div><div className="credential-row"><span className="credential-logo cisco-logo">C</span><div className="credential-info"><h3>Cisco Cybersecurity Operations</h3><p>Cisco Networking Academy · 2022</p></div><span className="credential-type">CERTIFICATE</span></div><div className="credential-row"><span className="credential-logo">CC</span><div className="credential-info"><h3>CCNA 200-301</h3><p>Ongoing study and professional development</p></div><span className="credential-type credential-progress">IN PROGRESS</span></div></div></div>
      </div></section>

      <section className="contact-section section-pad" id="contact"><div className="section-wrap contact-wrap"><div className="contact-copy"><span className="section-index">06 / LET’S CONNECT</span><h2>Good work starts<br/>with a <em>conversation.</em></h2><p>If you're building a team that values dependable infrastructure, secure connectivity, and thoughtful problem-solving, I’d be glad to hear from you.</p><div className="contact-actions"><a className="button button-primary" href="mailto:sokatavadaishe@gmail.com"><Mail size={16}/> Email me <ArrowUpRight size={16}/></a><a className="button button-secondary" href="./Ronald-Soka-CV.pdf" download><Download size={16}/> Download CV</a><a className="button button-linkedin" href="https://www.linkedin.com/in/ronald-soka-552056158/" target="_blank" rel="noreferrer"><Linkedin size={16}/> Connect on LinkedIn <ArrowUpRight size={16}/></a></div></div><aside className="contact-card"><div className="contact-card-top"><span className="contact-card-mark"><MessageCircle size={23}/></span><span className="available-pill"><i/> OPEN TO OPPORTUNITIES</span></div><h3>Let’s find the right connection.</h3><p>Remote roles · Network engineering · Systems support · Software and web development</p><div className="contact-detail"><MapPin size={16}/><span>Harare, Zimbabwe</span></div><div className="contact-detail"><Mail size={16}/><span>sokatavadaishe@gmail.com</span></div><div className="contact-card-note"><Clock3 size={15}/> Thoughtful work. Clear communication. Shared progress.</div></aside></div></section>
    </main>

    <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">RS<span>.</span></span><span className="brand-name">Ronald Soka <small>Infrastructure · Systems · Software</small></span></a><span>© {new Date().getFullYear()} Ronald T. Soka</span><a href="#top" className="back-top">BACK TO TOP ↑</a></footer>

    {activeProject && <div className="modal-backdrop" role="presentation" onClick={() => setActiveProject(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}><div className="modal-top"><span className="project-category">{activeProject.category}</span><button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close case study"><X size={20}/></button></div><span className="modal-number">CASE STUDY / {activeProject.number}</span><h2 id="modal-title">{activeProject.title}</h2><p className="modal-summary">{activeProject.summary}</p><div className="modal-section"><span>THE CHALLENGE</span><p>{activeProject.challenge}</p></div><div className="modal-section"><span>THE APPROACH</span><p>{activeProject.approach}</p></div><div className="modal-section"><span>THE OUTCOME</span><p>{activeProject.outcome}</p></div><div className="modal-takeaway"><Sprout size={18}/><p>{activeProject.takeaway}</p></div><div className="tag-row modal-tags">{activeProject.tags.map(t => <span key={t}>{t}</span>)}</div><div className="modal-note"><LockKeyhole size={16}/>{activeProject.note}</div></section></div>}
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)

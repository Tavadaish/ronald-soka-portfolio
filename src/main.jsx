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
    number: '01', category: 'NETWORK SECURITY', title: 'Making partner connections safer',
    summary: 'A secure connection pattern designed to let a partner reach only the services they actually need.',
    tags: ['Cisco ASA', 'IPsec VPN', 'Access control'],
    challenge: 'A partner needed to exchange files with selected internal services without receiving broad access to the wider network.',
    approach: 'Defined the smallest required traffic scope, reviewed the VPN security parameters, and mapped out a validation plan for both access and connectivity.',
    outcome: 'A reusable design approach centred on least privilege, clear access rules, and testing that confirms what is allowed—and what is not.',
    takeaway: 'Security should enable the right work while keeping unrelated systems out of reach.',
    note: 'Sanitised case study. Network addresses, peer details, credentials, and production configurations are intentionally omitted.'
  },
  {
    number: '02', category: 'TROUBLESHOOTING', title: 'Restoring a reliable internet path',
    summary: 'A structured investigation into an application that could not reach the internet through its expected connection.',
    tags: ['Routing', 'Firewall policy', 'NAT'],
    challenge: 'A service in a segmented network was unable to reach an external destination through its expected upstream path, although an alternate path was available.',
    approach: 'Separated the problem into link health, route selection, address translation, firewall policy, and return-path checks before identifying a narrowly scoped change.',
    outcome: 'A controlled troubleshooting method designed to restore the required access while limiting the risk of disrupting other services.',
    takeaway: 'Good incident response is deliberate: isolate the cause, change only what is necessary, then verify the result.',
    note: 'Generalised from operational troubleshooting. No live topology, service names, or sensitive network identifiers are included.'
  },
  {
    number: '03', category: 'DATA-CENTRE INFRASTRUCTURE', title: 'Planning an infrastructure refresh',
    summary: 'A phased approach to infrastructure change that puts service continuity and rollback readiness first.',
    tags: ['Core switching', 'Migration planning', 'Availability'],
    challenge: 'Physical infrastructure changes and modernisation can affect multiple dependent services if work is treated as one large cutover.',
    approach: 'Organised the work around discovery, dependencies, change windows, migration waves, validation, rollback plans, and post-change monitoring.',
    outcome: 'A staged delivery framework with clearer checkpoints, ownership, and recovery considerations for each phase.',
    takeaway: 'The safest migration is one where teams understand dependencies and know how to recover before the change begins.',
    note: 'Planning case study. Site diagrams, rack layouts, system names, and restricted infrastructure details are excluded.'
  },
  {
    number: '04', category: 'IT OPERATIONS', title: 'Making incident response more consistent',
    summary: 'A repeatable way to investigate network issues, keep useful records, and make handovers easier.',
    tags: ['Monitoring', 'Incident response', 'Documentation'],
    challenge: 'When essential services depend on network connectivity, teams need to locate faults quickly and communicate findings clearly.',
    approach: 'Use a layered checklist across device health, interfaces, routing, reachability, latency, security policies, and service-level checks—then document what changed and what was confirmed.',
    outcome: 'A consistent approach to fault isolation, escalation, and handover that helps the next engineer pick up the story without starting from scratch.',
    takeaway: 'Clear operational notes are part of the fix, not paperwork after the fix.',
    note: 'Illustrative operational case study. Internal logs, customer details, and identifiable service information are not published.'
  },
  {
    number: '05', category: 'SOFTWARE & BUSINESS SYSTEMS', title: 'Simplifying everyday sales and stock work',
    summary: 'A point-of-sale prototype shaped around the practical needs of a small tuckshop and food business.',
    tags: ['POS workflow', 'Stock tracking', 'Product thinking'],
    challenge: 'Small operators need a simple way to record sales and understand stock usage without adding unnecessary complexity to a busy day.',
    approach: 'Translate the daily workflow into clear product and inventory records, straightforward sales actions, and stock rules that reflect how portions and consumables are used.',
    outcome: 'A practical prototype direction for bringing sales and inventory activities into one easier-to-follow workflow.',
    takeaway: 'Useful software starts with understanding the work people already do.',
    note: 'Prototype case study. It does not claim production adoption, financial impact, or live customer deployment.'
  },
  {
    number: '06', category: 'WEB DEVELOPMENT & UX', title: 'Making technical experience easier to understand',
    summary: 'A responsive portfolio experience that presents infrastructure work in clear language for recruiters and hiring teams.',
    tags: ['React', 'Vite', 'Responsive UI', 'UX writing'],
    challenge: 'Technical profiles can be difficult for non-specialist recruiters to scan when they rely too heavily on acronyms and tool lists.',
    approach: 'Structure the experience around a welcoming introduction, plain-language project stories, capability groups, credentials, and clear contact actions.',
    outcome: 'A mobile-friendly portfolio designed to help different audiences quickly understand the candidate’s range and find relevant evidence.',
    takeaway: 'Good interface design connects the information people need with the decision they are trying to make.',
    note: 'Personal portfolio project. Technologies and project descriptions should be kept aligned with work actually completed.'
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

      <section className="projects-section section-pad" id="projects"><div className="section-wrap"><div className="section-heading"><div><span className="section-index">03 / SELECTED WORK</span><h2>Real problems.<br/><em>Practical responses.</em></h2></div><p className="section-intro">Examples across network and infrastructure operations, software workflows, and web experience. Each story starts with the problem and explains the thinking in plain language.</p></div>
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

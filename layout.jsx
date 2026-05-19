// UPCOM — Sidebar
const Sidebar = ({ collapsed, onToggle }) => {
  const nav = [
    { section: "Principal", items: [
      { icon: "Home", label: "Dashboard", active: true },
      { icon: "Users", label: "Clientes", badge: "47" },
      { icon: "Sparkles", label: "Leads", badge: "12" },
      { icon: "Folder", label: "Projetos", badge: "19" },
      { icon: "Check", label: "Tarefas", badge: "87", href: "UPCOM Tarefas.html" },
    ]},
    { section: "Operação", items: [
      { icon: "Megaphone", label: "Campanhas" },
      { icon: "Calendar", label: "Calendário" },
      { icon: "Mail", label: "Mensagens", badge: "5" },
      { icon: "Dollar", label: "Financeiro" },
      { icon: "Chart", label: "Relatórios" },
    ]},
    { section: "Sistema", items: [
      { icon: "Settings", label: "Configurações" },
    ]},
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"></div>
        <div className="brand-text">UP<em>COM</em></div>
      </div>
      <nav className="nav">
        {nav.map((sec, i) => (
          <div className="nav-section" key={i}>
            <div className="nav-section-label">{sec.section}</div>
            {sec.items.map((it, j) => {
              const Ic = window.Icon[it.icon];
              const Tag = it.href ? "a" : "div";
              return (
                <Tag href={it.href} className={"nav-item" + (it.active ? " active" : "")} key={j}
                     style={{ textDecoration: "none" }}>
                  <Ic />
                  <span className="nav-label">{it.label}</span>
                  {it.badge && <span className="nav-badge">{it.badge}</span>}
                </Tag>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="avatar">RM</div>
        <div className="sidebar-footer-text">
          <div className="sidebar-footer-name">Rafael Mendes</div>
          <div className="sidebar-footer-role">Founder · UPCOM</div>
        </div>
      </div>
    </aside>
  );
};

// Topbar
const Topbar = ({ collapsed, setCollapsed }) => (
  <header className="topbar">
    <button className="topbar-toggle" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
      <Icon.Menu />
    </button>
    <div className="search">
      <Icon.Search />
      <input placeholder="Buscar clientes, projetos, leads..." />
      <kbd>⌘K</kbd>
    </div>
    <div className="topbar-spacer"></div>
    <div className="topbar-actions">
      <button className="icon-btn" aria-label="Mensagens"><Icon.Mail /><span className="dot"></span></button>
      <button className="icon-btn" aria-label="Notificações"><Icon.Bell /><span className="dot"></span></button>
      <button className="btn-primary"><Icon.Plus /> Novo lead</button>
    </div>
  </header>
);

// Sparkline
const Sparkline = ({ data, color = "currentColor", w = 56, h = 18 }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg className="kpi-spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// KPI tile
const fmtNum = (v, fmt) => {
  if (fmt === "currency") {
    if (v >= 1000) return (v / 1000).toFixed(1).replace(".", ",") + "k";
    return v.toLocaleString("pt-BR");
  }
  if (fmt === "percent") return v.toFixed(1).replace(".", ",") + "%";
  return v.toLocaleString("pt-BR");
};

const Kpi = ({ k }) => (
  <div className={"kpi" + (k.featured ? " featured" : "")}>
    <div className="kpi-label">{k.label}</div>
    <div className="kpi-value">
      {k.currency && <span className="currency">{k.currency}</span>}
      {fmtNum(k.value, k.format)}
    </div>
    <div className={"kpi-trend " + (k.trend >= 0 ? "up" : "down")}>
      {k.trend >= 0 ? <Icon.ArrowUp /> : <Icon.ArrowDown />}
      {Math.abs(k.trend).toFixed(1).replace(".", ",")}%
      <span className="vs">{k.vs}</span>
    </div>
    <Sparkline data={k.spark} color={k.featured ? "var(--upcom-coral)" : "var(--muted-2)"} />
  </div>
);

window.Sidebar = Sidebar;
window.Topbar = Topbar;
window.Kpi = Kpi;
window.Sparkline = Sparkline;

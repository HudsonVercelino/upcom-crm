// UPCOM Tasks — Sidebar variant (Tarefas active)
const TasksSidebar = () => {
  const nav = [
    { section: "Principal", items: [
      { icon: "Home", label: "Dashboard", href: "UPCOM Dashboard.html" },
      { icon: "Users", label: "Clientes", badge: "47" },
      { icon: "Sparkles", label: "Leads", badge: "12" },
      { icon: "Folder", label: "Projetos", badge: "19" },
      { icon: "Check", label: "Tarefas", badge: "87", active: true },
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
window.TasksSidebar = TasksSidebar;

// UPCOM — Projects table
const phaseTags = {
  discovery: { cls: "tag-discovery", label: "Discovery" },
  design: { cls: "tag-design", label: "Design" },
  dev: { cls: "tag-dev", label: "Desenvolvimento" },
  qa: { cls: "tag-qa", label: "QA" },
  launch: { cls: "tag-launch", label: "Lançamento" },
};

const ProjectsTable = () => {
  const [filter, setFilter] = React.useState("all");
  const all = window.UPCOM_DATA.projects;
  const projects = filter === "all" ? all : all.filter(p => p.phase === filter);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-block">
          <h3 className="card-title">Projetos ativos</h3>
          <div className="card-subtitle">{projects.length} projetos · valor total {(projects.reduce((s,p)=>s+p.value,0)/1000).toFixed(0)}k em entrega</div>
        </div>
        <div className="card-actions" style={{flexWrap:"wrap"}}>
          {[
            ["all","Todos"],["discovery","Discovery"],["design","Design"],["dev","Dev"],["qa","QA"],["launch","Launch"],
          ].map(([k,l]) => (
            <button key={k} className={"tab-pill" + (filter === k ? " active" : "")} onClick={() => setFilter(k)}>{l}</button>
          ))}
          <button className="btn-secondary"><Icon.Filter /> Filtros</button>
          <button className="btn-secondary"><Icon.Download /></button>
        </div>
      </div>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th style={{paddingLeft:18, width:"24%"}}>Cliente / Projeto</th>
              <th>Fase</th>
              <th>Responsável</th>
              <th>Equipe</th>
              <th style={{width:"18%"}}>Progresso</th>
              <th>Prazo</th>
              <th>Valor</th>
              <th>Saúde</th>
              <th style={{paddingRight:18}}></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => {
              const phase = phaseTags[p.phase];
              const fillCls = p.progress >= 95 ? "done" : p.deadlineState === "late" ? "late" : "";
              return (
                <tr key={i}>
                  <td style={{paddingLeft:18}}>
                    <div className="client-cell">
                      <div className="client-logo" style={{background: p.logoColor}}>{p.initials}</div>
                      <div className="client-info">
                        <div className="client-name">{p.name}</div>
                        <div className="client-sub">{p.domain}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={"tag-pill " + phase.cls}><span className="dot"></span>{phase.label}</span></td>
                  <td>{p.lead}</td>
                  <td>
                    <div className="team-stack">
                      {p.team.map((t, k) => (
                        <div className="avatar" key={k} style={{background: `oklch(${55 + k*6}% 0.14 ${20 + k*40})`}}>{t}</div>
                      ))}
                      {p.extra > 0 && <div className="more">+{p.extra}</div>}
                    </div>
                  </td>
                  <td>
                    <div className="progress">
                      <div className="progress-bar"><div className={"progress-fill " + fillCls} style={{width: p.progress + "%"}}></div></div>
                      <span className="progress-num">{p.progress}%</span>
                    </div>
                  </td>
                  <td><span className={"deadline-cell " + (p.deadlineState || "")}>{p.deadline}</span></td>
                  <td style={{fontFamily:"var(--font-mono)", fontSize:12}}>R$ {(p.value/1000).toFixed(1).replace(".",",")}k</td>
                  <td>
                    <span className={"health " + (p.health === "ok" ? "" : p.health)}>
                      <span className="pulse"></span>
                      {p.health === "ok" ? "No prazo" : p.health === "warn" ? "Atenção" : "Atrasado"}
                    </span>
                  </td>
                  <td style={{paddingRight:18}}>
                    <button className="row-action"><Icon.More /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="card-footer">
        <span>Mostrando {projects.length} de {all.length} projetos</span>
        <a href="#">Abrir gestão de projetos <Icon.ChevronRight /></a>
      </div>
    </div>
  );
};

window.ProjectsTable = ProjectsTable;

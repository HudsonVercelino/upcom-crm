// UPCOM Tasks — main app
const TASKS_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#E85D44",
  "theme": "light",
  "showWipLimits": true,
  "compactCards": false
}/*EDITMODE-END*/;

const TasksApp = () => {
  const D = window.UPCOM_TASKS;
  const [tweaks, setTweak] = window.useTweaks(TASKS_TWEAK_DEFAULTS);
  const [collapsed, setCollapsed] = React.useState(false);
  const [tasks, setTasks] = React.useState(D.TASKS);
  const [view, setView] = React.useState("kanban");
  const [openTask, setOpenTask] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [filterAssignees, setFilterAssignees] = React.useState([]);
  const [filterPriority, setFilterPriority] = React.useState(null);
  const [filterProject, setFilterProject] = React.useState(null);
  const [draggingId, setDraggingId] = React.useState(null);
  const [dragOverCol, setDragOverCol] = React.useState(null);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--upcom-coral", tweaks.primaryColor);
    document.documentElement.setAttribute("data-theme", tweaks.theme);
  }, [tweaks.primaryColor, tweaks.theme]);

  // filter
  const filtered = tasks.filter(t => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterAssignees.length > 0 && !t.assignees.some(a => filterAssignees.includes(a))) return false;
    if (filterPriority && t.priority !== filterPriority) return false;
    if (filterProject && t.project !== filterProject) return false;
    return true;
  });

  const tasksByCol = (colId) => filtered.filter(t => t.col === colId);

  // Drag & drop
  const onDragStart = (task, e) => {
    setDraggingId(task.id);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragEnd = () => {
    setDraggingId(null);
    setDragOverCol(null);
  };
  const onDrop = (colId) => {
    if (draggingId) {
      setTasks(tasks.map(t => t.id === draggingId ? { ...t, col: colId } : t));
    }
    setDraggingId(null);
    setDragOverCol(null);
  };

  // Sprint progress
  const allTasks = tasks;
  const totalForProgress = allTasks.filter(t => t.col !== "backlog").length;
  const doneCount = allTasks.filter(t => t.col === "done").length;
  const reviewCount = allTasks.filter(t => t.col === "review" || t.col === "client").length;
  const doingCount = allTasks.filter(t => t.col === "doing").length;
  const overdueCount = allTasks.filter(t => {
    if (t.col === "done" || !t.due) return false;
    return window.dueState(t.due).state === "overdue";
  }).length;

  const toggleAssignee = (id) =>
    setFilterAssignees(filterAssignees.includes(id)
      ? filterAssignees.filter(a => a !== id)
      : [...filterAssignees, id]);

  return (
    <>
      <div className={"app" + (collapsed ? " collapsed" : "")}>
        <TasksSidebar />
        <div className="main">
          <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          <div className="content">
            <div className="page-header">
              <div className="page-title-block">
                <h1 className="page-title">Tarefas</h1>
                <div className="page-subtitle">
                  Sprint <strong>#21</strong> · 28 abr — 11 mai · <strong>{filtered.length}</strong> tarefas
                  {overdueCount > 0 && <> · <strong style={{color:"var(--danger)"}}>{overdueCount} atrasadas</strong></>}
                </div>
              </div>
              <div className="filters">
                <div className="view-switch">
                  <button className={view==="kanban"?"active":""} onClick={()=>setView("kanban")}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="6" height="16" rx="1"/><rect x="11" y="4" width="6" height="10" rx="1"/><rect x="19" y="4" width="2" height="6" rx="1"/></svg>
                    Kanban
                  </button>
                  <button className={view==="list"?"active":""} onClick={()=>setView("list")}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                    Lista
                  </button>
                  <button className={view==="cal"?"active":""} onClick={()=>setView("cal")}>
                    <Icon.Calendar />
                    Calendário
                  </button>
                </div>
                <button className="btn-secondary"><Icon.Download /> Exportar</button>
                <button className="btn-primary"><Icon.Plus /> Nova tarefa</button>
              </div>
            </div>

            <div className="sprint-bar">
              <div className="sprint-info">
                <div className="sprint-name">
                  Sprint 21 — Foco: Anima Pet & Nova Skin
                  <span className="pill">11 dias restantes</span>
                </div>
                <div className="sprint-meta">Iniciado em 28 abr · término previsto 11 mai · 6 pessoas</div>
              </div>
              <div className="sprint-progress">
                <div className="sprint-progress-track">
                  <div className="seg-done" style={{width: (doneCount/totalForProgress*100) + "%"}}></div>
                  <div className="seg-review" style={{width: (reviewCount/totalForProgress*100) + "%"}}></div>
                  <div className="seg-doing" style={{width: (doingCount/totalForProgress*100) + "%"}}></div>
                </div>
                <div className="sprint-progress-numbers">
                  <span><strong>{doneCount}</strong> concluídas</span>
                  <span><strong>{reviewCount}</strong> revisão</span>
                  <span><strong>{doingCount}</strong> ativas</span>
                  <span>de <strong>{totalForProgress}</strong></span>
                </div>
              </div>
              <div className="sprint-team">
                <div className="sprint-team-label">Time ativo</div>
                <div style={{display:"flex"}}>
                  {D.TEAM.map(m => (
                    <div key={m.id} className="av-mini"
                      style={{ background: m.color, width: 30, height: 30, fontSize: 11, borderRadius: "50%", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, border: "2px solid var(--surface)", marginLeft: -7, fontFamily: "var(--font-display)" }}
                      title={m.name}>{m.initials}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="tasks-toolbar">
              <div className="search" style={{maxWidth:280}}>
                <Icon.Search />
                <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar tarefas..." />
              </div>
              <div className="assignee-filters">
                {D.TEAM.map(m => (
                  <button key={m.id}
                    className={"assignee-chip" + (filterAssignees.includes(m.id) ? " active" : "")}
                    onClick={()=>toggleAssignee(m.id)}
                    title={m.name}>
                    <span className="av" style={{background: m.color, opacity: filterAssignees.length === 0 || filterAssignees.includes(m.id) ? 1 : 0.4}}>{m.initials}</span>
                  </button>
                ))}
              </div>
              <button className={"filter-chip" + (filterPriority==="high" ? " active" : "")} onClick={()=>setFilterPriority(filterPriority==="high"?null:"high")}>
                <span className="col-dot" style={{background:"var(--danger)"}}></span>
                Alta prioridade
              </button>
              <select className="filter-chip" style={{appearance:"none", paddingRight: 24}}
                value={filterProject || ""}
                onChange={(e)=>setFilterProject(e.target.value || null)}>
                <option value="">Todos os projetos</option>
                {D.PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <button className="filter-chip"><Icon.Filter /> Mais filtros</button>
              {(filterAssignees.length > 0 || filterPriority || filterProject || search) && (
                <button className="filter-chip"
                  onClick={()=>{setFilterAssignees([]); setFilterPriority(null); setFilterProject(null); setSearch("");}}
                  style={{color:"var(--upcom-coral)"}}>
                  Limpar filtros
                </button>
              )}
              <div className="spacer"></div>
              <span style={{fontSize:11, color:"var(--muted)"}}>{filtered.length} de {tasks.length} tarefas</span>
            </div>

            {view === "kanban" && (
              <div className="board-wrap">
                <div className="board">
                  {D.COLUMNS.map(col => (
                    <Column
                      key={col.id}
                      col={col}
                      tasks={tasksByCol(col.id)}
                      onOpen={setOpenTask}
                      onDragStart={onDragStart}
                      onDragEnd={onDragEnd}
                      draggingId={draggingId}
                      onDrop={onDrop}
                      dragOver={dragOverCol === col.id}
                      onDragEnter={(id)=>setDragOverCol(id)}
                      onDragLeave={()=>{}}
                    />
                  ))}
                </div>
              </div>
            )}

            {view === "list" && (
              <div className="card">
                <div className="table-wrap">
                  <table className="data">
                    <thead>
                      <tr>
                        <th style={{paddingLeft:18, width:60}}>ID</th>
                        <th>Tarefa</th>
                        <th>Projeto</th>
                        <th>Status</th>
                        <th>Prioridade</th>
                        <th>Resp.</th>
                        <th>Prazo</th>
                        <th style={{paddingRight:18}}>Check.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(t => {
                        const p = t.project ? D.PROJECTS.find(x=>x.id===t.project) : null;
                        const due = window.dueState(t.due);
                        const col = D.COLUMNS.find(c=>c.id===t.col);
                        return (
                          <tr key={t.id} onClick={()=>setOpenTask(t)}>
                            <td style={{paddingLeft:18, fontFamily:"var(--font-mono)", fontSize:11, color:"var(--muted)"}}>{t.id}</td>
                            <td style={{fontWeight:600, color:"var(--ink)"}}>{t.title}</td>
                            <td>{p ? <span style={{display:"inline-flex",alignItems:"center",gap:6}}><span style={{width:8,height:8,borderRadius:2,background:p.color}}></span>{p.name}</span> : <span style={{color:"var(--muted)"}}>—</span>}</td>
                            <td><span style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:12}}><span className={"col-dot " + t.col}></span>{col.name}</span></td>
                            <td><span className={"task-priority priority-"+t.priority}>{ {high:"Alta",med:"Média",low:"Baixa"}[t.priority] }</span></td>
                            <td><div className="team-stack">{t.assignees.map(a=><Avatar key={a} id={a} size={24} />)}</div></td>
                            <td><span className={"deadline-cell " + (due.state==="overdue"?"late":due.state==="due-today"?"soon":"")}>{due.label}</span></td>
                            <td style={{paddingRight:18, fontFamily:"var(--font-mono)", fontSize:11}}>{t.checklist[0]}/{t.checklist[1]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {view === "cal" && (
              <div className="card" style={{padding:60, textAlign:"center"}}>
                <Icon.Calendar style={{width:40,height:40,color:"var(--muted-2)"}} />
                <h3 style={{marginTop:12, fontFamily:"var(--font-display)"}}>Visão de calendário</h3>
                <p style={{color:"var(--muted)", fontSize:13}}>Em breve — em desenvolvimento</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {openTask && <TaskModal task={openTask} onClose={()=>setOpenTask(null)} />}

      <TweaksPanel title="Tweaks">
        <TweakSection title="Marca">
          <TweakColor label="Cor primária" value={tweaks.primaryColor} onChange={v => setTweak("primaryColor", v)} />
        </TweakSection>
        <TweakSection title="Aparência">
          <TweakRadio label="Tema" value={tweaks.theme} onChange={v => setTweak("theme", v)}
            options={[{value:"light",label:"Claro"},{value:"dark",label:"Escuro"}]} />
        </TweakSection>
        <TweakSection title="Cores rápidas">
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[["#E85D44","Coral"],["#0E0E0E","Preto"],["#2C6BB8","Azul"],["#2F8F5F","Verde"],["#9333EA","Roxo"],["#C77A1B","Âmbar"]].map(([c,n]) => (
              <button key={c} onClick={()=>setTweak("primaryColor",c)} title={n}
                style={{width:32,height:32,borderRadius:8,background:c,
                  border: tweaks.primaryColor===c ? "2px solid var(--ink)" : "1px solid var(--border)",
                  cursor:"pointer", padding:0}} />
            ))}
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<TasksApp />);

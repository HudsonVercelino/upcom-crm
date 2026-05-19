// UPCOM Tasks — Modal de detalhes
const TaskModal = ({ task, onClose, onUpdate }) => {
  if (!task) return null;
  const D = window.UPCOM_TASKS;
  const project = task.project ? D.PROJECTS.find(p => p.id === task.project) : null;
  const due = window.dueState(task.due);
  const priLabel = { high: "Alta", med: "Média", low: "Baixa" }[task.priority];

  // mock checklist items
  const total = task.checklist[1];
  const done = task.checklist[0];
  const checklistItems = Array.from({ length: total }, (_, i) => ({
    text: [
      "Levantar requisitos com o cliente",
      "Mapear referências e benchmarks",
      "Esboçar primeira proposta",
      "Validar com líder técnico",
      "Refinar com base no feedback",
      "Apresentar para aprovação",
      "Implementar versão final",
      "Documentar entrega",
      "Publicar e comunicar",
    ][i] || `Subtarefa ${i + 1}`,
    done: i < done,
  }));

  const comments = [
    { who: "ml", at: "há 2h", text: "Subi a primeira versão pra homologação. Falta ajustar o estado de erro do form." },
    { who: "jt", at: "há 1h", text: "Vi aqui — manda ver. Vou revisar o spacing dos cards no mobile também." },
    { who: "rm", at: "há 22 min", text: "Show. Lembrando: a apresentação pro cliente é quinta de manhã, então precisamos fechar até quarta à noite." },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-block">
            <div className="modal-id-row">
              <span style={{ fontFamily: "var(--font-mono)" }}>{task.id}</span>
              <span>·</span>
              {project && (
                <>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: project.color, display: "inline-block" }}></span>
                    {project.name}
                  </span>
                  <span>·</span>
                </>
              )}
              <span className={"task-priority priority-" + task.priority}>{priLabel}</span>
            </div>
            <h2 className="modal-title">{task.title}</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Fechar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M6 18 18 6"/></svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-main">
            <div>
              <h4 className="modal-section-title">Descrição</h4>
              <p className="modal-desc">
                Implementação dos componentes de checkout com variações A/B para teste de conversão.
                Inclui o fluxo de finalização, integração com Stripe (cartão + Pix) e validação de cupom.
                A versão B explora um layout em uma coluna com pagamento em destaque.
              </p>
            </div>

            <div>
              <h4 className="modal-section-title">Checklist · {done}/{total}</h4>
              <div className="checklist-progress"><div style={{ width: (done / Math.max(total,1)) * 100 + "%" }}></div></div>
              {checklistItems.map((item, i) => (
                <label className={"checklist-item" + (item.done ? " done" : "")} key={i}>
                  <input type="checkbox" defaultChecked={item.done} onClick={(e) => e.stopPropagation()} />
                  {item.text}
                </label>
              ))}
            </div>

            <div>
              <h4 className="modal-section-title">Comentários · {comments.length}</h4>
              {comments.map((c, i) => {
                const m = D.TEAM.find(t => t.id === c.who);
                return (
                  <div className="comment" key={i}>
                    <div className="av-mini" style={{ background: m.color, width: 26, height: 26, fontSize: 10, borderRadius: "50%", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}>{m.initials}</div>
                    <div className="comment-body">
                      <div className="comment-meta"><strong>{m.name}</strong> · {c.at}</div>
                      <div>{c.text}</div>
                    </div>
                  </div>
                );
              })}
              <div className="comment-input">
                <div className="av-mini" style={{ background: "#E85D44", width: 26, height: 26, fontSize: 10, borderRadius: "50%", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}>RM</div>
                <textarea placeholder="Escrever um comentário..." />
              </div>
            </div>
          </div>

          <div className="modal-sidebar">
            <div>
              <div className="modal-side-label">Status</div>
              <div className="modal-side-value">
                <span className={"col-dot " + task.col} style={{ width: 8, height: 8, borderRadius: "50%" }}></span>
                {D.COLUMNS.find(c => c.id === task.col).name}
              </div>
            </div>
            <div>
              <div className="modal-side-label">Responsáveis</div>
              <div className="modal-side-value" style={{ flexWrap: "wrap" }}>
                {task.assignees.map(a => {
                  const m = D.TEAM.find(t => t.id === a);
                  return (
                    <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <span className="av-mini" style={{ background: m.color, width: 20, height: 20, fontSize: 9, borderRadius: "50%", display: "inline-grid", placeItems: "center", color: "#fff", fontWeight: 700 }}>{m.initials}</span>
                      {m.name.split(" ")[0]}
                    </span>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="modal-side-label">Prazo</div>
              <div className="modal-side-value">
                <Icon.Calendar style={{ width: 13, height: 13 }} />
                <span className={due.state === "overdue" ? "task-meta-item overdue" : ""}>{due.label}</span>
              </div>
            </div>
            <div>
              <div className="modal-side-label">Prioridade</div>
              <div className="modal-side-value">
                <span className={"task-priority priority-" + task.priority}>{priLabel}</span>
              </div>
            </div>
            <div>
              <div className="modal-side-label">Estimativa</div>
              <div className="modal-side-value">
                <span style={{ fontFamily: "var(--font-mono)" }}>{task.est ? task.est + "h" : "—"}</span>
              </div>
            </div>
            <div>
              <div className="modal-side-label">Labels</div>
              <div className="modal-side-value" style={{ flexWrap: "wrap", gap: 4 }}>
                {task.labels.map((l, i) => <span key={i} className="task-label">{l}</span>)}
              </div>
            </div>
            <div>
              <div className="modal-side-label">Anexos</div>
              <div className="modal-side-value">{task.attachments} arquivo{task.attachments === 1 ? "" : "s"}</div>
            </div>
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
              <button className="btn-primary" style={{ justifyContent: "center" }}>Marcar como concluída</button>
              <button className="btn-secondary" style={{ justifyContent: "center" }}>Duplicar tarefa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.TaskModal = TaskModal;

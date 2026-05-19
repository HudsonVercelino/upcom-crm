// UPCOM Tasks — Kanban components
const D = window.UPCOM_TASKS;

const dueState = (dueStr) => {
  if (!dueStr) return { label: "—", state: "" };
  const today = D.TODAY;
  const due = new Date(dueStr);
  const days = Math.floor((due - today) / 86400000);
  const fmt = due.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");
  if (days < 0) return { label: `${fmt} · ${Math.abs(days)}d atraso`, state: "overdue" };
  if (days === 0) return { label: "Hoje", state: "due-today" };
  if (days === 1) return { label: "Amanhã", state: "due-today" };
  if (days <= 3) return { label: fmt, state: "due-today" };
  return { label: fmt, state: "" };
};

const Avatar = ({ id, size = 22 }) => {
  const m = D.TEAM.find(t => t.id === id);
  if (!m) return null;
  return (
    <div className="av-mini" style={{ background: m.color, width: size, height: size, fontSize: size * 0.4 }} title={m.name}>{m.initials}</div>
  );
};

const TaskCard = ({ task, onOpen, onDragStart, onDragEnd, dragging }) => {
  const project = task.project ? D.PROJECTS.find(p => p.id === task.project) : null;
  const due = dueState(task.due);
  const isOverdue = due.state === "overdue" && task.col !== "done";
  const checklistDone = task.checklist[0] === task.checklist[1] && task.checklist[1] > 0;

  let className = "task-card priority-" + task.priority;
  if (isOverdue) className += " overdue";
  if (task.blocked) className += " blocked";
  if (task.col === "done") className += " done";
  if (dragging) className += " dragging";

  const priLabel = { high: "Alta", med: "Média", low: "Baixa" }[task.priority];

  return (
    <div
      className={className}
      draggable
      onDragStart={(e) => onDragStart(task, e)}
      onDragEnd={onDragEnd}
      onClick={() => onOpen(task)}
    >
      {task.blocked && <span className="task-flag blocked">Bloqueado</span>}
      {task.col === "client" && task.waitingSince && <span className="task-flag waiting">{task.waitingSince}d esperando</span>}

      <div className="task-top">
        <span className="task-id">{task.id}</span>
        <span className={"task-priority priority-" + task.priority}>{priLabel}</span>
      </div>

      <div className="task-title">{task.title}</div>

      {task.labels.length > 0 && (
        <div className="task-labels">
          {task.labels.map((l, i) => <span key={i} className="task-label">{l}</span>)}
        </div>
      )}

      {project && (
        <div className="task-project">
          <span className="pdot" style={{ background: project.color }}></span>
          {project.name}
        </div>
      )}

      {task.progress != null && (
        <div className="task-progress"><div style={{ width: task.progress + "%" }}></div></div>
      )}

      <div className="task-meta">
        <div className="task-meta-left">
          <span className={"task-meta-item " + (checklistDone ? "checklist-done" : "")}>
            <Icon.Check style={{width:12,height:12}} /> {task.checklist[0]}/{task.checklist[1]}
          </span>
          {task.comments > 0 && (
            <span className="task-meta-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/></svg>
              {task.comments}
            </span>
          )}
          {task.attachments > 0 && (
            <span className="task-meta-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21 11-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8"/></svg>
              {task.attachments}
            </span>
          )}
          {task.due && (
            <span className={"task-meta-item " + due.state}>
              <Icon.Calendar style={{width:12,height:12}} /> {due.label}
            </span>
          )}
        </div>
        <div className="task-assignees">
          {task.assignees.map(a => <Avatar key={a} id={a} />)}
        </div>
      </div>
    </div>
  );
};

const Column = ({ col, tasks, onOpen, onDragStart, onDragEnd, draggingId, onDrop, dragOver, onDragEnter, onDragLeave }) => {
  const wipOver = col.wip && tasks.length > col.wip;
  return (
    <div
      className={"column" + (dragOver ? " drag-over" : "")}
      onDragOver={(e) => { e.preventDefault(); }}
      onDragEnter={() => onDragEnter(col.id)}
      onDragLeave={onDragLeave}
      onDrop={() => onDrop(col.id)}
    >
      <div className="col-header">
        <div className="col-title">
          <span className={"col-dot " + col.id}></span>
          {col.name}
          <span className="col-count">{tasks.length}</span>
          {col.wip && <span className={"col-wip" + (wipOver ? " over" : "")}>WIP {tasks.length}/{col.wip}</span>}
        </div>
        <div className="col-actions">
          <button className="icon-btn" title="Adicionar"><Icon.Plus /></button>
          <button className="icon-btn"><Icon.More /></button>
        </div>
      </div>
      <div className="col-body">
        {tasks.map(t => (
          <TaskCard key={t.id} task={t} onOpen={onOpen}
            onDragStart={onDragStart} onDragEnd={onDragEnd}
            dragging={draggingId === t.id} />
        ))}
        <button className="col-add"><Icon.Plus /> Adicionar tarefa</button>
      </div>
    </div>
  );
};

window.TaskCard = TaskCard;
window.Column = Column;
window.Avatar = Avatar;
window.dueState = dueState;

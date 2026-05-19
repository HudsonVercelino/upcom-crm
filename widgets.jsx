// UPCOM — Revenue chart, Funnel, Activity
const RevenueChart = () => {
  const d = window.UPCOM_DATA.revenue;
  const w = 560, h = 220, pad = { l: 36, r: 12, t: 12, b: 24 };
  const cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;
  const max = 480;
  const x = (i) => pad.l + (i / (d.months.length - 1)) * cw;
  const y = (v) => pad.t + ch - (v / max) * ch;
  const actualPath = d.actuals.map((v, i) => v != null ? `${i === 0 ? "M" : "L"}${x(i)},${y(v)}` : "").join(" ");
  const targetPath = d.targets.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
  const areaPath = actualPath + ` L${x(d.actuals.findLastIndex(v=>v!=null))},${y(0)} L${x(0)},${y(0)} Z`;
  const yTicks = [0, 120, 240, 360, 480];

  return (
    <div className="card" style={{ minHeight: 0 }}>
      <div className="card-header">
        <div className="card-title-block">
          <h3 className="card-title">Receita & Pipeline</h3>
          <div className="card-subtitle">Últimos 12 meses · valores em R$ mil</div>
        </div>
        <div className="card-actions">
          <button className="tab-pill">12m</button>
          <button className="tab-pill active">YTD</button>
          <button className="tab-pill">90d</button>
          <button className="icon-btn"><Icon.Download /></button>
        </div>
      </div>
      <div className="card-body">
        <div className="revenue-stats">
          <div>
            <div className="revenue-stat-label">Faturado YTD</div>
            <div className="revenue-stat-value"><span style={{fontSize:14,color:"var(--muted)",fontWeight:500,marginRight:2}}>R$</span>2.96M</div>
            <div className="revenue-stat-meta"><span className="pos">↑ 28,4%</span> vs. 2025</div>
          </div>
          <div>
            <div className="revenue-stat-label">Meta anual</div>
            <div className="revenue-stat-value"><span style={{fontSize:14,color:"var(--muted)",fontWeight:500,marginRight:2}}>R$</span>4.80M</div>
            <div className="revenue-stat-meta">61,6% atingido · 5 meses</div>
          </div>
          <div>
            <div className="revenue-stat-label">Pipeline aberto</div>
            <div className="revenue-stat-value"><span style={{fontSize:14,color:"var(--muted)",fontWeight:500,marginRight:2}}>R$</span>287k</div>
            <div className="revenue-stat-meta">24 oportunidades · prob. 64%</div>
          </div>
        </div>

        <div className="chart-legend">
          <span><span className="dot" style={{background:"var(--upcom-coral)"}}></span>Faturado</span>
          <span><span className="dot" style={{background:"var(--ink)",opacity:0.35}}></span>Meta</span>
          <span><span className="dot" style={{background:"var(--upcom-coral-light)"}}></span>Projetado</span>
        </div>

        <div className="chart-wrap">
          <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="revGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--upcom-coral)" stopOpacity="0.22"/>
                <stop offset="100%" stopColor="var(--upcom-coral)" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {yTicks.map((t, i) => (
              <g key={i}>
                <line x1={pad.l} x2={w - pad.r} y1={y(t)} y2={y(t)} stroke="var(--border)" strokeDasharray="2 3"/>
                <text x={pad.l - 6} y={y(t) + 3} textAnchor="end" fill="var(--muted)" fontSize="9.5" fontFamily="var(--font-mono)">{t}</text>
              </g>
            ))}
            {d.months.map((m, i) => (
              <text key={i} x={x(i)} y={h - 6} textAnchor="middle" fill="var(--muted)" fontSize="9.5">{m}</text>
            ))}
            <path d={areaPath} fill="url(#revGrad)"/>
            <path d={targetPath} fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4"/>
            <path d={actualPath} fill="none" stroke="var(--upcom-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            {d.actuals.map((v, i) => v != null && (
              <circle key={i} cx={x(i)} cy={y(v)} r={i === d.actuals.findLastIndex(v=>v!=null) ? 4 : 2.5} fill="var(--upcom-coral)" stroke="var(--surface)" strokeWidth="1.5"/>
            ))}
          </svg>
        </div>
      </div>
      <div className="card-footer">
        <span>Atualizado há 4 minutos</span>
        <a href="#">Ver relatório completo <Icon.ChevronRight /></a>
      </div>
    </div>
  );
};

const Funnel = () => {
  const f = window.UPCOM_DATA.funnel;
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-block">
          <h3 className="card-title">Funil de vendas</h3>
          <div className="card-subtitle">Abril 2026 · 128 leads no topo</div>
        </div>
        <button className="icon-btn"><Icon.More /></button>
      </div>
      <div className="card-body">
        <div className="funnel">
          {f.map((s, i) => (
            <div className="funnel-row" key={i}>
              <div className="funnel-bar" style={{
                width: `${s.pct}%`,
                background: `oklch(${64 - i * 4}% ${0.18 - i * 0.012} 32)`,
              }}>
                <div className="funnel-stage">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  {s.stage}
                </div>
                <div className="funnel-count">{s.count}</div>
              </div>
              <div className="funnel-meta" style={{ width: `${s.pct}%` }}>
                <span>{s.pct}% do topo</span>
                {s.conv != null && <span className="conv">→ {s.conv.toFixed(1).replace(".",",")}% conv.</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card-footer">
        <span>Conv. total: <strong style={{color:"var(--success)"}}>10,9%</strong></span>
        <a href="#">Abrir pipeline <Icon.ChevronRight /></a>
      </div>
    </div>
  );
};

const Activity = () => {
  const a = window.UPCOM_DATA.activity;
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-block">
          <h3 className="card-title">Atividade da equipe</h3>
          <div className="card-subtitle">Últimas 24h · 9 eventos</div>
        </div>
        <div className="card-actions">
          <button className="tab-pill active">Todos</button>
          <button className="tab-pill">Vendas</button>
          <button className="tab-pill">Entregas</button>
        </div>
      </div>
      <div className="card-body">
        <div className="activity">
          {a.map((it, i) => (
            <div className="activity-item" key={i}>
              <div className="activity-avatar">{it.initials}</div>
              <div className="activity-body">
                <div className="activity-text">
                  <strong>{it.who}</strong> {it.action} <strong>{it.target}</strong>
                </div>
                <div className="activity-meta">
                  <span className="tag" style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    padding: "0 5px",
                    borderRadius: 3,
                  }}>{it.tag}</span>
                  <span className="dot"></span>
                  <span>{it.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card-footer">
        <span>9 de 24 eventos hoje</span>
        <a href="#">Ver tudo <Icon.ChevronRight /></a>
      </div>
    </div>
  );
};

window.RevenueChart = RevenueChart;
window.Funnel = Funnel;
window.Activity = Activity;

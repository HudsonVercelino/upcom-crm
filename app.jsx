// UPCOM Dashboard — main app
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#E85D44",
  "theme": "light",
  "density": "compact",
  "showFunnel": true
}/*EDITMODE-END*/;

const App = () => {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [collapsed, setCollapsed] = React.useState(false);
  const [period, setPeriod] = React.useState("30d");

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--upcom-coral", tweaks.primaryColor);
    // derive dark/light variants
    root.setAttribute("data-theme", tweaks.theme);
  }, [tweaks.primaryColor, tweaks.theme]);

  const kpis = window.UPCOM_DATA.kpis;

  return (
    <>
      <div className={"app" + (collapsed ? " collapsed" : "")}>
        <Sidebar collapsed={collapsed} />
        <div className="main">
          <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          <div className="content">
            <div className="page-header">
              <div className="page-title-block">
                <h1 className="page-title">Bom dia, Rafael 👋</h1>
                <div className="page-subtitle">
                  Você tem <strong>12 tarefas</strong> vencendo hoje e <strong>3 propostas</strong> aguardando resposta.
                </div>
              </div>
              <div className="filters">
                <div className="segmented">
                  {[["7d","7 dias"],["30d","30 dias"],["90d","Trimestre"],["ytd","YTD"]].map(([k,l]) => (
                    <button key={k} className={period===k?"active":""} onClick={()=>setPeriod(k)}>{l}</button>
                  ))}
                </div>
                <button className="btn-secondary"><Icon.Calendar /> 1–30 abr 2026</button>
                <button className="btn-secondary"><Icon.Download /> Exportar</button>
              </div>
            </div>

            <div className="kpi-row">
              {kpis.map(k => <Kpi key={k.id} k={k} />)}
            </div>

            <div className="grid-3">
              <RevenueChart />
              <Funnel />
              <Activity />
            </div>

            <ProjectsTable />
          </div>
        </div>
      </div>

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
            {[
              ["#E85D44","Coral UPCOM"],
              ["#0E0E0E","Preto"],
              ["#2C6BB8","Azul"],
              ["#2F8F5F","Verde"],
              ["#9333EA","Roxo"],
              ["#C77A1B","Âmbar"],
            ].map(([c,n]) => (
              <button key={c} onClick={()=>setTweak("primaryColor",c)}
                title={n}
                style={{
                  width:32,height:32,borderRadius:8,background:c,
                  border: tweaks.primaryColor===c ? "2px solid var(--ink)" : "1px solid var(--border)",
                  cursor:"pointer", padding:0,
                }} />
            ))}
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

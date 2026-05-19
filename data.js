// UPCOM Digital — Sample CRM data
window.UPCOM_DATA = {
  user: { name: "Rafael Mendes", role: "Founder & Head of Design", initials: "RM" },

  kpis: [
    { id: "mrr", label: "MRR", value: 184320, currency: "R$", format: "currency", trend: 12.4, vs: "vs. mês anterior", spark: [40,42,38,45,48,52,55,58,62,68,70,75] },
    { id: "billing", label: "Faturamento do mês", value: 412900, currency: "R$", format: "currency", trend: 18.2, vs: "vs. abr/2025", spark: [30,35,33,42,48,55,52,60,65,70,78,82] },
    { id: "clients", label: "Clientes ativos", value: 47, format: "int", trend: 8.7, vs: "+4 este mês", spark: [38,39,40,41,42,42,43,44,45,46,47,47] },
    { id: "leads", label: "Novos leads", value: 128, format: "int", trend: 22.1, vs: "vs. mês anterior", spark: [60,72,80,75,90,95,100,108,112,118,124,128], featured: true },
    { id: "conversion", label: "Taxa de conversão", value: 24.6, format: "percent", trend: 3.2, vs: "média 90 dias", spark: [18,19,20,22,21,23,22,24,23,25,24,24] },
    { id: "projects", label: "Projetos ativos", value: 19, format: "int", trend: -2.1, vs: "3 entregas em maio", spark: [22,21,21,20,20,19,19,20,19,19,19,19] },
    { id: "tasks", label: "Tarefas pendentes", value: 87, format: "int", trend: -14.5, vs: "12 vencendo hoje", spark: [110,108,102,98,95,92,90,89,88,87,87,87] },
  ],

  revenue: {
    target: 450000,
    actual: 412900,
    pipeline: 287400,
    months: ["Jun","Jul","Ago","Set","Out","Nov","Dez","Jan","Fev","Mar","Abr","Mai"],
    actuals: [186,210,232,268,294,312,342,358,376,395,412,null],
    targets: [200,210,225,250,280,300,320,340,360,385,400,420],
  },

  funnel: [
    { stage: "Leads recebidos", count: 128, pct: 100, conv: null },
    { stage: "Qualificados (MQL)", count: 84, pct: 65, conv: 65.6 },
    { stage: "Reunião agendada", count: 52, pct: 41, conv: 61.9 },
    { stage: "Proposta enviada", count: 38, pct: 30, conv: 73.1 },
    { stage: "Em negociação", count: 24, pct: 19, conv: 63.2 },
    { stage: "Fechados (won)", count: 14, pct: 11, conv: 58.3 },
  ],

  activity: [
    { who: "Júlia Tavares", initials: "JT", action: "fechou o projeto", target: "Nova Skin — Site Institucional", tag: "PRJ-204", time: "há 8 min", type: "win" },
    { who: "Marcos Lima", initials: "ML", action: "subiu deploy de homologação para", target: "Anima Pet — App Tutor", tag: "PRJ-198", time: "há 24 min", type: "deploy" },
    { who: "Carolina Reis", initials: "CR", action: "comentou em", target: "Ferreira Advogados — Brand Guide", tag: "PRJ-191", time: "há 1h", type: "comment" },
    { who: "Pedro Salles", initials: "PS", action: "agendou reunião com", target: "Volpe Construtora", tag: "LD-3142", time: "há 1h", type: "meeting" },
    { who: "Tainá Souza", initials: "TS", action: "moveu lead para", target: "Em negociação · Cliché Café", tag: "LD-3098", time: "há 2h", type: "move" },
    { who: "Rafael Mendes", initials: "RM", action: "aprovou orçamento de", target: "R$ 38.400 · Studio Mira", tag: "PROP-072", time: "há 3h", type: "approve" },
    { who: "Júlia Tavares", initials: "JT", action: "atribuiu 4 tarefas a", target: "time de design", tag: "SPRINT-21", time: "há 4h", type: "assign" },
    { who: "Marcos Lima", initials: "ML", action: "enviou fatura para", target: "Olivetti Imóveis", tag: "FAT-0541", time: "há 5h", type: "invoice" },
    { who: "Carolina Reis", initials: "CR", action: "criou novo lead", target: "Bistrô Aurora", tag: "LD-3203", time: "ontem · 18:22", type: "create" },
  ],

  projects: [
    { name: "Nova Skin", domain: "novaskin.com.br", logoColor: "#1F1F1F", initials: "NS", phase: "launch", lead: "Júlia T.", team: ["JT","ML","CR"], extra: 0, deadline: "02 mai", deadlineState: "soon", progress: 96, health: "ok", value: 84500 },
    { name: "Anima Pet", domain: "animapet.com.br", logoColor: "#3A86FF", initials: "AP", phase: "qa", lead: "Marcos L.", team: ["ML","TS","PS"], extra: 1, deadline: "08 mai", deadlineState: "", progress: 78, health: "ok", value: 62000 },
    { name: "Ferreira Advogados", domain: "ferreiraadv.com", logoColor: "#0E2A47", initials: "FA", phase: "design", lead: "Carolina R.", team: ["CR","JT"], extra: 0, deadline: "14 mai", deadlineState: "", progress: 54, health: "ok", value: 48800 },
    { name: "Volpe Construtora", domain: "volpe.com.br", logoColor: "#C77A1B", initials: "VC", phase: "discovery", lead: "Pedro S.", team: ["PS","RM"], extra: 0, deadline: "22 mai", deadlineState: "", progress: 18, health: "warn", value: 124000 },
    { name: "Cliché Café", domain: "clichecafe.com", logoColor: "#7B3F00", initials: "CC", phase: "dev", lead: "Marcos L.", team: ["ML","CR","TS"], extra: 2, deadline: "29 abr", deadlineState: "late", progress: 71, health: "danger", value: 36200 },
    { name: "Studio Mira", domain: "studiomira.co", logoColor: "#9333EA", initials: "SM", phase: "design", lead: "Júlia T.", team: ["JT","CR"], extra: 0, deadline: "11 mai", deadlineState: "", progress: 42, health: "ok", value: 38400 },
    { name: "Olivetti Imóveis", domain: "olivetti.com.br", logoColor: "#0F766E", initials: "OI", phase: "dev", lead: "Marcos L.", team: ["ML","PS"], extra: 1, deadline: "17 mai", deadlineState: "", progress: 64, health: "ok", value: 92500 },
    { name: "Bistrô Aurora", domain: "bistroaurora.com", logoColor: "#B91C1C", initials: "BA", phase: "discovery", lead: "Carolina R.", team: ["CR"], extra: 0, deadline: "30 mai", deadlineState: "", progress: 8, health: "ok", value: 28000 },
  ],
};

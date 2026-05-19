// UPCOM — Tasks (Kanban) data
window.UPCOM_TASKS = (function () {
  const TEAM = [
    { id: "rm", name: "Rafael Mendes", initials: "RM", color: "#E85D44" },
    { id: "jt", name: "Júlia Tavares", initials: "JT", color: "#9333EA" },
    { id: "ml", name: "Marcos Lima", initials: "ML", color: "#2C6BB8" },
    { id: "cr", name: "Carolina Reis", initials: "CR", color: "#0F766E" },
    { id: "ps", name: "Pedro Salles", initials: "PS", color: "#C77A1B" },
    { id: "ts", name: "Tainá Souza", initials: "TS", color: "#B91C1C" },
  ];

  const PROJECTS = [
    { id: "ns", name: "Nova Skin", color: "#1F1F1F" },
    { id: "ap", name: "Anima Pet", color: "#3A86FF" },
    { id: "fa", name: "Ferreira Adv.", color: "#0E2A47" },
    { id: "vc", name: "Volpe Constr.", color: "#C77A1B" },
    { id: "cc", name: "Cliché Café", color: "#7B3F00" },
    { id: "sm", name: "Studio Mira", color: "#9333EA" },
    { id: "oi", name: "Olivetti Imóveis", color: "#0F766E" },
  ];

  const COLUMNS = [
    { id: "backlog", name: "Backlog", wip: null },
    { id: "todo", name: "A fazer", wip: 8 },
    { id: "doing", name: "Em andamento", wip: 4 },
    { id: "review", name: "Em revisão", wip: 3 },
    { id: "client", name: "Aguardando cliente", wip: null },
    { id: "done", name: "Concluído", wip: null },
  ];

  // helper: relative dates
  const TODAY = new Date(2026, 4, 1); // 1 mai 2026
  const d = (offset) => {
    const dt = new Date(TODAY); dt.setDate(dt.getDate() + offset);
    return dt.toISOString().slice(0, 10);
  };

  const T = [
    // BACKLOG
    { id: "T-401", title: "Refazer arquitetura de informação do Studio Mira", project: "sm", assignees: ["jt"], priority: "med", due: d(18), labels: ["UX","Discovery"], checklist: [0,5], comments: 2, attachments: 0, est: 8, col: "backlog" },
    { id: "T-402", title: "Pesquisa de concorrentes — bistrôs autorais SP", project: null, assignees: ["cr"], priority: "low", due: d(22), labels: ["Research"], checklist: [0,3], comments: 0, attachments: 1, est: 4, col: "backlog" },
    { id: "T-403", title: "Migrar pipeline antigo do CRM Pipefy → UPCOM", project: null, assignees: ["rm","ml"], priority: "low", due: null, labels: ["Interno","Ops"], checklist: [1,6], comments: 4, attachments: 2, est: 12, col: "backlog" },
    { id: "T-404", title: "Definir KPIs de pós-entrega para todos os projetos", project: null, assignees: ["rm"], priority: "med", due: d(15), labels: ["Estratégia"], checklist: [0,4], comments: 1, attachments: 0, est: 3, col: "backlog" },

    // TODO
    { id: "T-405", title: "Wireframes mobile — fluxo de cadastro Anima Pet", project: "ap", assignees: ["jt","cr"], priority: "high", due: d(3), labels: ["Design","Mobile"], checklist: [0,8], comments: 1, attachments: 3, est: 12, col: "todo" },
    { id: "T-406", title: "Setup ambiente de homologação Volpe Construtora", project: "vc", assignees: ["ml"], priority: "high", due: d(2), labels: ["DevOps","Infra"], checklist: [0,5], comments: 0, attachments: 0, est: 6, col: "todo" },
    { id: "T-407", title: "Conteúdo — página Sobre Nós da Ferreira Advogados", project: "fa", assignees: ["cr"], priority: "med", due: d(5), labels: ["Conteúdo","Copy"], checklist: [2,6], comments: 3, attachments: 1, est: 4, col: "todo" },
    { id: "T-408", title: "Integração com Stripe — cobrança recorrente", project: "oi", assignees: ["ml","ps"], priority: "med", due: d(7), labels: ["Backend","API"], checklist: [0,9], comments: 2, attachments: 0, est: 16, col: "todo" },
    { id: "T-409", title: "Brief de fotografia produto — sessão 12/05", project: "ns", assignees: ["jt"], priority: "low", due: d(8), labels: ["Produção"], checklist: [0,4], comments: 0, attachments: 2, est: 2, col: "todo" },

    // DOING
    { id: "T-410", title: "Componente de checkout — variações A/B", project: "ns", assignees: ["jt","ml"], priority: "high", due: d(0), labels: ["Frontend","Design"], checklist: [4,7], comments: 6, attachments: 2, est: 14, col: "doing", progress: 65 },
    { id: "T-411", title: "Cards de cases — grid responsivo", project: "fa", assignees: ["jt"], priority: "med", due: d(2), labels: ["Frontend"], checklist: [3,5], comments: 2, attachments: 0, est: 8, col: "doing", progress: 70 },
    { id: "T-412", title: "Auth multi-tenant — refactor", project: "ap", assignees: ["ml"], priority: "high", due: d(-1), labels: ["Backend","Crítico"], checklist: [5,9], comments: 12, attachments: 1, est: 24, col: "doing", progress: 55, blocked: true },
    { id: "T-413", title: "Roteiro do vídeo institucional — Cliché Café", project: "cc", assignees: ["cr","ts"], priority: "med", due: d(4), labels: ["Conteúdo","Vídeo"], checklist: [2,4], comments: 3, attachments: 0, est: 6, col: "doing", progress: 50 },

    // REVIEW
    { id: "T-414", title: "PR #482 — Sistema de notificações in-app", project: "oi", assignees: ["ml","ps"], priority: "high", due: d(1), labels: ["Code review","Backend"], checklist: [6,6], comments: 8, attachments: 0, est: 10, col: "review", reviewer: "rm" },
    { id: "T-415", title: "Revisão de copy — landing Volpe", project: "vc", assignees: ["cr"], priority: "med", due: d(2), labels: ["Copy","QA"], checklist: [1,3], comments: 2, attachments: 1, est: 2, col: "review", reviewer: "rm" },
    { id: "T-416", title: "QA mobile iOS — Anima Pet build 1.4", project: "ap", assignees: ["ts"], priority: "high", due: d(0), labels: ["QA","Mobile"], checklist: [4,8], comments: 5, attachments: 4, est: 6, col: "review", reviewer: "ml" },

    // CLIENT
    { id: "T-417", title: "Aprovação de identidade visual v3", project: "fa", assignees: ["jt"], priority: "med", due: d(4), labels: ["Cliente","Aprovação"], checklist: [0,1], comments: 3, attachments: 5, est: null, col: "client", waitingSince: 2 },
    { id: "T-418", title: "Validação de estrutura de pricing", project: "vc", assignees: ["rm"], priority: "high", due: d(-3), labels: ["Cliente","Comercial"], checklist: [0,1], comments: 7, attachments: 2, est: null, col: "client", waitingSince: 6 },
    { id: "T-419", title: "Conteúdo final blog — receber do cliente", project: "cc", assignees: ["cr"], priority: "low", due: d(3), labels: ["Cliente","Conteúdo"], checklist: [0,1], comments: 1, attachments: 0, est: null, col: "client", waitingSince: 1 },

    // DONE
    { id: "T-420", title: "Deploy produção Nova Skin v2.1", project: "ns", assignees: ["ml"], priority: "high", due: d(-1), labels: ["Deploy"], checklist: [5,5], comments: 4, attachments: 1, est: 4, col: "done", completedAt: d(-1) },
    { id: "T-421", title: "Onboarding cliente Olivetti — kickoff", project: "oi", assignees: ["ps","rm"], priority: "med", due: d(-2), labels: ["Reunião"], checklist: [3,3], comments: 2, attachments: 2, est: 2, col: "done", completedAt: d(-2) },
    { id: "T-422", title: "Setup de tracking GA4 + Hotjar", project: "ns", assignees: ["ml"], priority: "med", due: d(-3), labels: ["Analytics"], checklist: [4,4], comments: 1, attachments: 0, est: 3, col: "done", completedAt: d(-3) },
    { id: "T-423", title: "Newsletter Abril — disparada", project: null, assignees: ["cr","ts"], priority: "low", due: d(-4), labels: ["Marketing","Interno"], checklist: [6,6], comments: 0, attachments: 1, est: 4, col: "done", completedAt: d(-4) },
  ];

  return { TEAM, PROJECTS, COLUMNS, TASKS: T, TODAY };
})();

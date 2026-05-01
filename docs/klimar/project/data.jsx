// Klimar — sample data (Brazilian, realistic)

const CLIENTS = [
  { id: 'c1', name: 'Maria Silva', phone: '(11) 98765-4321', email: 'maria.silva@email.com',
    address: 'Rua Augusta, 1842 — Consolação, São Paulo/SP', cep: '01304-001',
    lastVisit: '12/04/2026', equipmentCount: 3 },
  { id: 'c2', name: 'João Pereira', phone: '(11) 99432-1078', email: 'joao.p@uol.com.br',
    address: 'Av. Paulista, 1471 ap. 82 — Bela Vista, São Paulo/SP', cep: '01311-200',
    lastVisit: '28/04/2026', equipmentCount: 1 },
  { id: 'c3', name: 'Construtora Verdes Ltda', phone: '(11) 3456-7890', email: 'manutencao@verdes.com.br',
    address: 'Rua Tutoia, 485 — Vila Mariana, São Paulo/SP', cep: '04007-001',
    lastVisit: '30/04/2026', equipmentCount: 12 },
  { id: 'c4', name: 'Beatriz Almeida', phone: '(11) 97123-4567', email: 'bea.almeida@gmail.com',
    address: 'Rua Harmonia, 322 — Vila Madalena, São Paulo/SP', cep: '05435-000',
    lastVisit: '15/03/2026', equipmentCount: 2 },
  { id: 'c5', name: 'Restaurante Boa Mesa', phone: '(11) 2345-6789', email: 'contato@boamesa.com.br',
    address: 'Rua dos Pinheiros, 902 — Pinheiros, São Paulo/SP', cep: '05422-001',
    lastVisit: '02/04/2026', equipmentCount: 6 },
  { id: 'c6', name: 'Carlos Henrique Lima', phone: '(11) 98234-5612', email: 'ch.lima@outlook.com',
    address: 'Av. Brigadeiro Faria Lima, 3144 — Itaim Bibi, São Paulo/SP', cep: '01451-000',
    lastVisit: '20/04/2026', equipmentCount: 4 },
  { id: 'c7', name: 'Ana Paula Costa', phone: '(11) 96543-2109', email: 'anapaula@email.com',
    address: 'Rua Oscar Freire, 727 — Jardins, São Paulo/SP', cep: '01426-001',
    lastVisit: '08/04/2026', equipmentCount: 2 },
];

const APPOINTMENTS = [
  { id: 'os-1042', osNumber: 'OS-1042', clientId: 'c5', clientName: 'Restaurante Boa Mesa',
    service: 'Higienização química', equipment: 'Cassete 36.000 BTU',
    date: '01/05/2026', time: '08:00', duration: 90, status: 'in_progress',
    address: 'Rua dos Pinheiros, 902 — Pinheiros' },
  { id: 'os-1043', osNumber: 'OS-1043', clientId: 'c1', clientName: 'Maria Silva',
    service: 'Manutenção preventiva', equipment: 'Split Inverter 12.000 BTU',
    date: '01/05/2026', time: '10:30', duration: 60, status: 'scheduled',
    address: 'Rua Augusta, 1842 — Consolação' },
  { id: 'os-1044', osNumber: 'OS-1044', clientId: 'c3', clientName: 'Construtora Verdes Ltda',
    service: 'Instalação Split', equipment: 'Split Inverter 18.000 BTU',
    date: '01/05/2026', time: '13:00', duration: 180, status: 'scheduled',
    address: 'Rua Tutoia, 485 — Vila Mariana' },
  { id: 'os-1045', osNumber: 'OS-1045', clientId: 'c2', clientName: 'João Pereira',
    service: 'Ponto de energia 220V', equipment: '—',
    date: '01/05/2026', time: '16:30', duration: 45, status: 'scheduled',
    address: 'Av. Paulista, 1471 ap. 82 — Bela Vista' },
  { id: 'os-1041', osNumber: 'OS-1041', clientId: 'c6', clientName: 'Carlos H. Lima',
    service: 'Manutenção preventiva', equipment: 'VRF Outdoor',
    date: '30/04/2026', time: '14:00', duration: 120, status: 'done',
    address: 'Av. Faria Lima, 3144 — Itaim Bibi' },
  { id: 'os-1040', osNumber: 'OS-1040', clientId: 'c4', clientName: 'Beatriz Almeida',
    service: 'Higienização química', equipment: 'Split 9.000 BTU',
    date: '29/04/2026', time: '09:00', duration: 90, status: 'overdue',
    address: 'Rua Harmonia, 322 — Vila Madalena' },
];

const BUDGETS = [
  { id: 'b-2026-0142', number: '2026/0142', clientId: 'c3', clientName: 'Construtora Verdes Ltda',
    date: '28/04/2026', total: 'R$ 8.450,00', status: 'pending',
    items: [
      { desc: 'Instalação Split Inverter 18.000 BTU', qty: 4, unit: 'R$ 1.250,00', total: 'R$ 5.000,00' },
      { desc: 'Ponto frigorígeno (até 5m)', qty: 4, unit: 'R$ 380,00', total: 'R$ 1.520,00' },
      { desc: 'Suporte parede reforçado', qty: 4, unit: 'R$ 180,00', total: 'R$ 720,00' },
      { desc: 'Mão de obra adicional (h)', qty: 8, unit: 'R$ 151,25', total: 'R$ 1.210,00' },
    ] },
  { id: 'b-2026-0141', number: '2026/0141', clientId: 'c5', clientName: 'Restaurante Boa Mesa',
    date: '27/04/2026', total: 'R$ 1.890,00', status: 'pending', items: [] },
  { id: 'b-2026-0140', number: '2026/0140', clientId: 'c1', clientName: 'Maria Silva',
    date: '24/04/2026', total: 'R$ 620,00', status: 'approved', items: [] },
  { id: 'b-2026-0139', number: '2026/0139', clientId: 'c2', clientName: 'João Pereira',
    date: '22/04/2026', total: 'R$ 1.150,00', status: 'approved', items: [] },
  { id: 'b-2026-0138', number: '2026/0138', clientId: 'c7', clientName: 'Ana Paula Costa',
    date: '18/04/2026', total: 'R$ 480,00', status: 'rejected', items: [] },
  { id: 'b-2026-0137', number: '2026/0137', clientId: 'c4', clientName: 'Beatriz Almeida',
    date: '14/04/2026', total: 'R$ 320,00', status: 'draft', items: [] },
];

const SERVICES = [
  { id: 's1', name: 'Manutenção preventiva', price: 'R$ 280,00', hourly: 'R$ 120,00/h', extra: '15%' },
  { id: 's2', name: 'Higienização química', price: 'R$ 320,00', hourly: '—', extra: '10%' },
  { id: 's3', name: 'Instalação Split', price: 'R$ 1.250,00', hourly: 'R$ 150,00/h', extra: '20%' },
  { id: 's4', name: 'Ponto de energia 220V', price: 'R$ 480,00', hourly: '—', extra: '—' },
  { id: 's5', name: 'Recarga de gás R-410A', price: 'R$ 380,00', hourly: '—', extra: '12%' },
  { id: 's6', name: 'Atendimento corretivo', price: '—', hourly: 'R$ 180,00/h', extra: '20%' },
];

const EQUIPMENT_TYPES = [
  { id: 'e1', name: 'Split Inverter 9.000 BTU', basePrice: 'R$ 220,00' },
  { id: 'e2', name: 'Split Inverter 12.000 BTU', basePrice: 'R$ 260,00' },
  { id: 'e3', name: 'Split Inverter 18.000 BTU', basePrice: 'R$ 320,00' },
  { id: 'e4', name: 'Split Inverter 24.000 BTU', basePrice: 'R$ 380,00' },
  { id: 'e5', name: 'Cassete 36.000 BTU', basePrice: 'R$ 480,00' },
  { id: 'e6', name: 'VRF Outdoor', basePrice: 'R$ 850,00' },
  { id: 'e7', name: 'Piso-teto 60.000 BTU', basePrice: 'R$ 620,00' },
];

const CHECKLIST_HIGIENIZACAO = [
  { id: 1, text: 'Desligar disjuntor e tampar tomada', done: true },
  { id: 2, text: 'Cobrir parede e piso com lona', done: true },
  { id: 3, text: 'Aplicar produto químico na evaporadora', done: true },
  { id: 4, text: 'Lavar serpentina externa', done: false },
  { id: 5, text: 'Higienizar bandeja de condensados', done: false },
  { id: 6, text: 'Limpar filtros de ar', done: false },
  { id: 7, text: 'Religar e testar funcionamento', done: false },
  { id: 8, text: 'Conferir temperatura saída (cooling)', done: false },
];

window.__DATA__ = { CLIENTS, APPOINTMENTS, BUDGETS, SERVICES, EQUIPMENT_TYPES, CHECKLIST_HIGIENIZACAO };

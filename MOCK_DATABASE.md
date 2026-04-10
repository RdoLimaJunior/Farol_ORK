# 🗄️ Farol OKR - Banco de Dados Mockado (MD-DB)

Este arquivo é a **Verdade Absoluta** do sistema. A hierarquia segue o padrão:
`Objetivo > KR > (Projeto > Ações) & (FCA)`.

---

## 👤 PERFIS (Profiles)
```json
[
  { "id": "user-lima", "fullName": "Lima Junior", "role": "admin", "jobTitle": "Desenvolvedor Senior" },
  { "id": "user-lidia", "fullName": "Lidia", "role": "member", "jobTitle": "Gestora de Experiência" }
]
```

---

## 🏗️ ESTRUTURA ESTRATÉGICA (OKRs & Iniciativas)

### [OB-1] Objetivo: O2 - Desenvolver processos de moradia com foco no Cliente
**Status**: Em Risco (32%) | **Dono**: Lidia

#### >> [KR-1] Estruturar plano de atuação da diretoria até 31/03
- **Status**: Em Risco (25%)
- **FCA**: 🔴 **Fato**: Atraso na contratação da consultoria. **Causa**: Burocracia no jurídico. **Ação**: Reunião de emergência com o Diretor Jurídico.

##### >>> [P-1] Mapeamento da Jornada do Cliente
- **Progresso**: 45%
- **Ações**:
  - [A-1] Entrevistas qualitativas (Concluído)
  - [A-2] Mapas de empatia (Concluído)

#### >> [KR-2] Alcançar CSAT de 90% na jornada de captação
- **Status**: Saudável (82%)
- **FCA**: N/A (Saudável)

##### >>> [P-2] Implantação do Feedback Real-Time
- **Progresso**: 85%
- **Ações**:
  - [A-3] Configuração da API (Doing)
  - [A-4] Treinamento de times (Todo)

---

## 📥 DADOS BRUTOS (JSON Export)

### Profiles
```json
[
  { "id": "user-lima", "fullName": "Lima Junior", "email": "lima.junior@portfoliotech.com.br", "role": "admin", "jobTitle": "Desenvolvedor Senior", "xpPoints": 1500, "level": 12 },
  { "id": "user-lidia", "fullName": "Lidia", "email": "lidia@sj.com.br", "role": "member", "jobTitle": "Gestora de Experiência", "xpPoints": 800, "level": 5 }
]
```

### Objectives
```json
[
  { "id": "O2", "title": "O2 - Desenvolver os processos de moradia e negócios com foco na experiência do Cliente", "ownerId": "user-lidia", "progress": 32, "status": "at_risk" }
]
```

### Key Results
```json
[
  { "id": "KR1-O2", "objectiveId": "O2", "title": "Estruturar plano de atuação da diretoria de relacionamentos até 31/03/2026", "ownerName": "Lidia", "currentValue": 25, "status": "at_risk" },
  { "id": "KR2-O2", "objectiveId": "O2", "title": "Alcançar CSAT de 90% na jornada de captação", "ownerName": "Lidia", "currentValue": 82, "status": "on_track" }
]
```

### FCA (Linked to KR)
```json
[
  { 
    "id": "FCA-KR1", 
    "keyResultId": "KR1-O2", 
    "fato": "Atraso no cronograma de estruturação do plano devido à dependência da consultoria externa.", 
    "causa": "O processo de aprovação do contrato no departamento jurídico levou 15 dias a mais que o previsto.", 
    "acao": "Agendar reunião com o Diretor Jurídico para priorizar contratos de estratégia e criar um checklist de pré-requisitos." 
  }
]
```

### Initiatives (Projects)
```json
[
  { "id": "P1-KR1", "keyResultId": "KR1-O2", "title": "Mapeamento da Jornada do Cliente SJ", "progress": 45 },
  { "id": "P2-KR2", "keyResultId": "KR2-O2", "title": "Implantação do Sistema de Feedback Real-Time", "progress": 85 }
]
```

### Actions
```json
[
  { "id": "A1", "parentId": "P1-KR1", "title": "Entrevistas qualitativas", "status": "done" },
  { "id": "A2", "parentId": "P2-KR2", "title": "Configuração da API", "status": "doing" }
]
```

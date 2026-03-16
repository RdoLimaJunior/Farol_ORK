# Feature Specification: 005-Gamificacao-e-Social

**Feature Branch**: `feature/005-gamificacao-social`
**Created**: 2026-03-15
**Status**: Draft

## User Scenarios & Testing

### User Story 1 - Pontuação (Points) (Priority: P2)
O sistema deve atribuir pontuação automaticamente sempre que um usuário atualiza KRs no prazo ou conclui KRs no trimestre.
**Why this priority**: Ajuda no engajamento, mas não impede o funcionamento do core de OKR (P1).
**Independent Test**: Simular o check-in de um KR e constatar a soma automática na carteira do usuário no Supabase.

### User Story 2 - Feed Social (Priority: P2)
Sempre que ocorrerem "Eventos de Gamificação" (bater meta, check-in no prazo, ganho de novo badge), um post gerado pelo sistema (ou pela IA) deve aparecer no feed global.
**Independent Test**: Verificar se a trigger de bater meta insere uma nova linha na tabela `feed_posts`.

### User Story 3 - Interações Sociais (Priority: P3)
Os colaboradores devem ser capazes de dar um "like" (reação) ou comentar nos engajamentos gerados no Feed da equipe.
**Independent Test**: Clicar na reação e validar a incrementação do contador no post.

## Requirements

### Funcionais
- **FR-033**: Gerar eventos baseados em gatilhos operacionais de OKR.
- **FR-034**: Pontuação por evento.
- **FR-035**: Calcular Ranking da área/empresa.
- **FR-036**: Distribuir Badges (ex: "Consistente", "Overshooter").
- **FR-038**: Criação de Posts (Sistema ou IA gerador).
- **FR-039 / FR-040**: Comentários e Reações.

### Key Entities (Domain Models in TypeScript)
```typescript
// ./src/domain/models/gamification.ts

// Moedas do sistema
export interface Wallet {
  userId: string;
  totalPoints: number;
  level: number;
}

export interface Badge {
  id: string;
  name: string; // Ex: 'Check-in Ninja'
  iconUrl: string;
  conditionType: 'consecutive_checkins' | 'target_hit' | 'social_engagement';
  requiredScore: number;
}

// O que é jogado na timeline da empresa
export interface FeedPost {
  id: string;
  userId: string;       // Quem causou o evento
  content: string;      // A IA cria algo como: "A Maria acabou de quebrar a meta de Vendas!"
  type: 'system_alert' | 'user_recognition' | 'badge_earned';
  reactionsCount: Record<string, number>; // Ex: { "1f44d" (👍): 5 }
  createdAt: string;
}
```

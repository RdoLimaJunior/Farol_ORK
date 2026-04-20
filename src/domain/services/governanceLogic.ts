import type { Objective, KeyResult } from '../models/types';

export function calculateAdhesion(krs: KeyResult[]): number {
  if (krs.length === 0) return 100;
  
  // No mock, simulamos baseando-se na presença de dados de confiança e progresso
  // Em prod, checaríamos os timestamps dos últimos check-ins
  const updatedKrs = krs.filter(kr => kr.confidence && kr.currentValue !== undefined).length;
  return Math.round((updatedKrs / krs.length) * 100);
}

export function calculateClimate(krs: KeyResult[]): string {
  // Lógica: Se muitos KRs estão em risco ou sem confiança alta, o clima esquenta (fica amarelo)
  const atRiskCount = krs.filter(kr => kr.status === 'off_track' || kr.confidence === 'baixa').length;
  
  if (atRiskCount === 0) return 'success';
  if (atRiskCount <= krs.length * 0.3) return 'warning';
  return 'error';
}

export function calculateMaturity(obj: Objective, krs: KeyResult[], adhesion: number, climate: string): string {
  const allHaveConfidence = krs.every(kr => kr.confidence);
  const avgProgress = obj.progress || 0;
  
  // BRONZE: Adesão >= 80% + Todos com confiança
  if (adhesion < 80 || !allHaveConfidence) return 'BRONZE';
  
  // PRATA: Bronze + Metas sendo atingidas (pelo menos 40% de progresso médio)
  if (avgProgress < 40) return 'BRONZE';
  
  // OURO: Prata + Progresso >= 70% + Clima Verde (success)
  if (avgProgress >= 70 && climate === 'success') return 'OURO';
  
  return 'PRATA';
}

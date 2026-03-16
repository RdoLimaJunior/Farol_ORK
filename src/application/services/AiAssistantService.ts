export interface AiSuggestion {
  text: string;
  explanation?: string;
}

export class AiAssistantService {
  private static instance: AiAssistantService;

  private constructor() {}

  public static getInstance(): AiAssistantService {
    if (!AiAssistantService.instance) {
      AiAssistantService.instance = new AiAssistantService();
    }
    return AiAssistantService.instance;
  }

  /**
   * Refina o título de um objetivo para torná-lo mais estratégico/OKR compliant.
   */
  async refineTitle(baseTitle: string): Promise<AiSuggestion> {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula latência
    
    const lowers = baseTitle.toLowerCase();
    
    if (lowers.includes('vender') || lowers.includes('vendas')) {
      return { 
        text: 'Escalar a Receita Recurrente com Foco em Expansão de Mercado', 
        explanation: 'Transformei um verbo de ação simples em um objetivo aspiracional qualitativo.' 
      };
    }
    
    if (lowers.includes('contratar') || lowers.includes('pessoas')) {
      return { 
        text: 'Fortalecer o Capital Intelectual com Talentos de Alta Performance', 
        explanation: 'Foco no impacto estratégico da contratação, não apenas na tarefa.' 
      };
    }

    if (lowers.includes('bug') || lowers.includes('erro') || lowers.includes('qualidade')) {
      return { 
        text: 'Elevar o Padrão de Confiabilidade e Estabilidade da Plataforma', 
        explanation: 'Foco no valor entregue ao cliente (confiança) em vez de apenas correção.' 
      };
    }

    return { 
      text: `${baseTitle.charAt(0).toUpperCase() + baseTitle.slice(1)} com Excelência e Impacto Estratégico`,
      explanation: 'Adicionei um modificador de qualidade para tornar o objetivo mais ambicioso.'
    };
  }

  /**
   * Gera uma descrição detalhada baseada no título.
   */
  async generateDescription(title: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return `Este objetivo visa focar todos os esforços da equipe em "${title}". \n\n` +
           `Impacto esperado:\n` +
           `- Aumento da percepção de valor pelo cliente.\n` +
           `- Alinhamento com as metas de longo prazo da organização.\n` +
           `- Melhoria nos índices de eficiência operacional.\n\n` +
           `Contexto: Gerado via IA Farol Assist baseada em diretrizes estratégicas.`;
  }

  /**
   * Sugere membros baseado em palavras-chave.
   */
  async suggestMembers(title: string, availableMembers: any[]): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowers = title.toLowerCase();
    
    if (lowers.includes('venda') || lowers.includes('comercial') || lowers.includes('receita')) {
      return availableMembers.filter(m => m.job_title?.toLowerCase().includes('venda') || m.job_title?.toLowerCase().includes('comercial') || m.job_title?.toLowerCase().includes('negócio'));
    }

    if (lowers.includes('plataforma') || lowers.includes('tecnologia') || lowers.includes('bug') || lowers.includes('estabilidade')) {
      return availableMembers.filter(m => m.job_title?.toLowerCase().includes('dev') || m.job_title?.toLowerCase().includes('eng') || m.job_title?.toLowerCase().includes('tech'));
    }

    return availableMembers.slice(0, 2); // Sugestão padrão
  }
}

export const aiAssistant = AiAssistantService.getInstance();

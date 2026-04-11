export interface AiSuggestion {
  text: string;
  explanation?: string;
  alternatives?: string[];
  action?: 'create' | 'checkin' | 'navigate';
  data?: any;
}

export interface AgentInsight {
  id: string;
  type: 'alert' | 'success' | 'task' | 'insight';
  title: string;
  message: string;
  actionCommand?: string;
  color: string;
  linkedKrs?: string[];
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
   * Refina o título de um objetivo/KR para torná-lo mais estratégico/OKR compliant (v3.0).
   */
  async refineTitle(baseTitle: string): Promise<AiSuggestion> {
    await new Promise(resolve => setTimeout(resolve, 800)); // Latência reduzida para melhor UX
    
    const lowers = baseTitle.toLowerCase();
    
    // Lógica Anti-Tarefa (ANVISA/UFRJ): Detecta verbos de Output e sugere Outcomes
    const outputVerbs = ['fazer', 'executar', 'criar', 'capacitar', 'treinar', 'contratar', 'instalar', 'enviar', 'postar'];
    const isOutput = outputVerbs.some(verb => lowers.includes(verb));
    
    let mainSuggestion = '';
    let explanation = '';
    let alternatives: string[] = [];

    if (lowers.includes('capacitar') || lowers.includes('treinar')) {
      mainSuggestion = 'Atingir 100% de proficiência técnica no uso da nova estrutura de OKRs';
      explanation = 'Detectei um foco em TAREFA (capacitar). Sugeri um RESULTADO (proficiência/adoção) seguindo a metodologia Farol v3.0.';
      alternatives = [
        'Garantir que 100% dos analistas realizem check-ins semanais com qualidade Ouro',
        'Reduzir a zero o índice de erros técnicos na redação de novos KRs'
      ];
    } else if (lowers.includes('vender') || lowers.includes('vendas') || lowers.includes('receita')) {
      mainSuggestion = 'Escalar a Receita Recurrente através da Expansão da Base de Clientes';
      explanation = 'Objetivos devem ser inspiradores e qualitativos. Transformei a ação de vender em uma meta de crescimento estratégico.';
      alternatives = [
        'Consolidar a liderança de mercado aumentando o Market Share do segmento premium',
        'Otimizar a Eficiência Comercial reduzindo o CAC em 15%'
      ];
    } else if (isOutput) {
      mainSuggestion = `Garantir excelência e impacto estratégico em ${baseTitle.replace(/fazer|executar|criar/gi, '').trim()}`;
      explanation = 'Evite verbos de ação pura. Foque no impacto ou na qualidade do que está sendo construído.';
      alternatives = [
        `Elevar o patamar de maturidade em ${baseTitle.trim()}`,
        `Maximizar o retorno sobre o investimento em ${baseTitle.trim()}`
      ];
    } else {
      mainSuggestion = `${baseTitle.charAt(0).toUpperCase() + baseTitle.slice(1)} com Foco em Impacto e Sustentabilidade`;
      explanation = 'Adicionei um modificador de impacto para alinhar com o rigor da metodologia v3.0.';
      alternatives = [
        `Otimizar ${baseTitle} para alta performance institucional`,
        `Garantir governança e rastreabilidade em ${baseTitle}`
      ];
    }

    return { 
      text: mainSuggestion, 
      explanation,
      alternatives
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

  /**
   * Retorna insights dinâmicos do "Agente" para a Home.
   */
  async getAgentInsights(): Promise<AgentInsight[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: '1',
        type: 'alert',
        title: 'KRs em Risco Imediato',
        message: 'O KR "Reduzir Churn de 15% para 5%" está com desvio crítico (Off Track). A confiança caiu para 3/10.',
        color: 'red',
        actionLabel: 'Agir Agora',
        actionCommand: '/tactical?filter=off-track',
        linkedKrs: ['Retenção de Clientes Trimestral']
      },
      {
        id: '4',
        type: 'alert',
        title: 'Radar Humano (e-NPS)',
        message: 'O clima do time de Engenharia caiu para 2.5/5 no último check-in. Risco de burnout ou desalinhamento.',
        color: 'pink',
        actionLabel: 'Apoiar Time',
        actionCommand: '/engagement',
        linkedKrs: ['Retenção de Talentos']
      },
      {
        id: '2',
        type: 'insight',
        title: 'Alerta de Cadência (Stale)',
        message: 'A Meta de "Expansão LATAM" não recebe check-in há 12 dias. O rigor metodológico exige atualizações semanais.',
        color: 'orange',
        actionLabel: 'Atualizar',
        actionCommand: '/tactical?search=LATAM',
        linkedKrs: ['Market Share LATAM', 'Novas Filiais']
      },
      {
        id: '3',
        type: 'insight',
        title: 'Matriz de Confiança Baixa',
        message: 'Embora o KR "Novas Contratações" esteja On Track, o time reportou Confiança 4. Possível gargalo futuro detectado.',
        color: 'blue',
        actionLabel: 'Ver FCA',
        actionCommand: '/execution',
        linkedKrs: ['Headcount Engenharia']
      },
      {
        id: '5',
        type: 'success',
        title: 'Eficiência Ouro',
        message: 'A Unidade de Financeiro atingiu 100% de adesão aos ritos desta semana com alta qualidade técnica em todos os FCAs.',
        color: 'green',
        actionLabel: 'Celebrar',
        actionCommand: '/overview',
      }
    ];
  }

  /**
   * Processa comandos complexos do SmartPrompt.
   */
  async processSmartCommand(command: string): Promise<AiSuggestion | null> {
    const input = command.toLowerCase().trim();
    
    if (!input) return null;

    // Pattern: + checkin [name] [value]
    if (input.startsWith('+ checkin')) {
      return {
        text: 'Executar Check-in Inteligente',
        explanation: 'Vou atualizar o progresso do KR e abrir o campo de comentário para você.',
        action: 'checkin',
        data: { query: input.replace('+ checkin', '').trim() }
      };
    }

    // Pattern: + criar [type] [name]
    if (input.startsWith('+ criar') || input.startsWith('+ novo')) {
      return {
        text: 'Iniciar Mágico de Criação',
        explanation: 'Vou estruturar este novo objetivo usando as melhores práticas de OKR.',
        action: 'create',
        data: { title: input.replace('+ criar', '').replace('+ novo', '').trim() }
      };
    }

    // Default: Refinement
    return this.refineTitle(input);
  }

  /**
   * Retorna um resumo executivo contextual para o dashboard (2 linhas).
   * Agora lê dados REAIS do sistema.
   */
  async getExecutiveSummary(): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      // Import dinâmico ou direto para evitar problemas de ciclo (mockStorage é simples)
      const { getMockData } = await import('../../infrastructure/data/mockStorage');
      const data = getMockData();
      
      if (!data || !data.krs) return "Bem-vindo ao Farol. Comece definindo seus primeiros Objetivos e Resultados-Chave.";

      const krs = data.krs;
      const onTrackCount = krs.filter((kr: any) => kr.status === 'on_track').length;
      const onTrackPercent = Math.round((onTrackCount / krs.length) * 100);
      
      // Busca por um sucesso notável (progresso > 80%)
      const successKr = krs.find((kr: any) => kr.progress >= 80);
      if (successKr) {
        return `Excelente progresso! A meta de '${successKr.title}' atingiu o marco crítico de ${successKr.progress}% antes do projetado.`;
      }

      // Busca por um risco crítico (off_track ou confiança baixa simulada)
      const riskKr = krs.find((kr: any) => kr.status === 'at_risk' || kr.status === 'off_track');
      if (riskKr) {
        return `Atenção: O KR '${riskKr.title}' está com desvio e exige um plano de ação (FCA) imediato para recuperação.`;
      }

      return `Detectamos que ${onTrackPercent}% das metas estratégicas estão 'On Track'. Ótimo momento para revisar o estiramento (Stretch) da operação.`;
    } catch (error) {
      return "Analisando performance tática... Prepare-se para o ritual de check-in desta semana.";
    }
  }
}

export const aiAssistant = AiAssistantService.getInstance();

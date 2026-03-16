import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { aiAssistant } from '../services/AiAssistantService';
import type { AiSuggestion } from '../services/AiAssistantService';
import { notifications } from '@mantine/notifications';

interface CopilotContextType {
  promptValue: string;
  setPromptValue: (value: string) => void;
  currentSuggestion: AiSuggestion | null;
  loading: boolean;
  executeCommand: (command: string) => void;
}

const CopilotContext = createContext<CopilotContextType | undefined>(undefined);

export function CopilotProvider({ children }: { children: ReactNode }) {
  const [promptValue, setPromptValue] = useState('');
  const [currentSuggestion, setCurrentSuggestion] = useState<AiSuggestion | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (promptValue.length > 3) {
        setLoading(true);
        const suggestion = await aiAssistant.processSmartCommand(promptValue);
        setCurrentSuggestion(suggestion);
        setLoading(false);
      } else {
        setCurrentSuggestion(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [promptValue]);

  const executeCommand = async (command: string) => {
    setLoading(true);
    const suggestion = await aiAssistant.processSmartCommand(command);
    
    if (suggestion) {
      notifications.show({
        title: 'Timoneiro Executando...',
        message: suggestion.text,
        color: 'farol-blue',
        loading: true,
        autoClose: 2000
      });

      // Simulate logic based on action
      setTimeout(() => {
        if (suggestion.action === 'checkin') {
          notifications.show({ title: 'Check-in Realizado', message: 'Métrica atualizada com sucesso via IA.', color: 'green' });
        } else if (suggestion.action === 'create') {
          notifications.show({ title: 'Rascunho Criado', message: 'Abrindo configurador de OKR...', color: 'blue' });
        }
        setPromptValue('');
        setCurrentSuggestion(null);
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  };

  return (
    <CopilotContext.Provider value={{ 
      promptValue, 
      setPromptValue, 
      currentSuggestion, 
      loading,
      executeCommand 
    }}>
      {children}
    </CopilotContext.Provider>
  );
}

export function useCopilot() {
  const context = useContext(CopilotContext);
  if (context === undefined) {
    throw new Error('useCopilot must be used within a CopilotProvider');
  }
  return context;
}

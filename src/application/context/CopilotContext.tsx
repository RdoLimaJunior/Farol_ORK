import { createContext, useContext, useState, type ReactNode } from 'react';

interface CopilotContextType {
  promptValue: string;
  setPromptValue: (value: string) => void;
  executeCommand: (command: string) => void;
}

const CopilotContext = createContext<CopilotContextType | undefined>(undefined);

export function CopilotProvider({ children }: { children: ReactNode }) {
  const [promptValue, setPromptValue] = useState('');

  const executeCommand = (command: string) => {
    setPromptValue(command);
    console.log('IA Execution triggered:', command);
  };

  return (
    <CopilotContext.Provider value={{ promptValue, setPromptValue, executeCommand }}>
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

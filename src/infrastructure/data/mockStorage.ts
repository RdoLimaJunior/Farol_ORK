import mockDb from './mock_db.json';

const STORAGE_KEY = 'farol_mock_db';

export const getMockData = () => {
    // FORCE RESET ON VERSION CHANGE (ou erro detectado)
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : null;
    
    // Forçamos reset se não houver dados ou se a estrutura estiver incompleta (ex: falta o campo 'level')
    // Baseamos o reset no ID do primeiro objetivo, na presença do campo 'level' e na quantidade de objetivos (mínimo 8 para incluir táticos)
    const needsReset = parsed && (
        !parsed.objectives || 
        parsed.objectives.length < 8 || 
        !parsed.krs ||
        parsed.krs.length < 21 ||
        parsed.objectives[0].id !== "O1" ||
        !parsed.objectives[0].level
    );

    if (!stored || needsReset) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockDb));
        return mockDb;
    }
    return parsed;
};


export const saveMockData = (data: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const updateMockEntity = (entity: string, updateFn: (items: any[]) => any[]) => {
    const data = getMockData();
    data[entity] = updateFn(data[entity] || []);
    saveMockData(data);
    return data[entity];
};

export const resetMockData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockDb));
    window.location.reload();
};

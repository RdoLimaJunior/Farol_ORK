import mockDb from './mock_db.json';

const STORAGE_KEY = 'farol_mock_db';

export const getMockData = () => {
    // FORCE RESET ON VERSION CHANGE (ou erro detectado)
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : null;
    
    // Se não tiver startValue no primeiro KR, limpamos tudo para atualizar para a versão nova
    const needsReset = parsed && parsed.krs && parsed.krs.length > 0 && parsed.krs[0].startValue === undefined;

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

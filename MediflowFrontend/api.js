export const fetchMedicalTerms = async () => {
    try {
        const response = await fetch('http://localhost:5001/api/terms');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der medizinischen Begriffe:', error);
    }
};

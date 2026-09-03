const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function fetchHistory() {
  const response = await fetch(`${API_BASE_URL}/api/history`);
  if (!response.ok) throw new Error('Failed to load history');

  const data = await response.json();
  return data.history || [];
}

export async function requestExplanation(payload) {
  const response = await fetch(`${API_BASE_URL}/api/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(data.error || 'Request failed');
  }

  return response.json();
}

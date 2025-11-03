interface AnalysisModuleProps {
  filename: string;
}

export default function AnalysisModule({ filename }: AnalysisModuleProps) {
  const measurements = [
    { label: 'Fréquence Initiale (FI)', value: '45.2 kHz' },
    { label: 'Fréquence Terminale (FT)', value: '23.8 kHz' },
    { label: 'Fréquence Maximum (Fmax)', value: '52.4 kHz' },
    { label: 'Durée', value: '4.2 ms' },
    { label: 'Bande passante', value: '21.4 kHz' },
  ];

  return (
    <div className="h-full p-6">
      <div className="mb-6">
        <h3 className="text-xl mb-2">Analyse - {filename}</h3>
        <p className="text-[var(--text-muted)]">
          Mesures acoustiques automatiques et manuelles
        </p>
      </div>

      {/* Measurements */}
      <div className="bg-[var(--app-panel)] border border-[var(--app-border)] rounded-lg p-6 mb-6">
        <h4 className="text-lg mb-4">Paramètres acoustiques</h4>
        <div className="grid grid-cols-2 gap-4">
          {measurements.map((m) => (
            <div key={m.label} className="p-4 bg-[var(--app-bg)] rounded-lg">
              <div className="text-sm text-[var(--text-muted)] mb-1">{m.label}</div>
              <div className="text-xl text-[#00C2FF]">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-[var(--app-panel)] border border-[var(--app-border)] rounded-lg p-6">
        <h4 className="text-lg mb-4">Graphique FFT</h4>
        <div className="h-64 bg-[var(--app-bg)] rounded-lg flex items-center justify-center text-[var(--text-muted)]">
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p>Spectre de puissance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

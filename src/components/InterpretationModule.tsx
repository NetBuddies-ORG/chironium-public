interface InterpretationModuleProps {
  filename: string;
}

export default function InterpretationModule({ filename }: InterpretationModuleProps) {
  const species = [
    { name: 'Pipistrellus pipistrellus', confidence: 85, count: 12 },
    { name: 'Myotis myotis', confidence: 72, count: 8 },
    { name: 'Eptesicus serotinus', confidence: 45, count: 3 },
  ];

  return (
    <div className="h-full p-6">
      <div className="mb-6">
        <h3 className="text-xl mb-2">Interprétation - {filename}</h3>
        <p className="text-[var(--text-muted)]">
          Identification des espèces et validation
        </p>
      </div>

      {/* Species List */}
      <div className="bg-[var(--app-panel)] border border-[var(--app-border)] rounded-lg p-6 mb-6">
        <h4 className="text-lg mb-4">Espèces détectées</h4>
        <div className="space-y-3">
          {species.map((s) => (
            <div 
              key={s.name}
              className="p-4 bg-[var(--app-bg)] border border-[var(--app-border)] rounded-lg hover:border-[#00C2FF]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="italic">{s.name}</span>
                <span className="text-sm text-[var(--text-muted)]">{s.count} détections</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[var(--app-bg)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00C2FF]"
                    style={{ width: `${s.confidence}%` }}
                  />
                </div>
                <span className="text-sm">{s.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 px-4 py-3 bg-[var(--app-panel)] border border-[var(--app-border)] rounded-lg hover:bg-[var(--accent)]">
          Valider les identifications
        </button>
        <button className="flex-1 px-4 py-3 bg-[#00C2FF] text-white rounded-lg hover:bg-[#00A8E6]">
          Exporter en CSV
        </button>
      </div>
    </div>
  );
}

interface DerushModuleProps {
  filename: string;
}

export default function DerushModule({ filename }: DerushModuleProps) {
  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6">
        <h3 className="text-xl mb-2">Derush - {filename}</h3>
        <p className="text-[var(--text-muted)]">
          Visualisez le spectrogramme et sélectionnez les zones d'intérêt
        </p>
      </div>

      {/* Spectrogram Placeholder */}
      <div className="flex-1 bg-[var(--waveform-bg)] border border-[var(--app-border)] rounded-lg p-8 flex items-center justify-center">
        <div className="text-center text-[var(--text-muted)]">
          <div className="text-4xl mb-4">📊</div>
          <p>Spectrogramme</p>
          <p className="text-sm mt-2">Fréquence (kHz) vs Temps (s)</p>
        </div>
      </div>

      {/* Waveform Placeholder */}
      <div className="mt-4 h-24 bg-[var(--waveform-bg)] border border-[var(--app-border)] rounded-lg p-4 flex items-center justify-center">
        <div className="text-center text-[var(--text-muted)]">
          <p className="text-sm">Forme d'onde</p>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center gap-4">
        <button className="px-4 py-2 bg-[var(--app-panel)] border border-[var(--app-border)] rounded-lg hover:bg-[var(--accent)]">
          ▶️ Play
        </button>
        <button className="px-4 py-2 bg-[#00C2FF] text-white rounded-lg hover:bg-[#00A8E6]">
          Sélectionner une zone
        </button>
      </div>
    </div>
  );
}

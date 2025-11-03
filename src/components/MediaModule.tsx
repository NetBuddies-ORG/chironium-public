interface MediaModuleProps {
  onFileSelect: (filename: string) => void;
  selectedFile: string | null;
}

export default function MediaModule({ onFileSelect, selectedFile }: MediaModuleProps) {
  const files = [
    { name: 'BAT_001.wav', date: '15 Oct 2024', duration: '45s', size: '2.1 MB' },
    { name: 'BAT_002.wav', date: '15 Oct 2024', duration: '38s', size: '1.8 MB' },
    { name: 'BAT_003.wav', date: '15 Oct 2024', duration: '52s', size: '2.4 MB' },
    { name: 'BAT_004.wav', date: '14 Oct 2024', duration: '41s', size: '1.9 MB' },
    { name: 'BAT_005.wav', date: '14 Oct 2024', duration: '49s', size: '2.3 MB' },
  ];

  return (
    <div className="p-4 space-y-2">
      {files.map((file) => (
        <button
          key={file.name}
          onClick={() => onFileSelect(file.name)}
          className={`w-full p-3 rounded-lg text-left transition-all ${
            selectedFile === file.name
              ? 'bg-[#00C2FF]/20 border border-[#00C2FF]'
              : 'bg-[var(--app-bg)] border border-[var(--app-border)] hover:border-[#00C2FF]'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span>🎵</span>
            <span className="flex-1 truncate">{file.name}</span>
          </div>
          <div className="text-sm text-[var(--text-muted)]">
            {file.duration} · {file.size}
          </div>
        </button>
      ))}
    </div>
  );
}

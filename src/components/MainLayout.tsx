import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import MediaModule from './MediaModule';
import DerushModule from './DerushModule';
import AnalysisModule from './AnalysisModule';
import InterpretationModule from './InterpretationModule';

interface MainLayoutProps {
  projectName: string;
  onClose: () => void;
}

type SecondaryTab = 'derush' | 'analysis' | 'interpretation' | null;

export default function MainLayout({ projectName, onClose }: MainLayoutProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [secondaryTab, setSecondaryTab] = useState<SecondaryTab>(null);
  const { theme, toggleTheme } = useTheme();

  const handleFileSelect = (filename: string) => {
    setSelectedFile(filename);
    if (!secondaryTab) {
      setSecondaryTab('derush');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--app-bg)]">
      {/* Header */}
      <header className="h-14 border-b border-[var(--app-border)] bg-[var(--app-panel)] flex items-center px-4">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-lg">⚡ Chironium</span>
          <span className="text-[var(--text-muted)]">|</span>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--foreground)]"
          >
            ← {projectName}
          </button>
        </div>
        <button
          onClick={toggleTheme}
          className="px-3 py-1.5 rounded hover:bg-[var(--accent)]"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Media (always visible) */}
        <div className="w-80 border-r border-[var(--app-border)] bg-[var(--app-panel)] flex flex-col">
          <div className="h-12 border-b border-[var(--app-border)] flex items-center px-4">
            <h2 className="text-lg">📁 Media</h2>
          </div>
          <div className="flex-1 overflow-auto">
            <MediaModule 
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
            />
          </div>
        </div>

        {/* Right Panel - Secondary Flow */}
        <div className="flex-1 flex flex-col">
          {selectedFile ? (
            <>
              {/* Tabs */}
              <div className="h-12 border-b border-[var(--app-border)] bg-[var(--app-panel)] flex items-center px-4 gap-2">
                <button
                  onClick={() => setSecondaryTab('derush')}
                  className={`px-4 py-2 rounded ${
                    secondaryTab === 'derush'
                      ? 'bg-[var(--accent)] text-[var(--foreground)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  🎬 Derush
                </button>
                <button
                  onClick={() => setSecondaryTab('analysis')}
                  className={`px-4 py-2 rounded ${
                    secondaryTab === 'analysis'
                      ? 'bg-[var(--accent)] text-[var(--foreground)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  📊 Analyse
                </button>
                <button
                  onClick={() => setSecondaryTab('interpretation')}
                  className={`px-4 py-2 rounded ${
                    secondaryTab === 'interpretation'
                      ? 'bg-[var(--accent)] text-[var(--foreground)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  🔍 Interprétation
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto">
                {secondaryTab === 'derush' && <DerushModule filename={selectedFile} />}
                {secondaryTab === 'analysis' && <AnalysisModule filename={selectedFile} />}
                {secondaryTab === 'interpretation' && <InterpretationModule filename={selectedFile} />}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[var(--text-muted)]">
              <div className="text-center">
                <div className="text-6xl mb-4">📁</div>
                <p>Sélectionnez un fichier audio pour commencer</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

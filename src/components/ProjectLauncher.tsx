import { useState } from 'react';
import { useTheme } from './ThemeProvider';

interface ProjectLauncherProps {
  onProjectSelect: (projectName: string) => void;
}

export default function ProjectLauncher({ onProjectSelect }: ProjectLauncherProps) {
  const [showNewProject, setShowNewProject] = useState(false);
  const [projectName, setProjectName] = useState('');
  const { theme, toggleTheme } = useTheme();

  const recentProjects = [
    { name: 'Forêt de Fontainebleau 2024', date: '15 Oct 2024', files: 342 },
    { name: 'Parc naturel des Volcans', date: '08 Oct 2024', files: 189 },
    { name: 'Vallée de la Loire', date: '01 Oct 2024', files: 456 },
  ];

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim()) {
      onProjectSelect(projectName);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--app-bg)]">
      {/* Header */}
      <header className="border-b border-[var(--app-border)] bg-[var(--app-panel)]">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl">⚡ Chironium</span>
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg hover:bg-[var(--accent)]"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl mb-8">Projets</h1>

          {/* New Project Button */}
          <button
            onClick={() => setShowNewProject(true)}
            className="w-full mb-8 p-8 border-2 border-dashed border-[var(--app-border)] rounded-lg hover:border-[#00C2FF] hover:bg-[var(--accent)] transition-all"
          >
            <div className="text-4xl mb-2">+</div>
            <div className="text-lg">Nouveau projet</div>
          </button>

          {/* Recent Projects */}
          <h2 className="text-xl mb-4">Projets récents</h2>
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <button
                key={project.name}
                onClick={() => onProjectSelect(project.name)}
                className="w-full p-6 bg-[var(--app-panel)] border border-[var(--app-border)] rounded-lg hover:border-[#00C2FF] text-left transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg mb-1">{project.name}</h3>
                    <p className="text-[var(--text-muted)]">
                      {project.files} fichiers · Modifié le {project.date}
                    </p>
                  </div>
                  <span className="text-2xl">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* New Project Dialog */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--app-panel)] border border-[var(--app-border)] rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl mb-6">Nouveau projet</h2>
            <form onSubmit={handleCreateProject}>
              <div className="mb-6">
                <label className="block mb-2">Nom du projet</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-2 bg-[var(--app-bg)] border border-[var(--app-border)] rounded-lg"
                  placeholder="Ex: Forêt de Fontainebleau 2024"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewProject(false)}
                  className="flex-1 px-4 py-2 border border-[var(--app-border)] rounded-lg hover:bg-[var(--accent)]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#00C2FF] text-white rounded-lg hover:bg-[#00A8E6]"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { PlusCircle, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onAddDefaultHabits: () => void;
}

export default function EmptyState({ onAddDefaultHabits }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-mono-border rounded-xl bg-mono-surface/30 my-8">
      <div className="p-4 rounded-full border border-mono-border bg-mono-surface text-mono-secondary mb-4">
        <Sparkles className="w-8 h-8 text-mono-primary" />
      </div>
      
      <h3 className="text-xl font-display font-bold text-mono-primary mb-2">
        Start Your Routine
      </h3>
      <p className="text-sm text-mono-secondary max-w-sm mb-6 leading-relaxed">
        You don't have any habits configured for this month. Create your own habit above or start with our foundational habits.
      </p>

      <button
        onClick={onAddDefaultHabits}
        className="flex items-center gap-2 px-5 py-2.5 bg-mono-surface hover:bg-mono-elevated border border-mono-border hover:border-mono-border-hover text-sm font-medium text-mono-primary rounded-lg transition-all active:scale-98 cursor-pointer"
      >
        <PlusCircle className="w-4 h-4 text-white" />
        Populate core habits
      </button>
    </div>
  );
}

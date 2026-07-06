import { Check, Loader2, AlertCircle } from 'lucide-react';
import { SaveStatus } from '../types';

interface SaveIndicatorProps {
  status: SaveStatus;
}

export default function SaveIndicator({ status }: SaveIndicatorProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-mono-border bg-mono-surface text-xs font-mono select-none transition-all duration-300">
      {status === 'saving' && (
        <>
          <Loader2 className="w-3.5 h-3.5 text-mono-secondary animate-spin" />
          <span className="text-mono-secondary">Saving...</span>
        </>
      )}
      {status === 'saved' && (
        <>
          <Check className="w-3.5 h-3.5 text-white" />
          <span className="text-mono-primary">Saved</span>
        </>
      )}
      {status === 'error' && (
        <>
          <AlertCircle className="w-3.5 h-3.5 text-white font-bold" />
          <span className="text-white font-medium">Save Error</span>
        </>
      )}
    </div>
  );
}

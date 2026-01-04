import { motion } from 'framer-motion'

interface DNAVisualizerProps {
  scores: Record<string, number>
}

export default function DNAVisualizer({ scores }: DNAVisualizerProps) {
  return (
    <div className="space-y-4 py-2">
      <div className="flex justify-between items-end mb-2">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
          AI Logic Breakdown
        </h4>
        <span className="text-[9px] font-mono text-foreground/30 uppercase">
          Neural Alignment: Active
        </span>
      </div>
      
      <div className="space-y-3">
        {Object.entries(scores).map(([label, value], index) => (
          <div key={label} className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-medium">
              <span className="text-foreground/50">{label}</span>
              <span className="font-mono text-primary">{value}%</span>
            </div>
            <div className="h-1 w-full bg-foreground/5 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "circOut" }}
                className="h-full bg-primary relative"
              >
                {/* Subtle Glow on the bar */}
                <div className="absolute inset-0 bg-white/20 blur-[2px]" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-foreground/5">
        <div className="flex items-center gap-2">
           <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
           <p className="text-[9px] italic text-foreground/40 leading-tight">
             The Cinematic Archivist has mapped your current emotional frequency 
             against this title's narrative spectrum.
           </p>
        </div>
      </div>
    </div>
  )
}

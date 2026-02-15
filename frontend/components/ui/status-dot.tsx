
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const dotVariants = cva(
  "relative inline-flex h-2 w-2 rounded-full z-10",
  {
    variants: {
      status: {
        NEW: "bg-white",
        INPROGRESS: "bg-yellow-500",
        DELAYED: "bg-red-500",
        COMPLETED: "bg-green-500",
      },
    },
    defaultVariants: {
      status: "NEW",
    },
  }
);

const pulseVariants = cva(
  "absolute rounded-full",
  {
    variants: {
      status: {
        NEW: "bg-white/40",
        INPROGRESS: "bg-yellow-400/50",
        DELAYED: "bg-red-400/50",
        COMPLETED: "bg-green-400/50",
      },
    },
  }
);

interface StatusDotProps extends VariantProps<typeof dotVariants> {
  className?: string;
  showPulse?: boolean;
}

export function StatusDot({ status, className, showPulse = true, }: StatusDotProps) {
  return (
    <span className="relative inline-flex items-center justify-center">
      {showPulse && (
        <>
          {/* soft glow */}
          <span
            className={cn(
              "absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm opacity-40",
              pulseVariants({ status })
            )}
          />

          {/* animated ping */}
          <span
            className={cn(
              "absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-75 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]",
              pulseVariants({ status })
            )}
          />
        </>
      )}

      {/* center dot */}
      <span className={cn(dotVariants({ status }), className)} />
    </span>
  );
}

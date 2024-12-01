import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FlowStep {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
}

interface FlowChartProps {
  flowSteps: FlowStep[];
}

export function FlowChart({ flowSteps }: FlowChartProps) {
  return (
    <section className="container mx-auto px-4 py-16 max-w-5xl">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative rounded-3xl p-8">
          <div className="flex justify-between items-center relative">
            {flowSteps.map((step: FlowStep, index: number) => (
              <motion.div
                key={index}
                className="flex-1 text-center px-4 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Step Number */}
                <motion.div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2
                    w-8 h-8 rounded-full bg-[#008766] text-white 
                    flex items-center justify-center text-sm font-semibold"
                  whileHover={{ scale: 1.1 }}
                >
                  {index + 1}
                </motion.div>

                {/* Icon Container */}
                <motion.div
                  className={`w-24 h-24 mx-auto mb-6 rounded-xl 
                    bg-white dark:bg-gray-800 shadow-lg
                    flex items-center justify-center relative
                    border border-gray-100 dark:border-gray-700`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="w-12 h-12 text-[#008766]" />
                </motion.div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>

                {/* Connector Line */}
                {index < flowSteps.length - 1 && (
                  <div className="absolute top-[4rem] left-[60%] w-[80%] h-[2px]">
                    <motion.div
                      className="h-full bg-[#008766]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: index * 0.3 }}
                    />
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2
                      w-2 h-2 rounded-full bg-[#008766]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
} 
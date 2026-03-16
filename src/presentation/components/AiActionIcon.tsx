import { ActionIcon, Tooltip } from '@mantine/core';
import type { ActionIconProps } from '@mantine/core';
import { IconSparkles, IconLoader2 } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AiActionIconProps extends ActionIconProps {
  onClick: () => void;
  loading?: boolean;
  tooltip?: string;
}

export function AiActionIcon({ onClick, loading, tooltip = "Melhorar com IA", ...others }: AiActionIconProps) {
  return (
    <Tooltip label={tooltip} withArrow position="top">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ActionIcon
          onClick={onClick}
          size="lg"
          variant="gradient"
          gradient={{ from: 'cyan', to: 'indigo', deg: 45 }}
          radius="md"
          loading={loading}
          loaderProps={{ children: <IconLoader2 size={18} className="animate-spin" /> }}
          style={{
            boxShadow: '0 0 10px rgba(6, 187, 211, 0.4)',
            border: 'none'
          }}
          disabled={loading}
          {...others}
        >
          <AnimatePresence mode="wait">
            {loading ? (
               <motion.div
                 key="loading"
                 initial={{ opacity: 0, rotate: 0 }}
                 animate={{ opacity: 1, rotate: 360 }}
                 exit={{ opacity: 0 }}
                 transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
               >
                 <IconLoader2 size={18} />
               </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <IconSparkles size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </ActionIcon>
      </motion.div>
    </Tooltip>
  );
}

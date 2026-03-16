import { TextInput, Paper, Text, Group, Kbd, rem, ActionIcon } from '@mantine/core';
import { IconSparkles, IconCommand, IconArrowUp } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useCopilot } from '../../application/context/CopilotContext';

export function SmartPrompt() {
  const { promptValue, setPromptValue } = useCopilot();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Paper 
        p="xs" 
        radius="100px" 
        withBorder 
        shadow="xl"
        style={{
          maxWidth: rem(800),
          margin: '0 auto',
          background: 'light-dark(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.05))',
          backdropFilter: 'blur(10px)',
          borderColor: 'light-dark(var(--mantine-color-gray-3), rgba(255, 255, 255, 0.1))',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}
      >
        <TextInput
          placeholder="Olá! O que vamos fazer hoje? Tente '+ checkin vendas 70%'"
          size="xl"
          variant="unstyled"
          value={promptValue}
          onChange={(e) => setPromptValue(e.currentTarget.value)}
          styles={{
            input: {
              fontSize: rem(20),
              fontWeight: 500,
              paddingLeft: rem(50),
              color: 'light-dark(var(--mantine-color-gray-8), var(--mantine-color-dark-0))',
              height: rem(60)
            }
          }}
          leftSection={
             <IconSparkles 
               size={24} 
               style={{ marginLeft: rem(15), color: 'var(--mantine-color-farol-blue-6)' }} 
             />
          }
          rightSection={
            <Group gap="xs" style={{ marginRight: rem(10) }}>
              <Group gap={4} visibleFrom="sm" mr="xs" style={{ opacity: 0.3 }}>
                 <Kbd size="xs" style={{ background: 'transparent', border: 'none' }}>Ctrl</Kbd>
                 <Kbd size="xs" style={{ background: 'transparent', border: 'none' }}>K</Kbd>
              </Group>
              <ActionIcon 
                variant="filled" 
                color="farol-blue" 
                radius="xl" 
                size="lg"
                onClick={() => console.log('Sending command:', promptValue)}
                style={{ boxShadow: '0 4px 10px rgba(3, 169, 244, 0.3)' }}
              >
                <IconArrowUp size={20} stroke={2.5} />
              </ActionIcon>
            </Group>
          }
          rightSectionWidth={130}
        />
      </Paper>
      
      <Group justify="center" mt="md">
         <Text size="xs" c="dimmed" fw={600} style={{ display: 'flex', alignItems: 'center', gap: rem(4) }}>
            <IconCommand size={14} /> Digite "+" para comandos rápidos
         </Text>
      </Group>

    </motion.div>
  );
}

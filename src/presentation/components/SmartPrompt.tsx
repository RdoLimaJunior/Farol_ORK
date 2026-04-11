import { TextInput, Paper, Text, Group, Kbd, rem, ActionIcon, Loader, Stack, Transition, ThemeIcon, Button, Box } from '@mantine/core';
import { IconSparkles, IconCommand, IconArrowUp, IconSparkles as IconAI } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useCopilot } from '../../application/context/CopilotContext';

export function SmartPrompt() {
  const { promptValue, setPromptValue, currentSuggestion, loading, executeCommand } = useCopilot();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && promptValue) {
      executeCommand(promptValue);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Transition mounted={!!currentSuggestion} transition="pop-bottom-left" duration={200} timingFunction="ease">
        {(styles) => currentSuggestion ? (
          <Paper 
            withBorder 
            p="md" 
            radius="lg" 
            mb="xs" 
            style={{ 
              ...styles,
              maxWidth: rem(600), 
              margin: '0 auto 10px',
              zIndex: 10,
              boxShadow: '0 -15px 30px rgba(0,0,0,0.15)',
              borderTop: '3px solid var(--mantine-color-farol-blue-6)'
            }}
          >
            <Stack gap="xs">
              <Group justify="space-between" align="flex-start" wrap="nowrap">
                <Group gap="sm" align="flex-start" wrap="nowrap">
                  <ThemeIcon color="farol-blue" variant="light" size="lg" radius="md">
                    <IconAI size={20} />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text fw={700} size="sm">{currentSuggestion.text}</Text>
                    <Text size="xs" c="dimmed">{currentSuggestion.explanation}</Text>
                  </Stack>
                </Group>
                <Button 
                  size="compact-xs" 
                  variant="light" 
                  color="farol-blue" 
                  radius="xl"
                  onClick={() => executeCommand(currentSuggestion.text, true)}
                >
                  Confirmar
                </Button>
              </Group>

              {currentSuggestion.alternatives && currentSuggestion.alternatives.length > 0 && (
                <Box mt="xs" pt="xs" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                  <Text size="xs" c="dimmed" mb={5} fw={600}>Outras opções sugeridas pela metodologia:</Text>
                  <Stack gap={5}>
                    {currentSuggestion.alternatives.map((alt, index) => (
                      <Paper 
                        key={index}
                        p="xs" 
                        radius="md" 
                        withBorder
                        onClick={() => executeCommand(alt, true)}
                        style={{ 
                          cursor: 'pointer',
                          background: 'var(--mantine-color-default-hover)',
                          transition: 'all 0.2s'
                        }}
                      >
                        <Group justify="space-between" wrap="nowrap">
                          <Text size="xs" fw={500}>{alt}</Text>
                          <IconArrowUp size={12} style={{ opacity: 0.5 }} />
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </Paper>
        ) : null}
      </Transition>

      <Paper 
        p={4} 
        radius="xl" 
        withBorder 
        shadow="md"
        style={{
          maxWidth: rem(600),
          margin: '0 auto',
          background: 'var(--mantine-color-body)',
          backdropFilter: 'blur(10px)',
          borderColor: 'var(--mantine-color-default-border)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}
      >
        <TextInput
          placeholder="Olá! O que vamos fazer hoje? Tente '+ checkin vendas 70%'"
          size="lg"
          variant="unstyled"
          value={promptValue}
          onChange={(e) => setPromptValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          styles={{
            input: {
              fontSize: rem(16),
              fontWeight: 500,
              paddingLeft: rem(40),
              color: 'var(--mantine-color-text)',
              height: rem(44)
            }
          }}
          leftSection={
             loading ? <Loader size="xs" /> :
             <IconSparkles 
               size={18} 
               style={{ marginLeft: rem(10), color: 'var(--mantine-color-farol-blue-6)' }} 
             />
          }
          rightSection={
            <Group gap={4} style={{ marginRight: rem(10) }}>
              <ActionIcon 
                variant="filled" 
                color="farol-blue" 
                radius="xl" 
                size="md"
                onClick={() => executeCommand(promptValue)}
                disabled={!promptValue || loading}
                loading={loading}
              >
                <IconArrowUp size={16} stroke={2.5} />
              </ActionIcon>
            </Group>
          }
          rightSectionWidth={100}
        />
      </Paper>
      
      <Group justify="center" mt={4}>
         <Text size="xs" c="dimmed" fw={600} style={{ display: 'flex', alignItems: 'center', gap: rem(4) }}>
            <IconCommand size={12} /> Digite "+" para comandos rápidos
         </Text>
      </Group>

    </motion.div>
  );
}

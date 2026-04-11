import { Box, Container, Stack, rem } from '@mantine/core';
import { SmartPrompt } from '../SmartPrompt';
import { QuickActionChips } from './QuickActionChips';

export function TimoneiroFooter() {
  return (
    <Box 
      component="footer"
      style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 'var(--mantine-navbar-width, 0)', 
        width: 'calc(100% - var(--mantine-navbar-width, 0px))',
        zIndex: 100,
        paddingBottom: rem(20),
        paddingTop: rem(40),
        pointerEvents: 'none',
        transition: 'all 200ms ease'
      }}
    >
      <Container size="xl" style={{ pointerEvents: 'auto' }}>
        <Stack gap={4} align="center">
          <Box style={{ width: '100%', maxWidth: rem(800) }}>
            <QuickActionChips />
            <SmartPrompt />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

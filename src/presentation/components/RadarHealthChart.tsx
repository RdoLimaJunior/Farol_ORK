import { Paper, Title, Text, Stack, Group, ThemeIcon, Box } from '@mantine/core';
import { IconActivity, IconInfoCircle } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface RadarHealthChartProps {
  data: {
    dimension: string;
    score: number;
  }[];
  title?: string;
}

export function RadarHealthChart({ data, title = "Saúde do OKR" }: RadarHealthChartProps) {
  const chartData = data && data.length > 0 ? data : [
    { dimension: 'Progresso', score: 0 },
    { dimension: 'Confiança', score: 0 },
    { dimension: 'Engajamento', score: 0 },
    { dimension: 'Alinhamento', score: 0 },
    { dimension: 'Qualidade', score: 0 },
  ];

  const size = 300;
  const center = size / 2;
  const radius = (size / 2) * 0.7;
  const angleStep = (Math.PI * 2) / chartData.length;

  // Gerar os pontos do polígono
  const points = chartData.map((d, i) => {
    const r = (d.score / 100) * radius;
    const x = center + r * Math.sin(i * angleStep);
    const y = center - r * Math.cos(i * angleStep);
    return `${x},${y}`;
  }).join(' ');

  // Gerar as linhas dos eixos e labels
  const axes = chartData.map((d, i) => {
    const x = center + radius * Math.sin(i * angleStep);
    const y = center - radius * Math.cos(i * angleStep);
    const labelX = center + (radius + 25) * Math.sin(i * angleStep);
    const labelY = center - (radius + 15) * Math.cos(i * angleStep);
    
    return { x, y, labelX, labelY, label: d.dimension };
  });

  // Níveis do grid (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <Paper withBorder p="xl" radius="md" style={{ position: 'relative', overflow: 'hidden' }}>
      <Box style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '4px', 
          height: '100%', 
          background: 'linear-gradient(to bottom, var(--mantine-color-blue-6), var(--mantine-color-cyan-4))' 
      }} />
      
      <Stack gap="xl">
        <Group justify="space-between">
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue" size="lg" radius="md">
              <IconActivity size={20} />
            </ThemeIcon>
            <Stack gap={0}>
                <Title order={4} fw={800}>{title}</Title>
                <Text size="xs" c="dimmed" fw={500}>Análise multidimensional de performance</Text>
            </Stack>
          </Group>
          <ThemeIcon variant="subtle" color="gray" size="sm">
            <IconInfoCircle size={16} />
          </ThemeIcon>
        </Group>

        <Box style={{ display: 'flex', justifyContent: 'center', height: size }}>
          <svg width={size} height={size} style={{ overflow: 'visible' }}>
            {/* Grid Levels */}
            {gridLevels.map((lvl, idx) => {
              const r = lvl * radius;
              const gridPoints = chartData.map((_, i) => {
                const x = center + r * Math.sin(i * angleStep);
                const y = center - r * Math.cos(i * angleStep);
                return `${x},${y}`;
              }).join(' ');
              
              return (
                <polygon
                   key={idx}
                   points={gridPoints}
                   fill="none"
                   stroke="var(--mantine-color-gray-2)"
                   strokeWidth="1"
                   strokeDasharray={idx === 4 ? "0" : "4 2"}
                />
              );
            })}

            {/* Axes */}
            {axes.map((axis, i) => (
              <g key={i}>
                <line
                  x1={center}
                  y1={center}
                  x2={axis.x}
                  y2={axis.y}
                  stroke="var(--mantine-color-gray-2)"
                  strokeWidth="1"
                />
                <text
                  x={axis.labelX}
                  y={axis.labelY}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--mantine-color-gray-6)"
                  style={{ textTransform: 'uppercase' }}
                >
                  {axis.label}
                </text>
              </g>
            ))}

            {/* Radar Polygon */}
            <motion.polygon
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              points={points}
              fill="var(--mantine-color-blue-1)"
              fillOpacity="0.4"
              stroke="var(--mantine-color-blue-6)"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {chartData.map((d, i) => {
              const r = (d.score / 100) * radius;
              const x = center + r * Math.sin(i * angleStep);
              const y = center - r * Math.cos(i * angleStep);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="var(--mantine-color-blue-6)"
                />
              );
            })}
          </svg>
        </Box>

        <Stack gap="xs" mt="md">
           <Text size="xs" fw={700} c="dimmed">SOBRE AS PROPORÇÕES</Text>
           <Text size="xs" lh={1.5} c="dimmed">
             O radar avalia <b>Progresso</b>, <b>Confiança</b>, <b>Engajamento</b> (cadência), 
             <b>Alinhamento</b> (árvore) e <b>Qualidade</b> (descrição e KRs). Um equilíbrio 
             nestas áreas garante uma execução saudável e sustentável.
           </Text>
        </Stack>
      </Stack>
    </Paper>
  );
}

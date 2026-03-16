# 🚀 Guia de Deploy - FAROL ORK

Este guia fornece as instruções necessárias para publicar o projeto FAROL ORK na **Vercel** integrado com o **Supabase**.

## 1. Banco de Dados (Supabase)

Antes de fazer o deploy do front-end, certifique-se de que todas as migrações foram aplicadas no seu projeto Supabase:

1. Acesse o **SQL Editor** no dashboard do Supabase.
2. Copie e cole o conteúdo dos arquivos na pasta `supabase/migrations/` na ordem numérica:
   - `001_create_tables.sql`
   - `002_auth_updates.sql`
   - `003_create_cycles.sql`
   - `004_create_initiatives.sql` (Correção do Plano de Ação)

## 2. Deploy na Vercel

### Opção A: Via Dashboard (Recomendado)

1. Conecte seu repositório GitHub à Vercel.
2. Nas configurações de **Environment Variables** (Variáveis de Ambiente), adicione:
   - `VITE_SUPABASE_URL`: Sua URL do Supabase (ex: `https://xyz.supabase.co`)
   - `VITE_SUPABASE_ANON_KEY`: Sua chave anônima (anon/public)
3. Clique em **Deploy**. A Vercel detectará automaticamente o Vite e executará `npm run build`.

### Opção B: Via CLI

```bash
npm install -g vercel
vercel
```

## 3. Configurações Importantes

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: `./`

## 4. Pós-Deploy

Após o deploy, você pode usar o botão **"Popular MVP com Dados"** na página de **Configurações** para gerar dados de teste (membros, OKRs e KRs) e ver o sistema funcionando plenamente.

---
*O arquivo `vercel.json` já está configurado na raiz para lidar com as rotas do React Router (SPA).*

/**
 * Script para testar a conexão com o Supabase
 * Execute com: npx tsx scripts/test-supabase.ts
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxugoopdrnptxbdlrqbv.supabase.co';
const supabaseAnonKey = 'sb_publishable_Az1euA7l6CNuIzGXUvwQQw_tYk-cTM6';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🔌 Testando conexão com Supabase...\n');

  // Test 1: Verificar se o projeto responde
  try {
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    if (error) {
      console.log('❌ Tabela profiles:', error.message);
    } else {
      console.log('✅ Tabela profiles: OK');
    }
  } catch (e: any) {
    console.log('❌ Erro de conexão:', e.message);
  }

  // Test 2: Verificar tabelas
  const tables = ['objectives', 'key_results', 'kr_updates', 'critical_analyses'];
  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select('count', { count: 'exact', head: true });
      if (error) {
        console.log(`❌ Tabela ${table}: ${error.message}`);
      } else {
        console.log(`✅ Tabela ${table}: OK`);
      }
    } catch (e: any) {
      console.log(`❌ Tabela ${table}: ${e.message}`);
    }
  }

  // Test 3: Auth check
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log('\n🔑 Supabase Auth:', error ? `❌ ${error.message}` : '✅ Serviço ativo');
  } catch (e: any) {
    console.log('❌ Auth:', e.message);
  }

  console.log('\n🏁 Teste concluído!');
}

testConnection();

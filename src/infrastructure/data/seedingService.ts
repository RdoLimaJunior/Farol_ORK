import { supabase } from '../supabaseClient';
import demoMembers from './demo_members.json';

// Migration 002 uses ...00000001 for the default tenant
const TENANT_ID = '00000000-0000-0000-0000-000000000001';

export async function seedDemoData() {
  console.log('Starting demo data seeding...');

  try {
    // 0. Get current user to avoid overwriting real user (optional — safe to be null in mock mode)
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user ?? null;

    // 1. Create Profiles
    const profileInserts = demoMembers.map(member => ({
      id: member.id,
      tenant_id: TENANT_ID,
      full_name: member.full_name,
      email: `${member.full_name.toLowerCase().replace(/\s+/g, '.')}@idibra.com.br`,
      job_title: member.job_title,
      department: member.department,
      role: member.role,
      is_active: true,
      xp_points: Math.floor(Math.random() * 2000) + 50,
      level: 1
    })).filter(p => !user || p.email !== user.email); // Don't overwrite the real current user

    // Using { onConflict: 'id' } because 'id' is the PRIMARY KEY and has a built-in unique constraint.
    // This solves the "no unique constraint matching ON CONFLICT" error.
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .upsert(profileInserts, { onConflict: 'id' })
      .select();

    if (profileError) throw profileError;
    console.log(`${profiles?.length} profiles seeded/updated.`);

    // 2. Assign OKRs
    const { data: objectives, error: objError } = await supabase
      .from('objectives')
      .select('*');

    if (objError) throw objError;

    if (objectives && objectives.length > 0 && profiles) {
      const updates = objectives.map((obj, index) => ({
        ...obj, // Spread all existing fields to avoid nulling required columns
        owner_id: profiles[index % profiles.length].id
      }));

      const { error: updateError } = await supabase
        .from('objectives')
        .upsert(updates, { onConflict: 'id' });

      if (updateError) throw updateError;
      console.log('Objectives ownership assigned.');
    }

    // 3. Assign KRs
    const { data: krs, error: krError } = await supabase
      .from('key_results')
      .select('*');

    if (krError) throw krError;

    if (krs && krs.length > 0 && profiles) {
      const krUpdates = krs.map((kr, index) => ({
        ...kr, // Spread all existing fields
        owner_id: profiles[(index + 5) % profiles.length].id
      }));

      const { error: krUpdateError } = await supabase
        .from('key_results')
        .upsert(krUpdates, { onConflict: 'id' });

      if (krUpdateError) throw krUpdateError;
      console.log('Key Results ownership assigned.');
    }

    return { success: true, count: profiles?.length };
  } catch (err: any) {
    console.error('Seeding error detail:', err);
    // Mostramos o erro real do Postgres para debugar a coluna exata
    const errorMsg = err.details || err.message || JSON.stringify(err);
    return { success: false, error: `Erro Técnico: ${errorMsg}` };
  }
}

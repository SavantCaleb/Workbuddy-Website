import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://setzoqzlfaxvngoswxkl.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_RA2XPUDhMS7Ll7v7mq6p5Q_2ChCPV9V';

export const supabase = createClient(supabaseUrl, supabaseKey);

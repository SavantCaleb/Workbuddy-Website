import { createClient } from '@supabase/supabase-js';

// These should ideally be in environment variables, but for this implementation
// we will use the provided values directly as requested for the task.
const supabaseUrl = 'https://setzoqzlfaxvngoswxkl.supabase.co';
const supabaseKey = 'sb_publishable_RA2XPUDhMS7Ll7v7mq6p5Q_2ChCPV9V';

export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://nplxdyrzyoqrqgkrncki.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbHhkeXJ6eW9xcnFna3JuY2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NjY3OTcsImV4cCI6MjA5NzQ0Mjc5N30.kkt284RBSOLnJw1Fcn26kBcFPSjHi1V3iIcn9XoIyKQ";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
  },
});

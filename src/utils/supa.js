import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://dqbspuwevfasuqsrfspl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxYnNwdXdldmZhc3Vxc3Jmc3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyODY2NjksImV4cCI6MjAzNjg2MjY2OX0.rY43MxITfPp8luI_12enyiIsZcDW9sJg2SA5ktonk1U'

export const apiCall = createClient(supabaseUrl, supabaseKey);

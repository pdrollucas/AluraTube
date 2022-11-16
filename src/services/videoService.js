import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://rmdeiqldtsnhuiuuffmm.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtZGVpcWxkdHNuaHVpdXVmZm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTQyMTEsImV4cCI6MTk4Mzc3MDIxMX0.4KhDXEAcyYHOjdbOk3wMTcNiy1F_M5RzR3eBOvBieFI";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService(){
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*")
                .order("created_at", { ascending: false });
        }
    }
}
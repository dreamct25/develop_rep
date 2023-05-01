// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;

use serde::{Serialize, Deserialize};
use sysinfo::{System, SystemExt};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[derive(Debug,Serialize, Deserialize)]
struct MemoryInfo {
    total_memory: f64,
    used_memory: f64,
    free_memory: f64,
    available_memory: f64
}

#[derive(Debug,Serialize, Deserialize)]
struct SysInfo {
    name: String,
    plantform: String,
    os_version: String,
    os_arch: String,
    memory: MemoryInfo,
    cpu_num: usize,
    cpu_num_thread: usize,
    cpu_info: String
}

#[tauri::command]
fn get_sys_info() -> String {
    let mut sys = System::new_all();

    sys.refresh_all();

    let mut result_obj:HashMap<&str, SysInfo> = HashMap::new();

    let computer_info = SysInfo {
        name: String::from(sys.host_name().unwrap().split(".").collect::<Vec<&str>>()[0]),
        plantform: sys.name().unwrap(),
        os_version: sys.os_version().unwrap(),
        os_arch: std::env::consts::ARCH.to_string(),
        memory: MemoryInfo { 
            total_memory: sys.total_memory() as f64 / 1073741824_f64, 
            used_memory: sys.used_memory() as f64 / 1073741824_f64, 
            free_memory: sys.free_memory() as f64 / 1073741824_f64,
            available_memory: sys.available_memory() as f64 / 1073741824_f64,
        
        },
        cpu_num: sys.physical_core_count().unwrap(),
        cpu_num_thread: sys.cpus().len(),
        cpu_info: serde_json::to_string(&*sys.global_cpu_info()).unwrap()
    };

    result_obj.insert("computer_info", computer_info);

    serde_json::to_string(&result_obj).unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_sys_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

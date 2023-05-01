// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod mysql_config;
use std::{collections::HashMap};
use chrono::{Local};

use mysql::{prelude::{Queryable}, params};
use mysql_config::{Person,MySqlConfig, Values};
use tauri::{Manager, Window};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]

fn test_db_connect(window:&Window) -> () {
    MySqlConfig::test_connect(window).unwrap()
}

#[tauri::command]
fn get_all_data() -> String{
    MySqlConfig::use_mysql::<String>(|connect|{
      let res = connect.query::<Person,&str>("SELECT * FROM person");

      match res {
        Ok(result) => {
            serde_json::to_string(&Values {
                message: format!("success"),
                data: result
            }).unwrap()
        },
        Err(err) => {
            println!("{}", err);
            let mut result_obj:HashMap<&str, String> = HashMap::new();
            result_obj.insert("message", format!("error:{}",err));
            serde_json::to_string(&result_obj).unwrap()
        }
    }
    })
}

#[tauri::command]
fn insert_data(name:String,old:i32) -> String {
    let mut result_obj:HashMap<&str, String> = HashMap::new();
    let mut connect = MySqlConfig::connect();
    let res:Result<Vec<Person>, mysql::Error> = connect.exec("INSERT INTO person(name,old,create_date,update_date) VALUES(:name,:old,:create_date,:update_date)" , params! {
        "name" => name,
        "old" => old,
        "create_date" => format!("{}",Local::now().to_string().split(".").collect::<Vec<&str>>()[0]),
        "update_date" => format!("{}",Local::now().to_string().split(".").collect::<Vec<&str>>()[0])
    });

    match res {
        Ok(_) => {
            result_obj.insert("message", "success".to_string());
            serde_json::to_string(&result_obj).unwrap()
        },
        Err(err) => {
            println!("{}", err);
            result_obj.insert("message",  format!("error:{}",err));
            serde_json::to_string(&result_obj).unwrap()
        }
    }
}

#[tauri::command]
fn update_data(uuid:i32,name:String,old:i32) -> String {
    let mut result_obj:HashMap<&str, String> = HashMap::new();
    let mut connect = MySqlConfig::connect();
    let res:Result<Vec<Person>, mysql::Error> = connect.exec("UPDATE person SET name = :name,old = :old,update_date = :update_date WHERE uuid = :uuid" , params! {
        "uuid" => uuid,
        "name" => name,
        "old" => old,
        "update_date" => format!("{}",Local::now().to_string().split(".").collect::<Vec<&str>>()[0])
    });

    match res {
        Ok(_) => {
            result_obj.insert("message", "success".to_string());
            serde_json::to_string(&result_obj).unwrap()
        },
        Err(err) => {
            println!("{}", err);
            result_obj.insert("message", format!("error:{}",err));
            serde_json::to_string(&result_obj).unwrap()
        }
    }
}

#[tauri::command]
fn delete_data(uuid:i32) -> String {
    let mut result_obj:HashMap<&str, String> = HashMap::new();
    let mut connect = MySqlConfig::connect();
    let res:Result<Vec<Person>, mysql::Error> = connect.exec("DELETE FROM person WHERE uuid = :uuid" , params! {
        "uuid" => uuid
    });

    match res {
        Ok(_) => {
            result_obj.insert("message", "success".to_string());
            serde_json::to_string(&result_obj).unwrap()
        },
        Err(err) => {
            println!("{}", err);
            result_obj.insert("message", format!("error:{}",err));
            serde_json::to_string(&result_obj).unwrap()
        }
    }
}

fn main() {
    tauri::Builder::default().setup(|setup| {
        let main_window = setup.get_window("main").unwrap();
        test_db_connect(&main_window);
        Ok(())
    })
    .invoke_handler(tauri::generate_handler![
        get_all_data,
        insert_data,
        update_data,
        delete_data
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

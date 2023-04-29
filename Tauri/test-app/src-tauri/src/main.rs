// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod mysql_config;

use mysql::{prelude::Queryable,params};

use mysql_config::{Msg,Person,MysqlConfig};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet() -> String {
    format!("Hello, {}! You've been greeted from Rust!", "gogo")
}

#[tauri::command]
fn print_some(say: bool) -> String {
    if say {
        format!("Hello Rust from backend")
    } else {
        format!("OMG false !!!")
    }
}

#[tauri::command]
fn get_all_data() -> String {
    let result_temp:Result<Vec<Person>, mysql::Error> = MysqlConfig::use_mysql().query_map("SELECT * FROM person",|(uuid,name,old,create_date,update_date)| Person {
        uuid,
        name,
        old,
        create_date,
        update_date
    });

    return match result_temp {
        Ok(res) => serde_json::to_string(&res).unwrap(),
        Err(err) => {
            let empty_array:Vec<Person> = vec![];
            println!("{}",err);
            serde_json::to_string(&empty_array).unwrap()
        }
    };
}

#[tauri::command]
fn create_person(name: &str,old:i32) -> String{
    let res_temp = MysqlConfig::use_mysql().exec_drop(
        "INSERT INTO person (name,old,create_date) VALUES(:name,:old,:create_date)",
        params! { 
            "name" => name, 
            "old" => old, 
            "create_date" => chrono::offset::Local::now().to_string().split(".").collect::<Vec<&str>>()[0]
        }
    );

    return match res_temp {
        Ok(()) => serde_json::to_string(&Msg { message: format!("create success") }).unwrap(),
        Err(err) => {
            println!("{}",err);
            serde_json::to_string(&Msg { message: format!("error reason : {}",err) }).unwrap()
        }
    };
}

#[tauri::command]
fn update_person(obj:Person) -> String{
    let res_temp = MysqlConfig::use_mysql().exec_drop(
        "UPDATE person SET name = :name,old = :old,update_date = :update_date WHERE uuid = :uuid",
        params! {
            "uuid" => obj.uuid,
            "name" => obj.name, 
            "old" => obj.old, 
            "update_date" => chrono::offset::Local::now().to_string().split(".").collect::<Vec<&str>>()[0],
        }
    );

    return match res_temp {
        Ok(()) => serde_json::to_string(&Msg { message: format!("update success") }).unwrap(),
        Err(err) => {
            println!("{}",err);
            serde_json::to_string(&Msg { message: format!("error reason : {}",err) }).unwrap()
        }
    };
}

#[tauri::command]
fn delete_person(uuid:i32) -> String{
    let res_temp = MysqlConfig::use_mysql().exec_drop(
        "DELETE FROM person WHERE uuid = :uuid",
        params! { "uuid" => uuid }
    );

    return match res_temp {
        Ok(()) => serde_json::to_string(&Msg { message: format!("delete success") }).unwrap(),
        Err(err) => {
            println!("{}",err);
            serde_json::to_string(&Msg { message: format!("error reason : {}",err) }).unwrap()
        }
    };
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            print_some,
            get_all_data,
            create_person,
            update_person,
            delete_person,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    }

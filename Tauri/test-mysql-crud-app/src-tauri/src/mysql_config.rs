use mysql::*;
use mysql::{prelude::{FromRow}};
use serde::{Serialize,Deserialize};
use tauri::{Window,api::{dialog::{message}}};

#[derive(Debug,Serialize, Deserialize)]
pub struct MySqlConfig {}

#[derive(Debug,Serialize, Deserialize)]
pub struct Person {
    pub uuid:i32,
    pub name:String,
    pub old:i32,
    pub create_date: String,
    pub update_date: String
}

#[derive(Debug,Serialize, Deserialize)]
pub struct Values<T> {
    pub message:String,
    pub data:Vec<T>
}


impl FromRow for Person {
    fn from_row_opt(row: Row) -> std::result::Result<Self, FromRowError>
    where
        Self: Sized {
        let (uuid, name, old, create_date, update_date) = mysql::from_row(row);
        Ok(Self {
            uuid,
            name,
            old,
            create_date,
            update_date,
        })
    }

    fn from_row(row: Row) -> Self
    where
        Self: Sized,
    {
        Self::from_row_opt(row).unwrap()
    }
}

impl MySqlConfig {
    pub fn test_connect(window: &Window) -> Result<()> {
        let url = "mysql://root:testDB123@localhost:1491/testDB";
        let _pool = Pool::new(url).map_err(|err| {
          message(Some(window), "Connect Pool Error", format!("Connect Pool Error, reason: {}", err.to_string()));
        });
        
        Ok(())
    }

    pub fn connect() -> PooledConn {
        let url = "mysql://root:testDB123@localhost:1491/testDB";
        let pool = Pool::new(url).map_err(|err| format!("Connect Pool Error, reason:{}",err.to_string()) );
        let use_connection = pool.unwrap().get_conn().map_err(|err| format!("Connect Error, reason:{}",err.to_string()));

        use_connection.unwrap()
    }

    pub fn use_mysql<T>(call_back:fn (connect:&mut PooledConn) -> T) -> T {
        call_back(&mut MySqlConfig::connect())
    }
}
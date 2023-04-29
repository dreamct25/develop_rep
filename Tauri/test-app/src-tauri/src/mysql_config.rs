use mysql::*;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Person {
    pub uuid:i32,
    pub name:String,
    pub old:i32,
    pub create_date:Option<String>,
    pub update_date:Option<String>
}

#[derive(Serialize, Deserialize)]
pub struct Msg {
    pub message:String
}

#[derive(Serialize, Deserialize)]
pub struct MysqlConfig {
}

impl MysqlConfig {

    pub fn use_mysql() -> PooledConn {
        let connect_str: &str = "mysql://root:testDB123@localhost:1491/newOne";

        let pool_connect: mysql::Pool = Pool::new(connect_str).unwrap();
        pool_connect.get_conn().unwrap()
    }
}
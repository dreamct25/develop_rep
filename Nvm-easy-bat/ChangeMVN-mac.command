#!/bin/sh

ANS=""

source ~/.nvm/nvm.sh;

echo $'\n--- CopyRight © 2023-02 Alex Chen. ---'

echo $'\n--- NVM Manager (可輸入 help 查看使用列表) ---'

while read -p "請輸入要使用的功能項目 : " ANS
do
    case $ANS in 
        i)
            echo $'\n'
            read -p "請輸入安裝版本 : " v
            nvm install $v
            echo $'\n'
            ;;
        uni)
            echo $'\n'
            read -p "請輸入移除版本 : " v
            nvm uninstall $v
            echo "Unistall Completed."
            echo $'\n'
            ;;
        c)
            echo $'\n'
            read -p "請輸入更換版本 : " v
            nvm alias default $v
            nvm use $v
            nvm use --delete-prefix v$v --silent
            echo $'\n'
            ;;
        nv)
            v=`node -v`
            echo $'\n'
            echo "Node 當前使用版本 : $v"
            echo $'\n'
            ;;
        ll)
            echo $'\n'
            echo "  目前已安裝 Node 版本"
            nvm ls
            echo $'\n'
            ;;
        lv)
            echo $'\n'
            echo "--- 目前可安裝 Node 版本列表 ---"
            nvm ls-remote
            echo $'\n'        
            ;;
        help)
            echo $"
Usage:

    i           :安裝新 Node 版本
    uni         :移除 Node 版本
    c           :更改 Node 版本
    nv          :顯示當前 Node 版本
    ll          :顯示已安裝 Node 版本列表
    lv          :顯示 Node 最新可安裝列表
    e           :關閉命令提示字元
            "
            ;;
        e)
            exec zsh
            ;;
        *)
            echo $'\n'
            echo "輸入指令錯誤請重新輸入"
            echo $'\n'
            ;;
    esac
done
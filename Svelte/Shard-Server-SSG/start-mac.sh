#!/bin/bash

ANS=''

echo $'\n'
echo "--- CopyRight © 2022-08 ~ 2024-06 Alex Chen. Beta v0.6.0 ---"
echo $'\n'

while read -p '(i = 安裝應用,r = 啟動網頁上傳服務,e = 離開) : ' ANS
do
    case $ANS in
        i)
            v=`node -v`

            if [ $v != '' ] 
            then
                echo "Node 已安裝 !"
            else
                curl https://nodejs.org/dist/v16.16.0/node-v16.16.0.pkg -o node-v16.16.0.pkg
                installer -pkg ./node-v16.16.0.pkg -target /
            fi
            ;;
        r)
            if [ ! -d ./node_modules ]
            then
                npm i
            fi

            v=`node -v`

            if [ $v != 'v16.16.0' ]
            then
                echo "Pleaes use Node v16.16.0 then try again ."
                exit
            fi

            if [ ! -f ./.env ]
            then
                echo 'VITE_APP_PLATFORM="darwin"' > .env
            fi

            read -p 'Open Upload Web ? (y/n) : ' ons

            if [ $ons = 'y' ]
            then
                npm run dev:open
            else
                npm run dev
            fi
            ;;
        e)
            echo $'\n'
            read -p '確定關閉命令提示字元 ? (y/n) : ' ans
            echo $'\n'

            if [ $ans = 'y' ]
            then
                exit
            fi
            ;;
        *)
            echo $'\n'
            echo 'error key'
            echo $'\n'
            ;;
    esac
done


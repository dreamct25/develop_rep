#!/bin/sh

ANS=""

source ~/.nvm/nvm.sh;

echo $'\nWhat do you want to do to NVM manager (typing "help" can see helper list) ?'

while read -p "Choose action : " ANS
do
    case $ANS in 
        i)
            echo $'\n'
            read -p "Install Version No.:" v
            nvm install $v
            echo $'\n'
            ;;
        uni)
            echo $'\n'
            read -p "Uninstall Version No.:" v
            nvm uninstall $v
            echo "Unistall Completed."
            echo $'\n'
            ;;
        c)
            echo $'\n'
            read -p "Change Version No.:" v
            nvm alias default $v
            nvm use $v
            nvm use --delete-prefix v$v --silent
            echo $'\n'
            ;;
        nv)
            v=`node -v`
            echo $'\n'
            echo "Your current node version is $v."
            echo $'\n'
            ;;
        ll)
            echo $'\n'
            nvm ls
            echo $'\n'
            ;;
        lv)
            echo $'\n'
            open https://nodejs.org/dist/
            echo $'\n'        
            ;;
        help)
            echo $"
Usage:

    i           :Install new node version
    uni         :Unistall old node version
    c           :Change node version
    nv          :Show current node version
    ll          :Show installed node version list
    lv          :show node all version
    e           :Exit cmd
            "
            ;;
        e)
            exec zsh
            ;;
        *)
            echo $'\n'
            echo "Wrong Keyword !!"
            echo $'\n'
            ;;
    esac
done
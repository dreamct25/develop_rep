@echo off
chcp 65001

echo.
echo --- CopyRight © 2023-02 Alex Chen. ---
echo.

net session >nul 2>&1

if NOT %errorLevel% == 0 (
    echo 提示訊息:請使用系統管理員開啟此批次檔
    call pause
    exit
) else (
    echo 提示訊息:已使用系統管理員開啟
    echo.
)

echo --- NVM Manager (可輸入 help 查看使用列表) ---
echo.

:default
    
    set /p ANS= 請輸入要使用的功能項目 : 

    if /i %ANS% == i goto actionI
    if /i %ANS% == uni goto actionII
    if /i %ANS% == c goto actionIII
    if /i %ANS% == nv goto actionIV
    if /i %ANS% == ll goto actionV
    if /i %ANS% == lv goto actionVI
    if /i %ANS% == help goto actionVII
    if /i %ANS% == e exit

    echo.
    echo 輸入指令錯誤請重新輸入
    echo.

    goto default
:actionI
    echo.
    set /p versionNum= 請輸入安裝版本 : 
    nvm install %versionNum%
    echo.
    goto default
:actionII
    echo.
    set /p versionNum= 請輸入移除版本 : 
    nvm uninstall %versionNum%
    echo.
    goto default
:actionIII
    echo.
    set /p versionNum= 請輸入更換版本 : 
    nvm use %versionNum%
    echo.
    goto default
:actionIV
    echo.
    for /f %%m in ('node -v') do set v=%%m
    echo Node 當前使用版本 : %v%
    echo.
    goto default
:actionV
    echo.
    echo   目前已安裝 Node 版本
    nvm ls
    echo.
    goto default
:actionVI
    echo.
    echo --- 目前可安裝 Node 版本列表 ---
    nvm list available
    echo.
    goto default
:actionVII
    echo.
    echo 可輸入指令列表 :
    echo.
    echo    i               :安裝新 Node 版本
    echo    uni             :移除 Node 版本
    echo    c               :更改 Node 版本
    echo    nv              :顯示當前 Node 版本
    echo    ll              :顯示已安裝 Node 版本列表
    echo    lv              :顯示 Node 最新可安裝列表
    echo    e               :關閉命令提示字元
    echo.
    goto default
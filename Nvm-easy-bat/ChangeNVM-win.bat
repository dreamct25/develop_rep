@echo off

net session >nul 2>&1

if NOT %errorLevel% == 0 (
    echo "Please Use Administrator To Open Bat."
    call pause
    exit
) else (
    echo "In Administrator Environment."
)

echo What Do you want to do to NVM manager (typing 'help' can see helper list) ?

:default
    
    set /p ANS= Choose action : 

    if /i %ANS% == i goto actionI
    if /i %ANS% == uni goto actionII
    if /i %ANS% == c goto actionIII
    if /i %ANS% == nv goto actionIV
    if /i %ANS% == ll goto actionV
    if /i %ANS% == lv goto actionVI
    if /i %ANS% == help goto actionVII
    if /i %ANS% == e exit

    echo.
    echo "Wrong keyword !"
    echo.

    goto default
:actionI
    echo.
    set /p versionNum= Install Version:
    nvm install %versionNum%
    echo.
    goto default
:actionII
    echo.
    set /p versionNum= Uninstall Version:
    nvm uninstall %versionNum%
    echo.
    goto default
:actionIII
    echo.
    set /p versionNum= Change Version:
    nvm use %versionNum%
    echo.
    goto default
:actionIV
    echo.
    for /f %%m in ('node -v') do set v=%%m
    echo Your currrent node version is %v%
    echo.
    goto default
:actionV
    nvm ls
    echo.
    goto default
:actionVI
    echo.
    nvm list available
    echo.
    goto default
:actionVII
    echo.
    echo Usage:
    echo.
    echo    i               :Install new node version
    echo    uni             :Uninstall old node version
    echo    c               :Change node version
    echo    nv              :Show current node version
    echo    ll              :Show installed node version list
    echo    lv              :Show node all version list
    echo    e               :Exit cmd
    echo.
    goto default

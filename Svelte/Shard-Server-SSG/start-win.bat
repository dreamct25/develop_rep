@echo off
chcp 65001

echo.
echo --- CopyRight © 2022-08 ~ 2024-06 Alex Chen. Beta v0.6.0 ---
echo.

:default 
  set /p args= (i = 安裝應用,r = 啟動網頁上傳服務,e = 離開) : 

  if /i %args% == i goto install
  if /i %args% == r goto runWeb
  if /i %args% == e goto goExit
  
  echo.
  echo error key
  echo.

  goto default
:install
  for /f %%p in ('node -v') do set pv=%%p

  if /i %pv% == "" (
    curl https://nodejs.org/dist/v16.16.0/node-v16.16.0-x64.msi --output node-v16.16.0.msi
    start node-v16.16.0.msi
  ) else (
    echo.
    echo Node 已安裝 !
    echo.
  )

  goto default
:runWeb
  if not exist node_modules call npm i

  if not exist ".env" echo VITE_APP_PLATFORM="win32" > .env 

  echo.
  set /p isOpen= 開啟網頁上傳服務畫面 (y/n) ? : 
  echo.

  if /i %isOpen% == y (
     npm run dev:open
  ) else (
     npm run dev
  )

  goto default
:goExit
  echo.
  set /p ans= 確定關閉命令提示字元 ? (y/n) : 
  echo.
  if /i %ans% == y (
    exit
  ) else (
    goto default
  )

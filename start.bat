@echo off
title VIBE - Rekomendasi Musik Sesuai Suasana Hatimu
echo =======================================================
echo          VIBE - Rekomendasi Musik Berdasarkan Mood
echo =======================================================
echo Memulai development server...
set PATH=C:\Program Files\nodejs;%PATH%
start http://localhost:5173
call npm run dev
pause

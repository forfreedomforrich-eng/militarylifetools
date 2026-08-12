@echo off
cd /d C:\Users\kusan\Desktop\工具站项目
del /f /q C:\Users\kusan\.git\index.lock 2>nul
git rm --cached -rf militarylifetools/.agents militarylifetools/.codex militarylifetools/.claude 2>nul
git add -A -- ':!militarylifetools/.agents' ':!militarylifetools/.codex' ':!militarylifetools/.claude' ':!query.gql' ':!serp.json'
git status --short | findstr /v "warning" | findstr /v "^ai music" | findstr /v "海外版" | findstr /v "^\?\?"
git diff --cached --stat

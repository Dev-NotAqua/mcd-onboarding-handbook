@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 MC&D Onboarding Handbook Deployment
echo ======================================
echo.

REM Check if we're in a git repository
if not exist ".git" (
    echo ❌ Not a git repository. Initializing...
    git init
    echo ✅ Git repository initialized
)

REM Check for uncommitted changes
git status --porcelain > temp_status.txt
set /p status_output=<temp_status.txt
del temp_status.txt

if not "!status_output!"=="" (
    echo 📝 Uncommitted changes detected. Committing...
    git add .
    set /p commit_message="Enter commit message (or press Enter for default): "
    if "!commit_message!"=="" (
        for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set current_date=%%c-%%a-%%b
        for /f "tokens=1-2 delims=: " %%a in ('time /t') do set current_time=%%a:%%b
        set commit_message=Update MC&D handbook - !current_date! !current_time!
    )
    git commit -m "!commit_message!"
    echo ✅ Changes committed
) else (
    echo ✅ No uncommitted changes
)

REM Run build test
echo 🔨 Testing production build...
npm run build
if errorlevel 1 (
    echo ❌ Build failed. Please fix errors before deploying.
    pause
    exit /b 1
)
echo ✅ Build successful

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo ⚠️  No remote origin set. Please add your GitHub repository:
    echo    git remote add origin https://github.com/yourusername/mcd-onboarding-handbook.git
    echo    Then run this script again.
    echo.
    pause
    exit /b 1
)

REM Push to GitHub
echo 📤 Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo ❌ Failed to push to GitHub. Please check your remote repository.
    pause
    exit /b 1
)
echo ✅ Successfully pushed to GitHub

echo.
echo 🎉 Deployment preparation complete!
echo.
echo Next steps:
echo 1. Go to https://vercel.com
echo 2. Import your GitHub repository
echo 3. Deploy with one click!
echo.
echo Your handbook will be live in ~2 minutes! 🚀
echo.
pause
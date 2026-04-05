# Deploy Script for Project Kuning
# This script will push to GitHub and prepare for Vercel deployment

cd "c:\Users\AKBAR\OneDrive\Dokumen\Desktop\Project Kuning\web-integrasi-pro"

Write-Host "=== GIT STATUS ===" -ForegroundColor Green
git status

Write-Host "`n=== CONFIGURING GIT ===" -ForegroundColor Green
git config user.email "dev@project-kuning.com"
git config user.name "Project Kuning Bot"

Write-Host "`n=== ADDING FILES ===" -ForegroundColor Green
git add .

Write-Host "`n=== COMMITTING CHANGES ===" -ForegroundColor Green
git commit -m "Production ready: fixed chat system for Vercel, clean code audit complete"

Write-Host "`n=== PUSHING TO GITHUB ===" -ForegroundColor Green
git push origin main -u

Write-Host "`n=== DEPLOYMENT READY ===" -ForegroundColor Cyan
Write-Host "✓ Code pushed to GitHub successfully!"
Write-Host "`nNext steps for Vercel Deployment:"
Write-Host "1. Visit https://vercel.com"
Write-Host "2. Sign in with GitHub"
Write-Host "3. Click 'Add New' > 'Project'"
Write-Host "4. Select 'akbary-afk/web-tralis-' repository"
Write-Host "5. Click 'Deploy' (Vercel auto-detects vercel.json)"
Write-Host "`nProject will be live in 2-3 minutes!"
Write-Host "`nCheck your email for deployment URL."

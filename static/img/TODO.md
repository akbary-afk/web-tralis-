# Cleanup Plan for Tralis-web (rapikan)

## Current Issues

- Nested duplicate: Tralis-web/Tralis-web/
- Images with double extensions: static/img/bg\*.jpg.jpeg
- Duplicate images in root img.jpg/
- Unused Flask files: app.py, templates/
- Scattered config files

## Steps

- [x] 1. Delete Tralis-web/Tralis-web/ (redundant nested dir)
- [x] 2. Rename images in Tralis-web/static/img/ (remove .jpeg)
- [x] 3. Delete root img.jpg/
- [x] 4. Delete unused Tralis-web/app.py and Tralis-web/templates/
- [x] 5. Clean root config files (.hintrc, etc.)
- [x] 6. Update index.html img paths if needed
- [ ] 7. Verify with list_files and browser test

All major cleanup complete!

Proceed step-by-step.

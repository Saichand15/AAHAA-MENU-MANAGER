# Aahaa Menu Manager

Static, browser-local restaurant menu editor. Open `index.html` in a browser, or serve this folder with a static web server. Netlify publishes this folder directly.

## Daily menu updates

Backup, import, Undo/Redo, and browser-saving status are grouped under **More options** in the top toolbar.

- **Add Page** creates a persistent blank page. **Pages & Move** lets you name, reorder, and delete empty pages.
- Drag a section heading or item onto another page's column in **Pages & Move**. Drop onto an item to insert before it. **Move** buttons provide a keyboard/touch alternative.
- **Add Section** and section **Edit** choose a page and column. Empty sections remain editable.
- Item **Edit** supports a regular price or optional, individually named portion prices. Remove sizes an item does not offer. Existing unlabelled prices are preserved.
- Mark items unavailable to keep them in the manager workspace but hide them from customer preview, print, and PDF.
- **Import Biryani List** includes the supplied 13-item price sheet. Review/edit its tab-separated prices before replacing a section. Replacement includes same-name continuations across pages, not other sections.
- **Undo / Redo** track the last 40 menu/layout/design changes in the current session.
- **Download Backup** saves the complete menu, pages, and design as JSON. **Restore Backup** validates that file before replacing data.
- Existing menus receive the updated biryani list once. **Pre-update Backup** downloads the preserved older menu for restoration if needed.
- Biryani has a dedicated full-width price-table page, with Combos moved to the preceding page. This layout is applied once to existing menus; later manual placement is preserved. Auto-fit never splits or adds other content to the special biryani page.
- Spice levels use chilli symbols beside the dietary icons. The imported biryani list starts at Medium (two chillies); use item **Edit > Spice Level** to change it. Extra spice-choice text is not printed.
- Page titles are workspace labels, not printed headings. Use sections for customer-facing headings.

## Customer view and printing

**Customer Preview** hides editing controls. It is not authentication; this remains a manager-only tool without a login or backend. Do not treat a public deployment as an access-controlled admin system.

Edits are saved only in the current browser and site origin, not to GitHub or other devices. Download backups regularly, especially before clearing browser data or switching devices. Source changes must be deployed separately to update the hosted site.

Pages retain manual placement rather than silently reflowing after edits. An A4 overflow warning offers **Auto-fit pages**, which moves trailing items forward and adds pages as needed. Resolve overflow before exporting; PDF/Print buttons block oversized content to avoid clipping. Browser-native printing can bypass these checks, so use the app's Print button. Check print preview after changing fonts or layout. Blank pages are intentionally included.

## Validation

Run the dependency-free tests with:

```powershell
node --test .\tests\menu.test.cjs
node --check .\script.js
```

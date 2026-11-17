# Aahaa Menu Manager

Static, browser-local restaurant menu editor. Open `index.html` in a browser, or serve this folder with a static web server. Netlify publishes this folder directly.

## Daily menu updates

Backup, import, Undo/Redo, and browser-saving status are grouped under **More options** in the top toolbar.

- **Today's Menu** opens the complete menu in its own tab/view (bookmark `#today-menu`). **Menu Layout** returns to the printable home menu.
- Search by name and filter by section, enabled/disabled, or missing price. Toggle individual items or enable/disable only the filtered results. Changes immediately affect the home layout, customer preview, print, and PDF.
- Items without a valid price cannot be enabled. Use **Edit** to add prices; uncheck Available to save an unpriced item for later. **Fit enabled items to pages** adjusts A4 layout after enabling additional dishes.
- **Add Page** creates a persistent blank page. **Pages & Move** lets you name, reorder, and delete empty pages.
- Drag a section heading or item onto another page's column in **Pages & Move**. Drop onto an item to insert before it. **Move** buttons provide a keyboard/touch alternative.
- **Add Section** and section **Edit** choose a page and column. Empty sections remain editable.
- Item **Edit** supports a regular price or optional, individually named portion prices. Remove sizes an item does not offer. Existing unlabelled prices are preserved.
- Mark items unavailable to keep them in Today's Menu and Pages & Move, but hide them from the home layout, customer preview, print, and PDF. Pages containing only disabled items are omitted; deliberately blank pages are kept.
- **Import Biryani List** includes the supplied 13-item price sheet. Review/edit its tab-separated prices before replacing a section. Replacement includes same-name continuations across pages, not other sections.
- **Undo / Redo** track the last 40 menu/layout/design changes in the current session.
- **Download Backup** saves the complete menu, pages, and design as JSON. **Restore Backup** validates that file before replacing data.
- Existing menus receive the updated biryani list once. **Pre-update Backup** downloads the preserved older menu for restoration if needed.
- Biryani has a dedicated full-width price-table page, with Combos moved to the preceding page. This layout is applied once to existing menus; later manual placement is preserved. Auto-fit never splits or adds other content to the special biryani page.
- Spice levels use chilli symbols beside the dietary icons. The imported biryani list starts at Medium (two chillies); use item **Edit > Spice Level** to change it. Extra spice-choice text is not printed.
- Tandoor uses the supplied 15-item list, including separate 4 pc/8 pc chicken prices and Hariyali Paneer Tikka at $16.99. Existing Tandoor sections update once; breads formerly listed there move to Naan. Other menu sections and prices are preserved.
- Preparation markers appear beside item names: `*` means approximately 20 to 30 minutes; `**` means approximately 30 to 40 minutes (Pomfret). Every page repeats both explanations and the general 10-15 minute preparation note in a centered block above its contact footer, including preview, print, and PDF. Notes are not repeated below Tandoor or other sections. Custom item messages appear in the footer block of the page containing those items. Change times with item **Edit > Preparation time note**, and wording through **Edit printed text**.
- Any item can use **Preparation time note > Custom time**, with minutes such as `45` or `45-60` (1-999). Custom times show `*` beside the item and an item-specific note below its section.
- **Edit preparation info** in the footer note block opens controls for shared wording or individual item messages. Item **Edit > Preparation message for this item** adds an item-specific explanation; it can also add a star and message without a numeric time. Clear the message and choose **None** for the time to remove that item's preparation information; the shared footer legend remains.
- **Edit printed text** changes the shared legend heading and labels, logo tagline, footer, biryani subtitle, and preparation wording. `{minutes}` and `{items}` insert the relevant values in preparation messages. Blank fields hide their text; symbols remain unchanged.
- Each page's **Edit heading, legend & footer** button also offers an optional customer-facing page heading. Section and item headings remain editable through their existing **Edit** controls. Printed text, headings and individual messages are included in backups, saved versions, and Undo/Redo, including older-backup compatibility.
- **More options > Saved versions** keeps the last 10 prior menu states across refreshes in the same browser. Restore a version to view it and download its PDF or JSON backup; the current version is preserved before restoring. Versions include item availability, prices, pages, preparation notes, and design. These are menu data snapshots, not stored PDF files.
- Browser data is not cloud storage: clearing site data removes the menu and saved versions. Use **Download Backup** regularly for an external copy.
- **Pre-update Backup** downloads the latest preserved menu from before the workbook catalog update (or the earlier Tandoor/biryani update if none exists).
- Page titles in **Pages & Move** are workspace labels, separate from optional printed page headings and section headings.

## Customer view and printing

**Customer Preview** hides editing controls. It is not authentication; this remains a manager-only tool without a login or backend. Do not treat a public deployment as an access-controlled admin system.

Edits are saved only in the current browser and site origin, not to GitHub or other devices. Download backups regularly, especially before clearing browser data or switching devices. Source changes must be deployed separately to update the hosted site.

Pages retain manual placement rather than silently reflowing after edits. An A4 overflow warning offers **Auto-fit pages**, which moves trailing items forward and adds pages as needed. Resolve overflow before exporting; PDF/Print buttons block oversized content to avoid clipping. Browser-native printing can bypass these checks, so use the app's Print button. Check print preview after changing fonts or layout. Blank pages are intentionally included.

## Excel catalog and prices

The bundled `assets/menu-catalog.js` is a data snapshot of **Biryani Included.xlsx**. It contains 721 menu-cell references across **With pricing**, **Version 1**, and **Spice Level**. Headers, notes, and blank cells are excluded. Entries are matched by section and normalized spelling, with conservative aliases for existing app names; quantity differences and uncertain historical variants are kept separately.

On the first catalog update, existing enabled/disabled selections are kept. Matching prices from **With pricing** take precedence over app prices. Newly found items start disabled. Unpriced entries retain an existing matched app price when available; otherwise they stay unpriced and disabled. No prices are inferred from unrelated dishes.

Source references and original prices are retained internally in backups, not displayed in the interface. The workbook contains conflicting Egg Curry prices ($14.99 at T8 and $13.99 at Y27); the first priced row is used. Confirm the price with the restaurant before publishing. Daily selections and prices support Undo/Redo. Later daily edits are not overwritten on refresh.

This is not a live Excel connection: editing the downloaded workbook does not change the app automatically. No workbook or local file paths are uploaded. Management controls and internal source data never appear in customer PDFs. If no priced items are enabled, export is blocked.

## Validation

Run the dependency-free tests with:

```powershell
node --test .\tests\menu.test.cjs
node --check .\script.js
```

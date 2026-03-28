# Audience Builder - Figma Design Notes

## Figma Source
- fileKey: 84WNVHVwLml21J1ny9ZbBo
- Full page node: 796:2181
- Main frame: 797:1457 (1920px wide, 13663px tall)
- Content area: 300px side padding = 1320px content width

## Design Token / Colors
- Challenge section gradient: `linear-gradient(127deg, rgb(20,93,220) 5%, rgb(133,110,226) 96%)`
- Green highlight text in challenge: `#48d99a`
- Problem section background: `#f2f4f9`
- Mental model section background: `#f9f9f9`
- Journey card background: `#dee7fb`
- Principle card border: `2px solid #1872ee`
- Principle card gradient bg: `rgba(85,126,223,0.1) to rgba(10,106,150,0.1)`
- Hero bg: `linear-gradient(135deg, #dde8ff 0%, #eef2ff 100%)` (existing is fine)

## Section Structure (from top to bottom in Figma)
1. **Hero**: Title "Audience Builder" + subtitle + hero image - existing is close
2. **Overview Meta**: Company / Role / Focus - existing is close
3. **Background**: "What does Amobee do?" - needs side-by-side layout with photo (ab-background-photo.png)
4. **Problem**: bg #f2f4f9 - screenshot on left + quote bubble on right, text description
5. **User Mental Model**: bg #f9f9f9 - journey cards with curved return arrow pattern
6. **Challenge Banner**: blue-to-purple gradient, green text highlight for key phrase
7. **Design Principles**: side-by-side layout (text left, 2x2 grid right), blue-bordered gradient cards
8. **Design Explorations**: wireframe mockups with pros/cons (ALREADY DONE in current HTML)
9. **Solutions**: 4 solution sections with before/after mockup images
10. **Iterations**: before/after tree mockup comparison images
11. **Validation**: usability testing feedback
12. **Impact**: percentage metrics (-26%, +6%) with descriptions
13. **Reflection**: closing thought
14. **Footer**: LinkedIn + email links

## Downloaded Images
- `images/ab-background-photo.png` - TV/burger photo for background section (600x400)
- `images/ab-old-ui-screenshot.png` - Old UI screenshot for problem section (2876x1830)
- `images/ab-quote-bubble.png` - Quote bubble icon (tiny, may need re-export)
- `images/ab-solution-forecaster.png` - Solution forecaster image
- `images/audience-builder-preview.png` - Hero/preview image
- `images/audience-builder-preview1.png` - Another preview

## Images Still Needed
- Solution section mockup screenshots (4 solutions: operators, tree flexibility, toggle, preview)
- Iteration before/after screenshots
- Any other complex UI frames that are too detailed to recreate in HTML

## Key Layout Differences from Current HTML
1. Background section: needs side-by-side photo+text layout instead of just text
2. Problem section: needs side-by-side screenshot+quote layout instead of vertical stack
3. Challenge: needs gradient bg with green highlight text instead of dark bg
4. Design Principles: needs text-left + 2x2-grid-right layout instead of just 2x2 grid
5. Solutions: need actual mockup images from Figma instead of placeholder images
6. Impact: needs big percentage numbers with descriptions
7. Overall max-width should accommodate wider layouts (1320px content in Figma vs 900px currently)

## Fonts
- Poppins (already loaded from Google Fonts)
- Lato (used in Figma, may need to add)

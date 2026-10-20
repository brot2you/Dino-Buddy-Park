DINO BUDDY PARK V13 — SHOP ICON + VOICE FIX
Patch from V12. Keep existing theme.css and all assets directories.

Install: copy index.html over the existing repository root index.html.
Files english-ui.js, v12-buddydex.js, v12-buddydex.css are included unchanged for convenience; keep them in the same folder.

Changes:
- Shop products now use the exact product's labelled icon, instead of an unrelated prop illustration.
- Purchased decorations use the same recognizable representation as their shop and price-quiz icons.
- Tactile illustrated icon backplates improve readability (using system emoji for symbols).
- Voice chooser puts higher-quality voices first when browser offers them; selection and speed persist.
- Voice menu is in English, British English preferred, no forced high-pitch voice.
- Quiz prompts about prices are in English.

Limitations: high-end natural neural speech is not guaranteed through browser speechSynthesis. If installed voices are robotic, a cloud service or pre-recorded audio clips are needed. This patch is NOT an external-cloud-voice integration. Product artwork is not newly painted; accurate emoji are used deliberately rather than misrepresenting the purchase.
Do not delete files or reset localStorage.

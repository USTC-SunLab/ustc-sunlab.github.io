# Nanoscale Quantum Sensing — English website

Static English website of Nanoscale Quantum Sensing at the University of Science and Technology of China.

Published website: https://ustc-sunlab.github.io/

Original Chinese site: https://team.ustc.edu.cn/sunteam/zh_CN/index.htm

## Publishing

The repository root contains the complete website. In GitHub repository Settings → Pages,
select **Deploy from a branch**, choose **main**, and use **/(root)**. The `.nojekyll`
file preserves the prebuilt HTML, CSS, JavaScript, and images without Jekyll processing.

For an organization homepage, the repository must be named `<organization>.github.io`.
The published website address will be `https://<organization>.github.io/`.

No API key, database, package installation, or runtime server is required.
All website photographs and figures are stored locally in `assets/`.

## Content and source

The website contains 20 English content pages and one legacy URL redirect. Research descriptions and laboratory news
are translated summaries. Links to original sources are retained. Research and the
204-record publication archive were synchronized with the source on 29 October 2026.
The archive covers 2005–2026, including 17 records from 2026. The imaging research page
contains all 11 source research highlights, figures, and research-paper links.
The two current research directions match the Chinese research index; the former
spin-control direction is hidden and its old URL redirects to the research overview.
Personnel and news follow the source snapshot reviewed on 27 October 2026.
The complete editable source project is supplied separately in `sunteam-english-source.zip`.

## Updating

Replace the changed website files and commit to the configured publishing branch.
GitHub Pages will rebuild the published website. Keep `.nojekyll` in the repository root.

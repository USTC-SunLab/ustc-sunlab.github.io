# MicroNano Quantum Sensing Laboratory — English website

Static English edition of the laboratory website at the University of Science and Technology of China.

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

The website contains 21 English pages. Long research descriptions and laboratory news
are concise translated summaries. Links to original sources are retained. Personnel
categories and publication entries follow the source site as reviewed on 27 October 2026.
The complete editable source project is supplied separately in `sunteam-english-source.zip`.

## Updating

Replace the changed website files and commit to the configured publishing branch.
GitHub Pages will rebuild the published website. Keep `.nojekyll` in the repository root.

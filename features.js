/**
 * Extended Feature Renderers for Blockchain Consensus Explorer
 * Renders: Block Anatomy, Consensus Patterns, Currency Deep Dive, Workflow Animation, Layer Stack
 * Depends on: data-extended.js (loaded first)
 */

// ============================================================
// 1. BLOCK ANATOMY RENDERER
// ============================================================
function renderBlockAnatomy(algoId) {
    const container = document.getElementById("block-anatomy-container");
    if (!container) return;
    const data = blockStructureData[algoId];
    if (!data) return;

    const fieldsHtml = data.headerFields.map(f => `
        <div class="block-field">
            <div class="field-name">${f.name}</div>
            <div class="field-desc">${f.desc}</div>
        </div>
    `).join("");

    container.innerHTML = `
        <div class="block-visual">
            <div class="block-section block-header-section">
                <div class="block-section-label">BLOCK HEADER</div>
                <div class="block-fields-grid">
                    ${fieldsHtml}
                </div>
            </div>
            <div class="block-section block-body-section">
                <div class="block-section-label">BLOCK BODY — TRANSACTIONS</div>
                <div class="block-merkle-info">
                    <span class="merkle-icon">🌳</span>
                    <span>${data.merkleType}</span>
                </div>
            </div>
        </div>
        <div class="block-meta-grid">
            <div class="block-meta-item">
                <div class="block-meta-label">Data Model</div>
                <div class="block-meta-value">${data.model}</div>
            </div>
            <div class="block-meta-item">
                <div class="block-meta-label">Block Size</div>
                <div class="block-meta-value">${data.blockSize}</div>
            </div>
            <div class="block-meta-item">
                <div class="block-meta-label">Fork Choice Rule</div>
                <div class="block-meta-value">${data.forkRule}</div>
            </div>
        </div>
        <div class="block-special-note">
            <strong>📌 Note:</strong> ${data.specialNote}
        </div>
    `;
}

// ============================================================
// 2. CONSENSUS PATTERNS RENDERER
// ============================================================
function renderConsensusPatterns(algoId) {
    const container = document.getElementById("consensus-patterns-container");
    if (!container) return;
    const data = consensusPatternsData[algoId];
    if (!data) return;

    container.innerHTML = `
        <div class="pattern-grid">
            <div class="pattern-item">
                <div class="pattern-icon">🎯</div>
                <div class="pattern-info">
                    <div class="pattern-label">Selection Type</div>
                    <div class="pattern-value">${data.selectionType}</div>
                </div>
            </div>
            <div class="pattern-item">
                <div class="pattern-icon">📡</div>
                <div class="pattern-info">
                    <div class="pattern-label">Communication</div>
                    <div class="pattern-value">${data.communicationType}</div>
                </div>
            </div>
            <div class="pattern-item">
                <div class="pattern-icon">🔀</div>
                <div class="pattern-info">
                    <div class="pattern-label">Fork Resolution</div>
                    <div class="pattern-value">${data.forkResolution}</div>
                </div>
            </div>
            <div class="pattern-item">
                <div class="pattern-icon">🏁</div>
                <div class="pattern-info">
                    <div class="pattern-label">Finality Type</div>
                    <div class="pattern-value">${data.finalityType}</div>
                </div>
            </div>
            <div class="pattern-item">
                <div class="pattern-icon">🛡️</div>
                <div class="pattern-info">
                    <div class="pattern-label">Byzantine Tolerance</div>
                    <div class="pattern-value">${data.byzantineTolerance}</div>
                </div>
            </div>
            <div class="pattern-item">
                <div class="pattern-icon">⚡</div>
                <div class="pattern-info">
                    <div class="pattern-label">Energy Model</div>
                    <div class="pattern-value">${data.energyModel}</div>
                </div>
            </div>
        </div>
        <div class="pattern-category-badge">
            ${data.patternCategory}
        </div>
    `;
}

// ============================================================
// 3. CURRENCY DEEP DIVE RENDERER
// ============================================================
function renderCurrencyDeepDive(algoId) {
    const container = document.getElementById("currency-deepdive-container");
    if (!container) return;
    const algo = algorithmsData[algoId];
    if (!algo) return;

    let html = "";
    algo.blockchains.forEach(chain => {
        const currency = currencyDetailsData[chain.name];
        if (!currency) return;

        // Milestones timeline
        const milestonesHtml = currency.keyMilestones.map(m => `
            <div class="milestone-item">
                <div class="milestone-year">${m.year}</div>
                <div class="milestone-event">${m.event}</div>
            </div>
        `).join("");

        // Variants / forks
        let variantsHtml = "";
        if (currency.variants && currency.variants.length > 0) {
            const forkItems = currency.variants.map(v => `
                <div class="fork-item">
                    <div class="fork-connector"></div>
                    <div class="fork-details">
                        <div class="fork-name">${v.name} <span class="fork-type-badge">${v.forkType}</span> <span class="fork-year">${v.year}</span></div>
                        <div class="fork-reason">${v.reason}</div>
                    </div>
                </div>
            `).join("");

            variantsHtml = `
                <div class="fork-tree">
                    <div class="fork-tree-title">Fork & Variant Tree</div>
                    <div class="fork-origin">
                        <div class="fork-origin-name">${chain.name} (${currency.symbol})</div>
                    </div>
                    ${forkItems}
                </div>
            `;
        }

        html += `
            <div class="currency-card">
                <div class="currency-card-header">
                    <div class="currency-title">
                        <span class="currency-symbol">${currency.symbol}</span>
                        <span class="currency-name-full">${chain.name}</span>
                    </div>
                    <div class="currency-launch">Est. ${currency.launchYear}</div>
                </div>
                <div class="currency-info-grid">
                    <div class="currency-info-item">
                        <div class="currency-info-label">Founder</div>
                        <div class="currency-info-value">${currency.founder}</div>
                    </div>
                    <div class="currency-info-item">
                        <div class="currency-info-label">Max Supply</div>
                        <div class="currency-info-value">${currency.maxSupply}</div>
                    </div>
                    <div class="currency-info-item">
                        <div class="currency-info-label">Emission Model</div>
                        <div class="currency-info-value">${currency.circulatingModel}</div>
                    </div>
                    <div class="currency-info-item">
                        <div class="currency-info-label">Current Phase</div>
                        <div class="currency-info-value">${currency.currentPhase}</div>
                    </div>
                </div>
                <div class="milestones-section">
                    <div class="milestones-title">Key Milestones</div>
                    <div class="milestones-timeline">
                        ${milestonesHtml}
                    </div>
                </div>
                ${variantsHtml}
            </div>
        `;
    });

    container.innerHTML = html || '<p style="color: var(--text-muted);">No detailed currency data available for this algorithm\'s blockchains.</p>';
}

// ============================================================
// 4. WORKFLOW ANIMATION (REMOVED - INTEGRATED TO MAIN TIMELINE)
// ============================================================


// ============================================================
// 5. LAYER STACK RENDERER
// ============================================================
function renderLayerStack(algoId) {
    const container = document.getElementById("layer-stack-container");
    if (!container) return;

    const algo = algorithmsData[algoId];
    if (!algo) return;

    // Determine which layers the current algorithm's blockchains belong to
    const activeChainNames = algo.blockchains.map(b => b.name);

    let html = `<div class="layer-stack">`;

    // Render layers in reverse (L3 on top, L0 on bottom)
    const reversedLayers = [...layerDefinitions].reverse();
    reversedLayers.forEach(layer => {
        const matchingExamples = layer.examples.filter(ex =>
            activeChainNames.some(name => ex.name.includes(name) || name.includes(ex.name))
        );
        const isActive = matchingExamples.length > 0;

        const examplesHtml = layer.examples.map(ex => {
            const isHighlighted = activeChainNames.some(name => ex.name.includes(name) || name.includes(ex.name));
            return `
                <div class="layer-example ${isHighlighted ? 'layer-example-active' : ''}">
                    <span class="layer-example-name">${ex.name}</span>
                    <span class="layer-example-role">${ex.role}</span>
                </div>
            `;
        }).join("");

        html += `
            <div class="layer-band ${isActive ? 'layer-band-active' : ''}" style="--layer-color: ${layer.color};">
                <div class="layer-band-header">
                    <span class="layer-tag" style="background: ${layer.color};">${layer.tag}</span>
                    <span class="layer-band-name">${layer.name}</span>
                </div>
                <div class="layer-band-desc">${layer.description}</div>
                <div class="layer-examples-grid">
                    ${examplesHtml}
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

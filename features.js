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

        let descHtml = "";
        if (currency.description) {
            descHtml = `
                <p class="currency-description" style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.5; margin-bottom: 1.25rem; font-weight: normal;">
                    ${currency.description}
                </p>
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
                ${descHtml}
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

    // Handle FBA (pbft) custom layout first (independent of algorithmsData)
    if (algoId === 'pbft') {
        container.innerHTML = `
            <div class="layer-stack">
                <!-- Layer 3 -->
                <div class="layer-band" style="--layer-color: #ff9f43;">
                    <div class="layer-band-header">
                        <span class="layer-tag" style="background: #ff9f43;">L3</span>
                        <span class="layer-band-name">Application & Protocol</span>
                    </div>
                    <div class="layer-band-desc">The user-facing application layer where decentralized protocols, dApps, and services operate.</div>
                    <div class="layer-examples-grid">
                        <div class="layer-example">
                            <span class="layer-example-name">Uniswap</span>
                            <span class="layer-example-role">Decentralized exchange (DEX) — automated market maker protocol</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Aave</span>
                            <span class="layer-example-role">Decentralized lending and borrowing protocol</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">OpenSea</span>
                            <span class="layer-example-role">NFT marketplace operating across multiple chains</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Chainlink</span>
                            <span class="layer-example-role">Decentralized oracle network providing off-chain data feeds</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Lido</span>
                            <span class="layer-example-role">Liquid staking protocol — stETH derivative for staked ETH</span>
                        </div>
                    </div>
                    <div style="margin-top: 0.75rem; font-size: 0.75rem; color: var(--text-secondary); font-style: italic; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.5rem; padding-left: 0.2rem;">
                        ℹ️ No major Layer-3 ecosystems currently operate directly on Federated Byzantine Agreement consensus.
                    </div>
                </div>

                <!-- Layer 2 -->
                <div class="layer-band" style="--layer-color: #a55eea;">
                    <div class="layer-band-header">
                        <span class="layer-tag" style="background: #a55eea;">L2</span>
                        <span class="layer-band-name">Scaling & Execution</span>
                    </div>
                    <div class="layer-band-desc">Secondary frameworks built on top of Layer 1 to increase throughput.</div>
                    <div class="layer-examples-grid">
                        <div class="layer-example">
                            <span class="layer-example-name">Arbitrum</span>
                            <span class="layer-example-role">Optimistic rollup — settles fraud proofs on Ethereum</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Base</span>
                            <span class="layer-example-role">OP Stack rollup — Coinbase-operated sequencer on Ethereum</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Lightning Network</span>
                            <span class="layer-example-role">Payment channels for instant Bitcoin micropayments</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Rootstock (RSK)</span>
                            <span class="layer-example-role">Merged-mining sidechain with EVM on Bitcoin</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Counterparty</span>
                            <span class="layer-example-role">Bitcoin metaprotocol — PoB genesis token distribution on Bitcoin</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">zkSync Era</span>
                            <span class="layer-example-role">ZK rollup — validity proofs for instant L1 finality</span>
                        </div>
                    </div>
                </div>

                <!-- Layer 1 -->
                <div class="layer-band layer-band-active" style="--layer-color: #00f2fe;">
                    <div class="layer-band-header">
                        <span class="layer-tag" style="background: #00f2fe;">L1</span>
                        <span class="layer-band-name">Base Consensus & Settlement</span>
                    </div>
                    <div class="layer-band-desc">The primary settlement layers that run or secure Federated Byzantine Agreement consensus.</div>
                    <div class="layer-examples-grid">
                        <!-- Stellar visually highlighted using active FBA theme -->
                        <div class="layer-example layer-example-active" style="border: 1px solid var(--accent-theme); background: rgba(0, 210, 211, 0.12);">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.15rem; gap: 0.5rem; flex-wrap: wrap;">
                                <span class="layer-example-name" style="color: var(--accent-theme); font-weight: 700;">Stellar</span>
                                <span style="font-size: 0.6rem; padding: 0.1rem 0.4rem; background: rgba(0, 210, 211, 0.15); color: var(--accent-theme); border-radius: 4px; font-weight: 600; white-space: nowrap;">SCP Consensus</span>
                            </div>
                            <span class="layer-example-role">Uses Stellar Consensus Protocol (SCP) — canonical implementation of Federated Byzantine Agreement with open quorum slices.</span>
                        </div>
                        <!-- Ripple visually highlighted using dashed FBA theme -->
                        <div class="layer-example layer-example-active" style="border: 1px dashed var(--accent-theme); background: rgba(0, 210, 211, 0.08);">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.15rem; gap: 0.5rem; flex-wrap: wrap;">
                                <span class="layer-example-name" style="color: var(--accent-theme); font-weight: 700;">Ripple</span>
                                <span style="font-size: 0.6rem; padding: 0.1rem 0.4rem; background: rgba(0, 210, 211, 0.15); color: var(--accent-theme); border-radius: 4px; font-weight: 600; white-space: nowrap;">RPCA Consensus</span>
                            </div>
                            <span class="layer-example-role">Uses Ripple Protocol Consensus Algorithm (RPCA) based on a curated Unique Node List (UNL) — related but architecturally distinct from SCP.</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Bitcoin</span>
                            <span class="layer-example-role">PoW — original decentralized settlement layer</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Litecoin</span>
                            <span class="layer-example-role">PoW (Scrypt) — fast-confirming 'silver to Bitcoin's gold'</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Ethereum</span>
                            <span class="layer-example-role">PoS — programmable settlement with smart contracts</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Cardano</span>
                            <span class="layer-example-role">PoS (Ouroboros) — peer-reviewed formal verification</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Solana</span>
                            <span class="layer-example-role">PoH+PoS — high-throughput single-layer execution</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Tron</span>
                            <span class="layer-example-role">DPoS — 27 Super Representatives for high-volume stablecoin transfers</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">EOS</span>
                            <span class="layer-example-role">DPoS — 21 Block Producers for fee-less enterprise dApps</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">BNB Chain</span>
                            <span class="layer-example-role">PoSA — fast EVM-compatible execution</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">VeChain</span>
                            <span class="layer-example-role">PoA 2.0 — enterprise supply chain and sustainability</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Slimcoin</span>
                            <span class="layer-example-role">PoB/PoW/PoS hybrid — first native Proof of Burn blockchain</span>
                        </div>
                    </div>
                </div>

                <!-- Layer 0 -->
                <div class="layer-band" style="--layer-color: #718096;">
                    <div class="layer-band-header">
                        <span class="layer-tag" style="background: #718096;">L0</span>
                        <span class="layer-band-name">Network & Transport Infrastructure</span>
                    </div>
                    <div class="layer-band-desc">The foundational network layer that enables communication between different blockchains.</div>
                    <div class="layer-examples-grid">
                        <div class="layer-example">
                            <span class="layer-example-name">Polkadot</span>
                            <span class="layer-example-role">Relay chain connecting parachains with shared security</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Cosmos (IBC)</span>
                            <span class="layer-example-role">Inter-Blockchain Communication protocol for sovereign chains</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Avalanche Primary Network</span>
                            <span class="layer-example-role">Subnet architecture for custom blockchain deployment</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">LayerZero</span>
                            <span class="layer-example-role">Omnichain messaging protocol for cross-chain communication</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    // Handle PoB custom layout first (independent of algorithmsData)
    if (algoId === 'pob') {
        container.innerHTML = `
            <div class="layer-stack">
                <!-- Layer 3 -->
                <div class="layer-band" style="--layer-color: #ff9f43;">
                    <div class="layer-band-header">
                        <span class="layer-tag" style="background: #ff9f43;">L3</span>
                        <span class="layer-band-name">Application & Protocol</span>
                    </div>
                    <div class="layer-band-desc">The user-facing application layer where decentralized protocols, dApps, and services operate.</div>
                    <div class="layer-examples-grid">
                        <div class="layer-example">
                            <span class="layer-example-name">Uniswap</span>
                            <span class="layer-example-role">Decentralized exchange (DEX) — automated market maker protocol</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Aave</span>
                            <span class="layer-example-role">Decentralized lending and borrowing protocol</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">OpenSea</span>
                            <span class="layer-example-role">NFT marketplace operating across multiple chains</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Chainlink</span>
                            <span class="layer-example-role">Decentralized oracle network providing off-chain data feeds</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Lido</span>
                            <span class="layer-example-role">Liquid staking protocol — stETH derivative for staked ETH</span>
                        </div>
                    </div>
                    <div style="margin-top: 0.75rem; font-size: 0.75rem; color: var(--text-secondary); font-style: italic; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.5rem; padding-left: 0.2rem;">
                        ℹ️ No major Layer-3 ecosystems currently operate directly on native Proof of Burn consensus.
                    </div>
                </div>

                <!-- Layer 2 -->
                <div class="layer-band layer-band-active" style="--layer-color: #a55eea;">
                    <div class="layer-band-header">
                        <span class="layer-tag" style="background: #a55eea;">L2</span>
                        <span class="layer-band-name">Scaling & Execution</span>
                    </div>
                    <div class="layer-band-desc">Secondary frameworks built on top of Layer 1 to increase throughput.</div>
                    <div class="layer-examples-grid">
                        <!-- Highlight Counterparty using a secondary Proof of Burn accent -->
                        <div class="layer-example layer-example-active" style="border: 1px dashed var(--accent-theme); background: rgba(255, 159, 67, 0.08);">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.15rem; gap: 0.5rem; flex-wrap: wrap;">
                                <span class="layer-example-name" style="color: var(--accent-theme); font-weight: 700;">Counterparty</span>
                                <span style="font-size: 0.6rem; padding: 0.1rem 0.4rem; background: rgba(255, 159, 67, 0.15); color: var(--accent-theme); border-radius: 4px; font-weight: 600; white-space: nowrap;">Bitcoin Metaprotocol</span>
                            </div>
                            <span class="layer-example-role">Uses a one-time Proof-of-Burn genesis distribution while inheriting Bitcoin's Proof of Work consensus.</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Arbitrum</span>
                            <span class="layer-example-role">Optimistic rollup — settles fraud proofs on Ethereum</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Base</span>
                            <span class="layer-example-role">OP Stack rollup — Coinbase-operated sequencer on Ethereum</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Lightning Network</span>
                            <span class="layer-example-role">Payment channels for instant Bitcoin micropayments</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Rootstock (RSK)</span>
                            <span class="layer-example-role">Merged-mining sidechain with EVM on Bitcoin</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">zkSync Era</span>
                            <span class="layer-example-role">ZK rollup — validity proofs for instant L1 finality</span>
                        </div>
                    </div>
                </div>

                <!-- Layer 1 -->
                <div class="layer-band layer-band-active" style="--layer-color: #00f2fe;">
                    <div class="layer-band-header">
                        <span class="layer-tag" style="background: #00f2fe;">L1</span>
                        <span class="layer-band-name">Base Consensus & Settlement</span>
                    </div>
                    <div class="layer-band-desc">The primary settlement layers that run or secure Proof of Burn consensus.</div>
                    <div class="layer-examples-grid">
                        <!-- Slimcoin visually highlighted using active Proof of Burn theme -->
                        <div class="layer-example layer-example-active" style="border: 1px solid var(--accent-theme); background: rgba(255, 159, 67, 0.12);">
                            <span class="layer-example-name" style="color: var(--accent-theme); font-weight: 700;">Slimcoin</span>
                            <span class="layer-example-role">Hybrid PoW/PoS/Proof of Burn blockchain implementing native Proof of Burn consensus.</span>
                        </div>
                        <!-- Bitcoin - show a secondary indicator: Host Chain for Counterparty -->
                        <div class="layer-example layer-example-active">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.15rem; gap: 0.5rem; flex-wrap: wrap;">
                                <span class="layer-example-name">Bitcoin</span>
                                <span style="font-size: 0.6rem; padding: 0.1rem 0.4rem; background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); border-radius: 4px; white-space: nowrap;">Host Chain for Counterparty</span>
                            </div>
                            <span class="layer-example-role">Proof of Work blockchain serving as the underlying host chain for Counterparty.</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Litecoin</span>
                            <span class="layer-example-role">PoW (Scrypt) — fast-confirming 'silver to Bitcoin's gold'</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Ethereum</span>
                            <span class="layer-example-role">PoS — programmable settlement with smart contracts</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Cardano</span>
                            <span class="layer-example-role">PoS (Ouroboros) — peer-reviewed formal verification</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Solana</span>
                            <span class="layer-example-role">PoH+PoS — high-throughput single-layer execution</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Tron</span>
                            <span class="layer-example-role">DPoS — 27 Super Representatives for high-volume stablecoin transfers</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">EOS</span>
                            <span class="layer-example-role">DPoS — 21 Block Producers for fee-less enterprise dApps</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">BNB Chain</span>
                            <span class="layer-example-role">PoSA — fast EVM-compatible execution</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">VeChain</span>
                            <span class="layer-example-role">PoA 2.0 — enterprise supply chain and sustainability</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Stellar</span>
                            <span class="layer-example-role">FBA (SCP) — cross-border payments with deterministic finality</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Ripple</span>
                            <span class="layer-example-role">RPCA (UNL) — enterprise banking settlement network</span>
                        </div>
                    </div>
                </div>

                <!-- Layer 0 -->
                <div class="layer-band" style="--layer-color: #718096;">
                    <div class="layer-band-header">
                        <span class="layer-tag" style="background: #718096;">L0</span>
                        <span class="layer-band-name">Network & Transport Infrastructure</span>
                    </div>
                    <div class="layer-band-desc">The foundational network layer that enables communication between different blockchains.</div>
                    <div class="layer-examples-grid">
                        <div class="layer-example">
                            <span class="layer-example-name">Polkadot</span>
                            <span class="layer-example-role">Relay chain connecting parachains with shared security</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Cosmos (IBC)</span>
                            <span class="layer-example-role">Inter-Blockchain Communication protocol for sovereign chains</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">Avalanche Primary Network</span>
                            <span class="layer-example-role">Subnet architecture for custom blockchain deployment</span>
                        </div>
                        <div class="layer-example">
                            <span class="layer-example-name">LayerZero</span>
                            <span class="layer-example-role">Omnichain messaging protocol for cross-chain communication</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    // Determine which layers the current algorithm's blockchains belong to
    const algo = algorithmsData[algoId];
    if (!algo) return;
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

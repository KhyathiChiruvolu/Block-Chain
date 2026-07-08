/**
 * Consensus Algorithms in Blockchain — A Comparative Explorer
 * Core Application Logic & Interactive State Management
 */
// 1. Data Definitions for Consensus Algorithms
const algorithmsData = {
    pow: {
        id: "pow",
        name: "Proof of Work",
        acronym: "PoW",
        tagline: "Security through physical energy expenditure",
        description: "Proof of Work is the pioneering consensus mechanism where nodes (miners) compete to solve computationally intensive mathematical puzzles (using cryptographic hashing functions like SHA-256). The first miner to find a valid solution (a hash below a certain target difficulty) earns the right to add the new block of transactions to the ledger and receives a block reward. This makes altering historical records prohibitively expensive, as an attacker would have to re-compute all work from the altered block forward.",
        scores: { scalability: 2.0, security: 9.5, decentralisation: 8.5 },
        specs: {
            blockTime: "10 mins (Bitcoin)",
            tps: "7 - 15 TPS",
            nodes: "~15,000+ (Bitcoin)",
            stake: "ASIC hardware + heavy electricity cost"
        },
        steps: [
            {
                title: "Transaction Broadcast",
                desc: "Users sign and submit transactions. These are broadcast to the peer-to-peer network and wait in a temporary storage pool (mempool)."
            },
            {
                title: "Puzzle Competition",
                desc: "Mining nodes aggregate transactions into a candidate block. They repeatedly hash the block header with a changing variable ('nonce') trying to get an output below the target threshold."
            },
            {
                title: "Block Broadcast",
                desc: "The first miner to find a valid nonce instantly broadcasts their solution and candidate block to the rest of the network."
            },
            {
                title: "Consensus Verification",
                desc: "Other nodes receive the block, verify that all transactions are valid (no double-spend), and run a single hash to verify the miner's work proof."
            },
            {
                title: "Reward & Confirmation",
                desc: "If verified, nodes add the block to their local chain and start mining the next block. The miner receives native block rewards and fees. Finality increases with each added block."
            }
        ],
        blockchains: [
            {
                name: "Bitcoin",
                layer: "Layer 1 (Base Chain)",
                layerType: "L1",
                rationale: "Bitcoin values absolute decentralisation and censorship resistance above speed. PoW's heavy capital and energy expenditures make the network highly secure and resistant to nation-state level tampering.",
                languages: ["Bitcoin Script (Non-Turing complete stack language)"]
            },
            {
                name: "Litecoin",
                layer: "Layer 1 (Base Chain)",
                layerType: "L1",
                rationale: "Uses the Scrypt PoW algorithm. Litecoin was designed as a 'silver' complement to Bitcoin, offering 2.5-minute block times for quicker retail transactions.",
                languages: ["Bitcoin Script"]
            },
            {
                name: "Rootstock",
                layer: "Layer 2 (Bitcoin Scaling)",
                layerType: "L2",
                rationale: "A sidechain providing EVM-compatible smart contracts. It uses 'Merged Mining' PoW, allowing Bitcoin miners to validate Rootstock blocks simultaneously without additional energy consumption.",
                languages: ["Solidity", "Vyper", "Yul"]
            }
        ]
    },
    pos: {
        id: "pos",
        name: "Proof of Stake",
        acronym: "PoS",
        tagline: "Security through economic alignment and capital lockup",
        description: "Proof of Stake replaces energy-hungry mining with native capital staking. Validators lock up a specific amount of cryptocurrency as collateral to be randomly selected to propose and validate blocks. If they behave honestly, they earn transaction fees and newly minted coins; if they attempt to double-sign or validate invalid transactions, a portion of their staked collateral is slashed (destroyed).",
        scores: { scalability: 6.5, security: 8.5, decentralisation: 7.5 },
        specs: {
            blockTime: "12 secs (Ethereum)",
            tps: "15 - 30 TPS (L1) / 10,000+ (L2)",
            nodes: "~1,000,000+ validators (Ethereum)",
            stake: "32 ETH (Ethereum) / 0.1 ADA (Cardano)"
        },
        steps: [
            {
                title: "Collateral Registration",
                desc: "Users deposit and lock native currency into a smart contract (e.g. 32 ETH) to register as validator nodes in the network."
            },
            {
                title: "Proposer Selection",
                desc: "At the start of each time slot, an on-chain randomizer selects a validator to propose the next block. Probability scales with total stake value."
            },
            {
                title: "Attestation Phase",
                desc: "A randomly selected committee of other validators verifies the proposed block and 'attests' (votes) that it is valid and belongs to the canonical chain."
            },
            {
                title: "Consensus & Settlement",
                desc: "When a supermajority (2/3 of active stake) attestations are gathered, the block is finalized and settled permanently into the ledger."
            },
            {
                title: "Yield & Slashing",
                desc: "Honest validators earn staking yields (issuance + fees). Violators who sign conflicting blocks have their stake slashed and are ejected."
            }
        ],
        blockchains: [
            {
                name: "Ethereum",
                layer: "Layer 1 (Base Chain)",
                layerType: "L1",
                rationale: "Transitioned from PoW to PoS (The Merge) in 2022 to decrease energy consumption by 99.95%, support decentralized liquid staking, and secure settlement for Layer 2 rollups.",
                languages: ["Solidity", "Vyper", "Yul"]
            },
            {
                name: "Cardano",
                layer: "Layer 1 (Base Chain)",
                layerType: "L1",
                rationale: "Uses the Ouroboros PoS protocol. Cardano uses a liquid staking model where users can delegate voting weight without locking up their native ADA tokens, promoting open delegation.",
                languages: ["Plutus (Haskell-based)", "Aiken", "Marlowe"]
            },
            {
                name: "Arbitrum",
                layer: "Layer 2 (Ethereum Rollup)",
                layerType: "L2",
                rationale: "An optimistic rollup that processes computations off-chain, then settles data batches directly to Ethereum L1, inheriting Ethereum's robust PoS security model.",
                languages: ["Solidity", "Vyper"]
            }
        ]
    },
    poh: {
        id: "poh",
        name: "Proof of History",
        acronym: "PoH + PoS",
        tagline: "Security through cryptographic time-sequencing",
        description: "Proof of History is not a standalone consensus mechanism, but a cryptographic helper that works alongside Proof of Stake. It uses a Verifiable Delay Function (VDF) to create a continuous, cryptographically verifiable record of time. By timestamping transactions inside a historical sequence, validator nodes can agree on the order of events without waiting for network communication, dramatically boosting processing speed.",
        scores: { scalability: 9.5, security: 7.5, decentralisation: 5.5 },
        specs: {
            blockTime: "400 ms (Solana)",
            tps: "50,000 - 65,000 TPS",
            nodes: "~1,800 validators (Solana)",
            stake: "High hardware requirements + voting gas fee"
        },
        steps: [
            {
                title: "Sequential VDF Hashing",
                desc: "A leader node runs a continuous SHA-256 loop. Because it is single-threaded, it provides a reliable, cryptographically verifiable 'clock'."
            },
            {
                title: "Transaction Timestamping",
                desc: "As transactions arrive at the leader node, they are combined with the current VDF hash, fixing their exact sequential position in time."
            },
            {
                title: "Pipelined Distribution",
                desc: "The leader broadcasts the transaction stream in fragments to other validators before the block is even fully created."
            },
            {
                title: "Parallel Verification",
                desc: "Validators use multi-core GPUs to verify the VDF proofs in parallel, validating the timing sequence faster than it took to generate."
            },
            {
                title: "Tower BFT Agreement",
                desc: "Validators execute a modified PBFT vote (Tower BFT) backed by PoS weights to lock in and finalize the sequenced ledger."
            }
        ],
        blockchains: [
            {
                name: "Solana",
                layer: "Layer 1 (Base Chain)",
                layerType: "L1",
                rationale: "Solana couples PoH with PoS to eliminate block time coordination overhead, facilitating high-frequency trading and sub-second transaction settle speeds directly on Layer 1.",
                languages: ["Rust", "C", "C++ (using Anchor framework)"]
            }
        ]
    },
    dpos: {
        id: "dpos",
        name: "Delegated Proof of Stake",
        acronym: "DPoS",
        tagline: "Security through democratic node representation",
        description: "Delegated Proof of Stake introduces a representative democracy. Token holders vote in real-time to elect a small, fixed number of trusted delegates (often called block producers or super representatives, e.g., 21 or 27). These elected delegates are solely responsible for verifying transactions, creating blocks, and maintaining network consensus. This concentration of power enables sub-second confirmations.",
        scores: { scalability: 8.0, security: 6.5, decentralisation: 3.5 },
        specs: {
            blockTime: "3 secs (Tron)",
            tps: "2,000 - 10,000 TPS",
            nodes: "21 - 100 elected delegates",
            stake: "No minimum to vote; high backing required to be elected"
        },
        steps: [
            {
                title: "Continuous Voting",
                desc: "Token holders vote for delegate candidates by locking up their native tokens. One token equals one vote weight."
            },
            {
                title: "Representative Selection",
                desc: "The votes are tallied. The top-ranking nodes (e.g. 27 on Tron) are designated as the active block producers."
            },
            {
                title: "Round-Robin Scheduling",
                desc: "A slot scheduler assigns block creation duties to the active delegates in a rotating sequence."
            },
            {
                title: "Rapid Attestation",
                desc: "The assigned delegate bundles transactions and signs the block. The remaining active delegates verify and approve the block rapidly."
            },
            {
                title: "Democratic Demotion",
                desc: "If a delegate goes offline or signs fraudulent data, voters withdraw votes, automatically replacing them with an honest candidate in the next epoch."
            }
        ],
        blockchains: [
            {
                name: "Tron",
                layer: "Layer 1 (Base Chain)",
                layerType: "L1",
                rationale: "Uses 27 Super Representatives. The high-speed turn rotation allows Tron to process high volumes of USDT stablecoin transfers with negligible network fees.",
                languages: ["Solidity (Tron Virtual Machine - TVM)"]
            },
            {
                name: "EOS",
                layer: "Layer 1 (Base Chain)",
                layerType: "L1",
                rationale: "Relies on 21 Block Producers. EOS targets enterprise application scaling, using DPoS to offer account creation and fee-less smart contract interactions.",
                languages: ["C++"]
            }
        ]
    },
    poa: {
        id: "poa",
        name: "Proof of Authority",
        acronym: "PoA",
        tagline: "Security through identity, reputation, and vetting",
        description: "Proof of Authority is a reputation-based consensus mechanism where validator identities are pre-vetted and approved by a central governing body. Validators are not required to spend computational energy or stake capital; their motivation to act honestly is tied to their real-world reputation and legal liability. This is highly suited for private or consortium blockchains.",
        scores: { scalability: 9.5, security: 7.0, decentralisation: 1.5 },
        specs: {
            blockTime: "3 secs (BNB Chain - PoSA)",
            tps: "2,200 - 5,000 TPS",
            nodes: "21 - 40 validators",
            stake: "Governance vetting + professional hardware hosting"
        },
        steps: [
            {
                title: "Vetting & KYC Check",
                desc: "Individuals or organizations undergo rigorous identity, background, and legal checks to establish accountability."
            },
            {
                title: "Authority Whitelisting",
                desc: "The governing council adds the approved node's cryptographic key to the active validator whitelist."
            },
            {
                title: "Block Generation",
                desc: "Validators take turns proposing blocks in a deterministic rotation, reducing latency and communication overhead."
            },
            {
                title: "Signature Authentication",
                desc: "Consensus is achieved when other whitelisted nodes verify the proposer's digital signature and append the block."
            },
            {
                title: "Council Revocation",
                desc: "If a validator acts maliciously, the governing council revokes their credentials and keys, instantly removing them from consensus."
            }
        ],
        blockchains: [
            {
                name: "BNB Chain",
                layer: "Layer 1 (Base Chain)",
                layerType: "L1",
                rationale: "Uses a hybrid Proof of Staked Authority (PoSA). BNB Chain relies on a small validator set (currently ~40) to offer fast, cheap EVM-compatible execution.",
                languages: ["Solidity", "Vyper"]
            },
            {
                name: "VeChain",
                layer: "Layer 1 (Base Chain)",
                layerType: "L1",
                rationale: "Uses PoA 2.0. VeChain tracks global supply chains and requires predictable enterprise transaction fees, secured by vetted Authority Masternodes.",
                languages: ["Solidity"]
            },
            {
                name: "Base",
                layer: "Layer 2 (Ethereum Rollup)",
                layerType: "L2",
                rationale: "An optimistic rollup operated by Coinbase. It initially relies on a centralized PoA sequencer to execute and batch transactions before decentralizing.",
                languages: ["Solidity"]
            }
        ]
    },
    pbft: {
        id: "pbft",
        name: "Federated Byzantine Agreement",
        acronym: "FBA / PBFT",
        tagline: "Security through quorum consensus slices",
        description: "Federated Byzantine Agreement (FBA) and PBFT solve consensus through direct communication and quorum voting among nodes, without mining or token staking. In FBA, nodes do not need a globally centralized list of validators; instead, they choose a set of other nodes they trust (a 'quorum slice'). When these slices overlap, they form a network-wide consensus, resolving double-spend issues within seconds.",
        scores: { scalability: 9.0, security: 7.5, decentralisation: 4.5 },
        specs: {
            blockTime: "2 - 5 secs (Stellar)",
            tps: "1,000 - 4,000 TPS",
            nodes: "~100 - 150 validators (Stellar)",
            stake: "Low hardware + peer trust inclusion"
        },
        steps: [
            {
                title: "Trust Configuration",
                desc: "Each node defines its own subset of trusted peers (a 'Quorum Slice'). Nodes build decentralized networks of trust."
            },
            {
                title: "Nomination Phase",
                desc: "Nodes propose candidate transactions for a ledger slot and broadcast their choices to peers in their quorum slices."
            },
            {
                title: "Ballot Selection",
                desc: "Nodes vote on candidates, checking if a quorum of peers agrees. If a consensus slice matches, the ballot is prepared."
            },
            {
                title: "Commit Phase",
                desc: "Nodes commit to the agreed-upon ballot and verify that their trusted peers have committed to the same ledger modifications."
            },
            {
                title: "Final Externalization",
                desc: "The transaction set is finalized. Once a node's quorum slice reaches agreement, it updates its local ledger instantly."
            }
        ],
        blockchains: [
            {
                name: "Stellar",
                layer: "Layer 1 (Base Chain)",
                layerType: "L1",
                rationale: "Uses the Stellar Consensus Protocol (SCP) — an FBA model. Stellar targets cross-border asset tokenization and remittance, requiring sub-second finality.",
                languages: ["Rust (Soroban Smart Contracts)", "JavaScript", "Python", "Go (SDKs)"]
            },
            {
                name: "Ripple",
                layer: "Layer 1 (Base Chain)",
                layerType: "L1",
                rationale: "Uses the Ripple Protocol Consensus Algorithm (RPCA). It relies on a Unique Node List (UNL) of trusted validators to settle global banking payments.",
                languages: ["C++ (XRPL Hooks)"]
            }
        ]
    }
};
// 2. Compatibility Heatmap Dataset
const blockchainsList = ["Bitcoin", "Litecoin", "Ethereum", "Cardano", "Solana", "BNB Chain", "Stellar", "Arbitrum"];
const compatibilityMap = {
    "Bitcoin": {
        "Bitcoin": { status: "Compatible", detail: "Same protocol (PoW). Self-compatible." },
        "Litecoin": { status: "Compatible", detail: "Both use Proof of Work (PoW). Bridges can verify hash proofs directly, enabling atomic swaps." },
        "Ethereum": { status: "Incompatible", detail: "PoW vs PoS. Requires custodial/wrapped assets (e.g. WBTC) or multi-signature bridging bridges." },
        "Cardano": { status: "Incompatible", detail: "PoW vs PoS. Different consensus structures; trustless bridging requires zero-knowledge proofs (e.g. NiPoPoWs)." },
        "Solana": { status: "Incompatible", detail: "PoW vs PoH+PoS. Different timing architectures; requires trust-assumed multi-sig validators (e.g. Wormhole)." },
        "BNB Chain": { status: "Incompatible", detail: "PoW vs PoA. BNB uses authority nodes; Bitcoin uses mining hash power. Incompatible at protocol level." },
        "Stellar": { status: "Incompatible", detail: "PoW vs FBA. Stellar relies on quorum slices; Bitcoin relies on hash power. Bridges must rely on validators." },
        "Arbitrum": { status: "Incompatible", detail: "PoW vs L2 Rollup. Arbitrum settles state roots directly on Ethereum's PoS, making direct Bitcoin bridging incompatible." }
    },
    "Litecoin": {
        "Bitcoin": { status: "Compatible", detail: "Both use Proof of Work (PoW). Allows trustless atomic swaps and light client relay validation." },
        "Litecoin": { status: "Compatible", detail: "Same protocol (PoW). Self-compatible." },
        "Ethereum": { status: "Incompatible", detail: "PoW vs PoS. Requires wrapper assets or validator-based bridge relays." },
        "Cardano": { status: "Incompatible", detail: "PoW vs PoS. Incompatible at consensus level. Bridging must rely on central wrapping services." },
        "Solana": { status: "Incompatible", detail: "PoW vs PoH+PoS. Requires multi-sig oracle bridges to verify cross-chain transactions." },
        "BNB Chain": { status: "Incompatible", detail: "PoW vs PoA. Incompatible at protocol level. Interoperability requires trusted bridge pools." },
        "Stellar": { status: "Incompatible", detail: "PoW vs FBA. Requires multi-signature anchors to bridge assets between Litecoin and Stellar." },
        "Arbitrum": { status: "Incompatible", detail: "PoW vs L2 Rollup. Litecoin lacks smart contracts to verify rollup fraud proofs natively." }
    },
    "Ethereum": {
        "Bitcoin": { status: "Incompatible", detail: "PoS vs PoW. Bridging requires wrapped assets (e.g. WBTC) verified by custodian nodes." },
        "Litecoin": { status: "Incompatible", detail: "PoS vs PoW. Bridging requires collateralized wrapper vaults." },
        "Ethereum": { status: "Compatible", detail: "Same protocol (PoS). Self-compatible." },
        "Cardano": { status: "Compatible", detail: "Both use Proof of Stake (PoS). Can construct trustless light client bridges (like Mithril) to check validator signatures." },
        "Solana": { status: "Incompatible", detail: "PoS vs PoH+PoS. Different clock finalities; bridged via multi-sig networks or ZK state proof relays." },
        "BNB Chain": { status: "Compatible", detail: "Both use Staking/Authority consensus with EVM support. Interoperability is highly compatible via trustless state relays." },
        "Stellar": { status: "Incompatible", detail: "PoS vs FBA. Requires trusted institutional portals or anchors to bridge assets." },
        "Arbitrum": { status: "Compatible", detail: "Native Layer 1 to Layer 2 relation. Arbitrum posts transaction state batches directly to Ethereum's PoS consensus." }
    },
    "Cardano": {
        "Bitcoin": { status: "Incompatible", detail: "PoS vs PoW. Direct bridging is impossible without wrapped or federated assets." },
        "Litecoin": { status: "Incompatible", detail: "PoS vs PoW. Requires federated bridge multi-signatures." },
        "Ethereum": { status: "Compatible", detail: "Both use Proof of Stake (PoS). Validator signatures can be read to build decentralized bridges." },
        "Cardano": { status: "Compatible", detail: "Same protocol (PoS). Self-compatible." },
        "Solana": { status: "Incompatible", detail: "PoS vs PoH+PoS. Requires cross-chain oracle nodes to relay state data." },
        "BNB Chain": { status: "Compatible", detail: "PoS vs PoSA. Staking architectures align; requires relayers to map Cardano's UTXO and BNB's Account models." },
        "Stellar": { status: "Incompatible", detail: "PoS vs FBA. Requires external bridge portals." },
        "Arbitrum": { status: "Incompatible", detail: "Cardano (PoS L1) cannot natively read Arbitrum's Ethereum L2 optimistic rollup batches." }
    },
    "Solana": {
        "Bitcoin": { status: "Incompatible", detail: "PoH+PoS vs PoW. Direct bridging requires custodian wrappers (e.g. tBTC)." },
        "Litecoin": { status: "Incompatible", detail: "PoH+PoS vs PoW. Bridging is routed via tokenized wrappers." },
        "Ethereum": { status: "Incompatible", detail: "PoH+PoS vs PoS. Bridged via decentralized oracle clusters (e.g. Wormhole) or zk-SNARK state proof verifiers." },
        "Cardano": { status: "Incompatible", detail: "PoH+PoS vs PoS. Requires external relayers to verify and sign cross-chain transactions." },
        "Solana": { status: "Compatible", detail: "Same protocol (PoH+PoS). Self-compatible." },
        "BNB Chain": { status: "Incompatible", detail: "PoH+PoS vs PoA/PoSA. Different execution times; bridged via validator consensus relays." },
        "Stellar": { status: "Incompatible", detail: "PoH+PoS vs FBA. Requires centralized or federated gateways to bridge assets." },
        "Arbitrum": { status: "Incompatible", detail: "Requires L1 Ethereum bridge as an intermediary to connect Solana to Arbitrum L2 rollup." }
    },
    "BNB Chain": {
        "Bitcoin": { status: "Incompatible", detail: "PoA vs PoW. Requires centralized or federated custodian wrapping." },
        "Litecoin": { status: "Incompatible", detail: "PoA vs PoW. Assets must be bridged through custodian pools." },
        "Ethereum": { status: "Compatible", detail: "Both use validator-based consensus (PoS/PoSA) and EVM, allowing clean smart contract relay bridges." },
        "Cardano": { status: "Compatible", detail: "PoSA vs PoS. Staking frameworks enable cross-chain validation contracts." },
        "Solana": { status: "Incompatible", detail: "PoA vs PoH+PoS. Requires multi-signature validator bridge nodes." },
        "BNB Chain": { status: "Compatible", detail: "Same protocol (PoA/PoSA). Self-compatible." },
        "Stellar": { status: "Incompatible", detail: "PoA vs FBA. Requires anchor networks or third-party wrappers." },
        "Arbitrum": { status: "Compatible", detail: "Both run EVM architectures, enabling smooth token bridges (via liquidity pool relays like Stargate)." }
    },
    "Stellar": {
        "Bitcoin": { status: "Incompatible", detail: "FBA vs PoW. Stellar uses native 'Anchors' (vetted gateways) to lock BTC and issue wrapped assets on Stellar." },
        "Litecoin": { status: "Incompatible", detail: "FBA vs PoW. Utilizes institutional gateways/anchors." },
        "Ethereum": { status: "Incompatible", detail: "FBA vs PoS. Interoperable via Stellar's smart contracts (Soroban) or multi-sig portals." },
        "Cardano": { status: "Incompatible", detail: "FBA vs PoS. Requires specialized bridge validators." },
        "Solana": { status: "Incompatible", detail: "FBA vs PoH+PoS. Bridged via federated node integrations." },
        "BNB Chain": { status: "Incompatible", detail: "FBA vs PoA. Requires institutional anchors to bridge tokens." },
        "Stellar": { status: "Compatible", detail: "Same protocol (FBA). Self-compatible." },
        "Arbitrum": { status: "Incompatible", detail: "FBA vs L2 Rollup. Incompatible at protocol level; requires bridging to L1 Ethereum first." }
    },
    "Arbitrum": {
        "Bitcoin": { status: "Incompatible", detail: "L2 Rollup vs PoW. Requires bridging through Ethereum L1 or centralized wrapping hubs." },
        "Litecoin": { status: "Incompatible", detail: "L2 Rollup vs PoW. Incompatible natively." },
        "Ethereum": { status: "Compatible", detail: "Native Layer 1 to Layer 2 relationship. Arbitrum settles directly to Ethereum's consensus." },
        "Cardano": { status: "Incompatible", detail: "Arbitrum is an Ethereum L2 and cannot settle or bridge natively to Cardano's PoS." },
        "Solana": { status: "Incompatible", detail: "Requires L1 bridge relays or cross-chain messaging routers." },
        "BNB Chain": { status: "Compatible", detail: "Both share EVM foundations, enabling highly efficient bridge contracts." },
        "Stellar": { status: "Incompatible", detail: "Incompatible at consensus level. Must route assets through L1 gateways." },
        "Arbitrum": { status: "Compatible", detail: "Same protocol (L2 Rollup). Self-compatible." }
    }
};
// 3. Application State
let activeAlgoId = "pow";
let simTimeoutId = null;
// 4. DOM Elements
const algoCards = document.querySelectorAll(".algo-card");
const panelOverview = document.getElementById("panel-overview");
const panelTrilemma = document.getElementById("panel-trilemma");
const panelMapping = document.getElementById("panel-mapping");
const panelMatrix = document.getElementById("panel-matrix");
const panelSimulator = document.getElementById("panel-simulator");
const algoDescriptionEl = document.getElementById("algo-description");
const algoTaglineEl = document.getElementById("algo-tagline");
const timelineFlowEl = document.getElementById("timeline-flow");
const scoreScalabilityValEl = document.getElementById("score-scalability-val");
const scoreSecurityValEl = document.getElementById("score-security-val");
const scoreDecentralisationValEl = document.getElementById("score-decentralisation-val");
const fillScalabilityEl = document.getElementById("fill-scalability");
const fillSecurityEl = document.getElementById("fill-security");
const fillDecentralisationEl = document.getElementById("fill-decentralisation");
const specBlockTimeEl = document.getElementById("spec-blocktime");
const specTpsEl = document.getElementById("spec-tps");
const specNodesEl = document.getElementById("spec-nodes");
const specStakeEl = document.getElementById("spec-stake");
const mappingContainerEl = document.getElementById("mapping-container");
const matrixHeaderEl = document.querySelector("#compatibility-matrix thead");
const matrixBodyEl = document.getElementById("compatibility-matrix-body");
const matrixInfoEl = document.getElementById("matrix-info");
// Simulator DOM
const sliderAttackerPower = document.getElementById("slider-attacker-power");
const sliderNodes = document.getElementById("slider-nodes");
const valAttackerPower = document.getElementById("val-attacker-power");
const valNodes = document.getElementById("val-nodes");
const btnSybil = document.getElementById("btn-sybil-attack");
const btnTakeover = document.getElementById("btn-takeover-attack");
const simOutcomeText = document.getElementById("sim-outcome-text");
const simLogText = document.getElementById("sim-log-text");
// 5. Core Initialization
function init() {
    bindEvents();
    renderCompatibilityMatrix();
    updateDashboard(activeAlgoId);
}
// 6. Event Bindings
function bindEvents() {
    algoCards.forEach(card => {
        card.addEventListener("click", () => {
            // Toggle active states
            algoCards.forEach(c => {
                c.classList.remove("active");
                c.setAttribute("aria-pressed", "false");
            });
            card.classList.add("active");
            card.setAttribute("aria-pressed", "true");
            activeAlgoId = card.getAttribute("data-algo");
            updateDashboard(activeAlgoId);
        });
    });
    // Simulator controls
    sliderAttackerPower.addEventListener("input", (e) => {
        valAttackerPower.textContent = `${e.target.value}%`;
    });
    sliderNodes.addEventListener("input", (e) => {
        valNodes.textContent = `${Number(e.target.value).toLocaleString()} nodes`;
    });
    btnSybil.addEventListener("click", () => {
        runAttackSimulation("sybil");
    });
    btnTakeover.addEventListener("click", () => {
        runAttackSimulation("takeover");
    });
}
// 7. Update Dashboard Content based on selected Algorithm
function updateDashboard(algoId) {
    const algo = algorithmsData[algoId];
    if (!algo) return;
    // Update theme colors of panels
    const allPanels = [panelOverview, panelTrilemma, panelMapping, panelMatrix, panelSimulator];
    const themeClasses = ["panel-pow", "panel-pos", "panel-poh", "panel-dpos", "panel-poa", "panel-pbft"];

    allPanels.forEach(panel => {
        panel.classList.remove(...themeClasses);
        panel.classList.add(`panel-${algoId}`);
    });
    // Set local style color variable on panels for custom SVG styles & inputs
    let accentColor = "var(--accent-pow)";
    if (algoId === "pos") accentColor = "var(--accent-pos)";
    else if (algoId === "poh") accentColor = "var(--accent-poh)";
    else if (algoId === "dpos") accentColor = "var(--accent-dpos)";
    else if (algoId === "poa") accentColor = "var(--accent-poa)";
    else if (algoId === "pbft") accentColor = "var(--accent-pbft)";

    document.documentElement.style.setProperty("--accent-theme", accentColor);
    // 7a. Update Overview Text
    algoDescriptionEl.textContent = algo.description;
    algoTaglineEl.textContent = algo.tagline;
    // 7b. Render Timeline Flow
    timelineFlowEl.innerHTML = "";
    algo.steps.forEach((step, idx) => {
        const stepEl = document.createElement("div");
        stepEl.className = "timeline-step";
        stepEl.style.animationDelay = `${idx * 0.1}s`;

        stepEl.innerHTML = `
      <div class="step-node"></div>
      <div class="step-content">
        <h4>Step ${idx + 1}: ${step.title}</h4>
        <p>${step.desc}</p>
      </div>
    `;
        timelineFlowEl.appendChild(stepEl);
    });
    // 7c. Render Trilemma Data (Radar + Scorebars)
    updateRadarChart(algo.scores, algoId);
    updateScoreBars(algo.scores);
    // Update specs
    specBlockTimeEl.textContent = algo.specs.blockTime;
    specTpsEl.textContent = algo.specs.tps;
    specNodesEl.textContent = algo.specs.nodes;
    specStakeEl.textContent = algo.specs.stake;
    // 7d. Render Real-World Mapping
    mappingContainerEl.innerHTML = "";
    algo.blockchains.forEach(chain => {
        const card = document.createElement("div");
        card.className = "blockchain-map-card";

        // languages list
        const langBadges = chain.languages.map(lang => `<span class="language-badge">${lang}</span>`).join(" ");

        card.innerHTML = `
      <div class="blockchain-card-header">
        <div class="blockchain-info">
          <span class="blockchain-name">${chain.name}</span>
          <span class="layer-badge ${chain.layerType === 'L1' ? 'badge-l1' : 'badge-l2'}">${chain.layer}</span>
        </div>
      </div>
      <p class="blockchain-rationale">${chain.rationale}</p>
      <div class="blockchain-meta-info">
        <span class="meta-label">Smart Contracts:</span>
        ${langBadges}
      </div>
    `;
        mappingContainerEl.appendChild(card);
    });
    // 7e. Update Heatmap/Compatibility Highlights
    highlightMatrixForAlgo(algo);
    // Reset simulator view
    resetSimulator();
}
// 8. Custom SVG Radar Chart Drawing
function updateRadarChart(scores, algoId) {
    const radarShape = document.getElementById("radar-shape");
    const dotScale = document.getElementById("dot-scalability");
    const dotSec = document.getElementById("dot-security");
    const dotDec = document.getElementById("dot-decentralisation");
    // Centers are (120, 120)
    const cx = 120;
    const cy = 120;
    // Calculate radius for each score (max score is 10, maps to 100px radius)
    const rScalability = scores.scalability * 10;
    const rSecurity = scores.security * 10;
    const rDecentralisation = scores.decentralisation * 10;
    // Calculate coordinates
    // 1. Scalability (0 degrees = Straight Up: x = 120, y = 120 - R)
    const x1 = cx;
    const y1 = cy - rScalability;
    // 2. Security (120 degrees = Bottom-Right: x = 120 + R * cos(30), y = 120 + R * sin(30))
    // cos(30) = 0.866, sin(30) = 0.5
    const x2 = cx + rSecurity * 0.8660;
    const y2 = cy + rSecurity * 0.5;
    // 3. Decentralisation (240 degrees = Bottom-Left: x = 120 - R * cos(30), y = 120 + R * sin(30))
    const x3 = cx - rDecentralisation * 0.8660;
    const y3 = cy + rDecentralisation * 0.5;
    // Update radar shape points
    radarShape.setAttribute("points", `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
    // Set colors based on algorithm
    let colorStroke = "#ff9f43";
    let colorArea = "rgba(255, 159, 67, 0.15)";

    if (algoId === "pos") {
        colorStroke = "#1dd1a1";
        colorArea = "rgba(29, 209, 161, 0.15)";
    } else if (algoId === "poh") {
        colorStroke = "#a55eea";
        colorArea = "rgba(165, 94, 234, 0.15)";
    } else if (algoId === "dpos") {
        colorStroke = "#48dbfb";
        colorArea = "rgba(72, 219, 251, 0.15)";
    } else if (algoId === "poa") {
        colorStroke = "#ff6b6b";
        colorArea = "rgba(255, 107, 107, 0.15)";
    } else if (algoId === "pbft") {
        colorStroke = "#00d2d3";
        colorArea = "rgba(0, 210, 211, 0.15)";
    }
    document.documentElement.style.setProperty("--accent-stroke", colorStroke);
    document.documentElement.style.setProperty("--accent-area", colorArea);
    // Position the dots
    dotScale.setAttribute("cx", x1);
    dotScale.setAttribute("cy", y1);
    dotSec.setAttribute("cx", x2);
    dotSec.setAttribute("cy", y2);
    dotDec.setAttribute("cx", x3);
    dotDec.setAttribute("cy", y3);
}
// 9. Update Score Bar Layouts
function updateScoreBars(scores) {
    scoreScalabilityValEl.textContent = `${scores.scalability}/10`;
    scoreSecurityValEl.textContent = `${scores.security}/10`;
    scoreDecentralisationValEl.textContent = `${scores.decentralisation}/10`;
    fillScalabilityEl.style.width = `${scores.scalability * 10}%`;
    fillSecurityEl.style.width = `${scores.security * 10}%`;
    fillDecentralisationEl.style.width = `${scores.decentralisation * 10}%`;
}
// 10. Generate Compatibility Heatmap Table
function renderCompatibilityMatrix() {
    // Render headers
    let headHtml = `<tr><th class="corner-cell" aria-label="Blockchains compatibility grid corner"></th>`;
    blockchainsList.forEach(chain => {
        headHtml += `<th scope="col" id="col-header-${chain.replace(/\s+/g, '')}">${chain}</th>`;
    });
    headHtml += `</tr>`;
    matrixHeaderEl.innerHTML = headHtml;
    // Render rows
    let bodyHtml = "";
    blockchainsList.forEach(rowChain => {
        bodyHtml += `<tr id="row-line-${rowChain.replace(/\s+/g, '')}">`;
        bodyHtml += `<th scope="row" class="matrix-header-y" id="row-header-${rowChain.replace(/\s+/g, '')}">${rowChain}</th>`;

        blockchainsList.forEach(colChain => {
            const match = compatibilityMap[rowChain][colChain];
            const isCompat = match.status === "Compatible";
            const cellClass = isCompat ? "cell-compat" : "cell-incompat";
            const content = isCompat ? "COMPAT" : "INCOMPAT";

            bodyHtml += `
        <td class="${cellClass}" 
            data-row="${rowChain}" 
            data-col="${colChain}" 
            tabindex="0"
            role="gridcell"
            aria-describedby="matrix-info"
            aria-label="${rowChain} and ${colChain} compatibility: ${match.status}">
          ${content}
        </td>
      `;
        });

        bodyHtml += `</tr>`;
    });
    matrixBodyEl.innerHTML = bodyHtml;
    // Attach matrix event listeners for interactive cells
    const cells = matrixBodyEl.querySelectorAll("td");
    cells.forEach(cell => {
        const showDetails = () => {
            const row = cell.getAttribute("data-row");
            const col = cell.getAttribute("data-col");
            const data = compatibilityMap[row][col];
            const statusText = data.status === "Compatible" ? "🟢 Compatible" : "🔴 Incompatible";

            // Update info box
            matrixInfoEl.innerHTML = `
        <span class="title">${row} &amp; ${col} — ${statusText}</span>
        ${data.detail}
      `;
        };
        cell.addEventListener("mouseenter", showDetails);
        cell.addEventListener("focus", showDetails);

        cell.addEventListener("mouseleave", () => {
            // Return to default active algorithm compatibility state or general tip
            restoreDefaultMatrixInfo();
        });
        cell.addEventListener("blur", () => {
            restoreDefaultMatrixInfo();
        });
    });
}
// Restore default compatibility matrix explanation
function restoreDefaultMatrixInfo() {
    const algo = algorithmsData[activeAlgoId];
    const blockchains = algo.blockchains.map(b => b.name).join(", ");

    matrixInfoEl.innerHTML = `
    <span class="title">Active Context: ${algo.name} Compatibility</span>
    Highlighting blockchains utilizing ${algo.acronym} (${blockchains}). Hover over intersection cells to inspect cross-chain bridging details.
  `;
}
// Highlight compatibility rows and columns matching selected algorithm blockchains
function highlightMatrixForAlgo(algo) {
    const activeChainNames = algo.blockchains.map(b => b.name);

    // Clear previous highlights
    const rows = matrixBodyEl.querySelectorAll("tr");
    const headersY = matrixBodyEl.querySelectorAll(".matrix-header-y");
    const headersX = matrixHeaderEl.querySelectorAll("th");
    const cells = matrixBodyEl.querySelectorAll("td");
    rows.forEach(r => r.classList.remove("active-row"));
    headersY.forEach(h => h.style.color = "");
    headersX.forEach(h => h.style.color = "");
    cells.forEach(c => {
        c.classList.remove("active-highlight");
        c.style.opacity = "0.5"; // Dim inactive intersections
    });
    // Apply new highlights
    blockchainsList.forEach((chain, colIdx) => {
        const isChainActive = activeChainNames.includes(chain);

        if (isChainActive) {
            // Highlight X-Header
            const xHead = document.getElementById(`col-header-${chain.replace(/\s+/g, '')}`);
            if (xHead) xHead.style.color = "var(--accent-theme)";
            // Highlight Y-Header
            const yHead = document.getElementById(`row-header-${chain.replace(/\s+/g, '')}`);
            if (yHead) {
                yHead.style.color = "var(--accent-theme)";
                yHead.parentElement.classList.add("active-row");
            }
        }
    });
    // Highlight intersection cells between active chains
    cells.forEach(cell => {
        const rowVal = cell.getAttribute("data-row");
        const colVal = cell.getAttribute("data-col");

        const rowActive = activeChainNames.includes(rowVal);
        const colActive = activeChainNames.includes(colVal);
        if (rowActive || colActive) {
            cell.style.opacity = "1.0"; // Full opacity for relevant intersections
            if (rowActive && colActive) {
                cell.classList.add("active-highlight");
            }
        }
    });
    restoreDefaultMatrixInfo();
}
// 11. Interactive Attack Simulator Logic
function resetSimulator() {
    if (simTimeoutId) clearTimeout(simTimeoutId);
    simOutcomeText.textContent = "System Idle. Ready for input.";
    simOutcomeText.className = "sim-outcome outcome-pending";
    simLogText.textContent = `Targeting Active Protocol: ${algorithmsData[activeAlgoId].name}\nSelect attack specifications on the left to begin...`;
    btnSybil.disabled = false;
    btnTakeover.disabled = false;
}
function runAttackSimulation(attackType) {
    if (simTimeoutId) clearTimeout(simTimeoutId);
    // Disable buttons during simulation runs
    btnSybil.disabled = true;
    btnTakeover.disabled = true;
    const attackerPower = parseInt(sliderAttackerPower.value, 10);
    const honestNodes = parseInt(sliderNodes.value, 10);
    const algoId = activeAlgoId;
    const algo = algorithmsData[algoId];
    simOutcomeText.textContent = "Simulating Attack...";
    simOutcomeText.className = "sim-outcome outcome-pending";
    simLogText.textContent = `[SYSTEM INIT] Connecting to validator mesh...\n`;
    // Simulation sequence logs
    let steps = [];
    if (attackType === "sybil") {
        // SYBIL ATTACK SIMULATION
        steps.push(`[1/4] Spawning ${honestNodes.toLocaleString()} malicious virtual Sybil identities...`);

        if (algoId === "pow") {
            steps.push(`[2/4] Sybils flooding peer mempools with transactions...`);
            steps.push(`[3/4] Honest mining nodes verify block mathematical hash puzzle (SHA-256 target check).`);
            steps.push(`[4/4] Sybil node count ignored. Nakamoto consensus allocates voting weight solely based on physical compute hashrate.`);
            steps.push(`[RESULT] Attack Defeated. PoW security relies on hardware work, not virtual node counts. Attacker holds only ${attackerPower}% of actual hash rate.`);
            steps.push("FAIL");
        }
        else if (algoId === "pos") {
            steps.push(`[2/4] Launching virtual validators. Attempting registration without active staking ledger balance...`);
            steps.push(`[3/4] Ethereum Staking Deposit Contract checks credentials. Staked balance of Sybils = 0 ETH.`);
            steps.push(`[4/4] Validator selection filter rejects the attackers due to lack of minimum 32 ETH locked capital.`);
            steps.push(`[RESULT] Attack Defeated. Proof of Stake requires physical collateral backing. Multiplied node ids without capital lockup are ignored.`);
            steps.push("FAIL");
        }
        else if (algoId === "poh") {
            steps.push(`[2/4] Flooding Solana gossip network with virtual validator IDs...`);
            steps.push(`[3/4] Leader node checks timing slot alignment. Sybils lack verifiable delay function (VDF) clock inputs.`);
            steps.push(`[4/4] Validator pipeline drops un-staked, out-of-sync nodes from Tower BFT voting schedules.`);
            steps.push(`[RESULT] Attack Defeated. High-speed timing pipeline and PoS voting requirements filter out zero-collateral Sybil identities.`);
            steps.push("FAIL");
        }
        else if (algoId === "dpos") {
            steps.push(`[2/4] Deploying Sybil nodes. Requesting slots in scheduling queues...`);
            steps.push(`[3/4] Ledger checks stakeholder delegation database. Top-voted delegate slots are filled by active, voter-backed nodes.`);
            steps.push(`[4/4] Attackers hold 0 voter delegation tokens. System bypasses block proposals from un-voted nodes.`);
            steps.push(`[RESULT] Attack Defeated. DPoS locks block proposal rights to the top N delegates (e.g. 27). Virtual nodes fail to bypass democratic voting.`);
            steps.push("FAIL");
        }
        else if (algoId === "poa") {
            steps.push(`[2/4] Attempting to connect Sybil nodes directly to BNB/VeChain authority networks...`);
            steps.push(`[3/4] Whitelist signature validation check. Whitelisted node registry verifies cryptographic identity.`);
            steps.push(`[4/4] Vetting records fail. Sybil keys are missing from the governing consortium certificate directory.`);
            steps.push(`[RESULT] Attack Defeated. Proof of Authority permits validation duties only to pre-vetted whitelisted addresses.`);
            steps.push("FAIL");
        }
        else if (algoId === "pbft") {
            steps.push(`[2/4] Deploying fake nodes. Querying Stellar federated consensus nodes for inclusion...`);
            steps.push(`[3/4] Stellar Consensus Protocol check. Existing nodes examine local Quorum Slices.`);
            steps.push(`[4/4] Sybils are excluded from trust config matrices. Quorum slices remain closed to unknown actors.`);
            steps.push(`[RESULT] Attack Defeated. Federated Byzantine Agreement relies on peer-defined overlapping trust trees. Un-trusted nodes have zero consensus influence.`);
            steps.push("FAIL");
        }
    }
    else {
        // 51% / TAKEOVER ATTACK SIMULATION
        steps.push(`[1/4] Aggregating resources... Attacker commands ${attackerPower}% of total consensus weight.`);

        if (algoId === "pow") {
            steps.push(`[2/4] Attempting to construct private block series...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Attacker hash power dominates. Private chain length outpaces the public honest chain.`);
                steps.push(`[4/4] Releasing shadow chain. Nakamoto consensus 'longest-chain rule' forces honest nodes to accept the attacker's double-spend fork.`);
                steps.push(`[RESULT] Network Compromised! 51% hash takeover successful. Transaction history reorganized.`);
                steps.push("SUCCESS");
            } else {
                steps.push(`[3/4] Honest network mining speed exceeds attacker capability. Shadow chain cannot keep pace.`);
                steps.push(`[4/4] Attacker blocks rejected. Honest nodes continue built on standard canonical blocks.`);
                steps.push(`[RESULT] Attack Blocked. Insufficient hashrate to rewrite history. Nakamoto consensus remains secure.`);
                steps.push("FAIL");
            }
        }
        else if (algoId === "pos") {
            steps.push(`[2/4] Staking validator keys. Activating signatures on conflicting block proposals...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Attacker holds absolute stake majority. Finalizing double-signed checkpoints.`);
                steps.push(`[4/4] Attackers validate conflicting states. Double-spend transactions finalized.`);
                steps.push(`[RESULT] Network Compromised! 51% stake takeover successful. Finality safeguards breached.`);
                steps.push("SUCCESS");
            } else if (attackerPower >= 33) {
                steps.push(`[3/4] Attacker stake exceeds liveness safety bounds. Attacker validators stall signature attestations.`);
                steps.push(`[4/4] Staking engine fails to gather 66.7% supermajority attestation required to finalize blocks.`);
                steps.push(`[RESULT] Liveness Halted. Consensus stalled. Double-spend failed, but transaction settlement is blocked.`);
                steps.push("PARTIAL");
            } else {
                steps.push(`[3/4] Attestation pool maintains >67% honest participation. Malicious votes are mathematically ignored.`);
                steps.push(`[4/4] Double-signing detected. Ethereum slashing smart contract destroys the attacker's locked ETH stakes.`);
                steps.push(`[RESULT] Attack Blocked. Attacker assets slashed. Consensus integrity preserved.`);
                steps.push("FAIL");
            }
        }
        else if (algoId === "poh") {
            steps.push(`[2/4] Running sequential VDF pipelines and signing blocks on Solana validators...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Attacker stake controls leader schedules. Solana pipelines accept manipulated timestamps.`);
                steps.push(`[4/4] Leader nodes rewrite sequential entries. Censorship of honest user transactions achieved.`);
                steps.push(`[RESULT] Network Compromised! 51% control of sequence and stake achieved.`);
                steps.push("SUCCESS");
            } else if (attackerPower >= 33) {
                steps.push(`[3/4] Tower BFT consensus voting pool threshold check. Attacker blocks voting progress.`);
                steps.push(`[4/4] Sub-second finality fails due to missing voting majorities. Transaction confirmations freeze.`);
                steps.push(`[RESULT] Liveness Halted. Fast settlement stopped. Chain freezes, though double-spend was blocked.`);
                steps.push("PARTIAL");
            } else {
                steps.push(`[3/4] Tower BFT maintains high-speed validation. Honest leader schedules remain aligned.`);
                steps.push(`[4/4] Out-of-sync block proposals are dropped. Leader pipeline bypasses delayed validator responses.`);
                steps.push(`[RESULT] Attack Blocked. Fast pipelines and Tower BFT voting weights drop minority attacker nodes.`);
                steps.push("FAIL");
            }
        }
        else if (algoId === "dpos") {
            steps.push(`[2/4] Acquiring tokens to vote. Attempting to hijack delegate seats...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Voter turnout manipulation. Attacker elects a majority (e.g. 14 of 27) of Super Representatives.`);
                steps.push(`[4/4] Malicious representatives collude to write conflicting blocks and sign double-spend state changes.`);
                steps.push(`[RESULT] Network Compromised! Attacker captured majority representative slots (51%+), subverting consensus.`);
                steps.push("SUCCESS");
            } else {
                steps.push(`[3/4] Attacker elects only a minority of delegates. Honest representatives maintain majority validation.`);
                steps.push(`[4/4] Malicious block suggestions from attacker representatives are rejected by honest delegate consensus.`);
                steps.push(`[RESULT] Attack Blocked. Voter delegation failed to secure majority seat representation.`);
                steps.push("FAIL");
            }
        }
        else if (algoId === "poa") {
            steps.push(`[2/4] Compromising keys or colluding with whitelisted authority nodes...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Attacker controls more than half of whitelisted authority keys (51%+).`);
                steps.push(`[4/4] Malicious authority validators execute double-signature forks. Consortium validation rules accept signatures.`);
                steps.push(`[RESULT] Network Compromised! Collusion takeover successful. Central gatekeeper trust was breached.`);
                steps.push("SUCCESS");
            } else {
                steps.push(`[3/4] Honest whitelisted nodes detect conflicting signatures from the compromised validator subset.`);
                steps.push(`[4/4] Off-chain governance council executes emergency key rotation, revoking compromised node certificates.`);
                steps.push(`[RESULT] Attack Blocked. Consortium governance rotated keys, maintaining network operation.`);
                steps.push("FAIL");
            }
        }
        else if (algoId === "pbft") {
            steps.push(`[2/4] Compromising core institutional validators in Stellar quorum slices...`);
            if (attackerPower >= 51) {
                steps.push(`[3/4] Attacker nodes dominate critical quorum intersections. Overlapping slices agree on the malicious state.`);
                steps.push(`[4/4] Federated Byzantine Consensus validates the duplicate ledger slots. Double-spend externalized.`);
                steps.push(`[RESULT] Network Compromised! Core trusted institution takeover successful.`);
                steps.push("SUCCESS");
            } else if (attackerPower >= 33) {
                steps.push(`[3/4] Attacker nodes refuse to ballot-vote on active transaction slots.`);
                steps.push(`[4/4] Quorum slices cannot align on transaction selection. Ledger halts safety operations to prevent forks.`);
                steps.push(`[RESULT] Liveness Halted. Ledger progression frozen to prevent double-spending. Stellar safety rules enforced.`);
                steps.push("PARTIAL");
            } else {
                steps.push(`[3/4] Quorum slices bypass the faulty/silent node subset. Overlapping agreements maintained.`);
                steps.push(`[4/4] Stellar Consensus Protocol externalizes transactions seamlessly using remaining active trust slices.`);
                steps.push(`[RESULT] Attack Blocked. Federated agreement tolerates minority validator failure easily.`);
                steps.push("FAIL");
            }
        }
    }
    // Animate the log text line-by-line
    let logText = "";
    let logIdx = 0;
    function runLogInterval() {
        if (logIdx < steps.length - 1) {
            logText += `${steps[logIdx]}\n\n`;
            simLogText.textContent = logText;
            simLogText.scrollTop = simLogText.scrollHeight;
            logIdx++;
            simTimeoutId = setTimeout(runLogInterval, 900);
        } else {
            // Last element is the outcome keyword
            const outcome = steps[steps.length - 1];
            if (outcome === "SUCCESS") {
                simOutcomeText.textContent = "ATTACK SUCCEEDED ⚠️";
                simOutcomeText.className = "sim-outcome outcome-success";
            } else if (outcome === "PARTIAL") {
                simOutcomeText.textContent = "LIVENESS STALLED ⏳";
                simOutcomeText.className = "sim-outcome outcome-fail";
            } else {
                simOutcomeText.textContent = "ATTACK DEFEATED ✅";
                simOutcomeText.className = "sim-outcome outcome-fail";
            }

            // Re-enable buttons
            btnSybil.disabled = false;
            btnTakeover.disabled = false;
        }
    }
    simTimeoutId = setTimeout(runLogInterval, 300);
}
// 12. Run on page load
window.addEventListener("DOMContentLoaded", init);
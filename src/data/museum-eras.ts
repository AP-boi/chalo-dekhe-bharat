export interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  position2D: { x: string; y: string }; // CSS position percentage for hotspot pins on video background
  significance: string;
}

export interface MuseumEra {
  id: string;
  title: string;
  period: string;
  tagline: string;
  narrative: string;
  audioScript: string;
  videoFileName: string;
  themeColor: string;
  hotspots: Hotspot[];
}

export const MUSEUM_ERAS: MuseumEra[] = [
  {
    id: "indus-valley",
    title: "Indus Valley Civilization",
    period: "3300 – 1300 BCE",
    tagline: "Dawn of Urban Planning, Metallurgy & Water Management",
    videoFileName: "museum-indus.mp4",
    themeColor: "from-amber-900/80 to-stone-900",
    narrative:
      "The Harappan civilization was one of the earliest urban sanctuaries in antiquity, flourishing along the fertile basins of the Indus and Ghaggar-Hakra rivers. Renowned for grid-based town planning, standardized burnt-brick architecture, complex subterranean drainage systems, and sophisticated artisan crafts, Harappa and Mohenjo-daro set ancient standards of public health and civil engineering.",
    audioScript:
      "Welcome to the Indus Valley era. Over five thousand years ago, human civilization reached unprecedented urban sophistication here. Notice the grid-patterned streets, burnt-brick structures, and subterranean drainage systems that rivaled modern engineering.",
    hotspots: [
      {
        id: "great-bath",
        title: "The Great Bath of Mohenjo-daro",
        subtitle: "Waterproof Brick Engineering",
        description:
          "Constructed around 2500 BCE, this public water pool features finely fitted bricks, bitumen waterproofing layer, and a drainage outlet system.",
        position2D: { x: "32%", y: "45%" }, // FLAGGED FOR REVIEW: Best guess placement on video background
        significance: "Earliest known public ritual tank in ancient history.",
      },
      {
        id: "dancing-girl",
        title: "The Dancing Girl Bronze",
        subtitle: "Lost-Wax Casting Mastery",
        description:
          "A 10.5 cm bronze figurine crafted using lost-wax casting (cire perdue), displaying advanced metallurgy and artistic flair.",
        position2D: { x: "68%", y: "55%" }, // FLAGGED FOR REVIEW
        significance: "Demonstrates prehistoric expertise in metal alloy casting.",
      },
      {
        id: "pashupati-seal",
        title: "Pashupati Steatite Seal",
        subtitle: "Proto-Shiva Iconography",
        description:
          "Carved seal depicting a seated horned figure surrounded by wild animals (elephant, tiger, rhino, buffalo), considered an early proto-Shiva motif.",
        position2D: { x: "50%", y: "65%" }, // FLAGGED FOR REVIEW
        significance: "Key evidence of spiritual iconology and Indus script glyphs.",
      },
    ],
  },
  {
    id: "mauryan",
    title: "Mauryan Empire & Ashoka",
    period: "322 – 185 BCE",
    tagline: "Unification, Moral Edicts & Monumental Stone Pillars",
    videoFileName: "museum-mauryan.mp4",
    themeColor: "from-[#8b1a1a]/80 to-amber-950",
    narrative:
      "Under Emperor Chandragupta Maurya and Emperor Ashoka the Great, the Mauryan Empire established subcontinent-wide administrative unity. Following the Kalinga War, Ashoka embraced Dhamma (righteousness) and non-violence (Ahimsa), inscribing royal rock edicts across India and erecting polished sandstone pillars topped with lion capitals.",
    audioScript:
      "Step into the Mauryan Golden Era. Emperor Ashoka transformed warfare into a legacy of peace, erecting polished monolithic pillars and carving moral edicts across rock faces from Afghanistan to Andhra Pradesh.",
    hotspots: [
      {
        id: "sarnath-capital",
        title: "Sarnath Lion Capital",
        subtitle: "National Emblem of India",
        description:
          "Polished Chunar sandstone capital with four back-to-back Asiatic lions standing over an abacus decorated with a wheel (Dharmachakra).",
        position2D: { x: "48%", y: "40%" }, // FLAGGED FOR REVIEW
        significance: "Symbol of sovereignty, truth, and moral law.",
      },
      {
        id: "sanchi-stupa",
        title: "Great Stupa of Sanchi",
        subtitle: "Buddhist Sacred Architecture",
        description:
          "Hemispherical brick structure encasing sacred relics, flanked by carved stone toranas (gateways) recounting Jataka stories.",
        position2D: { x: "25%", y: "58%" }, // FLAGGED FOR REVIEW
        significance: "Oldest standing stone structure in India.",
      },
    ],
  },
  {
    id: "mughal",
    title: "Mughal Architecture",
    period: "1526 – 1857 CE",
    tagline: "Pietra Dura, Marble Symphonies & Imperial Gardens",
    videoFileName: "museum-mughal.mp4",
    themeColor: "from-teal-950/80 to-indigo-950",
    narrative:
      "The Mughal dynasty blended Indo-Islamic, Persian, and Central Asian aesthetics, producing iconic architectural monuments. Characterized by white marble, bulbous domes, intricate lattice screens (jali), grand gateways (Buland Darwaza), and inlay stonework (pietra dura), Mughal court art remains world-renowned.",
    audioScript:
      "Welcome to Mughal Imperial Architecture. Admire the breathtaking symmetry of marble domes, fine jali stone screens filtering sunlight, and exquisite pietra dura semi-precious stone inlays.",
    hotspots: [
      {
        id: "taj-mahal",
        title: "Taj Mahal Marble Inlay",
        subtitle: "Pietra Dura & Symmetry",
        description:
          "Pure white Makrana marble mausoleum adorned with lapis lazuli, jasper, and jade floral inlays, engineered with perfect optical balance.",
        position2D: { x: "52%", y: "42%" }, // FLAGGED FOR REVIEW
        significance: "UNESCO World Heritage site and pinnacle of Mughal art.",
      },
      {
        id: "jali-screen",
        title: "Carved Jali Lattice",
        subtitle: "Light & Climate Control",
        description:
          "Perforated stone screen allowing ventilation while creating soft geometric light shadows across inner court chambers.",
        position2D: { x: "75%", y: "60%" }, // FLAGGED FOR REVIEW
        significance: "Mastery of thermal dynamics and shadow geometry.",
      },
    ],
  },
  {
    id: "rajasthani",
    title: "Rajasthani Forts & Palaces",
    period: "15th – 18th Century",
    tagline: "Hill Citadels, Sandstone Haveli & Desert Valor",
    videoFileName: "museum-rajasthani.mp4",
    themeColor: "from-amber-800/80 to-red-950",
    narrative:
      "Perched atop rugged Aravalli ridges, the hill forts of Rajasthan (Mehrangarh, Amber, Chittorgarh, Jaisalmer) reflect Rajput military strategy and regal luxury. Built with red sandstone and yellow marble, these forts featured ornate chhatris (domed pavilions), mirror palaces (Sheesh Mahal), and defensive ramparts.",
    audioScript:
      "Immerse yourself in the golden sands of Rajasthan. Behold the impregnable sandstone walls of desert citadels and intricate Sheesh Mahal mirror pavilions built by Rajput rulers.",
    hotspots: [
      {
        id: "hawa-mahal",
        title: "Hawa Mahal (Palace of Winds)",
        subtitle: "953 Jharokha Windows",
        description:
          "Five-story pink sandstone facade featuring 953 small screened casements (jharokhas) engineered for natural air draft cooling.",
        position2D: { x: "35%", y: "48%" }, // FLAGGED FOR REVIEW
        significance: "Icon of Rajput royal privacy and natural air circulation.",
      },
      {
        id: "sheesh-mahal",
        title: "Sheesh Mahal (Mirror Palace)",
        subtitle: "Concave Glass Mosaic",
        description:
          "Palace hall decorated with thousands of convex mirror fragments that reflect a single candlelight into a thousand shining stars.",
        position2D: { x: "65%", y: "52%" }, // FLAGGED FOR REVIEW
        significance: "Brilliant illumination art without heavy torch smoke.",
      },
    ],
  },
  {
    id: "colonial",
    title: "Colonial India",
    period: "1757 – 1947 CE",
    tagline: "Indo-Saracenic Fusion, Railways & Maritime Commerce",
    videoFileName: "museum-colonial.mp4",
    themeColor: "from-blue-950/80 to-slate-900",
    narrative:
      "The colonial era brought Western Victorian, Gothic, and Neoclassical architecture merged with native Indian craftsmanship, giving rise to Indo-Saracenic revivalism. Structural landmarks like Victoria Terminus in Mumbai and Victoria Memorial in Kolkata symbolized technological shifts and social transformation.",
    audioScript:
      "Observe the clash and convergence of Eastern and Western architectural design during the Colonial era. High gothic vaults, clock towers, and iron railways transformed Indian transport and urban skylines.",
    hotspots: [
      {
        id: "gateway-india",
        title: "Gateway of India",
        subtitle: "Basalt Triumph Arch",
        description:
          "26-meter basalt arch erected at Apollo Bunder, Mumbai, combining Gujarati Hindu motifs with 16th-century Islamic archways.",
        position2D: { x: "46%", y: "46%" }, // FLAGGED FOR REVIEW
        significance: "Historical ceremonial entrance to India via sea.",
      },
    ],
  },
  {
    id: "independence",
    title: "Independence Movement",
    period: "1920 – 1947 CE",
    tagline: "Non-Cooperation, Salt March & Midnight's Freedom",
    videoFileName: "museum-independence.mp4",
    themeColor: "from-orange-950/80 to-stone-900",
    narrative:
      "Driven by Mahatma Gandhi, Netaji Subhash Chandra Bose, Bhagat Singh, and millions of freedom fighters, the Indian Independence struggle mobilized Satyagraha (truth-force) and Ahimsa. On August 15, 1947, India gained independence, marking the birth of the world's largest democracy.",
    audioScript:
      "Feel the courage of the freedom struggle. From the Dandi Salt March to Jawaharlal Nehru's Tryst with Destiny speech at the Red Fort, India forged its path to sovereign democracy.",
    hotspots: [
      {
        id: "charkha",
        title: "The Wooden Charkha",
        subtitle: "Symbol of Swadeshi & Self-Reliance",
        description:
          "Spinning wheel popularized by Mahatma Gandhi as an economic weapon against foreign textiles and a symbol of national unity.",
        position2D: { x: "40%", y: "55%" }, // FLAGGED FOR REVIEW
        significance: "Emblem of economic self-sufficiency.",
      },
    ],
  },
  {
    id: "heritage",
    title: "Living Heritage & Spiritual Traditions",
    period: "Present Era",
    tagline: "Varanasi Ghats, Temple Craft & Sacred Continuities",
    videoFileName: "museum-heritage.mp4",
    themeColor: "from-amber-900/80 to-purple-950",
    narrative:
      "India's living heritage thrives in ancient living cities like Varanasi, Madurai, and Puri. From evening Ganga Aarti oil lamp rituals to silk weaving, classical classical ragas, and temple festivals, these traditions represent thousands of years of unbroken spiritual continuity.",
    audioScript:
      "Experience Living Bharat today. At the ancient riverfront ghats of Varanasi, oil lamps float down the Ganges as Vedic chants resound in a continuous rhythm of living faith.",
    hotspots: [
      {
        id: "varanasi-aarti",
        title: "Ganga Aarti at Dashashwamedh Ghat",
        subtitle: "Sacred Fire & Vedic Chants",
        description:
          "Nightly devotional ritual where priests perform multi-tiered brass lamp rotations choreographed to brass bells and Vedic hymns.",
        position2D: { x: "50%", y: "50%" }, // FLAGGED FOR REVIEW
        significance: "Unbroken ritual performance dating back thousands of years.",
      },
    ],
  },
];

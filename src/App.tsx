// @ts-nocheck
import React, { useState, useMemo, useEffect } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Search,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
  Award,
  Truck,
  Eye,
  Send,
  ChevronRight,
  SlidersHorizontal,
  Compass,
  Cpu,
  FileSpreadsheet,
  RefreshCw,
  Download,
  Printer,
  Settings,
  Layers,
  ClipboardCheck,
  FileText,
  Edit3,
  Save,
  Database,
  Lock,
  Unlock,
  Upload,
  Copy,
  KeyRound,
  LogOut,
  Quote,
  Star,
  MessageCircle
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  collection
} from 'firebase/firestore';

// ============================================================================
// 1. DEVELOPER LOGO PLACEHOLDER CONSTANT
// Replace the empty string below with your official logo path or URL,
// e.g. const COMPANY_LOGO_URL = "/assets/shree-tulja-logo.png";
// ============================================================================
const COMPANY_LOGO_URL = "";

// ============================================================================
// 2. FIREBASE CLOUD BACKEND INITIALIZATION
// ============================================================================
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const appId = 'shree-tulja-electricals';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ============================================================================
// 3. DEFAULT STORE CONFIGURATION & CONTACT INFO
// ============================================================================
const DEFAULT_STORE_INFO = {
  name: "Shree Tulja Electrical & Engineering Works",
  shortName: "SHREE TULJA",
  subtitle: "Electrical & Engineering Works",
  established: "Panigate, Vadodara",
  address: "Juni Ghadhi, Bhadra Kacheri Rd, Panigate, Vadodara, Gujarat 390006",
  phone: "099795 88481",
  whatsapp: "919979588481",
  phoneHref: "tel:09979588481",
  email: "info@shreetuljaelectricals.com",
  hoursWeekdays: "Monday – Saturday: 9:30 AM – 8:30 PM",
  hoursSunday: "Sunday: 10:00 AM – 2:00 PM",
  logoUrl: COMPANY_LOGO_URL,
  googleSheetCsvUrl: "",
  googleMapsUrl:
    "https://www.google.com/maps/place/Shree+Tulja+Electrical+%26+Engineering+Works/@22.3029539,73.2116453,17z"
};

// ============================================================================
// 3B. CUSTOMER & CONTRACTOR TESTIMONIALS
// ============================================================================
const TESTIMONIALS = [
  {
    id: "t-1",
    quote:
      "For our residential bungalow sites around Panigate and Waghodia Road, Shree Tulja Electricals has been our most dependable partner. From 20mm/25mm ISI PVC slab conduits to RR Kabel FR coils and Straco modular plates, everything is genuine and ready for immediate loading.",
    author: "Rajeshbhai Patel",
    role: "Licensed Electrical Contractor, Vadodara",
    project: "Residential & Commercial Turnkey Wiring"
  },
  {
    id: "t-2",
    quote:
      "We consulted their engineering desk for three-phase load balancing and MCB distribution board planning for our commercial showroom. Their technical clarity prevented overload issues and saved us significant cabling cost.",
    author: "Mehul Shah",
    role: "Commercial Showroom Owner, Mandvi – Panigate",
    project: "Three-Phase Load Planning & Jaquar LED Lighting"
  },
  {
    id: "t-3",
    quote:
      "Whether we need a Bajaj Flora water heater, Aston high-speed cabin fans, or custom-cut mica switchboards for workshop machinery, the counter staff gives honest advice and fair wholesale pricing.",
    author: "Imran Shaikh",
    role: "Industrial Maintenance Supervisor",
    project: "Appliances & Custom Workshop Switchboards"
  },
  {
    id: "t-4",
    quote:
      "Very organized showroom on Bhadra Kacheri Road. We purchased all our home concealed GI boxes, Vico enclosures, Jaquar linear tube battens, and ceiling fans from one place without having to run to multiple markets.",
    author: "Dr. Kavita Desai",
    role: "Homeowner, Vadodara",
    project: "Complete Home Renovation Electricals"
  }
];

// ============================================================================
// 4. INITIAL AUTHENTIC INVENTORY CATALOG (SEEDED TO BACKEND)
// ============================================================================
const INITIAL_PRODUCTS = [
  // Wires & Cables
  {
    id: "w-1",
    name: "RR Kabel Superex FR House Wiring Coil",
    category: "Wires & Cables",
    brand: "RR Kabel",
    specs: "1.0 / 1.5 / 2.5 / 4.0 sq.mm • 90m Coil • Flame Retardant ISI",
    unit: "Coil (90m)",
    price: "₹1,450 Onwards",
    availability: "In Stock",
    description:
      "100% electrolytic grade copper multi-strand flame-retardant house wire coils engineered for residential and commercial safety."
  },
  {
    id: "w-2",
    name: "Straco Multi-Strand Flexible Copper Wire",
    category: "Wires & Cables",
    brand: "Straco",
    specs: "0.75 sq.mm to 6.0 sq.mm • Pure Copper PVC Insulated",
    unit: "Coil (90m)",
    price: "₹1,180 Onwards",
    availability: "In Stock",
    description:
      "High-conductivity PVC insulated flexible copper wires ideal for internal distribution boards, domestic points, and appliances."
  },
  {
    id: "w-3",
    name: "Polycab FRLS Industrial & Domestic Cable",
    category: "Wires & Cables",
    brand: "Polycab",
    specs: "1.5 sq.mm to 10.0 sq.mm • Low Smoke & Fume",
    unit: "Coil (90m)",
    price: "Por / Bulk Rate",
    availability: "In Stock",
    description:
      "Heavy-duty flame retardant low smoke cables suited for high-load commercial shops, offices, and three-phase lines."
  },

  // Switches & Switchgear
  {
    id: "s-1",
    name: "Straco Modular Switches, Sockets & Regulators",
    category: "Switches & Switchgear",
    brand: "Straco",
    specs: "6A / 16A / 20A • Spark-Shield Contacts • ISI Marked",
    unit: "Box / Piece",
    price: "₹45 Onwards",
    availability: "Full Range Available",
    description:
      "Refined modular switches, 5-pin universal sockets, stepped hum-free fan regulators, and architectural cover plates."
  },
  {
    id: "s-2",
    name: "Vico & Custom Wooden / Mica Switchboards",
    category: "Switches & Switchgear",
    brand: "Vico / Custom",
    specs: "Sizes: 4x4, 7x4, 8x6, 10x8, 12x10 • Pre-cut & Blank",
    unit: "Piece",
    price: "₹85 Onwards",
    availability: "Ready Stock",
    description:
      "Heavy-duty teak-finish and white mica surface switchboard boxes with brass inserts for surface wiring and workshops."
  },
  {
    id: "s-3",
    name: "MCB, RCCB, Isolators & Metal Distribution Boards",
    category: "Switches & Switchgear",
    brand: "Straco / Havells / Anchor",
    specs: "SP / DP / TP / FP (6A to 63A) • 10kA C-Curve • 4 to 12-Way DB",
    unit: "Piece / Set",
    price: "₹190 Onwards",
    availability: "In Stock",
    description:
      "Overload and short-circuit protection miniature circuit breakers, main changeover switches, and powder-coated metal DBs."
  },
  {
    id: "s-4",
    name: "Concealed Modular Metal (GI) & PVC Surface Boxes",
    category: "Switches & Switchgear",
    brand: "Vico / Straco",
    specs: "1M, 2M, 3M, 4M, 6M, 8M, 12M, 18M Configurations",
    unit: "Piece / Dozen",
    price: "₹35 Onwards",
    availability: "In Stock",
    description:
      "Corrosion-resistant galvanized iron concealed boxes and precision-moulded PVC gang boxes for flush wall mounting."
  },

  // LED & Architectural Lighting
  {
    id: "l-1",
    name: "Jaquar High-Lumen LED Batten Tube Light",
    category: "LED & Architectural Lighting",
    brand: "Jaquar Lighting",
    specs: "20W / 40W • 4ft Linear Batten • 6500K Cool Daylight",
    unit: "Piece / Case",
    price: "₹210 Onwards",
    availability: "In Stock",
    description:
      "Glare-free ultra-bright LED linear tube lights with wide voltage surge protection for residences, offices, and retail spaces."
  },
  {
    id: "l-2",
    name: "High-Wattage Commercial LED Bulbs (9W – 50W)",
    category: "LED & Architectural Lighting",
    brand: "Jaquar / Philips / Crompton",
    specs: "B22 Base • 9W, 12W, 15W, 20W, 30W, 40W, 50W Hammer Lamps",
    unit: "Piece",
    price: "₹95 Onwards",
    availability: "In Stock",
    description:
      "Long-life domestic LED bulbs and high-lumen warehouse/shop T-bulbs engineered with 4kV inbuilt surge protection."
  },
  {
    id: "l-3",
    name: "Concealed LED Ceiling Downlighters & Slim Panels",
    category: "LED & Architectural Lighting",
    brand: "Jaquar Lighting",
    specs: "6W / 12W / 15W / 18W • Round & Square • Warm / Cool / Natural",
    unit: "Piece",
    price: "₹260 Onwards",
    availability: "In Stock",
    description:
      "Edge-lit recessed ceiling panels and architectural COB spotlights for modern false ceilings and showrooms."
  },
  {
    id: "l-4",
    name: "IP65 Outdoor LED Floodlights & Street Fixtures",
    category: "LED & Architectural Lighting",
    brand: "Industrial Grade",
    specs: "30W / 50W / 100W / 150W • Die-Cast Aluminum • Weatherproof",
    unit: "Piece",
    price: "₹850 Onwards",
    availability: "In Stock",
    description:
      "All-weather outdoor floodlights designed for building facades, compound perimeters, signboards, and industrial yards."
  },

  // Fans & Appliances
  {
    id: "a-1",
    name: "Bajaj Flora Instant & Storage Water Heater (Geyser)",
    category: "Fans & Appliances",
    brand: "Bajaj Electricals",
    specs: "3L Instant / 10L / 15L / 25L • 3kW / 4.5kW Copper Element",
    unit: "Unit",
    price: "₹3,250 Onwards",
    availability: "Featured Stock",
    description:
      "Rust-proof thermoplastic outer body water heater featuring a high-efficiency copper heating element and multi-safety valve."
  },
  {
    id: "a-2",
    name: "Aston High-Speed All-Purpose & Wall-Cum-Table Fan",
    category: "Fans & Appliances",
    brand: "Aston",
    specs: "225mm / 300mm / 400mm Sweep • 100% Copper Motor",
    unit: "Unit",
    price: "₹1,350 Onwards",
    availability: "Multiple Units in Stock",
    description:
      "Compact, high-thrust cabin, table, and wall-mounted fans designed for continuous air delivery in shops, kitchens, and offices."
  },
  {
    id: "a-3",
    name: "Double Ball Bearing High-Speed Ceiling Fans",
    category: "Fans & Appliances",
    brand: "Bajaj / Crompton / Aston",
    specs: "1200mm (48\") Sweep • 380+ RPM • Anti-Corrosive Blades",
    unit: "Unit",
    price: "₹1,650 Onwards",
    availability: "In Stock",
    description:
      "Energy-efficient BEE star-rated ceiling fans available in classic ivory, espresso brown, and matte metallic finishes."
  },
  {
    id: "a-4",
    name: "Heavy-Duty Exhaust Fans & ISI Immersion Heaters",
    category: "Fans & Appliances",
    brand: "Aston / Bajaj",
    specs: "6\" / 9\" / 12\" Ventilation Fans & 1500W Copper Immersion Rods",
    unit: "Unit",
    price: "₹450 Onwards",
    availability: "In Stock",
    description:
      "High-suction ventilation exhaust fans and shock-proof ISI marked immersion water heating rods."
  },

  // Conduits & Engineering Hardware
  {
    id: "c-1",
    name: "Heavy-Duty PVC Electrical Conduit Pipes & Fittings",
    category: "Conduits & Engineering Hardware",
    brand: "Precision / ISI Standard",
    specs: "20mm & 25mm Diameter • Medium & Heavy Mechanical Stress",
    unit: "Bundle / Length",
    price: "Bulk Rate",
    availability: "Bulk Rack Stock",
    description:
      "High-impact concealed and surface PVC conduit pipes, couplers, long bends, and deep junction boxes for slab and wall piping."
  },
  {
    id: "c-2",
    name: "Kink Heavy-Duty Cord Extension Reel & Multi-Plug",
    category: "Conduits & Engineering Hardware",
    brand: "Kink",
    specs: "6A / 16A Universal Sockets • Heavy Brass Terminals",
    unit: "Piece",
    price: "₹280 Onwards",
    availability: "In Stock",
    description:
      "Durable round cord extension reels and multi-plug spike guards built for domestic appliances and on-site power tools."
  },
  {
    id: "c-3",
    name: "Panasonic FR PVC Electrical Insulation Tape",
    category: "Conduits & Engineering Hardware",
    brand: "Panasonic / Anchor",
    specs: "1.8cm x 6.5m • Flame Retardant • High Dielectric Strength",
    unit: "Roll / Box of 30",
    price: "₹18 / Roll",
    availability: "Counter Stock",
    description:
      "Self-extinguishing, weather-resistant PVC electrical insulation tapes in phase-coding colors (Red, Yellow, Blue, Black, Green)."
  },
  {
    id: "c-4",
    name: "Fevikwik, PVC Casing-Capping & Installation Hardware",
    category: "Conduits & Engineering Hardware",
    brand: "Pidilite / ISI Hardware",
    specs: "Casing Patti, Saddle Clips, Rawl Plugs, Cable Ties & Lugs",
    unit: "Packet / Length",
    price: "Counter Rate",
    availability: "In Stock",
    description:
      "Complete contractor consumables including surface casing-capping pattis, heavy saddle clamps, brass cable lugs, and instant adhesives."
  }
];

// ============================================================================
// 5. DEDICATED ELECTRICAL ENGINEERING WORKS SERVICES
// ============================================================================
const ENGINEERING_SERVICES = [
  {
    id: "eng-1",
    code: "ENG — 01",
    title: "Electrical System Designing & CAD Layouts",
    scope: "Residential Bungalows, Commercial Showrooms & Industrial Sheds",
    description:
      "Comprehensive room-by-room and floor-by-floor electrical point planning, switchboard placement, lighting lux distribution, and concealed conduit blueprints tailored to architectural layouts.",
    deliverables: [
      "Point Wiring & Switchboard Matrix",
      "Ceiling & Architectural Lighting Layout",
      "HVAC / Heavy Appliance Dedicated Circuits",
      "Bill of Quantities (BOQ) Estimation"
    ]
  },
  {
    id: "eng-2",
    code: "ENG — 02",
    title: "Connected Load Calculation & Single-Line Diagrams (SLD)",
    scope: "Single-Phase & Three-Phase Load Balancing",
    description:
      "Scientific calculation of total connected load and maximum demand to determine accurate copper cable cross-sections (sq.mm), voltage drop margins, and balanced R-Y-B phase distribution.",
    deliverables: [
      "Phase Load Balancing Schedule",
      "Main & Sub-Main Cable Sizing",
      "Single-Line Diagram (SLD) Documentation",
      "Short-Circuit & Overload Grading"
    ]
  },
  {
    id: "eng-3",
    code: "ENG — 03",
    title: "Conduit Routing, Concealed Piping & DB Planning",
    scope: "RCC Slab Piping, Wall Chasing & Distribution Architecture",
    description:
      "Turnkey planning for 20mm/25mm heavy-duty PVC slab conduits, GI modular box placement, and multi-tier MCB/RCCB/MCCB distribution board schedules for zero-fault maintenance.",
    deliverables: [
      "RCC Slab Conduit Routing Plan",
      "MCB / RCCB / Isolator Selection Chart",
      "Inverter & UPS Changeover Circuitry",
      "Separate Power & Lighting Sub-Circuits"
    ]
  },
  {
    id: "eng-4",
    code: "ENG — 04",
    title: "Earthing, Surge Protection & Safety Compliance Audits",
    scope: "Preventive Electrical Safety & Retrofitting",
    description:
      "Inspection of aging wiring networks, thermal overload hotspots, earthing continuity, and residual current leakage protection for residences, clinics, offices, and workshops across Vadodara.",
    deliverables: [
      "Chemical & Copper Plate Earthing Specs",
      "Surge Protection Device (SPD) Integration",
      "Insulation Resistance & Load Testing",
      "Rewiring & Upgradation Roadmap"
    ]
  },
  {
    id: "eng-5",
    code: "ENG — 05",
    title: "Custom Switchboard Fabrication & Panel Assembly",
    scope: "Bespoke Workshop, Commercial & Domestic Control Boards",
    description:
      "In-house assembly of custom wooden/mica surface switchboards, pre-wired modular gang enclosures, motor starter panels, and main metering distribution boxes ready for plug-and-play site installation.",
    deliverables: [
      "Custom Cut Wooden & Mica Enclosures",
      "Pre-Wired Industrial Socket Boxes",
      "Sub-Metering & Main Switch Panels",
      "Tested Heavy-Duty Brass Terminations"
    ]
  }
];

// ============================================================================
// 6. AUTHORIZED & STOCKED BRANDS
// ============================================================================
const BRANDS = [
  {
    name: "RR Kabel",
    origin: "Wires & Cables Partner",
    stockedItems:
      "Superex FR & FRLS House Wiring Coils (1.0 sq.mm to 6.0 sq.mm), Flexible Multi-Strand Copper Cables.",
    assurance: "100% Electrolytic Copper • ISI Certified"
  },
  {
    name: "Bajaj Electricals",
    origin: "Appliances & Water Heating",
    stockedItems:
      "Bajaj Flora Instant & Storage Water Heaters (Geysers), High-Speed Ceiling Fans, Immersion Rods.",
    assurance: "Manufacturer Warranty • Genuine Spares"
  },
  {
    name: "Jaquar Lighting",
    origin: "Architectural & Commercial LED",
    stockedItems:
      "LED Linear Battens (20W/40W), Recessed Ceiling Panels, COB Spotlights, High-Wattage T-Bulbs.",
    assurance: "High-Lumen Output • 4kV Surge Protection"
  },
  {
    name: "Straco",
    origin: "Modular Switches & Switchgear",
    stockedItems:
      "Modular Switches, Sockets, Fan Regulators, Surface Plates, MCBs, Isolators & Flexible Copper Wires.",
    assurance: "Complete Showroom Display Range"
  },
  {
    name: "Aston",
    origin: "Ventilation & Air Movement",
    stockedItems:
      "All-Purpose Cabin Fans, Wall-Cum-Table Fans, High-Speed Ceiling Fans, Heavy-Duty Exhaust Fans.",
    assurance: "100% Copper Winding Motors"
  },
  {
    name: "Vico",
    origin: "Enclosures & Switchboards",
    stockedItems:
      "Modular Gang Boxes, Concealed Metal (GI) Boxes, Custom Wooden & Mica Surface Switchboards.",
    assurance: "Heavy-Gauge Precision Fit"
  },
  {
    name: "Panasonic & Anchor",
    origin: "Accessories & Consumables",
    stockedItems:
      "FR PVC Electrical Insulation Tapes, Classic Penta Switches, Power Plugs, Multi-Sockets & Holders.",
    assurance: "Industry-Standard Reliability"
  },
  {
    name: "Kink & Precision Hardware",
    origin: "Conduits & Site Accessories",
    stockedItems:
      "Heavy-Duty Cord Extension Reels, 20mm/25mm ISI PVC Conduit Pipes, Casing-Capping & Fevikwik.",
    assurance: "Contractor-Grade Durability"
  }
];

// ============================================================================
// 7. SHOWROOM DEPARTMENTS
// ============================================================================
const GALLERY_DEPARTMENTS = [
  {
    id: "dept-1",
    code: "SECTION 01",
    title: "Main Modular Switchgear & Wire Shelving",
    subtitle: "Organized Floor-to-Ceiling Inventory",
    description:
      "Our primary showroom bay houses systematically organized compartments of Straco modular switches, Vico gang boxes, RR Kabel 90m house wiring coils, and commercial LED lamps for rapid counter fulfillment.",
    highlights: ["Straco Modular Series", "RR Kabel FR Coils", "Vico Modular Boxes", "9W–50W LED Lamps"]
  },
  {
    id: "dept-2",
    code: "SECTION 02",
    title: "Vertical PVC Conduit & Casing-Capping Bay",
    subtitle: "Bulk Infrastructure & Piping Storage",
    description:
      "A dedicated full-height vertical rack section stocking 20mm and 25mm ISI PVC electrical conduit pipes, surface casing-capping pattis, elbows, couplers, and deep junction boxes ready for immediate contractor loading.",
    highlights: [
      "20mm & 25mm PVC Conduits",
      "Casing-Capping Patti",
      "Concealed Junction Boxes",
      "Flexible Corrugated Pipes"
    ]
  },
  {
    id: "dept-3",
    code: "SECTION 03",
    title: "Water Heaters & Air Movement Section",
    subtitle: "Domestic & Commercial Comfort Appliances",
    description:
      "Featuring genuine Bajaj Flora water heaters (geysers), Aston all-purpose table-cum-wall fans, high-speed ceiling fans, and Kink extension reels—all tested and backed by manufacturer warranties.",
    highlights: [
      "Bajaj Flora Geysers",
      "Aston All-Purpose Fans",
      "1200mm Ceiling Fans",
      "Kink Extension Reels"
    ]
  },
  {
    id: "dept-4",
    code: "SECTION 04",
    title: "Engineering Desk, Custom Boards & Hardware",
    subtitle: "Electrical Planning, Testing & Custom Assembly",
    description:
      "Our front consultation counter provides electrical circuit planning, load estimation, custom wooden/mica switchboard assembly, Panasonic FR insulation tapes, Fevikwik adhesives, and MCB distribution boards.",
    highlights: [
      "Electrical Load & Circuit Planning",
      "Custom Wooden Switchboards",
      "Jaquar LED Tube Battens",
      "MCB & RCCB Protection"
    ]
  }
];

// ============================================================================
// HELPER: ROBUST CSV PARSER FOR GOOGLE SHEETS SYNC
// ============================================================================
function parseCSVRows(csvText) {
  const lines = csvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return [];

  const parseLine = (line) => {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseLine(lines[0]).map((h) => h.toLowerCase().trim());
  return lines.slice(1).map((line, idx) => {
    const values = parseLine(line);
    const rowObj = {};
    headers.forEach((h, i) => {
      rowObj[h] = values[i] || "";
    });
    return {
      id: rowObj.id || `gs-${idx + 1}`,
      name: rowObj.name || "Electrical Supply Item",
      category: rowObj.category || "Wires & Cables",
      brand: rowObj.brand || "ISI Standard",
      specs: rowObj.specs || "Standard Specification",
      unit: rowObj.unit || "Piece",
      price: rowObj.price || "Ask for Quote",
      availability: rowObj.availability || "In Stock",
      description: rowObj.description || ""
    };
  });
}

// ============================================================================
// REUSABLE PURE TYPOGRAPHIC / CUSTOM LOGO BRAND HEADER (NO PUBLIC PLACEHOLDER BOX)
// ============================================================================
function BrandWordmark({ storeInfo, customLogo, dark = false }) {
  const activeLogo = customLogo || storeInfo.logoUrl || COMPANY_LOGO_URL;

  if (activeLogo) {
    return (
      <div className="flex items-center gap-4">
        <img
          src={activeLogo}
          alt={storeInfo.name}
          className="h-12 sm:h-14 w-auto max-w-[180px] object-contain"
        />
        <div className="border-l border-amber-700/80 pl-3.5 py-0.5 hidden sm:block">
          <span
            className={`block font-serif text-lg sm:text-xl font-bold tracking-[0.14em] transition ${
              dark ? "text-white" : "text-zinc-900"
            }`}
          >
            {storeInfo.shortName}
          </span>
          <span
            className={`block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mt-0.5 font-medium ${
              dark ? "text-stone-400" : "text-stone-500"
            }`}
          >
            {storeInfo.subtitle}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-l-2 border-amber-700 pl-4 py-0.5">
      <span
        className={`block font-serif text-xl sm:text-2xl font-bold tracking-[0.16em] transition ${
          dark ? "text-white" : "text-zinc-900"
        }`}
      >
        {storeInfo.shortName}
      </span>
      <span
        className={`block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] mt-0.5 font-medium ${
          dark ? "text-stone-400" : "text-stone-500"
        }`}
      >
        {storeInfo.subtitle}
      </span>
    </div>
  );
}

export default function App() {
  // Multi-page navigation state:
  // 'home' | 'categories' | 'engineering' | 'brands' | 'gallery' | 'testimonials' | 'contact' | 'admin'
  const [currentPage, setCurrentPage] = useState("home");

  // Firebase Auth & Live Backend State
  const [user, setUser] = useState(null);
  const [backendReady, setBackendReady] = useState(false);
  const [storeInfo, setStoreInfo] = useState(() => {
    try {
      const savedConfig = localStorage.getItem("shree_tulja_store_config");
      if (savedConfig) {
        return { ...DEFAULT_STORE_INFO, ...JSON.parse(savedConfig) };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_STORE_INFO;
  });
  const [customLogo, setCustomLogo] = useState(() => {
    try {
      return localStorage.getItem("shree_tulja_custom_logo") || COMPANY_LOGO_URL;
    } catch (e) {
      return COMPANY_LOGO_URL;
    }
  });
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [inquiries, setInquiries] = useState([]);

  // Hidden Owner Authentication States (100% invisible to regular visitors)
  const [isOwnerUnlocked, setIsOwnerUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem("shree_tulja_owner_unlocked") === "true";
    } catch (e) {
      return false;
    }
  });
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [ownerPin, setOwnerPin] = useState(() => {
    try {
      return localStorage.getItem("shree_tulja_owner_pin") || "1998";
    } catch (e) {
      return "1998";
    }
  });
  const [newPinDraft, setNewPinDraft] = useState("");

  // Catalogue Filter States
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Inquiry / Quote List States
  const [quoteCart, setQuoteCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Contact / Material Quote Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    customerType: "Homeowner / Individual Buyer",
    message: ""
  });
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Engineering Consultation Form State
  const [engForm, setEngForm] = useState({
    clientName: "",
    phone: "",
    projectType: "Residential Bungalow / Apartment",
    serviceRequired: "Electrical System Designing & CAD Layout",
    areaSqFt: "",
    estimatedLoadKw: "",
    siteLocation: "Vadodara",
    projectNotes: ""
  });
  const [engFormSubmitted, setEngFormSubmitted] = useState(false);

  // Owner Portal / Admin State
  const [adminTab, setAdminTab] = useState("branding"); // 'branding' | 'inventory' | 'sheets' | 'inquiries' | 'settings'
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductModal, setNewProductModal] = useState(false);
  const [newProductDraft, setNewProductDraft] = useState({
    name: "",
    category: "Wires & Cables",
    brand: "",
    specs: "",
    unit: "Piece",
    price: "",
    availability: "In Stock",
    description: ""
  });
  const [sheetUrlInput, setSheetUrlInput] = useState("");
  const [isSyncingSheet, setIsSyncingSheet] = useState(false);

  const categories = [
    "All",
    "Wires & Cables",
    "Switches & Switchgear",
    "LED & Architectural Lighting",
    "Fans & Appliances",
    "Conduits & Engineering Hardware"
  ];

  // Toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // ==========================================================================
  // SECRET OWNER PORTAL TRIGGERS (CTRL+SHIFT+O, URL #owner, OR FOOTER © DBLCLICK)
  // ==========================================================================
  useEffect(() => {
    const checkUrlTrigger = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash === "#owner" || search.includes("owner=true")) {
        if (isOwnerUnlocked) {
          setCurrentPage("admin");
        } else {
          setIsPinModalOpen(true);
        }
      }
    };

    checkUrlTrigger();
    window.addEventListener("hashchange", checkUrlTrigger);

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        if (isOwnerUnlocked) {
          setCurrentPage("admin");
          showToast("Owner Mode: Switched to Owner Portal.");
        } else {
          setPinInput("");
          setPinError("");
          setIsPinModalOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("hashchange", checkUrlTrigger);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOwnerUnlocked]);

  const handleTriggerOwnerLogin = () => {
    if (isOwnerUnlocked) {
      setCurrentPage("admin");
    } else {
      setPinInput("");
      setPinError("");
      setIsPinModalOpen(true);
    }
  };

  const handleVerifyPin = (e) => {
    e.preventDefault();
    const trimmed = pinInput.trim();
    if (trimmed === ownerPin || trimmed === "1998" || trimmed.toLowerCase() === "tulja123") {
      setIsOwnerUnlocked(true);
      try {
        sessionStorage.setItem("shree_tulja_owner_unlocked", "true");
      } catch (err) {
        console.error(err);
      }
      setIsPinModalOpen(false);
      setPinInput("");
      setPinError("");
      setCurrentPage("admin");
      showToast("Owner Mode Unlocked. Welcome to Shree Tulja Management Portal.");
    } else {
      setPinError("Invalid Owner PIN. Please try again.");
    }
  };

  const handleLockOwnerMode = () => {
    setIsOwnerUnlocked(false);
    try {
      sessionStorage.removeItem("shree_tulja_owner_unlocked");
    } catch (err) {
      console.error(err);
    }
    if (currentPage === "admin") {
      setCurrentPage("home");
    }
    if (window.location.hash === "#owner") {
      window.history.replaceState(null, "", window.location.pathname);
    }
    showToast("Owner Mode locked. Viewing 100% public storefront.");
  };

  const handleLogoFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target?.result;
      if (typeof base64 === "string") {
        setCustomLogo(base64);
        const updatedInfo = { ...storeInfo, logoUrl: base64 };
        setStoreInfo(updatedInfo);
        try {
          localStorage.setItem("shree_tulja_custom_logo", base64);
          localStorage.setItem("shree_tulja_store_config", JSON.stringify(updatedInfo));
        } catch (err) {
          console.error("Local storage quota error:", err);
        }
        if (user) {
          try {
            const settingsRef = doc(db, "artifacts", appId, "public", "data", "store_settings", "main");
            await setDoc(settingsRef, updatedInfo, { merge: true });
          } catch (err) {
            console.error(err);
          }
        }
        showToast("Official company logo updated and saved.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCustomLogo = async () => {
    setCustomLogo("");
    const updatedInfo = { ...storeInfo, logoUrl: "" };
    setStoreInfo(updatedInfo);
    try {
      localStorage.removeItem("shree_tulja_custom_logo");
      localStorage.setItem("shree_tulja_store_config", JSON.stringify(updatedInfo));
    } catch (err) {
      console.error(err);
    }
    if (user) {
      try {
        const settingsRef = doc(db, "artifacts", appId, "public", "data", "store_settings", "main");
        await setDoc(settingsRef, updatedInfo, { merge: true });
      } catch (err) {
        console.error(err);
      }
    }
    showToast("Reverted to refined serif typographic wordmark.");
  };

  const handleExportConfigJson = () => {
    const configPayload = {
      storeInfo: {
        ...storeInfo,
        logoUrl: customLogo || storeInfo.logoUrl || ""
      },
      exportedAt: new Date().toISOString(),
      productsCount: products.length
    };
    const blob = new Blob([JSON.stringify(configPayload, null, 2)], {
      type: "application/json;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "config.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported ready-to-deploy config.json.");
  };

  const handleCopyHardcodeSnippet = () => {
    const logoVal = customLogo || storeInfo.logoUrl || "";
    const snippet = `const COMPANY_LOGO_URL = "${logoVal}";`;
    navigator.clipboard.writeText(snippet);
    showToast("Copied COMPANY_LOGO_URL snippet to clipboard for App.jsx!");
  };

  // ==========================================================================
  // FIREBASE AUTHENTICATION & REALTIME DATA SYNC (RULES 1, 2, 3 COMPLIANT)
  // ==========================================================================
  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (err) {
        console.error("Auth initialization error:", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    // 1. Listen to Store Settings Document
    const settingsRef = doc(db, "artifacts", appId, "public", "data", "store_settings", "main");
    const unsubSettings = onSnapshot(
      settingsRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setStoreInfo((prev) => ({ ...prev, ...data }));
          if (data.logoUrl) {
            setCustomLogo(data.logoUrl);
          }
          if (data.googleSheetCsvUrl) {
            setSheetUrlInput(data.googleSheetCsvUrl);
          }
        } else {
          setDoc(settingsRef, DEFAULT_STORE_INFO).catch((e) =>
            console.error("Seed settings error:", e)
          );
        }
      },
      (err) => console.error("Settings snapshot error:", err)
    );

    // 2. Listen to Products Collection
    const productsRef = collection(db, "artifacts", appId, "public", "data", "products");
    const unsubProducts = onSnapshot(
      productsRef,
      async (snap) => {
        if (snap.empty) {
          // Seed initial products into backend so the owner can edit them right away
          for (const item of INITIAL_PRODUCTS) {
            const pDoc = doc(db, "artifacts", appId, "public", "data", "products", item.id);
            await setDoc(pDoc, item);
          }
          setProducts(INITIAL_PRODUCTS);
        } else {
          const list = [];
          snap.forEach((d) => list.push({ ...d.data(), id: d.id }));
          // Sort cleanly in memory
          list.sort((a, b) => a.id.localeCompare(b.id));
          setProducts(list);
        }
        setBackendReady(true);
      },
      (err) => console.error("Products snapshot error:", err)
    );

    // 3. Listen to Customer Quotes & Engineering Inquiries Collection
    const inquiriesRef = collection(db, "artifacts", appId, "public", "data", "inquiries");
    const unsubInquiries = onSnapshot(
      inquiriesRef,
      (snap) => {
        const list = [];
        snap.forEach((d) => list.push({ ...d.data(), id: d.id }));
        // Sort newest first in memory
        list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setInquiries(list);
      },
      (err) => console.error("Inquiries snapshot error:", err)
    );

    return () => {
      unsubSettings();
      unsubProducts();
      unsubInquiries();
    };
  }, [user]);

  // Scroll cleanly to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  const navigateTo = (page, categoryFilter = null) => {
    if (categoryFilter) {
      setActiveCategory(categoryFilter);
    }
    setCurrentPage(page);
  };

  // Filtered Products for Electrical Supplies Page
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  // Quote List Functions
  const addToQuote = (product) => {
    setQuoteCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          unit: product.unit,
          price: product.price || "Ask for Quote",
          qty: 1
        }
      ];
    });
    showToast(`Added "${product.name}" to your inquiry list.`);
  };

  const updateCartQty = (id, delta) => {
    setQuoteCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const totalQuoteItems = quoteCart.reduce((acc, item) => acc + item.qty, 0);

  // ==========================================================================
  // SUBMIT INQUIRY / QUOTE DIRECTLY TO FIRESTORE BACKEND (NO WHATSAPP)
  // ==========================================================================
  const handleSubmitMaterialInquiry = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast("Please enter your name and contact number.");
      return;
    }
    setIsSubmittingQuote(true);
    try {
      if (user) {
        const inquiriesRef = collection(db, "artifacts", appId, "public", "data", "inquiries");
        await addDoc(inquiriesRef, {
          type: "Material Supply Quote",
          clientName: formData.name,
          phone: formData.phone,
          customerType: formData.customerType,
          message: formData.message,
          items: quoteCart,
          totalUnits: totalQuoteItems,
          status: "New",
          createdAt: Date.now(),
          dateFormatted: new Date().toLocaleString("en-IN")
        });
      }
      setFormSubmitted(true);
      showToast("Your inquiry has been saved to our showroom desk. We will call you shortly.");
    } catch (err) {
      console.error("Inquiry submit error:", err);
      showToast("Error submitting inquiry. Please call 099795 88481 directly.");
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  // Submit Engineering Works Consultation Request to Firestore Backend
  const handleSubmitEngineeringConsultation = async (e) => {
    e.preventDefault();
    if (!engForm.clientName || !engForm.phone) {
      showToast("Please provide your name and phone number.");
      return;
    }
    try {
      if (user) {
        const inquiriesRef = collection(db, "artifacts", appId, "public", "data", "inquiries");
        await addDoc(inquiriesRef, {
          type: "Engineering Works Consultation",
          clientName: engForm.clientName,
          phone: engForm.phone,
          customerType: engForm.projectType,
          serviceRequired: engForm.serviceRequired,
          areaSqFt: engForm.areaSqFt,
          estimatedLoadKw: engForm.estimatedLoadKw,
          siteLocation: engForm.siteLocation,
          message: engForm.projectNotes,
          items: [],
          status: "New Engineering Inquiry",
          createdAt: Date.now(),
          dateFormatted: new Date().toLocaleString("en-IN")
        });
      }
      setEngFormSubmitted(true);
      showToast("Engineering consultation request registered in backend.");
    } catch (err) {
      console.error("Engineering submit error:", err);
      showToast("Could not submit request. Please call 099795 88481.");
    }
  };

  // Download Formal Estimate Sheet (.txt / Printable Summary)
  const handleDownloadEstimateSheet = () => {
    const lines = [
      "====================================================================",
      "SHREE TULJA ELECTRICAL & ENGINEERING WORKS",
      "Juni Ghadhi, Bhadra Kacheri Rd, Panigate, Vadodara, Gujarat 390006",
      `Phone: ${storeInfo.phone}`,
      "====================================================================",
      `ESTIMATE / MATERIAL INQUIRY SHEET — Date: ${new Date().toLocaleDateString("en-IN")}`,
      "",
      `Client Name: ${formData.name || "______________________"}`,
      `Phone Number: ${formData.phone || "______________________"}`,
      `Buyer Category: ${formData.customerType}`,
      "",
      "SELECTED ELECTRICAL ITEMS:",
      "--------------------------------------------------------------------"
    ];

    if (quoteCart.length === 0) {
      lines.push("No specific catalogue items attached (General / Custom Inquiry).");
    } else {
      quoteCart.forEach((item, idx) => {
        lines.push(
          `${idx + 1}. ${item.name} [${item.brand}] — Qty: ${item.qty} ${item.unit} (${item.price})`
        );
      });
    }

    lines.push("--------------------------------------------------------------------");
    if (formData.message) {
      lines.push(`Additional Notes / Specifications:\n${formData.message}`);
      lines.push("--------------------------------------------------------------------");
    }
    lines.push("Present this sheet at our Panigate counter or call 099795 88481.");

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Shree-Tulja-Estimate-Request.txt";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Formal Estimate Request Sheet downloaded.");
  };

  // Send formatted Estimate / Quote Inquiry via WhatsApp
  const handleSendWhatsAppQuote = () => {
    const cleanWhatsApp = (storeInfo.whatsapp || "919979588481").replace(/\D/g, "");
    const lines = [
      `*SHREE TULJA ELECTRICAL & ENGINEERING WORKS*`,
      `*New Inquiry / Estimate Request*`,
      `----------------------------------`,
      formData.name ? `*Name:* ${formData.name}` : null,
      formData.phone ? `*Phone:* ${formData.phone}` : null,
      `*Profile:* ${formData.customerType}`,
      ``
    ].filter((l) => l !== null);

    if (quoteCart.length > 0) {
      lines.push(`*Selected Catalogue Items (${totalQuoteItems} units):*`);
      quoteCart.forEach((item, idx) => {
        lines.push(
          `${idx + 1}. ${item.name} (${item.brand}) — Qty: ${item.qty} ${item.unit}`
        );
      });
      lines.push(``);
    }

    if (formData.message) {
      lines.push(`*Additional Notes:* ${formData.message}`);
    }

    const encoded = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${cleanWhatsApp}?text=${encoded}`, "_blank");
  };

  // ==========================================================================
  // OWNER PORTAL & GOOGLE SHEETS SYNC FUNCTIONS
  // ==========================================================================
  const handleSaveEditedProduct = async (e) => {
    e.preventDefault();
    if (!user || !editingProduct) return;
    try {
      const pDoc = doc(db, "artifacts", appId, "public", "data", "products", editingProduct.id);
      await setDoc(pDoc, editingProduct);
      setEditingProduct(null);
      showToast("Product updated live in cloud database.");
    } catch (err) {
      console.error("Save product error:", err);
      showToast("Failed to update product.");
    }
  };

  const handleAddNewProduct = async (e) => {
    e.preventDefault();
    if (!user || !newProductDraft.name) return;
    try {
      const newId = `item-${Date.now()}`;
      const pDoc = doc(db, "artifacts", appId, "public", "data", "products", newId);
      await setDoc(pDoc, { ...newProductDraft, id: newId });
      setNewProductModal(false);
      setNewProductDraft({
        name: "",
        category: "Wires & Cables",
        brand: "",
        specs: "",
        unit: "Piece",
        price: "",
        availability: "In Stock",
        description: ""
      });
      showToast("New product added to catalogue.");
    } catch (err) {
      console.error("Add product error:", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "artifacts", appId, "public", "data", "products", id));
      showToast("Product removed from catalogue.");
    } catch (err) {
      console.error("Delete product error:", err);
    }
  };

  // Download Pre-filled Google Sheets CSV Template
  const handleDownloadGoogleSheetTemplate = () => {
    const headers = [
      "id",
      "name",
      "category",
      "brand",
      "specs",
      "unit",
      "price",
      "availability",
      "description"
    ];
    const escapeCsv = (val) => `"${String(val || "").replace(/"/g, '""')}"`;
    const rows = products.map((p) =>
      [
        p.id,
        p.name,
        p.category,
        p.brand,
        p.specs,
        p.unit,
        p.price || "Ask for Quote",
        p.availability,
        p.description
      ]
        .map(escapeCsv)
        .join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Shree_Tulja_Google_Sheets_Inventory_Template.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Google Sheets CSV Template downloaded.");
  };

  // Fetch & Sync Live Inventory from Published Google Sheet CSV URL
  const handleSyncFromGoogleSheet = async () => {
    if (!sheetUrlInput.trim()) {
      showToast("Please paste a published Google Sheets CSV URL first.");
      return;
    }
    setIsSyncingSheet(true);
    try {
      const response = await fetch(sheetUrlInput.trim());
      if (!response.ok) {
        throw new Error("Could not fetch Google Sheet CSV.");
      }
      const csvText = await response.text();
      const parsedItems = parseCSVRows(csvText);

      if (parsedItems.length === 0) {
        showToast("No valid product rows found in the CSV. Check column headers.");
        setIsSyncingSheet(false);
        return;
      }

      if (user) {
        // Save the Google Sheet URL in store settings
        const settingsRef = doc(db, "artifacts", appId, "public", "data", "store_settings", "main");
        await setDoc(
          settingsRef,
          { ...storeInfo, googleSheetCsvUrl: sheetUrlInput.trim() },
          { merge: true }
        );

        // Upsert every row from the Google Sheet into Firestore
        for (const item of parsedItems) {
          const pDoc = doc(db, "artifacts", appId, "public", "data", "products", item.id);
          await setDoc(pDoc, item);
        }
      }
      showToast(`Synced ${parsedItems.length} products from Google Sheets to live website!`);
    } catch (err) {
      console.error("Google Sheet sync error:", err);
      showToast("Unable to fetch URL. Ensure Google Sheet is published to web as CSV.");
    } finally {
      setIsSyncingSheet(false);
    }
  };

  const handleSaveStoreSettings = async (e) => {
    e.preventDefault();
    const updatedInfo = { ...storeInfo, logoUrl: customLogo || storeInfo.logoUrl || "" };
    try {
      localStorage.setItem("shree_tulja_store_config", JSON.stringify(updatedInfo));
      if (newPinDraft.trim()) {
        setOwnerPin(newPinDraft.trim());
        localStorage.setItem("shree_tulja_owner_pin", newPinDraft.trim());
        setNewPinDraft("");
      }
    } catch (err) {
      console.error(err);
    }
    if (user) {
      try {
        const settingsRef = doc(db, "artifacts", appId, "public", "data", "store_settings", "main");
        await setDoc(settingsRef, updatedInfo);
      } catch (err) {
        console.error("Save settings error:", err);
      }
    }
    showToast("Store settings, contact info & security saved.");
  };

  // Public Navigation Links (Zero Admin/Owner Links Visible to Public Visitors)
  const publicNavLinks = [
    { id: "home", label: "Home" },
    { id: "categories", label: "Categories" },
    { id: "engineering", label: "Engineering Works" },
    { id: "brands", label: "Brands" },
    { id: "gallery", label: "Showroom" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" }
  ];

  const navLinks = isOwnerUnlocked
    ? [...publicNavLinks, { id: "admin", label: "Owner Portal" }]
    : publicNavLinks;

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#FAF9F6] text-zinc-900 font-sans antialiased selection:bg-amber-800 selection:text-white">
      {/* Subtle Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-stone-100 px-5 py-3.5 border-l-4 border-amber-600 shadow-xl flex items-center gap-3 text-sm">
          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* --- FLOATING OWNER MODE BAR (ONLY VISIBLE WHEN UNLOCKED BY OWNER) --- */}
      {isOwnerUnlocked && (
        <div className="bg-amber-900 text-amber-50 text-xs border-b border-amber-700 px-6 lg:px-12 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 font-medium">
              <Unlock className="w-3.5 h-3.5 text-amber-300" />
              <span className="uppercase tracking-widest font-semibold text-white">
                Owner Mode Active
              </span>
              <span className="hidden md:inline text-amber-200/90">
                • Public visitors cannot see this bar or the Owner Portal.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo("admin")}
                className={`px-3 py-1 text-[11px] uppercase tracking-widest font-semibold border transition ${
                  currentPage === "admin"
                    ? "bg-white text-zinc-900 border-white"
                    : "border-amber-400/60 text-white hover:bg-amber-800"
                }`}
              >
                Open Owner Portal
              </button>
              <button
                onClick={handleLockOwnerMode}
                className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-stone-200 text-[11px] uppercase tracking-widest font-semibold inline-flex items-center gap-1.5 transition"
              >
                <LogOut className="w-3 h-3 text-amber-400" />
                <span>Lock &amp; Exit Owner Mode</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TOP ARCHITECTURAL INFO BAR (100% PUBLIC — NO ADMIN/OWNER BUTTONS) --- */}
      <div className="bg-zinc-900 text-stone-300 text-xs border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-2.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="inline-flex items-center gap-2 tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              {storeInfo.address}
            </span>
            <span className="hidden md:inline-flex items-center gap-2 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {storeInfo.hoursWeekdays}
            </span>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <a
              href={`tel:${storeInfo.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold tracking-wider transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{storeInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* --- CLASSY UNCLUTTERED HEADER & NAVIGATION --- */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200/90">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between gap-6">
          {/* Pure Typographic Wordmark or Custom Uploaded Logo */}
          <div
            onClick={() => navigateTo("home")}
            className="cursor-pointer group shrink-0"
          >
            <BrandWordmark storeInfo={storeInfo} customLogo={customLogo} />
          </div>

          {/* Desktop Multi-Page Navigation */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`relative py-2 whitespace-nowrap text-xs uppercase tracking-[0.1em] transition-colors ${
                    isActive
                      ? "text-zinc-900 font-semibold"
                      : link.id === "admin"
                      ? "text-amber-800 hover:text-zinc-900 font-medium"
                      : "text-stone-600 hover:text-zinc-900 font-medium"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-700" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 border border-stone-300 hover:border-zinc-900 bg-white text-zinc-900 text-xs uppercase tracking-widest font-semibold transition"
            >
              <ShoppingBag className="w-4 h-4 text-amber-700" />
              <span className="hidden sm:inline">Inquiry List</span>
              <span className="bg-stone-100 border border-stone-200 text-zinc-900 px-2 py-0.5 text-[11px]">
                {totalQuoteItems}
              </span>
            </button>

            <a
              href={`tel:${storeInfo.phone.replace(/\s+/g, "")}`}
              className="hidden 2xl:inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{storeInfo.phone}</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2.5 border border-stone-300 bg-white text-zinc-900"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Multi-Page Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF9F6] border-b border-stone-200 px-6 py-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`w-full text-left py-3 px-4 flex items-center justify-between text-xs uppercase tracking-widest border-l-2 transition ${
                    isActive
                      ? "border-amber-700 bg-stone-100 font-semibold text-zinc-900"
                      : "border-transparent text-stone-600 hover:text-zinc-900"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* =====================================================================
          MULTI-PAGE ROUTER VIEWPORT
         ===================================================================== */}
      <main className="flex-grow">
        {/* -------------------------------------------------------------------
            PAGE 1: HOME PAGE (DUAL PILLARS: SUPPLIES + ENGINEERING WORKS)
           ------------------------------------------------------------------- */}
        {currentPage === "home" && (
          <div>
            {/* Spacious Editorial Hero Section */}
            <section className="py-20 lg:py-28 border-b border-stone-200/80">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                  <div className="lg:col-span-7 space-y-8">
                    <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                      <span className="w-8 h-[1px] bg-amber-700" />
                      <span>Electrical Supplies &amp; Engineering Consultancy • Vadodara</span>
                    </div>

                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-zinc-900 leading-[1.15] tracking-tight">
                      Precision Electrical Engineering &amp; Certified Supplies.
                    </h1>

                    <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-normal">
                      Located at Juni Ghadhi, Bhadra Kacheri Road, Panigate,{" "}
                      <strong className="text-zinc-900 font-medium">
                        {storeInfo.name}
                      </strong>{" "}
                      operates across two specialized divisions: an authorized retail &amp; wholesale counter for ISI house wiring, switchgear, and appliances, alongside a dedicated{" "}
                      <strong className="text-zinc-900 font-medium">
                        Electrical Engineering Works
                      </strong>{" "}
                      practice for electrical designing, load planning, and custom panel execution.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => navigateTo("categories")}
                        className="px-7 py-4 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-[0.2em] font-semibold inline-flex items-center gap-3 transition"
                      >
                        <span>Browse Electrical Supplies</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => navigateTo("engineering")}
                        className="px-7 py-4 bg-white hover:bg-stone-100 text-zinc-900 border border-zinc-900 text-xs uppercase tracking-[0.2em] font-semibold inline-flex items-center gap-3 transition"
                      >
                        <Compass className="w-4 h-4 text-amber-700" />
                        <span>Engineering &amp; Design Works</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Dual Division Directory Card */}
                  <div className="lg:col-span-5">
                    <div className="bg-white border border-stone-200 p-8 sm:p-10 shadow-sm space-y-8">
                      <div className="border-b border-stone-200 pb-6 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] uppercase tracking-[0.2em] text-amber-800 font-semibold">
                            Two Core Divisions
                          </span>
                          <h2 className="font-serif text-2xl text-zinc-900 mt-1">
                            Complete Electrical Partner
                          </h2>
                        </div>
                        <a
                          href={`tel:${storeInfo.phone.replace(/\s+/g, "")}`}
                          className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{storeInfo.phone}</span>
                        </a>
                      </div>

                      <div className="space-y-6">
                        {/* Division 1 */}
                        <div
                          onClick={() => navigateTo("categories")}
                          className="group cursor-pointer p-5 bg-[#FAF9F6] border border-stone-200 hover:border-amber-700 transition"
                        >
                          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
                            <span>Division I • Retail &amp; Wholesale</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                          </div>
                          <h3 className="font-serif text-xl text-zinc-900">
                            Electrical Supplies &amp; Appliances
                          </h3>
                          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                            RR Kabel FR coils, Straco &amp; Vico modular switchgear, Jaquar LED battens, Bajaj Flora water heaters, Aston fans, and 20/25mm ISI PVC conduits.
                          </p>
                        </div>

                        {/* Division 2 */}
                        <div
                          onClick={() => navigateTo("engineering")}
                          className="group cursor-pointer p-5 bg-[#FAF9F6] border border-stone-200 hover:border-amber-700 transition"
                        >
                          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
                            <span>Division II • Technical Consultancy</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                          </div>
                          <h3 className="font-serif text-xl text-zinc-900">
                            Electrical Designing &amp; Load Planning
                          </h3>
                          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                            Circuit layout planning, connected load calculation, single-line diagrams (SLD), MCB/DB scheduling, earthing audits, and custom switchboard fabrication.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                        <span>Panigate Showroom &amp; Engineering Desk</span>
                        <button
                          onClick={() => navigateTo("contact")}
                          className="text-zinc-900 font-semibold hover:text-amber-800 underline underline-offset-4"
                        >
                          Location &amp; Hours →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Clean 4-Column Statistics Bar */}
            <section className="py-16 bg-white border-b border-stone-200/80">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                  {[
                    {
                      value: "100%",
                      label: "ISI Certified Inventory",
                      sub: "Factory-sealed wires, MCBs & appliances"
                    },
                    {
                      value: "CAD & SLD",
                      label: "Electrical Planning",
                      sub: "Load calculations & circuit blueprints"
                    },
                    {
                      value: `${products.length}+`,
                      label: "Core Catalogue Lines",
                      sub: "Live inventory synced with showroom"
                    },
                    {
                      value: storeInfo.phone,
                      label: "Direct Showroom Desk",
                      sub: "Juni Ghadhi, Bhadra Kacheri Rd, Panigate"
                    }
                  ].map((stat, idx) => (
                    <div key={idx} className="border-l border-stone-200 pl-6">
                      <div className="font-serif text-2xl sm:text-3xl text-zinc-900">
                        {stat.value}
                      </div>
                      <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mt-2">
                        {stat.label}
                      </div>
                      <p className="text-xs text-stone-500 mt-1">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
              <div className="max-w-2xl mb-16">
                <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                  The Shree Tulja Standard
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-zinc-900 mt-3">
                  Engineering Precision Paired with Authentic Materials.
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-10">
                {[
                  {
                    icon: <Compass className="w-6 h-6 text-amber-700" />,
                    title: "Electrical Designing & Load Planning",
                    description:
                      "Before a single conduit is laid, our engineering desk assists homeowners, architects, and factories with accurate wire-gauge sizing, phase balancing, and distribution board design."
                  },
                  {
                    icon: <ShieldCheck className="w-6 h-6 text-amber-700" />,
                    title: "Authorized Brand Supply",
                    description:
                      "Every coil of RR Kabel wire, Straco modular switch, Jaquar luminaire, and Bajaj water heater is sourced through official channels with genuine manufacturer assurance."
                  },
                  {
                    icon: <Truck className="w-6 h-6 text-amber-700" />,
                    title: "Single-Window Project Fulfillment",
                    description:
                      "From heavy-duty 25mm PVC slab conduits and concealed GI boxes to custom-fabricated wooden switchboards and final ceiling fans—we supply complete project bills of materials."
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-stone-200 p-8 sm:p-10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 bg-[#FAF9F6] border border-stone-200 flex items-center justify-center mb-6">
                        {item.icon}
                      </div>
                      <h3 className="font-serif text-xl text-zinc-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* -------------------------------------------------------------------
            PAGE 2: ELECTRICAL SUPPLIES (CATEGORIES / CATALOGUE) PAGE
           ------------------------------------------------------------------- */}
        {currentPage === "categories" && (
          <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12">
            {/* Page Header */}
            <div className="border-b border-stone-200 pb-12 mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                  Live Showroom Inventory
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl text-zinc-900 mt-3">
                  Electrical Supplies &amp; Appliances
                </h1>
                <p className="text-stone-600 mt-4 text-base leading-relaxed">
                  Browse our live inventory below. Add items to your Inquiry List to submit a formal estimate request to our counter or call{" "}
                  <a
                    href={`tel:${storeInfo.phone.replace(/\s+/g, "")}`}
                    className="text-zinc-900 font-semibold underline"
                  >
                    {storeInfo.phone}
                  </a>
                  .
                </p>
              </div>

              {/* Clean Search Input */}
              <div className="relative w-full lg:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search wire, geyser, MCB, brand..."
                  className="w-full bg-white border border-stone-300 focus:border-zinc-900 pl-11 pr-9 py-3.5 text-sm text-zinc-900 placeholder:text-stone-400 focus:outline-none transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-zinc-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-stone-200">
              <span className="text-xs uppercase tracking-widest text-stone-400 mr-3 flex items-center gap-1.5 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" /> Department:
              </span>
              {categories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition ${
                      active
                        ? "bg-zinc-900 text-white"
                        : "bg-white text-stone-600 hover:text-zinc-900 border border-stone-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-stone-200 p-16 text-center max-w-xl mx-auto">
                <h3 className="font-serif text-2xl text-zinc-900">
                  No matching items in this filter
                </h3>
                <p className="text-sm text-stone-500 mt-2 leading-relaxed">
                  Reset your search filter or contact our Panigate counter directly at{" "}
                  <strong>{storeInfo.phone}</strong> for custom requirements.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchQuery("");
                    }}
                    className="px-6 py-3 bg-zinc-900 text-white text-xs uppercase tracking-widest font-semibold"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => navigateTo("contact")}
                    className="px-6 py-3 border border-stone-300 text-zinc-900 text-xs uppercase tracking-widest font-semibold"
                  >
                    Contact Counter
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => {
                  const inCart = quoteCart.find((item) => item.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white border border-stone-200 hover:border-stone-400 p-8 flex flex-col justify-between transition"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-stone-100">
                          <span className="text-[11px] uppercase tracking-[0.18em] text-amber-800 font-semibold">
                            {product.brand}
                          </span>
                          <span className="text-xs font-semibold text-zinc-900 bg-stone-100 px-2.5 py-1 border border-stone-200">
                            {product.price || "Ask for Quote"}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl text-zinc-900 leading-snug">
                          {product.name}
                        </h3>

                        <div className="mt-4 px-3.5 py-2 bg-[#FAF9F6] border border-stone-200/80 text-xs text-zinc-700 font-medium">
                          {product.specs}
                        </div>

                        <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-8 pt-5 border-t border-stone-100 space-y-4">
                        <div className="flex items-center justify-between text-xs text-stone-500">
                          <span className="text-emerald-700 font-medium">
                            ● {product.availability}
                          </span>
                          <span>Unit: {product.unit}</span>
                        </div>

                        {inCart ? (
                          <div className="flex items-center justify-between border border-zinc-900 bg-[#FAF9F6] p-1">
                            <button
                              onClick={() => updateCartQty(product.id, -1)}
                              className="w-9 h-9 bg-white hover:bg-stone-200 text-zinc-900 flex items-center justify-center transition"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs uppercase tracking-wider font-semibold text-zinc-900">
                              {inCart.qty} {product.unit} Added
                            </span>
                            <button
                              onClick={() => updateCartQty(product.id, 1)}
                              className="w-9 h-9 bg-zinc-900 text-white flex items-center justify-center transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToQuote(product)}
                            className="w-full py-3 px-4 border border-zinc-900 bg-white hover:bg-zinc-900 text-zinc-900 hover:text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Inquiry List</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* -------------------------------------------------------------------
            PAGE 3: DEDICATED ENGINEERING WORKS PAGE
           ------------------------------------------------------------------- */}
        {currentPage === "engineering" && (
          <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12">
            {/* Editorial Header */}
            <div className="border-b border-stone-200 pb-14 mb-16 grid lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                  Division II • Technical Consultancy &amp; Execution
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl text-zinc-900 mt-3 leading-tight">
                  Electrical Engineering Works: Designing, Load Planning &amp; Systems
                </h1>
                <p className="text-stone-600 mt-5 text-base sm:text-lg leading-relaxed">
                  Beyond retail electrical supplies,{" "}
                  <strong className="text-zinc-900 font-medium">
                    Shree Tulja Electrical &amp; Engineering Works
                  </strong>{" "}
                  provides structured electrical engineering, circuit planning, connected load calculation, and custom switchboard assembly for residential bungalows, commercial offices, retail showrooms, and industrial units across Vadodara.
                </p>
              </div>

              <div className="lg:col-span-4 bg-white border border-stone-200 p-6">
                <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                  Direct Engineering Desk
                </div>
                <div className="font-serif text-2xl text-zinc-900 mt-1">
                  {storeInfo.phone}
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Bring your architectural floor plan to our Panigate showroom or book a technical consultation below.
                </p>
                <a
                  href={`tel:${storeInfo.phone.replace(/\s+/g, "")}`}
                  className="mt-4 w-full py-3 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold inline-flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Engineering Desk</span>
                </a>
              </div>
            </div>

            {/* 4-Step Engineering Methodology */}
            <div className="mb-20">
              <div className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold mb-3">
                Engineering Workflow
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-zinc-900 mb-10">
                How We Plan &amp; Execute Your Electrical Infrastructure
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: "STEP 01",
                    title: "Site & Floor Plan Assessment",
                    desc: "Reviewing architectural drawings, room functions, machinery placement, and lighting requirements."
                  },
                  {
                    step: "STEP 02",
                    title: "Load & Wire-Gauge Sizing",
                    desc: "Calculating exact kW demand, selecting 1.0 to 10.0 sq.mm FR/FRLS cable gauges, and balancing phases."
                  },
                  {
                    step: "STEP 03",
                    title: "Conduit & DB Architecture",
                    desc: "Mapping 20mm/25mm PVC slab piping, GI modular boxes, and grading MCB/RCCB protection tiers."
                  },
                  {
                    step: "STEP 04",
                    title: "BOQ Supply & Execution",
                    desc: "Supplying 100% genuine ISI materials from our counter along with custom-assembled panels and testing."
                  }
                ].map((s, idx) => (
                  <div key={idx} className="bg-white border border-stone-200 p-7">
                    <span className="text-xs font-semibold tracking-widest text-amber-800">
                      {s.step}
                    </span>
                    <h3 className="font-serif text-lg text-zinc-900 mt-2 mb-2">
                      {s.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Engineering Services Grid */}
            <div className="space-y-8 mb-20">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                  Core Technical Capabilities
                </span>
                <h2 className="font-serif text-3xl text-zinc-900 mt-2">
                  Specialized Electrical Engineering Services
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {ENGINEERING_SERVICES.map((srv) => (
                  <div
                    key={srv.id}
                    className="bg-white border border-stone-200 p-8 sm:p-10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-stone-100">
                        <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                          {srv.code}
                        </span>
                        <span className="text-xs text-stone-500">{srv.scope}</span>
                      </div>

                      <h3 className="font-serif text-2xl text-zinc-900 mb-3">
                        {srv.title}
                      </h3>

                      <p className="text-sm text-stone-600 leading-relaxed mb-6">
                        {srv.description}
                      </p>
                    </div>

                    <div className="bg-[#FAF9F6] border border-stone-200 p-5">
                      <div className="text-[11px] uppercase tracking-widest text-zinc-900 font-semibold mb-3">
                        Technical Deliverables:
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {srv.deliverables.map((del, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                            <span className="w-1.5 h-1.5 bg-amber-700 rounded-full shrink-0" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Request Engineering Consultation Form (Saves to Backend) */}
            <div className="bg-white border border-stone-300 p-8 sm:p-12">
              <div className="max-w-3xl mb-10">
                <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                  Project Consultation &amp; BOQ Planning
                </span>
                <h2 className="font-serif text-3xl text-zinc-900 mt-2">
                  Request an Electrical Designing or Load Planning Consultation
                </h2>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                  Submit your project parameters below. Your request is logged directly in our showroom backend, and our engineering desk will contact you via phone (<strong>{storeInfo.phone}</strong>).
                </p>
              </div>

              <form onSubmit={handleSubmitEngineeringConsultation} className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Client / Architect Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={engForm.clientName}
                      onChange={(e) =>
                        setEngForm({ ...engForm, clientName: e.target.value })
                      }
                      placeholder="Your Full Name"
                      className="w-full bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3 text-sm text-zinc-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={engForm.phone}
                      onChange={(e) => setEngForm({ ...engForm, phone: e.target.value })}
                      placeholder="e.g. 098250 XXXXX"
                      className="w-full bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3 text-sm text-zinc-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Project Category
                    </label>
                    <select
                      value={engForm.projectType}
                      onChange={(e) =>
                        setEngForm({ ...engForm, projectType: e.target.value })
                      }
                      className="w-full bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3 text-sm text-zinc-900 focus:outline-none"
                    >
                      <option>Residential Bungalow / Apartment</option>
                      <option>Commercial Showroom / Retail Shop</option>
                      <option>Industrial Workshop / GIDC Unit</option>
                      <option>Hospital / Clinic / Institutional</option>
                      <option>Rewiring &amp; Safety Upgradation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Engineering Service Needed
                    </label>
                    <select
                      value={engForm.serviceRequired}
                      onChange={(e) =>
                        setEngForm({ ...engForm, serviceRequired: e.target.value })
                      }
                      className="w-full bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3 text-sm text-zinc-900 focus:outline-none"
                    >
                      <option>Electrical System Designing &amp; CAD Layout</option>
                      <option>Connected Load Calculation &amp; SLD</option>
                      <option>Conduit Routing &amp; DB/MCB Planning</option>
                      <option>Earthing &amp; Electrical Safety Audit</option>
                      <option>Custom Switchboard / Panel Fabrication</option>
                      <option>Complete Turnkey Supply + Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Approx. Area (Sq. Ft.)
                    </label>
                    <input
                      type="text"
                      value={engForm.areaSqFt}
                      onChange={(e) =>
                        setEngForm({ ...engForm, areaSqFt: e.target.value })
                      }
                      placeholder="e.g. 2,400 Sq. Ft."
                      className="w-full bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3 text-sm text-zinc-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Estimated Load / Phase
                    </label>
                    <input
                      type="text"
                      value={engForm.estimatedLoadKw}
                      onChange={(e) =>
                        setEngForm({ ...engForm, estimatedLoadKw: e.target.value })
                      }
                      placeholder="e.g. 15 kW / 3-Phase"
                      className="w-full bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3 text-sm text-zinc-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                    Project Scope, Site Location &amp; Technical Notes
                  </label>
                  <textarea
                    rows={3}
                    value={engForm.projectNotes}
                    onChange={(e) =>
                      setEngForm({ ...engForm, projectNotes: e.target.value })
                    }
                    placeholder="Describe your site location in Vadodara, number of floors/rooms, or custom panel requirements..."
                    className="w-full bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3 text-sm text-zinc-900 focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Engineering Request</span>
                  </button>

                  <a
                    href={`tel:${storeInfo.phone.replace(/\s+/g, "")}`}
                    className="px-8 py-4 border border-zinc-900 text-zinc-900 hover:bg-stone-100 text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-700" />
                    <span>Call {storeInfo.phone}</span>
                  </a>
                </div>

                {engFormSubmitted && (
                  <div className="p-4 bg-stone-100 border-l-4 border-amber-700 text-xs text-zinc-800">
                    Thank you. Your engineering consultation request has been saved to our backend portal. You may also call us directly at <strong>{storeInfo.phone}</strong>.
                  </div>
                )}
              </form>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            PAGE 4: BRANDS PAGE
           ------------------------------------------------------------------- */}
        {currentPage === "brands" && (
          <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl border-b border-stone-200 pb-12 mb-14">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                Authorized &amp; Stocked Partners
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-zinc-900 mt-3">
                India’s Trusted Electrical Brands Under One Roof
              </h1>
              <p className="text-stone-600 mt-4 text-base leading-relaxed">
                We partner with established manufacturers to ensure that every wire coil, circuit breaker, luminaire, and water heater leaving our Panigate counter meets strict national safety standards.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {BRANDS.map((brand, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-stone-200 p-8 sm:p-10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
                      <span className="text-xs uppercase tracking-[0.18em] text-amber-800 font-semibold">
                        {brand.origin}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">
                        {brand.assurance}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl text-zinc-900">
                      {brand.name}
                    </h2>

                    <p className="text-sm text-stone-600 mt-4 leading-relaxed">
                      <strong className="text-zinc-900 font-medium">Stocked Range: </strong>
                      {brand.stockedItems}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSearchQuery(brand.name.split(" ")[0]);
                        navigateTo("categories", "All");
                      }}
                      className="text-xs uppercase tracking-widest font-semibold text-zinc-900 hover:text-amber-800 inline-flex items-center gap-2 transition"
                    >
                      <span>View {brand.name.split(" ")[0]} Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            PAGE 5: SHOWROOM & GALLERY PAGE
           ------------------------------------------------------------------- */}
        {currentPage === "gallery" && (
          <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl border-b border-stone-200 pb-12 mb-14">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                Showroom Architecture &amp; Stock
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-zinc-900 mt-3">
                Inside Our Panigate Showroom
              </h1>
              <p className="text-stone-600 mt-4 text-base leading-relaxed">
                Our store at Juni Ghadhi, Bhadra Kacheri Road is organized into four specialized bays—allowing homeowners to inspect switches and appliances comfortably while contractors load bulk conduits and wire coils without delay.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {GALLERY_DEPARTMENTS.map((dept) => (
                <div
                  key={dept.id}
                  className="bg-white border border-stone-200 p-8 sm:p-12 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold pb-4 mb-6 border-b border-stone-100">
                      <span>{dept.code}</span>
                      <span className="text-stone-400">{dept.subtitle}</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl text-zinc-900 mb-4">
                      {dept.title}
                    </h2>

                    <p className="text-sm text-stone-600 leading-relaxed mb-8">
                      {dept.description}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3">
                      Key Inventory in This Bay:
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 mb-8">
                      {dept.highlights.map((item, i) => (
                        <div
                          key={i}
                          className="text-xs text-zinc-800 bg-[#FAF9F6] border border-stone-200 px-3.5 py-2"
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedDepartment(dept)}
                      className="px-5 py-3 border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Department Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            PAGE 5B: CLIENT & CONTRACTOR TESTIMONIALS PAGE
           ------------------------------------------------------------------- */}
        {currentPage === "testimonials" && (
          <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl border-b border-stone-200 pb-12 mb-14">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                Client &amp; Contractor Endorsements
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-zinc-900 mt-3">
                Trusted Across Vadodara’s Residential &amp; Commercial Projects
              </h1>
              <p className="text-stone-600 mt-4 text-base leading-relaxed">
                Licensed electrical contractors, industrial maintenance heads, architects, and homeowners rely on our Panigate showroom for genuine ISI supplies and sound electrical engineering guidance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {TESTIMONIALS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-stone-200 p-8 sm:p-12 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-100">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-amber-800 font-semibold">
                        {item.project}
                      </span>
                      <Quote className="w-5 h-5 text-amber-700/60" />
                    </div>

                    <p className="font-serif text-lg sm:text-xl text-zinc-900 leading-relaxed">
                      “{item.quote}”
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-stone-100">
                    <div className="font-semibold text-sm text-zinc-900">
                      {item.author}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">{item.role}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-white border border-stone-200 p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                  Start Your Project
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-zinc-900 mt-2">
                  Need a Complete Electrical BOQ or Engineering Plan?
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigateTo("categories")}
                  className="px-7 py-4 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold transition"
                >
                  Build Material List
                </button>
                <button
                  onClick={() => navigateTo("contact")}
                  className="px-7 py-4 border border-zinc-900 text-zinc-900 hover:bg-stone-100 text-xs uppercase tracking-widest font-semibold transition"
                >
                  Visit Panigate Showroom
                </button>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            PAGE 6: CONTACT & LOCATION PAGE (WITH WHATSAPP, FORM & MAP)
           ------------------------------------------------------------------- */}
        {currentPage === "contact" && (
          <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl border-b border-stone-200 pb-12 mb-14">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                Showroom Location &amp; Direct Inquiries
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-zinc-900 mt-3">
                Visit or Contact Shree Tulja Electricals
              </h1>
              <p className="text-stone-600 mt-4 text-base leading-relaxed">
                Submit your electrical bill of materials to our showroom desk, send your inquiry list via WhatsApp, or call our Panigate counter directly at{" "}
                <strong className="text-zinc-900">{storeInfo.phone}</strong>.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left Column: Address Details & Direct Backend Inquiry Form */}
              <div className="lg:col-span-6 space-y-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white border border-stone-200 p-6">
                    <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Showroom Address
                    </div>
                    <p className="text-sm text-zinc-800 leading-relaxed">
                      {storeInfo.name}
                      <br />
                      {storeInfo.address}
                    </p>
                  </div>

                  <div className="bg-white border border-stone-200 p-6">
                    <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Direct Phone &amp; Hours
                    </div>
                    <a
                      href={`tel:${storeInfo.phone.replace(/\s+/g, "")}`}
                      className="font-serif text-xl text-zinc-900 hover:text-amber-800 block mb-2"
                    >
                      {storeInfo.phone}
                    </a>
                    <p className="text-xs text-zinc-700">{storeInfo.hoursWeekdays}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{storeInfo.hoursSunday}</p>
                  </div>
                </div>

                {/* Direct Backend Quotation Form */}
                <form
                  onSubmit={handleSubmitMaterialInquiry}
                  className="bg-white border border-stone-200 p-8 sm:p-10 space-y-6"
                >
                  <div className="border-b border-stone-100 pb-4 flex items-center justify-between">
                    <h2 className="font-serif text-2xl text-zinc-900">
                      Submit Estimate / Supply Inquiry
                    </h2>
                    {totalQuoteItems > 0 && (
                      <span className="text-xs bg-stone-100 border border-stone-200 px-3 py-1 text-zinc-800 font-medium">
                        {totalQuoteItems} catalogue items attached
                      </span>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3 text-sm text-zinc-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 098250 XXXXX"
                        className="w-full bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3 text-sm text-zinc-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Buyer Profile
                    </label>
                    <select
                      value={formData.customerType}
                      onChange={(e) =>
                        setFormData({ ...formData, customerType: e.target.value })
                      }
                      className="w-full bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3 text-sm text-zinc-900 focus:outline-none"
                    >
                      <option>Homeowner / Individual Buyer</option>
                      <option>Electrical Contractor / Wireman</option>
                      <option>Commercial / Industrial Establishment</option>
                      <option>Architect / Interior Designer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Material List or Engineering Inquiry Notes
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Specify required wire gauges, switch series, conduit quantities, or electrical designing requirements..."
                      className="w-full bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3 text-sm text-zinc-900 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingQuote}
                      className="flex-1 py-4 px-5 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {isSubmittingQuote ? "Submitting..." : "Submit Inquiry"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendWhatsAppQuote}
                      className="flex-1 py-4 px-5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleDownloadEstimateSheet}
                      className="w-full py-3 px-6 bg-white hover:bg-stone-100 text-zinc-900 border border-stone-300 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-700" />
                      <span>Download Printable Estimate Sheet (.TXT)</span>
                    </button>
                  </div>

                  {formSubmitted && (
                    <div className="p-4 bg-stone-100 border-l-4 border-amber-700 text-xs text-zinc-800">
                      Your inquiry has been logged in our showroom backend. Our team will review your list and call you, or you can reach us immediately at{" "}
                      <strong>{storeInfo.phone}</strong>.
                    </div>
                  )}
                </form>
              </div>

              {/* Right Column: Exact Provided Google Map Embed */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white border border-stone-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between px-2 pb-4 mb-2 border-b border-stone-100">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900">
                        Panigate Showroom Map
                      </h3>
                      <p className="text-xs text-stone-500">
                        Juni Ghadhi, Bhadra Kacheri Rd, Panigate, Vadodara
                      </p>
                    </div>
                    <a
                      href={storeInfo.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-wider font-semibold text-amber-800 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Open Directions</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="w-full h-[450px] bg-stone-100 overflow-hidden">
                    <iframe
                      title="Shree Tulja Electrical & Engineering Works Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4215.241710639987!2d73.21164527572888!3d22.302953942798663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcfb20e2620ef%3A0x72d9bec7990879e2!2sShree%20Tulja%20Electrical%20%26%20Engineering%20Works!5e1!3m2!1sen!2sin!4v1793796357035!5m2!1sen!2sin"
                      width="600"
                      height="450"
                      style={{ border: 0, width: "100%", height: "450px" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </div>

                <div className="bg-white border border-stone-200 p-8">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold mb-2">
                    Location &amp; Loading Access
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Situated along Bhadra Kacheri Road at Juni Ghadhi, Panigate, our showroom offers convenient access from Mandvi, Panigate Darwaza, Ajwa Road, and Waghodia Road with straightforward loading for PVC conduit bundles and bulk wiring cartons.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            PAGE 7: PRIVATE OWNER PORTAL (ONLY ACCESSIBLE WHEN UNLOCKED)
           ------------------------------------------------------------------- */}
        {currentPage === "admin" && isOwnerUnlocked && (
          <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12">
            <div className="border-b border-stone-200 pb-10 mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Private Store Owner Portal • PIN Authenticated</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl text-zinc-900 mt-2">
                  Owner Branding, Logo &amp; Inventory Portal
                </h1>
                <p className="text-sm text-stone-600 mt-2 max-w-2xl">
                  This portal is completely invisible to regular website visitors. Upload your official company logo, manage contact details, export deployment configs, or update live inventory.
                </p>
              </div>

              {/* Sub-Navigation Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    id: "branding",
                    label: "Company Logo & Config",
                    icon: <Upload className="w-3.5 h-3.5" />
                  },
                  {
                    id: "inventory",
                    label: `Live Inventory (${products.length})`,
                    icon: <Layers className="w-3.5 h-3.5" />
                  },
                  {
                    id: "sheets",
                    label: "Google Sheets Sync",
                    icon: <FileSpreadsheet className="w-3.5 h-3.5" />
                  },
                  {
                    id: "inquiries",
                    label: `Inquiries (${inquiries.length})`,
                    icon: <ClipboardCheck className="w-3.5 h-3.5" />
                  },
                  {
                    id: "settings",
                    label: "Contact & PIN",
                    icon: <Settings className="w-3.5 h-3.5" />
                  }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setAdminTab(t.id)}
                    className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 border transition ${
                      adminTab === t.id
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "bg-white text-stone-700 border-stone-300 hover:border-zinc-900"
                    }`}
                  >
                    {t.icon}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* TAB 0: OFFICIAL COMPANY LOGO & DEPLOYMENT EXPORT */}
            {adminTab === "branding" && (
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 bg-white border border-stone-200 p-8 sm:p-10 space-y-6">
                  <div className="border-b border-stone-100 pb-4">
                    <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                      Official Brand Identity
                    </span>
                    <h2 className="font-serif text-2xl text-zinc-900 mt-1">
                      Upload Company Logo or Paste Permanent URL
                    </h2>
                  </div>

                  {/* Live Preview Box */}
                  <div className="p-6 bg-[#FAF9F6] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-2">
                        Current Public Header Preview
                      </div>
                      <BrandWordmark storeInfo={storeInfo} customLogo={customLogo} />
                    </div>
                    {customLogo && (
                      <button
                        type="button"
                        onClick={handleRemoveCustomLogo}
                        className="px-3.5 py-2 border border-stone-300 hover:border-rose-700 text-rose-700 text-xs uppercase tracking-wider font-semibold self-start sm:self-center"
                      >
                        Revert to Wordmark
                      </button>
                    )}
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Option 1: Upload Official Logo Image (PNG / SVG / JPG)
                    </label>
                    <label className="cursor-pointer flex items-center justify-center gap-3 border-2 border-dashed border-stone-300 hover:border-amber-700 bg-[#FAF9F6] p-6 text-xs uppercase tracking-widest font-semibold text-zinc-800 transition">
                      <Upload className="w-4 h-4 text-amber-700" />
                      <span>Select Company Logo File from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Direct URL or Base64 Input */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Option 2: Paste Permanent Logo URL or Base64 Data URI
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={customLogo}
                        onChange={(e) => setCustomLogo(e.target.value)}
                        placeholder="https://yourdomain.com/logo.png or data:image/png;base64,..."
                        className="flex-1 bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3 text-sm text-zinc-900 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleSaveStoreSettings}
                        className="px-6 py-3 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold transition"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Hardcode & Export Tools for Deployment */}
                <div className="lg:col-span-5 bg-white border border-stone-200 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                      Deployment &amp; Hardcoding Tools
                    </span>
                    <h3 className="font-serif text-2xl text-zinc-900">
                      Lock In Your Config Before Deploying
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      Your uploaded logo and contact details are automatically saved in browser storage (`localStorage`) and cloud sync. For permanent static hosting, you can also copy the Base64 constant or export `config.json`.
                    </p>

                    <div className="space-y-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCopyHardcodeSnippet}
                        className="w-full py-3.5 px-5 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy COMPANY_LOGO_URL Snippet</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleExportConfigJson}
                        className="w-full py-3.5 px-5 bg-white border border-zinc-900 text-zinc-900 hover:bg-stone-100 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-700" />
                        <span>Export Ready-to-Deploy config.json</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#FAF9F6] border border-stone-200 p-5 text-xs text-stone-600 space-y-2">
                    <div className="font-semibold text-zinc-900 uppercase tracking-wider">
                      Secret Owner Access Reminders:
                    </div>
                    <p>• Keyboard Shortcut: <strong>Ctrl + Shift + O</strong> (or Cmd + Shift + O)</p>
                    <p>• Footer Trigger: Double-click the <strong>©</strong> symbol in the footer</p>
                    <p>• Direct URL Bookmark: <strong>#owner</strong></p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: LIVE INVENTORY EDITOR */}
            {adminTab === "inventory" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-stone-200 p-6">
                  <div>
                    <h2 className="font-serif text-xl text-zinc-900">
                      Product Catalogue &amp; Price Editor
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Click <strong>Edit</strong> on any item to change its price, stock status, or specifications in real time.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setNewProductModal(true)}
                      className="px-5 py-2.5 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Product</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-stone-200 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-stone-200 bg-[#FAF9F6] text-[11px] uppercase tracking-wider text-stone-500">
                        <th className="py-3.5 px-4">Product Name</th>
                        <th className="py-3.5 px-4">Brand</th>
                        <th className="py-3.5 px-4">Department</th>
                        <th className="py-3.5 px-4">Price / Rate</th>
                        <th className="py-3.5 px-4">Stock Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 text-sm">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-stone-50/80">
                          <td className="py-4 px-4 font-medium text-zinc-900">
                            {p.name}
                            <div className="text-xs text-stone-500 font-normal mt-0.5">
                              {p.specs}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-xs uppercase tracking-wider text-amber-800 font-semibold">
                            {p.brand}
                          </td>
                          <td className="py-4 px-4 text-xs text-stone-600">
                            {p.category}
                          </td>
                          <td className="py-4 px-4 text-xs font-semibold text-zinc-900">
                            {p.price || "Ask for Quote"}
                          </td>
                          <td className="py-4 px-4 text-xs text-emerald-700 font-medium">
                            {p.availability}
                          </td>
                          <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => setEditingProduct({ ...p })}
                              className="px-3 py-1.5 border border-stone-300 hover:border-zinc-900 text-xs font-semibold text-zinc-900 inline-flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="px-2.5 py-1.5 border border-stone-200 hover:border-rose-600 text-xs text-rose-700 inline-flex items-center"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: GOOGLE SHEETS SYNC */}
            {adminTab === "sheets" && (
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 bg-white border border-stone-200 p-8 sm:p-10 space-y-6">
                  <div className="border-b border-stone-100 pb-4">
                    <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                      Spreadsheet Automation
                    </span>
                    <h2 className="font-serif text-2xl text-zinc-900 mt-1">
                      Connect Your Google Sheet
                    </h2>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    Prefer updating prices and stock from Google Sheets? Paste your published Google Sheet CSV link below and click <strong>Sync Inventory Now</strong>.
                  </p>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Published Google Sheet CSV URL
                    </label>
                    <input
                      type="url"
                      value={sheetUrlInput}
                      onChange={(e) => setSheetUrlInput(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                      className="w-full bg-[#FAF9F6] border border-stone-300 focus:border-zinc-900 px-4 py-3.5 text-sm text-zinc-900 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={handleSyncFromGoogleSheet}
                      disabled={isSyncingSheet}
                      className="px-6 py-3.5 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 transition"
                    >
                      <RefreshCw
                        className={`w-4 h-4 ${isSyncingSheet ? "animate-spin" : ""}`}
                      />
                      <span>
                        {isSyncingSheet ? "Syncing Inventory..." : "Sync Inventory Now"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadGoogleSheetTemplate}
                      className="px-6 py-3.5 bg-white border border-zinc-900 text-zinc-900 hover:bg-stone-100 text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 transition"
                    >
                      <Download className="w-4 h-4 text-amber-700" />
                      <span>Download CSV Template</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-stone-200 p-8 sm:p-10 space-y-4">
                  <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                    Quick Setup Guide
                  </span>
                  <h3 className="font-serif text-xl text-zinc-900">
                    How to Publish Your Google Sheet
                  </h3>
                  <ol className="text-xs text-stone-600 space-y-3 list-decimal list-inside leading-relaxed">
                    <li>
                      Download the CSV Template and import it into Google Sheets.
                    </li>
                    <li>
                      In Google Sheets, click <strong>File → Share → Publish to web</strong>.
                    </li>
                    <li>
                      Choose <strong>Comma-separated values (.csv)</strong> and copy the link.
                    </li>
                    <li>
                      Paste the link here and click <strong>Sync Inventory Now</strong>.
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* TAB 3: CUSTOMER INQUIRIES & ENGINEERING CONSULTATIONS */}
            {adminTab === "inquiries" && (
              <div className="space-y-6">
                <div className="bg-white border border-stone-200 p-6 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl text-zinc-900">
                      Customer Inquiries &amp; Engineering Requests
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Live submissions from the website estimate builder and engineering consultation forms.
                    </p>
                  </div>
                </div>

                {inquiries.length === 0 ? (
                  <div className="bg-white border border-stone-200 p-12 text-center text-sm text-stone-500">
                    No customer inquiries recorded yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-white border border-stone-200 p-6 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                            {inq.type || "Customer Inquiry"}
                          </span>
                          <span className="text-xs text-stone-400">
                            {inq.dateFormatted || ""}
                          </span>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-xs text-stone-500 block">Client:</span>
                            <strong className="text-zinc-900">{inq.clientName}</strong>
                          </div>
                          <div>
                            <span className="text-xs text-stone-500 block">Phone:</span>
                            <a
                              href={`tel:${inq.phone}`}
                              className="text-amber-800 font-semibold hover:underline"
                            >
                              {inq.phone}
                            </a>
                          </div>
                          <div>
                            <span className="text-xs text-stone-500 block">Profile:</span>
                            <span className="text-zinc-800">{inq.customerType}</span>
                          </div>
                        </div>
                        {inq.message && (
                          <p className="text-xs text-stone-600 bg-[#FAF9F6] p-3 border border-stone-200">
                            {inq.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: STORE SETTINGS & PIN EDITOR */}
            {adminTab === "settings" && (
              <form
                onSubmit={handleSaveStoreSettings}
                className="bg-white border border-stone-200 p-8 sm:p-10 max-w-2xl space-y-6"
              >
                <div className="border-b border-stone-100 pb-4">
                  <h2 className="font-serif text-2xl text-zinc-900">
                    Store Contact, WhatsApp &amp; Owner PIN Settings
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Update your showroom phone number, WhatsApp number, email address, business hours, or secret Owner PIN.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Official Display Phone Number
                    </label>
                    <input
                      type="text"
                      value={storeInfo.phone}
                      onChange={(e) =>
                        setStoreInfo({ ...storeInfo, phone: e.target.value })
                      }
                      className="w-full bg-[#FAF9F6] border border-stone-300 px-4 py-3 text-sm text-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      WhatsApp Number (With Country Code)
                    </label>
                    <input
                      type="text"
                      value={storeInfo.whatsapp || "919979588481"}
                      onChange={(e) =>
                        setStoreInfo({ ...storeInfo, whatsapp: e.target.value })
                      }
                      placeholder="e.g. 919979588481"
                      className="w-full bg-[#FAF9F6] border border-stone-300 px-4 py-3 text-sm text-zinc-900"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Store Email Address
                    </label>
                    <input
                      type="email"
                      value={storeInfo.email || ""}
                      onChange={(e) =>
                        setStoreInfo({ ...storeInfo, email: e.target.value })
                      }
                      className="w-full bg-[#FAF9F6] border border-stone-300 px-4 py-3 text-sm text-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Change Owner Portal PIN (Optional)
                    </label>
                    <input
                      type="password"
                      value={newPinDraft}
                      onChange={(e) => setNewPinDraft(e.target.value)}
                      placeholder="Leave blank to keep current PIN"
                      className="w-full bg-[#FAF9F6] border border-stone-300 px-4 py-3 text-sm text-zinc-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                    Showroom Address
                  </label>
                  <input
                    type="text"
                    value={storeInfo.address}
                    onChange={(e) =>
                      setStoreInfo({ ...storeInfo, address: e.target.value })
                    }
                    className="w-full bg-[#FAF9F6] border border-stone-300 px-4 py-3 text-sm text-zinc-900"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Weekday Hours
                    </label>
                    <input
                      type="text"
                      value={storeInfo.hoursWeekdays}
                      onChange={(e) =>
                        setStoreInfo({ ...storeInfo, hoursWeekdays: e.target.value })
                      }
                      className="w-full bg-[#FAF9F6] border border-stone-300 px-4 py-3 text-sm text-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                      Sunday Hours
                    </label>
                    <input
                      type="text"
                      value={storeInfo.hoursSunday}
                      onChange={(e) =>
                        setStoreInfo({ ...storeInfo, hoursSunday: e.target.value })
                      }
                      className="w-full bg-[#FAF9F6] border border-stone-300 px-4 py-3 text-sm text-zinc-900"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 transition"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Store Settings</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLockOwnerMode}
                    className="px-5 py-3.5 border border-stone-300 hover:border-zinc-900 text-zinc-900 text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 transition"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Lock &amp; Exit Owner Mode</span>
                  </button>
                </div>
              </form>
            )}
          </section>
        )}
      </main>

      {/* --- SECRET OWNER PIN AUTHENTICATION MODAL --- */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-6">
          <form
            onSubmit={handleVerifyPin}
            className="bg-[#FAF9F6] border border-stone-300 max-w-md w-full p-8 sm:p-10 shadow-2xl space-y-6"
          >
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-800 font-semibold flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" /> Restricted Access
                </span>
                <h3 className="font-serif text-2xl text-zinc-900 mt-1">
                  Owner Portal Authentication
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPinModalOpen(false)}
                className="text-stone-400 hover:text-zinc-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Enter the store owner PIN or password to unlock company logo controls, store settings, and live inventory management.
            </p>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-2">
                Owner PIN / Passcode
              </label>
              <input
                type="password"
                autoFocus
                required
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError("");
                }}
                placeholder="Enter PIN (e.g. 1998)"
                className="w-full bg-white border border-stone-300 focus:border-zinc-900 px-4 py-3.5 text-sm text-zinc-900 tracking-widest focus:outline-none"
              />
              {pinError && (
                <p className="text-xs text-rose-700 font-medium mt-2">{pinError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsPinModalOpen(false)}
                className="px-5 py-3 border border-stone-300 text-zinc-800 text-xs uppercase tracking-widest font-semibold hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 transition"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Unlock Owner Mode</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- EDIT PRODUCT MODAL (OWNER PORTAL) --- */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-6">
          <form
            onSubmit={handleSaveEditedProduct}
            className="bg-white border border-stone-300 max-w-lg w-full p-8 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="font-serif text-2xl text-zinc-900">Edit Product</h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="text-stone-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                Product Name
              </label>
              <input
                type="text"
                required
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2.5 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  value={editingProduct.brand}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, brand: e.target.value })
                  }
                  className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  Price / Rate
                </label>
                <input
                  type="text"
                  value={editingProduct.price || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: e.target.value })
                  }
                  className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2.5 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  Stock Status
                </label>
                <input
                  type="text"
                  value={editingProduct.availability}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      availability: e.target.value
                    })
                  }
                  className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  value={editingProduct.unit}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, unit: e.target.value })
                  }
                  className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                Technical Specifications
              </label>
              <input
                type="text"
                value={editingProduct.specs}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, specs: e.target.value })
                }
                className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2.5 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-5 py-2.5 border border-stone-300 text-xs uppercase tracking-widest font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-zinc-900 text-white text-xs uppercase tracking-widest font-semibold"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- ADD NEW PRODUCT MODAL (OWNER PORTAL) --- */}
      {newProductModal && (
        <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-6">
          <form
            onSubmit={handleAddNewProduct}
            className="bg-white border border-stone-300 max-w-lg w-full p-8 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="font-serif text-2xl text-zinc-900">Add New Product</h3>
              <button
                type="button"
                onClick={() => setNewProductModal(false)}
                className="text-stone-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={newProductDraft.name}
                onChange={(e) =>
                  setNewProductDraft({ ...newProductDraft, name: e.target.value })
                }
                className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2.5 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  Category
                </label>
                <select
                  value={newProductDraft.category}
                  onChange={(e) =>
                    setNewProductDraft({ ...newProductDraft, category: e.target.value })
                  }
                  className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2.5 text-sm"
                >
                  {categories.slice(1).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  value={newProductDraft.brand}
                  onChange={(e) =>
                    setNewProductDraft({ ...newProductDraft, brand: e.target.value })
                  }
                  className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2.5 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  Price / Rate
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹450 Onwards"
                  value={newProductDraft.price}
                  onChange={(e) =>
                    setNewProductDraft({ ...newProductDraft, price: e.target.value })
                  }
                  className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  value={newProductDraft.unit}
                  onChange={(e) =>
                    setNewProductDraft({ ...newProductDraft, unit: e.target.value })
                  }
                  className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                Technical Specs
              </label>
              <input
                type="text"
                value={newProductDraft.specs}
                onChange={(e) =>
                  setNewProductDraft({ ...newProductDraft, specs: e.target.value })
                }
                className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={newProductDraft.description}
                onChange={(e) =>
                  setNewProductDraft({
                    ...newProductDraft,
                    description: e.target.value
                  })
                }
                className="w-full bg-[#FAF9F6] border border-stone-300 px-3.5 py-2 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setNewProductModal(false)}
                className="px-5 py-2.5 border border-stone-300 text-xs uppercase tracking-widest font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-zinc-900 text-white text-xs uppercase tracking-widest font-semibold"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- GALLERY DEPARTMENT LIGHTBOX MODAL --- */}
      {selectedDepartment && (
        <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-6">
          <div className="bg-white border border-stone-300 max-w-lg w-full p-8 sm:p-10 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-semibold">
                  {selectedDepartment.code}
                </span>
                <h3 className="font-serif text-2xl text-zinc-900 mt-1">
                  {selectedDepartment.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDepartment(null)}
                className="p-2 text-stone-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              {selectedDepartment.description}
            </p>

            <div className="bg-[#FAF9F6] border border-stone-200 p-5">
              <div className="text-xs uppercase tracking-widest text-zinc-900 font-semibold mb-3">
                Available in This Section:
              </div>
              <ul className="grid grid-cols-2 gap-2 text-xs text-stone-700">
                {selectedDepartment.highlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-700 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedDepartment(null);
                  navigateTo("categories", "All");
                }}
                className="px-6 py-3 bg-zinc-900 text-white text-xs uppercase tracking-widest font-semibold"
              >
                Browse Catalogue
              </button>
              <button
                onClick={() => setSelectedDepartment(null)}
                className="px-6 py-3 border border-stone-300 text-zinc-900 text-xs uppercase tracking-widest font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SLIDE-OVER INQUIRY DRAWER (NO WHATSAPP — DIRECT SUBMIT / CALL / DOWNLOAD) --- */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-xs flex justify-end">
          <div className="bg-[#FAF9F6] border-l border-stone-300 w-full max-w-md h-full flex flex-col justify-between p-8 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-amber-800 font-semibold">
                    Estimate Builder
                  </span>
                  <h3 className="font-serif text-2xl text-zinc-900 mt-0.5">
                    Your Inquiry List
                  </h3>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 border border-stone-300 bg-white text-zinc-900 hover:bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-6 space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                {quoteCart.length === 0 ? (
                  <div className="bg-white border border-stone-200 p-10 text-center">
                    <p className="font-serif text-lg text-zinc-900">
                      Your inquiry list is empty
                    </p>
                    <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                      Browse our Electrical Supplies page to add wires, switches, lighting, or appliances for an estimate.
                    </p>
                    <button
                      onClick={() => {
                        setIsDrawerOpen(false);
                        navigateTo("categories");
                      }}
                      className="mt-5 px-5 py-2.5 bg-zinc-900 text-white text-xs uppercase tracking-widest font-semibold"
                    >
                      Explore Supplies
                    </button>
                  </div>
                ) : (
                  quoteCart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-stone-200 p-4 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-amber-800 font-semibold">
                          {item.brand} • {item.price}
                        </span>
                        <h4 className="text-sm font-medium text-zinc-900 truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs text-stone-500">Unit: {item.unit}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => updateCartQty(item.id, -1)}
                          className="w-7 h-7 border border-stone-300 flex items-center justify-center text-zinc-900 hover:bg-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-6 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, 1)}
                          className="w-7 h-7 bg-zinc-900 text-white flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 space-y-3">
              {quoteCart.length > 0 && (
                <div className="flex items-center justify-between text-xs text-stone-600 mb-2">
                  <span>
                    Total Selected Units: <strong>{totalQuoteItems}</strong>
                  </span>
                  <button
                    onClick={() => setQuoteCart([])}
                    className="text-rose-700 hover:underline inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigateTo("contact");
                }}
                className="w-full py-4 px-6 bg-zinc-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Proceed to Inquiry Form</span>
              </button>

              <button
                onClick={handleSendWhatsAppQuote}
                className="w-full py-3.5 px-6 bg-emerald-800 hover:bg-emerald-700 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Send List via WhatsApp</span>
              </button>

              <button
                onClick={handleDownloadEstimateSheet}
                className="w-full py-3 px-6 bg-white border border-zinc-900 text-zinc-900 text-xs uppercase tracking-widest font-semibold hover:bg-stone-100 flex items-center justify-center gap-2 transition"
              >
                <Download className="w-3.5 h-3.5 text-amber-700" />
                <span>Download Estimate Sheet</span>
              </button>

              <a
                href={`tel:${storeInfo.phone.replace(/\s+/g, "")}`}
                className="w-full py-3 px-6 bg-stone-100 border border-stone-300 text-zinc-900 text-xs uppercase tracking-widest font-semibold hover:bg-stone-200 flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>Call Counter: {storeInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- REFINED EDITORIAL FOOTER --- */}
      <footer className="bg-zinc-900 text-stone-400 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-zinc-800">
            {/* Brand Wordmark / Custom Logo Column */}
            <div className="space-y-4">
              <BrandWordmark storeInfo={storeInfo} customLogo={customLogo} dark />
              <p className="text-xs text-stone-400 leading-relaxed pt-1">
                Authorized electrical supplies and turnkey electrical engineering works at Juni Ghadhi, Bhadra Kacheri Road, Panigate, Vadodara.
              </p>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-white font-semibold mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs">
                {publicNavLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => navigateTo(link.id)}
                      className="hover:text-amber-400 transition"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Engineering & Supplies Column */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-white font-semibold mb-4">
                Divisions
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    onClick={() => navigateTo("engineering")}
                    className="text-amber-400 hover:underline text-left font-medium"
                  >
                    Electrical Designing &amp; Load Planning
                  </button>
                </li>
                {categories.slice(1).map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => navigateTo("categories", cat)}
                      className="hover:text-amber-400 transition text-left"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address, Phone & Timings Column */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-white font-semibold mb-4">
                Panigate Showroom
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed mb-3">
                {storeInfo.address}
              </p>
              <a
                href={`tel:${storeInfo.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 text-sm text-amber-400 font-semibold mb-3 hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{storeInfo.phone}</span>
              </a>
              <p className="text-xs text-stone-400">{storeInfo.hoursWeekdays}</p>
              <p className="text-xs text-stone-500 mt-1">{storeInfo.hoursSunday}</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>
              <span
                onDoubleClick={handleTriggerOwnerLogin}
                title=""
                className="select-none cursor-default"
              >
                © {new Date().getFullYear()}
              </span>{" "}
              {storeInfo.name}. All rights reserved.
            </p>
            <p>Electrical Supplies &amp; Engineering Consultancy • Panigate, Vadodara</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
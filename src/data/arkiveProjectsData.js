// Architectural Project Data for Arkive Design Studio

import project1Thumb from '../assets/arkive/project-1-thumb.webp';
import project2Thumb from '../assets/arkive/project-2-thumb.webp';
import project3Thumb from '../assets/arkive/project-3-thumb.webp';
import project4Thumb from '../assets/arkive/project-4-thumb.webp';
import project5Thumb from '../assets/arkive/project-5-thumb.webp';
import prototype1Thumb from '../assets/arkive/prototype-1.webp';
import prototype2Thumb from '../assets/arkive/prototype-2.webp';
import prototype3Thumb from '../assets/arkive/prototype-3.webp';
import prototype4Thumb from '../assets/arkive/prototype-4.webp';
import prototype5Thumb from '../assets/arkive/prototype-5.webp';

export const ALL_PROJECTS = {
  'proj-1': {
    id: 'proj-1',
    categoryId: 'conceptual',
    categoryName: 'Conceptual Design',
    title: 'A Look Into Our Work',
    subtitle: 'Master Planning, Mixed-Use & Elevation Studies',
    tag: 'CONCEPTUAL DESIGN / 05 IMAGES',
    image: project1Thumb,
    lead: 'Different projects. Different challenges. One approach to thoughtful design.',
    desc: 'From master planning and mixed-use developments to retail environments and community-focused spaces, every project begins with understanding how people, place, and purpose come together. A look through some of Arkive Design Studio’s architectural work — exploring ideas at different scales, across different environments.',
    focus: 'Master Planning · Mixed-Use Development · Elevation Studies · Site Planning',
    location: 'United States & Philippines Workflow',
    typology: 'Commercial, Retail & Mixed-Use Master Plan',
    deliverables: 'Revit BIM Models, Schematic Design, Elevation Drawings, 3D Renders',
    signoff: 'Spaces. People. Potential.',
    gallery: [
      { id: '1', title: 'Vina Del Lago Presentation & Elevation', src: project1Thumb },
      { id: '2', title: 'Centerville Market Place Master Plan', src: project1Thumb },
      { id: '3', title: 'Target Store Elevation & Parking Layout', src: project1Thumb },
      { id: '4', title: 'Concord Mixed-Use Redevelopment', src: project1Thumb },
      { id: '5', title: 'Dublin Field Community Master Plan', src: project1Thumb }
    ],
    nextProjectId: 'proj-3'
  },
  'proj-3': {
    id: 'proj-3',
    categoryId: 'conceptual',
    categoryName: 'Conceptual Design',
    title: 'Infinity Edge Pool Residence',
    subtitle: 'Winchester Country Club Residential Concept',
    tag: 'CONCEPTUAL DESIGN / 01 IMAGE',
    image: project3Thumb,
    lead: 'A residential concept shaped by its surroundings and designed around the way people live.',
    desc: 'At Winchester Country Club, the Infinity Edge Pool residence explores the connection between architecture, landscape, and outdoor living — bringing together natural materials, expansive glazing, and a strong relationship with the site. Part of a conceptual series of six homes envisioned for Winchester Country Club.',
    focus: 'Residential Architecture · Landscape Integration · Custom Pools · Materiality',
    location: 'Winchester Country Club, California',
    typology: 'High-End Custom Single Family Residence',
    deliverables: 'Site Planning, Architectural Elevations, Landscape Grading Concept, CAD Drawings',
    signoff: 'Where home meets landscape.',
    gallery: [
      { id: '1', title: 'Infinity Edge Pool Residence Concept Sketch & Elevation', src: project3Thumb }
    ],
    nextProjectId: 'proj-4'
  },
  'proj-4': {
    id: 'proj-4',
    categoryId: 'conceptual',
    categoryName: 'Conceptual Design',
    title: 'Modern Expressions',
    subtitle: 'Greek Modern & Italian Modern Villa Studies',
    tag: 'CONCEPTUAL DESIGN / 02 IMAGES',
    image: project4Thumb,
    lead: 'Good design starts with a strong foundation.',
    desc: 'From thoughtful planning and landscape integration to the details that shape each elevation, every element works together to create a home with its own character. Exploring Greek Modern and Italian Modern design through different forms, materials, and architectural expressions—all grounded in the same design vision.',
    focus: 'Residential Architecture · Form Studies · Facade Engineering · Architectural Language',
    location: 'Mediterranean / International Concepts',
    typology: 'Luxury Residential Estate',
    deliverables: 'Facade Design, Floor Plan Studies, Exterior Material Palette, Landscape Coordination',
    signoff: 'Different expressions. One design vision.',
    gallery: [
      { id: '1', title: 'Estate Master Plan & Exterior Studies', src: project4Thumb },
      { id: '2', title: 'Stone & Stucco Italian Modern Elevation', src: project4Thumb }
    ],
    nextProjectId: 'proj-2'
  },
  'proj-2': {
    id: 'proj-2',
    categoryId: 'cafes',
    categoryName: 'Cafés & Restaurants',
    title: 'A Look Into Our Work',
    subtitle: 'Hospitality Architecture & Dining Spaces',
    tag: 'CAFES & RESTAURANTS / 05 IMAGES',
    image: project2Thumb,
    lead: 'Designed around the experience.',
    desc: 'From the warmth of natural wood to exposed structural elements, lighting, material transitions, and functional planning, every detail contributes to the character of the space. A restaurant environment where architecture, function, and atmosphere come together—creating a place designed not only to serve, but to welcome.',
    focus: 'Hospitality Architecture · Acoustic Comfort · Circulation · Lighting Design',
    location: 'California & Makati Studio Production',
    typology: 'Full-Service Restaurant & Dining Concept',
    deliverables: 'Interior Architecture, Lighting Layout, Furniture Specs, Millwork Detailing',
    signoff: 'Architecture. Working together.',
    gallery: [
      { id: '1', title: 'Restaurant Interior Counter & Seating Layout', src: project2Thumb },
      { id: '2', title: 'Exposed Ductwork & Warm Timber Finishes', src: project2Thumb },
      { id: '3', title: 'Order Counter & Acoustic Ceiling Cloud', src: project2Thumb },
      { id: '4', title: 'Dining Room Lighting & Flow', src: project2Thumb },
      { id: '5', title: 'Commercial Service & POS Circulation', src: project2Thumb }
    ],
    nextProjectId: 'proj-5'
  },
  'proj-5': {
    id: 'proj-5',
    categoryId: 'cafes',
    categoryName: 'Cafés & Restaurants',
    title: 'Hospitality in Focus',
    subtitle: 'A Café, By Design — Planned Down to the Details',
    tag: 'CAFES & RESTAURANTS / 04 IMAGES',
    image: project5Thumb,
    lead: 'Designed for memorable moments.',
    desc: 'A hospitality environment shaped by thoughtful planning, material character, and the way guests move through and experience the space. Thoughtfully planned down to the details: planned for flow, shaped for comfort, and built around the experience.',
    focus: 'Commercial Planning · Barista Workflow · Natural Daylight · Material Palette',
    location: 'Metro Manila & California Partners',
    typology: 'Specialty Coffeehouse & Social Lounge',
    deliverables: 'Espresso Bar Ergonomics, Customer Journey Mapping, Fit-Out Package, Equipment Schedule',
    signoff: 'A café, by design. Coffee break, anyone?',
    gallery: [
      { id: '1', title: 'Main Dining Table & Branding Wall', src: project5Thumb },
      { id: '2', title: 'Counter Workflow & Customer Queue', src: project5Thumb },
      { id: '3', title: 'Window Seating & Natural Daylight', src: project5Thumb },
      { id: '4', title: 'Material Transitions & Planters', src: project5Thumb }
    ],
    nextProjectId: 'proto-1'
  },
  'proto-1': {
    id: 'proto-1',
    categoryId: 'prototype',
    categoryName: 'Prototype',
    title: 'Prototype 01',
    subtitle: 'Corporate Hospitality / Amenity Space',
    tag: 'PROTOTYPE / 05 IMAGES',
    image: prototype1Thumb,
    lead: 'Corporate Hospitality / Amenity Space — Made for Coming Together.',
    desc: 'A contemporary hospitality space designed around connection, comfort, and flexibility. Curved seating creates natural gathering zones while the central café becomes a social anchor, bringing people together within an open environment suited for quick breaks, informal meetings, and longer conversations.',
    focus: 'Space Planning · Hospitality Design · Social Spaces · Interior Experience',
    location: 'Corporate Campus Concept',
    typology: 'Workplace Amenity & Hospitality',
    deliverables: 'Curved Seating Layout, Custom Banquette Millwork, Central Bar Island',
    signoff: 'Made for coming together.',
    gallery: [
      { id: '1', title: 'Corporate Amenity Lounge & Curved Banquettes', src: prototype1Thumb }
    ],
    nextProjectId: 'proto-2'
  },
  'proto-2': {
    id: 'proto-2',
    categoryId: 'prototype',
    categoryName: 'Prototype',
    title: 'Prototype 02',
    subtitle: 'Restaurant Interior & Façade Design',
    tag: 'PROTOTYPE / 03 IMAGES',
    image: prototype2Thumb,
    lead: 'Restaurant Interior & Façade Design — A Space That Welcomes.',
    desc: 'A hospitality prototype balancing a familiar restaurant atmosphere with a clean, contemporary approach. An open storefront establishes a strong connection between inside and out, while warm materials, flexible seating, lighting, and clear circulation create an inviting environment designed around dining and gathering.',
    focus: 'Façade Design · Interior Planning · Materiality · Dining Experience',
    location: 'Urban Retail Boulevard',
    typology: 'Street-Front Restaurant & Bar',
    deliverables: 'Storefront Glazing, Exterior Canopies, Indoor/Outdoor Bar Flow',
    signoff: 'A space that welcomes.',
    gallery: [
      { id: '1', title: 'Storefront Elevation & Dining Perspective', src: prototype2Thumb }
    ],
    nextProjectId: 'proto-3'
  },
  'proto-3': {
    id: 'proto-3',
    categoryId: 'prototype',
    categoryName: 'Prototype',
    title: 'Prototype 03',
    subtitle: 'Mixed-Use Hospitality & Entertainment',
    tag: 'PROTOTYPE / 04 IMAGES',
    image: prototype3Thumb,
    lead: 'Mixed-Use Hospitality & Entertainment — A Collection of Experiences.',
    desc: 'A destination concept bringing dining, entertainment, outdoor gathering, and lounge environments into one connected experience. From open-air structures integrated with the landscape to energetic game areas and intimate interior lounges, each zone develops its own character while remaining part of a cohesive architectural language.',
    focus: 'Architecture · Hospitality · Entertainment · Landscape Integration',
    location: 'Destination Resort & Entertainment District',
    typology: 'Mixed-Use Entertainment Complex',
    deliverables: 'Master Phasing Plan, Pavilions Architecture, Outdoor Deck Coordination',
    signoff: 'A collection of experiences.',
    gallery: [
      { id: '1', title: 'Resort Entertainment Complex Axonometric', src: prototype3Thumb }
    ],
    nextProjectId: 'proto-4'
  },
  'proto-4': {
    id: 'proto-4',
    categoryId: 'prototype',
    categoryName: 'Prototype',
    title: 'Prototype 04',
    subtitle: 'Hospitality Interior Design',
    tag: 'PROTOTYPE / 02 IMAGES',
    image: prototype4Thumb,
    lead: 'Hospitality Interior Design — Designed Around the Dining Experience.',
    desc: 'A restaurant prototype shaped around comfort, movement, and the guest experience. The open layout brings together dining zones, booth seating, service areas, and circulation within a warm and approachable interior, creating a space that feels welcoming while supporting the demands of everyday operations.',
    focus: 'Space Planning · Interior Design · Guest Experience · Circulation',
    location: 'Boutique Hotel Dining',
    typology: 'Fine Dining & Casual Bistro Hybrid',
    deliverables: 'Dining Layout, Wait Station Integration, Custom Lighting Strategy',
    signoff: 'Designed around the dining experience.',
    gallery: [
      { id: '1', title: 'Dining Room Perspective & Custom Booths', src: prototype4Thumb }
    ],
    nextProjectId: 'proto-5'
  },
  'proto-5': {
    id: 'proto-5',
    categoryId: 'prototype',
    categoryName: 'Prototype',
    title: 'Prototype 05',
    subtitle: 'Restaurant & Retail Prototype',
    tag: 'PROTOTYPE / 02 IMAGES',
    image: prototype5Thumb,
    lead: 'Restaurant & Retail Prototype — Function in Every Detail.',
    desc: 'A commercial restaurant concept where front-of-house experience and back-of-house efficiency work as one. The design combines an inviting storefront and dining environment with carefully planned service counters, preparation areas, equipment, storage, and circulation to support a smooth daily workflow.',
    focus: 'Commercial Planning · Kitchen & Service Layout · Interior Design · Workflow',
    location: 'Transit & Lifestyle Center',
    typology: 'Fast-Casual Food & Beverage Prototype',
    deliverables: 'Kitchen Line Layout, Customer Order Path, Front Counter Millwork',
    signoff: 'Function in every detail.',
    gallery: [
      { id: '1', title: 'Front of House Service Counter & Kitchen Interface', src: prototype5Thumb }
    ],
    nextProjectId: 'proj-1'
  }
};

export const CATEGORY_DATA = {
  conceptual: {
    id: 'conceptual',
    eyebrow: 'PROJECT CATEGORY',
    title: 'Conceptual Design',
    description: 'Concept studies, planning, and architectural design explorations.',
    totalCount: '08',
    totalLabel: 'TOTAL PROJECTS',
    hasPrototypeLink: true,
    projects: [
      ALL_PROJECTS['proj-1'],
      ALL_PROJECTS['proj-3'],
      ALL_PROJECTS['proj-4']
    ]
  },
  cafes: {
    id: 'cafes',
    eyebrow: 'PROJECT CATEGORY',
    title: 'Cafés & Restaurants',
    description: 'Hospitality environments shaped around function, atmosphere, and experience.',
    totalCount: '02',
    totalLabel: 'SELECTED PROJECTS',
    hasPrototypeLink: false,
    projects: [
      ALL_PROJECTS['proj-2'],
      ALL_PROJECTS['proj-5']
    ]
  },
  prototype: {
    id: 'prototype',
    eyebrow: 'CONCEPTUAL DESIGN / PROTOTYPE',
    title: 'Prototype',
    description: 'Five prototype studies collected in one place.',
    totalCount: '05',
    totalLabel: 'PROTOTYPE PROJECTS',
    hasPrototypeLink: false,
    projects: [
      ALL_PROJECTS['proto-1'],
      ALL_PROJECTS['proto-2'],
      ALL_PROJECTS['proto-3'],
      ALL_PROJECTS['proto-4'],
      ALL_PROJECTS['proto-5']
    ]
  }
};

export function getProjectById(id) {
  return ALL_PROJECTS[id] || null;
}

export function getCategoryById(id) {
  return CATEGORY_DATA[id] || CATEGORY_DATA.conceptual;
}

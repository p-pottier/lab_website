/**
 * Everything on the site that is written by hand lives here.
 *
 * Publications, citation counts and the collaborator map are fetched from
 * OpenAlex instead and live in public/data (see scripts/fetch-data.mjs).
 * To change a person, a news item or a position, edit this file only.
 */

export const SITE = {
  shortName: "PEACE Lab",
  acronym: "PEACE",
  expansion: "Plasticity and Ecological Adaptations to Changing Environments",
  tagline: "How plasticity and adaptation shape the fate of animals in a warming world.",
  institution: "Department of Biological and Environmental Sciences",
  university: "University of Gothenburg",
  city: "Gothenburg, Sweden",
  email: "patrice.pottier@bioenv.gu.se",
  phone: "+46 70 297 60 11",
  address: [
    "Department of Biological and Environmental Sciences",
    "University of Gothenburg",
    "Medicinaregatan 7B, Natrium",
    "Box 463, SE-405 30 Gothenburg, Sweden",
  ],
};

/* ------------------------------------------------------------------ links */

export type LinkItem = { label: string; href: string; icon: IconName };
export type IconName =
  | "scholar"
  | "orcid"
  | "tea"
  | "github"
  | "researchgate"
  | "bluesky"
  | "mail"
  | "cv";

export const LINKS: LinkItem[] = [
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=gg1rV3IAAAAJ&hl=en",
    icon: "scholar",
  },
  { label: "ORCID", href: "https://orcid.org/0000-0003-2106-6597", icon: "orcid" },
  { label: "Thermal Ecology Alliance", href: "https://www.thermalecologyalliance.org/", icon: "tea" },
  { label: "GitHub", href: "https://github.com/p-pottier", icon: "github" },
  {
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Patrice-Pottier",
    icon: "researchgate",
  },
  { label: "Bluesky", href: "https://bsky.app/profile/patricepottier.bsky.social", icon: "bluesky" },
];

/** Replace with a hosted PDF, or drop the file in public/ as cv.pdf. */
export const CV_URL = "/cv.pdf";

/* -------------------------------------------------------------- research */

export type Theme = {
  id: string;
  emoji: string;
  title: string;
  lead: string;
  questions: string[];
  image: string;
  accent: string;
};

export const THEMES: Theme[] = [
  {
    id: "warming",
    emoji: "🌡️",
    title: "Vulnerability of ectotherms to global warming",
    lead:
      "Most of our work asks how much warming animals can take, and where the answer changes. Ectotherms — most fishes, reptiles, amphibians and invertebrates — tie their physiology directly to environmental temperature, which makes them a sharp lens on climate change.",
    questions: [
      "How do extreme heat events affect different life stages?",
      "What are the consequences of extreme heat for species interactions?",
      "How can we best model heat damage and repair in vulnerability assessments?",
      "How can we integrate plasticity and adaptation into those assessments?",
      "Can past responses to climate change predict the future of biodiversity?",
    ],
    image: "/images/research-warming.jpg",
    accent: "#FA6A03",
  },
  {
    id: "plasticity",
    emoji: "☀️",
    title: "Plasticity and adaptation to changing temperatures",
    lead:
      "Phenotypic plasticity and genetic adaptation are the two routes by which populations track a changing climate. We quantify what each route buys an organism, and where each one runs out.",
    questions: [
      "What explains the variation in plasticity within and across taxa?",
      "To what extent can life-history traits evolve in response to changing environments?",
      "Does plasticity in one trait trade off against plasticity in another?",
      "What are the consequences of early developmental plasticity later in life?",
    ],
    image: "/images/research-plasticity.jpg",
    accent: "#FAD103",
  },
  {
    id: "reproduction",
    emoji: "🥚",
    title: "The impacts of temperature on reproduction",
    lead:
      "Fertility fails at temperatures below those that kill, in many species. Reproduction may therefore set the thermal limit that matters for population persistence, yet we know far less about it than about survival.",
    questions: [
      "Do animals recover reproductive function after an extreme heat event?",
      "Which physiological mechanisms cause reproduction to fail before survival?",
      "What explains sex differences in thermal fertility limits?",
      "What do these limits mean for population fitness under warming?",
    ],
    image: "/images/research-reproduction.jpg",
    accent: "#B80502",
  },
  {
    id: "development",
    emoji: "🐣",
    title: "Developmental responses to environmental stressors",
    lead:
      "Early-life environments leave a long shadow on later phenotypes. Most projections of warming still focus on adults, or ignore the adaptive and non-adaptive processes that run early in life.",
    questions: [
      "What are the consequences of early developmental plasticity for later phenotypes?",
      "How does accounting for developmental plasticity change projected population dynamics?",
      "To what extent do developmental responses to temperature vary across taxa?",
      "Which environmental pressures drive the evolution of developmental plasticity?",
    ],
    image: "/images/research-development.jpg",
    accent: "#02B8A6",
  },
  {
    id: "bias",
    emoji: "🌍",
    title: "Solving biases in the ecological literature",
    lead:
      "Taxonomic and geographic biases run through nearly every ecological dataset. They directly limit what we can claim about global patterns, and therefore what we can say about climate change.",
    questions: [
      "How does ignoring taxonomic and geographic bias change ecological inference?",
      "Can distributed experiments improve taxonomic and geographic coverage?",
      "Can statistical imputation recover what sampling missed?",
      "How much coverage do we gain by synthesising non-English literature?",
    ],
    image: "/images/research-bias.jpg",
    accent: "#02B8A6",
  },
  {
    id: "synthesis",
    emoji: "📚",
    title: "Improving methods for evidence synthesis",
    lead:
      "Publication rates now outpace our capacity to synthesise them. We build methods, software and workflows that keep comparative analysis and meta-analysis tractable.",
    questions: [
      "How can AI tools support evidence synthesis across multiple languages?",
      "Can targeted sampling cut screening effort without compromising inference?",
      "How do we best synthesise and model heterogeneous datasets?",
    ],
    image: "/images/research-synthesis.jpg",
    accent: "#FAD103",
  },
];

/* ---------------------------------------------------------------- people */

export type Person = {
  name: string;
  role: string;
  affiliation?: string;
  photo?: string;
  blurb?: string;
  links?: { label: string; href: string }[];
  years?: string;
  now?: string;
};

export const PI: Person = {
  name: "Patrice Pottier",
  role: "Principal Investigator",
  affiliation: "Department of Biological and Environmental Sciences, University of Gothenburg",
  photo: "/images/patrice-pottier.webp",
  blurb: "",
  links: [
    { label: "Curriculum vitae", href: CV_URL },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=gg1rV3IAAAAJ&hl=en" },
    { label: "ORCID", href: "https://orcid.org/0000-0003-2106-6597" },
    { label: "Email", href: "mailto:patrice.pottier@bioenv.gu.se" },
  ],
};

/** Paragraphs shown under the PI photo on the People page. */
export const PI_BIO: string[] = [
  "I lead the PEACE Lab at the University of Gothenburg, where we ask how plasticity and adaptation shape the vulnerability of animals to a warming climate. My work combines laboratory experiments with evidence synthesis and comparative analysis, across amphibians, reptiles, fishes and invertebrates.",
  "Before Gothenburg I completed a PhD at UNSW Sydney with Shinichi Nakagawa and Szymon Drobniak, followed by postdoctoral positions at the Australian National University with Daniel Noble and at UNSW Sydney with Losia Lagisz and Shinichi Nakagawa. A Wenner-Gren Foundation fellowship then brought me to Sweden to work with Fredrik Jutfelt on heat tolerance across fish life stages.",
  "I also founded and coordinate the Thermal Ecology Alliance, a global network running distributed experiments on thermal tolerance. The Alliance exists because the questions that matter most in thermal ecology are larger than any single laboratory: standardising how data are collected, cutting duplicated effort, and building datasets broad enough to test global patterns.",
  "Beyond the science, I am an advocate for open research and serve on the board of SORTEE, the Society for Open, Reproducible, and Transparent Ecology and Evolutionary Biology. Above all I enjoy arguing about ideas with people who see the problem differently, and I am always glad to start a new collaboration.",
];

export const CURRENT_MEMBERS: Person[] = [
  {
    name: "Leon Pfeufer",
    role: "PhD student",
    affiliation: "University of Gothenburg",
    blurb: "",
    links: [],
  },
];

export const PAST_MEMBERS: Person[] = [
  {
    name: "Joelle Zurcher",
    role: "Former member",
    affiliation: "University of Gothenburg",
    years: "",
    now: "",
    blurb: "",
  },
];

/* --------------------------------------------------------- opportunities */

export type Position = {
  title: string;
  kind: string;
  duration: string;
  location: string;
  deadline: string;
  status: "open" | "closing" | "upcoming" | "closed";
  summary: string;
  details: string[];
  applyUrl?: string;
  image?: string;
};

export const POSITIONS: Position[] = [
  {
    title: "PhD position in global change biology",
    kind: "PhD",
    duration: "4 years, fully funded",
    location: "University of Gothenburg, Sweden",
    deadline: "21 September 2026",
    status: "open",
    summary:
      "How and why does thermal sensitivity vary across the life cycle, and what does that mean for animal populations under climate change?",
    details: [
      "Funded by the Swedish Research Council as part of a programme on the vulnerability of fish life stages to climate change.",
      "The project combines empirical work with evidence synthesis and comparative analysis. Fish are the starting point; comparative work can range more widely, including freshwater and marine invertebrates.",
      "Possible directions include standardised methods for measuring tolerance across life stages, critical windows of sensitivity during development, acclimation capacity within and across generations, the mechanistic drivers of stage differences, and translating laboratory measurements into field-relevant projections.",
      "Supervised by Patrice Pottier and co-supervised by Prof. Fredrik Jutfelt, with weekly supervisory meetings, structured support early in each project, and a gradual transfer of responsibility as independence develops.",
      "Based at Natrium in Gothenburg, with the option of running projects at the Kristineberg marine research station.",
      "Start date is flexible, preferably before the end of 2026.",
    ],
    image: "/images/research-development.jpg",
  },
  {
    title: "Postdoctoral researcher in global change biology",
    kind: "Postdoc",
    duration: "2 years, 100% full time",
    location: "University of Gothenburg, Sweden",
    deadline: "21 September 2026",
    status: "open",
    summary:
      "A two-year, fully funded postdoc on thermal sensitivity across the life cycle, with room to shape the questions and to lead globally distributed experiments.",
    details: [
      "Funded by the Swedish Research Council, within the same programme on fish life stages and climate vulnerability.",
      "The project is deliberately flexible in scope, and the postdoc is encouraged to develop original research questions rather than execute a fixed plan.",
      "Directions include developing standardised methods for comparing vulnerability across life stages, quantifying resilience to co-occurring stressors, testing whether heat tolerance evolves independently across stages, building models that translate laboratory measurements into field projections, and synthesising published evidence.",
      "The role carries leadership opportunities through the Thermal Ecology Alliance, including managing globally distributed experiments, along with the chance to co-supervise MSc and PhD students.",
      "Open to researchers who completed a doctoral degree no more than three years before the closing date, with the usual allowances for leave.",
      "Start date preferably before March 2027, with flexibility for notice periods and residence permits.",
    ],
    image: "/images/research-warming.jpg",
  },
];

/** Traits drawn from the two Gothenburg advertisements. */
export const WHO_WE_LOOK_FOR = {
  lead:
    "We care more about how you think than about what you have already published. Every qualification is assessed relative to opportunity: access to projects, laboratory time, programming, mobility and publication varies enormously between institutions, countries and personal circumstances, and the assessment weighs ideas and potential rather than counts and prestige.",
  traits: [
    {
      title: "Curious and self-directed",
      body: "You follow questions because they interest you, organise your own work, and are willing to build the independence the role asks for.",
    },
    {
      title: "A critical thinker",
      body: "You think carefully about the state of the evidence, enjoy problem solving, and are willing to explore concepts outside your immediate field.",
    },
    {
      title: "Eager to learn new methods",
      body: "You want to develop quantitative skills, in R or a comparable environment, and to work reproducibly whether or not you arrive already fluent.",
    },
    {
      title: "Motivated by the problem",
      body: "You are engaged and enthusiastic about understanding, forecasting and mitigating the impacts of climate change on biodiversity.",
    },
    {
      title: "A good collaborator",
      body: "You give and receive constructive feedback well, and work respectfully with people from different disciplinary, cultural and personal backgrounds.",
    },
    {
      title: "Committed to open science",
      body: "You value scientific integrity, fairness and transparency, and want your work to be reusable by others.",
    },
  ],
  closing:
    "We value diversity and are committed to an inclusive research environment. We welcome applications from people of all backgrounds and identities, including people from diverse cultural and linguistic backgrounds, people with disabilities, neurodivergent people, and people of all genders, sexual orientations and ages.",
};

/* ----------------------------------------------------------- fellowships */

export type Fellowship = {
  name: string;
  funder: string;
  scope: "Sweden" | "Europe" | "Global";
  who: string;
  when: string;
  url: string;
};

/**
 * Schemes that could bring a postdoc or early-career researcher to the group.
 * Deadlines move each year, so the `when` field gives the usual window rather
 * than a fixed date. Check the funder's page before planning around it.
 */
export const FELLOWSHIPS: Fellowship[] = [
  {
    name: "Marie Skłodowska-Curie Postdoctoral Fellowship",
    funder: "European Commission, Horizon Europe",
    scope: "Europe",
    who: "PhD holders moving to a new country; 2-year European fellowships",
    when: "Deadline usually September",
    url: "https://marie-sklodowska-curie-actions.ec.europa.eu/actions/postdoctoral-fellowships",
  },
  {
    name: "International Postdoc Grant",
    funder: "Swedish Research Council (Vetenskapsrådet)",
    scope: "Sweden",
    who: "Researchers with a Swedish PhD spending time abroad, and returnees",
    when: "Call usually opens in the new year",
    url: "https://www.vr.se/english/applying-for-funding.html",
  },
  {
    name: "Wenner-Gren Foundations Fellowships",
    funder: "Wenner-Gren Foundations",
    scope: "Sweden",
    who: "Postdoctoral researchers moving to or from Sweden",
    when: "Two calls per year, typically spring and autumn",
    url: "https://www.swgc.org/",
  },
  {
    name: "FORMAS Mobility Starting Grant",
    funder: "FORMAS",
    scope: "Sweden",
    who: "Early-career researchers in environment and sustainability",
    when: "Deadline usually early in the year",
    url: "https://formas.se/en/start-page.html",
  },
  {
    name: "Carl Tryggers Foundation Postdoctoral Fellowship",
    funder: "Stiftelsen Carl Tryggers",
    scope: "Sweden",
    who: "Postdocs in the natural sciences at Swedish universities",
    when: "Annual call, usually autumn",
    url: "https://www.carltryggersstiftelse.se/",
  },
  {
    name: "EMBO Postdoctoral Fellowships",
    funder: "EMBO",
    scope: "Europe",
    who: "Life scientists moving between countries; 2 years",
    when: "Two deadlines per year",
    url: "https://www.embo.org/funding/fellowships-grants-and-career-support/postdoctoral-fellowships/",
  },
  {
    name: "HFSP Postdoctoral Fellowships",
    funder: "Human Frontier Science Program",
    scope: "Global",
    who: "Interdisciplinary projects in the life sciences; 3 years",
    when: "Registration usually May, submission August",
    url: "https://www.hfsp.org/funding/hfsp-funding/postdoctoral-fellowships",
  },
  {
    name: "Marie Skłodowska-Curie Global Fellowship",
    funder: "European Commission, Horizon Europe",
    scope: "Global",
    who: "Outgoing phase outside Europe followed by a return year",
    when: "Deadline usually September",
    url: "https://marie-sklodowska-curie-actions.ec.europa.eu/actions/postdoctoral-fellowships",
  },
  {
    name: "Branco Weiss Fellowship — Society in Science",
    funder: "ETH Zürich",
    scope: "Global",
    who: "Early postdocs with an unconventional, socially relevant project; up to 5 years",
    when: "Deadline usually January",
    url: "https://brancoweissfellowship.org/",
  },
];

/* ------------------------------------------------------------------ news */

export type NewsItem = {
  date: string; // ISO date, drives ordering
  tag: "Paper" | "Position" | "Talk" | "Award" | "Media" | "Lab" | "Network";
  title: string;
  body: string;
  href?: string;
  image?: string;
};

/**
 * Newest first. Add an entry by copying a block; the date drives the ordering
 * and the tag drives the colour of the chip.
 */
export const NEWS: NewsItem[] = [
  {
    date: "2026-08-01",
    tag: "Position",
    title: "Two positions open: one PhD and one postdoc",
    body:
      "We are recruiting a PhD student and a two-year postdoctoral researcher to work on thermal sensitivity across the life cycle, both funded by the Swedish Research Council. Applications close on 21 September 2026.",
    href: "/opportunities",
    image: "/images/moth-gold.jpg",
  },
  {
    date: "2026-06-01",
    tag: "Lab",
    title: "The PEACE Lab starts at the University of Gothenburg",
    body:
      "The group opens at the Department of Biological and Environmental Sciences, working on plasticity and ecological adaptation to changing environments.",
    image: "/images/hero-leaf-insect.jpg",
  },
  {
    date: "2026-03-01",
    tag: "Network",
    title: "Thermal Ecology Alliance distributed experiment underway",
    body:
      "Research groups across six continents are collecting standardised data on fish embryonic heat tolerance, building a dataset no single laboratory could assemble alone.",
    href: "https://www.thermalecologyalliance.org/",
    image: "/images/research-development.jpg",
  },
];

/* -------------------------------------------------------------- outreach */

export type OutreachItem = {
  title: string;
  role: string;
  body: string;
  href?: string;
  accent: string;
};

export const OUTREACH: OutreachItem[] = [
  {
    title: "Thermal Ecology Alliance",
    role: "Founder and coordinator",
    body:
      "A global network of thermal ecologists running coordinated, distributed experiments. The Alliance standardises how thermal tolerance data are collected, cuts duplicated effort, and assembles datasets broad enough to test global patterns. It also functions as a community of practice, open to anyone working on how temperature shapes life.",
    href: "https://www.thermalecologyalliance.org/",
    accent: "#FAD103",
  },
  {
    title: "SORTEE",
    role: "Board member",
    body:
      "The Society for Open, Reproducible, and Transparent Ecology and Evolutionary Biology works to change research practice in our field, from code sharing to reporting standards. I serve on its board and contribute to its conferences and working groups.",
    href: "https://www.sortee.org/",
    accent: "#02B8A6",
  },
  {
    title: "Open and reproducible research",
    role: "Practice",
    body:
      "Data, code and protocols from the group are released openly. We build R packages and workflows so that the analyses behind our conclusions can be rerun, checked and reused by anyone who wants to.",
    href: "https://github.com/p-pottier",
    accent: "#FA6A03",
  },
  {
    title: "Peer review and editorial work",
    role: "Service",
    body:
      "Reviewing for journals and funding bodies across ecology, evolution and conservation physiology, with a particular interest in raising the standard of evidence synthesis in the field.",
    accent: "#B80502",
  },
];

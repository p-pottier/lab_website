/**
 * Everything on the site that is written by hand lives here.
 *
 * Publications and the collaborator map are fetched from ORCID, Crossref and
 * OpenAlex instead, and live in public/data (see scripts/fetch-data.mjs).
 * To change a person, a news item or a position, edit this file only.
 */

export const SITE = {
  shortName: "PEACE Lab",
  acronym: "PEACE",
  expansion: "Plasticity and Ecological Adaptations to Changing Environments",
  tagline: "How animals cope with rapidly changing environments, and how well they will cope next.",
  institution: "Department of Biological and Environmental Sciences",
  university: "University of Gothenburg",
  city: "Gothenburg, Sweden",
  email: "patrice.pottier@bioenv.gu.se",
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

/** Drop the file in public/ as cv.pdf, or point this at a hosted copy. */
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
    id: "life-stages",
    emoji: "🐣",
    title: "Thermal sensitivity across the life cycle",
    lead:
      "Embryos, larvae and adults do not share a thermal limit, yet most projections of warming are built on adults alone. We develop methods that put every stage on the same axis, then use them to find the stage that fails first. That stage, not the average, sets the fate of the population.",
    questions: [
      "How does thermal sensitivity vary across the life cycle, and why?",
      "When are the critical windows of sensitivity during development?",
      "Is the evolution of heat tolerance decoupled across life stages?",
      "What drives the mechanistic differences in heat tolerance between stages?",
      "How does life-stage variation change projections of survival and redistribution?",
    ],
    image: "/images/research-development.jpg",
    accent: "#FA6A03",
  },
  {
    id: "plasticity",
    emoji: "☀️",
    title: "Plasticity and adaptation to changing temperatures",
    lead:
      "Plasticity and genetic adaptation are the two routes by which populations track a changing climate. Both are routinely invoked as reasons for optimism. We quantify what each route actually buys an organism, and where it runs out.",
    questions: [
      "What explains the variation in plasticity within and across taxa?",
      "To what extent can life-history traits evolve in response to changing environments?",
      "Does plasticity in one trait trade off against plasticity in another?",
      "How much of the projected impact of warming does plasticity offset?",
    ],
    image: "/images/research-plasticity.jpg",
    accent: "#FAD103",
  },
  {
    id: "reproduction",
    emoji: "🔥",
    title: "The impacts of temperature on reproduction",
    lead:
      "Fertility fails at temperatures well below those that kill. Reproduction may therefore set the thermal limit that decides whether a population persists, yet we know far less about it than about survival.",
    questions: [
      "Do animals recover reproductive function after an extreme heat event?",
      "Which physiological mechanisms cause reproduction to fail before survival?",
      "What explains sex differences in thermal fertility limits?",
      "What do these limits mean for population growth under warming?",
    ],
    image: "/images/research-reproduction.jpg",
    accent: "#B80502",
  },
  {
    id: "development",
    emoji: "🥚",
    title: "Developmental responses to environmental stressors",
    lead:
      "Early environments leave a long shadow on later phenotypes. Heat rarely arrives alone, however, and an embryo that survives a heatwave may still carry the cost into adulthood. We track those costs forward, and test whether they compound when stressors co-occur.",
    questions: [
      "What are the consequences of early developmental plasticity for later phenotypes?",
      "How does accounting for developmental plasticity change projected population dynamics?",
      "How resilient are early life stages to co-occurring environmental stressors?",
      "Which environmental pressures drive the evolution of developmental plasticity?",
    ],
    image: "/images/frog-moss.jpg",
    accent: "#02B8A6",
  },
  {
    id: "bias",
    emoji: "🌍",
    title: "Solving biases in the ecological literature",
    lead:
      "Taxonomic and geographic biases run through nearly every ecological dataset. They limit what we can honestly claim about global patterns, and therefore what we can say about climate change. We measure those biases, then build ways around them.",
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
      "Publication rates now outpace our capacity to synthesise them. We build the methods, software and workflows that keep meta-analysis and comparative analysis tractable as the literature grows.",
    questions: [
      "How can AI tools support evidence synthesis across multiple languages?",
      "Can targeted sampling cut screening effort without compromising inference?",
      "How do we best synthesise and model heterogeneous datasets?",
      "How do we make synthesised evidence reusable rather than single-use?",
    ],
    image: "/images/research-synthesis.jpg",
    accent: "#FAD103",
  },
  {
    id: "meta-science",
    emoji: "🔬",
    title: "Meta-science: studying how research gets done",
    lead:
      "The way we do research shapes what we find. We study the practices of our own field, from reporting standards to analytical variation between researchers, and we test which interventions make the evidence more robust.",
    questions: [
      "How much do results depend on who analyses the data?",
      "Which reporting practices make a study reusable by someone else?",
      "What keeps researchers from sharing data and code, and what would change that?",
      "How do language and access policies shape whose science gets read?",
    ],
    image: "/images/wordcloud.png",
    accent: "#B55EA8",
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
  links: [
    { label: "Curriculum vitae", href: CV_URL },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=gg1rV3IAAAAJ&hl=en" },
    { label: "ORCID", href: "https://orcid.org/0000-0003-2106-6597" },
    { label: "Email", href: "mailto:patrice.pottier@bioenv.gu.se" },
  ],
};

/** Paragraphs shown beside the PI photo on the People page. */
export const PI_BIO: string[] = [
  "I lead the PEACE Lab at the University of Gothenburg. My work asks how animals cope with environments that are changing faster than anything in their evolutionary history, and how far that capacity to cope will stretch. I combine laboratory experiments with evidence synthesis and comparative analysis, across amphibians, reptiles, fishes and invertebrates.",
  "I did my PhD at UNSW Sydney with Shinichi Nakagawa and Szymon Drobniak, then held postdoctoral positions at the Australian National University with Daniel Noble and at UNSW Sydney with Losia Lagisz and Shinichi Nakagawa. A Wenner-Gren Foundation fellowship brought me to Sweden to work with Fredrik Jutfelt on heat tolerance across fish life stages.",
  "I also founded and coordinate the Thermal Ecology Alliance, a global network that runs coordinated experiments on thermal tolerance. The Alliance exists because the questions that matter most in this field are bigger than any single laboratory. Standardising how data are collected, cutting duplicated effort and pooling results lets us test patterns that no group could test alone.",
  "Curiosity has guided most of what I work on, and it has taken me some way from where I started. I care about open and inclusive research, and I enjoy arguing about ideas with people who see the problem differently. I am always glad to start a new collaboration.",
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

/**
 * People we work with most closely. The map above this section is generated
 * from every co-authored paper; this list is for the handful worth naming.
 * Add a `photo` path (put the file in public/images/) to show a portrait.
 */
export type Collaborator = {
  name: string;
  role?: string;
  affiliation: string;
  photo?: string;
  href?: string;
  blurb?: string;
};

export const MAIN_COLLABORATORS: Collaborator[] = [
  // Example of the shape; replace with the people you want highlighted.
  // {
  //   name: "Name Surname",
  //   role: "Professor",
  //   affiliation: "University",
  //   photo: "/images/collaborator-name.jpg",
  //   href: "https://example.org",
  //   blurb: "One line on what we work on together.",
  // },
];

/* -------------------------------------------------------- publications -- */

/**
 * DOIs of the papers pinned to the top of the Publications page. Order here is
 * the order shown. Everything else comes from the generated data file.
 */
export const HIGHLIGHTED_DOIS: string[] = [
  "10.1038/s41586-025-08665-0", // Vulnerability of amphibians to global warming, Nature
  "10.1111/ele.14083", // Developmental plasticity in thermal tolerance, Ecology Letters
  "10.1093/conphys/coag006", // Embryos are largely understudied, Conservation Physiology
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
      "The Swedish Research Council funds this project, as part of a programme on the vulnerability of fish life stages to climate change.",
      "The work combines experiments with evidence synthesis and comparative analysis. Fish are the starting point, but comparative questions can range wider, including freshwater and marine invertebrates.",
      "Possible directions include standardising how tolerance is measured across stages, finding the critical windows of sensitivity during development, quantifying acclimation within and across generations, and translating laboratory measurements into field-relevant projections.",
      "I supervise the project, with Prof. Fredrik Jutfelt as co-supervisor. Expect at least one supervisory meeting per week, close support early in each project, and responsibility handed over as your independence grows.",
      "The position is based at Natrium in Gothenburg, with the option of running projects at the Kristineberg marine research station.",
      "The start date is flexible, preferably before the end of 2026.",
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
      "Two years to work on thermal sensitivity across the life cycle, with room to shape the questions and to lead globally distributed experiments.",
    details: [
      "The Swedish Research Council funds this position, within the same programme on fish life stages and climate vulnerability.",
      "The scope is deliberately open. I would rather you develop original questions than execute a plan I wrote.",
      "Directions include comparing vulnerability across life stages, testing resilience to co-occurring stressors, asking whether heat tolerance evolves independently across stages, building models that translate laboratory data into field projections, and synthesising published evidence.",
      "The role carries leadership opportunities through the Thermal Ecology Alliance, including running globally distributed experiments, and the chance to co-supervise MSc and PhD students.",
      "Applicants should have completed a doctoral degree no more than three years before the closing date, with the usual allowances for parental leave, illness and similar circumstances.",
      "The start date is preferably before March 2027, with flexibility for notice periods and residence permits.",
    ],
    image: "/images/research-warming.jpg",
  },
];

/** Traits drawn from the two Gothenburg advertisements. */
export const WHO_WE_LOOK_FOR = {
  lead:
    "How you think matters more here than what you have already published. We assess every qualification relative to opportunity, because access to projects, laboratory time, programming, travel and publication varies enormously between institutions, countries and personal circumstances. What we weigh is your ideas and your potential, not your publication count or the linearity of your path.",
  traits: [
    {
      title: "Curious and self-directed",
      body: "You follow questions because they interest you, you organise your own work, and you want to build the independence the role asks for.",
    },
    {
      title: "A critical thinker",
      body: "You think carefully about the state of the evidence, you enjoy solving problems, and you are willing to read outside your field.",
    },
    {
      title: "Eager to learn new methods",
      body: "You want to develop quantitative skills, in R or something comparable, and to work reproducibly. Arriving fluent is not a requirement.",
    },
    {
      title: "Motivated by the problem",
      body: "You care about understanding, forecasting and mitigating the impacts of climate change on biodiversity.",
    },
    {
      title: "A good collaborator",
      body: "You give and take constructive feedback well, and you work respectfully with people from different disciplinary, cultural and personal backgrounds.",
    },
    {
      title: "Committed to open science",
      body: "You value integrity, fairness and transparency, and you want your work to be reusable by people you will never meet.",
    },
  ],
  closing:
    "We value diversity and we are committed to an inclusive research environment. We welcome applications from people of all backgrounds and identities, including people from diverse cultural and linguistic backgrounds, people with disabilities, neurodivergent people, and people of all genders, sexual orientations and ages.",
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
 * Deadlines move each year, so `when` gives the usual window rather than a
 * fixed date. Check the funder's page before planning around it.
 */
export const FELLOWSHIPS: Fellowship[] = [
  {
    name: "Marie Skłodowska-Curie Postdoctoral Fellowship",
    funder: "European Commission, Horizon Europe",
    scope: "Europe",
    who: "PhD holders moving to a new country; two-year European fellowships",
    when: "Deadline usually September",
    url: "https://marie-sklodowska-curie-actions.ec.europa.eu/actions/postdoctoral-fellowships",
  },
  {
    name: "AXA Research Fund Postdoctoral Fellowship",
    funder: "AXA Research Fund",
    scope: "Global",
    who: "Postdocs working on climate and environmental risk; hosted through the university",
    when: "Institutional nomination, usually early in the year",
    url: "https://www.axa-research.org/en/page/AXA-Fellowships",
  },
  {
    name: "Schmidt Science Fellows",
    funder: "Schmidt Sciences",
    scope: "Global",
    who: "Recent PhDs making a deliberate disciplinary pivot; one to two years",
    when: "University nomination, usually mid-year",
    url: "https://schmidtsciencefellows.org/",
  },
  {
    name: "Vetenskapsrådet project and starting grants",
    funder: "Swedish Research Council",
    scope: "Sweden",
    who: "Researchers building an independent programme in natural and engineering sciences",
    when: "Main call usually opens in the new year",
    url: "https://www.vr.se/english/applying-for-funding.html",
  },
  {
    name: "Vetenskapsrådet International Postdoc Grant",
    funder: "Swedish Research Council",
    scope: "Sweden",
    who: "Researchers with a Swedish PhD spending time abroad, and those returning",
    when: "Call usually opens in the new year",
    url: "https://www.vr.se/english/applying-for-funding.html",
  },
  {
    name: "FORMAS mobility and early-career grants",
    funder: "FORMAS",
    scope: "Sweden",
    who: "Early-career researchers in environment, agriculture and sustainability",
    when: "Annual open call, deadline usually early in the year",
    url: "https://formas.se/en/start-page.html",
  },
  {
    name: "Wenner-Gren Foundations Fellowships",
    funder: "Wenner-Gren Foundations",
    scope: "Sweden",
    who: "Postdoctoral researchers moving to or from Sweden",
    when: "Two calls per year, usually spring and autumn",
    url: "https://www.swgc.org/",
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
    who: "Life scientists moving between countries; two years",
    when: "Two deadlines per year",
    url: "https://www.embo.org/funding/fellowships-grants-and-career-support/postdoctoral-fellowships/",
  },
  {
    name: "HFSP Postdoctoral Fellowships",
    funder: "Human Frontier Science Program",
    scope: "Global",
    who: "Interdisciplinary projects in the life sciences; three years",
    when: "Registration usually May, submission August",
    url: "https://www.hfsp.org/funding/hfsp-funding/postdoctoral-fellowships",
  },
  {
    name: "Marie Skłodowska-Curie Global Fellowship",
    funder: "European Commission, Horizon Europe",
    scope: "Global",
    who: "An outgoing phase outside Europe followed by a return year",
    when: "Deadline usually September",
    url: "https://marie-sklodowska-curie-actions.ec.europa.eu/actions/postdoctoral-fellowships",
  },
  {
    name: "Branco Weiss Fellowship, Society in Science",
    funder: "ETH Zürich",
    scope: "Global",
    who: "Early postdocs with an unconventional, socially relevant project; up to five years",
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
      "We are recruiting a PhD student and a two-year postdoctoral researcher to work on thermal sensitivity across the life cycle. The Swedish Research Council funds both. Applications close on 21 September 2026.",
    href: "/opportunities",
    image: "/images/moth-gold.jpg",
  },
  {
    date: "2026-06-01",
    tag: "Lab",
    title: "The PEACE Lab starts at the University of Gothenburg",
    body:
      "The group opens at the Department of Biological and Environmental Sciences, working on how animals respond to rapidly changing environments.",
    image: "/images/hero-leaf-insect.jpg",
  },
  {
    date: "2026-03-01",
    tag: "Network",
    title: "Thermal Ecology Alliance distributed experiment underway",
    body:
      "Research groups across six continents are collecting standardised data on fish embryonic heat tolerance. No single laboratory could assemble a dataset of this breadth alone.",
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
      "A global network of thermal ecologists running coordinated, distributed experiments. The Alliance standardises how thermal tolerance data are collected, cuts duplicated effort, and assembles datasets broad enough to test global patterns. It is also a community of practice, open to anyone working on how temperature shapes life.",
    href: "https://www.thermalecologyalliance.org/",
    accent: "#FAD103",
  },
  {
    title: "Open and reproducible research",
    role: "Advocacy and practice",
    body:
      "We release the data, code and protocols behind our papers, and we build R packages and workflows so that others can rerun, check and reuse the analyses. Much of this work runs through SORTEE, the Society for Open, Reproducible, and Transparent Ecology and Evolutionary Biology, where I served on the board and remain active.",
    href: "https://www.sortee.org/",
    accent: "#02B8A6",
  },
  {
    title: "Writing for the public",
    role: "Science communication",
    body:
      "Research that stays inside journals rarely changes anything. I write for general audiences, mostly in The Conversation, and speak to schools, community groups and the press about what climate change is doing to animals.",
    accent: "#FA6A03",
  },
  {
    title: "Peer review and editorial work",
    role: "Service",
    body:
      "I review for journals and funding bodies across ecology, evolution and conservation physiology. My particular interest is raising the standard of evidence synthesis, which is still uneven across our field.",
    accent: "#B80502",
  },
];

/** Pieces written for general audiences. */
export type MediaItem = { title: string; outlet: string; year: number; href: string };

export const MEDIA: MediaItem[] = [
  {
    title: "Hot frogs and sizzling salamanders: climate change is pushing amphibians to their limits",
    outlet: "The Conversation",
    year: 2025,
    href: "https://doi.org/10.64628/aa.hdtmdn6ed",
  },
  {
    title: "Young cold-blooded animals are suffering the most as Earth heats up",
    outlet: "The Conversation",
    year: 2022,
    href: "https://doi.org/10.64628/aa.mxhyh4jfh",
  },
];

/** Conference posters. Thumbnails and PDFs live in public/posters. */
export type Poster = {
  title: string;
  event: string;
  year: number;
  image?: string;
  pdf: string;
  note?: string;
};

export const POSTERS: Poster[] = [
  {
    title:
      "Developmental plasticity in thermal tolerance: ontogenetic variation, persistence, and future directions",
    event: "ESEB Congress",
    year: 2022,
    image: "/posters/poster-eseb2022.jpg",
    pdf: "/posters/poster-eseb2022.pdf",
    note: "Published in Ecology Letters.",
  },
  {
    title: "Climate vulnerability of the world's amphibians: finding the missing pieces of an ecological puzzle",
    event: "SEB Annual Conference",
    year: 2021,
    image: "/posters/poster-seb2021.jpg",
    pdf: "/posters/poster-seb2021.pdf",
    note: "An updated version followed at SEB 2022. Published in Nature.",
  },
];

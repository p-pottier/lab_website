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
      "Embryos, larvae, juveniles and adults vary in their ability to cope with environmental stress. However, predictive models of climate change impacts often ignore the sensitivity of early-life stages. We develop new methods and assess the sensitivity of different life stages to identify critical windows of vulnerability to climate change across various species.",
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
      "Phenotypic plasticity and genetic adaptation are the two main routes through which animals can keep pace with a changing climate. However, we still know little about how much these mechanisms can buffer the impacts of climate change, and what limits them. We quantify the benefits and limits of plasticity and adaptation across species, traits and environments.",
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
      "Fertility often fails at temperatures well below those that kill. Reproduction may therefore set the thermal limit that decides whether a population persists. However, reproduction remains far less studied than survival. We quantify how extreme heat affects reproductive function, identify the mechanisms responsible, and assess what these limits mean for population growth under warming.",
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
      "Early-life environments can have strong and long-lasting effects on later phenotypes. However, heat rarely arrives alone, and embryos that survive a heatwave may still carry the costs into adulthood. We track these carry-over effects through the life cycle, and test whether they compound when stressors co-occur.",
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
      "Taxonomic and geographical biases are ubiquitous in ecological datasets. These biases directly limit our ability to establish global patterns, and therefore what we can claim about climate change. We quantify these biases, assess how they influence ecological inference, and develop approaches to overcome them.",
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
      "Publication rates are increasing exponentially, which challenges our ability to synthesise comprehensive datasets for comparative analyses and meta-analyses. We develop methods, software and workflows to keep evidence synthesis tractable, and to ensure that synthesised evidence can be reused rather than rebuilt each time.",
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
      "The way we do research shapes what we find. We study the practices of our own field, from reporting standards to the variation introduced by analytical choices, and test which interventions make evidence more robust, transparent and reusable.",
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
  // The CV sits on its own button below the biography, so it is not repeated here.
  links: [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=gg1rV3IAAAAJ&hl=en" },
    { label: "ORCID", href: "https://orcid.org/0000-0003-2106-6597" },
    { label: "Email", href: "mailto:patrice.pottier@bioenv.gu.se" },
  ],
};

/** Paragraphs shown beside the PI photo on the People page. */
export const PI_BIO: string[] = [
  "I am originally from France, where I did my BSc (2014-2017) and MSc (2017-2019) at the University of Tours. After a short research visit at the University of Alabama in the US (2018-2019), I started my PhD at the University of New South Wales in Australia (2020-2024). After a brief postdoc period split between UNSW and the Australian National University (2024-2025), I moved to the University of Gothenburg in Sweden (2025-current) with a Wenner-Gren postdoctoral fellowship. I recently received a strategic recruitment grant from the Swedish Research Council to start the PEACE lab. I have been extremely grateful to have been mentored by some of the kindest and most generous supervisors over the years. I would not be here without the support and care of Marlene Goubault (MSc supervisor), Ryan Earley (MSc supervisor), Shinichi Nakagawa (PhD supervisor), Szymon Drobniak (PhD supervisor), Daniel Noble (postdoc supervisor) and Fredrik Jutfelt (postdoc supervisor).",
  "My research interests have always been broad, and I have always let myself be guided by my curiosity. I have taken a keen interest in improving our ability to quantify the impacts of climate change on biodiversity, because I care deeply about protecting our precious natural world. I have become fascinated by what drives variation in the ability of different species to cope with extreme heat, and how species differ in their capacity to respond to environmental change through plasticity and adaptation. Recently, I have also been interested in quantifying how resilience varies within species, with a particular focus on how different life stages vary in their capacity to tolerate acute and chronic warming, and the importance of such variation for species resilience. I enjoy learning new methods and working across scales, from laboratory experiments to comparative analyses, and across a broad range of taxa. Above all, I love discussing ideas and collaborating with other scientists. I believe we need to unite forces and listen to a diversity of perspectives if we want to make important new discoveries and tackle pressing ecological challenges such as climate change. This is the primary reason I founded the Thermal Ecology Alliance, a platform to facilitate more inclusive collaborations and discussions in the field, and I am beyond excited about what comes next.",
  "I am also passionate about interdisciplinary research, and enjoy working on projects that help us promote more robust, open and inclusive research. This has led me to become an advocate for Open Science and a former board member of The Society for Open, Reproducible, and Transparent Ecology and Evolutionary Biology (SORTEE).",
  "Outside of academia, I love spending time surrounded by nature, discovering new cultures, and trying all the cuisines the world has to offer.",
];

export const CURRENT_MEMBERS: Person[] = [
  {
    name: "Leon Pfeufer",
    role: "PhD student",
    affiliation: "University of Gothenburg",
    photo: "/images/leon-pfeufer.jpg",
    blurb:
      "Leon is studying the physiological mechanisms that set heat tolerance limits, and how fish adapt to changing environments across generations. He has studied which organs fail first under gradual warming, is currently conducting a meta-analysis of the evidence on oxygen- and capacity-limited thermal tolerance (OCLTT), and will soon investigate physiological changes in evolved lines of zebrafish selected for increased growth. Co-supervised with Fredrik Jutfelt.",
    links: [],
  },
  {
    name: "Xinyi Liu",
    role: "PhD student",
    affiliation: "Australian National University",
    photo: "/images/xinyi-liu.jpg",
    blurb:
      "Xinyi is studying the impacts of microplastics on freshwater and marine organisms. She is conducting a meta-analysis of the impacts of freshwater microplastics on life-history traits, and will soon run experiments with interacting environmental stressors. Co-supervised with Daniel Noble.",
    links: [],
  },
];

export const PAST_MEMBERS: Person[] = [
  {
    name: "Joelle Zurcher",
    role: "Former member",
    affiliation: "University of Gothenburg",
    photo: "/images/joelle-zurcher.jpg",
    years: "",
    now: "",
    blurb:
      "Joelle did her MSc in the PEACE lab, where she studied how thermal tolerance varies across embryonic stages of zebrafish. She identified critical windows of sensitivity to extreme heat, and is currently preparing a manuscript for publication.",
  },
];

/**
 * People we work with most closely. The map above this section is generated
 * from every co-authored paper; this list is for the handful worth naming.
 * Add a `photo` path (put the file in public/images/) to show a portrait.
 */
export type Collaborator = {
  name: string;
  affiliation: string;
  orcid?: string;
  /** Optional portrait. Drop the file in public/images/ and point here. */
  photo?: string;
  /** Personal or laboratory page, used in preference to the ORCID link. */
  href?: string;
  blurb?: string;
};

/**
 * Affiliations follow OpenAlex's last-known institution rather than the one on
 * a joint paper, so they track a move. Run `node scripts/collaborator-info.mjs`
 * to re-check them, and to look for portraits on each person's linked pages.
 */
export const MAIN_COLLABORATORS: Collaborator[] = [
  {
    name: "Shinichi Nakagawa",
    affiliation: "University of Alberta",
    orcid: "https://orcid.org/0000-0002-7765-5182",
    href: "http://www.i-deel.org/",
  },
  {
    name: "Szymon M. Drobniak",
    affiliation: "Jagiellonian University",
    orcid: "https://orcid.org/0000-0001-8101-6247",
    photo: "/images/collaborators/szymon-m-drobniak.jpg",
  },
  {
    name: "Malgorzata Lagisz",
    affiliation: "University of Alberta",
    orcid: "https://orcid.org/0000-0002-3993-6127",
    href: "http://mlagisz.weebly.com/",
  },
  {
    name: "Daniel W. A. Noble",
    affiliation: "Australian National University",
    orcid: "https://orcid.org/0000-0001-9460-8743",
    href: "https://sites.google.com/view/noblelab/home",
  },
  {
    name: "Fredrik Jutfelt",
    affiliation: "University of Gothenburg",
    orcid: "https://orcid.org/0000-0001-9838-3991",
    photo: "/images/collaborators/fredrik-jutfelt.jpg",
  },
  {
    name: "Nicholas C. Wu",
    affiliation: "Murdoch University",
    orcid: "https://orcid.org/0000-0002-7130-1279",
    href: "https://www.nicholaswulab.com/",
    photo: "/images/collaborators/nicholas-c-wu.jpg",
  },
  {
    name: "Lisa E. Schwanz",
    affiliation: "UNSW Sydney",
    orcid: "https://orcid.org/0000-0001-5864-7112",
  },
  {
    name: "Michael Kearney",
    affiliation: "University of Melbourne",
    orcid: "https://orcid.org/0000-0002-3349-8744",
  },
  {
    name: "Frank Seebacher",
    affiliation: "University of Sydney",
    orcid: "https://orcid.org/0000-0002-2281-9311",
  },
  {
    name: "Katharina Ruthsatz",
    affiliation: "Doñana Biological Station",
    orcid: "https://orcid.org/0000-0002-3273-2826",
  },
  {
    name: "Tatsuya Amano",
    affiliation: "University of Queensland",
    orcid: "https://orcid.org/0000-0001-6576-3410",
    photo: "/images/collaborators/tatsuya-amano.jpg",
  },
  {
    name: "Alex R. Gunderson",
    affiliation: "Tulane University",
    orcid: "https://orcid.org/0000-0002-0120-4246",
  },
  {
    name: "Yefeng Yang",
    affiliation: "UNSW Sydney",
    orcid: "https://orcid.org/0000-0002-8610-4016",
  },
  {
    name: "Kyle Morrison",
    affiliation: "University of Alberta",
    orcid: "https://orcid.org/0000-0002-3700-2398",
  },
  {
    name: "April Robin Martinig",
    affiliation: "Université de Sherbrooke",
    orcid: "https://orcid.org/0000-0002-0972-6903",
    href: "http://martinig.weebly.com",
  },
  {
    name: "Zara-Louise Cowan",
    affiliation: "Ludwig-Maximilians-Universität München",
    orcid: "https://orcid.org/0000-0002-3862-7111",
  },
  {
    name: "Pietro Pollo",
    affiliation: "UNSW Sydney",
    orcid: "https://orcid.org/0000-0001-6555-5400",
  },
  {
    name: "Dylan Gomes",
    affiliation: "NOAA National Marine Fisheries Service",
    orcid: "https://orcid.org/0000-0002-2642-3728",
    href: "https://dylangegomes.wixsite.com/home",
  },
  {
    name: "John S. Terblanche",
    affiliation: "Stellenbosch University",
    orcid: "https://orcid.org/0000-0001-9665-9405",
  },
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
  "10.1016/j.cois.2026.101523", // Life cycle complexity, Current Opinion in Insect Science
  "10.1016/j.tree.2023.12.004", // New horizons for comparative studies, TREE
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
    image: "/images/opportunities-banner.webp",
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

/* --------------------------------------------------------- short visits */

export type Visit = {
  name: string;
  funder: string;
  duration: string;
  who: string;
  url: string;
};

/**
 * Schemes that fund a stay in the group rather than a full position. Durations
 * and eligibility change, so treat these as a starting point.
 */
export const SHORT_VISITS: Visit[] = [
  {
    name: "Fulbright Postdoctoral Scholarship",
    funder: "Fulbright Commission",
    duration: "4 to 8 months",
    who: "US researchers visiting Sweden, and Swedish researchers visiting the US",
    url: "https://www.fulbright.se/",
  },
  {
    name: "Travelling Fellowships",
    funder: "The Company of Biologists",
    duration: "1 to 3 months",
    who: "Graduate students and postdocs collaborating in another laboratory",
    url: "https://www.biologists.com/travelling-fellowships/",
  },
  {
    name: "ECR Visiting Fellowships",
    funder: "The Company of Biologists",
    duration: "1 to 3 months",
    who: "Early-career researchers learning a new technique or building a collaboration",
    url: "https://www.biologists.com/grants/",
  },
  {
    name: "Research Grants and Small Research Grants",
    funder: "Fisheries Society of the British Isles",
    duration: "Project-length, typically under a year",
    who: "Fish biologists at any career stage",
    url: "https://fsbi.org.uk/grants/",
  },
  {
    name: "Travel and research scholarships",
    funder: "Helge Ax:son Johnsons stiftelse",
    duration: "Short stays",
    who: "Researchers working in or with Sweden",
    url: "https://www.haxsonj.se/",
  },
  {
    name: "Scientific Exchange Grants",
    funder: "EMBO",
    duration: "1 to 6 months",
    who: "PhD students and postdocs visiting a laboratory in another country",
    url: "https://www.embo.org/funding/fellowships-grants-and-career-support/scientific-exchange-grants/",
  },
  {
    name: "Research Grants for Doctoral Candidates and Short-Term Grants",
    funder: "DAAD",
    duration: "1 to 6 months",
    who: "Researchers based in Germany",
    url: "https://www.daad.de/en/",
  },
  {
    name: "Short-Term Fellowships",
    funder: "Federation of European Biochemical Societies",
    duration: "Up to 3 months",
    who: "Researchers in FEBS member countries",
    url: "https://www.febs.org/our-actions/fellowships/",
  },
  {
    name: "Research Mobility Grants",
    funder: "European Society for Evolutionary Biology",
    duration: "Short visits",
    who: "ESEB members, particularly students and early-career researchers",
    url: "https://eseb.org/prizes-funding/",
  },
  {
    name: "Erasmus+ staff and doctoral mobility",
    funder: "European Commission",
    duration: "Days to months",
    who: "Staff and doctoral candidates at participating European universities",
    url: "https://erasmus-plus.ec.europa.eu/",
  },
];

/* ------------------------------------------------------------ conferences */

export type Conference = {
  name: string;
  acronym: string;
  when: string;
  where: string;
  url?: string;
};

/** Meetings we expect to attend. Useful for anyone who wants to find us. */
export const CONFERENCES: Conference[] = [
  {
    name: "Annual Meeting of the Society for Experimental Biology",
    acronym: "SEB",
    when: "July 2027",
    where: "Glasgow, United Kingdom",
    url: "https://www.sebiology.org/events",
  },
  {
    name: "Congress of the European Society for Evolutionary Biology",
    acronym: "ESEB",
    when: "August 2027",
    where: "Gothenburg, Sweden",
    url: "https://eseb.org/meetings/",
  },
  {
    name: "International Congress on the Biology of Fish",
    acronym: "ICBF",
    when: "July 2028",
    where: "Manaus, Brazil",
  },
];

/* ------------------------------------------------------------------ news */

export type NewsTag = "Paper" | "Opportunities" | "Events" | "Award" | "Media" | "Lab";

export type NewsItem = {
  date: string; // ISO date, drives ordering
  tag: NewsTag;
  title: string;
  body: string;
  href?: string;
  image?: string;
  /** "contain" suits a logo, which must not be cropped. Photographs use cover. */
  imageFit?: "cover" | "contain";
};

/**
 * Newest first. Add an entry by copying a block; the date drives the ordering
 * and the tag drives the colour of the chip.
 */
export const NEWS: NewsItem[] = [
  {
    date: "2026-08-01",
    tag: "Opportunities",
    title: "Two positions open: one PhD and one postdoc",
    body:
      "We are recruiting a PhD student and a two-year postdoctoral researcher to work on thermal sensitivity across the life cycle. The Swedish Research Council funds both. Applications close on 21 September 2026.",
    href: "/opportunities",
    image: "/images/opportunities-banner.webp",
  },
  {
    date: "2026-07-20",
    tag: "Events",
    title: "Patrice attended the Ecological Data Synthesis course at Bamfield",
    body:
      "An excellent couple of weeks on Vancouver Island, giving a seminar and teaching on the Ecological Data Synthesis course with Jenn Sunday and Nikki Moore. Few things sharpen your own thinking like watching students take a method apart.",
    image: "/images/news-bamfield-trip.jpg",
  },
  {
    date: "2026-07-12",
    tag: "Events",
    title: "Patrice attended the FIN club writing retreat",
    body:
      "A brilliant few days writing on Vancouver Island after ICBF, with colleagues who are also friends. Retreats like this get more done than a month of ordinary weeks.",
    image: "/images/news-fin-club.jpg",
  },
  {
    date: "2026-07-05",
    tag: "Events",
    title: "Patrice attended the International Congress on the Biology of Fish in Vancouver",
    body:
      "A great week of catching up with old friends and meeting new ones. The talks from fish physiologists working all over the world left me full of ideas to chase.",
    image: "/images/news-icbf.jpg",
  },
  {
    // TODO: correct this date; it is a placeholder set before the lab opened.
    date: "2026-04-15",
    tag: "Award",
    title: "Strategic recruitment grant from the Swedish Research Council",
    body:
      "Vetenskapsrådet awarded Patrice a strategic recruitment grant covering five years of employment and a startup fund. The grant is what makes the PEACE lab possible, paying for its first positions and the equipment to get the laboratory running.",
    href: "https://www.vr.se/english.html",
    image: "/images/vr-logo.svg",
    imageFit: "contain",
  },
  {
    date: "2026-06-01",
    tag: "Lab",
    title: "The PEACE Lab starts at the University of Gothenburg",
    body:
      "The group opens at the Department of Biological and Environmental Sciences, working on how animals respond to rapidly changing environments.",
    image: "/images/fish-eggs.jpg",
  },
  {
    date: "2026-03-01",
    tag: "Opportunities",
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
    title: "Join us: a distributed experiment on fish embryonic thermal tolerance",
    event: "SEB Conference, Antwerp",
    year: 2025,
    image: "/posters/poster-seb2025.jpg",
    pdf: "/posters/poster-seb2025.pdf",
    note: "The recruitment call for the Thermal Ecology Alliance experiment now running.",
  },
  {
    title: "Climate vulnerability of the world's amphibians: finding the missing pieces of an ecological puzzle",
    event: "SEB Conference, Montpellier",
    year: 2022,
    image: "/posters/poster-seb2022.jpg",
    pdf: "/posters/poster-seb2022.pdf",
    note: "Published in Nature.",
  },
  {
    title:
      "Developmental plasticity in thermal tolerance: ontogenetic variation, persistence, and future directions",
    event: "ESEB Congress, Prague",
    year: 2022,
    image: "/posters/poster-eseb2022.jpg",
    pdf: "/posters/poster-eseb2022.pdf",
    note: "Published in Ecology Letters.",
  },
];

/** A single photograph used at the top of the Outreach page. */
export const OUTREACH_PHOTO = {
  src: "/images/seb2024-young-scientist-award.jpg",
  caption: "Presenting for the Young Scientist Award at the SEB 2024 conference.",
};

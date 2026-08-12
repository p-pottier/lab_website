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
    accent: "#CA6702",
  },
  {
    id: "plasticity",
    emoji: "☀️",
    title: "Plasticity and adaptation to changing temperatures",
    lead:
      "Phenotypic plasticity and genetic adaptation are two main mechanisms by which animals can keep pace with a changing climate. However, we still know little about how much these mechanisms can buffer the impacts of climate change, and what limits these adaptive responses. We quantify the benefits and limits of plasticity and adaptation across species, traits, and environments.",
    questions: [
      "What explains the variation in plasticity within and across taxa?",
      "To what extent can life-history traits evolve in response to changing environments?",
      "Does plasticity in one trait trade off against plasticity in another?",
      "How much of the projected impact of warming does plasticity offset?",
    ],
    image: "/images/research-plasticity.jpg",
    accent: "#EE9B00",
  },
  {
    id: "reproduction",
    emoji: "🔥",
    title: "The impacts of temperature on reproduction",
    lead:
      "Reproduction fails at temperatures well below survival limits in many species. Therefore, reproductive thermal limits may be important predictors of population abundance and distribution under climate change. However, we still know little about how climate change impacts reproduction in ectothermic animals. We quantify how extreme heat affects reproductive function, and what this means for population persistence and distribution.",
    questions: [
      "Do animals recover reproductive function after an extreme heat event?",
      "Which physiological mechanisms cause reproduction to fail before survival?",
      "What explains sex differences in thermal fertility limits?",
      "What do these limits mean for population growth under warming?",
    ],
    image: "/images/research-reproduction.jpg",
    accent: "#AE2012",
  },
  {
    id: "development",
    emoji: "🥚",
    title: "Developmental responses to environmental stressors",
    lead:
      "Early-life environments can have strong and long-lasting effects on later phenotypes. However, most predictions of the impacts of climate change on populations ignore the importance of developmental plasticity for species resilience. We are interested in understanding the importance of developmental plasticity and carry-over effects through the life cycle, in the context of climate change.",
    questions: [
      "What are the consequences of early developmental plasticity for later phenotypes?",
      "How does accounting for developmental plasticity change projected population dynamics?",
      "How resilient are early life stages to co-occurring environmental stressors?",
      "Which environmental pressures drive the evolution of developmental plasticity?",
    ],
    image: "/images/research-development-frogspawn.jpg",
    accent: "#0A9396",
  },
  {
    id: "lab-to-field",
    emoji: "🌡️",
    title: "Translating laboratory measurements to the field",
    lead:
      "A major challenge in experimental biology is to generate estimates that can directly help predictions of resilience in the wild. We are interested in increasing the ecological relevance of laboratory experiments, and validating predictions in the field.",
    questions: [
      "How can we account for plasticity and physiological repair under fluctuating thermal regimes?",
      "Do thermal load sensitivity models accurately predict survival during heatwaves?",
      "How much do broad-scale climate data differ from local-scale temperature measurements?",
      "How can we best quantify and account for thermal heterogeneity in natural environments?",
    ],
    image: "/images/research-lab-to-field.jpg",
    accent: "#94D2BD",
  },
  {
    id: "redistribution",
    emoji: "🧭",
    title: "Understanding species (re)distribution",
    lead:
      "Climate change is responsible for global shifts in the distribution of biodiversity. Understanding past and future distributions is key to predicting the impacts of climate change on society and human well-being. We are interested in understanding the ecological and evolutionary drivers of species (re)distribution across taxa.",
    questions: [
      "Can we predict distributional limits from tolerance traits?",
      "Can we use current knowledge to predict future range shifts?",
      "Which functional traits better predict species range shifts and range contractions?",
      "When will the limits of species redistribution be reached?",
    ],
    image: "/images/research-redistribution.jpg",
    accent: "#CA6702",
  },
  {
    id: "knowledge-action",
    emoji: "🤝",
    title: "Bridging the knowledge-action gap",
    lead:
      "Biodiversity management is hindered by the limited translation of scientific findings into decision making, the knowledge-action gap, because outputs are often inaccessible, overly technical, or misaligned with the scale at which management decisions occur. We aim to develop tools to facilitate the co-production of knowledge and translate research outcomes into conservation, management, and policy.",
    questions: [
      "What are the needs of decision makers for effective knowledge transfer?",
      "How can we optimise the co-production of knowledge?",
      "What are future research priorities for conservation and management?",
    ],
    image: "/images/research-knowledge-action.jpg",
    accent: "#94D2BD",
  },
  {
    id: "bias",
    emoji: "🌍",
    title: "Solving biases in the ecological literature",
    lead:
      "Taxonomic and geographic biases are pervasive in ecological datasets. These biases directly limit our ability to establish global patterns in species resilience. We quantify these biases, assess how they influence our ecological inferences, and develop approaches to overcome them.",
    questions: [
      "How does ignoring taxonomic and geographic bias change ecological inference?",
      "Can distributed experiments improve taxonomic and geographic coverage?",
      "Can statistical imputation recover what sampling missed?",
      "How much coverage do we gain by synthesising non-English literature?",
    ],
    image: "/images/research-bias.jpg",
    accent: "#0A9396",
  },
  {
    id: "synthesis",
    emoji: "📚",
    title: "Improving methods for evidence synthesis",
    lead:
      "Publication rates are increasing exponentially, which challenges our ability to synthesise datasets from the literature for comparative studies and meta-analyses. We aim to develop methods, software, and workflows to keep evidence synthesis tractable.",
    questions: [
      "How can AI tools support evidence synthesis across multiple languages?",
      "Can targeted sampling cut screening effort without compromising inference?",
      "How do we best synthesise and model heterogeneous datasets?",
      "How do we make synthesised evidence reusable rather than single-use?",
    ],
    image: "/images/research-synthesis.jpg",
    accent: "#EE9B00",
  },
  {
    id: "meta-science",
    emoji: "🔬",
    title: "Studying how research is done through meta-science",
    lead:
      "The way we do research shapes what we find. We study research practices in ecology and evolutionary biology, from reporting standards to the variation introduced by analytical choices, and identify solutions to make evidence more robust, transparent, and interoperable.",
    questions: [
      "How much do results depend on who analyses the data?",
      "Which reporting practices make a study reusable by someone else?",
      "What keeps researchers from sharing data and code, and what would change that?",
      "How do language and access policies shape whose science gets read?",
    ],
    image: "/images/wordcloud.png",
    accent: "#94D2BD",
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
  role: "Associate senior lecturer",
  affiliation: "Department of Biological and Environmental Sciences, University of Gothenburg",
  photo: "/images/patrice-pottier.webp",
  // The CV sits on its own button below the biography, so it is not repeated here.
  links: [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=gg1rV3IAAAAJ&hl=en" },
    { label: "ORCID", href: "https://orcid.org/0000-0003-2106-6597" },
    { label: "Email", href: "mailto:patrice.pottier@bioenv.gu.se" },
  ],
};

/** Always visible beside the PI photo. */
export const PI_INTRO =
  "I am currently leading the PEACE lab at the University of Gothenburg. My research interests have always been broad, and I have always let myself be guided by my curiosity. I have taken a keen interest in improving our ability to quantify the impacts of climate change on biodiversity, because I care deeply about protecting our precious natural world. I enjoy learning new methods and working across scales, from laboratory experiments to comparative analyses, and across a broad range of taxa. Above all, I love discussing ideas and collaborating with other scientists. I recently founded the Thermal Ecology Alliance, a platform to facilitate more inclusive collaborations and discussions in the field, and I am beyond excited about what comes next!";

/** Revealed by the "Learn more about me" button, below the intro. */
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
      "Leon is studying the physiological mechanisms that set heat tolerance limits, and how fish adapt to changing environments across generations. He has studied which organs fail first under gradual warming, is currently conducting a meta-analysis of the evidence on oxygen- and capacity-limited thermal tolerance (OCLTT), and will soon investigate physiological changes in evolved lines of zebrafish selected for increased growth. Leon is co-supervised with Fredrik Jutfelt.",
    links: [{ label: "Email", href: "mailto:leon.pfeufer@bioenv.gu.se" }],
  },
  {
    name: "Xinyi Liu",
    role: "PhD student",
    affiliation: "Australian National University",
    photo: "/images/xinyi-liu.jpg",
    blurb:
      "Xinyi is studying the impacts of microplastics on freshwater and marine organisms. She is conducting a meta-analysis of the impacts of freshwater microplastics on life-history traits, and will soon run experiments on freshwater invertebrates to quantify how changing temperatures affect the toxicity of microplastics. Xinyi is co-supervised with Daniel Noble.",
    links: [{ label: "Email", href: "mailto:xinyiliu1201@gmail.com" }],
  },
  {
    name: "Emil Larsson",
    role: "Research assistant",
    affiliation: "University of Gothenburg",
    photo: "/images/emil-larsson.jpg",
    blurb:
      "Emil looks after our zebrafish colony and keeps the experiments running. He maintains the aquarium facility, breeds and raises the fish we work with, and helps run the assays that turn them into data. The quality of our results starts with the quality of his animal care.",
    links: [],
  },
];

export const PAST_MEMBERS: Person[] = [
  {
    name: "Joelle Zürcher",
    role: "Former member",
    affiliation: "University of Gothenburg",
    photo: "/images/joelle-zurcher.jpg",
    years: "",
    now: "",
    blurb:
      "Joelle did her MSc in the PEACE lab, where she studied how thermal tolerance varies across embryonic stages of zebrafish. She identified critical windows of sensitivity to extreme heat, and is currently preparing a manuscript for publication.",
    links: [{ label: "Email", href: "mailto:guszurjo@student.gu.se" }],
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
      "An opportunity to understand how and why thermal sensitivity varies across the life cycle, and what this means for animal populations under climate change.",
    details: [
      "This PhD project is fully funded by the Swedish Research Council, as part of a programme on the vulnerability of fish life stages to climate change.",
      "The PhD project is expected to combine experiments with evidence synthesis and comparative analyses. While some aspects of the project will have to touch on variation in thermal sensitivity between life stages, the project is flexible in scope, and I welcome students to come up with their own research ideas.",
      "This project will be co-supervised by Fredrik Jutfelt, and based at Natrium in Gothenburg. There will also be opportunities to conduct projects at the Kristineberg marine station.",
      "The start date is flexible, but preferably before the end of 2026.",
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
      "An opportunity to integrate ecological and climatic data across life stages to predict global vulnerability to climate change.",
    details: [
      "This postdoc project is fully funded by the Swedish Research Council, as part of a programme on the vulnerability of fish life stages to climate change.",
      "The postdoc project is expected to combine experiments with evidence synthesis and comparative analyses. While some aspects of the project will have to touch on variation in thermal sensitivity between life stages, the project is flexible in scope, and I welcome applicants to come up with their own research ideas.",
      "The applicant will also have opportunities to take on leadership roles through the Thermal Ecology Alliance, including managing distributed experiments, and the chance to co-supervise MSc and PhD students.",
      "This project will be co-supervised by Fredrik Jutfelt, and based at Natrium in Gothenburg. There will also be opportunities to conduct projects at the Kristineberg marine station.",
      "The start date is flexible, but preferably before March 2027. Applicants should have completed a doctoral degree no more than three years before the start of the position.",
    ],
    image: "/images/opportunities-banner.webp",
  },
];

/** Traits drawn from the two Gothenburg advertisements. */
export const WHO_WE_LOOK_FOR = {
  lead:
    "How you think and your initiatives matter more than what you have published. We recognise that academic metrics are difficult to compare because of unequal access to opportunities. Therefore, we are primarily looking for people who are highly motivated, curious, and driven by their ideas, not publication counts.",
  traits: [
    {
      title: "Curious and self-directed",
      body: "You are creative, independent, and eager to design your own research projects.",
    },
    {
      title: "A critical thinker",
      body: "You think critically about the state of evidence, enjoy solving problems, and are willing to explore ideas outside your comfort zone.",
    },
    {
      title: "Eager to learn new methods",
      body: "You are eager to develop quantitative skills in R or similar environments, and to work reproducibly.",
    },
    {
      title: "Motivated by the problem",
      body: "You care about understanding, forecasting and mitigating the impacts of climate change on biodiversity.",
    },
    {
      title: "A good collaborator",
      body: "You can give and receive constructive feedback, and you work respectfully with people from different disciplinary, cultural, and personal backgrounds.",
    },
    {
      title: "Committed to open science",
      body: "You value scientific integrity, fairness, and transparency, and you value helping others through your work.",
    },
  ],
  closing:
    "We value diversity and we are committed to an inclusive research environment. We welcome applications from people of all backgrounds and identities, including people from diverse cultural and linguistic backgrounds, people with disabilities, neurodivergent people, and people of all genders, sexual orientations and ages. We have zero tolerance against any form of harassment, hate, discrimination, or unfair treatment.",
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
    date: "2026-08-21",
    tag: "Opportunities",
    title: "Two positions open: one PhD and one postdoc",
    body:
      "We are recruiting a PhD student and a postdoctoral researcher. Both are funded by a grant from the Swedish Research Council, but are flexible in scope. Applications close on 21 September 2026.",
    href: "/opportunities",
    image: "/images/opportunities-banner.webp",
  },
  {
    date: "2026-07-28",
    tag: "Events",
    title: "Patrice attended the Ecological Data Synthesis course in Bamfield",
    body:
      "I had an absolute blast giving a seminar and teaching for the Ecological Data Synthesis course at the Bamfield Marine Sciences Centre. I was invited by Jenn Sunday, and had the chance to meet many amazing colleagues, including Nikki Moore and Amanda Bates. I look forward to coming back to Bamfield!",
    image: "/images/news-bamfield-trip.jpg",
  },
  {
    date: "2026-07-20",
    tag: "Events",
    title: "Patrice attended the FIN club writing retreat",
    body:
      "I had so much fun catching up with ecophysiologist friends on Vancouver Island after the ICBF conference. We managed to work on multiple projects, and saw countless eagles, black bears, and other critters. I am feeling fortunate to attend working groups like this!",
    image: "/images/news-fin-club.jpg",
  },
  {
    date: "2026-07-10",
    tag: "Events",
    title: "Patrice attended the International Congress on the Biology of Fish in Vancouver",
    body:
      "Had an amazing week catching up with old friends and meeting new ones. I was lucky to give a talk on embryonic heat tolerance in fish, and organise a symposium on the vulnerability of early life stages to global change. I am now full of ideas for future projects!",
    image: "/images/news-icbf.jpg",
  },
  {
    date: "2026-07-01",
    tag: "Award",
    title: "Strategic recruitment grant from the Swedish Research Council",
    body:
      "Vetenskapsrådet awarded Patrice a strategic recruitment grant covering five years of employment and a startup fund. The grant is what makes the PEACE lab possible, paying for its first positions and the equipment to get the laboratory running.",
    href: "https://www.vr.se/english.html",
    image: "/images/vr-logo.svg",
    imageFit: "contain",
  },
  {
    date: "2026-07-01",
    tag: "Lab",
    title: "The PEACE Lab starts at the University of Gothenburg",
    body:
      "The PEACE lab has just spawned in the Department of Biological and Environmental Sciences at the University of Gothenburg. I am really excited for what comes next!",
    image: "/images/fish-eggs.jpg",
  },
  {
    date: "2026-03-01",
    tag: "Opportunities",
    title: "Thermal Ecology Alliance distributed experiment underway",
    body:
      "We are running a distributed experiment on the heat tolerance of fish embryos through the Thermal Ecology Alliance. Please reach out if you are interested in participating!",
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
      "The Thermal Ecology Alliance is a global collaborative initiative aiming to bring together people committed to predicting, communicating, and mitigating the impacts of changing temperatures on biodiversity. The goal of this initiative is to promote more inclusive collaborations, promote distributed experiments, and foster community discussions to tackle pressing ecological challenges.",
    href: "https://www.thermalecologyalliance.org/",
    accent: "#EE9B00",
  },
  {
    title: "Open and reproducible research",
    role: "Advocacy and practice",
    body:
      "We publish the data, code and protocols behind all of our papers, and we build R packages and workflows so that others can adapt and reuse our analyses. Much of the effort to promote open science has been motivated by the Society for Open, Reliable and Transparent Ecology and Evolutionary Biology (SORTEE), where Patrice served as a board and committee member.",
    href: "https://www.sortee.org/",
    accent: "#0A9396",
  },
  {
    title: "Communicating with the public",
    role: "Science communication",
    body:
      "Research published in scientific journals rarely reaches non-academic audiences. We like to write for general audiences and speak to the public about how climate change affects our biodiversity, and what measures we can take to preserve our natural wonders.",
    accent: "#CA6702",
  },
  {
    title: "Peer review and editorial work",
    role: "Service",
    body:
      "We review for scientific journals and funding bodies. We believe peer review is an essential part of academic service, and are grateful to all those who have reviewed our own papers.",
    accent: "#AE2012",
  },
];

/** Pieces written for general audiences. */
export type MediaItem = { title: string; outlet: string; year: number; href: string };

export const MEDIA: MediaItem[] = [
  {
    title: "Assessing amphibian vulnerability requires knowledge across all life stages",
    outlet: "FrogLog, IUCN Amphibian Specialist Group",
    year: 2025,
    href: "https://www.iucn-amphibians.org/wp-content/uploads/sites/4/2025/12/FrogLog-127-12th-December-2025.pdf",
  },
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
    note: "Presented by Patrice Pottier.",
  },
  {
    title: "Climate vulnerability of the world's amphibians: finding the missing pieces of an ecological puzzle",
    event: "SEB Conference, Montpellier",
    year: 2022,
    image: "/posters/poster-seb2022.jpg",
    pdf: "/posters/poster-seb2022.pdf",
    note: "Presented by Patrice Pottier.",
  },
  {
    title:
      "Developmental plasticity in thermal tolerance: ontogenetic variation, persistence, and future directions",
    event: "ESEB Congress, Prague",
    year: 2022,
    image: "/posters/poster-eseb2022.jpg",
    pdf: "/posters/poster-eseb2022.pdf",
    note: "Presented by Patrice Pottier.",
  },
];

/* ------------------------------------------------- talks, teaching, service */

/**
 * One shape for every dated list on the Outreach page. `kind` opens the entry,
 * `detail` carries the venue and any co-organisers.
 */
export type Engagement = {
  year: string;
  kind: string;
  title: string;
  detail: string;
};

export const TALKS: Engagement[] = [
  {
    year: "2026",
    kind: "Invited speaker",
    title: "Plasticity and resilience of ectotherms to climate warming",
    detail: "Seminar at the Bamfield Marine Sciences Centre. Bamfield, Canada.",
  },
  {
    year: "2026",
    kind: "Invited speaker",
    title: "The Thermal Ecology Alliance",
    detail:
      "Workshop on temperature responses across disciplines and scales, Bolin Centre for Climate Research. Stockholm, Sweden.",
  },
  {
    year: "2024",
    kind: "Invited speaker",
    title: "How vulnerable are amphibians to global warming?",
    detail:
      "Society for Experimental Biology conference, Young Scientist Award session. Prague, Czechia.",
  },
  {
    year: "2023",
    kind: "Plenary speaker",
    title: "Plasticity and resilience of ectotherms to global warming",
    detail:
      "Genetics, Ecology, Microbiology, Medicine, Zoology conference. Melbourne, Australia.",
  },
  {
    year: "2022",
    kind: "Plenary speaker",
    title: "Developmental plasticity in thermal tolerance",
    detail:
      "Australasian Evolution Society conference, Early Career Researcher Excellence award. Canberra, Australia.",
  },
  {
    year: "2022",
    kind: "Invited speaker",
    title:
      "Developmental plasticity in thermal tolerance: ontogenetic variation, persistence, and future directions",
    detail: "Society for Experimental Biology conference. Montpellier, France.",
  },
  {
    year: "2022",
    kind: "Invited speaker",
    title: "Pre-registration: why it is for you too!",
    detail:
      "Society for Open, Reliable, and Transparent Ecology and Evolutionary Biology conference. Online.",
  },
];

export const WORKSHOPS: Engagement[] = [
  {
    year: "2026",
    kind: "Workshop",
    title: "Introduction to systematic reviews and meta-analyses",
    detail:
      "Invited 1.5-day workshop, Lund University. Co-organised with Daniel Noble. Lund, Sweden.",
  },
  {
    year: "2026",
    kind: "Symposium",
    title: "Vulnerability and adaptations of developmental stages to global change stressors",
    detail:
      "International Congress on the Biology of Fish. Co-organised with Jérémy de Bonville and Zara Cowan. Vancouver, Canada.",
  },
  {
    year: "2025",
    kind: "Symposium",
    title: "Vulnerability and adaptations of early-life stages to environmental stressors",
    detail:
      "Society for Experimental Biology conference. Co-organised with Jérémy de Bonville and Zara Cowan. Antwerp, Belgium.",
  },
  {
    year: "2023",
    kind: "Symposium",
    title: "Plasticity and resilience of developmental stages to climate change",
    detail:
      "Society for Experimental Biology conference. Co-organised with Katharina Ruthsatz. Edinburgh, United Kingdom.",
  },
  {
    year: "2023",
    kind: "Workshop",
    title: "Mapping the impacts of anthropogenic threats on biodiversity",
    detail: "Self-organised. Sydney, Australia.",
  },
  {
    year: "2023",
    kind: "Workshop",
    title: "How to make your science more open?",
    detail: "UNSW Skill Transfer workshop. Sydney, Australia.",
  },
  {
    year: "2023",
    kind: "Workshop",
    title: "Geographical biases in global ecological syntheses",
    detail: "UNSW Evolution & Ecology Research Centre. Smiths Lake, Australia.",
  },
];

export const TEACHING: Engagement[] = [
  { year: "2025", kind: "Tutor", title: "BIO515, Research Skills in Biology", detail: "University of Gothenburg." },
  { year: "2023", kind: "Tutor", title: "SCIF1131, Introductory Skills for Science", detail: "University of New South Wales." },
  { year: "2023", kind: "Tutor", title: "SCIF1111, Perspectives in Medical Science, Scientific Literacy", detail: "University of New South Wales." },
  { year: "2023", kind: "Demonstrator", title: "MFAC1501, Introduction to Microbiology", detail: "University of New South Wales." },
  { year: "2023", kind: "Demonstrator", title: "BABS1201, Molecules, Cells and Genes", detail: "University of New South Wales." },
  { year: "2023", kind: "Demonstrator, invigilator", title: "MSCI0501, The Marine Environment", detail: "University of New South Wales." },
  { year: "2022", kind: "Demonstrator", title: "MFAC1527, Society & Health", detail: "University of New South Wales." },
  { year: "2022", kind: "Demonstrator", title: "MFAC1522, Beginnings, Growth and Development B", detail: "University of New South Wales." },
  { year: "2022", kind: "Demonstrator", title: "MFAC1521, Beginnings, Growth and Development B", detail: "University of New South Wales." },
  { year: "2022", kind: "Tutor", title: "SCIF1131, Perspectives in Medical Science, Scientific Literacy", detail: "University of New South Wales." },
];

export const SERVICE: Engagement[] = [
  {
    year: "2023-2026",
    kind: "Board of directors",
    title: "Society for Open, Reliable, and Transparent Ecology and Evolutionary Biology",
    detail: "",
  },
  {
    year: "2025",
    kind: "Guest editor",
    title:
      "Special issue: ontogenetic variation in thermal biology, assessing life stage-specific adaptations and sensitivity in animals",
    detail: "Journal of Thermal Biology.",
  },
  {
    year: "2022-2023",
    kind: "Equity, Diversity and Inclusion Committee",
    title: "UNSW Science",
    detail: "",
  },
  {
    year: "2023",
    kind: "Radio interview",
    title: "Why open science?",
    detail: "Eastside Radio FM, Boiling Point.",
  },
  {
    year: "2022",
    kind: "Awards Committee",
    title: "Society for Open, Reliable, and Transparent Ecology and Evolutionary Biology",
    detail: "",
  },
  {
    year: "2022",
    kind: "Equity, Diversity and Inclusion Committee",
    title: "Society for Open, Reliable, and Transparent Ecology and Evolutionary Biology",
    detail: "",
  },
  {
    year: "2022-2023",
    kind: "Postgraduate Committee",
    title: "UNSW Evolution & Ecology Research Centre",
    detail: "",
  },
  {
    year: "2022",
    kind: "Skype a Scientist",
    title: "LadyGrove Park primary school",
    detail: "Didcot, United Kingdom.",
  },
  {
    year: "2022",
    kind: "Skype a Scientist",
    title: "ISS International School",
    detail: "Singapore.",
  },
  {
    year: "2022",
    kind: "Pint of Science",
    title: "Can animals cope with climate change?",
    detail: "Sydney, Australia.",
  },
  {
    year: "2020",
    kind: "BatteryLow",
    title: "Playing video games for science",
    detail: "Live stream on Twitch. Sydney, Australia.",
  },
  {
    year: "2020-2026",
    kind: "Peer review",
    title:
      "American Naturalist, Biological Conservation, Biological Reviews, Biology Letters, Biology Open, Conservation Physiology, Current Opinion in Insect Science, Ecology Letters, Global Change Biology, Integrative and Comparative Biology, Journal of Animal Ecology, Journal of Evolutionary Biology, Journal of Experimental Zoology Part A, Journal of Thermal Biology, Marine Environmental Research, Methods in Ecology and Evolution, Nature Ecology and Evolution, PeerJ",
    detail: "",
  },
];

/** A single photograph used at the top of the Outreach page. */
export const OUTREACH_PHOTO = {
  src: "/images/seb2024-young-scientist-award.jpg",
  caption: "Presenting at the SEB conference in Prague (2024).",
};

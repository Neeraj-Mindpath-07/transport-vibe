export type ScoreStrength = "strong" | "good" | "weaker";

export type CompanyStat = {
  label: string;
  value: string;
};

export type TrustScorePillar = {
  id: string;
  title: string;
  strength: ScoreStrength;
  score: number;
  summary: string;
  detail: string;
};

export type QuickFact = {
  label: string;
  value: string;
  /** Right column uses Primary-600 (e.g. status, BBB). */
  valueTone?: "primary";
  /** When set, value is an underlined link with pointer cursor. */
  valueHref?: string;
};

export type SidebarCompareRow = {
  id: string;
  name: string;
  logo: { src: string; alt: string; width: number; height: number };
};

export type SidebarLeaveReview = {
  title: string;
  description: string;
  ctaLabel: string;
  mapImage: { src: string; width: number; height: number };
};

export type SidebarReadyToShip = {
  title: string;
  description: string;
  getQuoteLabel: string;
  useFullServiceLabel: string;
  backgroundImage: { src: string; width: number; height: number };
};

export type ProsConsListItem = {
  id: string;
  title: string;
  description: string;
};

export type CompanyDeepDiveCallout = {
  label: string;
  lines: string[];
};

export type CompanyDeepDiveLabeledBlock = {
  label: string;
  text: string;
};

export type CompanyDeepDiveSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  callout?: CompanyDeepDiveCallout;
  labeledBlocks?: CompanyDeepDiveLabeledBlock[];
};

export type CompanyDeepDive = {
  title: string;
  attribution: string;
  badges: string[];
  sections: CompanyDeepDiveSection[];
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  tags: string[];
};

export type CompanyReview = {
  id: string;
  reviewer: string;
  rating: number;
  date: string;
  serviceType: string;
  state: string;
  vehicle: string;
  verified: boolean;
  headline: string;
  body: string;
};

export type PaymentMethod = {
  name: string;
  src: string;
  width: number;
  height: number;
};

export type SidebarCta = {
  logo: { src: string; alt: string; width: number; height: number };
  companyName: string;
  rating: number;
  reviewCount: number;
  trustScore: number;
  trustBadgeLabel: string;
  getQuoteLabel: string;
  compareWithOtherLabel: string;
  addToAdvisorSessionLabel: string;
  useFullServiceLabel: string;
  fullServiceDescription: string;
  learnMoreLabel: string;
  learnMoreHref: string;
};

export type CompanyDetailsPageData = {
  company: {
    name: string;
    tagline: string;
    location: string;
  };
  banner: {
    title: string;
    subtitle: string;
    badges: string[];
    stats: CompanyStat[];
  };
  score: {
    title: string;
    overall: number;
    maximum: number;
    summary: string;
    methodologyHref: string;
    pillars: TrustScorePillar[];
  };
  companyInformation: {
    title: string;
    about: string[];
    quickFacts: QuickFact[];
  };
  comparison: {
    title: string;
    reviewAttribution: string;
    prosHeading: string;
    consHeading: string;
    pros: ProsConsListItem[];
    cons: ProsConsListItem[];
  };
  companyDeepDive: CompanyDeepDive;
  gallery: {
    title: string;
    description: string;
    images: GalleryImage[];
  };
  reviews: {
    title: string;
    description: string;
    pageSize: number;
    filterOptions: {
      serviceTypes: string[];
      states: string[];
      ratings: number[];
    };
    items: CompanyReview[];
  };
  paymentStrip: {
    title: string;
    description: string;
    methods: PaymentMethod[];
  };
  newsletter: {
    title: string;
    description: string;
    ctaLabel: string;
    footnote: string;
  };
  disclaimer: {
    title: string;
    text: string;
  };
  sidebar: {
    cta: SidebarCta;
    quickFactsTitle: string;
    quickFacts: QuickFact[];
    compareTitle: string;
    compareRows: SidebarCompareRow[];
    compareCtaLabel: string;
    leaveReview: SidebarLeaveReview;
    readyToShip: SidebarReadyToShip;
  };
};

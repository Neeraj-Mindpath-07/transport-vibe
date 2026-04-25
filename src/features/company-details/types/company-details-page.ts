export type AiVerdictSegmentTone = "neutral" | "positive" | "caution";

export type AiVerdictSegment = {
  tone: AiVerdictSegmentTone;
  text: string;
};

export type AiVerdict = {
  title: string;
  analysisLabel: string;
  updatedLabel: string;
  reviewCountLabel: string;
  segments: AiVerdictSegment[];
};

export type CompanyStat = {
  label: string;
  value: string;
};

/** Pillar bar fill — matches Trust Score Breakdown spec colors. */
export type TrustScoreBarTone = "green" | "blue" | "orange";

export type TrustScorePillar = {
  id: string;
  title: string;
  weightPercent: number;
  reviewSampleLabel: string;
  score: number;
  barTone: TrustScoreBarTone;
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

export type ComparisonItem = {
  id: string;
  name: string;
  trustScore: number;
  summary: string;
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
    aiVerdict: AiVerdict;
    overall: number;
    maximum: number;
    /** Optional section subtitle under the title. */
    summary?: string;
    methodologyHref: string;
    /** Label under the spectrum marker, e.g. "Highly Trusted". */
    overallBandLabel: string;
    pillars: TrustScorePillar[];
  };
  companyInformation: {
    title: string;
    about: string[];
    quickFacts: QuickFact[];
  };
  comparison: {
    title: string;
    ctaLabel: string;
    items: ComparisonItem[];
  };
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

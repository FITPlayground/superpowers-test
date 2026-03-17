export type FirmInfo = {
  name: string;
  tagline?: string;
};

export type PrincipalInfo = {
  name: string;
  title: string;
  bio: string;
  headshotPath: string;
};

export type ContactInfo = {
  address: string;
  phone: string;
  email: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
};

export type SocialLinks = {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
};

export type SeoConfig = {
  siteName?: string;
  defaultTitle?: string;
  defaultDescription?: string;
};

export type SiteConfig = {
  firm: FirmInfo;
  principal: PrincipalInfo;
  contact: ContactInfo;
  services: Service[];
  testimonials: Testimonial[];
  social?: SocialLinks;
  seo?: SeoConfig;
};

export const siteConfig: SiteConfig = {
  firm: {
    name: "Liquid Financial",
    tagline: "Calm, precise accounting for individuals and small businesses in the GTA.",
  },
  principal: {
    name: "Stanley Jansen",
    title: "Chartered Professional Accountant",
    bio: "Stanley Jansen is a Toronto-based CPA serving individuals and owner-managed businesses across the GTA. He focuses on clear explanations, practical advice, and reliable support through tax season and beyond.",
    headshotPath: "/images/principal.jpg",
  },
  contact: {
    address: "911 Highway 7, North York, ON M3K 000",
    phone: "905-789-9876",
    email: "info@liquidfinancial.ca",
  },
  services: [
    {
      id: "tax-consulting",
      title: "Tax consulting",
      description: "Year-round tax planning and advice to help you make informed decisions before filing deadlines.",
    },
    {
      id: "business-consulting",
      title: "Business consulting",
      description: "Support for owner-managed businesses on cash flow, growth planning, and structure.",
    },
    {
      id: "personal-tax",
      title: "Canadian & US personal tax returns",
      description: "Preparation and filing of Canadian and US personal tax returns, with cross-border considerations.",
    },
    {
      id: "corporate-tax",
      title: "Canadian & US corporate tax returns",
      description: "Compliance and planning for incorporated businesses with Canadian and US filing requirements.",
    },
    {
      id: "compilation",
      title: "Compilation engagements (Notice to Reader)",
      description: "Compilation of financial information into Notice to Reader financial statements for lenders and stakeholders.",
    },
    {
      id: "business-plans",
      title: "Business plan preparation",
      description: "Financial projections and written plans for financing, expansion, or new ventures.",
    },
    {
      id: "audit-support",
      title: "Representation at government audits",
      description: "Support and representation in dealing with CRA and IRS queries and audits.",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote: "Stanley explains complex tax issues in plain language and always makes time for questions during busy season.",
      authorName: "Long-time client",
      authorTitle: "Individual taxpayer, GTA",
    },
    {
      id: "t2",
      quote: "Having one advisor who understands both our Canadian and US filings has removed a lot of stress from year-end.",
      authorName: "Small business owner",
      authorTitle: "Owner-managed corporation",
    },
    {
      id: "t3",
      quote: "Our lender appreciated how quickly year-end financial statements were prepared and how clearly everything was presented.",
      authorName: "Business client",
      authorTitle: "GTA service business",
    },
    {
      id: "t4",
      quote: "Stanley is patient, organized, and proactive. We get reminders well before deadlines and no surprises at tax time.",
      authorName: "Household client",
      authorTitle: "Dual-country filing",
    },
    {
      id: "t5",
      quote: "Clear checklists and secure document upload have made tax season much simpler for our team.",
      authorName: "Corporate client",
      authorTitle: "Professional services firm",
    },
    {
      id: "t6",
      quote: "The business planning support helped us understand the numbers behind our growth targets.",
      authorName: "Entrepreneur",
      authorTitle: "Early-stage startup",
    },
  ],
  social: {
    linkedin: "https://www.linkedin.com",
  },
  seo: {
    siteName: "Liquid Financial — CPA in the GTA",
    defaultTitle: "Liquid Financial — Small firm accounting in the Greater Toronto Area",
    defaultDescription:
      "Liquid Financial provides calm, precise accounting, tax, and advisory services for individuals and small businesses across the Greater Toronto Area.",
  },
};


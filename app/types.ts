export interface BrandInfo {
  name: string;
  tagline: string;
  hotline: string;
  address: string;
  email: string;
  facebook: string;
  tiktok: string;
  zalo: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  cta: {
    book: string;
    explore: string;
    quote: string;
  };
  backgroundImage: string;
}

export interface AboutHighlight {
  label: string;
  value: string;
}

export interface AboutSection {
  title: string;
  subtitle: string;
  paragraphs: string[];
  highlights: AboutHighlight[];
  image: string;
}

export interface AccommodationCard {
  id: string;
  name: string;
  image: string;
  rooms: number;
  beds: number;
  capacity: string;
  pool: string;
  beachDistance: string;
  priceFrom: string;
  description: string;
}

export interface VillaDetailImage {
  url: string;
  caption: string;
}

export interface VillaDetailSpecs {
  rooms: string;
  beds: string;
  capacity: string;
  size: string;
  living: string;
  kitchen: string;
}

export interface VillaDetailSection {
  target: string;
  subtitle: string;
  bannerImage: string;
  videoPlaceholder: string;
  images: VillaDetailImage[];
  specs: VillaDetailSpecs;
  amenities: string[];
  price: string;
  faq: { q: string; a: string; }[];
}

export interface PricingCategoryRate {
  villa: string;
  price: string;
}

export interface PricingCategory {
  name: string;
  rates: PricingCategoryRate[];
}

export interface PricingSection {
  title: string;
  subtitle: string;
  categories: PricingCategory[];
  policies: string[];
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface AttractionItem {
  name: string;
  distance: string;
  image: string;
  description: string;
}

export interface BlogItem {
  title: string;
  summary: string;
  image: string;
  date: string;
  readTime: string;
}

export interface ReviewItem {
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface ContentData {
  brand: BrandInfo;
  hero: HeroSection;
  about: AboutSection;
  accommodations: AccommodationCard[];
  villaDetail: VillaDetailSection;
  pricing: PricingSection;
  services: ServiceItem[];
  attractions: AttractionItem[];
  blog: BlogItem[];
  reviews: ReviewItem[];
}

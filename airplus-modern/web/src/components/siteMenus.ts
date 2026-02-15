export type NavLinkItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href?: string;
  links?: NavLinkItem[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Destinations",
    links: [
      { label: "Everest Region", href: "/treks/everest-base-camp", description: "Classic trails and big mountain views." },
      { label: "Annapurna Region", href: "/treks/annapurna-circuit", description: "Diverse landscapes, villages, and passes." },
      { label: "Manaslu Region", href: "/treks/manaslu-circuit", description: "Remote routes with authentic culture." },
      { label: "Gokyo Valley", href: "/treks/gokyo-lake", description: "Turquoise lakes and high ridge panoramas." },
    ],
  },
  {
    label: "Trekking",
    links: [
      { label: "All Treks", href: "/treks", description: "Browse all Himalayan trek itineraries." },
      { label: "Everest Base Camp", href: "/treks/everest-base-camp", description: "Our most requested iconic trek." },
      { label: "Annapurna Base Camp", href: "/treks/annapurna-base-camp", description: "Tea-house journey to Annapurna sanctuary." },
      { label: "Mardi Himal", href: "/treks/mardi-himal", description: "Shorter ridge trek with superb sunrise views." },
    ],
  },
  {
    label: "Tours",
    links: [
      { label: "All Cultural Tours", href: "/tours", description: "City, heritage, wildlife, and valley tours." },
      { label: "Kathmandu & Pokhara", href: "/tours#kathmandu-pokhara", description: "History, lake city, and mountain backdrop." },
      { label: "Kathmandu & Chitwan", href: "/tours#kathmandu-chitwan", description: "Culture plus jungle safari experience." },
      { label: "Kathmandu & Lumbini", href: "/tours#kathmandu-lumbini", description: "Spiritual and UNESCO-focused route." },
    ],
  },
  {
    label: "Travel Guide",
    links: [
      { label: "Trip Planning Guide", href: "/travel-guide", description: "Season, permits, packing, and logistics." },
      { label: "Best Seasons", href: "/travel-guide#seasons", description: "When to trek for your preferred conditions." },
      { label: "Permits & Visa", href: "/travel-guide#permits", description: "Documents and entry essentials in one place." },
      { label: "Packing List", href: "/travel-guide#packing", description: "What to carry, rent, or buy in Kathmandu." },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "Director Message", href: "/director", description: "Meet the leadership behind AirPlus Nepal." },
      { label: "Why AirPlus", href: "/#contact", description: "Safety-first operations with local expertise." },
      { label: "Contact Us", href: "/contact", description: "Talk to us about your dates and goals." },
      { label: "Plan a Custom Trip", href: "/contact", description: "Private departures and custom route design." },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerSections: { title: string; links: NavLinkItem[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "All Treks", href: "/treks" },
      { label: "Cultural Tours", href: "/tours" },
      { label: "Travel Guide", href: "/travel-guide" },
    ],
  },
  {
    title: "Popular Treks",
    links: [
      { label: "Everest Base Camp", href: "/treks/everest-base-camp" },
      { label: "Annapurna Circuit", href: "/treks/annapurna-circuit" },
      { label: "Annapurna Base Camp", href: "/treks/annapurna-base-camp" },
      { label: "Manaslu Circuit", href: "/treks/manaslu-circuit" },
    ],
  },
  {
    title: "Popular Tours",
    links: [
      { label: "Kathmandu & Nagarkot", href: "/tours#kathmandu-nagarkot" },
      { label: "Kathmandu & Pokhara", href: "/tours#kathmandu-pokhara" },
      { label: "Kathmandu & Chitwan", href: "/tours#kathmandu-chitwan" },
      { label: "Kathmandu & Lumbini", href: "/tours#kathmandu-lumbini" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Director Message", href: "/director" },
      { label: "Contact", href: "/contact" },
      { label: "Plan Your Trek", href: "/contact" },
      { label: "FAQ", href: "/travel-guide#faq" },
    ],
  },
];

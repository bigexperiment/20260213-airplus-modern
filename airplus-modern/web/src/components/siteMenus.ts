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
    label: "Trekking",
    links: [
      { label: "All Treks", href: "/treks", description: "Browse all featured Nepal treks." },
      {
        label: "Everest Base Camp Trek",
        href: "/treks/everest-base-camp",
        description: "Iconic high-altitude route in the Khumbu region.",
      },
      {
        label: "Annapurna Base Camp Trek",
        href: "/treks/annapurna-base-camp",
        description: "Classic Annapurna Sanctuary teahouse route.",
      },
      {
        label: "Annapurna Circuit Trek",
        href: "/treks/annapurna-circuit",
        description: "Long scenic circuit with Thorong La crossing.",
      },
      {
        label: "Langtang Valley Trek",
        href: "/treks/langtang-valley",
        description: "Close-to-Kathmandu route with strong mountain culture.",
      },
      {
        label: "Manaslu Circuit Trek",
        href: "/treks/manaslu-circuit",
        description: "Remote restricted-area circuit with big views.",
      },
      {
        label: "Gokyo Lakes Trek",
        href: "/treks/gokyo-lake",
        description: "High lakes and panoramic Gokyo Ri viewpoints.",
      },
      {
        label: "Mardi Himal Trek",
        href: "/treks/mardi-himal",
        description: "Shorter ridge trek from Pokhara.",
      },
      {
        label: "Poon Hill Trek",
        href: "/treks/poon-hill",
        description: "Beginner-friendly sunrise route in Annapurna.",
      },
    ],
  },
  {
    label: "Tours",
    links: [
      { label: "All Tours and Activities", href: "/tours", description: "Detailed cultural tour and activity guides." },
      {
        label: "Kathmandu and Pokhara",
        href: "/tours#kathmandu-pokhara",
        description: "Heritage city and lakeside mountain getaway.",
      },
      {
        label: "Kathmandu and Chitwan",
        href: "/tours#kathmandu-chitwan",
        description: "Cultural sites plus wildlife safari.",
      },
      {
        label: "Kathmandu and Lumbini",
        href: "/tours#kathmandu-lumbini",
        description: "Spiritual and UNESCO-focused experience.",
      },
      {
        label: "Kathmandu and Nagarkot",
        href: "/tours#kathmandu-nagarkot",
        description: "Short city-and-sunrise hill itinerary.",
      },
    ],
  },
  {
    label: "Activities",
    links: [
      {
        label: "Paragliding in Pokhara",
        href: "/tours#paragliding-pokhara",
        description: "Tandem flights with valley and mountain views.",
      },
      {
        label: "White Water Rafting",
        href: "/tours#trishuli-rafting",
        description: "Trishuli and Bhote Koshi river options.",
      },
      {
        label: "Chitwan Jungle Safari",
        href: "/tours#chitwan-jungle-safari",
        description: "Jeep safaris, canoe rides, and birding.",
      },
      {
        label: "Everest Mountain Flight",
        href: "/tours#everest-mountain-flight",
        description: "Scenic Himalayan flight from Kathmandu.",
      },
      {
        label: "Bungee in Nepal",
        href: "/tours#bungee-bhotekoshi",
        description: "Bhote Koshi and Kushma jump options.",
      },
    ],
  },
  {
    label: "Adventure",
    links: [
      { label: "Peak Climbing", href: "/contact", description: "Island Peak, Mera, and custom climbing support." },
      { label: "Expeditions", href: "/contact", description: "High-altitude expedition logistics and permits." },
      { label: "Helicopter Tours", href: "/contact", description: "Everest and mountain helicopter charter options." },
      { label: "Private Tailor-Made Trips", href: "/contact", description: "Custom routes for families and small groups." },
    ],
  },
  {
    label: "Travel Guide",
    links: [
      {
        label: "Nepal Travel Guide",
        href: "/travel-guide",
        description: "Permits, seasons, budget, and packing advice.",
      },
      { label: "Best Seasons", href: "/travel-guide#seasons", description: "Month and season planning notes." },
      { label: "Permits", href: "/travel-guide#permits", description: "Current permit reference table." },
      { label: "Budget", href: "/travel-guide#budget", description: "Cost expectations by trip style." },
      { label: "Packing", href: "/travel-guide#packing", description: "Smart packing essentials." },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "Director Message", href: "/director", description: "Meet AirPlus Nepal leadership." },
      { label: "Why AirPlus", href: "/#contact", description: "Licensed local operations and support." },
      { label: "Contact Us", href: "/contact", description: "Ask for dates, prices, and custom plans." },
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
      { label: "Tours and Activities", href: "/tours" },
      { label: "Travel Guide", href: "/travel-guide" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Top Treks",
    links: [
      { label: "Everest Base Camp", href: "/treks/everest-base-camp" },
      { label: "Annapurna Base Camp", href: "/treks/annapurna-base-camp" },
      { label: "Annapurna Circuit", href: "/treks/annapurna-circuit" },
      { label: "Langtang Valley", href: "/treks/langtang-valley" },
      { label: "Manaslu Circuit", href: "/treks/manaslu-circuit" },
    ],
  },
  {
    title: "Popular Tours",
    links: [
      { label: "Kathmandu and Pokhara", href: "/tours#kathmandu-pokhara" },
      { label: "Kathmandu and Chitwan", href: "/tours#kathmandu-chitwan" },
      { label: "Kathmandu and Lumbini", href: "/tours#kathmandu-lumbini" },
      { label: "Kathmandu and Nagarkot", href: "/tours#kathmandu-nagarkot" },
    ],
  },
  {
    title: "Adventure",
    links: [
      { label: "Paragliding", href: "/tours#paragliding-pokhara" },
      { label: "White Water Rafting", href: "/tours#trishuli-rafting" },
      { label: "Chitwan Safari", href: "/tours#chitwan-jungle-safari" },
      { label: "Everest Mountain Flight", href: "/tours#everest-mountain-flight" },
      { label: "Bungee", href: "/tours#bungee-bhotekoshi" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Permit Guide", href: "/travel-guide#permits" },
      { label: "Season Guide", href: "/travel-guide#seasons" },
      { label: "Packing Guide", href: "/travel-guide#packing" },
      { label: "FAQ", href: "/travel-guide#faq" },
      { label: "Director Message", href: "/director" },
    ],
  },
];

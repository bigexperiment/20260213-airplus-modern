export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type TourGuide = {
  id: string;
  title: string;
  duration: string;
  image: string;
  seoTitle: string;
  metaDescription: string;
  quickKeywords: string[];
  introNote: string;
  sections: GuideSection[];
  sources: { label: string; url: string }[];
};

export type ActivityGuide = {
  id: string;
  title: string;
  image: string;
  level: string;
  seoTitle: string;
  metaDescription: string;
  quickKeywords: string[];
  introNote: string;
  sections: GuideSection[];
  sources: { label: string; url: string }[];
};

export const tourGuides: TourGuide[] = [
  {
    id: "kathmandu-pokhara",
    title: "Kathmandu and Pokhara Cultural Tour",
    duration: "5 to 7 Days",
    image: "/information/assets/tour_kathmandu_pokhara.jpg",
    seoTitle: "Kathmandu and Pokhara Tour Guide (2024/2025): Itinerary, Cost and Best Time",
    metaDescription:
      "Detailed Kathmandu and Pokhara tour guide with route, practical costs, transport options, and seasonal travel tips.",
    quickKeywords: [
      "Kathmandu and Pokhara tour",
      "Nepal cultural tour",
      "Kathmandu Pokhara tour cost",
      "Kathmandu Pokhara best time",
      "Pokhara activities",
    ],
    introNote: "Cost ranges are based on active Nepal operator listings and package marketplaces in 2024/2025.",
    sections: [
      {
        heading: "What is this tour?",
        paragraphs: [
          "This is one of the easiest ways to combine Nepal's heritage city and lake city in one trip. You get temples, old city squares, mountain viewpoints, and relaxed evenings by Phewa Lake.",
          "It works well for first-time visitors because logistics are simple and roads/flights between the two cities are frequent.",
        ],
      },
      {
        heading: "Route - Day by Day",
        bullets: [
          "Day 1: Arrive Kathmandu and explore local markets around Thamel.",
          "Day 2: Kathmandu heritage circuit (Pashupatinath, Boudhanath, Swayambhu, Patan or Bhaktapur).",
          "Day 3: Fly or drive to Pokhara; evening lakeside walk.",
          "Day 4: Sunrise at Sarangkot, then city sightseeing (Davis Falls, Gupteshwor, Peace Pagoda).",
          "Day 5: Return to Kathmandu or extend with one free day for adventure activities.",
        ],
        paragraphs: [
          "If you add extra days, most people include light hiking, paragliding, or a short village stay around Pokhara.",
        ],
      },
      {
        heading: "How much does it cost?",
        paragraphs: [
          "As of 2024/2025, Kathmandu and Pokhara tour cost is commonly around USD 350 to 900 per person for standard private/shared packages, depending on hotel class and transport mode.",
        ],
        bullets: [
          "Budget style: USD 350 to 500 with tourist bus and standard hotels.",
          "Comfort style: USD 550 to 900 with private transfers or domestic flights.",
          "Domestic flight one way: often around USD 90 to 130 per person.",
          "Private guide/day guide costs vary by city and language requirement.",
        ],
      },
      {
        heading: "Best time to go",
        paragraphs: [
          "Best windows are spring and autumn for clearer Himalayan views and smoother sightseeing weather. Winter is also good for city tours, though mornings can be chilly.",
          "Monsoon months are greener and less crowded but include higher rain probability and cloud-covered mountain views.",
        ],
      },
      {
        heading: "Practical tips",
        bullets: [
          "Use a morning flight to Pokhara if your schedule is tight.",
          "Keep one flexible half-day in Pokhara for weather-dependent activities.",
          "Choose hotel locations near walking zones to reduce city traffic time.",
          "Carry small notes for entry fees and local snacks.",
        ],
        paragraphs: [
          "This route is beginner-friendly and still feels rich if you keep a relaxed pace instead of overloading each day.",
        ],
      },
    ],
    sources: [
      {
        label: "Viator - Kathmandu and Pokhara package pricing reference",
        url: "https://www.viator.com/en-IN/tours/Kathmandu/Kathmandu-and-Pokhara-Tour-7-Days-Cultural-Tour-in-Nepal/d5109-343015P4",
      },
      {
        label: "Welcome Nepal - Pokhara destination overview",
        url: "https://www.welcomenepal.com/places-to-see/pokhara.html",
      },
    ],
  },
  {
    id: "kathmandu-chitwan",
    title: "Kathmandu and Chitwan Wildlife Tour",
    duration: "5 to 7 Days",
    image: "/information/assets/tour_kathmandu_chitwan.jpg",
    seoTitle: "Kathmandu and Chitwan Tour Guide (2024/2025): Cost, Safari Plan and Travel Tips",
    metaDescription:
      "Kathmandu and Chitwan travel guide with safari planning, realistic budget ranges, and practical route tips.",
    quickKeywords: [
      "Kathmandu Chitwan tour",
      "Chitwan safari cost",
      "Nepal wildlife tour",
      "Kathmandu Chitwan best time",
    ],
    introNote: "Price and itinerary ranges reflect current tour operator listings for 2024/2025.",
    sections: [
      {
        heading: "What is this tour?",
        paragraphs: [
          "This route combines Kathmandu's heritage sites with jungle activities in Chitwan National Park. It is a good mix if your group wants culture and wildlife in one plan.",
          "Chitwan is known for jeep safaris, canoe rides, birdlife, and community village experiences.",
        ],
      },
      {
        heading: "Route - Day by Day",
        bullets: [
          "Day 1: Arrive Kathmandu and short city orientation.",
          "Day 2: Full heritage day in Kathmandu Valley.",
          "Day 3: Drive or fly to Chitwan and evening Tharu cultural program.",
          "Day 4: Safari activities (jeep, canoe, nature walk, birdwatching).",
          "Day 5: Return to Kathmandu or add one extra jungle morning.",
        ],
        paragraphs: [
          "A 6th or 7th day makes the trip much less rushed and gives a better safari chance.",
        ],
      },
      {
        heading: "How much does it cost?",
        paragraphs: [
          "As of 2024/2025, Kathmandu and Chitwan tour cost often ranges from USD 450 to 1,000 depending on hotel quality, safari inclusions, and transport style.",
        ],
        bullets: [
          "Budget packages: around USD 450 to 650.",
          "Comfort packages: around USD 700 to 1,000+.",
          "Jungle activity bundles vary by lodge and number of included experiences.",
          "Private road transport increases comfort but adds cost.",
        ],
      },
      {
        heading: "Best time to go",
        paragraphs: [
          "October to March is often preferred for safari visibility and comfortable daytime conditions. Warmer months can still work but feel more humid.",
          "Monsoon season means greener landscapes but also more rain interruptions.",
        ],
      },
      {
        heading: "Practical tips",
        bullets: [
          "Wear neutral clothing tones for safari drives.",
          "Carry insect repellent and a light long-sleeve layer.",
          "Book at least one full day inside Chitwan, not just one evening stop.",
          "If traveling with kids or elders, choose lodges close to activity start points.",
        ],
        paragraphs: [
          "This is one of the easiest Nepal routes for mixed-age groups.",
        ],
      },
    ],
    sources: [
      {
        label: "Welcome Nepal - Chitwan destination overview",
        url: "https://www.welcomenepal.com/places-to-see/chitwan-national-park.html",
      },
      {
        label: "All Nepal Tour - Kathmandu Chitwan Pokhara package benchmark",
        url: "https://allnepaltour.com/tour/kathmandu-chitwan-pokhara-tour-package",
      },
    ],
  },
  {
    id: "kathmandu-lumbini",
    title: "Kathmandu and Lumbini Heritage Tour",
    duration: "5 to 7 Days",
    image: "/information/assets/tour_kathmandu_lumbini.jpg",
    seoTitle: "Kathmandu and Lumbini Tour Guide (2024/2025): Itinerary, Budget and Travel Notes",
    metaDescription:
      "Practical Kathmandu and Lumbini tour guide with route plan, current budget range, and travel timing tips.",
    quickKeywords: [
      "Kathmandu Lumbini tour",
      "Lumbini tour cost",
      "Nepal Buddhist heritage tour",
      "Kathmandu Lumbini itinerary",
    ],
    introNote: "Cost estimates are based on current multi-day Nepal cultural package listings in 2024/2025.",
    sections: [
      {
        heading: "What is this tour?",
        paragraphs: [
          "This tour connects Kathmandu's historic temples and squares with Lumbini, the birthplace of Buddha. It is designed for travelers interested in spiritual and cultural history.",
          "It can be done comfortably in under a week with either domestic flights or mixed road transport.",
        ],
      },
      {
        heading: "Route - Day by Day",
        bullets: [
          "Day 1: Arrive Kathmandu and short city walk.",
          "Day 2: Heritage sightseeing in Kathmandu Valley.",
          "Day 3: Fly or drive to Bhairahawa/Lumbini and settle in.",
          "Day 4: Lumbini sacred garden, Maya Devi temple, monastic zone visits.",
          "Day 5: Return to Kathmandu and depart or extend one day.",
        ],
        paragraphs: [
          "Some itineraries include a quick stop in Bandipur or Pokhara if you add extra days.",
        ],
      },
      {
        heading: "How much does it cost?",
        paragraphs: [
          "As of 2024/2025, Kathmandu and Lumbini tour cost often falls between USD 420 and 950 depending on hotel category and transport choices.",
        ],
        bullets: [
          "Budget range: around USD 420 to 600.",
          "Comfort range: around USD 650 to 950+.",
          "Domestic flight adds convenience and usually saves time.",
          "Private guide and vehicle are the biggest cost levers after flights.",
        ],
      },
      {
        heading: "Best time to go",
        paragraphs: [
          "October to March is usually most comfortable for city sightseeing and plains travel to Lumbini. Summer and monsoon can be hot and humid in the Terai belt.",
        ],
      },
      {
        heading: "Practical tips",
        bullets: [
          "Use a hat and hydration plan in Lumbini, especially after late morning.",
          "Keep respectful clothing for religious sites.",
          "If time is tight, prioritize flight connections over long drives.",
          "Choose one calm evening in Lumbini to enjoy the monastery zone without rushing.",
        ],
        paragraphs: [
          "The trip works best when planned as a slow cultural route, not a checklist sprint.",
        ],
      },
    ],
    sources: [
      {
        label: "Welcome Nepal - Lumbini destination overview",
        url: "https://www.welcomenepal.com/places-to-see/lumbini.html",
      },
      {
        label: "Darshan Holidays - Nepal package benchmark",
        url: "https://www.darshanholidays.com/tour/nepal-tour-kathmandu-nagarkot",
      },
    ],
  },
  {
    id: "kathmandu-nagarkot",
    title: "Kathmandu and Nagarkot Short Escape",
    duration: "3 to 4 Days",
    image: "/information/assets/tour_kathmandu_nagarkot.jpg",
    seoTitle: "Kathmandu and Nagarkot Tour Guide (2024/2025): Cost, Sunrise Views and Easy Itinerary",
    metaDescription:
      "A short Kathmandu and Nagarkot itinerary with realistic pricing, sunset-sunrise planning, and practical travel tips.",
    quickKeywords: [
      "Kathmandu Nagarkot tour",
      "Nagarkot sunrise tour",
      "Kathmandu Nagarkot cost",
      "short Nepal tour",
    ],
    introNote: "Cost and duration are based on currently available short Nepal city-and-hill packages in 2024/2025.",
    sections: [
      {
        heading: "What is this tour?",
        paragraphs: [
          "This is a short Nepal itinerary for travelers with limited days. You get Kathmandu heritage highlights and Nagarkot hill views in one compact plan.",
          "It is simple, low-stress, and works well before or after a trek.",
        ],
      },
      {
        heading: "Route - Day by Day",
        bullets: [
          "Day 1: Arrive Kathmandu and local city walk.",
          "Day 2: Kathmandu heritage sightseeing and drive to Nagarkot for sunset.",
          "Day 3: Sunrise view in Nagarkot, return to Kathmandu via Bhaktapur or Patan.",
          "Day 4: Departure or optional extra city day.",
        ],
        paragraphs: [
          "In clear weather, Himalayan views from Nagarkot are the main highlight.",
        ],
      },
      {
        heading: "How much does it cost?",
        paragraphs: [
          "As of 2024/2025, Kathmandu and Nagarkot tour cost usually ranges from about USD 120 to 320 per person depending on private transport and hotel level.",
        ],
        bullets: [
          "Shared/basic style: around USD 120 to 180.",
          "Private/comfort style: around USD 220 to 320+.",
          "Entry tickets and guide fees in Kathmandu add a moderate extra amount.",
        ],
      },
      {
        heading: "Best time to go",
        paragraphs: [
          "Autumn and spring usually give the best chance of clear horizon views from Nagarkot. Winter mornings are colder but often sharp and clear.",
          "Monsoon months can hide mountain views behind cloud cover.",
        ],
      },
      {
        heading: "Practical tips",
        bullets: [
          "Do not skip the pre-sunrise wake-up if mountain views matter to you.",
          "Keep one flexible morning in case clouds block your first sunrise.",
          "Use Bhaktapur stopover on return for a richer cultural day.",
          "Carry a light warm layer since Nagarkot mornings can feel cool year-round.",
        ],
        paragraphs: [
          "For a short itinerary, this route gives a good balance of city and hill scenery.",
        ],
      },
    ],
    sources: [
      {
        label: "Welcome Nepal - Nagarkot destination overview",
        url: "https://www.welcomenepal.com/places-to-see/nagarkot.html",
      },
      {
        label: "Darshan Holidays - Kathmandu Nagarkot package benchmark",
        url: "https://www.darshanholidays.com/tour/nepal-tour-kathmandu-nagarkot",
      },
    ],
  },
];

export const activityGuides: ActivityGuide[] = [
  {
    id: "paragliding-pokhara",
    title: "Paragliding in Pokhara",
    image: "/information/assets/gallery_8.jpg",
    level: "Easy (tandem)",
    seoTitle: "Pokhara Paragliding Guide (2024/2025): Cost, Safety, Best Season",
    metaDescription:
      "A practical Pokhara paragliding guide with current price range, launch details, season tips, and what to expect.",
    quickKeywords: [
      "Pokhara paragliding",
      "Nepal adventure activities",
      "Pokhara paragliding cost",
      "best time for paragliding in Nepal",
    ],
    introNote: "Price ranges are based on current operator listings and travel marketplace offers in 2024/2025.",
    sections: [
      {
        heading: "What it is and why people do it",
        paragraphs: [
          "Pokhara is Nepal's main paragliding hub, with tandem flights from Sarangkot. The flight gives valley and lake views, and on clear days you also get a Himalayan backdrop.",
          "It is a beginner-friendly activity because tandem pilots handle the technical side.",
        ],
      },
      {
        heading: "Cost and duration",
        bullets: [
          "Typical tandem cost (as of 2024/2025): around USD 60 to 110 depending on season, flight time, and media package.",
          "Standard flight time: about 20 to 30 minutes.",
          "Longer cross-country style flights cost more.",
        ],
        paragraphs: [
          "Always verify what is included: transport, insurance terms, and photo/video charges.",
        ],
      },
      {
        heading: "Best season and conditions",
        paragraphs: [
          "Spring and autumn are usually the most stable windows. Flights are weather-dependent every day, so keep schedule flexibility.",
          "Strong wind or low cloud can delay or cancel takeoff.",
        ],
      },
      {
        heading: "Practical tips",
        bullets: [
          "Book early in your Pokhara stay so you can reschedule if weather changes.",
          "Wear secure shoes and light windproof layers.",
          "Clarify landing location and pickup process before takeoff.",
          "Choose licensed operators with recent safety track records.",
        ],
        paragraphs: [
          "For most travelers, this is one of the easiest high-impact adventure experiences in Nepal.",
        ],
      },
    ],
    sources: [
      {
        label: "Welcome Nepal - Paragliding in Nepal",
        url: "https://www.trade.welcomenepal.com/things-to-do/paragliding",
      },
      {
        label: "Viator - Pokhara tandem paragliding pricing benchmark",
        url: "https://www.viator.com/en-IN/tours/Pokhara/Paragliding-in-Pokhara-Nepal/d22291-247381P8",
      },
    ],
  },
  {
    id: "trishuli-rafting",
    title: "White Water Rafting (Trishuli and Bhote Koshi)",
    image: "/information/assets/gallery_6.jpg",
    level: "Easy to Moderate",
    seoTitle: "Nepal Rafting Guide (2024/2025): Trishuli and Bhote Koshi Cost, Seasons and Tips",
    metaDescription:
      "Nepal rafting guide with Trishuli and Bhote Koshi cost ranges, river conditions, and practical planning advice.",
    quickKeywords: [
      "rafting in Nepal",
      "Trishuli rafting cost",
      "Bhote Koshi rafting",
      "Nepal adventure tour",
    ],
    introNote: "Price and duration ranges are based on active rafting operator listings in 2024/2025.",
    sections: [
      {
        heading: "What it is and route options",
        paragraphs: [
          "Trishuli is the most common rafting choice for first-timers and mixed groups. Bhote Koshi is usually steeper and faster, often picked by people wanting a stronger adrenaline day.",
          "Both can be done as day trips or short overnights depending on your itinerary.",
        ],
      },
      {
        heading: "Cost and duration",
        bullets: [
          "Trishuli day rafting: approximately USD 35 to 70 per person.",
          "Bhote Koshi rafting: often USD 60 to 120+ depending on program and transport.",
          "Multi-day river trips include meals/camp support and cost more.",
        ],
        paragraphs: [
          "Check transfer timing from Kathmandu or Pokhara before booking, because road time can be significant.",
        ],
      },
      {
        heading: "Best season and conditions",
        paragraphs: [
          "Post-monsoon and spring are popular. Water level and intensity change by season, so trip grade can feel different month to month.",
          "Monsoon high water can increase difficulty and may alter route plans.",
        ],
      },
      {
        heading: "Practical tips",
        bullets: [
          "Use only operators that provide certified guides and proper river safety gear.",
          "Carry quick-dry clothes and secure footwear.",
          "Store valuables in waterproof bags and leave extra electronics at hotel.",
          "If you are not a strong swimmer, tell guides before launch so they can seat you well.",
        ],
        paragraphs: [
          "Rafting is a great add-on between city and trek segments when planned with enough transport buffer.",
        ],
      },
    ],
    sources: [
      {
        label: "Welcome Nepal - River rafting overview",
        url: "https://www.welcomenepal.com/things-to-do/river-rafting.html",
      },
      {
        label: "Himalayan Glacier - Trishuli rafting package benchmark",
        url: "https://www.himalayanglacier.com/trips/trishuli-river-rafting/",
      },
    ],
  },
  {
    id: "chitwan-jungle-safari",
    title: "Chitwan Jungle Safari",
    image: "/information/assets/tour_kathmandu_chitwan.jpg",
    level: "Easy",
    seoTitle: "Chitwan Jungle Safari Guide (2024/2025): Cost, Activities and Best Time",
    metaDescription:
      "Simple Chitwan safari guide with current activity costs, seasonal timing, and practical planning tips.",
    quickKeywords: [
      "Chitwan jungle safari",
      "Chitwan safari cost",
      "Nepal wildlife activities",
      "best time for Chitwan",
    ],
    introNote: "Cost ranges are compiled from current Chitwan lodge and tour package references in 2024/2025.",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Chitwan is Nepal's best-known lowland wildlife destination. Typical activities include jeep safaris, canoe rides, birdwatching, and village cultural programs.",
          "It pairs well with Kathmandu or Pokhara if you want to break up mountain-focused travel.",
        ],
      },
      {
        heading: "Cost and activity style",
        bullets: [
          "Day activity packages often land around USD 45 to 120 depending on inclusions.",
          "2N/3D lodge packages commonly range from budget to premium based on room type and private/shared safaris.",
          "Private jeep drives cost more but are better for photography-focused groups.",
        ],
        paragraphs: [
          "Always confirm what is included: park fees, guide, transfers, and meals.",
        ],
      },
      {
        heading: "Best season",
        paragraphs: [
          "October through March is commonly preferred for easier wildlife viewing conditions. Summer can be hotter and more humid but still visitable with adjusted timing.",
        ],
      },
      {
        heading: "Practical tips",
        bullets: [
          "Use neutral colors and avoid strong fragrances during wildlife drives.",
          "Bring binoculars if you enjoy birds and distant animal sightings.",
          "Stay at least two nights for a more complete wildlife experience.",
          "Keep expectations realistic: sightings vary daily and are never guaranteed.",
        ],
        paragraphs: [
          "Chitwan works best when treated as a nature experience, not just a checklist stop.",
        ],
      },
    ],
    sources: [
      {
        label: "Welcome Nepal - Chitwan National Park overview",
        url: "https://www.welcomenepal.com/places-to-see/chitwan-national-park.html",
      },
      {
        label: "GetYourGuide - Chitwan day tour pricing benchmark",
        url: "https://www.getyourguide.com/chitwan-national-park-l2249/full-day-jungle-safari-guided-tour-from-kathmandu-t755137/",
      },
    ],
  },
  {
    id: "everest-mountain-flight",
    title: "Everest Mountain Flight",
    image: "/information/assets/trekking_everest2.jpg",
    level: "Easy",
    seoTitle: "Everest Mountain Flight Guide (2024/2025): Cost, Timing and Booking Tips",
    metaDescription:
      "Everest mountain flight planning guide with current ticket ranges, weather tips, and practical booking advice.",
    quickKeywords: [
      "Everest mountain flight",
      "Everest scenic flight cost",
      "Kathmandu mountain flight",
      "Nepal aerial tour",
    ],
    introNote: "Ticket ranges are based on currently listed airline and travel marketplace prices in 2024/2025.",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Everest mountain flight is a short early-morning scenic flight from Kathmandu that offers close Himalayan views without trekking. It is popular for travelers short on time or not trekking.",
        ],
      },
      {
        heading: "Cost and timing",
        bullets: [
          "Typical ticket range (2024/2025): around USD 220 to 280 per person.",
          "Flight duration: usually around one hour.",
          "Most departures are early morning for better visibility.",
        ],
        paragraphs: [
          "Cloud and wind can shift schedules, so keep one backup morning if possible.",
        ],
      },
      {
        heading: "Best season",
        paragraphs: [
          "Autumn and spring usually offer the strongest mountain visibility windows. Winter can also be very clear on good weather days.",
        ],
      },
      {
        heading: "Practical tips",
        bullets: [
          "Book your flight for one of your first Kathmandu mornings.",
          "Keep passport copy and exact booking details ready for airport check-in.",
          "Choose a seat preference early when possible.",
          "Do not schedule a tight airport transfer immediately after the flight window.",
        ],
        paragraphs: [
          "This is one of the easiest ways to see Everest panoramas if trekking is not in your plan.",
        ],
      },
    ],
    sources: [
      {
        label: "Welcome Nepal - Mountain flight activity overview",
        url: "https://www.welcomenepal.com/things-to-do/mountain-flight.html",
      },
      {
        label: "Viator - Everest scenic flight pricing benchmark",
        url: "https://www.viator.com/en-IN/tours/Kathmandu/Everest-Mountain-Flight-50-Minutes/d5109-126829P3",
      },
    ],
  },
  {
    id: "bungee-bhotekoshi",
    title: "Bungee Jumping in Nepal (Bhote Koshi and Kushma)",
    image: "/information/assets/gallery_5.jpg",
    level: "Moderate",
    seoTitle: "Nepal Bungee Guide (2024/2025): Cost, Locations and Safety Notes",
    metaDescription:
      "A practical Nepal bungee guide with Bhote Koshi and Kushma price ranges, travel logistics, and booking tips.",
    quickKeywords: [
      "bungee jumping Nepal",
      "Bhote Koshi bungee cost",
      "Kushma bungee",
      "Nepal adventure activities",
    ],
    introNote: "Rates are based on currently available operator listings in 2024/2025 and can vary by package options.",
    sections: [
      {
        heading: "Where to do it",
        paragraphs: [
          "Nepal has two well-known bungee areas: Bhote Koshi side from Kathmandu and Kushma side from Pokhara. Both are sold as day or overnight adventure programs.",
          "Kushma has become very popular for combining bungee, swing, and nearby activity add-ons.",
        ],
      },
      {
        heading: "Cost and logistics",
        bullets: [
          "Typical jump-only ranges are often around USD 60 to 110, depending on location and package structure.",
          "Packages with transport, meals, or combo activities cost more.",
          "Travel time from Kathmandu/Pokhara should be confirmed before booking.",
        ],
        paragraphs: [
          "Always check weight limits, medical restrictions, and cancellation policy before payment.",
        ],
      },
      {
        heading: "Best season",
        paragraphs: [
          "Spring and autumn are preferred for stable weather and road conditions. Monsoon season can affect road travel times and operational windows.",
        ],
      },
      {
        heading: "Practical tips",
        bullets: [
          "Use reputable operators with clear safety standards and insurance terms.",
          "Avoid heavy meals right before your jump slot.",
          "Carry secure clothing and shoes without loose accessories.",
          "Plan return transport in advance if jumping from remote locations.",
        ],
        paragraphs: [
          "If you want a smoother day, choose packages with fixed return transport rather than ad-hoc local transfers.",
        ],
      },
    ],
    sources: [
      {
        label: "The Last Resort - Nepal bungee reference",
        url: "https://www.thelastresort.com.np/",
      },
      {
        label: "Kushma Bungee - Product and rate reference",
        url: "https://kushmabungee.com/",
      },
    ],
  },
];

export function getTourGuide(id: string): TourGuide | undefined {
  return tourGuides.find((tour) => tour.id === id);
}

export function getActivityGuide(id: string): ActivityGuide | undefined {
  return activityGuides.find((activity) => activity.id === id);
}

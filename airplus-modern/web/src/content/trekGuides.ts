export type TrekGuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type TrekGuideArticle = {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  quickKeywords: string[];
  introNote: string;
  sections: TrekGuideSection[];
  sources: { label: string; url: string }[];
};

export const trekGuides: Record<string, TrekGuideArticle> = {
  "everest-base-camp": {
    slug: "everest-base-camp",
    seoTitle: "Everest Base Camp Trek Guide (2024/2025): Cost, Difficulty, Route and Tips",
    metaDescription:
      "A practical Everest Base Camp Trek guide with route, cost, permits, packing list, and best time for trekking in Nepal.",
    quickKeywords: [
      "Everest Base Camp Trek",
      "trekking in Nepal",
      "Everest Base Camp Trek cost",
      "Everest Base Camp Trek difficulty",
      "Everest Base Camp Trek best time",
      "Everest Base Camp Trek packing list",
    ],
    introNote: "Research and price ranges are based on available 2024/2025 sources and local operator updates.",
    sections: [
      {
        heading: "What's the Everest Base Camp Trek?",
        paragraphs: [
          "Everest Base Camp Trek is the most famous teahouse trek in Nepal. It follows the Khumbu Valley from Lukla to Everest Base Camp, with an extra climb to Kala Patthar for the classic Everest view.",
          "You get big mountain scenery, Sherpa villages, monasteries, and a strong trail community. It is popular for a reason, but it is not a casual walk, especially above 4,000 meters.",
        ],
      },
      {
        heading: "The Route - Day by Day",
        paragraphs: [
          "Most itineraries run 12 to 15 days from Kathmandu to Kathmandu. A safe plan includes two acclimatization days, usually in Namche and Dingboche.",
        ],
        bullets: [
          "Day 1: Fly Kathmandu/Ramechhap to Lukla and trek to Phakding.",
          "Day 2: Phakding to Namche Bazaar via Monjo and the Sagarmatha entry gate.",
          "Day 3: Acclimatization in Namche with a short hike to Khumjung or Everest View Hotel.",
          "Day 4: Namche to Tengboche through pine forests and exposed ridge sections.",
          "Day 5: Tengboche to Dingboche, entering more open high-altitude terrain.",
          "Day 6: Acclimatization in Dingboche, often with a climb toward Nangkartshang.",
          "Day 7: Dingboche to Lobuche with steady altitude gain.",
          "Day 8: Lobuche to Gorak Shep, then hike to Everest Base Camp and return to Gorak Shep.",
          "Day 9: Sunrise on Kala Patthar, then descend to Pheriche.",
          "Day 10-12: Trek down through Namche to Lukla and fly out.",
        ],
      },
      {
        heading: "How Hard Is It?",
        paragraphs: [
          "Everest Base Camp Trek difficulty is usually rated moderate to strenuous. Daily walking is often 5 to 7 hours, and the bigger challenge is altitude, not technical climbing.",
          "You do not need mountaineering experience, but you need decent leg strength, patience, and a slow pace. Basic prep like stair workouts, long walks with a daypack, and weekend hikes helps a lot.",
        ],
      },
      {
        heading: "Best Time to Go",
        paragraphs: [
          "The Everest Base Camp Trek best time is spring (March to May) and autumn (late September to November). These windows usually give the clearest visibility and stable conditions.",
          "Winter is possible for experienced trekkers with proper gear, but mornings are very cold and flight delays are more common. Monsoon months bring cloud, rain at lower altitudes, and less reliable mountain views.",
        ],
      },
      {
        heading: "How Much Does It Cost?",
        paragraphs: [
          "Everest Base Camp Trek cost varies by style. As of 2024/2025, many guided trips land around USD 1,200 to 2,200 per person before international flights.",
          "If weather blocks Lukla flights, helicopter shuttles can raise your total quickly. Keep some emergency budget for that scenario.",
        ],
        bullets: [
          "Permits: Khumbu local permit and Sagarmatha National Park entry (roughly NPR 6,000 to 7,000 combined for most foreign trekkers).",
          "Flight: Kathmandu/Ramechhap to Lukla return commonly around USD 350 to 500 depending on season and booking.",
          "Guide: approximately USD 30 to 40 per day.",
          "Porter: approximately USD 20 to 30 per day.",
          "Teahouse room: often USD 5 to 15, but food drives most daily spending.",
          "Food and drinks: around USD 25 to 45 per day depending on altitude and habits.",
        ],
      },
      {
        heading: "What to Pack",
        paragraphs: [
          "Your Everest Base Camp Trek packing list should focus on layers and foot comfort. Pack lighter than you think, because many people regret bringing too many extra clothes.",
        ],
        bullets: [
          "Broken-in trekking boots and camp shoes.",
          "Warm down jacket, mid-layer fleece, thermal base layers, gloves, and beanie.",
          "Sleeping bag rated roughly -10C to -15C comfort for colder months.",
          "Water purification, sunscreen, lip balm, sunglasses, and personal medicine.",
          "Power bank and charging cables (charging is often paid at teahouses).",
        ],
      },
      {
        heading: "Teahouses, Food & the Vibe",
        paragraphs: [
          "Teahouses are basic but social. Rooms are simple, bathrooms vary, and hot showers are usually paid extra at many stops.",
          "Food is mostly practical trekking food: dal bhat, noodle soups, fried rice, potatoes, eggs, and tea. The vibe is friendly and international, with many people swapping weather and route updates each evening.",
        ],
      },
      {
        heading: "Permits & Getting There",
        paragraphs: [
          "For this route, trekkers usually need the Khumbu Pasang Lhamu local permit and Sagarmatha National Park entry permit. Permit rates can change, so confirm again right before travel.",
          "Most trekkers fly to Lukla. In peak periods, many flights operate through Ramechhap instead of central Kathmandu, so check your departure airport details carefully.",
        ],
      },
      {
        heading: "Tips from People Who've Done It",
        paragraphs: [
          "If this is your first high-altitude trek, keep your plan conservative and avoid rushing the early days. A calm pace is the simplest safety tool.",
        ],
        bullets: [
          "Book the first Lukla flight slot you can get to reduce weather delay risk.",
          "Use acclimatization days for short hikes, not full rest in bed.",
          "Carry enough cash from Kathmandu since ATM reliability drops on route.",
          "Keep one extra buffer day before your international flight home.",
          "Order meals early at higher villages to avoid long dinner waits in busy season.",
        ],
      },
    ],
    sources: [
      {
        label: "Nepal Tourism Board - National park and conservation area entry fee table",
        url: "https://nepaltourismboard.gov.np/plan-your-trip/before-you-come/visas-and-entry-procedure",
      },
      {
        label: "Nepal Tourism Board - TIMS Card guidance",
        url: "https://ntb.gov.np/plan-your-trip/before-you-come/TIMS%20Card",
      },
      {
        label: "Welcome Nepal - Everest Base Camp route overview",
        url: "https://www.trade.welcomenepal.com/things-to-do/trekking/everest-base-camp-trek",
      },
      {
        label: "Bookatrekking - Lukla transport logistics",
        url: "https://bookatrekking.com/en/blog/how-to-get-to-lukla/",
      },
    ],
  },

  "annapurna-base-camp": {
    slug: "annapurna-base-camp",
    seoTitle: "Annapurna Base Camp Trek Guide (2024/2025): Route, Cost, Difficulty and Permit Tips",
    metaDescription:
      "Friendly Annapurna Base Camp Trek guide with day-by-day route, cost breakdown, permit info, and practical packing advice.",
    quickKeywords: [
      "Annapurna Base Camp Trek",
      "trekking in Nepal",
      "Annapurna Base Camp Trek cost",
      "Annapurna Base Camp Trek difficulty",
      "Annapurna Base Camp Trek best time",
      "Annapurna Base Camp Trek packing list",
    ],
    introNote: "Research and prices are compiled from 2024/2025 permit tables and current operator benchmarks.",
    sections: [
      {
        heading: "What's the Annapurna Base Camp Trek?",
        paragraphs: [
          "Annapurna Base Camp Trek is a classic teahouse route in the Annapurna region. It takes you from mid-hill villages and forests into the Annapurna Sanctuary, surrounded by big peaks.",
          "It is popular because it gives a true Himalayan feel without the extreme duration of longer circuits. You get culture, mountain views, and manageable logistics from Pokhara.",
        ],
      },
      {
        heading: "The Route - Day by Day",
        paragraphs: [
          "Most routes take 7 to 11 trekking days depending on transport and start point. A common flow is from Nayapul/Jhinu side and return via the same valley.",
        ],
        bullets: [
          "Day 1: Drive from Pokhara to trailhead and trek to Ghandruk or Chhomrong area.",
          "Day 2: Continue toward Chhomrong and descend/ascend through bamboo forest zones.",
          "Day 3: Trek to Bamboo or Dovan with steady stair sections.",
          "Day 4: Reach Deurali and move above tree line.",
          "Day 5: Trek via Machhapuchhre Base Camp to Annapurna Base Camp.",
          "Day 6: Sunrise at ABC and descend toward Bamboo/Sinuwa.",
          "Day 7: Continue down to Jhinu Danda (hot spring option) and return transport.",
        ],
      },
      {
        heading: "How Hard Is It?",
        paragraphs: [
          "Annapurna Base Camp Trek difficulty is usually moderate. The elevation is lower than Everest routes, but there are many stone steps and repeated up-down sections that tire your legs.",
          "If you can comfortably walk 5 to 6 hours for several days, you can usually do well. Light training for stairs and downhill control makes the trek much easier.",
        ],
      },
      {
        heading: "Best Time to Go",
        paragraphs: [
          "Annapurna Base Camp Trek best time is March to May and September to November. Skies are often clearer, and trail temperatures are generally more comfortable.",
          "Winter can still work with proper warm gear, but snow can affect upper sections. Monsoon months are greener, but trails can be wet and leech-prone at lower elevations.",
        ],
      },
      {
        heading: "How Much Does It Cost?",
        paragraphs: [
          "As of 2024/2025, Annapurna Base Camp Trek cost often falls around USD 600 to 1,300 depending on trip length and whether you use porter support.",
          "Pokhara transport choices and guide style have the biggest effect after permits.",
        ],
        bullets: [
          "Permits: ACAP plus TIMS for many organized trekkers (roughly NPR 4,000 total for many non-SAARC trekkers).",
          "Guide: about USD 25 to 35 per day.",
          "Porter: about USD 20 to 28 per day.",
          "Meals and lodging: commonly USD 25 to 40 per day on trail.",
          "Kathmandu-Pokhara transport: budget bus, tourist bus, or short flight depending on comfort level.",
        ],
      },
      {
        heading: "What to Pack",
        paragraphs: [
          "Your Annapurna Base Camp Trek packing list should prioritize weather flexibility. Mornings at higher stops feel much colder than afternoons in the lower villages.",
        ],
        bullets: [
          "Layered clothing system and waterproof shell.",
          "Trekking poles for long stone-stair descents.",
          "Quick-dry shirts, socks, and light gloves.",
          "Basic medicine, blister care, and water treatment.",
          "Simple snacks and electrolyte powder for long days.",
        ],
      },
      {
        heading: "Teahouses, Food & the Vibe",
        paragraphs: [
          "Teahouses on this route are generally well established because ABC has steady traffic. Rooms are simple and shared dining halls are warm social spaces in the evening.",
          "Food is similar across villages: dal bhat, fried rice, pasta, soups, eggs, and tea. Expect menus to get more expensive as altitude and transport difficulty increase.",
        ],
      },
      {
        heading: "Permits & Getting There",
        paragraphs: [
          "You typically need ACAP and TIMS for this Annapurna route, as reflected in current NTB and trekking association guidance. Keep passport photos and copies ready during permit processing.",
          "Most people reach the trail from Pokhara by jeep or road transfer to the chosen start village.",
        ],
      },
      {
        heading: "Tips from People Who've Done It",
        paragraphs: [
          "ABC is beginner-friendly compared with very high routes, but your comfort still depends on pacing and footwear.",
        ],
        bullets: [
          "Start trekking early each day to avoid afternoon cloud build-up.",
          "Use trekking poles from day one, not only on the return descent.",
          "Do not skip rain protection even in peak seasons.",
          "Carry small cash notes because change can be limited in remote stops.",
          "Add one flexible day in Pokhara if weather disrupts transport.",
        ],
      },
    ],
    sources: [
      {
        label: "Welcome Nepal - Annapurna region trek overview",
        url: "https://www.trade.welcomenepal.com/things-to-do/trekking/annapurna-region-trek",
      },
      {
        label: "Nepal Tourism Board - Entry fee table",
        url: "https://nepaltourismboard.gov.np/plan-your-trip/before-you-come/visas-and-entry-procedure",
      },
      {
        label: "Nepal Tourism Board - TIMS Card",
        url: "https://ntb.gov.np/plan-your-trip/before-you-come/TIMS%20Card",
      },
      {
        label: "Third Rock Adventures - ABC cost benchmarks",
        url: "https://www.thirdrockadventures.com/blog/annapurna-base-camp-trek-cost",
      },
    ],
  },

  "annapurna-circuit": {
    slug: "annapurna-circuit",
    seoTitle: "Annapurna Circuit Trek Guide (2024/2025): Cost, Difficulty, Thorong La and Planning",
    metaDescription:
      "Detailed Annapurna Circuit Trek guide with route plan, permit costs, Thorong La difficulty, packing list, and best seasons.",
    quickKeywords: [
      "Annapurna Circuit Trek",
      "trekking in Nepal",
      "Annapurna Circuit Trek cost",
      "Annapurna Circuit Trek difficulty",
      "Annapurna Circuit Trek best time",
      "Annapurna Circuit Trek packing list",
    ],
    introNote: "Information is aligned with 2024/2025 permit tables and current route logistics reported by active operators.",
    sections: [
      {
        heading: "What's the Annapurna Circuit Trek?",
        paragraphs: [
          "Annapurna Circuit Trek is one of Nepal's most varied long routes. You pass from lower river valleys into dry high-altitude terrain and cross Thorong La Pass.",
          "People like it because scenery and culture keep changing almost every day. You see mountain villages, apple towns, Buddhist settlements, and sacred sites like Muktinath.",
        ],
      },
      {
        heading: "The Route - Day by Day",
        paragraphs: [
          "Most versions are 12 to 18 days. A common modern itinerary starts by road toward Chame and exits from Jomsom or Tatopani side.",
        ],
        bullets: [
          "Day 1: Drive from Kathmandu/Pokhara toward Chame or nearby start point.",
          "Day 2: Trek to Upper Pisang with big valley views.",
          "Day 3: Move through Ghyaru/Ngawal side to Manang for stronger acclimatization.",
          "Day 4: Acclimatization day in Manang with a side hike.",
          "Day 5: Trek to Yak Kharka or Ledar.",
          "Day 6: Trek to Thorong Phedi or High Camp.",
          "Day 7: Cross Thorong La Pass and descend to Muktinath.",
          "Day 8: Continue to Jomsom or nearby lower village.",
          "Day 9 onward: Drive or fly out, or extend toward Tatopani/Poon Hill.",
        ],
      },
      {
        heading: "How Hard Is It?",
        paragraphs: [
          "Annapurna Circuit Trek difficulty is moderate to strenuous because of distance and high-pass altitude. Thorong La day is the hardest section for most people.",
          "You do not need technical climbing skills, but you should be ready for long days and cold early starts near the pass.",
        ],
      },
      {
        heading: "Best Time to Go",
        paragraphs: [
          "The Annapurna Circuit Trek best time is usually spring and autumn. Those windows usually offer better pass conditions and clearer mountain views.",
          "Deep winter can bring heavy snow and potential pass closure. Monsoon adds rain and landslide risk on lower access roads.",
        ],
      },
      {
        heading: "How Much Does It Cost?",
        paragraphs: [
          "As of 2024/2025, Annapurna Circuit Trek cost often lands around USD 900 to 1,800 for guided teahouse style trips. Trip length and side detours like Tilicho Lake increase the total.",
          "Transport mode at the start and exit points can also change your budget a lot.",
        ],
        bullets: [
          "Permits: ACAP plus TIMS in many standard arrangements.",
          "Guide: roughly USD 25 to 35 per day.",
          "Porter: roughly USD 20 to 30 per day.",
          "Meals and lodging: around USD 25 to 45 per day, often higher above Manang.",
          "Road/air transport on start-exit legs: variable by season and route condition.",
        ],
      },
      {
        heading: "What to Pack",
        paragraphs: [
          "Your Annapurna Circuit Trek packing list should include warm layers for pass day plus sun gear for dry high terrain. Temperature swings are large.",
        ],
        bullets: [
          "Four-season style layering setup and warm gloves.",
          "Buff or face cover for dusty/windy sections.",
          "Reliable headlamp for pre-dawn pass start.",
          "Waterproof shell and backpack rain cover.",
          "Trekking poles and blister kit.",
        ],
      },
      {
        heading: "Teahouses, Food & the Vibe",
        paragraphs: [
          "Teahouses are broad and varied across this circuit. Lower villages feel greener and more agricultural, while higher villages feel more alpine and sparse.",
          "Menus are practical and repetitive, which is normal for Himalayan trails. The social side is great because many trekkers share pass-condition updates every evening.",
        ],
      },
      {
        heading: "Permits & Getting There",
        paragraphs: [
          "Most trekkers arrange ACAP and TIMS permits before heading to the trail. Carry passport copies and permit printouts since checkpoints remain common.",
          "The route is usually approached by road from Kathmandu or Pokhara, with several possible start and end points depending on weather and available days.",
        ],
      },
      {
        heading: "Tips from People Who've Done It",
        paragraphs: [
          "Good acclimatization around Manang matters more than trying to move fast.",
        ],
        bullets: [
          "Do not rush from Manang to the pass in too few days.",
          "Check pass weather at each stop before committing to High Camp.",
          "Keep extra cash because ATM access is limited and unreliable.",
          "Pack for both heat and freezing wind in the same week.",
          "If roads are rough in monsoon shoulder months, keep timing buffer.",
        ],
      },
    ],
    sources: [
      {
        label: "Welcome Nepal - Annapurna region route context",
        url: "https://www.trade.welcomenepal.com/things-to-do/trekking/annapurna-region-trek",
      },
      {
        label: "NTB - Protected area and park fees",
        url: "https://nepaltourismboard.gov.np/plan-your-trip/before-you-come/visas-and-entry-procedure",
      },
      {
        label: "Magical Nepal - Annapurna Circuit 2025 guide and pricing",
        url: "https://www.magicalnepal.com/trip/annapurna-circuit-trek/",
      },
    ],
  },

  "manaslu-circuit": {
    slug: "manaslu-circuit",
    seoTitle: "Manaslu Circuit Trek Guide (2024/2025): Restricted Permit Cost, Route and Difficulty",
    metaDescription:
      "Manaslu Circuit Trek planning guide with restricted permit rates, route breakdown, daily cost, best time, and realistic difficulty tips.",
    quickKeywords: [
      "Manaslu Circuit Trek",
      "trekking in Nepal",
      "Manaslu Circuit Trek cost",
      "Manaslu Circuit Trek difficulty",
      "Manaslu Circuit Trek best time",
      "Manaslu Circuit permit",
    ],
    introNote: "Permit rates and regulations are based on 2024/2025 restricted-area references and operator updates.",
    sections: [
      {
        heading: "What's the Manaslu Circuit Trek?",
        paragraphs: [
          "Manaslu Circuit Trek is a remote loop around Mount Manaslu in west-central Nepal. It is quieter than Everest and Annapurna classics, with strong Tibetan-influenced village culture.",
          "This trek includes the Larkya La crossing, which is long but very rewarding when weather is good. It feels more wild and less commercial than many other top routes.",
        ],
      },
      {
        heading: "The Route - Day by Day",
        paragraphs: [
          "Most itineraries take 13 to 17 days with road approach from Kathmandu to the lower trailhead. Acclimatization near Sama Gaun is a key safety step.",
        ],
        bullets: [
          "Day 1: Long drive from Kathmandu to Machha Khola area.",
          "Day 2: Trek to Jagat and complete permit checkpoint formalities.",
          "Day 3: Trek to Deng through mixed forest and village trails.",
          "Day 4: Trek to Namrung with gradual altitude gain.",
          "Day 5: Trek to Lho and Sama Gaun region.",
          "Day 6: Acclimatization day around Sama Gaun (often Manaslu Base Camp or monastery side hike).",
          "Day 7: Trek to Samdo.",
          "Day 8: Trek to Dharamsala/Larkya Phedi.",
          "Day 9: Cross Larkya La and descend to Bimthang.",
          "Day 10-12: Descend through Tilije and connect toward Dharapani/Besisahar for road return.",
        ],
      },
      {
        heading: "How Hard Is It?",
        paragraphs: [
          "Manaslu Circuit Trek difficulty is strenuous for most trekkers. The challenge comes from duration, remoteness, and the high-pass day rather than technical climbing.",
          "You should prepare for back-to-back long walking days and simpler facilities than busy mainstream trails.",
        ],
      },
      {
        heading: "Best Time to Go",
        paragraphs: [
          "The Manaslu Circuit Trek best time is spring and autumn. Trail conditions are usually better, and pass crossing is more predictable in these months.",
          "Winter snow can make Larkya La risky or blocked. Monsoon brings slippery lower trails and road disruption risk on approach roads.",
        ],
      },
      {
        heading: "How Much Does It Cost?",
        paragraphs: [
          "As of 2024/2025, Manaslu Circuit Trek cost is usually higher than standard teahouse treks, often around USD 1,400 to 2,500 depending on group size and service level.",
          "Restricted-area permits and mandatory guide arrangements are the main reasons for the higher price.",
        ],
        bullets: [
          "Restricted area permit (Manaslu): approximately USD 100 for first 7 days in peak season, plus daily extension charges; lower in off-peak periods.",
          "MCAP and ACAP permits: roughly NPR 3,000 each for many foreign trekkers.",
          "Guide is mandatory and independent solo permit processing is generally not accepted for this route.",
          "Meals and lodging: often USD 30 to 50 per day depending on altitude and logistics.",
          "Road transfers to and from trailheads can vary by season and road condition.",
        ],
      },
      {
        heading: "What to Pack",
        paragraphs: [
          "Your Manaslu Circuit packing list should be practical and weather-tolerant. Weather swings can be sharp because of altitude and route exposure.",
        ],
        bullets: [
          "Warm down layer, shell jacket, and good gloves for pass day.",
          "Water treatment and personal first-aid essentials.",
          "Reliable headlamp and spare battery.",
          "Trekking poles for long descents.",
          "Snacks because resupply options are smaller than on very busy trails.",
        ],
      },
      {
        heading: "Teahouses, Food & the Vibe",
        paragraphs: [
          "Teahouses are available throughout the route but are generally more basic than Everest mainstream villages. Expect simple rooms and practical meals, not luxury comfort.",
          "The social vibe is quieter and often feels closer to local daily life. That is a big reason people choose this route.",
        ],
      },
      {
        heading: "Permits & Getting There",
        paragraphs: [
          "Manaslu is a restricted area. You need the restricted permit, conservation permits, and a registered guide through a licensed agency arrangement.",
          "Trail access is by road from Kathmandu to the lower Gorkha-side entry, then road return after exiting the circuit.",
        ],
      },
      {
        heading: "Tips from People Who've Done It",
        paragraphs: [
          "Treat this as a remote trek and keep your plan conservative.",
        ],
        bullets: [
          "Do not cut acclimatization around Sama Gaun.",
          "Carry enough cash because digital payments are limited.",
          "Keep one weather buffer day for Larkya La crossing.",
          "Choose a guide with recent Manaslu-season experience.",
          "Prepare mentally for basic lodging in upper sections.",
        ],
      },
    ],
    sources: [
      {
        label: "Department of Immigration - Trekking permit reference",
        url: "https://www.immigration.gov.np/en/page/trekking-permit",
      },
      {
        label: "Magical Nepal - Manaslu permit updates",
        url: "https://www.magicalnepal.com/blog/manaslu-circuit-trek-permits/",
      },
      {
        label: "NTB - Conservation area entry table",
        url: "https://nepaltourismboard.gov.np/plan-your-trip/before-you-come/visas-and-entry-procedure",
      },
    ],
  },

  "mardi-himal": {
    slug: "mardi-himal",
    seoTitle: "Mardi Himal Trek Guide (2024/2025): Cost, Route, Difficulty and Packing Tips",
    metaDescription:
      "A practical Mardi Himal Trek guide with route outline, budget ranges, permit details, and simple advice for first-time trekking in Nepal.",
    quickKeywords: [
      "Mardi Himal Trek",
      "trekking in Nepal",
      "Mardi Himal Trek cost",
      "Mardi Himal Trek difficulty",
      "Mardi Himal Trek best time",
      "Mardi Himal Trek packing list",
    ],
    introNote: "Cost and permit references reflect 2024/2025 Annapurna-region trekking updates.",
    sections: [
      {
        heading: "What's the Mardi Himal Trek?",
        paragraphs: [
          "Mardi Himal Trek is a shorter Annapurna-region route known for ridge walking and close Machhapuchhre views. It is often chosen by travelers who want a mountain trek but have limited time.",
          "Compared with major classics, the trail can feel quieter and more compact while still delivering strong alpine scenery.",
        ],
      },
      {
        heading: "The Route - Day by Day",
        paragraphs: [
          "Most itineraries take 5 to 9 days depending on whether you start from Pokhara and how slowly you pace your ascent.",
        ],
        bullets: [
          "Day 1: Drive to Kande/Phedi and trek to Deurali or Forest Camp.",
          "Day 2: Trek through forest to Low Camp.",
          "Day 3: Continue along the ridge to High Camp.",
          "Day 4: Early hike to Mardi Viewpoint/Base Camp area, then descend to Low Camp or Siding side.",
          "Day 5: Trek down and drive back to Pokhara.",
        ],
      },
      {
        heading: "How Hard Is It?",
        paragraphs: [
          "Mardi Himal Trek difficulty is usually easy to moderate for fit walkers, though final ridge sections feel harder because of altitude and steep gradients.",
          "You do not need technical skills. Consistent uphill walking and basic endurance are enough for most people.",
        ],
      },
      {
        heading: "Best Time to Go",
        paragraphs: [
          "The Mardi Himal Trek best time is spring and autumn for clearer mountain visibility. Winter can also work with proper insulation, especially on shorter itineraries.",
          "Monsoon is possible but trails can be muddy and cloud cover is common.",
        ],
      },
      {
        heading: "How Much Does It Cost?",
        paragraphs: [
          "As of 2024/2025, Mardi Himal Trek cost often falls around USD 450 to 900 for standard guided plans from Pokhara/Kathmandu.",
          "It is usually one of the more affordable Annapurna high-view treks.",
        ],
        bullets: [
          "Permits: ACAP and TIMS in many standard setups.",
          "Guide: around USD 25 to 35 per day.",
          "Porter (optional): around USD 20 to 28 per day.",
          "Meals and lodging: roughly USD 20 to 35 per day.",
          "Transport to trailhead and back from Pokhara: generally affordable by jeep or local transfer.",
        ],
      },
      {
        heading: "What to Pack",
        paragraphs: [
          "A smart Mardi Himal packing list is light but warm. Most people overpack clothing and underpack weather protection.",
        ],
        bullets: [
          "Light layers plus one warm insulated jacket.",
          "Rain shell and backpack cover.",
          "Trekking poles for knee-friendly descents.",
          "Warm hat and gloves for pre-dawn viewpoint hike.",
          "Headlamp and refillable water bottle.",
        ],
      },
      {
        heading: "Teahouses, Food & the Vibe",
        paragraphs: [
          "Teahouses are simple and more limited than on very busy treks, especially in upper stops. Food menus are practical with dal bhat, noodles, and tea-house staples.",
          "The route has a peaceful rhythm, and many trekkers like it because it still feels less crowded.",
        ],
      },
      {
        heading: "Permits & Getting There",
        paragraphs: [
          "You generally arrange ACAP and TIMS before heading to the trail. Permit workflows can shift, so reconfirm at your agency or permit office before departure.",
          "Trail access is straightforward from Pokhara by short road transfer.",
        ],
      },
      {
        heading: "Tips from People Who've Done It",
        paragraphs: [
          "This trek is short, so pacing mistakes can happen if people climb too fast on day one.",
        ],
        bullets: [
          "Stay one night at intermediate camp instead of rushing straight to High Camp.",
          "Start summit/viewpoint hike very early for the best visibility.",
          "Bring cash since card payment is rare on the trail.",
          "Keep leech socks in monsoon shoulder months.",
          "Use Pokhara gear shops for last-minute rentals to keep your bag light.",
        ],
      },
    ],
    sources: [
      {
        label: "NTB - ACAP fee reference",
        url: "https://nepaltourismboard.gov.np/plan-your-trip/before-you-come/visas-and-entry-procedure",
      },
      {
        label: "NTB - TIMS card details",
        url: "https://ntb.gov.np/plan-your-trip/before-you-come/TIMS%20Card",
      },
      {
        label: "Hike On Nepal - Mardi Himal trek package benchmark",
        url: "https://hikeonnepal.com/trip/mardi-himal-trek",
      },
    ],
  },

  "poon-hill": {
    slug: "poon-hill",
    seoTitle: "Poon Hill Trek Guide (2024/2025): Cost, Difficulty, Sunrise Route and Packing List",
    metaDescription:
      "Simple Poon Hill Trek guide with route, permit info, realistic costs, and beginner-friendly planning advice for trekking in Nepal.",
    quickKeywords: [
      "Poon Hill Trek",
      "trekking in Nepal",
      "Poon Hill Trek cost",
      "Poon Hill Trek difficulty",
      "Poon Hill Trek best time",
      "Poon Hill Trek packing list",
    ],
    introNote: "Data reflects 2024/2025 permit references and current itinerary/cost benchmarks from active Nepal operators.",
    sections: [
      {
        heading: "What's the Poon Hill Trek?",
        paragraphs: [
          "Poon Hill Trek (often called Ghorepani Poon Hill) is one of Nepal's most popular short treks. It is known for sunrise views of Annapurna and Dhaulagiri ranges.",
          "It is a great entry route for people new to trekking in Nepal because the altitude is moderate and logistics are simple from Pokhara.",
        ],
      },
      {
        heading: "The Route - Day by Day",
        paragraphs: [
          "Most itineraries are 4 to 8 days depending on your transport and whether you include Ghandruk side villages.",
        ],
        bullets: [
          "Day 1: Drive from Pokhara to Nayapul/Ulleri area and trek to first village stop.",
          "Day 2: Trek through forest and stone steps to Ghorepani.",
          "Day 3: Early sunrise hike to Poon Hill, then trek toward Tadapani or Ghandruk.",
          "Day 4: Descend to roadhead and return to Pokhara.",
        ],
      },
      {
        heading: "How Hard Is It?",
        paragraphs: [
          "Poon Hill Trek difficulty is easy to moderate. The altitude is manageable, but the stair sections are still a good leg workout.",
          "Most healthy travelers can do it with a little pre-trip walking practice.",
        ],
      },
      {
        heading: "Best Time to Go",
        paragraphs: [
          "Poon Hill Trek best time is spring and autumn when visibility is usually strongest. Rhododendron bloom in spring adds color to the forest sections.",
          "Winter is quieter and still possible, but mornings at sunrise viewpoint can be very cold.",
        ],
      },
      {
        heading: "How Much Does It Cost?",
        paragraphs: [
          "As of 2024/2025, Poon Hill Trek cost is often around USD 350 to 800 depending on guide support and itinerary length.",
          "It is one of the best value treks for first-time visitors.",
        ],
        bullets: [
          "Permits: ACAP and TIMS in common arrangements.",
          "Guide: around USD 25 to 35 per day.",
          "Meals and lodging: often USD 20 to 35 per day.",
          "Pokhara trail transport: relatively low compared with flight-based routes.",
        ],
      },
      {
        heading: "What to Pack",
        paragraphs: [
          "Your Poon Hill packing list can be lighter than high-altitude expeditions, but mornings still require warm layers.",
        ],
        bullets: [
          "Comfortable trekking shoes with good grip.",
          "Fleece/down layer for sunrise hike.",
          "Rain layer and sun protection.",
          "Reusable water bottle and basic medicine.",
          "Trekking poles if stairs bother your knees.",
        ],
      },
      {
        heading: "Teahouses, Food & the Vibe",
        paragraphs: [
          "Teahouses are widely available and generally comfortable for a short trek. Dining rooms are friendly and often lively in peak season.",
          "Food is familiar and simple, with dal bhat, momos, soups, and eggs common everywhere.",
        ],
      },
      {
        heading: "Permits & Getting There",
        paragraphs: [
          "Most trekkers arrange ACAP and TIMS before going. Permit checks are common near entry points.",
          "From Pokhara, road transfer to trailheads is straightforward and makes this trek easy to fit into short itineraries.",
        ],
      },
      {
        heading: "Tips from People Who've Done It",
        paragraphs: [
          "Poon Hill is short, so timing and weather windows matter more than people think.",
        ],
        bullets: [
          "Choose your sunrise day with a favorable forecast if you have flexibility.",
          "Sleep early at Ghorepani because the viewpoint hike starts before dawn.",
          "Bring a warm hat and gloves even in shoulder seasons.",
          "Carry small cash notes for tea houses and local snacks.",
          "If you have extra time, include Ghandruk for a richer cultural stop.",
        ],
      },
    ],
    sources: [
      {
        label: "NTB - Annapurna permit fee reference",
        url: "https://nepaltourismboard.gov.np/plan-your-trip/before-you-come/visas-and-entry-procedure",
      },
      {
        label: "Magical Nepal - Poon Hill guide and cost range",
        url: "https://www.magicalnepal.com/blog/poon-hill-trek/",
      },
      {
        label: "Haven Holidays - Poon Hill permits",
        url: "https://www.havenholidaysnepal.com/blogs/poon-hill-trek-permits",
      },
    ],
  },

  "gokyo-lake": {
    slug: "gokyo-lake",
    seoTitle: "Gokyo Lakes Trek Guide (2024/2025): Cost, Route, Difficulty and Permit Details",
    metaDescription:
      "Complete Gokyo Lakes Trek guide covering route, prices, permits, teahouses, and practical tips for trekking in Nepal.",
    quickKeywords: [
      "Gokyo Lakes Trek",
      "trekking in Nepal",
      "Gokyo Lakes Trek cost",
      "Gokyo Lakes Trek difficulty",
      "Gokyo Lakes Trek best time",
      "Gokyo Lakes Trek packing list",
    ],
    introNote: "Pricing and permit details are based on available 2024/2025 Khumbu-region references.",
    sections: [
      {
        heading: "What's the Gokyo Lakes Trek?",
        paragraphs: [
          "Gokyo Lakes Trek is a Khumbu route focused on glacial lakes, high valleys, and the Gokyo Ri viewpoint. It is often chosen as a quieter alternative to the main Everest Base Camp corridor.",
          "The scenery feels very open and alpine, with wide valley views and a strong sense of space.",
        ],
      },
      {
        heading: "The Route - Day by Day",
        paragraphs: [
          "Many itineraries run about 12 to 14 days. You share the Lukla entry with Everest treks, then branch toward the Gokyo side valley.",
        ],
        bullets: [
          "Day 1: Fly to Lukla and trek to Phakding.",
          "Day 2: Trek to Namche Bazaar.",
          "Day 3: Acclimatization day in Namche.",
          "Day 4: Trek to Dole or Phortse Thenga area.",
          "Day 5: Continue to Machhermo.",
          "Day 6: Reach Gokyo village and lakes.",
          "Day 7: Early hike to Gokyo Ri and optional higher lake exploration.",
          "Day 8 onward: Return via Dole/Namche to Lukla and fly out.",
        ],
      },
      {
        heading: "How Hard Is It?",
        paragraphs: [
          "Gokyo Lakes Trek difficulty is moderate to strenuous. The trail is not technical, but altitude and cold mornings become the main challenge above Namche.",
          "Anyone planning this route should train for multi-day walking and respect acclimatization.",
        ],
      },
      {
        heading: "Best Time to Go",
        paragraphs: [
          "The Gokyo Lakes Trek best time is spring and autumn for clearer high-altitude visibility. These seasons usually give better viewpoint conditions on Gokyo Ri.",
          "Winter is possible with proper gear, but very cold nights and occasional route ice should be expected.",
        ],
      },
      {
        heading: "How Much Does It Cost?",
        paragraphs: [
          "As of 2024/2025, Gokyo Lakes Trek cost commonly falls around USD 900 to 1,700 depending on services and weather-related flight disruptions.",
          "Like Everest routes, unexpected Lukla transport changes can affect budget.",
        ],
        bullets: [
          "Permits: Khumbu local permit plus Sagarmatha National Park entry.",
          "Flights to/from Lukla: often a major fixed cost component.",
          "Guide and porter rates: similar to Everest region standards.",
          "Meals and lodging: generally USD 25 to 45 per day.",
        ],
      },
      {
        heading: "What to Pack",
        paragraphs: [
          "Your Gokyo Lakes packing list should mirror Everest region layering needs, including good insulation and sun protection.",
        ],
        bullets: [
          "Insulated jacket, thermal base layers, and windproof shell.",
          "Warm gloves, beanie, and buff.",
          "Trekking boots already broken in before arrival.",
          "Water treatment and hydration setup.",
          "Power bank and backup charger cable.",
        ],
      },
      {
        heading: "Teahouses, Food & the Vibe",
        paragraphs: [
          "Teahouses are available across the route, though options are fewer than the main EBC trail. Facilities are basic and prices increase with altitude.",
          "Food is practical and repetitive, but usually enough for steady trekking energy.",
        ],
      },
      {
        heading: "Permits & Getting There",
        paragraphs: [
          "Current permit setup usually includes Khumbu municipality and Sagarmatha park permits; TIMS handling can vary by route arrangement, so reconfirm before travel.",
          "Access starts with the Lukla flight, then onward trekking through Namche before branching toward Gokyo.",
        ],
      },
      {
        heading: "Tips from People Who've Done It",
        paragraphs: [
          "This route rewards patient pacing and early starts.",
        ],
        bullets: [
          "Keep your Gokyo Ri hike for a clear forecast morning.",
          "Protect electronics from cold overnight temperatures.",
          "Budget extra for occasional flight delays in/out of Lukla.",
          "Eat and hydrate consistently even when appetite drops at altitude.",
          "Carry enough cash from Kathmandu before flying out.",
        ],
      },
    ],
    sources: [
      {
        label: "NTB - National park fee table",
        url: "https://nepaltourismboard.gov.np/plan-your-trip/before-you-come/visas-and-entry-procedure",
      },
      {
        label: "Himalaya Social Journey - Gokyo package benchmark",
        url: "https://himalayasocialjourney.com/trip/gokyo-lake-trek",
      },
      {
        label: "Magical Nepal - Everest + Gokyo pricing reference",
        url: "https://www.magicalnepal.com/trip/everest-base-camp-gokyo-lakes-trek/",
      },
    ],
  },

  "langtang-valley": {
    slug: "langtang-valley",
    seoTitle: "Langtang Valley Trek Guide (2024/2025): Route, Cost, Difficulty and Permit Info",
    metaDescription:
      "Langtang Valley Trek planning guide with itinerary, costs, permits, difficulty, and practical tips for trekking in Nepal.",
    quickKeywords: [
      "Langtang Valley Trek",
      "trekking in Nepal",
      "Langtang Valley Trek cost",
      "Langtang Valley Trek difficulty",
      "Langtang Valley Trek best time",
      "Langtang Valley Trek packing list",
    ],
    introNote: "Permit rates and logistics are based on 2024/2025 references from official fee tables and active trip operators.",
    sections: [
      {
        heading: "What's the Langtang Valley Trek?",
        paragraphs: [
          "Langtang Valley Trek is a short-to-medium Himalayan trek north of Kathmandu. It combines easy access, strong mountain scenery, and Tamang culture in one route.",
          "Many travelers choose it when they want a real trekking experience without Lukla flights.",
        ],
      },
      {
        heading: "The Route - Day by Day",
        paragraphs: [
          "Typical itineraries are 7 to 10 days of trekking plus road transfers. Most routes start and end at Syabrubesi.",
        ],
        bullets: [
          "Day 1: Drive Kathmandu to Syabrubesi.",
          "Day 2: Trek to Lama Hotel through river valley forest.",
          "Day 3: Trek to Langtang Village.",
          "Day 4: Trek to Kyanjin Gompa.",
          "Day 5: Acclimatization side hike (Kyanjin Ri or Tserko Ri depending on fitness and weather).",
          "Day 6: Descend to Lama Hotel.",
          "Day 7: Descend to Syabrubesi and drive back to Kathmandu.",
        ],
      },
      {
        heading: "How Hard Is It?",
        paragraphs: [
          "Langtang Valley Trek difficulty is usually moderate. Trails are clear and non-technical, but there are sustained uphill days.",
          "If you can walk 5 to 6 hours daily with a small daypack, this trek is very achievable.",
        ],
      },
      {
        heading: "Best Time to Go",
        paragraphs: [
          "The Langtang Valley Trek best time is spring and autumn for clearer weather and better visibility. Spring adds flowering forests in lower sections.",
          "Winter is possible with proper gear, but high viewpoint side hikes can be cold and snowy.",
        ],
      },
      {
        heading: "How Much Does It Cost?",
        paragraphs: [
          "As of 2024/2025, Langtang Valley Trek cost often falls around USD 600 to 1,200 for guided plans from Kathmandu.",
          "Since transport is by road, budget control is usually easier than flight-based treks.",
        ],
        bullets: [
          "Permits: Langtang National Park plus TIMS in many setups.",
          "Guide: approximately USD 25 to 35 per day.",
          "Porter (optional): approximately USD 20 to 28 per day.",
          "Meals and lodging: roughly USD 20 to 35 per day.",
          "Kathmandu-Syabrubesi transport: by shared jeep, private jeep, or bus.",
        ],
      },
      {
        heading: "What to Pack",
        paragraphs: [
          "Your Langtang packing list should balance warm layers with lightweight essentials. Nights near Kyanjin can be cold.",
        ],
        bullets: [
          "Layered clothing and weatherproof outer shell.",
          "Comfortable boots with good grip.",
          "Warm hat, gloves, and sun protection.",
          "Trekking poles for descent comfort.",
          "Personal medicine and water treatment.",
        ],
      },
      {
        heading: "Teahouses, Food & the Vibe",
        paragraphs: [
          "Teahouses are available throughout the main route and are generally simple but welcoming. Dining spaces are social and relaxed.",
          "Food is similar to other Nepal treks: dal bhat, soups, noodles, potatoes, eggs, and tea.",
        ],
      },
      {
        heading: "Permits & Getting There",
        paragraphs: [
          "Most trekkers need Langtang National Park entry and TIMS documentation based on current route guidance. Reconfirm permit workflow before departure because rules can update.",
          "The trek is accessed by road from Kathmandu to Syabrubesi, which keeps logistics straightforward.",
        ],
      },
      {
        heading: "Tips from People Who've Done It",
        paragraphs: [
          "Langtang is friendly for first-time trekkers, but pacing still matters.",
        ],
        bullets: [
          "Start hikes early to finish before afternoon cloud and wind.",
          "Use one acclimatization day in Kyanjin before bigger viewpoint climbs.",
          "Carry cash because ATM access is very limited after leaving Kathmandu.",
          "Keep one backup day in case road conditions slow transfers.",
          "Pack light and rent gear in Kathmandu if needed.",
        ],
      },
    ],
    sources: [
      {
        label: "NTB - National park and conservation permit table",
        url: "https://nepaltourismboard.gov.np/plan-your-trip/before-you-come/visas-and-entry-procedure",
      },
      {
        label: "NTB - TIMS route and fee page",
        url: "https://ntb.gov.np/plan-your-trip/before-you-come/TIMS%20Card",
      },
      {
        label: "Himalayan Glacier - Langtang Valley trek benchmark",
        url: "https://www.himalayanglacier.com/trips/langtang-valley-trek/",
      },
    ],
  },
};

export function getTrekGuide(slug: string): TrekGuideArticle | undefined {
  return trekGuides[slug];
}

export const popularTrekSlugs = [
  "everest-base-camp",
  "annapurna-base-camp",
  "annapurna-circuit",
  "langtang-valley",
  "manaslu-circuit",
  "gokyo-lake",
  "mardi-himal",
  "poon-hill",
] as const;

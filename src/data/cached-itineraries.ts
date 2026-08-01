import { TripItinerary } from "@/lib/schemas/itinerary";

export const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "Delhi": { lat: 28.6139, lng: 77.2090 },
  "Jaipur": { lat: 26.9124, lng: 75.7873 },
  "Agra": { lat: 27.1751, lng: 78.0421 },
  "Varanasi": { lat: 25.3176, lng: 82.9739 },
  "Kerala": { lat: 9.9312, lng: 76.2673 },
  "Mumbai": { lat: 18.9220, lng: 72.8347 },
  "Udaipur": { lat: 24.5854, lng: 73.7125 },
  "Goa": { lat: 15.2993, lng: 74.1240 },
  "Amritsar": { lat: 31.6340, lng: 74.8723 },
  "Ladakh": { lat: 34.1526, lng: 77.5771 },
  "Rishikesh": { lat: 30.0869, lng: 78.2676 },
};

export const PRESET_ITINERARIES: Record<string, TripItinerary> = {
  "Jaipur": {
    tripTitle: "Royal Heritage Yatra of the Pink City",
    destination: "Jaipur",
    durationDays: 3,
    budgetTier: "Moderate",
    travelStyle: "Couple",
    totalEstimatedCostINR: 18500,
    packingTips: [
      "Light cotton clothes and comfortable walking shoes for forts",
      "Sunscreen, sunglasses, and a wide-brim hat",
      "Camera for capturing intricate Rajasthani archways",
    ],
    dailyItinerary: [
      {
        dayNumber: 1,
        theme: "Winds of Forts & Citadels",
        locationName: "Amber Fort & Hawa Mahal",
        lat: 26.9855,
        lng: 75.8513,
        activities: {
          morning: {
            name: "Amber Fort Elephant & Jeep Ascent",
            description: "Explore the mirror-work Sheesh Mahal and hilltop ramparts of the majestic 16th-century fortress.",
            location: "Amer, Jaipur",
            timeSlot: "08:30 AM - 11:30 AM",
          },
          afternoon: {
            name: "Panna Meena ka Kund & Jal Mahal View",
            description: "Visit the geometric stepwell step-architecture and photography stop at the Water Palace.",
            location: "Amer Road",
            timeSlot: "01:00 PM - 03:30 PM",
          },
          evening: {
            name: "Sunset at Nahargarh Fort",
            description: "Watch the golden sun dip over the pink rooftops of Jaipur from the highest fort edge.",
            location: "Nahargarh Fort",
            timeSlot: "05:00 PM - 07:30 PM",
          },
        },
        food: [
          { meal: "Breakfast", suggestion: "Pyaaz Kachori & Masala Chai at Rawat Mishthan Bhandar", cuisine: "Rajasthani Street Food" },
          { meal: "Lunch", suggestion: "Laal Maas & Bajre ki Roti at 1135 AD inside Amber Fort", cuisine: "Royal Rajputana" },
          { meal: "Dinner", suggestion: "Thali feast at Chokhi Dhani ethnic village", cuisine: "Authentic Rajasthani Thali" },
        ],
        stay: "Heritage Haveli stay near Johari Bazaar (e.g. Samode Haveli / Shahpura House)",
        transportTip: "Pre-book a private AC auto-rickshaw or taxi driver for the day's fort loop.",
        estimatedCostINR: 6500,
      },
      {
        dayNumber: 2,
        theme: "Palaces, Astronomy & Artisan Bazaars",
        locationName: "City Palace & Jantar Mantar",
        lat: 26.9258,
        lng: 75.8237,
        activities: {
          morning: {
            name: "City Palace & Peacock Courtyard",
            description: "Admire royal garments, armor, and the iconic blue-tiled Pritam Niwas Chowk doors.",
            location: "Old City, Jaipur",
            timeSlot: "09:00 AM - 11:30 AM",
          },
          afternoon: {
            name: "Jantar Mantar UNESCO Sundial",
            description: "Discover the world's largest stone astronomical observatory built by King Sawai Jai Singh II.",
            location: "City Palace Complex",
            timeSlot: "12:00 PM - 02:00 PM",
          },
          evening: {
            name: "Block Printing & Johari Bazaar Shopping",
            description: "Shop for gemstone jewelry, Bandhani sarees, and witness live woodblock textile art.",
            location: "Johari Bazaar & Bapu Bazaar",
            timeSlot: "04:30 PM - 08:00 PM",
          },
        },
        food: [
          { meal: "Breakfast", suggestion: "Mirchi Bada & Jalebi at Sodhani Sweets", cuisine: "Street Snacks" },
          { meal: "Lunch", suggestion: "Ker Sangri & Gatte ki Sabzi at Handi Restaurant", cuisine: "Traditional Rajasthani" },
          { meal: "Dinner", suggestion: "Rooftop dining overlooking Hawa Mahal at Tattoo Cafe", cuisine: "Indo-Continental" },
        ],
        stay: "Heritage Haveli stay near Johari Bazaar",
        transportTip: "Old City streets are best explored on foot or via electric rickshaws.",
        estimatedCostINR: 6000,
      },
      {
        dayNumber: 3,
        theme: "Royal Tombs & Spiritual Sunset",
        locationName: "Gaitore ki Chhatriyan & Galta Ji",
        lat: 26.9421,
        lng: 75.8361,
        activities: {
          morning: {
            name: "Royal Cenotaphs at Gaitore ki Chhatriyan",
            description: "Marvel at intricately carved white marble cenotaphs nestled against the Aravalli hills.",
            location: "Foothills of Nahargarh",
            timeSlot: "09:00 AM - 11:00 AM",
          },
          afternoon: {
            name: "Albert Hall Museum",
            description: "Inspect Indo-Saracenic architecture housing ancient metalware, carpets, and Egyptian mummies.",
            location: "Ram Niwas Garden",
            timeSlot: "12:30 PM - 03:00 PM",
          },
          evening: {
            name: "Galta Ji Monkey Temple & Birla Mandir Aarti",
            description: "Visit ancient natural springs in the mountain pass followed by evening marble temple light aarti.",
            location: "Galta Ji & Tilak Nagar",
            timeSlot: "04:30 PM - 07:30 PM",
          },
        },
        food: [
          { meal: "Breakfast", suggestion: "Samosa & Cold Coffee at Lassiwala MI Road", cuisine: "Famous Jaipur Dairy" },
          { meal: "Lunch", suggestion: "Rajasthani Thali at Laxmi Mishthan Bhandar (LMB)", cuisine: "Pure Veg Heritage" },
          { meal: "Dinner", suggestion: "Courtyard dining at Bar Palladio", cuisine: "Italian-Rajasthani Fusion" },
        ],
        stay: "Heritage Haveli stay near Johari Bazaar",
        transportTip: "Use app cabs (Uber/Ola) for city transitions across Johari Bazaar to Tilak Nagar.",
        estimatedCostINR: 6000,
      },
    ],
  },

  "Kerala": {
    tripTitle: "Serene Backwaters & Misty Tea Hills",
    destination: "Kerala",
    durationDays: 5,
    budgetTier: "Luxury",
    travelStyle: "Couple",
    totalEstimatedCostINR: 42000,
    packingTips: [
      "Breathable linen wear, light cardigan for Munnar hills",
      "Mosquito repellent and waterproof cover for electronics",
      "Traditional Kasavu saree / dhoti for temple visits",
    ],
    dailyItinerary: [
      {
        dayNumber: 1,
        theme: "Colonial Spice Port & Chinese Net Sunset",
        locationName: "Fort Kochi",
        lat: 9.9656,
        lng: 76.2421,
        activities: {
          morning: {
            name: "St. Francis Church & Mattancherry Palace",
            description: "Walk past Vasco da Gama's burial place and inspect Ramayana murals in Dutch Palace.",
            location: "Fort Kochi",
            timeSlot: "09:00 AM - 12:00 PM",
          },
          afternoon: {
            name: "Jew Town & Antique Spice Warehouses",
            description: "Browse aromatic cardamom and pepper market shops near Paradesi Synagogue.",
            location: "Mattancherry",
            timeSlot: "01:30 PM - 04:00 PM",
          },
          evening: {
            name: "Sunset Chinese Fishing Nets & Kathakali Show",
            description: "Watch historic cantilevered wooden nets lower at dusk followed by facial makeup & dance show.",
            location: "Kochi Seafront & Kerala Kathakali Centre",
            timeSlot: "05:30 PM - 08:00 PM",
          },
        },
        food: [
          { meal: "Breakfast", suggestion: "Appam with Stew at Kashi Art Cafe", cuisine: "Kerala-Continental" },
          { meal: "Lunch", suggestion: "Meen Pollichathu (Banana Leaf Fish Roast) at Old Harbour Hotel", cuisine: "Coastal Malabar" },
          { meal: "Dinner", suggestion: "Seafood platter at Seagull Restaurant overlooking harbour", cuisine: "Fresh Catch Seafood" },
        ],
        stay: "Heritage Colonial Villa at Fort Kochi",
        transportTip: "Explore Fort Kochi & Mattancherry by foot or bicycle.",
        estimatedCostINR: 8500,
      },
      {
        dayNumber: 2,
        theme: "Ascent to Tea Gardens & Cloud Misty Peaks",
        locationName: "Munnar Tea Country",
        lat: 10.0889,
        lng: 77.0595,
        activities: {
          morning: {
            name: "Scenic Drive Kochi to Munnar",
            description: "Drive through Cheeyappara and Valara waterfalls amidst spice plantations.",
            location: "Western Ghats highway",
            timeSlot: "08:00 AM - 12:00 PM",
          },
          afternoon: {
            name: "Tea Museum & Plantation Walk",
            description: "Learn tea processing history from orthodox manufacturing to black tea tasting.",
            location: "KDHP Tea Estate, Munnar",
            timeSlot: "02:00 PM - 04:30 PM",
          },
          evening: {
            name: "Top Station Viewpoint & Sunset Clouds",
            description: "Soak in panoramic views of Tamil Nadu valleys meeting Kerala cloud belts.",
            location: "Top Station, Munnar",
            timeSlot: "05:00 PM - 06:30 PM",
          },
        },
        food: [
          { meal: "Breakfast", suggestion: "Puttu and Kadala Curry at Highway Diner", cuisine: "Keralite Breakfast" },
          { meal: "Lunch", suggestion: "Kerala Meals with Avial and Thoran at Rapsy Restaurant", cuisine: "Traditional Sadya" },
          { meal: "Dinner", suggestion: "Campfire Barbecue at Hill Resort", cuisine: "Grilled Delights" },
        ],
        stay: "Luxury Tea Resort in Munnar Hills",
        transportTip: "Private SUV recommended for steep mountain hairpin turns.",
        estimatedCostINR: 9000,
      },
      {
        dayNumber: 3,
        theme: "Wildlife Sanctuary & Spice Plantation",
        locationName: "Thekkady & Periyar",
        lat: 9.6031,
        lng: 77.1615,
        activities: {
          morning: {
            name: "Periyar Lake Boat Safari",
            description: "Cruise Periyar National Park waters looking for wild elephants, gaur, and sambar deer.",
            location: "Periyar Tiger Reserve",
            timeSlot: "07:00 AM - 10:00 AM",
          },
          afternoon: {
            name: "Organic Spice Garden Guided Walk",
            description: "Smell fresh vanilla pods, nutmeg, cloves, and learn Ayurveda herb cultivation.",
            location: "Kumily",
            timeSlot: "01:30 PM - 03:30 PM",
          },
          evening: {
            name: "Kalaripayattu Martial Arts Performance",
            description: "Watch India's oldest combat art form featuring swords, shields, and fire hoops.",
            location: "Kadathanadan Kalari Centre",
            timeSlot: "06:00 PM - 07:15 PM",
          },
        },
        food: [
          { meal: "Breakfast", suggestion: "Idiyappam with Egg Roast", cuisine: "Kerala Homestyle" },
          { meal: "Lunch", suggestion: "Cardamom-scented Chicken Curry with Red Rice", cuisine: "Highland Spice Cuisine" },
          { meal: "Dinner", suggestion: "Bamboo Biryani at Bamboo Cafe", cuisine: "Tribal Specialty" },
        ],
        stay: "Eco Spice Jungle Lodge at Thekkady",
        transportTip: "Book Periyar boat tickets online 2 weeks in advance.",
        estimatedCostINR: 8000,
      },
      {
        dayNumber: 4,
        theme: "Overnight Luxury Houseboat Cruise",
        locationName: "Alleppey (Alappuzha)",
        lat: 9.4981,
        lng: 76.3388,
        activities: {
          morning: {
            name: "Board Private Kettuvallam Houseboat",
            description: "Check into traditional wooden houseboat equipped with air-conditioned luxury bedrooms.",
            location: "Punnamada Jetty, Alleppey",
            timeSlot: "11:30 AM",
          },
          afternoon: {
            name: "Cruising Palm-Fringed Canals & Paddy Fields",
            description: "Glide past village life, duck farmers, and ancient wooden bridges in Vembanad Lake.",
            location: "Backwaters of Alleppey",
            timeSlot: "12:00 PM - 05:30 PM",
          },
          evening: {
            name: "Sunset Anchoring & Fresh Karimeen Dinner",
            description: "Watch golden reflections on calm waters while chef prepares fresh pearl spot fish.",
            location: "Quiet Lagoon Anchorage",
            timeSlot: "06:00 PM - 09:00 PM",
          },
        },
        food: [
          { meal: "Breakfast", suggestion: "Dosa with Coconut Chutney on Board", cuisine: "South Indian" },
          { meal: "Lunch", suggestion: "On-Board Freshly Cooked Sadya on Banana Leaf", cuisine: "Boat Chef Sadya" },
          { meal: "Dinner", suggestion: "Karimeen Fry & Malabar Parotta prepared on Houseboat", cuisine: "Freshwater Delicacy" },
        ],
        stay: "Private Premium Houseboat (Overnight Stay)",
        transportTip: "Houseboat stays anchored from 5:30 PM to 7:30 AM per maritime regulations.",
        estimatedCostINR: 11500,
      },
      {
        dayNumber: 5,
        theme: "Beachside Relaxation & Ayurvedic Rejuvenation",
        locationName: "Marari Beach",
        lat: 9.6015,
        lng: 76.2840,
        activities: {
          morning: {
            name: "Disembark & Transfer to Marari Beach",
            description: "Walk along pristine white sands lined with coconut palms.",
            location: "Mararikulam",
            timeSlot: "09:00 AM - 12:00 PM",
          },
          afternoon: {
            name: "Authentic Abhyanga Ayurvedic Massage",
            description: "Rejuvenate with warm herbal oil therapy by licensed Vaidya practitioners.",
            location: "Marari Ayurveda Spa",
            timeSlot: "02:00 PM - 04:00 PM",
          },
          evening: {
            name: "Arabian Sea Sunset & Departure Transfer",
            description: "Catch final golden sunset before returning to Kochi Airport.",
            location: "Marari Beachfront",
            timeSlot: "05:00 PM - 07:00 PM",
          },
        },
        food: [
          { meal: "Breakfast", suggestion: "Banana Pancakes & Fresh Tender Coconut Water", cuisine: "Beach Cafe" },
          { meal: "Lunch", suggestion: "Prawns Curry with Steam Rice", cuisine: "Coastal Seafood" },
          { meal: "Dinner", suggestion: "Light Coconut Soups & Grilled Vegetables", cuisine: "Wellness Cuisine" },
        ],
        stay: "Beachfront Villa Resort",
        transportTip: "Allow 2 hours for transfer from Marari to Cochin International Airport (COK).",
        estimatedCostINR: 5000,
      },
    ],
  },

  "Varanasi": {
    tripTitle: "Spiritual Awakening on the Holy Ganges",
    destination: "Varanasi",
    durationDays: 4,
    budgetTier: "Moderate",
    travelStyle: "Solo",
    totalEstimatedCostINR: 19000,
    packingTips: [
      "Modest attire covering shoulders and knees for temple entry",
      "Slip-on shoes for frequent temple visits",
      "Small flashlight/headlamp for navigating narrow night alleys (galiyan)",
    ],
    dailyItinerary: [
      {
        dayNumber: 1,
        theme: "Eternal Ghats & Grand Evening Ganga Aarti",
        locationName: "Dashashwamedh Ghat",
        lat: 25.3076,
        lng: 83.0104,
        activities: {
          morning: {
            name: "Ghats Walking Tour from Assi to Dashashwamedh",
            description: "Walk the ancient stone steps along the sacred river observing morning prayers and sadhus.",
            location: "Assi Ghat to Dashashwamedh Ghat",
            timeSlot: "08:30 AM - 11:30 AM",
          },
          afternoon: {
            name: "Kashi Vishwanath Corridor & Temple",
            description: "Darshan at one of the 12 sacred Jyotirlingas of Lord Shiva inside golden-spired shrine.",
            location: "Kashi Vishwanath Temple",
            timeSlot: "01:00 PM - 03:30 PM",
          },
          evening: {
            name: "Grand Evening Ganga Aarti from Boat",
            description: "Watch priests perform rhythmic brass lamp rituals amid chanting and floating diyas.",
            location: "Dashashwamedh Ghat waterfront",
            timeSlot: "05:45 PM - 07:30 PM",
          },
        },
        food: [
          { meal: "Breakfast", suggestion: "Kachori Sabzi & Jalebi at Ram Bhandar", cuisine: "Banarasi Street Food" },
          { meal: "Lunch", suggestion: "Satvik Thali at Kashi Chat Bhandar", cuisine: "Pure Veg Satvik" },
          { meal: "Dinner", suggestion: "Banarasi Paan & Blue Lassi at famous Blue Lassi Shop", cuisine: "Heritage Lassi" },
        ],
        stay: "Riverview Heritage Guesthouse near Assi Ghat",
        transportTip: "Walk through galis (alleys); autos cannot enter narrow ghat lanes.",
        estimatedCostINR: 4500,
      },
      {
        dayNumber: 2,
        theme: "Dawn Boat Ride & Buddha's First Sermon",
        locationName: "Subah-e-Banaras & Sarnath",
        lat: 25.3762,
        lng: 83.0227,
        activities: {
          morning: {
            name: "Sunrise Boat Ride & Subah-e-Banaras",
            description: "Row across quiet waters at 5 AM as sun illuminates golden temples and morning classical music.",
            location: "Assi Ghat Waterway",
            timeSlot: "05:00 AM - 07:30 AM",
          },
          afternoon: {
            name: "Excursion to Sarnath Archaeological Park",
            description: "Visit Dhamek Stupa where Lord Buddha delivered his first sermon after enlightenment.",
            location: "Sarnath (10km from Varanasi)",
            timeSlot: "11:00 AM - 03:00 PM",
          },
          evening: {
            name: "Banarasi Silk Weaving Workshop",
            description: "Observe master weavers creating Zari gold-threaded Banarasi sarees on handlooms.",
            location: "Madanpura Weaver Quarter",
            timeSlot: "04:30 PM - 07:00 PM",
          },
        },
        food: [
          { meal: "Breakfast", suggestion: "Malaiyyo (Winter saffron milk foam dessert) near Chowk", cuisine: "Banarasi Seasonal Special" },
          { meal: "Lunch", suggestion: "Buddhist Vegetarian Thali near Sarnath Stupa", cuisine: "Indo-Tibetan" },
          { meal: "Dinner", suggestion: "Wood-fired Pizza & Chai at Pizzeria Vaatika Cafe, Assi Ghat", cuisine: "Fusion Cafe" },
        ],
        stay: "Riverview Heritage Guesthouse near Assi Ghat",
        transportTip: "Hire auto-rickshaw for Sarnath round-trip (approx ₹400-500).",
        estimatedCostINR: 5000,
      },
      {
        dayNumber: 3,
        theme: "Fortress Across the River & Sacred Fire",
        locationName: "Ramnagar Fort & Manikarnika Ghat",
        lat: 25.2818,
        lng: 83.0245,
        activities: {
          morning: {
            name: "Ramnagar Fort & Vintage Car Museum",
            description: "Explore 18th-century sandstone fort of Kashi Naresh across the Ganges featuring royal armory.",
            location: "Ramnagar",
            timeSlot: "09:30 AM - 12:30 PM",
          },
          afternoon: {
            name: "BHU Campus & New Vishwanath Temple",
            description: "Stroll Banaras Hindu University campus and visit tall marble Birla Shiva Temple.",
            location: "BHU Campus",
            timeSlot: "02:00 PM - 04:30 PM",
          },
          evening: {
            name: "Observing Eternal Flame at Manikarnika Ghat",
            description: "Contemplate life's impermanence at Varanasi's primary sacred cremation ghat.",
            location: "Manikarnika Ghat",
            timeSlot: "05:30 PM - 07:30 PM",
          },
        },
        food: [
          { meal: "Breakfast", suggestion: "Chooda Matar & Tamatar Chaat at Deena Chat Bhandar", cuisine: "Local Chaat" },
          { meal: "Lunch", suggestion: "Thali at Bati Chokha Restaurant near Teliyabag", cuisine: "Bihari-Purvanchal Bati Chokha" },
          { meal: "Dinner", suggestion: "Thandai with dry fruits at Baba Thandai", cuisine: "Spiced Milk Drink" },
        ],
        stay: "Riverview Heritage Guesthouse near Assi Ghat",
        transportTip: "Boat crossing to Ramnagar gives great river views.",
        estimatedCostINR: 4800,
      },
      {
        dayNumber: 4,
        theme: "Alleyways, Music Traditions & Departure",
        locationName: "Old City Galis & Tulsi Manas",
        lat: 25.2894,
        lng: 82.9995,
        activities: {
          morning: {
            name: "Classical Shehnai & Tabla Music House Visit",
            description: "Visit traditional Sangeet Gharana home of classical musicians in Kabir Chaura.",
            location: "Kabir Chaura",
            timeSlot: "09:00 AM - 11:30 AM",
          },
          afternoon: {
            name: "Tulsi Manas Temple & Sankat Mochan",
            description: "Read engraved Ramcharitmanas verses on white marble walls and visit Hanuman shrine.",
            location: "Durgakund",
            timeSlot: "01:00 PM - 03:00 PM",
          },
          evening: {
            name: "Final River Quietude & Departure",
            description: "Peaceful reflection at Panchganga Ghat before departure transfer to airport/station.",
            location: "Varanasi Airport / Junction",
            timeSlot: "04:30 PM",
          },
        },
        food: [
          { meal: "Breakfast", suggestion: "Puri Bhaji & Rabri at Pehelwan Lassi", cuisine: "Heritage Breakfast" },
          { meal: "Lunch", suggestion: "North Indian Thali at Lotus Lounge", cuisine: "Ghatside Dining" },
          { meal: "Dinner", suggestion: "Light snacks & Travel Meal", cuisine: "Comfort Food" },
        ],
        stay: "Departure Day",
        transportTip: "Book cab to Lal Bahadur Shastri Airport (VNS) at least 3 hours prior to flight.",
        estimatedCostINR: 4700,
      },
    ],
  },
};

export function generateFallbackItinerary(
  destination: string,
  durationDays: number,
  budgetTier: 'Budget' | 'Moderate' | 'Luxury',
  travelStyle: 'Solo' | 'Couple' | 'Family' | 'Friends'
): TripItinerary {
  // Return pre-configured if matching key exists
  const matchedKey = Object.keys(PRESET_ITINERARIES).find(
    (k) => k.toLowerCase() === destination.trim().toLowerCase()
  );
  if (matchedKey) {
    return PRESET_ITINERARIES[matchedKey];
  }

  // Otherwise generate structured itinerary procedurally
  const baseCity = destination || "India Exploration";
  const coords = CITY_COORDINATES[destination] || { lat: 20.5937, lng: 78.9629 };

  const multiplier = budgetTier === 'Budget' ? 0.6 : budgetTier === 'Luxury' ? 1.8 : 1.0;
  const costPerDay = 4500 * multiplier;

  const dailyItinerary = Array.from({ length: durationDays }, (_, i) => {
    const dayNum = i + 1;
    return {
      dayNumber: dayNum,
      theme: `Day ${dayNum}: Exploring ${baseCity} Icons & Culture`,
      locationName: `${baseCity} Highlight Region ${dayNum}`,
      lat: coords.lat + (Math.sin(dayNum) * 0.05),
      lng: coords.lng + (Math.cos(dayNum) * 0.05),
      activities: {
        morning: {
          name: `${baseCity} Cultural Landmark & Heritage Tour`,
          description: `Discover historic architecture, sacred shrines, and scenic viewpoints of ${baseCity}.`,
          location: `Central ${baseCity}`,
          timeSlot: "09:00 AM - 12:00 PM",
        },
        afternoon: {
          name: `${baseCity} Local Artisan Bazaars & Crafts`,
          description: `Experience authentic local markets, handcrafted souvenirs, and vibrant street life.`,
          location: `Old Market Quarter, ${baseCity}`,
          timeSlot: "01:30 PM - 04:00 PM",
        },
        evening: {
          name: `Sunset Panorama & Cultural Show`,
          description: `Enjoy twilight riverfront / mountain vistas followed by regional folk dance & light music.`,
          location: `${baseCity} Waterfront / Viewpoint`,
          timeSlot: "05:30 PM - 07:30 PM",
        },
      },
      food: [
        { meal: "Breakfast" as const, suggestion: `Regional Specialty Breakfast & Chai in ${baseCity}`, cuisine: "Local Regional" },
        { meal: "Lunch" as const, suggestion: `Traditional Thali at Heritage Restaurant`, cuisine: "Authentic Regional Thali" },
        { meal: "Dinner" as const, suggestion: `Curated Chef's Table & Local Delicacies`, cuisine: "Indo-Continental" },
      ],
      stay: `${budgetTier} Boutique Stay / Heritage Hotel in ${baseCity}`,
      transportTip: "Private auto-rickshaw or local taxi driver recommended for day loops.",
      estimatedCostINR: Math.round(costPerDay),
    };
  });

  return {
    tripTitle: `Unforgettable ${durationDays}-Day ${budgetTier} Journey through ${baseCity}`,
    destination: baseCity,
    durationDays,
    budgetTier,
    travelStyle,
    totalEstimatedCostINR: Math.round(costPerDay * durationDays),
    packingTips: [
      `Weather-appropriate comfortable wear for ${baseCity}`,
      "Reusable water bottle, sunscreen, and portable power bank",
      "Camera for capturing architectural highlights",
    ],
    dailyItinerary,
  };
}

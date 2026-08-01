export interface LandmarkQuestion {
  id: string;
  landmarkName: string;
  state: string;
  imageUrl: string;
  funFact: string;
  options: string[];
  correctIndex: number;
}

export const LANDMARK_QUESTIONS: LandmarkQuestion[] = [
  {
    id: "taj-mahal",
    landmarkName: "Taj Mahal",
    state: "Agra, Uttar Pradesh",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop",
    funFact: "The Taj Mahal changes color throughout the day—appearing pinkish in the morning, milky white in the afternoon, and golden under the moon.",
    options: ["Taj Mahal", "Humayun's Tomb", "Bibi Ka Maqbara", "Safdarjung Tomb"],
    correctIndex: 0,
  },
  {
    id: "hawa-mahal",
    landmarkName: "Hawa Mahal",
    state: "Jaipur, Rajasthan",
    imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop",
    funFact: "It has 953 intricate small windows called 'Jharokhas' designed to keep breeze flowing through the palace.",
    options: ["Amber Palace", "Hawa Mahal", "Umaid Bhawan", "City Palace Udaipur"],
    correctIndex: 1,
  },
  {
    id: "golden-temple",
    landmarkName: "Golden Temple (Sri Harmandir Sahib)",
    state: "Amritsar, Punjab",
    imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1000&auto=format&fit=crop",
    funFact: "Its Langar (community kitchen) feeds over 100,000 people daily for free regardless of religion or background.",
    options: ["Lotus Temple", "Golden Temple", "Akshardham", "Birla Mandir"],
    correctIndex: 1,
  },
  {
    id: "mysore-palace",
    landmarkName: "Amba Vilas Palace (Mysore Palace)",
    state: "Mysuru, Karnataka",
    imageUrl: "https://images.unsplash.com/photo-1600100397608-f010e423b971?q=80&w=1000&auto=format&fit=crop",
    funFact: "During Dasara festival, the palace is illuminated with over 97,000 light bulbs simultaneously.",
    options: ["Bangalore Palace", "Chowmahalla Palace", "Mysore Palace", "Faluknama Palace"],
    correctIndex: 2,
  },
  {
    id: "qutub-minar",
    landmarkName: "Qutub Minar",
    state: "New Delhi",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1000&auto=format&fit=crop",
    funFact: "Standing at 72.5 meters, it is the tallest brick minaret in the world.",
    options: ["Charminar", "Qutub Minar", "Chand Minar", "Jhulta Minar"],
    correctIndex: 1,
  },
  {
    id: "gateway-of-india",
    landmarkName: "Gateway of India",
    state: "Mumbai, Maharashtra",
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop",
    funFact: "It was built to commemorate the landing of King George V and Queen Mary in 1911.",
    options: ["India Gate", "Gateway of India", "Buland Darwaza", "Teen Darwaza"],
    correctIndex: 1,
  },
  {
    id: "meenakshi-temple",
    landmarkName: "Meenakshi Amman Temple",
    state: "Madurai, Tamil Nadu",
    imageUrl: "https://images.unsplash.com/photo-1621831307365-54777667d3f4?q=80&w=1000&auto=format&fit=crop",
    funFact: "Features 14 gopurams (gateway towers) decorated with thousands of colorful mythological stone sculptures.",
    options: ["Brihadeeswarar Temple", "Meenakshi Amman Temple", "Ranganathaswamy Temple", "Shore Temple"],
    correctIndex: 1,
  },
  {
    id: "sun-temple-konark",
    landmarkName: "Sun Temple",
    state: "Konark, Odisha",
    imageUrl: "https://images.unsplash.com/photo-1627894006066-b45772390a8a?q=80&w=1000&auto=format&fit=crop",
    funFact: "Designed in the shape of a colossal chariot with 24 carved stone wheels pulled by seven horses.",
    options: ["Sun Temple Konark", "Modhera Sun Temple", "Jagannath Temple", "Lingaraj Temple"],
    correctIndex: 0,
  },
  {
    id: "victoria-memorial",
    landmarkName: "Victoria Memorial",
    state: "Kolkata, West Bengal",
    imageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1000&auto=format&fit=crop",
    funFact: "Built using white Makrana marble—the same quarry source as the Taj Mahal.",
    options: ["Indian Museum", "Victoria Memorial", "Writers' Building", "National Library"],
    correctIndex: 1,
  },
  {
    id: "charminar",
    landmarkName: "Charminar",
    state: "Hyderabad, Telangana",
    imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1000&auto=format&fit=crop",
    funFact: "Constructed in 1591 CE to commemorate the eradication of a deadly plague epidemic in the city.",
    options: ["Golconda Fort", "Charminar", "Mecca Masjid", "Chowmahalla Palace"],
    correctIndex: 1,
  },
];

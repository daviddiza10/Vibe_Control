import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initial in-memory state representing the Sanctuary REST API backend
let vibeStatus = {
  vibeName: "Chill",
  statusText: "Sanctuary active.",
  temperature: 72,
  lightsEnabled: true,
  lightColorHex: "#00f0ff",
  selectedPreset: "Chill",
  chairAcLevel: 75,
  chairAcMode: "Cool",
  privacyGlassOpaque: true,
};

let platforms = [
  { id: "twitch", name: "Twitch", icon: "videogame_asset", color: "#9146FF", url: "https://twitch.tv" },
  { id: "youtube", name: "YouTube", icon: "play_circle", color: "#FF0000", url: "https://youtube.com" },
  { id: "netflix", name: "Netflix", icon: "movie", color: "#E50914", url: "https://netflix.com" },
];

let continueWatching = [
  {
    id: "cw-1",
    title: "Neon Shadows",
    subtitle: "S2 E4 · 12m left",
    progressPercent: 65,
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4EM9PLNPxQo5MoVsdw6G8-UbjPylns_7wg8hNnJCTfhg_qN-JgC_Pz87gEH00toCphx1S_F70207PxK5ih6XnH36XLt2OqTK5VzuG_oAiCD2c_dKaeiZrnAFna_ftBH0mhQgDxXiJZfD1K2rDayWA9dD7bqMhZbSS2fhyVYNcgEILGwW_IiCTDvUU6dnorQOI3u9CwqwycSHgAFXFLcHuPEsGscQClVItivvwz1d-TOtnmkXrR5Tx",
  },
  {
    id: "cw-2",
    title: "Starlight Explorers",
    subtitle: "S1 E1 · 45m left",
    progressPercent: 30,
    bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW-FqkncoyV8fk-bqZNeKz-hQvSCCK3IjTyLD7hc8HE5g6lbmNVC56uYEhqHgfIUk8MlWm0WIMjeQ8sRPfKja5LldNgHlE6dqLAxwd6R3gPwBXMjAp-dfwvm-pXuijYNZyOu_vyKeksdrGoE2FrlN3Xyvwugot7vAYLyEhjpUhBphLaliZoIJ0Zk1PdcCqpICjrwqRM-EEJCrVPH74kERA8UDAzIG618ugOHUGWO0VvqVMuIR5XN2j",
  },
];

let recommended = [
  {
    id: "rec-1",
    title: "The Last Courier",
    genre: "Sci-Fi Action",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAjvqY6SjZNsxP6ELusqV_Dd4ddsM5ibwhZLm3Hc5w0HY1Ke2tWfM2HQQ76Y8AeW0KYqxnP27ikEfFEcVLu5rSD4Q61jCKUCTc6_UV-wG_RS8UOIEkRarV89CxvWy_aSQN48L9okW826R1A1AEdOpeZYr80R29Zb4e8vHot2D5cg2ELPXVUe228iNJXEbdW285yuCzx0Kmvrl8cw-qhxq8eaT3ZCTb1YDtUEAyUb4G4JDoHIvMGY7Z",
  },
  {
    id: "rec-2",
    title: "Inside the Grid",
    genre: "Documentary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbtAaZgYhpEkzxUG1k6aSPMo8LLUF1iYU_i39oBF7nu4kuNt2jd2XTzZ3okotxrKycetQxadkv21ZhVV6c3K4bGS8kp5p9nrG0hwHOKw_Y9m194EXK0f8lJhdMi0gkYdQWk16jm6FW1l_YyqFwFi-AQT-sK3pGkeh9dl9ywbN9vtPyqN0fTiTFbtcVaOuLprEhTV_buTuDWjtj1YA6XTMBdHo2ZOThAHY7p7sD2NeE3nYC0Tkrt2Ak",
  },
  {
    id: "rec-3",
    title: "Synthwave Sessions",
    genre: "Music Video",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsyhhOQPQyyVZy9cpB2OEwBU2loloJbcdJwbESk_YouR6tfOYp2J3qks2fsPVNViSewKwCxTjrGzVkMfHJIpUv1rNnh6DBj-PiWrGm8vA1t7HLtJctHDp52sUQNf4yFgnpgcgGTW1zPm4efHunKO7SWPnKLZw764zMFmlH8YNks7tZkmuJd2oA7FSKYJF0TA1uYef4x8cg8nnLc8iXTJSab3boCu-VarS1Zprq3M7mzDfmD8ovN01o",
  },
  {
    id: "rec-4",
    title: "Pro League Finals",
    genre: "Esports Live",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVlv_WhUWooZdUSlqnaln1VLKdVH29wtPj6Sik2HhqnpMm9CZT4rz65wXTgokKrqzHg4Gn28sKhDCe0d_cYVTd6JTUP3XLc8QfzrRqL2qkacT3DXh7-CqkXSQPlJLSTWfM2f_iRD2hwcqimnU-xlV4N7FZvE9fkiefsH9rtHGQtS-e6o4gpGheYCpys8mDodiR1eGH_ICF69DIu_UAeqDzT_JSjvDlUyEdhFFI8JDkekEwHZ1KBfIj",
  },
];

let relaxingSounds = [
  {
    id: "sound-1",
    title: "Rainforest",
    subtitle: "Nature Sounds",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwkjNpKQJf2AKh7DZ9ocj5xbH0K_BUKYGUJjB41lngSQm-DvLiVCG48n1l2YL7UB7f-j-u7Ux0BIdiVX4yVKnfMamy1fIG5VzX_ZlfcQNPOuu4jCKh6WJSXsgmmC6iSWqT4Ch7vZLk-lCV7tRYWTLj_akzC97Gv-MjtCwdSG9GYygpDEpTIkswg8lSQwLGdjDNho6qfdFSYb83qY3twhDNOCsXPjPWsd6hSvOVX2Ru-Kgn7PrSfwdq",
    audioFrequency: 220,
    category: "relaxing",
  },
  {
    id: "sound-2",
    title: "Lo-Fi Beats",
    subtitle: "Focus & Chill",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpyMOFZoKvrYAy0KtQ6jzdhNvi7OUiullIaeOX7tkl1bL1Kw4w15oczMHsn1qw5UOKTdr6b5y2-bQztbolLmYqxMbzYYLPzafh3HlPrTugGUI3oHHjK8BnG6-gMWHBGrDi30M1k7PJtWPg_9TqAgubtAgfH3Qfh6TUIFth9jSQJwWLRCgHrxOih7VAlXpNvD8Xc1U383ovatmwlSrLxQPSjsknn3FqrCrWTMkjmAcVxdHZmsCqtrP8",
    audioFrequency: 330,
    category: "relaxing",
  },
  {
    id: "sound-3",
    title: "Cosmic White Noise",
    subtitle: "Deep Sleep",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiAV3wb00JJBVPnJdtfErb6MRNUknW9AArdkMOS8qVQ7lwYB92Lg41mJc_SNblQwYSEssq9y1bUmFr0z_nFHq-2hHPgbHWanJdOHW6dZjo-CLTkng9GHVvD1SnK3C1aBAuQp34u5RS6qohr56eAa4Gh8efKDekJ6MxvDRvlb-6PNvp96N6EWRiMooNXGI5SDkK1eiJ7BQPLryzag57lgJDINGjdw-pr8X6WW-ykEEsPaPWoSCkGphS",
    audioFrequency: 110,
    category: "relaxing",
  },
];

let trendingMedia = [
  {
    id: "trend-1",
    title: "Neon Nights Vol. 4",
    subtitle: "Synthwave Dreams",
    tag: "New Release",
    featured: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJPza_kUb7-PRGRYbwXJSMFpEUdVYXG9Cbg40nbpL11B6QCUa6mLA9V-7b3pZH07byoQCmF0i7CerwsVxRj26qXnBvEOg8fWOx2N9iI4yqTWyjssu9XPRoaZ6ROMkh-8h2TvgK03Y_2PAtqXOFPKmOj-udwOkqcHKJCtGqQDelRHRjVy9YXFe33bX8MYCtjbOMWSu2mtVtDFYMy05hUOkY9w0S9nATtI9T3zdpdaCGid06s_VxP90T",
  },
  {
    id: "trend-2",
    title: "Abyssal Plains",
    subtitle: "Deep Techno",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXpsK-kIcSXmcrGVOSTpC0oUJB3zzyc3urM5aLOgaR0m4Jx57dALEkrzaoBJm6VRcewLwONHryA3SGYGo70RAEtXoD_olWHS-mCbOMQGTgsNVch3KgmrZZyul3u8P8AT57elPa4f9dS0yGhLKFjbCyTRT4z0Qix8UImzPESGjUNdmY21IDHV6obTKt9OELnoYbNYgg0a5hIAavVJPfv6lVWvbWeQcXwo_GuBjvk11QOni-RSQiwYFj",
  },
  {
    id: "trend-3",
    title: "Transit Echoes",
    subtitle: "Ambient Flow",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKbdN4W5UO9qLUyM4_S5V18JPm34TK2f-AEljr5-OwyB__gdM7-7uvOHnd9aPasMiWEwnB7ZIDWeUJPiTBPydgkiVQZvjaPdNxbzLF3bYZFIeXZTmkOioPNhWitj0EvSqL28HSq1KZXzudhGK_6Gf9kq-mS6Dnpi3BvlsIR72RtYlD29kGDFKpfhQ1wi4OZdGMc-fGNUNNzclEKGafZvhKpOLtNF-VxGtviZGoVAj7IKIJ2LBaqyz0",
  },
  {
    id: "trend-4",
    title: "System Override",
    subtitle: "Glitch Hop",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXrLOf2eGhDuys7GLGMZkvJfA5Bt0qV15tp3EWpI8FwDGleX40vuthbqb0iLyFDEOXo4QzAK6JvBIkzfElis-oF6ozl0RSJSC6Yb_lcfLArD1TmfZ7KZSg_FHF1vFBL353TACjasS9ICCBRCqGMly1K7GSYdZtpPrIcGdeKyyYmjSyZ_jJE_G71AQ1CIhly83l4pc5ZGjIGf-2YV3Vwq9cKDwMqgC_upL23bhbfqwhC58xjAchpEnP",
  },
  {
    id: "trend-5",
    title: "Late Night Code",
    subtitle: "Chillhop",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLaE-OnEfBxifYoXEnJklszRt2BK1NoOm3r-aelcj-rNtmJ5Aiarv41yYJQhhiD2GXcd3F44dky6bnJ80KIdsmyeYndqAX6l8d2BqfcnSav_32ESEe9__Wc3PwyKzWW8TiovcGUbwFoYZDS3caD38mC3-ty9en6jsX0dgnsgRLETxA_6dH_1hIriOnRBZIymwayDx_tMAhcio1IMbLvmbt_otQGdpaj6SbjlecCQWuFsfdjH6rQplE",
  },
];

let schedules = [
  {
    id: "sched-1",
    name: "Morning Chill",
    time: "7:00 AM",
    description: "Lofi Beats & Soft Blue",
    active: true,
  },
  {
    id: "sched-2",
    name: "Evening Neon",
    time: "8:00 PM",
    description: "Synthwave & Magenta",
    active: false,
  },
];

let profile = {
  name: "Alex Chen",
  email: "alex.chen@vibecontrol.net",
  membership: "Pro Member",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1HVDIeb51MZua63IcwqwvYMtJMlhydqjOSuIuYdynifI5PXRAZk8ShWwsdU3hhlNuHneba5aowzYcMRsHXqI6u4tGm8VvnFiPMGAEi8AWcLtA_bOPhAGQpufzXIarfcOa9WDoaezLgIjjR6JpII-h6FPP1J1Wf4dyemi5TWVvJmV_CiozZsHWrBfrlcyvT0KfVNUIuSElhE3U60-N8knaG8hFmjFC5O5d4ITY5yk1_Fcy457hvhTb",
};

let connectivity = {
  wifiNetwork: "Vibe_Net_5G",
  bluetoothCount: 3,
};

let preferences = {
  hapticFeedback: true,
  dataSync: "Cloud" as const,
};

// ---------------- REST API ENDPOINTS ---------------- //

// GET /api/vibe/status
app.get("/api/vibe/status", (req, res) => {
  res.json(vibeStatus);
});

// PUT /api/vibe/status
app.put("/api/vibe/status", (req, res) => {
  vibeStatus = { ...vibeStatus, ...req.body };
  res.json(vibeStatus);
});

// GET /api/streaming/platforms
app.get("/api/streaming/platforms", (req, res) => {
  res.json(platforms);
});

// POST /api/streaming/platforms
app.post("/api/streaming/platforms", (req, res) => {
  const { name, color, url } = req.body;
  const newPlatform = {
    id: `platform-${Date.now()}`,
    name: name || "Custom",
    icon: "play_circle",
    color: color || "#00f0ff",
    url: url || "https://example.com",
  };
  platforms.push(newPlatform);
  res.status(201).json(newPlatform);
});

// GET /api/streaming/continue-watching
app.get("/api/streaming/continue-watching", (req, res) => {
  res.json(continueWatching);
});

// GET /api/streaming/recommended
app.get("/api/streaming/recommended", (req, res) => {
  res.json(recommended);
});

// GET /api/media/relaxing-sounds
app.get("/api/media/relaxing-sounds", (req, res) => {
  res.json(relaxingSounds);
});

// GET /api/media/trending
app.get("/api/media/trending", (req, res) => {
  res.json(trendingMedia);
});

// GET /api/settings/schedules
app.get("/api/settings/schedules", (req, res) => {
  res.json(schedules);
});

// POST /api/settings/schedules
app.post("/api/settings/schedules", (req, res) => {
  const { name, time, description } = req.body;
  const newSched = {
    id: `sched-${Date.now()}`,
    name: name || "New Schedule",
    time: time || "12:00 PM",
    description: description || "Custom vibe setting",
    active: true,
  };
  schedules.push(newSched);
  res.status(201).json(newSched);
});

// PATCH /api/settings/schedules/:id
app.patch("/api/settings/schedules/:id", (req, res) => {
  const { id } = req.params;
  const sched = schedules.find((s) => s.id === id);
  if (sched) {
    if (typeof req.body.active === "boolean") {
      sched.active = req.body.active;
    }
    res.json(sched);
  } else {
    res.status(404).json({ error: "Schedule not found" });
  }
});

// GET /api/settings/profile
app.get("/api/settings/profile", (req, res) => {
  res.json(profile);
});

// GET /api/settings/connectivity
app.get("/api/settings/connectivity", (req, res) => {
  res.json(connectivity);
});

// GET /api/settings/preferences
app.get("/api/settings/preferences", (req, res) => {
  res.json(preferences);
});

// PUT /api/settings/preferences
app.put("/api/settings/preferences", (req, res) => {
  preferences = { ...preferences, ...req.body };
  res.json(preferences);
});

// Gemini endpoint for generating custom AI Vibe profiles
app.post("/api/vibe/ai-generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({
        error: "GEMINI_API_KEY environment variable is missing",
        fallbackVibe: {
          vibeName: "Cyberpunk Glow",
          statusText: "AI generated preset applied.",
          temperature: 68,
          lightColorHex: "#ff00ff",
          selectedPreset: "Neon",
        },
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `You are a Smart Home Cyber-Chill Atmosphere Generator. Given the user's prompt "${prompt || "late night coding session"}", return a JSON object with:
      - vibeName: string (short title)
      - statusText: string (ambient description)
      - temperature: number (65 to 78)
      - lightColorHex: string (hex color code e.g. #00f0ff or #ff00ff)
      - selectedPreset: string ("Neon", "Chill", or "Study")
      Format as raw JSON strictly with these key names.`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "";
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    vibeStatus = { ...vibeStatus, ...parsed };
    res.json(vibeStatus);
  } catch (error: any) {
    console.error("Gemini AI generation error:", error);
    // Provide a resilient fallback so the user experience continues smoothly
    const fallbackVibe = {
      vibeName: "Neon Atmosphere",
      statusText: "Atmosphere updated based on your mood.",
      temperature: 70,
      lightColorHex: "#6366f1",
      selectedPreset: "Neon",
    };
    vibeStatus = { ...vibeStatus, ...fallbackVibe };
    res.status(200).json(vibeStatus);
  }
});

// Server boot with Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VibeControl REST API Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import { BadgeItem, Challenge, MemoryCardItem, SkillLevel, TrackId } from '../types/game';

export const HERO_IMAGE_PATH = '/src/assets/images/hero_cute_owl_tech_1792100097721.jpg';
export const PHOTO_LESSON_IMAGE = '/src/assets/images/photo_lesson_cute_puppies_1792100098098.jpg';
export const AI_COTTAGE_IMAGE = '/src/assets/images/ai_art_watercolor_cottage_1792099321513.jpg';
export const AI_TRAIN_IMAGE = '/src/assets/images/ai_art_cinema_train_1792099322179.jpg';
export const AI_DOG_IMAGE = '/src/assets/images/ai_art_dog_astronaut_1792099323104.jpg';

export const SKILL_LEVEL_META: Record<
  SkillLevel,
  { label: string; shortTitle: string; description: string; stepPace: string }
> = {
  beginner: {
    label: 'Level 1 · Getting Comfortable',
    shortTitle: 'Getting Comfortable',
    description: 'Browsers, Web Search, ChatGPT basics, Apple iOS essentials, and staying safe online.',
    stepPace: 'Guided pace · Clear visual cues',
  },
  intermediate: {
    label: 'Level 2 · Confident Explorer',
    shortTitle: 'Confident Explorer',
    description: 'MS Copilot, Google Workspace, Voice Tech, Adobe Firefly AI Images, and 3D Travel.',
    stepPace: 'Practical scenarios · Multi-step discovery',
  },
  advanced: {
    label: 'Level 3 · Tech & AI Mentor',
    shortTitle: 'Tech & AI Mentor',
    description: 'Cloud Portfolios, Deepfake Defense, Responsible AI, Medical ID, and Vibe Coding.',
    stepPace: 'Real-world mastery · Mentor challenges',
  },
};

export const TRACK_META: Record<
  TrackId,
  {
    id: TrackId;
    title: string;
    subtitleTag: string;
    kicker: string;
    description: string;
    accentColor: string;
  }
> = {
  browsers_cloud: {
    id: 'browsers_cloud',
    title: 'Browsers, Search & Cloud',
    subtitleTag: 'Web & Cloud Essentials',
    kicker: 'Navigate & Organize',
    description: 'Internet browsers, smart web search, Google Workspace & Drive, Cloud storage, and digital portfolios.',
    accentColor: '#0284C7',
  },
  ai_assistants: {
    id: 'ai_assistants',
    title: 'ChatGPT, Copilot & Learning',
    subtitleTag: 'Everyday AI Partners',
    kicker: 'Your Everyday AI Partners',
    description: 'ChatGPT basics, MS Copilot interface & apps, AI for lifelong learning, entertainment, and health.',
    accentColor: '#059669',
  },
  apple_mobile: {
    id: 'apple_mobile',
    title: 'Apple iOS, Intelligence & Voice',
    subtitleTag: 'iPhone & Smart Voice Tech',
    kicker: 'iPhone & Smart Voice Tech',
    description: 'Apple iOS Writing Tools, Smart Siri & voice assistants, mobile apps, health apps, and social connectivity.',
    accentColor: '#0284C7',
  },
  photos_creative: {
    id: 'photos_creative',
    title: 'Photos, Storage & Adobe Firefly',
    subtitleTag: 'Memories & AI Art',
    kicker: 'Visual Memories & AI Art',
    description: 'Managing photos & storage, rescuing dark snapshots, Adobe Firefly AI images, and creative projects.',
    accentColor: '#D97706',
  },
  security_ethics: {
    id: 'security_ethics',
    title: 'Security, Deepfakes & AI Ethics',
    subtitleTag: 'Digital Safety & Privacy',
    kicker: 'Stay Safe & Informed',
    description: 'Staying safe online, spotting phishing, deepfakes, voice clones, misinformation, and responsible AI.',
    accentColor: '#DC2626',
  },
  smart_living_future: {
    id: 'smart_living_future',
    title: 'Smart Home, Casting, VR & Vibe Coding',
    subtitleTag: 'Modern Living & Future Tech',
    kicker: 'Modern Living & Future Tech',
    description: 'Smart home essentials, TV streaming & casting, 3D Virtual Reality, AI travel, and Vibe Coding.',
    accentColor: '#059669',
  },
};

export const CHALLENGES: Challenge[] = [
  // =========================================================================
  // TRACK 1: BROWSERS, SEARCH & CLOUD
  // =========================================================================
  {
    id: 'topic-browsers-search',
    topicTag: 'Browsers & Web Search',
    courseTopic: 'Internet Browsers & Searching the Web',
    trackId: 'browsers_cloud',
    skillLevel: 'beginner',
    title: 'Browser Tabs, Bookmarks & Spotting Sponsored Ads',
    subtitle: 'Find the right browser button to save a favorite website without clicking an ad',
    scenarioStory:
      'Let’s explore how your Internet Browser (Safari, Chrome, or Edge) works! You just found your local library’s official website and want to save it so you can return with one click anytime. Which browser button saves a Bookmark?',
    mode: 'iphone_simulator',
    points: 100,
    badgeId: 'badge-browser-navigator',
    memoryRuleTitle: 'Star (★) or Share → Add Bookmark Saves Your Trusted Sites',
    memoryRuleSummary:
      'Skip the top "Sponsored Ad" search results when looking for banks or government sites. Once you are on the real website, tap the Star (★) or Bookmark icon so you never have to search for it again!',
    hints: [
      'Look at the browser toolbar controls—avoid clicking the "Sponsored Ad" banner.',
      'To open a second website without losing your place, you use the Plus (+) Tab button, and to save a site permanently, you use Bookmark (★).',
      'Look for the "Bookmark Star (★) / Save Site" button in the top address bar.',
      'Tap "Bookmark Star (★) / Add Bookmark" to save the official library website.',
    ],
    iphoneScenario: {
      appScreenTitle: 'Web Browser · Address Bar & Tabs',
      screenContext: 'Viewing: www.citypubliclibrary.org (Official Site)',
      callerOrContact: 'Browser Navigation Controls',
      goalInstruction:
        'Tap the browser control that saves this official page to your Bookmarks / Favorites bar so you don’t have to search for it next time.',
      options: [
        {
          id: 'br-opt-1',
          buttonLabel: 'Bookmark Star (★) / Add Bookmark',
          iconName: 'Sparkles',
          locationHint: 'Right side of the address bar',
          isCorrect: true,
          feedback:
            'Spot on! Bookmarking your library, bank, and clinic means you can open them safely with one click instead of searching for them every time.',
        },
        {
          id: 'br-opt-2',
          buttonLabel: 'Click Top "Sponsored Ad" Banner',
          iconName: 'ExternalLink',
          locationHint: 'Paid ad at top of search page',
          isCorrect: false,
          feedback:
            'Careful! "Sponsored" results at the very top of a search page are paid ads—scroll past them to the real website!',
        },
        {
          id: 'br-opt-3',
          buttonLabel: 'Close Browser Window (Red X)',
          iconName: 'PhoneOff',
          locationHint: 'Top corner window button',
          isCorrect: false,
          feedback: 'Closing the window exits your browser without saving the page for next time.',
        },
        {
          id: 'br-opt-4',
          buttonLabel: 'Refresh / Reload Page Arrow',
          iconName: 'RefreshCw',
          locationHint: 'Circular arrow next to URL',
          isCorrect: false,
          feedback:
            'The circular arrow reloads the current page (great if a page freezes!), whereas the Star (★) saves a Bookmark.',
        },
      ],
    },
  },
  {
    id: 'topic-google-workspace',
    topicTag: 'Google Workspace & Drive',
    courseTopic: 'Google Workspace, Drive, Gemini & Digital Organization',
    trackId: 'browsers_cloud',
    skillLevel: 'intermediate',
    title: 'Sharing a Google Drive Folder Safely with Family',
    subtitle: 'Choose the right Google Drive sharing setting so people can view without accidentally deleting',
    scenarioStory:
      'Using Google Drive, Docs, and Gemini makes digital organization easy! You typed up the family reunion potluck schedule in Google Docs and want to share the link with 20 relatives so they can read it—without anyone accidentally erasing the text.',
    mode: 'iphone_simulator',
    points: 150,
    badgeId: 'badge-workspace-pro',
    memoryRuleTitle: 'Choose "Viewer" When Sharing Read-Only Docs in Google Drive',
    memoryRuleSummary:
      'In Google Drive and Docs, "Viewer" lets family read and print cleanly, "Commenter" lets them leave margin notes, and "Editor" lets them change or delete your text.',
    hints: [
      'Think about the 3 permission levels in Google Drive: Viewer, Commenter, and Editor.',
      'If 20 people have "Editor" access, someone might accidentally highlight and erase the whole schedule!',
      'Look for the option that sets access to "Viewer (Read & Print Only)".',
      'Tap "Share as Viewer (Read-Only)" to protect your original document.',
    ],
    iphoneScenario: {
      appScreenTitle: 'Google Drive & Docs · Share Menu',
      screenContext: 'Document: "Family Reunion Schedule.docx"',
      callerOrContact: 'Sharing & Gemini Workspace Controls',
      goalInstruction:
        'Which Google Drive sharing button lets your 20 relatives read and print the schedule without accidentally erasing your work?',
      options: [
        {
          id: 'gw-opt-1',
          buttonLabel: 'Share as "Viewer" (Read-Only)',
          iconName: 'Users',
          locationHint: 'Permission dropdown in Share window',
          isCorrect: true,
          feedback:
            'Bravo! Setting access to "Viewer" means everyone can read and print the schedule on any phone or computer, and nobody can accidentally delete a line!',
        },
        {
          id: 'gw-opt-2',
          buttonLabel: 'Share as "Editor" with Everyone',
          iconName: 'PlusCircle',
          locationHint: 'Full edit permission',
          isCorrect: false,
          feedback:
            '"Editor" is great when collaborating with one partner, but for a big group announcement, "Viewer" prevents accidental deletions.',
        },
        {
          id: 'gw-opt-3',
          buttonLabel: 'Move Document to Trash Bin',
          iconName: 'PhoneOff',
          locationHint: 'Bottom menu action',
          isCorrect: false,
          feedback: 'The Trash bin deletes your file! (Though remember: Google Drive keeps trashed files for 30 days just in case.)',
        },
        {
          id: 'gw-opt-4',
          buttonLabel: 'Turn Off Wi-Fi Connection',
          iconName: 'Zap',
          locationHint: 'Device settings',
          isCorrect: false,
          feedback: 'Google Drive saves to the cloud over Wi-Fi—use the "Viewer" permission in the Share menu instead!',
        },
      ],
    },
  },
  {
    id: 'topic-cloud-portfolio',
    topicTag: 'Cloud Storage & Portfolios',
    courseTopic: 'Cloud Storage, Latest AI & Building a Digital Portfolio',
    trackId: 'browsers_cloud',
    skillLevel: 'advanced',
    title: 'Understanding Cloud Sync vs. Your Device Storage',
    subtitle: 'Master how iCloud, Google Drive, and OneDrive protect your Digital Portfolio',
    scenarioStory:
      'Suppose your iPad or laptop ever breaks or gets replaced. If your Digital Portfolio folder is synced to Cloud Storage (iCloud, Google Drive, or OneDrive), how do you get all your projects back on a brand-new device?',
    mode: 'iphone_simulator',
    points: 200,
    badgeId: 'badge-cloud-architect',
    memoryRuleTitle: 'The Cloud Is Your Safe Deposit Box in the Sky',
    memoryRuleSummary:
      'Files saved in Cloud Storage (Google Drive, iCloud, OneDrive) aren’t trapped inside one piece of glass and metal—simply sign in with your email and password on any device to see all your files.',
    hints: [
      'Remember our filing cabinet analogy: Cloud files live safely on secure servers connected to your account.',
      'You do not need to pay a repair shop $500 to pry open the old tablet if your files are synced to the Cloud.',
      'All you need on your new device is to sign in to your same Google, Apple, or Microsoft account.',
      'Tap "Sign In with Your Same Cloud Account" to restore your Digital Portfolio automatically.',
    ],
    iphoneScenario: {
      appScreenTitle: 'Cloud Storage & Digital Portfolio Lab',
      screenContext: 'iCloud · Google Drive · Microsoft OneDrive',
      callerOrContact: 'My Creative Digital Portfolio (Synced ✓)',
      goalInstruction:
        'You got a brand-new tablet! Because your portfolio was saved in the Cloud, what is the single step needed to bring all your folders and AI artwork onto the new screen?',
      options: [
        {
          id: 'cl-opt-1',
          buttonLabel: 'Sign In with Your Same Cloud Account',
          iconName: 'Download',
          locationHint: 'Apple Account / Google / Microsoft Login',
          isCorrect: true,
          feedback:
            'Exactly right! Because your files live in the Cloud tied to your account, signing in brings your entire Digital Portfolio, photos, and contacts right back.',
        },
        {
          id: 'cl-opt-2',
          buttonLabel: 'Re-type Every Document from Scratch',
          iconName: 'RefreshCw',
          locationHint: 'Manual recreation',
          isCorrect: false,
          feedback: 'Never re-type! Cloud storage automatically syncs your work across devices when you sign in.',
        },
        {
          id: 'cl-opt-3',
          buttonLabel: 'Create a Brand-New Email Address',
          iconName: 'PlusCircle',
          locationHint: 'New account button',
          isCorrect: false,
          feedback:
            'Important tip! Creating a brand-new email creates an empty cloud locker. Always sign in with your EXISTING account to see your saved files!',
        },
        {
          id: 'cl-opt-4',
          buttonLabel: 'Mail a Paper Copy to Apple',
          iconName: 'ExternalLink',
          locationHint: 'Postal mail',
          isCorrect: false,
          feedback: 'No stamps needed—just sign into your existing Cloud account!',
        },
      ],
    },
  },

  // =========================================================================
  // TRACK 2: CHATGPT, COPILOT & LIFELONG LEARNING
  // =========================================================================
  {
    id: 'topic-chatgpt-basics',
    topicTag: 'AI Basics · ChatGPT',
    courseTopic: 'AI Basics: ChatGPT & AI for Entertainment',
    trackId: 'ai_assistants',
    skillLevel: 'beginner',
    title: 'The 3-Part Recipe for Talking to ChatGPT',
    subtitle: 'Build a clear, conversational prompt using Situation + Task + Helpful Details',
    scenarioStory:
      'ChatGPT isn’t a 2-word search engine—it’s a conversational partner! Pick the 3 building blocks below to ask ChatGPT for a healthy family dinner menu and a fun 1960s music trivia game.',
    mode: 'ai_prompt_builder',
    points: 100,
    badgeId: 'badge-chatgpt-starter',
    memoryRuleTitle: 'Who + What + Details = Great ChatGPT Answers',
    memoryRuleSummary:
      'Talk to ChatGPT in complete sentences! Tell it (1) the situation, (2) what you want it to create, and (3) helpful details like tone, length, or dietary needs.',
    hints: [
      'Pick one helpful block from each of the 3 steps: Situation, Task, and Helpful Detail.',
      'Avoid blocks that are just a single vague word ("Dinner") or share private ID numbers.',
      'Choose: "I am hosting 4 family members on Sunday", "Suggest 3 easy chicken recipes plus 5 fun 1960s music trivia questions", and "Keep recipes low-sodium and under 30 minutes".',
      'Select the 3 detailed, safe prompt blocks and click "Test My Prompt".',
    ],
    promptScenario: {
      goalTitle: 'Plan a Healthy Sunday Dinner + Fun 1960s Trivia Game',
      familyContext: 'Combine everyday meal planning with AI for Entertainment!',
      safetyReminder: 'Notice how you never need to share your real name, address, or Medicare number to get wonderful ideas!',
      sampleAiOutput:
        'Here is your Sunday Family Dinner & 1960s Trivia Night plan:\n\n• 30-Minute Menu: Lemon-Herb Baked Chicken Breasts with roasted sweet potatoes and crisp green beans (zero added salt!).\n• Bonus 1960s Music Trivia Question #1: Which Liverpool band made their famous American TV debut on The Ed Sullivan Show in February 1964? (Answer: The Beatles!)',
      blocks: [
        {
          id: 'pb-wk3-1',
          category: 'role',
          text: 'I am hosting a cozy Sunday dinner for 4 family members across two generations.',
          isRecommended: true,
          whyText: 'Gives ChatGPT clear context about your gathering.',
        },
        {
          id: 'pb-wk3-2',
          category: 'role',
          text: 'Dinner.',
          isRecommended: false,
          whyText: 'A single word is too vague—ChatGPT won’t know if you want a restaurant, a poem, or a recipe!',
        },
        {
          id: 'pb-wk3-3',
          category: 'task',
          text: 'Suggest 3 easy skillet chicken recipes and 5 fun 1960s music trivia questions we can play at the table.',
          isRecommended: true,
          whyText: 'Clearly states both the meal plan and the entertainment game you want!',
        },
        {
          id: 'pb-wk3-4',
          category: 'task',
          text: 'Write a 50-page encyclopedia on poultry farming.',
          isRecommended: false,
          whyText: 'Way too long and not helpful for tonight’s dinner!',
        },
        {
          id: 'pb-wk3-5',
          category: 'detail',
          text: 'Use low-sodium herbs instead of salt, keep cooking under 30 minutes, and include the trivia answers.',
          isRecommended: true,
          whyText: 'Specific health, time, and format preferences make ChatGPT’s answer tailored to you.',
        },
        {
          id: 'pb-wk3-6',
          category: 'detail',
          text: 'My Medicare number is 992-00-1122 and my password is Secret123.',
          isRecommended: false,
          whyText: 'Safety Rule: Never type private ID numbers or passwords into ChatGPT!',
        },
      ],
    },
  },
  {
    id: 'topic-copilot-learning',
    topicTag: 'MS Copilot & Learning',
    courseTopic: 'MS Copilot: The Interface, Apps, Features & Lifelong Learning',
    trackId: 'ai_assistants',
    skillLevel: 'intermediate',
    title: 'Mastering Microsoft Copilot & Lifelong Learning',
    subtitle: 'Use Copilot’s built-in features to summarize long articles and verify web footnotes',
    scenarioStory:
      'Microsoft Copilot integrates right into your browser and apps! You are reading a long, complicated 12-page article on the web and want Copilot to give you a clean 3-bullet summary—and show clickable footnote links so you can verify where the facts came from.',
    mode: 'ai_prompt_builder',
    points: 150,
    badgeId: 'badge-copilot-pilot',
    memoryRuleTitle: 'MS Copilot Includes Clickable Source Footnotes [1] [2]',
    memoryRuleSummary:
      'In Microsoft Copilot, you can click the little numbered footnotes [1] at the end of sentences to see the exact website it used, and tap the "+" (New Topic) button whenever you switch subjects.',
    hints: [
      'Pick the 3 blocks that use Copilot to summarize a complex topic, explain it for lifelong learning, and list source links.',
      'Avoid blocks that ask Copilot to write in unreadable jargon or share bank numbers.',
      'Combine: learning a new topic in Copilot + summarizing key takeaways + asking for plain English and source links.',
      'Select the 3 recommended Copilot blocks and press "Test My Prompt".',
    ],
    promptScenario: {
      goalTitle: 'Use MS Copilot for Lifelong Learning & Web Summaries',
      familyContext: 'You want Copilot to summarize a long historical or science article and show you where to verify the facts.',
      safetyReminder: 'Helpful Tip: When you finish one subject in Copilot, click the "+" (New Topic) button so your old conversation doesn’t mix with your new question!',
      sampleAiOutput:
        'Copilot Summary (with Verified Web Sources):\n• Key Point 1: Monarch butterflies travel up to 3,000 miles each autumn to overwinter in central Mexico [1].\n• Key Point 2: Planting native milkweed and late-blooming asters on your patio helps feed them along the route [2].\n• Click footnote [1] National Geographic or [2] Pollinator Partnership below to read the original articles!',
      blocks: [
        {
          id: 'pb-cop-1',
          category: 'role',
          text: 'I am using MS Copilot for lifelong learning to understand how monarch butterfly migration works.',
          isRecommended: true,
          whyText: 'Sets a clear educational topic for Copilot to research.',
        },
        {
          id: 'pb-cop-2',
          category: 'role',
          text: 'Butterfly.',
          isRecommended: false,
          whyText: 'Too short—tell Copilot what you actually want to learn about butterflies!',
        },
        {
          id: 'pb-cop-3',
          category: 'task',
          text: 'Summarize the 3 most fascinating facts and tell me 2 flowers I can plant on my patio to help them.',
          isRecommended: true,
          whyText: 'Combines an interesting summary with practical steps you can enjoy at home.',
        },
        {
          id: 'pb-cop-4',
          category: 'task',
          text: 'Give me an unverified rumor with no sources.',
          isRecommended: false,
          whyText: 'One of Copilot’s best features is providing real clickable web sources!',
        },
        {
          id: 'pb-cop-5',
          category: 'detail',
          text: 'Use warm, clear bullet points and include clickable website sources so I can explore further.',
          isRecommended: true,
          whyText: 'Highlights Copilot’s web-search citation superpower.',
        },
        {
          id: 'pb-cop-6',
          category: 'detail',
          text: 'Here is my online banking login so you can buy seeds.',
          isRecommended: false,
          whyText: 'Safety Rule: Never share banking logins in any AI interface.',
        },
      ],
    },
  },
  {
    id: 'topic-ai-health-wellness',
    topicTag: 'AI for Health & Wellness',
    courseTopic: 'AI for Health & Wellness + Health and Wellness Apps',
    trackId: 'ai_assistants',
    skillLevel: 'advanced',
    title: 'Translating Medical Jargon & Preparing for Your Doctor',
    subtitle: 'Use AI to turn confusing medical terms into clear questions for your physician',
    scenarioStory:
      'AI can empower your health without replacing your doctor. You received a lab summary mentioning "orthostatic hypotension" and want plain-English clarity plus 4 questions to bring to your appointment.',
    mode: 'ai_prompt_builder',
    points: 200,
    badgeId: 'badge-wellness-advocate',
    memoryRuleTitle: 'Use AI to Prepare Questions—Always Confirm with Your Doctor',
    memoryRuleSummary:
      'AI is wonderful for translating big medical words into plain English, building gentle stretching routines, and preparing a question checklist for your real doctor.',
    hints: [
      'Pick the blocks that ask for a plain-English explanation and a list of questions for your physician.',
      'Never ask AI to replace your doctor or enter your Social Security Number.',
      'Select the 3 blocks that explain the term simply, list 4 doctor questions, and use clear bullet points.',
      'Select the 3 recommended building blocks and click "Test My Prompt".',
    ],
    promptScenario: {
      goalTitle: 'Understand a Medical Term & Prepare Doctor Questions',
      familyContext: 'You want plain-English clarity and a printable question checklist for your appointment.',
      safetyReminder: 'Golden Rule: Use AI to understand terms and prepare questions—never change prescription medications without your doctor.',
      sampleAiOutput:
        'In Plain English: "Orthostatic hypotension" simply means a temporary drop in blood pressure when you stand up quickly from sitting or lying down, which can make you feel lightheaded.\n\n4 Questions for Your Doctor Tomorrow:\n• Could any of my current daily medications be contributing to this?\n• How much water should I aim to drink each day?\n• Are there simple ankle exercises I should do before standing up?\n• What symptoms mean I should call the office right away?',
      blocks: [
        {
          id: 'pb-adv-1',
          category: 'role',
          text: 'I am preparing for my doctor appointment tomorrow and want to understand the term "orthostatic hypotension".',
          isRecommended: true,
          whyText: 'Focuses on learning vocabulary and preparing for a real doctor visit.',
        },
        {
          id: 'pb-adv-2',
          category: 'role',
          text: 'My Social Security Number is 123-45-6789, diagnose me.',
          isRecommended: false,
          whyText: 'Never share your SSN, and never use AI as a substitute for a real medical exam.',
        },
        {
          id: 'pb-adv-3',
          category: 'task',
          text: 'Explain what this term means in plain, everyday English and list 4 helpful questions to ask my doctor.',
          isRecommended: true,
          whyText: 'Turns confusing medical jargon into actionable questions for your appointment.',
        },
        {
          id: 'pb-adv-4',
          category: 'task',
          text: 'Reply only in Latin medical textbook terminology.',
          isRecommended: false,
          whyText: 'We want AI to make things clearer, not more complicated!',
        },
        {
          id: 'pb-adv-5',
          category: 'detail',
          text: 'Format the answer with short bullet points so I can print it or read it easily on my phone.',
          isRecommended: true,
          whyText: 'Asking for short bullet points makes the response clean and easy to read.',
        },
        {
          id: 'pb-adv-6',
          category: 'detail',
          text: 'Tell me which prescription pills to stop taking tonight.',
          isRecommended: false,
          whyText: 'Safety Rule: Never change or stop prescription medications based on an AI chat—always ask your doctor.',
        },
      ],
    },
  },

  // =========================================================================
  // TRACK 3: APPLE iOS, APPLE INTELLIGENCE, VOICE & MOBILE APPS
  // =========================================================================
  {
    id: 'topic-apple-ios-intel',
    topicTag: 'Apple iOS & Intelligence',
    courseTopic: 'Apple iOS, Apple Intelligence & Mobile Apps',
    trackId: 'apple_mobile',
    skillLevel: 'beginner',
    title: 'Using Apple iOS "Writing Tools" & Clean Up',
    subtitle: 'Tap the built-in Apple iOS feature that polishes your email or erases background clutter',
    scenarioStory:
      'Let’s explore Apple iOS and Apple Intelligence right on your iPhone! Suppose you drafted a quick note to your neighborhood association, and you want your iPhone to check the spelling and make the tone sound warm and polite before sending. Which built-in Apple Intelligence feature helps you do that?',
    mode: 'iphone_simulator',
    points: 100,
    badgeId: 'badge-apple-intelligence',
    memoryRuleTitle: 'Apple Intelligence "Writing Tools" Lives Right Above Your Keyboard',
    memoryRuleSummary:
      'In Apple iOS, highlight any text in Mail, Messages, or Notes and tap "Writing Tools" to Proofread, Make Friendly, or Summarize—without installing any shady third-party keyboard apps!',
    hints: [
      'You don’t need to pay for an expensive subscription app in the App Store—Apple built this right into Apple iOS.',
      'When you select text in Mail or Notes, a menu pops up with "Writing Tools".',
      'Inside Writing Tools, you can tap "Proofread" or "Friendly" to polish your message.',
      'Tap "Writing Tools → Proofread / Friendly".',
    ],
    iphoneScenario: {
      appScreenTitle: 'Apple iOS Mail & Notes · Apple Intelligence',
      screenContext: 'Drafting Message on iPhone',
      callerOrContact: 'Apple Intelligence Built-in Helper',
      goalInstruction:
        'Which built-in Apple iOS feature lets you proofread your message or make the tone warm and friendly right inside Mail or Notes?',
      options: [
        {
          id: 'ios-opt-1',
          buttonLabel: 'Writing Tools → Proofread / Friendly',
          iconName: 'Sparkles',
          locationHint: 'Built-in Apple Intelligence menu',
          isCorrect: true,
          feedback:
            'Wonderful! Apple Intelligence "Writing Tools" is built right into Apple iOS Mail, Messages, and Notes so you can proofread or soften the tone in one tap.',
        },
        {
          id: 'ios-opt-2',
          buttonLabel: 'Download "$9.99/Week AI Keyboard Ad"',
          iconName: 'Download',
          locationHint: 'App Store pop-up ad',
          isCorrect: false,
          feedback:
            'Watch out for costly weekly subscription keyboard apps in the App Store! Apple iOS includes Writing Tools for free.',
        },
        {
          id: 'ios-opt-3',
          buttonLabel: 'Airplane Mode Toggle',
          iconName: 'Zap',
          locationHint: 'Control Center icon',
          isCorrect: false,
          feedback: 'Airplane Mode turns off your cellular and Wi-Fi signals for flights.',
        },
        {
          id: 'ios-opt-4',
          buttonLabel: 'Delete Entire Draft',
          iconName: 'PhoneOff',
          locationHint: 'Trash can icon',
          isCorrect: false,
          feedback: 'No need to start over—Writing Tools polishes the words you already typed!',
        },
      ],
    },
  },
  {
    id: 'topic-voice-assistants',
    topicTag: 'Voice Assistants & Dictation',
    courseTopic: 'Smart Assistants, Voice Technology & Social Connectivity',
    trackId: 'apple_mobile',
    skillLevel: 'intermediate',
    title: 'Hands-Free Voice Dictation & Smart Assistants',
    subtitle: 'Use your voice to type long messages and set kitchen timers effortlessly',
    scenarioStory:
      'It is so much easier to speak instead of pecking every letter on a small glass keyboard! On your iPhone keyboard, which button lets you speak your text message out loud while the phone types it for you?',
    mode: 'iphone_simulator',
    points: 150,
    badgeId: 'badge-voice-maestro',
    memoryRuleTitle: 'Tap the Microphone on Your Keyboard to Speak Instead of Type',
    memoryRuleSummary:
      'Whenever you see the on-screen keyboard, tap the little Microphone icon in the bottom-right corner and speak naturally—you can even say "period" or "question mark" out loud!',
    hints: [
      'Look at the bottom corner of the iPhone keyboard when you are in Messages, Mail, or ChatGPT.',
      'You can speak full sentences out loud and watch the words appear on screen automatically.',
      'Look for the "Microphone Dictation Icon" on the keyboard.',
      'Tap "Keyboard Microphone (Voice Dictation)" to speak your message hands-free!',
    ],
    iphoneScenario: {
      appScreenTitle: 'Apple iOS Voice Technology & Siri',
      screenContext: 'Replying to Family Group Chat',
      callerOrContact: 'Hands-Free Voice Dictation',
      goalInstruction:
        'Instead of typing a long story with one finger on the small keyboard, which button lets you speak naturally so your iPhone types the words for you?',
      options: [
        {
          id: 'vc-opt-1',
          buttonLabel: 'Keyboard Microphone (Voice Dictation)',
          iconName: 'Mic',
          locationHint: 'Bottom-right of iPhone keyboard',
          isCorrect: true,
          feedback:
            'Spot on! Voice dictation is a game-changer for texting family and talking to AI—just tap the Microphone icon, speak naturally, and tap it again when finished!',
        },
        {
          id: 'vc-opt-2',
          buttonLabel: 'Mute Ringer Switch',
          iconName: 'MicOff',
          locationHint: 'Side of iPhone',
          isCorrect: false,
          feedback: 'That silences incoming phone rings, rather than turning on voice dictation.',
        },
        {
          id: 'vc-opt-3',
          buttonLabel: 'End Call Button',
          iconName: 'PhoneOff',
          locationHint: 'Red phone icon',
          isCorrect: false,
          feedback: 'The red phone icon hangs up a voice call.',
        },
        {
          id: 'vc-opt-4',
          buttonLabel: 'Camera Shutter Button',
          iconName: 'Camera',
          locationHint: 'Camera app',
          isCorrect: false,
          feedback: 'The shutter snaps a photo—use the Microphone icon on your keyboard to dictate text!',
        },
      ],
    },
  },
  {
    id: 'topic-health-apps-id',
    topicTag: 'Health & Wellness Apps',
    courseTopic: 'Health and Wellness Apps · Emergency Medical ID',
    trackId: 'apple_mobile',
    skillLevel: 'advanced',
    title: 'Setting Up Your iPhone Emergency Medical ID',
    subtitle: 'Make sure first responders can see your allergies and emergency contacts from the Lock Screen',
    scenarioStory:
      'One of the most important features inside the Apple Health app (the white icon with a red heart ♥) is your Medical ID. Why is enabling "Show When Locked" on your Medical ID so helpful in an emergency?',
    mode: 'iphone_simulator',
    points: 200,
    badgeId: 'badge-health-guardian',
    memoryRuleTitle: 'Medical ID Lets Paramedics See Allergies & Contacts Without Your Passcode',
    memoryRuleSummary:
      'Open the Apple Health app (red heart icon) → tap your profile picture → Medical ID, and turn ON "Show When Locked" so paramedics can call your spouse or children without needing your private passcode.',
    hints: [
      'If you ever need help while out on a walk, a paramedic won’t know your 6-digit iPhone unlock passcode.',
      'In the Apple Health app, Medical ID displays only your emergency contacts, medications, and allergies on the Emergency screen.',
      'Turning on "Show When Locked" keeps your texts and bank apps locked while making your emergency info accessible.',
      'Tap "Turn ON Show When Locked" to complete the setup.',
    ],
    iphoneScenario: {
      appScreenTitle: 'Apple Health App (♥) · Medical ID',
      screenContext: 'Allergies · Medications · Emergency Contacts',
      callerOrContact: 'First Responder Lock Screen Access',
      goalInstruction:
        'Inside the Apple Health app’s Medical ID screen, which setting ensures paramedics can view your emergency contact and allergies without unlocking your private phone?',
      options: [
        {
          id: 'hl-opt-1',
          buttonLabel: 'Turn ON "Show When Locked"',
          iconName: 'Users',
          locationHint: 'Medical ID Emergency Access toggle',
          isCorrect: true,
          feedback:
            'Bravo! Turning on "Show When Locked" allows a paramedic to tap "Emergency → Medical ID" on your lock screen to see your medications and call your family—while keeping all your personal apps locked!',
        },
        {
          id: 'hl-opt-2',
          buttonLabel: 'Tape Your Bank PIN to the Back of Your Phone',
          iconName: 'ExternalLink',
          locationHint: 'Unsafe physical note',
          isCorrect: false,
          feedback: 'Never tape your passcode or bank PIN to your phone! Medical ID shares only emergency health info while keeping your phone locked.',
        },
        {
          id: 'hl-opt-3',
          buttonLabel: 'Delete the Health App',
          iconName: 'PhoneOff',
          locationHint: 'Remove app',
          isCorrect: false,
          feedback: 'Keep the Apple Health app—it also tracks walking steadiness, step counts, and medication reminders!',
        },
        {
          id: 'hl-opt-4',
          buttonLabel: 'Mute All Notifications',
          iconName: 'MicOff',
          locationHint: 'Settings',
          isCorrect: false,
          feedback: 'Use "Show When Locked" inside Medical ID so emergency contacts are always reachable.',
        },
      ],
    },
  },

  // =========================================================================
  // TRACK 4: PHOTOS, STORAGE & ADOBE FIREFLY
  // =========================================================================
  {
    id: 'topic-photos-storage',
    topicTag: 'Photos & Storage',
    courseTopic: 'Managing Photos and Storage',
    trackId: 'photos_creative',
    skillLevel: 'beginner',
    title: 'Brightening Dark Photos & Using Favorites (♥)',
    subtitle: 'Use the interactive sliders to brighten the basket and mark the photo as a Favorite (♥)',
    scenarioStory:
      'Let’s practice rescuing dark photos and finding our best pictures in seconds! Adjust the Brightness slider on this shaded garden snapshot of the puppies and kitten, and tap the Heart (♥) so it goes straight into your Favorites album.',
    mode: 'photo_studio',
    points: 100,
    badgeId: 'badge-memory-keeper',
    memoryRuleTitle: 'Tap the Heart (♥) & Merge Duplicates to Save Storage',
    memoryRuleSummary:
      'Instead of scrolling through 5,000 photos, tap the Heart (♥) on your favorites. And to free up space, scroll down in Photos to "Utilities → Duplicates" and tap Merge!',
    hints: [
      'Move the Brightness slider into the green target zone (between 110% and 135%).',
      'Look below the photo for the "Mark as Favorite ♥" button and tap it so the heart turns solid.',
      'You can see the puppies and flowers brighten live on screen as you slide the Brightness control to the right.',
      'Set Brightness between 110% and 135%, and make sure the Heart (Favorite) button is turned ON!',
    ],
    photoScenario: {
      imageUrl: PHOTO_LESSON_IMAGE,
      photoTitle: 'Garden Basket Puppies & Kitten',
      photoDateLocation: 'Photo Studio · Sunny Backyard Garden',
      initialBrightness: 70,
      initialWarmth: 100,
      initialZoom: 100,
      goalDescription:
        '1. Slide Brightness up between 110% and 135% so the puppies and flowers shine clearly.\n2. Tap the "Mark as Favorite ♥" button so you can find this photo anytime.',
      targets: {
        targetBrightness: [110, 135],
        targetWarmth: [90, 130],
        targetZoom: [100, 130],
        requireFavorite: true,
        requireSharedFamily: false,
      },
    },
  },
  {
    id: 'topic-firefly-cottage',
    topicTag: 'Adobe Firefly & AI Images',
    courseTopic: 'Introduction to Adobe Firefly and AI Images',
    trackId: 'photos_creative',
    skillLevel: 'intermediate',
    title: 'Creating AI Art in Adobe Firefly',
    subtitle: 'Match the Subject, Content Style, and Lighting controls used in Adobe Firefly',
    scenarioStory:
      'Adobe Firefly lets you pick your Content Type (Photo vs. Art), Visual Style, and Lighting! Inspect the "Serenity Lake Cottage" artwork below and select the 3 Firefly ingredients that created it.',
    mode: 'ai_media_director',
    points: 150,
    badgeId: 'badge-firefly-creator',
    memoryRuleTitle: 'In Adobe Firefly: Prompt + Content Type (Art/Photo) + Lighting = Magic',
    memoryRuleSummary:
      'Adobe Firefly makes AI image creation visual! Type what you want to see in the prompt bar, then use Firefly’s right-hand panel to pick "Art" or "Photo", brush styles, and golden hour lighting.',
    hints: [
      'Look closely at the picture: What is the main subject? Is it a Watercolor Art piece or a 35mm Photograph?',
      'Notice the lavender wildflowers, stone cottage, and wooden boat by the mountain lake.',
      'The brush strokes are "Hand-painted watercolor illustration" and the sky glows with "Warm golden sunset glow".',
      'Select Subject: "Stone cottage & rowboat by a mountain lake", Style: "Hand-painted watercolor illustration", Lighting: "Warm golden sunset glow".',
    ],
    mediaScenario: {
      targetImageId: 'scene-cottage',
      goalInstruction:
        'Match the Adobe Firefly prompt recipe (Subject + Style + Lighting) for "Serenity Lake Cottage":',
      selectableSubjects: [
        'Stone cottage & rowboat by a mountain lake',
        'Vintage steam train on a stone bridge',
        'Golden retriever in a silver space suit',
      ],
      selectableStyles: [
        'Hand-painted watercolor illustration',
        'Cinematic 35mm film photography',
        'Whimsical storybook illustration',
      ],
      selectableLightings: [
        'Warm golden sunset glow',
        'Misty sunrise sunbeams through fog',
        'Starry night sky with Earth glow',
      ],
      correctSubject: 'Stone cottage & rowboat by a mountain lake',
      correctStyle: 'Hand-painted watercolor illustration',
      correctLighting: 'Warm golden sunset glow',
      scenes: [
        {
          id: 'scene-cottage',
          title: 'Serenity Lake Cottage (Adobe Firefly Art Mode)',
          imageUrl: AI_COTTAGE_IMAGE,
          subjectTag: 'Stone cottage & rowboat by a mountain lake',
          styleTag: 'Hand-painted watercolor illustration',
          lightingTag: 'Warm golden sunset glow',
          motionEffect: 'still',
          caption: 'Adobe Firefly · Content Type: Art · Watercolor & Warm Sunset',
        },
        {
          id: 'scene-train',
          title: 'Highland Steam Express',
          imageUrl: AI_TRAIN_IMAGE,
          subjectTag: 'Vintage steam train on a stone bridge',
          styleTag: 'Cinematic 35mm film photography',
          lightingTag: 'Misty sunrise sunbeams through fog',
          motionEffect: 'pan',
          caption: 'Adobe Firefly · Content Type: Photo · 35mm Morning Mist',
        },
        {
          id: 'scene-dog',
          title: 'Barney the Moon Explorer',
          imageUrl: AI_DOG_IMAGE,
          subjectTag: 'Golden retriever in a silver space suit',
          styleTag: 'Whimsical storybook illustration',
          lightingTag: 'Starry night sky with Earth glow',
          motionEffect: 'zoom',
          caption: 'Storybook Illustration · Generative Fill & Custom Character',
        },
      ],
    },
  },
  {
    id: 'topic-creative-project',
    topicTag: 'Creative Digital Projects',
    courseTopic: 'Planning and Executing a Creative Digital Project & Portfolio',
    trackId: 'photos_creative',
    skillLevel: 'advanced',
    title: 'Directing a Storybook Illustration & Video Project',
    subtitle: 'Combine imaginative character prompts and camera motion for your Creative Digital Project',
    scenarioStory:
      'When planning a Creative Digital Project or building a Digital Portfolio, you can create custom illustrated cards or storybooks for your family! Build the exact Firefly & AI Video recipe for "Barney the Moon Explorer".',
    mode: 'ai_media_director',
    points: 200,
    badgeId: 'badge-portfolio-director',
    memoryRuleTitle: 'Combine Playful Ideas & Keep Consistent Style for Digital Projects',
    memoryRuleSummary:
      'When building a Creative Digital Project (like a family storybook or greeting card collection), reuse the same Style & Lighting words in every prompt so all your pictures match!',
    hints: [
      'Inspect "Barney the Moon Explorer" featuring the golden retriever holding sunflowers on the moon.',
      'What is the subject, what art style is used, and what is in the background sky?',
      'Choose "Golden retriever in a silver space suit", "Whimsical storybook illustration", and "Starry night sky with Earth glow".',
      'Select those 3 options and click "Create & Match Visual"!',
    ],
    mediaScenario: {
      targetImageId: 'scene-dog',
      goalInstruction:
        'Select the Subject, Style, and Lighting to add "Barney the Moon Explorer" to your Creative Digital Portfolio!',
      selectableSubjects: [
        'Stone cottage & rowboat by a mountain lake',
        'Vintage steam train on a stone bridge',
        'Golden retriever in a silver space suit',
      ],
      selectableStyles: [
        'Hand-painted watercolor illustration',
        'Cinematic 35mm film photography',
        'Whimsical storybook illustration',
      ],
      selectableLightings: [
        'Warm golden sunset glow',
        'Misty sunrise sunbeams through fog',
        'Starry night sky with Earth glow',
      ],
      correctSubject: 'Golden retriever in a silver space suit',
      correctStyle: 'Whimsical storybook illustration',
      correctLighting: 'Starry night sky with Earth glow',
      scenes: [
        {
          id: 'scene-cottage',
          title: 'Serenity Lake Cottage',
          imageUrl: AI_COTTAGE_IMAGE,
          subjectTag: 'Stone cottage & rowboat by a mountain lake',
          styleTag: 'Hand-painted watercolor illustration',
          lightingTag: 'Warm golden sunset glow',
          motionEffect: 'still',
          caption: 'Watercolor Cottage Scene',
        },
        {
          id: 'scene-train',
          title: 'Highland Steam Express',
          imageUrl: AI_TRAIN_IMAGE,
          subjectTag: 'Vintage steam train on a stone bridge',
          styleTag: 'Cinematic 35mm film photography',
          lightingTag: 'Misty sunrise sunbeams through fog',
          motionEffect: 'pan',
          caption: 'Cinematic Train Viaduct Scene',
        },
        {
          id: 'scene-dog',
          title: 'Barney the Moon Explorer',
          imageUrl: AI_DOG_IMAGE,
          subjectTag: 'Golden retriever in a silver space suit',
          styleTag: 'Whimsical storybook illustration',
          lightingTag: 'Starry night sky with Earth glow',
          motionEffect: 'zoom',
          caption: 'Creative Digital Project · Storybook Illustration with Gentle Zoom',
        },
      ],
    },
  },

  // =========================================================================
  // TRACK 5: SECURITY, DEEPFAKES & RESPONSIBLE AI
  // =========================================================================
  {
    id: 'topic-staying-safe-online',
    topicTag: 'Staying Safe Online',
    courseTopic: 'Staying Safe Online and Security',
    trackId: 'security_ethics',
    skillLevel: 'beginner',
    title: 'Spotting Phishing Emails & Fake Delivery Texts',
    subtitle: 'Inspect this email and tap the 2 hidden phishing clues before clicking',
    scenarioStory:
      'Scammers often disguise themselves as USPS, FedEx, or Amazon. Tap the two clues inside this email that prove it is a phishing trap.',
    mode: 'scam_inspector',
    points: 100,
    badgeId: 'badge-scam-spotter',
    memoryRuleTitle: 'Always Check the Real Email Address After the "@" Symbol',
    memoryRuleSummary:
      'Anyone can set their display name to "USPS" or "Apple Support". Always tap or look at the address after "@" and never pay a "redelivery fee" or buy gift cards via link.',
    hints: [
      'Check the actual email address after the "@" symbol and look at what the link demands.',
      'Does the U.S. Postal Service use "@mail-alert-parcel-88.ru" or charge $2.95 to redeliver?',
      'Legitimate shippers never ask for your credit card just to schedule a standard doorstep delivery.',
      'Tap the strange sender address (@mail-alert-parcel-88.ru) and the urgent $2.95 payment link.',
    ],
    scamScenario: {
      deviceType: 'email',
      senderName: 'USPS Delivery Support',
      senderAddressOrNumber: 'notice@mail-alert-parcel-88.ru',
      timestamp: 'Today · 9:42 AM',
      subjectLine: 'FINAL NOTICE: Parcel #US-9941 Held at Warehouse',
      requiredRedFlagsCount: 2,
      hotspots: [
        {
          id: 'hs-email-1',
          position: 'sender',
          label: 'Actual Sender Address',
          regionText: 'From: USPS Delivery Support <notice@mail-alert-parcel-88.ru>',
          isRedFlag: true,
          explanation:
            'Red Flag Found! Even though the name says "USPS", the real address ends in "@mail-alert-parcel-88.ru", not usps.com.',
        },
        {
          id: 'hs-email-2',
          position: 'body',
          label: 'Tracking Note',
          regionText: 'We attempted to deliver your package today at 8:15 AM while you were away.',
          isRedFlag: false,
          explanation:
            'This sentence sounds normal on its own—look closer at the sender address and the payment link!',
        },
        {
          id: 'hs-email-3',
          position: 'link',
          label: 'Credit Card Redelivery Button',
          regionText:
            '[ CLICK HERE WITHIN 12 HOURS: Enter Credit Card to Pay $2.95 Redelivery Fee or Package Will Be Destroyed ]',
          isRedFlag: true,
          explanation:
            'Red Flag Found! Fake countdown threats ("within 12 hours") and asking for a credit card to pay a small fee are classic phishing traps.',
        },
      ],
    },
  },
  {
    id: 'topic-deepfakes-misinfo',
    topicTag: 'Deepfakes & Scam Defense',
    courseTopic: 'Privacy, Cybersecurity, Scams, Deepfakes, and Misinformation',
    trackId: 'security_ethics',
    skillLevel: 'intermediate',
    title: 'Defending Against AI Voice Clones & Deepfakes',
    subtitle: 'Spot the 2 red flags in a suspicious emergency call and use your Family Safe Word',
    scenarioStory:
      'AI can now imitate a voice from a short social media clip! You get a frantic call from an unknown number that sounds like your nephew asking for bail or gift cards. Tap the 2 red flags!',
    mode: 'scam_inspector',
    points: 150,
    badgeId: 'badge-deepfake-defender',
    memoryRuleTitle: 'Create a Secret "Family Safe Word" & Call Back on Their Known Number',
    memoryRuleSummary:
      'To beat AI voice-cloning scams, pick a fun secret Family Safe Word (like "Blueberry Pancake") that only real family members know, and always hang up to call their saved phone number directly.',
    hints: [
      'Notice how the caller refuses to answer a personal family question and demands gift cards or wire transfers.',
      'An AI voice clone or scammer won’t know your family’s secret Safe Word!',
      'And no real court, police station, or hospital ever accepts Apple Gift Cards or Bitcoin.',
      'Tap the "Fails the Family Safe Word Test" clue and the "Send $1,500 via Gift Cards / Wire" clue.',
    ],
    scamScenario: {
      deviceType: 'call',
      senderName: 'Unknown Caller ID · Voice Sounds Familiar',
      senderAddressOrNumber: 'Private / Blocked Number',
      timestamp: 'Incoming Call · Deepfake Defense Lab',
      requiredRedFlagsCount: 2,
      hotspots: [
        {
          id: 'hs-df-1',
          position: 'header',
          label: 'Emotional Opening',
          regionText: '"Auntie, it’s me! I have a bad cold so my voice sounds strange, and my phone broke in a car accident!"',
          isRedFlag: false,
          explanation:
            'Scammers often claim they have a cold or broken phone to explain why the voice sounds slightly robotic—test them with a Family Safe Word next!',
        },
        {
          id: 'hs-df-2',
          position: 'body',
          label: 'Fails the Family Safe Word Test',
          regionText:
            'When you ask for your Family Safe Word, the caller says: "I don’t have time for silly code words! Don’t hang up or call my parents!"',
          isRedFlag: true,
          explanation:
            'Red Flag Found! Dodging your Family Safe Word and begging you not to call their parents or their real phone number is a huge giveaway.',
        },
        {
          id: 'hs-df-3',
          position: 'footer',
          label: 'Untraceable Payment Demand',
          regionText:
            '"My lawyer says you must wire $1,500 or read three $500 Target Gift Card PINs in the next 20 minutes."',
          isRedFlag: true,
          explanation:
            'Red Flag Found! No real lawyer, court, or hospital ever asks for gift cards or urgent wire transfers over the phone.',
        },
      ],
    },
  },
  {
    id: 'topic-ai-responsibly-ethics',
    topicTag: 'Responsible & Ethical AI',
    courseTopic: 'Navigating AI Responsibly & Ethical Implications of AI',
    trackId: 'security_ethics',
    skillLevel: 'advanced',
    title: 'Spotting AI "Hallucinations" & Navigating Responsibly',
    subtitle: 'Identify the 2 mistakes in this AI-generated neighborhood newsletter before sharing it',
    scenarioStory:
      'Because AI models predict words, they can sometimes make up confident-sounding false facts ("hallucinations")! Tap the 2 suspicious claims in this AI draft before emailing it to your club.',
    mode: 'scam_inspector',
    points: 200,
    badgeId: 'badge-ethics-steward',
    memoryRuleTitle: 'Trust, But Verify: Always Double-Check AI Dates, Laws & Quotes',
    memoryRuleSummary:
      'AI is a wonderful brainstorming partner, but it can occasionally invent fake book titles, dates, or local rules ("hallucinations"). Always verify dates, phone numbers, and health/legal facts!',
    hints: [
      'Read all 3 sections of the AI-written club newsletter carefully.',
      'Look for an invented historical quote or a made-up city tax law that sounds too strange to be true.',
      'Also check whether sharing neighbors’ private home addresses and birthdays in an AI prompt respects their privacy.',
      'Tap the "Confident AI Hallucination" box and the "Ethical Privacy Boundary" box.',
    ],
    scamScenario: {
      deviceType: 'email',
      senderName: 'AI Drafted Club Newsletter',
      senderAddressOrNumber: 'Fact-Check & Ethics Review before Sending',
      timestamp: 'Responsible AI Lab',
      subjectLine: 'Draft: Oakwood Garden Club Monthly Update',
      requiredRedFlagsCount: 2,
      hotspots: [
        {
          id: 'hs-eth-1',
          position: 'header',
          label: 'Friendly Seasonal Intro',
          regionText: '"Welcome to autumn! Remember to water your mums twice a week and bring tender herbs indoors before the first frost."',
          isRedFlag: false,
          explanation:
            'General gardening tips like watering mums are something AI handles very well!',
        },
        {
          id: 'hs-eth-2',
          position: 'body',
          label: 'Confident AI "Hallucination" (Invented Fact)',
          regionText:
            '"According to Supreme Court Statute 884-B passed yesterday, every resident who grows tomatoes must register each tomato with NASA by Friday."',
          isRedFlag: true,
          explanation:
            'Red Flag Found! This is an AI "hallucination"—AI sometimes invents official-sounding statute numbers or laws. Always fact-check legal or local rules!',
        },
        {
          id: 'hs-eth-3',
          position: 'footer',
          label: 'Ethical Privacy Boundary',
          regionText:
            '"Note: I pasted all 40 club members’ home addresses, birthdates, and medical notes into a public AI tool to generate this roster."',
          isRedFlag: true,
          explanation:
            'Red Flag Found! Navigating AI responsibly means protecting friends’ privacy—never upload a roster of other people’s private addresses or health notes to public AI tools.',
        },
      ],
    },
  },

  // =========================================================================
  // TRACK 6: SMART HOME, CASTING, VR, TRAVEL & VIBE CODING
  // =========================================================================
  {
    id: 'topic-smarthome-casting',
    topicTag: 'Smart Home & TV Casting',
    courseTopic: 'Smart Home Essentials + Streaming Services & Casting',
    trackId: 'smart_living_future',
    skillLevel: 'beginner',
    title: 'Casting a Video from Your Phone to the Big TV',
    subtitle: 'Find the AirPlay / Cast icon to enjoy photos and videos on your living room television',
    scenarioStory:
      'Your iPhone or tablet can beam videos and family slideshows straight to your living room Smart TV! When your phone and TV are on the same home Wi-Fi, which icon casts your screen to the TV?',
    mode: 'iphone_simulator',
    points: 100,
    badgeId: 'badge-smart-caster',
    memoryRuleTitle: 'Same Wi-Fi + The TV Screen Icon with Waves = Effortless Casting',
    memoryRuleSummary:
      'Make sure your phone and Smart TV are on the same home Wi-Fi network, then tap the AirPlay (TV triangle) or Cast (TV rectangle with Wi-Fi waves) icon inside YouTube, Photos, or Netflix!',
    hints: [
      'You don’t need to buy a long HDMI cable across the living room rug to show photos on your Smart TV.',
      'Look for the symbol shaped like a TV screen with a small triangle or Wi-Fi waves at the corner.',
      'This button is called "AirPlay" on Apple devices and "Cast" in YouTube and Netflix.',
      'Tap "AirPlay / Cast to TV Icon" to beam your video onto the big screen!',
    ],
    iphoneScenario: {
      appScreenTitle: 'Living Room Smart TV & iPhone Casting',
      screenContext: 'Connected to Home Wi-Fi · Living Room TV Ready',
      callerOrContact: 'AirPlay & Smart Casting Controls',
      goalInstruction:
        'Your cousins are visiting and you want everyone to watch a travel video on the big 65-inch TV instead of crowding around your small iPhone. Which button beams it to the TV?',
      options: [
        {
          id: 'cast-opt-1',
          buttonLabel: 'AirPlay / Cast to TV Icon',
          iconName: 'Video',
          locationHint: 'TV rectangle with triangle / Wi-Fi waves',
          isCorrect: true,
          feedback:
            'Wonderful! Tapping the AirPlay or Cast icon sends your video or photo slideshow wirelessly to your Smart TV over your home Wi-Fi!',
        },
        {
          id: 'cast-opt-2',
          buttonLabel: 'Turn Off Home Wi-Fi Router',
          iconName: 'PhoneOff',
          locationHint: 'Unplug router',
          isCorrect: false,
          feedback: 'Casting works because your phone and TV talk to each other over your home Wi-Fi—keep Wi-Fi turned ON!',
        },
        {
          id: 'cast-opt-3',
          buttonLabel: 'Mute Microphone',
          iconName: 'MicOff',
          locationHint: 'Audio mute',
          isCorrect: false,
          feedback: 'Mute turns off your microphone; look for the AirPlay / Cast TV icon instead.',
        },
        {
          id: 'cast-opt-4',
          buttonLabel: 'Flashlight Torch',
          iconName: 'Zap',
          locationHint: 'Back LED light',
          isCorrect: false,
          feedback: 'The flashlight illuminates a dark room, whereas AirPlay / Cast beams video to your television.',
        },
      ],
    },
  },
  {
    id: 'topic-vr-travel',
    topicTag: '3D Virtual Reality & Travel',
    courseTopic: 'Virtual Reality (The 3D World) + AI for Travel and Navigation',
    trackId: 'smart_living_future',
    skillLevel: 'intermediate',
    title: 'AI Travel Planning & Exploring 3D Virtual Worlds',
    subtitle: 'Build an accessible travel itinerary and preview landmarks in 3D before you go',
    scenarioStory:
      'Combine AI trip planners with 3D street-level and Virtual Reality previews! Assemble the 3 prompt blocks below to plan a relaxed, step-free 3-day trip to Paris—including 3D virtual museum tours you can explore from home!',
    mode: 'ai_prompt_builder',
    points: 150,
    badgeId: 'badge-vr-explorer',
    memoryRuleTitle: 'Ask AI for Step-Free Pace, Packing Lists & 3D Virtual Previews',
    memoryRuleSummary:
      'When planning travel with AI, specify your walking pace ("no more than 2 activities per day, elevator/step-free access") and use 3D Look Around / VR museum tours to preview the sights!',
    hints: [
      'Pick the 3 blocks that describe a comfortable senior-friendly travel pace, a 3-day itinerary with 3D virtual previews, and accessibility tips.',
      'Avoid vague 1-word prompts ("Paris") or typing your passport number into chat.',
      'Combine: planning a 3-day cultural trip + 2 relaxed stops per day with 3D VR museum previews + step-free elevator access & quiet cafés.',
      'Select the 3 recommended travel & VR blocks and press "Test My Prompt".',
    ],
    promptScenario: {
      goalTitle: 'Plan a Relaxed, Accessible Trip + 3D Virtual Tour Preview',
      familyContext: 'Combine AI for Travel with 3D Virtual Reality exploration!',
      safetyReminder: 'Travel Safety Rule: Never type your Passport Number, Frequent Flyer password, or credit card into an AI chat!',
      sampleAiOutput:
        'Your Relaxed 3-Day Cultural Itinerary & 3D Virtual Preview:\n• Morning 1: Louvre Museum (Use the Pyramid glass elevator for step-free access! Preview the galleries in 3D VR from your tablet tonight).\n• Afternoon 1: Quiet courtyard tea at Café de Flore, followed by a seated Seine River sunset cruise.\n• Navigation Tip: In Apple/Google Maps, tap the Binoculars icon ("Look Around" / 3D Street View) to see the exact café entrance before you arrive!',
      blocks: [
        {
          id: 'pb-trv-1',
          category: 'role',
          text: 'My spouse and I are planning a relaxed 3-day cultural trip to Paris and love art history and scenic cafés.',
          isRecommended: true,
          whyText: 'Tells the AI who is traveling, how many days, and what you enjoy.',
        },
        {
          id: 'pb-trv-2',
          category: 'role',
          text: 'My Passport number is 554433221, book me a flight.',
          isRecommended: false,
          whyText: 'Safety Rule: Never type your passport number into an AI prompt!',
        },
        {
          id: 'pb-trv-3',
          category: 'task',
          text: 'Create a 3-day itinerary with only 1 morning and 1 afternoon activity per day, plus 2 museums we can preview in 3D Virtual Reality before we fly.',
          isRecommended: true,
          whyText: 'Prevents an exhausting schedule and connects right to 3D VR exploration!',
        },
        {
          id: 'pb-trv-4',
          category: 'task',
          text: 'Schedule 18 exhausting stops per day starting at 4:00 AM.',
          isRecommended: false,
          whyText: 'No one wants an exhausting 18-stop marathon on vacation!',
        },
        {
          id: 'pb-trv-5',
          category: 'detail',
          text: 'Prioritize step-free elevator entrances, nearby seating, and tell me how to preview the street entrances in 3D Maps.',
          isRecommended: true,
          whyText: 'Makes the itinerary comfortable, practical, and easy to navigate.',
        },
        {
          id: 'pb-trv-6',
          category: 'detail',
          text: 'Leave out all restaurant names and directions.',
          isRecommended: false,
          whyText: 'Helpful travel plans should include nearby cafés and simple transit tips!',
        },
      ],
    },
  },
  {
    id: 'topic-vibe-coding-future',
    topicTag: 'Vibe Coding & Future of AI',
    courseTopic: 'Vibe Coding + The Future of AI — Risks, Realities & Big Questions',
    trackId: 'smart_living_future',
    skillLevel: 'advanced',
    title: '"Vibe Coding" — Building Your Own App Using Plain English!',
    subtitle: 'Design a custom family recipe or club app by describing its Purpose, Visual Style, and Features',
    scenarioStory:
      '"Vibe Coding" means you don’t need to memorize computer programming code anymore—you can build a real working web app just by describing what you want in plain English! Assemble the 3 Vibe Coding instructions below to create a "Family Recipe & Herb Garden App".',
    mode: 'ai_prompt_builder',
    points: 200,
    badgeId: 'badge-vibe-coder',
    memoryRuleTitle: 'Vibe Coding = Describe the App’s Goal + Visual Layout + Interactive Buttons',
    memoryRuleSummary:
      'In the era of Vibe Coding, your life experience and clear communication are the superpower! Describe (1) Who the app is for, (2) What buttons and features it needs, and (3) Large, high-contrast senior-friendly design.',
    hints: [
      'Think like an App Designer: tell the AI coding assistant what the app does, what interactive buttons to include, and how to make it easy to read.',
      'Avoid vague 1-word commands ("Code") or asking for tiny unreadable text.',
      'Combine: building a Family Recipe Keeper app + search bar, ingredient scaler, and print button + large high-contrast buttons and warm colors.',
      'Select the 3 recommended Vibe Coding blocks and click "Test My Prompt"!',
    ],
    promptScenario: {
      goalTitle: 'Vibe Code a "Family Heirloom Recipe & Garden App"',
      familyContext: 'Turn your everyday ideas into real interactive software using plain English!',
      safetyReminder: 'The Future of AI Takeaway: AI tools handle the technical syntax, while human wisdom, warmth, ethics, and creativity guide what we build!',
      sampleAiOutput:
        'Vibe Coding Blueprint Ready to Build!\n• App Created: "Sunlit Kitchen & Family Recipe Box"\n• Interactive Features Built:\n  1. Instant Search Bar by ingredient ("Apples", "Rosemary", "Low-Sodium").\n  2. One-Click Serving Scaler (Switch any recipe between 2, 4, or 8 servings automatically!).\n  3. Large-Print Recipe View with a "Keep Screen Awake While Cooking" toggle and a "Share with Family" button!',
      blocks: [
        {
          id: 'pb-vibe-1',
          category: 'role',
          text: 'Build a friendly web application called "Family Recipe & Garden Keeper" for sharing heirloom family recipes with my children and grandkids.',
          isRecommended: true,
          whyText: 'Gives the AI Vibe Coding tool a clear purpose and title for your app.',
        },
        {
          id: 'pb-vibe-2',
          category: 'role',
          text: 'Write binary 010101 machine code.',
          isRecommended: false,
          whyText: 'The whole magic of Vibe Coding is speaking in plain, natural English!',
        },
        {
          id: 'pb-vibe-3',
          category: 'task',
          text: 'Include a category filter (Soups, Salads, Desserts), an interactive button that scales ingredients from 2 to 6 servings, and a Clean Print button.',
          isRecommended: true,
          whyText: 'Specifies the exact interactive buttons that make your app genuinely useful in the kitchen.',
        },
        {
          id: 'pb-vibe-4',
          category: 'task',
          text: 'Make all the buttons do nothing when clicked.',
          isRecommended: false,
          whyText: 'We want real working interactive buttons in our Vibe Coded app!',
        },
        {
          id: 'pb-vibe-5',
          category: 'detail',
          text: 'Use a warm, sunlit color palette with large 18px high-contrast text and big, easy-to-tap buttons for tablets and phones.',
          isRecommended: true,
          whyText: 'Ensures your app looks welcoming and is comfortable for the whole family to read!',
        },
        {
          id: 'pb-vibe-6',
          category: 'detail',
          text: 'Use tiny 8px light-gray text on a white background.',
          isRecommended: false,
          whyText: 'Good app design always prioritizes high contrast and comfortable reading!',
        },
      ],
    },
  },
];

export const BADGES: BadgeItem[] = [
  {
    id: 'badge-browser-navigator',
    topicTag: 'Browsers & Web Search',
    title: 'Browser & Search Navigator',
    trackId: 'browsers_cloud',
    skillLevel: 'beginner',
    description: 'Mastered Bookmarks (★), browser tabs, and skipping "Sponsored Ad" search traps.',
    visualSymbol: 'SearchCheck',
    unlockRequirementText: 'Complete the Browser & Search Challenge',
  },
  {
    id: 'badge-workspace-pro',
    topicTag: 'Google Workspace & Drive',
    title: 'Google Workspace Organizer',
    trackId: 'browsers_cloud',
    skillLevel: 'intermediate',
    description: 'Shared Google Drive documents safely using "Viewer" read-only permissions.',
    visualSymbol: 'BookOpen',
    unlockRequirementText: 'Complete the Google Workspace Challenge',
  },
  {
    id: 'badge-cloud-architect',
    topicTag: 'Cloud Storage & Portfolios',
    title: 'Cloud & Portfolio Architect',
    trackId: 'browsers_cloud',
    skillLevel: 'advanced',
    description: 'Mastered Cloud sync and Digital Portfolio restoration across devices.',
    visualSymbol: 'Award',
    unlockRequirementText: 'Complete the Cloud & Portfolio Challenge',
  },
  {
    id: 'badge-chatgpt-starter',
    topicTag: 'ChatGPT & Entertainment',
    title: 'ChatGPT Prompt Chef',
    trackId: 'ai_assistants',
    skillLevel: 'beginner',
    description: 'Used the 3-Part Prompt Recipe to plan a family dinner and 1960s trivia game.',
    visualSymbol: 'MessageSquare',
    unlockRequirementText: 'Complete the ChatGPT Basics Challenge',
  },
  {
    id: 'badge-copilot-pilot',
    topicTag: 'MS Copilot & Learning',
    title: 'MS Copilot Explorer',
    trackId: 'ai_assistants',
    skillLevel: 'intermediate',
    description: 'Used Microsoft Copilot for lifelong learning summaries with verified web footnotes.',
    visualSymbol: 'Sparkles',
    unlockRequirementText: 'Complete the MS Copilot Challenge',
  },
  {
    id: 'badge-wellness-advocate',
    topicTag: 'AI for Health & Wellness',
    title: 'AI Health & Wellness Advocate',
    trackId: 'ai_assistants',
    skillLevel: 'advanced',
    description: 'Used AI safely to translate medical terms and prepare doctor appointment questions.',
    visualSymbol: 'Heart',
    unlockRequirementText: 'Complete the AI for Health Challenge',
  },
  {
    id: 'badge-apple-intelligence',
    topicTag: 'Apple iOS & Intelligence',
    title: 'Apple iOS & Intelligence Star',
    trackId: 'apple_mobile',
    skillLevel: 'beginner',
    description: 'Used built-in Apple iOS Writing Tools to proofread and warm up messages.',
    visualSymbol: 'Smartphone',
    unlockRequirementText: 'Complete the Apple iOS Challenge',
  },
  {
    id: 'badge-voice-maestro',
    topicTag: 'Voice Assistants & Dictation',
    title: 'Voice Assistant Maestro',
    trackId: 'apple_mobile',
    skillLevel: 'intermediate',
    description: 'Mastered hands-free Microphone Voice Dictation and Smart Assistants.',
    visualSymbol: 'Video',
    unlockRequirementText: 'Complete the Voice Technology Challenge',
  },
  {
    id: 'badge-health-guardian',
    topicTag: 'Health & Wellness Apps',
    title: 'Medical ID Guardian',
    trackId: 'apple_mobile',
    skillLevel: 'advanced',
    description: 'Configured Apple Health Emergency Medical ID with "Show When Locked".',
    visualSymbol: 'ShieldCheck',
    unlockRequirementText: 'Complete the Health Apps Challenge',
  },
  {
    id: 'badge-memory-keeper',
    topicTag: 'Photos & Storage',
    title: 'Photo & Storage Keeper',
    trackId: 'photos_creative',
    skillLevel: 'beginner',
    description: 'Brightened a shaded garden snapshot and organized Favorites (♥).',
    visualSymbol: 'Image',
    unlockRequirementText: 'Complete the Photos & Storage Challenge',
  },
  {
    id: 'badge-firefly-creator',
    topicTag: 'Adobe Firefly & AI Art',
    title: 'Adobe Firefly Artist',
    trackId: 'photos_creative',
    skillLevel: 'intermediate',
    description: 'Combined Subject, Art Style, and Sunset Lighting in Adobe Firefly.',
    visualSymbol: 'Palette',
    unlockRequirementText: 'Complete the Adobe Firefly Challenge',
  },
  {
    id: 'badge-portfolio-director',
    topicTag: 'Creative Digital Projects',
    title: 'Creative Project Director',
    trackId: 'photos_creative',
    skillLevel: 'advanced',
    description: 'Directed a storybook illustration and motion preview for a Digital Portfolio.',
    visualSymbol: 'Wand2',
    unlockRequirementText: 'Complete the Creative Project Challenge',
  },
  {
    id: 'badge-scam-spotter',
    topicTag: 'Staying Safe Online',
    title: 'Online Security Shield',
    trackId: 'security_ethics',
    skillLevel: 'beginner',
    description: 'Uncovered a fake delivery sender address and redelivery fee trap.',
    visualSymbol: 'ShieldCheck',
    unlockRequirementText: 'Complete the Staying Safe Online Challenge',
  },
  {
    id: 'badge-deepfake-defender',
    topicTag: 'Deepfakes & Scam Defense',
    title: 'Deepfake & Voice-Clone Defender',
    trackId: 'security_ethics',
    skillLevel: 'intermediate',
    description: 'Used the Family Safe Word rule to defeat an AI voice-cloning phone scam.',
    visualSymbol: 'Lock',
    unlockRequirementText: 'Complete the Deepfakes & Scams Challenge',
  },
  {
    id: 'badge-ethics-steward',
    topicTag: 'Responsible & Ethical AI',
    title: 'Responsible AI Steward',
    trackId: 'security_ethics',
    skillLevel: 'advanced',
    description: 'Spotted an AI hallucination and protected community privacy.',
    visualSymbol: 'SearchCheck',
    unlockRequirementText: 'Complete the Responsible AI Challenge',
  },
  {
    id: 'badge-smart-caster',
    topicTag: 'Smart Home & TV Casting',
    title: 'Smart Home & TV Caster',
    trackId: 'smart_living_future',
    skillLevel: 'beginner',
    description: 'Beamed videos and photos wirelessly from iPhone to the living room Smart TV.',
    visualSymbol: 'Film',
    unlockRequirementText: 'Complete the Streaming & Casting Challenge',
  },
  {
    id: 'badge-vr-explorer',
    topicTag: '3D Virtual Reality & Travel',
    title: '3D VR & AI Travel Explorer',
    trackId: 'smart_living_future',
    skillLevel: 'intermediate',
    description: 'Planned a step-free cultural trip with 3D Virtual Reality museum previews.',
    visualSymbol: 'QrCode',
    unlockRequirementText: 'Complete the VR & Travel Challenge',
  },
  {
    id: 'badge-vibe-coder',
    topicTag: 'Vibe Coding & Future Tech',
    title: 'Vibe Coding Innovator',
    trackId: 'smart_living_future',
    skillLevel: 'advanced',
    description: 'Designed a working Family Recipe web app using plain-English Vibe Coding!',
    visualSymbol: 'Sparkles',
    unlockRequirementText: 'Complete the Vibe Coding Challenge',
  },
];

export const MEMORY_CARDS: MemoryCardItem[] = [
  {
    id: 'mc-browsers-cloud',
    topicTag: 'Browsers, Search & Cloud',
    trackId: 'browsers_cloud',
    skillLevel: 'beginner',
    title: 'Browsers, Web Search, Google Drive & The Cloud',
    goldenRule: 'Skip "Sponsored" ads at the top of search results, Star (★) your trusted sites, and share Google Docs as "Viewer".',
    visualCue: 'Star (★) = Bookmark · "Viewer" = Read-Only Share · Cloud = Safe Deposit Box Linked to Your Email.',
    stepByStep: [
      'Browsers & Search: Scroll past "Sponsored" ads to find official `.gov` or `.org` websites, then tap the Star (★) to bookmark them.',
      'Google Workspace & Organization: When sharing a Google Doc or Drive folder with a group, select "Viewer" so nobody accidentally erases your work.',
      'Cloud Storage & Portfolio: Your Cloud files live in your account—never create a brand-new email when getting a new device; sign in with your existing one!',
    ],
  },
  {
    id: 'mc-ai-assistants',
    topicTag: 'ChatGPT, Copilot & Learning',
    trackId: 'ai_assistants',
    skillLevel: 'beginner',
    title: 'ChatGPT, Microsoft Copilot & Lifelong Learning',
    goldenRule: 'Use the 3-Part Prompt Recipe (Situation + Task + Details) and click Copilot’s numbered footnotes [1] to verify sources.',
    visualCue: 'ChatGPT = Conversational Brainstormer · MS Copilot = Footnote Links [1] + New Topic (+) Button.',
    stepByStep: [
      'ChatGPT Basics: Give context ("I am cooking for 4"), the task ("3 chicken recipes"), and details ("low-sodium, under 30 minutes").',
      'MS Copilot Interface: Tap the numbered footnotes [1] [2] in Copilot to open the exact website it summarized, and tap "+" when changing topics.',
      'Entertainment, Learning & Health: Ask AI to explain medical or hobby terms in plain English and prepare questions for your doctor.',
    ],
  },
  {
    id: 'mc-apple-mobile',
    topicTag: 'Apple iOS, Intelligence & Voice',
    trackId: 'apple_mobile',
    skillLevel: 'intermediate',
    title: 'Apple iOS, Apple Intelligence, Voice Tech & Health Apps',
    goldenRule: 'Use built-in Apple Intelligence Writing Tools and Keyboard Voice Dictation (Microphone) instead of paying for App Store clones.',
    visualCue: 'Writing Tools = Proofread & Friendly Tone · Keyboard Mic = Speak to Type · Red Heart ♥ App = Medical ID.',
    stepByStep: [
      'Apple iOS & Apple Intelligence: Select text in Mail or Notes and tap "Writing Tools" to proofread or warm up the tone.',
      'Voice Assistants & Social Connection: Tap the Microphone icon in the bottom corner of your keyboard to speak long texts hands-free.',
      'Health & Wellness Apps: Open the Apple Health app (♥) → Medical ID and turn ON "Show When Locked" for emergency responders.',
    ],
  },
  {
    id: 'mc-photos-firefly',
    topicTag: 'Photos, Storage & Firefly',
    trackId: 'photos_creative',
    skillLevel: 'intermediate',
    title: 'Managing Photos, Storage & Adobe Firefly AI Art',
    goldenRule: 'Merge Duplicates in Apple Photos to free up space, and combine Subject + Art/Photo Mode + Lighting in Adobe Firefly.',
    visualCue: 'Heart (♥) = Favorites · Utilities → Duplicates = Free Storage · Firefly = Subject + Style + Lighting.',
    stepByStep: [
      'Managing Photos & Storage: Tap the Heart (♥) on your best photos, and scroll to "Albums → Utilities → Duplicates" to merge identical shots.',
      'Adobe Firefly & AI Images: Describe your Subject clearly, then pick Content Type (Art vs. Photo) and Lighting (Golden Hour, Watercolor).',
      'Creative Project & Digital Portfolio: Reuse the same Style words across prompts so your storybook or card project looks cohesive!',
    ],
  },
  {
    id: 'mc-security-ethics',
    topicTag: 'Security, Deepfakes & Ethics',
    trackId: 'security_ethics',
    skillLevel: 'advanced',
    title: 'Security, Deepfakes, Misinformation & Responsible AI',
    goldenRule: 'Use a secret "Family Safe Word" to defeat AI voice scams, and always double-check AI facts ("hallucinations").',
    visualCue: 'Address after "@" = Real Sender · Family Safe Word = Voice Clone Shield · Fact-Check = Beat AI Hallucinations.',
    stepByStep: [
      'Staying Safe Online: Never buy Gift Cards or read back 6-digit verification codes to anyone who calls or texts you.',
      'Deepfakes & Voice Clones: Agree on a secret Family Safe Word (like "Blueberry Pancake") and always hang up to call your relative’s saved number.',
      'Responsible AI & Ethics: Remember that AI predicts words and can invent fake laws or quotes—always verify important facts and protect friends’ privacy.',
    ],
  },
  {
    id: 'mc-smart-living-vibe',
    topicTag: 'Smart Home, VR & Vibe Coding',
    trackId: 'smart_living_future',
    skillLevel: 'advanced',
    title: 'Smart Home, TV Casting, 3D VR, AI Travel & Vibe Coding',
    goldenRule: 'Cast to your TV over the same home Wi-Fi, preview travel stops in 3D, and build custom apps using plain-English Vibe Coding!',
    visualCue: 'TV Rectangle + Triangle/Waves = AirPlay/Cast · Binoculars = 3D Street View · Vibe Coding = Plain English App Building.',
    stepByStep: [
      'Smart Home & Casting: Ensure your phone and TV are on the same Wi-Fi, then tap the AirPlay / Cast icon inside Photos or YouTube.',
      '3D VR & AI Travel: Ask AI for relaxed, step-free itineraries and tap the Binoculars icon in Maps to preview entrances in 3D.',
      'Vibe Coding & The Future of AI: Describe (1) Who the app is for, (2) Interactive buttons needed, and (3) Large, high-contrast visual style to build your own app!',
    ],
  },
];

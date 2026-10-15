export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export type TrackId =
  | 'browsers_cloud'
  | 'ai_assistants'
  | 'apple_mobile'
  | 'photos_creative'
  | 'security_ethics'
  | 'smart_living_future';

export type ChallengeMode =
  | 'scam_inspector'
  | 'iphone_simulator'
  | 'photo_studio'
  | 'ai_prompt_builder'
  | 'ai_media_director';

export interface HotspotItem {
  id: string;
  label: string;
  regionText: string;
  isRedFlag: boolean;
  explanation: string;
  position: 'header' | 'sender' | 'body' | 'link' | 'footer';
}

export interface IphoneActionOption {
  id: string;
  buttonLabel: string;
  iconName: string;
  locationHint: string;
  isCorrect: boolean;
  feedback: string;
}

export interface PhotoPresetTarget {
  targetBrightness: [number, number];
  targetWarmth: [number, number];
  targetZoom: [number, number];
  requireFavorite: boolean;
  requireSharedFamily: boolean;
}

export interface PromptBlock {
  id: string;
  category: 'role' | 'task' | 'detail';
  text: string;
  isRecommended: boolean;
  whyText: string;
}

export interface MediaSceneOption {
  id: string;
  title: string;
  imageUrl: string;
  subjectTag: string;
  styleTag: string;
  lightingTag: string;
  motionEffect: 'pan' | 'zoom' | 'still';
  caption: string;
}

export interface Challenge {
  id: string;
  topicTag: string;
  courseTopic: string;
  trackId: TrackId;
  skillLevel: SkillLevel;
  title: string;
  subtitle: string;
  scenarioStory: string;
  mode: ChallengeMode;
  points: number;
  badgeId: string;
  memoryRuleTitle: string;
  memoryRuleSummary: string;
  hints: [string, string, string, string];
  scamScenario?: {
    deviceType: 'sms' | 'email' | 'call';
    senderName: string;
    senderAddressOrNumber: string;
    timestamp: string;
    subjectLine?: string;
    hotspots: HotspotItem[];
    requiredRedFlagsCount: number;
  };
  iphoneScenario?: {
    appScreenTitle: string;
    screenContext: string;
    callerOrContact: string;
    goalInstruction: string;
    options: IphoneActionOption[];
  };
  photoScenario?: {
    imageUrl: string;
    photoTitle: string;
    photoDateLocation: string;
    initialBrightness: number;
    initialWarmth: number;
    initialZoom: number;
    goalDescription: string;
    targets: PhotoPresetTarget;
  };
  promptScenario?: {
    goalTitle: string;
    familyContext: string;
    blocks: PromptBlock[];
    sampleAiOutput: string;
    safetyReminder: string;
  };
  mediaScenario?: {
    targetImageId: string;
    goalInstruction: string;
    scenes: MediaSceneOption[];
    selectableSubjects: string[];
    selectableStyles: string[];
    selectableLightings: string[];
    correctSubject: string;
    correctStyle: string;
    correctLighting: string;
  };
}

export interface BadgeItem {
  id: string;
  topicTag: string;
  title: string;
  trackId: TrackId;
  skillLevel: SkillLevel;
  description: string;
  visualSymbol: string;
  unlockRequirementText: string;
}

export interface MemoryCardItem {
  id: string;
  topicTag: string;
  trackId: TrackId;
  skillLevel: SkillLevel;
  title: string;
  goldenRule: string;
  visualCue: string;
  stepByStep: string[];
}

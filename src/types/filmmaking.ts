export interface Lesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  keyConcepts: string[];
  directorInsight: string;
  content: string[];
  filmExamples: { title: string; director: string; year: string; note: string }[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CurriculumModule {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'Writing' | 'Directing' | 'Cinematography' | 'Editing' | 'Color' | 'Production';
  description: string;
  image: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  practicalExercise: {
    title: string;
    instructions: string[];
    deliverable: string;
  };
}

export interface ColorGradeState {
  lift: { r: number; g: number; b: number }; // shadows
  gamma: { r: number; g: number; b: number }; // midtones
  gain: { r: number; g: number; b: number }; // highlights
  temperature: number; // -100 to 100 (cool to warm)
  tint: number; // -100 to 100 (green to magenta)
  saturation: number; // 0 to 200 (100 is normal)
  contrast: number; // 50 to 150 (100 is normal)
  filmGrain: number; // 0 to 100
  selectedStock: string;
}

export interface ShotListItem {
  id: string;
  sceneNumber: string;
  shotNumber: string;
  shotSize: 'ELS' | 'WS' | 'MWS' | 'MS' | 'MCU' | 'CU' | 'ECU';
  cameraAngle: 'Eye Level' | 'Low Angle' | 'High Angle' | 'Dutch Tilt' | 'Overhead / Bird\'s Eye';
  focalLength: string;
  movement: 'Static' | 'Pan' | 'Tilt' | 'Dolly In' | 'Dolly Out' | 'Track / Truck' | 'Handheld' | 'Steadicam' | 'Crane / Jib' | 'Whip Pan';
  subjectAction: string;
  soundCue: string;
  equipment: string;
}

export interface StoryBeat {
  id: string;
  name: string;
  act: 'Act 1' | 'Act 2A' | 'Act 2B' | 'Act 3';
  pageTarget: string;
  description: string;
  userPrompt: string;
  userInput: string;
}

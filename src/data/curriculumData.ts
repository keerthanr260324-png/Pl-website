import { CurriculumModule } from '../types/filmmaking';

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'storywriting',
    number: '01',
    title: 'Storywriting & Script Architecture',
    subtitle: 'From Core Logline to 3-Act Structure & Subtext',
    category: 'Writing',
    description: 'Master the fundamental grammar of cinematic narrative: the 3-act spine, Save the Cat 15 beats, scene conflict, character arcs, and subtextual dialogue.',
    image: '/src/assets/images/directing_actor_blocking_1794210231177.jpg',
    lessons: [
      {
        id: 'story-1',
        title: 'The 3-Act Structural Spine & Beat Sheets',
        duration: '18 min',
        summary: 'Learn how cinema converts emotional desires into physical stakes using classic act structures.',
        keyConcepts: [
          'Act 1: Status Quo, Inciting Incident (10-12%), and Break into Two (25%)',
          'Act 2: Fun & Games, Midpoint Twist (50%), and the "All Is Lost" crisis (75%)',
          'Act 3: Synthesis, Climax confrontation (85-90%), and the Changed Final Image'
        ],
        directorInsight: '"A story should have a beginning, a middle, and an end... but not necessarily in that order." — Jean-Luc Godard',
        content: [
          'Screenplays are architectural blueprints for emotional experiences. Unlike novels which live in internal monologue, films communicate exclusively through external action and spoken subtext.',
          'The 3-Act Structure is not a rigid formula but an organic heartbeat: Setup (thesis), Confrontation (antithesis), and Resolution (synthesis).',
          'At the Midpoint (minute 55 in a 110-min feature), stakes must shift from public/passive to private/active. The protagonist stops reacting to circumstance and begins driving the plot forward.'
        ],
        filmExamples: [
          { title: 'Chinatown', director: 'Roman Polanski', year: '1974', note: 'Flawless midpoint transition where a fake infidelity case reveals vast civic corruption.' },
          { title: 'Parasite', director: 'Bong Joon-ho', year: '2019', note: 'A masterclass midpoint doorbell ring that completely inverts genre and power.' }
        ]
      },
      {
        id: 'story-2',
        title: 'Dialogue vs. Subtext & Scene Conflict',
        duration: '14 min',
        summary: 'How to write dialogue where characters never say what they actually mean.',
        keyConcepts: [
          'On-the-nose dialogue kills audience engagement; subtext invites them in.',
          'Every scene is a negotiation: Protagonist wants Objective A, Antagonist blocks with Obstacle B.',
          'Micro-beats: each exchange of dialogue shifts the power balance by a degree.'
        ],
        directorInsight: '"If you write a scene where someone says \'I love you\' and they mean it, throw it in the trash. Have them argue about burnt toast instead." — Billy Wilder',
        content: [
          'Subtext is the iceberg underneath the spoken words. In real human interaction, vulnerability is terrifying, so people cloak their desires in deflection, humor, or mundane tasks.',
          'When writing scene conflict, give both characters valid arguments. The most compelling drama occurs not between right and wrong, but between two opposing rights.'
        ],
        filmExamples: [
          { title: 'The Social Network', director: 'David Fincher', year: '2010', note: 'Aaron Sorkin rapid-fire dialogue with fierce emotional subtext in the opening club scene.' },
          { title: 'In the Mood for Love', director: 'Wong Kar-wai', year: '2000', note: 'Unspoken yearning where rehearsals of betrayal become reality.' }
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the primary narrative function of the Midpoint in a standard screenplay?',
        options: [
          'To introduce the main villain for the first time',
          'To shift stakes from passive to active, raising the urgency or inverting power',
          'To wrap up all subplots before Act 3',
          'To introduce comic relief'
        ],
        correctIndex: 1,
        explanation: 'At the midpoint, the stakes elevate and the protagonist shifts from reacting to proactively driving toward the climax.'
      },
      {
        question: 'Why is "on-the-nose" dialogue generally considered weak in cinematic screenwriting?',
        options: [
          'Because actors prefer longer monologues',
          'Because it states raw emotions literally, robbing the audience of interpreting subtext',
          'Because microphones cannot pick up literal words',
          'Because screenplays are not allowed to have emotions'
        ],
        correctIndex: 1,
        explanation: 'Cinematic power comes from subtext: when what a character says differs from what they feel or do.'
      }
    ],
    practicalExercise: {
      title: 'The Subtext Restaurant Conflict',
      instructions: [
        'Write a 2-page scene between two former business partners meeting for coffee.',
        'Partner A knows Partner B embezzled money from the company, but cannot state it directly.',
        'Partner B wants Partner A to sign an NDA, disguised as friendly advice.',
        'Use only the discussion of ordering food and weather to convey the tension.'
      ],
      deliverable: 'A 2-page formatted screenplay scene with clear objective, obstacle, and subtext.'
    }
  },
  {
    id: 'directing',
    number: '02',
    title: 'Directing & Mise-en-Scène Mastery',
    subtitle: 'Staging Actors, Visual Metaphors & On-Set Command',
    category: 'Directing',
    description: 'Understand Mise-en-Scène: the total visual composition of a scene through actor blocking, spatial proxemics, props, and psychological directing verbs.',
    image: '/src/assets/images/directing_actor_blocking_1794210231177.jpg',
    lessons: [
      {
        id: 'dir-1',
        title: 'Mise-en-Scène: The Language of the Frame',
        duration: '20 min',
        summary: 'Explore everything that appears before the camera: staging, decor, costume, light, and geometry.',
        keyConcepts: [
          'Mise-en-scène = "placing on stage": the holistic sum of all visual elements',
          'Proxemics: the physical distance between characters mirrors psychological intimacy or hostility',
          'Framing within frames: doors, windows, and architecture as emotional cages'
        ],
        directorInsight: '"Film is a battleground. Love, hate, action, violence, death... in one word: emotion." — Samuel Fuller',
        content: [
          'Every single object placed inside your frame either reinforces your theme or distracts from it. If a prop does not reveal character or heighten conflict, remove it.',
          'Physical height in blocking communicates dominance. A character standing over a seated adversary commands the power dynamic until the seated character refuses to look up.'
        ],
        filmExamples: [
          { title: 'Citizen Kane', director: 'Orson Welles', year: '1941', note: 'Deep focus mise-en-scène placing young Kane in the distant window while adults sign his life away.' },
          { title: 'The Grand Budapest Hotel', director: 'Wes Anderson', year: '2014', note: 'Hyper-meticulous symmetrical mise-en-scène framing characters as dollhouse miniatures.' }
        ]
      },
      {
        id: 'dir-2',
        title: 'Directing Actors with Action Verbs',
        duration: '16 min',
        summary: 'Replace dead emotional adjectives ("be angrier") with playable physical action verbs.',
        keyConcepts: [
          'Never give result-oriented direction like "be sadder" or "be more confident"',
          'Use playable action verbs: "interrogate him", "seduce her", "evade him", "punish them"',
          'Give physical business: having an actor fold laundry or slice an apple exposes inner anxiety'
        ],
        directorInsight: '"Don\'t direct the feeling, direct the intention." — Judith Weston',
        content: [
          'Actors cannot play adjectives. Telling an actor to "look guilty" results in theatrical caricature. Instead, give them an objective: "Try to conceal your shaking hands while pouring this glass of water."',
          'Great directing is 80% casting, 10% creating a psychologically safe set, and 10% precise spatial adjustment.'
        ],
        filmExamples: [
          { title: 'There Will Be Blood', director: 'Paul Thomas Anderson', year: '2007', note: 'Daniel Day-Lewis physicalized menace through deliberate, measured predatory movement.' }
        ]
      }
    ],
    quiz: [
      {
        question: 'Which of the following is an effective "playable direction" for an actor?',
        options: [
          '"Act more depressed in this take"',
          '"Try to bait him into losing his temper"',
          '"Be 30% happier here"',
          '"Look very suspicious when you enter"'
        ],
        correctIndex: 1,
        explanation: '"Bait him into losing his temper" is an active verb with an objective, giving the actor a playable objective rather than a static adjective.'
      }
    ],
    practicalExercise: {
      title: 'The Silent Blocking Exercise',
      instructions: [
        'Stage a 1-minute scene with two actors and ZERO spoken lines.',
        'Actor A wants to sit in the single armchair; Actor B will not vacate it.',
        'Use only physical proximity, eye contact, and object interaction to tell who wins.'
      ],
      deliverable: 'Video recording or 6-frame storyboard showing the spatial power struggle.'
    }
  },
  {
    id: 'cinematography',
    number: '03',
    title: 'Cinematography & Lighting Physics',
    subtitle: 'The 3-Point Setup, Exposure Triangle & Lens Optical Character',
    category: 'Cinematography',
    description: 'Learn the craft of the Director of Photography (DP): three-point lighting ratios, soft vs hard light, the 180° shutter rule, and spherical vs anamorphic optics.',
    image: '/src/assets/images/cinematography_lighting_studio_1794210230438.jpg',
    lessons: [
      {
        id: 'cine-1',
        title: 'Cinematic Lighting: Key, Fill, Rim & Ratios',
        duration: '22 min',
        summary: 'Demystify 3-point lighting and learn how high-contrast chiaroscuro creates dramatic depth.',
        keyConcepts: [
          'Key Light: The primary light source establishing direction and mood',
          'Fill Light: Controls shadow density; high fill = sitcom (high key), low fill = noir (low key)',
          'Back / Rim Light: Separates subject from dark background with a rim of specular highlight',
          'Contrast Ratio: 2:1 (soft commercial) vs 8:1 (dramatic thriller)'
        ],
        directorInsight: '"Cinematography is not about capturing reality; it is about illuminating truth through shadow." — Roger Deakins',
        content: [
          'Lighting from the "upstage" side (the side away from the camera, also called lighting into the shadow side) immediately gives cinematic volume to the human face.',
          'The Inverse-Square Law dictates that moving a light source twice as far away quarters its intensity ($1/d^2$). Large soft sources placed close to subjects yield rapid falloff and creamy skin textures.'
        ],
        filmExamples: [
          { title: 'Blade Runner 2049', director: 'Denis Villeneuve (DP: Roger Deakins)', year: '2017', note: 'Moving silhouettes, water-reflection caustics, and volumetric atmospheric lighting.' },
          { title: 'The Godfather', director: 'Francis Ford Coppola (DP: Gordon Willis)', year: '1972', note: 'Top overhead lighting hiding Don Corleone\'s eyes in dark pools of mystery.' }
        ]
      },
      {
        id: 'cine-2',
        title: 'The Exposure Triangle & The 180° Shutter Rule',
        duration: '17 min',
        summary: 'Aperture (f-stop), ISO, and why shutter angle must always be twice the frame rate for 24fps motion blur.',
        keyConcepts: [
          'Shutter Speed = $1 / (2 \\times \\text{Frame Rate})$. At 24fps, standard shutter is $1/48\\text{s}$ (or 180° shutter angle)',
          'Narrow shutter (e.g. 45° / $1/200\\text{s}$) produces crisp, staccato action (Saving Private Ryan)',
          'Aperture controls Depth of Field (f/1.4 = shallow bokeh; f/8 = deep focus)'
        ],
        directorInsight: '"You paint with light, but you chisel with darkness." — Vittorio Storaro',
        content: [
          'The 180-degree shutter angle is why film feels like "cinema" and video often feels like "soap opera". When moving subjects traverse the frame at 24fps, natural motion blur bridges the 24 still pictures into fluid biological perception.',
          'ND (Neutral Density) filters are essential outdoors to maintain a wide f/1.4 aperture without overexposing the sensor.'
        ],
        filmExamples: [
          { title: 'Saving Private Ryan', director: 'Steven Spielberg (DP: Janusz Kamiński)', year: '1998', note: '45-degree narrow shutter angle creating explosive, gritty splash droplets in Normandy landing.' }
        ]
      }
    ],
    quiz: [
      {
        question: 'When shooting at 24 frames per second, what shutter speed complies with the 180-degree shutter rule?',
        options: [
          '1/24 second',
          '1/48 (or 1/50) second',
          '1/120 second',
          '1/1000 second'
        ],
        correctIndex: 1,
        explanation: 'The 180-degree shutter rule sets exposure time to 1/(2 * fps), which equals 1/48s at 24fps.'
      }
    ],
    practicalExercise: {
      title: 'Lighting from the Shadow Side',
      instructions: [
        'Set up a single lamp and a subject sitting in a dark room.',
        'First, place the light on the camera side (flat lighting) and photograph.',
        'Second, move the light to the opposite side of the subject (back-three-quarter) so the camera sees the shadow side.',
        'Compare the emotional depth and 3D dimensionality of both portraits.'
      ],
      deliverable: 'Side-by-side photo comparison documenting shadow transition.'
    }
  },
  {
    id: 'shotdesign',
    number: '04',
    title: 'Shot Designing & Framing Geometry',
    subtitle: 'From Extreme Wide to Extreme Close-Up & The 180° Rule',
    category: 'Cinematography',
    description: 'Learn shot grammar: Extreme Wide (ELS), Wide (WS), Medium (MS), Close-Up (CU), Dutch tilts, aspect ratios (2.39:1 vs 4:3), and spatial continuity.',
    image: '/src/assets/images/hero_cinematic_camera_1794210229970.jpg',
    lessons: [
      {
        id: 'shot-1',
        title: 'The Shot Size Scale & Emotional Proximity',
        duration: '19 min',
        summary: 'How shot scale dictates the psychological distance between the viewer and the subject.',
        keyConcepts: [
          'ELS (Extreme Long Shot): Subject is dwarfed by environment; themes of insignificance or epic scope',
          'WS (Wide Shot): Full body visible; establishes spatial relationships and geography',
          'MS (Medium Shot): Waist-up; natural human conversation distance',
          'CU (Close Up): Shoulders to head; reveals micro-expressions and intense intimacy',
          'ECU (Extreme Close Up): Eyes, mouth, or trembling hands; psychological hyper-focus'
        ],
        directorInsight: '"A close-up is an event. If you use it all the time, it loses its soul." — Martin Scorsese',
        content: [
          'Every cut to a tighter shot size is an emotional escalation. If a scene starts in Close-Up, you have nowhere to go when the character finally breaks down.',
          'Save your Extreme Close-Up for the single most crucial realization in the scene. The audience will instinctively understand that this specific detail holds the key to the story.'
        ],
        filmExamples: [
          { title: 'The Good, the Bad and the Ugly', director: 'Sergio Leone', year: '1966', note: 'Legendary three-way graveyard standoff accelerating from Wide to Extreme Close-Up eye twitches.' },
          { title: 'Drive', director: 'Nicolas Winding Refn', year: '2011', note: 'Disciplined medium shots exploding into intimate close-ups in the elevator sequence.' }
        ]
      },
      {
        id: 'shot-2',
        title: 'The 180-Degree Rule & Spatial Continuity',
        duration: '15 min',
        summary: 'How to draw an imaginary axis of action so characters maintain consistent screen direction.',
        keyConcepts: [
          'The 180° Line (Axis of Action) connects the two interacting subjects.',
          'All camera setups must remain on ONE side of this line to preserve left-to-right eye lines.',
          'Crossing the line flips screen direction, making characters appear to look away from each other.',
          'Legitimate ways to cross: with a moving camera in-shot, or inserting a neutral cutaway on the line.'
        ],
        directorInsight: '"Continuity is not pedantry; it is how the human brain maintains sanity in a sequence of 2,000 cuts." — Walter Murch',
        content: [
          'When Character A looks screen-right and Character B looks screen-left, the audience unconsciously perceives them facing each other. If the camera crosses the line without a bridge, both suddenly look screen-right, breaking the illusion.',
          'Stanley Kubrick famously broke the 180-degree rule in "The Shining" bathroom scene to intentionally evoke supernatural dread and spatial disorientation.'
        ],
        filmExamples: [
          { title: 'The Shining', director: 'Stanley Kubrick', year: '1980', note: 'Intentional axis crossing in the red bathroom to disorient Jack Torrance and the audience.' }
        ]
      }
    ],
    quiz: [
      {
        question: 'What happens to character eyelines when the camera crosses the 180-degree line during a dialogue scene?',
        options: [
          'The scene becomes overexposed',
          'Both characters suddenly appear to be looking in the same direction rather than at each other',
          'The audio slips out of sync',
          'The depth of field increases dramatically'
        ],
        correctIndex: 1,
        explanation: 'Crossing the axis of action inverts screen direction, making both characters look in the same direction, destroying spatial continuity.'
      }
    ],
    practicalExercise: {
      title: 'The 5-Shot Storyboard',
      instructions: [
        'Design a 5-shot sequence for a character receiving an unexpected letter:',
        'Shot 1: ELS establishing the character waiting at a lonely train platform.',
        'Shot 2: MS character sitting, mail carrier walks in and hands an envelope.',
        'Shot 3: MCU character looking down at the handwriting.',
        'Shot 4: ECU opening the seal and reading the first line.',
        'Shot 5: WS character standing up and abandoning their suitcase.'
      ],
      deliverable: 'A 5-panel shot design sheet showing lens choice, aspect ratio, and eyeline angles.'
    }
  },
  {
    id: 'cameramovement',
    number: '05',
    title: 'Camera Movements & Motivated Motion',
    subtitle: 'Pan, Tilt, Dolly, Truck, Crane & The Vertigo Dolly Zoom',
    category: 'Cinematography',
    description: 'Discover when and why to move the camera. Understand motivated vs unmotivated movement, Steadicam fluid tracking, and the physics of the vertigo effect.',
    image: '/src/assets/images/hero_cinematic_camera_1794210229970.jpg',
    lessons: [
      {
        id: 'cam-1',
        title: 'The Kinematics of Motivated Camera Movement',
        duration: '21 min',
        summary: 'Every camera movement must be earned. Learn Pan, Tilt, Dolly, Truck, Boom, and Crane.',
        keyConcepts: [
          'Pan / Tilt: Camera rotates on a fixed axis (swiveling head on tripod)',
          'Dolly (Push-in / Pull-out): Physical translation toward or away from subject',
          'Truck / Tracking: Physical lateral travel parallel to subject motion',
          'Motivated: Triggered by a character\'s movement or gaze',
          'Unmotivated / Authorial: The director guides attention to a detail the character cannot see'
        ],
        directorInsight: '"A tracking shot is a matter of morality." — Jean-Luc Godard',
        content: [
          'Dolly-in vs Zoom: A zoom flattens perspective optically like binoculars; a physical dolly push-in changes the parallax between foreground and background, making the world feel tangible and immersive.',
          'Slow slow push-in on an actor\'s face signals that they are coming to an irreversible conclusion. Pulling away signals isolation, powerlessness, or abandoning the character to their fate.'
        ],
        filmExamples: [
          { title: 'Children of Men', director: 'Alfonso Cuarón (DP: Emmanuel Lubezki)', year: '2006', note: 'Legendary single-take vehicular tracking shots pulling the audience into the firefight.' },
          { title: 'The Shining', director: 'Stanley Kubrick (Operator: Garrett Brown)', year: '1980', note: 'Groundbreaking low-angle Steadicam gliding behind Danny on his big wheel tricycle.' }
        ]
      },
      {
        id: 'cam-2',
        title: 'The Vertigo Effect (The Dolly Zoom / Zolly)',
        duration: '16 min',
        summary: 'Master the optical illusion invented by Irmin Roberts for Hitchcock\'s "Vertigo".',
        keyConcepts: [
          'Simultaneously dollying backward while zooming in (or dollying in while zooming wide)',
          'The foreground subject remains identical in size, but the background drastically stretches or compresses',
          'Visual shorthand for sudden vertigo, shock, realization, or psychological collapse'
        ],
        directorInsight: '"Suspense is when the spectator knows more than the characters." — Alfred Hitchcock',
        content: [
          'Because the optical magnification compensates for the physical distance change, the subject stays fixed while the spatial field of view expands or contracts behind them.',
          'Use with extreme discipline: only when a character\'s entire psychological world is overturned in a split second.'
        ],
        filmExamples: [
          { title: 'Vertigo', director: 'Alfred Hitchcock', year: '1958', note: 'Down the church bell tower staircase simulating Scottie\'s acrophobia.' },
          { title: 'Jaws', director: 'Steven Spielberg', year: '1975', note: 'Chief Brody on the beach witnessing the shark attack in broad daylight.' }
        ]
      }
    ],
    quiz: [
      {
        question: 'How is the Vertigo Dolly Zoom effect executed mechanically?',
        options: [
          'By spinning the camera 360 degrees on a crane',
          'By dollying the camera physically backward while zooming in optically (or vice versa)',
          'By shaking the camera rapidly handheld',
          'By ramping the frame rate from 24fps to 120fps'
        ],
        correctIndex: 1,
        explanation: 'The effect relies on compensating distance with focal length, so the subject maintains size while the background perspective warps.'
      }
    ],
    practicalExercise: {
      title: 'Motivating the Push-In',
      instructions: [
        'Place a friend sitting at a desk reading an envelope.',
        'Record Shot A: Static camera during the entire read.',
        'Record Shot B: Start wide, and the instant they read the critical sentence, perform a smooth physical dolly push-in to a tight close-up.',
        'Compare the emotional impact and perceived intensity between the two.'
      ],
      deliverable: 'A short video clip showing motivated camera acceleration.'
    }
  },
  {
    id: 'colorpalettes',
    number: '06',
    title: 'Color Palettes & Cinematic Grading',
    subtitle: 'Narrative Psychology, Color Wheels, Film Stocks & Teal & Orange',
    category: 'Color',
    description: 'Master color harmony: complementary palettes, saturation psychology, Kodak vs Fuji film stock emulation, and primary grading with Lift, Gamma, and Gain.',
    image: '/src/assets/images/color_grading_suite_1794210231297.jpg',
    lessons: [
      {
        id: 'color-1',
        title: 'Psychological Color Theory in Cinema',
        duration: '23 min',
        summary: 'Color is sub-rational. It bypasses intellectual critique and affects the nervous system directly.',
        keyConcepts: [
          'Warm Tones (Red, Amber, Gold): Intimacy, passion, danger, memory, claustrophobia',
          'Cool Tones (Cyan, Cobalt, Slate): Isolation, melancholy, technology, sterility, dread',
          'Green: Uncanny, sickness, transformation, rot (The Matrix, Taxi Driver)',
          'Teal & Orange: Complementary contrast maximizing human skin tones (warm) against cool shadows'
        ],
        directorInsight: '"Color is emotion made visible." — Pedro Almodóvar',
        content: [
          'Human skin tones, regardless of ethnicity, fall squarely along a single narrow vector on the vectorscope (~10:30 o\'clock position). When you grade cool shadows (cyan/teal) opposite warm skin tones, you create maximum complementary depth without muddying actors.',
          'Color saturation is an indicator of emotional vitality. Monochromatic or desaturated palettes communicate grief, trauma, or emotional detachment; rich pastels communicate nostalgia or stylized innocence.'
        ],
        filmExamples: [
          { title: 'The Matrix', director: 'The Wachowskis (DP: Bill Pope)', year: '1999', note: 'Sickly green tint inside the simulated reality vs cold blue steel in the real hovercraft world.' },
          { title: 'Moonrise Kingdom', director: 'Wes Anderson (DP: Robert Yeoman)', year: '2012', note: 'Warm vintage yellow and pastel ochre evoking 1965 childhood innocence.' }
        ]
      },
      {
        id: 'color-2',
        title: 'The Colorist Pipeline: Lift, Gamma, Gain & Film Emulation',
        duration: '18 min',
        summary: 'Understanding DaVinci Resolve color wheels and logarithmic exposure recovery.',
        keyConcepts: [
          'Lift (Shadows): Controls the black point and dark luminance values',
          'Gamma (Midtones): Controls skin tones, body, and overall scene brightness without clipping blacks or whites',
          'Gain (Highlights): Sets the white point, specular glints, and sky intensity',
          'Film Stocks: Kodak Vision3 5219 (rich halation, warm highlights) vs Fuji Eterna (subtle pastel greens, low contrast)'
        ],
        directorInsight: '"Color grading isn\'t fixing mistakes in post; it is finishing the painting." — Deakins / Storaro',
        content: [
          'Log footage from modern cinema cameras (ARRI LogC, RED Log3G10, Sony S-Log3) compresses high dynamic range into a flat, desaturated image. Proper grading expands this range while keeping organic roll-off in the highlights.',
          'Halation: The reddish-orange glow around high-contrast edges in 35mm film caused by light reflecting off the camera pressure plate back through the red-sensitive emulsion layer.'
        ],
        filmExamples: [
          { title: 'Her', director: 'Spike Jonze (DP: Hoyte van Hoytema)', year: '2013', note: 'Deliberate ban on blue tones; dominated by warm reds, pastels, and soft highlights.' }
        ]
      }
    ],
    quiz: [
      {
        question: 'Why is the "Teal and Orange" color palette ubiquitous in modern Hollywood blockbusters?',
        options: [
          'Teal and orange are the cheapest colors to process in post',
          'Human skin tones naturally fall on the warm orange vector, and teal is the exact complementary color across the color wheel',
          'Cameras can only record teal and orange wavelengths',
          'It hides low-resolution CGI artifacts better'
        ],
        correctIndex: 1,
        explanation: 'Skin tones reside in the warm orange quadrant, and teal sits directly opposite on the color wheel, creating maximum visual separation.'
      }
    ],
    practicalExercise: {
      title: 'Build a 3-Color Narrative Palette',
      instructions: [
        'Choose a narrative genre (e.g. Psychological Thriller, Melancholy Romance, Retro Sci-Fi).',
        'Select 3 specific hex colors: Dominant Environment (60%), Character Accent (30%), Emotional Catalyst (10%).',
        'Write 2 sentences explaining the symbolic meaning of each color in your imaginary film.'
      ],
      deliverable: 'A custom narrative color script swatch with psychological rationale.'
    }
  },
  {
    id: 'editing',
    number: '07',
    title: 'Editing, Cut Points & Temporal Montage',
    subtitle: 'Cutting on Action, J-Cuts, L-Cuts, Match Cuts & Soviet Montage',
    category: 'Editing',
    description: 'The invisible art: where, why, and how to cut. Discover cutting on action, J-Cuts and L-Cuts, rhythmic pacing, jump cuts, and Walter Murch\'s Rule of Six.',
    image: '/src/assets/images/editing_timeline_suite_1794210231541.jpg',
    lessons: [
      {
        id: 'edit-1',
        title: 'The Cut Point: Cutting on Action & Walter Murch\'s Rule of Six',
        duration: '24 min',
        summary: 'How the editor masks cuts in plain sight and prioritizes emotional truth over geometric continuity.',
        keyConcepts: [
          'Cutting on Action: Initiating a movement in Shot A (e.g. punch, door opening) and completing it in Shot B',
          'The human eye follows the kinetic vector, rendering the cut invisible to conscious perception',
          'Walter Murch\'s Rule of Six: Emotion (51%), Story (23%), Rhythm (10%), Eye-trace (7%), 2D Screen plane (5%), 3D Space (4%)'
        ],
        directorInsight: '"Editing is where movies are made or destroyed. A cut is not an interruption; it is a thought." — Walter Murch',
        content: [
          'Never cut before a movement begins or after it completes, unless your intention is to pause and create awkward tension. By slicing right through the peak velocity of an action, the brain stitches the two shots seamlessly.',
          'Eye Trace: Always track where the audience is looking in the final frame of Shot A. If Shot B places the key focal point in the opposite corner of the screen, the audience\'s eye must dart across the frame, creating visual fatigue.'
        ],
        filmExamples: [
          { title: 'Whiplash', director: 'Damien Chazelle (Editor: Tom Cross)', year: '2014', note: 'Hyper-kinetic cuts on drumstick strikes matching tempo and psychological unraveling.' },
          { title: 'Lawrence of Arabia', director: 'David Lean (Editor: Anne V. Coates)', year: '1962', note: 'The greatest match cut in cinema: blowing out a match directly into the desert sunrise.' }
        ]
      },
      {
        id: 'edit-2',
        title: 'Audio Leads: J-Cuts, L-Cuts & Conversational Rhythms',
        duration: '19 min',
        summary: 'Why dialogue scenes feel mechanical if video and audio cut simultaneously.',
        keyConcepts: [
          'J-Cut: Audio from the upcoming shot begins BEFORE the visual cut (shape of the letter J on timeline)',
          'L-Cut: Video cuts to the new shot, but audio from the previous shot continues to linger (letter L)',
          'Hard Cut: Audio and video cut simultaneously; creates sharp, formal staccato transitions',
          'Smash Cut: Jarring, abrupt transition between two drastically different scenes or soundscapes'
        ],
        directorInsight: '"Sound is 50% of the movie going experience, and I\'ve always believed it can do things images cannot." — David Lynch',
        content: [
          'In natural human conversation, you do not wait for someone to finish talking before you look at their reaction. You look at their face while the other person is still speaking. That is an L-Cut.',
          'J-Cuts create anticipation: hearing a siren before cutting to the police car pulls the viewer forward in time.'
        ],
        filmExamples: [
          { title: 'Mad Max: Fury Road', director: 'George Miller (Editor: Margaret Sixel)', year: '2015', note: 'Central crosshair framing ensuring eye-trace never has to search for the action across 2,700 cuts.' }
        ]
      }
    ],
    quiz: [
      {
        question: 'In Walter Murch\'s "Rule of Six", what criteria accounts for over 50% of an editor\'s decision on where to cut?',
        options: [
          '3-dimensional continuity of space',
          'Preserving 180-degree eye trace',
          'Emotion',
          'Matching the actor\'s hand position exactly'
        ],
        correctIndex: 2,
        explanation: 'Walter Murch ranks Emotion as 51% of the decision. If a cut feels emotionally honest, the audience will forgive minor continuity errors.'
      },
      {
        question: 'What is the structural difference between a J-Cut and an L-Cut?',
        options: [
          'A J-Cut is only for action movies; an L-Cut is for documentaries',
          'In a J-Cut, audio leads before video changes; in an L-Cut, audio lingers after video changes',
          'A J-Cut cuts on black frames; an L-Cut dissolves',
          'There is no technical difference'
        ],
        correctIndex: 1,
        explanation: 'J-Cuts let audio enter before the image (shaped like a J on the timeline); L-Cuts allow audio to sustain into the next image.'
      }
    ],
    practicalExercise: {
      title: 'The J-Cut Suspense Transition',
      instructions: [
        'Take two unrelated shots: Shot 1 (someone sleeping peacefully) and Shot 2 (a roaring subway train approaching).',
        'First, do a hard cut where both change at the exact same frame.',
        'Second, create a 2-second J-Cut where the deep rumble and horn of the train begins while the character is still fast asleep.',
        'Note how the J-Cut introduces subconscious dread before the visual shock.'
      ],
      deliverable: 'An edit timeline screenshot or short video demonstrating J-Cut audio lead.'
    }
  },
  {
    id: 'production',
    number: '08',
    title: 'Production Execution & On-Set Command',
    subtitle: 'Call Sheets, Shot Lists, Set Slang & Sound Recording Protocols',
    category: 'Production',
    description: 'Transform theoretical knowledge into practical film set mastery: production roles (1st AD, DP, Gaffer, Sound Mixer), call sheets, and set communication.',
    image: '/src/assets/images/cinematography_lighting_studio_1794210230438.jpg',
    lessons: [
      {
        id: 'prod-1',
        title: 'The Film Crew Hierarchy & On-Set Command Chain',
        duration: '18 min',
        summary: 'Who does what on a real film set and how the 1st AD runs the schedule.',
        keyConcepts: [
          '1st AD (Assistant Director): Master of the schedule and voice of the set; manages call times and safety',
          'DP / Cinematographer: Collaborates with Director on lighting, lenses, and camera operation',
          'Gaffer: Chief lighting technician who works with the Key Grip (rigging and shaping light)',
          'Sound Recordist / Boom Operator: Captures clean dialogue and 60 seconds of crucial Room Tone'
        ],
        directorInsight: '"On a movie set, time is not money. Time is light. When the sun goes down, your scene is over." — Werner Herzog',
        content: [
          'The Director talks to actors, the DP, and the 1st AD. If the Director starts personally moving c-stands or adjusting cables, the entire set grinds to a halt.',
          'Always record 60 seconds of dead silence "Room Tone" in every single location before wrapping. Without room tone, the dialogue editor cannot bridge edits without distracting audio drops.'
        ],
        filmExamples: [
          { title: 'Living in Oblivion', director: 'Tom DiCillo', year: '1995', note: 'The ultimate dark comedy depicting the chaos, boom mic errors, and neuroses of independent filmmaking.' }
        ]
      },
      {
        id: 'prod-2',
        title: 'Essential Film Set Slang & Etiquette',
        duration: '14 min',
        summary: 'Speak the language of professional film crews from day one.',
        keyConcepts: [
          '"Martini Shot": The very last shot of the day (because the next shot is out of a glass)',
          '"Abby Singer": The second-to-last shot of the day (crew starts packing non-essential gear)',
          '"Striking!": Shouted before turning on or off a high-powered lamp to protect eyes',
          '"C-47": A simple wooden clothespin used to clip gels onto scorching hot barn doors',
          '"Stinger": An extension cord; "10-1": Taking a personal bathroom break'
        ],
        directorInsight: '"Respect your crew. The person carrying the 80-pound sandbag is the reason your dream exists on film." — Guillermo del Toro',
        content: [
          'Never run on a film set unless someone is in physical danger. Running induces panic and knocks over expensive $40,000 glass lenses.',
          'Never put your drink on an equipment case. Equipment cases are working surfaces that get wheeled away instantly.'
        ],
        filmExamples: [
          { title: 'Day for Night', director: 'François Truffaut', year: '1973', note: 'A passionate ode to the collaborative craft and organized madness of film crews.' }
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the "Martini Shot" in film industry terminology?',
        options: [
          'A shot where characters drink alcohol in the script',
          'The very last shot of the production day',
          'The first shot filmed after lunch',
          'A shot filmed through a green lens filter'
        ],
        correctIndex: 1,
        explanation: 'The Martini Shot is the final shot of the shooting day, named because the next shot is at the cocktail bar.'
      }
    ],
    practicalExercise: {
      title: 'Craft a 1-Day Production Call Sheet',
      instructions: [
        'Create a one-page call sheet for an interior student short film scene.',
        'Include: Production Title, Date, Weather forecast, Crew Call Time (e.g. 07:00), Nearest Hospital address.',
        'List 3 scenes with Page counts, Cast numbers, and Location notes.',
        'Add Meal times and estimated wrap time.'
      ],
      deliverable: 'A structured, professional call sheet ready for distribution.'
    }
  }
];

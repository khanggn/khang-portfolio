export const playlists = [
  {
    id: 'swe',
    title: 'git push --force origin main',
    description: 'Full-stack development, coding projects, and technical builds.',
    color: '#E8E8E3',
    image: '/images/about/snorlax.jpeg',
    category: 'swe',
    audio: '/audio/crazy(130bpm).mp3',
    bpm: 130,
    songName: 'CRAZY - LE SSERAFIM'
  },
  {
    id: 'uiux',
    title: 'user tested, khang approved',
    description: 'Product design, UX research, and Figma prototypes.',
    color: '#E8E8E3',
    image: '/images/about/pysduck.jpg',
    category: 'uiux',
    audio: '/audio/bubblegum(105bpm).mp3',
    bpm: 105,
    songName: 'Bubble Gum - NewJeans'
  }
];

export const projects = [
  {
    id: 1,
    title: 'West Coast Adult Soccer League',
    role: 'Product Designer',
    projectType: 'Case Study',
    category: 'uiux',
    image: '/images/wcasl/thumbnail.png',
    startDate: 'Apr 2025',
    endDate: 'Present'
  },
  {
    id: 2,
    title: 'Plastic Beach',
    role: 'Product Designer',
    projectType: 'Case Study',
    category: 'uiux',
    image: '/images/plasticbeach/thumbnail.png',
    startDate: 'Apr 2025',
    endDate: 'Jul 2025'
  },
  {
    id: 3,
    title: 'Project Nafasi',
    role: 'Product Designer',
    projectType: 'Designathon',
    category: 'uiux',
    image: '/images/uiux/nafasi.webp',
    startDate: 'Mar 2026',
    endDate: 'Mar 2026'
  },
  {
    id: 4,
    title: 'SnapShot',
    role: 'Software Engineer',
    projectType: 'Project',
    category: 'swe',
    image: '/images/swe/snapshot/thumbnail.webp',
    startDate: 'Jan 2026',
    endDate: 'Mar 2026',
    tags: ['Python', 'Git', 'Developer Tools', 'Diff Algorithms', 'Tkinter UI'],
    links: {
      live: '',
      github: '',
      devpost: '',
      figma: ''
    },
    description: 'Built a Git source control interface inside Python IDLE, enabling beginners to stage, commit, and visualize code changes through an interactive split-view diff editor.',
    previews: [
      { id: 1, type: 'image', src: '/images/swe/snapshot/preview-1.jpeg', alt: 'Preview 1' },
      { id: 2, type: 'image', src: '/images/swe/snapshot/preview-2.jpeg', alt: 'Preview 2' },
    ],
    keyFeatures: [
        'VS Code–style source control UI inside IDLE',
        'Side-by-side diff view with line and character highlighting',
        'Live editing with synchronized split-view updates',
        'Stage, commit, and push directly from the editor',
        'Debounced diff engine for smooth performance on large files'
    ],
    team: {
      members: ['Jaden Seangmany', 'Jonathan Ty', 'Eric Nguyen'],
      myContributions: [
      'Developed a split-view diff editor with synchronized scrolling and real-time updates',
      'Implemented VS Code–style highlighting for line and character-level differences',
      ]
    }
  },
  {
    id: 5,
    title: 'Decidr',
    role: 'Tech Lead & Frontend Developer',
    projectType: 'Project',
    category: 'swe',
    image: '/images/swe/decidr/thumbnail.png',
    startDate: 'Oct 2025',
    endDate: 'Jan 2026',
    tags: [
      'React Native',
      'TypeScript',
      'Node.js',
      'REST API',
      'Mobile App'],
    links: {
      live: '',
      github: 'https://github.com/jadenseangmany/decidr',
      devpost: '',
      figma: ''
    },
    description: 'A mobile app that eliminates group indecision by recommending nearby restaurants using a rating-weighted algorithm that balances quality and credibility.',
    previews: [
      { id: 1, type: 'image', src: '/images/projects/', alt: 'Preview 1' },
      { id: 2, type: 'image', src: '/images/projects/', alt: 'Preview 2' },
      { id: 3, type: 'image', src: '/images/projects/', alt: 'Preview 3' },
      { id: 4, type: 'image', src: '/images/projects/', alt: 'Preview 4' }
    ],
    keyFeatures: [
        'Location-based restaurant recommendations',
        'Rating-weighted algorithm balancing quality and review count',
        'Reroll system for alternative high-quality options',
        'Mobile-first UI built with React Native (Expo)',
        'Client-server architecture with REST API'
    ],
    team: {
      members: ['Jaden Seangmany','Christine Le','Hoang Lam', 'Tom Situ', 'Sarthak Kapoor', 'Katelyn Li'],
      myContributions: [
        'Co-led a team of 5 developers, enforcing code reviews and structured workflows',
        'Led frontend development from concept to implementation using React Native',
      ]
    }
  },
  {
    id: 6,
    title: 'Campus Swipe',
    role: 'Frontend Developer',
    projectType: 'Project',
    category: 'swe',
    image: '/images/swe/campusswipe/thumbnail.png',
    startDate: 'Mar 2025',
    endDate: 'Jun 2025',
    tags: ['JavaScript','HTML/CSS','Frontend Development','Agile','CI/CD'],
    links: {
      live: 'https://cse110-sp25-group11.github.io/card-game/',
      github: 'https://github.com/cse110-sp25-group11/card-game',
      devpost: '',
      figma: ''
    },
    description: 'A swipe-based web app for discovering UCSD events, enabling students to browse, like, and share events through an interactive interface.',
    previews: [
      { id: 1, type: 'image', src: '/images/swe/campusswipe/preview-1.webp', alt: 'Preview 1' },
      { id: 2, type: 'image', src: '/images/swe/campusswipe/preview-2.webp', alt: 'Preview 2' },
      { id: 3, type: 'image', src: '/images/swe/campusswipe/preview-3.webp', alt: 'Preview 3' },
      { id: 4, type: 'image', src: '/images/swe/campusswipe/preview-4.webp', alt: 'Preview 4' }
    ],
    keyFeatures: [
      'Swipe-based event discovery interface',
      'Like system for saving events',
      'User-submitted event creation flow',
      'Categorized browsing (upcoming, ongoing events)',
      'Responsive UI built with vanilla JavaScript'
    ],
    team: {
      members: ['Verania Salcido', 'Mia Chen', 'Wyatt Fong', 'Lucas Hlaing', 'Benjamin Miller', 'Alan De Luna', 'Aryan Ahuja', 'Sachin Ramanathan', 'Charles Nguyen', 'Prasham Shah'
      ],
      myContributions: [
      'Designed wireframes and translated Figma mockups into a functional frontend using HTML, CSS, and JavaScript',
      'Collaborated in an 11-person agile team with pull request reviews, testing, and CI/CD workflows',
      ]
    }
  },
  {
    id: 7,
    title: 'Zippy',
    role: 'Frontend Developer',
    projectType: 'Hackathon',
    category: 'swe',
    image: '/images/swe/zippy/thumbnail.png',
    startDate: 'Apr 2025',
    endDate: 'Apr 2025',
    tags: ['Next.js','TypeScript','Real-time UI','Gamification','Gemini API'],
    links: {
      live: '',
      github: 'https://github.com/jadenseangmany/zippy',
      devpost: 'https://devpost.com/software/zippy',
      figma: ''
    },
    description: 'A gamified education platform that motivates students to complete homework through real-time leaderboards, AI feedback, and a reward-driven gacha system.',
    previews: [
      { id: 1, type: 'image', src: '/images/swe/zippy/preview-1.webp', alt: 'Preview 1' },
      { id: 2, type: 'image', src: '/images/swe/zippy/preview-2.png', alt: 'Preview 2' },
      { id: 3, type: 'image', src: '/images/swe/zippy/preview-3.png', alt: 'Preview 3' },
      { id: 4, type: 'image', src: '/images/swe/zippy/preview-4.png', alt: 'Preview 4' }
    ],
    keyFeatures: [
    'Gamified homework system with points, leaderboards, and rewards',
    'Real-time leaderboard updates using Socket.IO',
    'AI-powered feedback and grading via Gemini API',
    'Gacha system for unlocking virtual pets and items',
    'Responsive UI with smooth animations and interactions'
    ],
    team: {
      members: ['Jaden Seangmany', 'Manjusri Gobiraj'],
      myContributions: [
      'Designed and implemented a high-fidelity UI from Figma using Next.js and TypeScript',
      'Built smooth, interactive animations including a gacha pull sequence with Framer Motion',
      ]
    }
  },
  {
    id: 8,
    title: 'AgentUX',
    role: 'Frontend Developer',
    projectType: 'Hackathon',
    category: 'swe',
    image: '/images/swe/agentux/thumbnail.svg',
    startDate: 'Apr 2026',
    endDate: 'Apr 2026',
    tags: ['HTML / CSS / JS', 'Chrome Extension', 'AI Agents', 'Browser Automation', 'Real-Time UI'],
    links: {
      live: 'https://www.agentux.dev/',
      github: '',
      devpost: 'https://devpost.com/software/agent-ux',
      figma: ''
    },
    description: 'AI-powered Chrome extension that automates usability testing by deploying real browsing agents to simulate user behavior, uncover friction points, and generate actionable UI fixes in minutes.',
    previews: [
      { id: 1, type: 'image', src: '/images/swe/agentux/preview-1.webp', alt: 'Preview 1' },
      { id: 2, type: 'image', src: '/images/swe/agentux/preview-2.webp', alt: 'Preview 2' },
      { id: 3, type: 'gif', src: '/images/swe/agentux/preview-3.gif', alt: 'Preview 3' },
      { id: 4, type: 'image', src: '/images/swe/agentux/preview-4.webp', alt: 'Preview 4' }
    ],
    keyFeatures: [
      'AI agents simulate real user personas in live browser sessions',
      'Real time activity feed with actions and reasoning',
      'Detects usability issues from behavior (misclicks and hesitation)',
      'One-click UI fixes with live preview',
      'Parallel testing across multiple personas',
      'End-to-end flow: URL → issues → fixes → deploy prompt'
    ],
    team: {
      members: ['Jaden Seangmany', 'Manjusri Gobiraj', 'Alice Lan'],
      myContributions: [
      'Developed a responsive Chrome extension UI with smooth, performant animations',
      'Implemented intuitive interaction logic to create a seamless user experience',
      ]
    }
  },
  {
    id: 9,
    title: 'Bontourismo',
    role: 'UI/UX Designer',
    projectType: 'Designathon',
    category: 'uiux',
    image: '/images/uiux/bontourismo.png',
    startDate: 'Mar 2025',
    endDate: 'Mar 2025'
  },
  {
    id: 10,
    title: 'PlateMate',
    role: 'UI/UX Designer',
    projectType: 'Project',
    category: 'uiux',
    image: '/images/uiux/platemate.png',
    startDate: 'Oct 2024',
    endDate: 'Jan 2025'
  },
  {
    id: 11,
    title: 'VendorDex',
    role: 'UI/UX Designer',
    projectType: 'Project',
    category: 'uiux',
    image: '/images/uiux/vendordex.png',
    startDate: 'Sep 2025',
    endDate: 'Dec 2025'
  }
];

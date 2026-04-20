import farmMonitorCase1Image from '../../assets/Farm-Monitor-AI_Case1.png';

export interface CaseStudy {
  slug: string;
  label: string;
  title: string;
  excerpt: string;
  client: string;
  sections: {
    setup: string[];
    problem: string[];
    built: string[];
    result: string[];
  };
  quote: {
    text: string;
    attribution: string;
  };
  estimatedTimeSaved: Array<{
    task: string;
    timeSaved: string;
  }>;
  closingLine: string;
  image?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'farm-monitoring-ai-agent',
    label: 'Case Study',
    title: 'Farm Monitoring AI Agent',
    excerpt:
      'We deployed an AI monitoring agent for a retired engineer and hobby farmer in the highlands of Malaysia to replace manual tank checks with plain-English updates and proactive alerts.',
    client: 'A retired engineer and hobby farmer, highlands Malaysia',
    sections: {
      setup: [
        'High up in the Malaysian highlands, a retired engineer with 40 years of experience built himself a mountain farm and an obsession with growing lettuce.',
        'The farm runs on a single large fertilizer tank, and for years monitoring it meant the same routine: walk to the tank, check levels, log numbers, do the math, and hope nothing went wrong overnight.',
        'With bad knees and a growing farm, that routine was becoming unsustainable.'
      ],
      problem: [
        'The tank did not care about bad knees. Every morning, rain or shine, someone still had to physically inspect it.',
        'Raw sensor readings gave numbers (centimeters, voltages, EC values) but no answers. Refill timing and days remaining were unclear unless someone calculated it manually.',
        'If something went wrong overnight, nobody would know until the next morning walk.'
      ],
      built: [
        'We worked with the farmer to deploy an AI monitoring agent on the farm.',
        'The system collects real-time water level and nutrient concentration data, runs it through an AI model, and delivers plain-English updates via Telegram as text or voice messages.',
        'No dashboard to learn. No raw numbers to interpret. Just clear updates on what is happening and what to do next.'
      ],
      result: [
        'The daily walk to the tank stopped. Mornings now start on the porch with coffee and a voice note to the bot.',
        'The AI does not just report numbers. It analyzes historical consumption and estimates how many days remain before a refill is needed.',
        'It sends automatic alerts when levels drop below safe thresholds and explains unusual behavior, such as nutrient spikes after hot weeks.'
      ]
    },
    quote: {
      text: "Most sensors just scream raw numbers at you and then it's your job to play detective. This system is different. It doesn't just say water is low; it looks at the history and tells me I've got exactly three days until I need to haul a refill out there. That's not just data, that's a schedule. My knees aren't what they used to be, and I used to trek out to those tanks every single morning. Now I sit on my porch with a coffee, send a quick voice note asking how the nutrients are looking, and it replies in plain English.",
      attribution: 'Retired engineer and hobby farmer, highlands Malaysia'
    },
    estimatedTimeSaved: [
      { task: 'Physical inspections eliminated', timeSaved: '~3 hours per week' },
      { task: 'Manual testing and logging', timeSaved: '~1.5 hours per week' },
      { task: 'Maintenance planning', timeSaved: 'Fully automated' },
      { task: 'Total', timeSaved: '~5-6 hours per week' }
    ],
    closingLine: 'Built by Rovyn - AI that actually works for your business.',
    image: farmMonitorCase1Image
  }
];

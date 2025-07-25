import type { HandbookSection } from "./types"

export const HANDBOOK_SECTIONS: HandbookSection[] = [
  {
    id: "welcome",
    title: "Welcome to MC&D",
    content: [
      {
        type: "text",
        text: "WELCOME TO MARSHALL, CARTER, AND DARKE LTD.!",
      },
      {
        type: "text",
        text: "Are you a decently newer fella to custom site RP? Confused on what to do now that you have passed into MC&D? Need general assistance?",
      },
      {
        type: "text",
        text: "Fear not... this document was crafted just to help you progress and settle down with our company.",
      },
      {
        type: "callout",
        calloutType: "info",
        text: "NOTICE: This is the official handbook of Marshall, Carter, and Darke Ltd. brought to you by the current leading shareholders of the company.",
      },
    ],
  },
  {
    id: "verification",
    title: "Discord Verification",
    content: [
      {
        type: "text",
        text: "Welcome to the MC&D Discord server! To unlock full access to our exclusive channels and begin your journey as a shareholder, you'll need to complete our streamlined verification process.",
      },
      {
        type: "callout",
        calloutType: "info",
        text: "🎯 Quick Start: Use the /verify command in our verification channel to instantly gain access to member-exclusive areas.",
      },
      {
        type: "text",
        text: "Follow this step-by-step verification process to gain full access to MC&D:",
      },
      {
        type: "discord-verification",
      },
      {
        type: "text",
        text: "Once verified, you'll gain access to our comprehensive network of channels designed to support your growth within the company:",
      },
      {
        type: "list",
        items: [
          "🏠 Welcome Hub - Your gateway to MC&D",
          "🚪 The Door - Executive entrance portal",
          "✅ Verification Center - Complete your onboarding",
          "🎭 Role Selection - Choose your path",
          "❓ Q&A Support - Get instant help",
          "💬 Shareholder Lounge - Connect with peers",
        ],
      },
    ],
  },
  {
    id: "codenames",
    title: "Professional Codenames",
    content: [
      {
        type: "text",
        text: "At Marshall, Carter & Darke, your professional identity is paramount. Every shareholder operates under a carefully chosen codename that reflects their expertise and standing within our organization.",
      },
      {
        type: "callout",
        calloutType: "success",
        text: "💡 Pro Tip: Choose a codename that embodies professionalism and sophistication - it will become your legacy within MC&D.",
      },
      {
        type: "heading",
        text: "Codename Selection Process",
      },
      {
        type: "callout",
        calloutType: "info",
        text: "Your codename represents your professional brand within MC&D. Use the Format Generator in the Quick Tools section above to create a properly formatted codename request with validation.",
      },
      {
        type: "text",
        text: "Upon approval by our High Command, you'll receive your official MC&D credentials:",
      },
      {
        type: "list",
        items: [
          "🏛️ MC&D Shareholder Status",
          "📊 Low Rank Classification",
          "🎖️ Recruit Designation",
          "⚡ Wrecker Division Assignment",
          "🌟 Current Generation Member",
        ],
      },
    ],
  },
  {
    id: "divisions",
    title: "Divisions & Channels",
    content: [
      {
        type: "text",
        text: "The default division of MC&D is the Wrecker Division, as it is the only division LRs may join! But you can always attempt to expand your output to our other division, the Accounting Division [once you are an MR+]. The divisional advertisements are found here:",
      },
      {
        type: "discord-interface",
      },
      {
        type: "text",
        text: "Learn cool stuff and ditch school because MC&D is your school! Available educational channels include:",
      },
      {
        type: "list",
        items: ["#math-class", "#count-to-503", "#english-class", "#karaoke"],
      },
      {
        type: "text",
        text: "Read up on recent announcements that may apply to you in #announcements and #sub-announcements.",
      },
      {
        type: "text",
        text: "Have a laugh and look at our 'hall of shame' in #hicom-shitposting and #memory-lane!",
      },
      {
        type: "callout",
        calloutType: "info",
        text: "Please do not hesitate and feel free to ask questions! Use the #qna channel for any inquiries.",
      },
    ],
  },
  {
    id: "hierarchy",
    title: "Hierarchy & Promotions",
    content: [
      {
        type: "text",
        text: "MC&D operates on a structured hierarchy system with specific point requirements and responsibilities for each rank. Understanding this system is crucial for your advancement within the company.",
      },
      {
        type: "hierarchy-interface",
      },
      {
        type: "callout",
        calloutType: "info",
        text: "Use the Format Generator in the Quick Tools section above to create properly formatted promotion requests. It includes all required fields and validation.",
      },
      {
        type: "heading",
        text: "Promotion Guidelines",
      },
      {
        type: "list",
        items: [
          "Ensure you meet all point requirements before requesting",
          "Complete any additional requirements (self deployments, applications, etc.)",
          "Use the exact format provided in the promotion-request channel",
          "Be patient - HICOM+ will review your request promptly",
          "Maintain professional conduct while awaiting promotion",
        ],
      },
    ],
  },
  {
    id: "shift-logging",
    title: "Shift Logging & Points",
    content: [
      {
        type: "text",
        text: "Self deployments are a crucial way to earn points in MC&D. Here's the complete process for logging your shifts and requesting points using our advanced Trident Timer system.",
      },
      {
        type: "trident-timer",
      },
      {
        type: "heading",
        text: "How to Use Trident Timer",
      },
      {
        type: "list",
        items: [
          "Use the /shift manage command in Discord to access the timer",
          "Click 'Start Shift' when beginning your self deployment",
          "Use 'Break' feature when taking breaks (doesn't count toward points)",
          "Click 'End Shift' when completing your deployment",
          "Take screenshots of your timer for proof",
        ],
      },
      {
        type: "callout",
        calloutType: "info",
        text: "Use the Format Generator in the Quick Tools section above to create properly formatted shift logs with all required fields.",
      },
      {
        type: "callout",
        calloutType: "warning",
        text: "Be sure to remain productive throughout your shifts; live up to MC&D's purpose and reputation! Keep in mind, shifts do not include time spent in an official deployment, only time spent alone. Use the 'break' feature of the bot to solve that.",
      },
      {
        type: "text",
        text: "Once you have logged your shift, it is time to request points for that shift. Head over to the point-request channel and use the Format Generator above to create a properly formatted point request.",
      },
      {
        type: "callout",
        calloutType: "info",
        text: "The Format Generator includes validation and ensures all required fields are filled correctly, including the exact shift log message link.",
      },
      {
        type: "text",
        text: "Be sure to read pinned chats for rules of this complex channel as well! Note that for the shift log link, you must provide the EXACT shift log message within your individual shift log post or thread who are giving you points, can click on the link and head straight to the log.",
      },
    ],
  },
  {
    id: "points",
    title: "Point System",
    content: [
      {
        type: "text",
        text: "Points are the primary currency for advancement in MC&D. Here's how you can earn them:",
      },
      {
        type: "heading",
        text: "Faction Events",
      },
      {
        type: "text",
        text: "Earn 5 points per 30 minutes of attendance:",
      },
      {
        type: "list",
        items: ["Deployments (hosted by HR+)", "Trainings (hosted by HR+)", "Tryout Supervisions"],
      },
      {
        type: "text",
        text: "Points are given directly after the event host logs the event.",
      },
      {
        type: "heading",
        text: "Self Deployments",
      },
      {
        type: "text",
        text: "Earn 3 points per 30 minutes of self deployment:",
      },
      {
        type: "list",
        items: [
          "Must be logged properly with timer and screenshots",
          "Must be properly formatted when requesting points",
          "Submit logs in the designated channels",
        ],
      },
      {
        type: "heading",
        text: "Special Events",
      },
      {
        type: "list",
        items: ['"The Probes" Interrogation - 5 points FLAT'],
      },
      {
        type: "callout",
        calloutType: "info",
        text: "Example: If you attend a 2.5 hour deployment, you earn 25 points. If you self deploy for 1.5 hours, you earn 9 points.",
      },
    ],
  },
  {
    id: "hierarchy-detailed",
    title: "Detailed Hierarchy",
    content: [
      {
        type: "text",
        text: "MC&D operates on a structured hierarchy system with specific point requirements and responsibilities for each rank.",
      },
      {
        type: "heading",
        text: "Executive Command (200 HP)",
      },
      {
        type: "list",
        items: [
          'Company CEO - FL - "Sun" (Marshall)',
          'Company COO - CFL - "Sky" (Darke)',
          'Company Advisor - 3rd-in-Command - "Blade"',
        ],
      },
      {
        type: "heading",
        text: "High Command (200 HP)",
      },
      {
        type: "list",
        items: [
          'Head of Operations - "Guy" (Handpicked)',
          "Division Leaders - Handpicked positions",
          'Force Leader of Wrecker Division - "Moonveil"',
          'Finance Director of Accounting Division - "Singularity"',
        ],
      },
      {
        type: "heading",
        text: "High Ranks (200 HP)",
      },
      {
        type: "list",
        items: [
          "530 points + 10 deployments hosted",
          "480 points",
          "430 points + 3 deployments hosted",
          "380 points",
          "330 points + Pass HR Applications",
        ],
      },
      {
        type: "heading",
        text: "Middle Ranks (175 HP)",
      },
      {
        type: "list",
        items: ["275 points", "240 points", "205 points", "170 points", "135 points + 3 self deployments"],
      },
      {
        type: "heading",
        text: "Low Ranks (150 HP)",
      },
      {
        type: "list",
        items: [
          "100 points",
          "75 points",
          "50 points + 1 self deployment",
          "25 points",
          "Pass Tryout/Application (Starting rank)",
        ],
      },
      {
        type: "callout",
        calloutType: "warning",
        text: "Low Ranks may not join the Accounting Division! You must reach Middle Rank or higher with division leader permission.",
      },
    ],
  },
  {
    id: "divisions-detailed",
    title: "Division Details",
    content: [
      {
        type: "text",
        text: "MC&D operates two specialized divisions, each with unique roles and responsibilities.",
      },
      {
        type: "heading",
        text: "The Wrecker Division",
      },
      {
        type: "text",
        text: "A combat-oriented task force focused on field operations.",
      },
      {
        type: "text",
        text: "What the division does:",
      },
      {
        type: "list",
        items: [
          "Retrieval of Certain Assets",
          "Protection/Guarding of other Division Members",
          "Goes through any means to satisfy MC&D's wishes",
          "A Basic Task Force fit for MC&D Ltd.",
        ],
      },
      {
        type: "text",
        text: "Benefits to other deployers:",
      },
      {
        type: "list",
        items: [
          "Line of Defense",
          "Gives Deployers Higher Freedom of Location",
          "Allows Deployers to Safely Interact/Endorse",
        ],
      },
      {
        type: "text",
        text: "Why join:",
      },
      {
        type: "list",
        items: ["Higher CanRK Authority", "Safety is in our hands!"],
      },
      {
        type: "text",
        text: 'Division Leader: Force Leader "Moonveil"',
      },
      {
        type: "heading",
        text: "The Accounting Division",
      },
      {
        type: "text",
        text: "The RP-focused division handling business operations and client relations.",
      },
      {
        type: "text",
        text: "What the division does:",
      },
      {
        type: "list",
        items: [
          "Advertisement",
          "Endorsement",
          "Organizes, Logs, and Auctions Physical/Anomalous Assets",
          "Public Relations Management",
        ],
      },
      {
        type: "text",
        text: "Benefits to MC&D:",
      },
      {
        type: "list",
        items: ["Main Reason MC&D receives profits/funds", "The Powerhouse of MC&D"],
      },
      {
        type: "text",
        text: "Why join:",
      },
      {
        type: "list",
        items: ["Heavy Role-Play (like, a gold mine of RP!)", "Less Combat-Oriented"],
      },
      {
        type: "callout",
        calloutType: "warning",
        text: "NOTE: Only MR+ may join with the permission of the Division Leader",
      },
      {
        type: "text",
        text: 'Division Leader: Finance Director "Singularity"',
      },
    ],
  },
  {
    id: "events",
    title: "Event System",
    content: [
      {
        type: "text",
        text: "MC&D hosts three types of events that are essential for member development and point earning.",
      },
      {
        type: "heading",
        text: "Event Types",
      },
      {
        type: "list",
        items: [
          "Deployments - Can be hosted by HR+",
          "Tryouts - Can be hosted by HR+",
          "Trainings - Can be hosted by HR+",
        ],
      },
      {
        type: "text",
        text: "All events give 5 points per 30 minutes of attendance. Points are awarded after the event is properly logged by the host.",
      },
      {
        type: "heading",
        text: "Self Deployments",
      },
      {
        type: "text",
        text: "Members can also conduct self deployments for 3 points per 30 minutes. Requirements:",
      },
      {
        type: "list",
        items: [
          "Must be logged with a timer",
          "Several screenshots required as proof",
          "Must be properly formatted when requesting points",
          "Submit in designated logging channels",
        ],
      },
      {
        type: "callout",
        calloutType: "success",
        text: "Example: Attend a 2.5 hour deployment = 25 points. Self deploy for 1.5 hours = 9 points.",
      },
    ],
  },
  {
    id: "clearance",
    title: "Clearance & Site Access",
    content: [
      {
        type: "text",
        text: "MC&D is a Neutral Group of Interest with Level-2 Clearance access to various SCP Foundation sites.",
      },
      {
        type: "heading",
        text: "Current Site Access",
      },
      {
        type: "text",
        text: "Site-64:",
      },
      {
        type: "list",
        items: ["L-2 Clearance: LR, MR, HR, HICOM, EXCOM"],
      },
      {
        type: "text",
        text: "Site-81:",
      },
      {
        type: "list",
        items: ["L-2 Clearance: LR, MR, HR, HICOM, EXCOM"],
      },
      {
        type: "callout",
        calloutType: "info",
        text: "Clearance levels may vary by site. Always check the specific site's Faction Hub for current regulations and morph requirements.",
      },
      {
        type: "heading",
        text: "CanRK Authority",
      },
      {
        type: "text",
        text: "CanRK (Can Rank Kill) permissions by division and rank:",
      },
      {
        type: "list",
        items: [
          "HICOM+: Full CanRK authority in both divisions",
          "HR: Full CanRK authority in both divisions",
          "MR: CanRK authority in Wrecker Division only",
          "LR: CanRK authority in Wrecker Division only",
        ],
      },
    ],
  },
  {
    id: "regulations",
    title: "Regulations & Punishment System",
    content: [
      {
        type: "text",
        text: "MC&D maintains strict standards of professionalism and conduct. Violations result in a progressive punishment system.",
      },
      {
        type: "heading",
        text: "Strike System",
      },
      {
        type: "list",
        items: [
          "Strike 1 - You've made a mistake and have been given reasons, DO NOT repeat it again whatsoever",
          "Strike 2 - You are on thin ice… be very careful, think before you do",
          "Strike 3 - Removal from MC&D, you may join the faction again (progress resets)",
          "Blacklist - You may not join the faction again, usually occurs when you are the reason MC&D gets striked or warned in the Faction Hub of a site",
        ],
      },
      {
        type: "callout",
        calloutType: "warning",
        text: "Some strikes are appealable, and some are not. To appeal a strike, DM the person who logged the punishment.",
      },
      {
        type: "heading",
        text: "Codename Regulations",
      },
      {
        type: "list",
        items: [
          "You may not have an inappropriate codename",
          "You may not have a codename of an already existing member of the company",
          "You have the freedom to change your codename at any point just be re-requesting it",
          "Try not to change your codename if you are already well-known for it",
        ],
      },
      {
        type: "heading",
        text: "General Server Rules",
      },
      {
        type: "list",
        items: [
          "Follow Discord's Terms of Service",
          "Be respectful with all members",
          "No death threats, sexism, hate speech, racism, or politics",
          "No doxxing or advertising",
          "No NSFW content or spamming",
          "Use English only",
          "Use designated channels for designated tasks",
          "Report punishable behavior to HICOM+ immediately",
        ],
      },
    ],
  },
  {
    id: "leadership",
    title: "Leadership & Medal System",
    content: [
      {
        type: "text",
        text: "Understanding the leadership structure and recognition system available in MC&D.",
      },
      {
        type: "heading",
        text: "Leadership Positions",
      },
      {
        type: "text",
        text: "Faction Overseers:",
      },
      {
        type: "list",
        items: [
          'Company CEO - FL - "Marshall" / "Sun"',
          'Company COO - CFL - "Darke" / "Sky"',
          "Company Advisor - ADV - VACANT",
        ],
      },
      {
        type: "text",
        text: "High Command:",
      },
      {
        type: "list",
        items: [
          'Head of Operations - HoO - "Guy"',
          'Force Leader of the WD - "Moonveil"',
          'Finance Director of the AD - "Singularity"',
        ],
      },
      {
        type: "heading",
        text: "HICOM vs HR Differences",
      },
      {
        type: "text",
        text: "High Command abilities:",
      },
      {
        type: "list",
        items: [
          "Can Fulfill Point/Promotion Requests",
          "Can Log Punishments",
          "Can Create Activity Checks",
          "Can Add Roles to Users",
          "Discord Permissions",
          "On-Site Mod Permissions",
          "Can Host Tryouts/Deployments/Trainings",
          "Doesn't Have Activity Quotas",
        ],
      },
      {
        type: "text",
        text: "High Rank abilities:",
      },
      {
        type: "list",
        items: [
          "Must Request Points for themselves and Event Attendees",
          "Have Activity Quotas",
          "Cannot Log Punishments",
          "Cannot Create Activity Checks",
          "Cannot Add Roles to Users",
          "Can Host Tryouts/Deployments/Trainings",
        ],
      },
      {
        type: "text",
        text: "MC&D recognizes exceptional service through various medals and achievements. Check the #medal-info channel for current available medals and their requirements.",
      },
    ],
  },
  {
    id: "conclusion",
    title: "Final Steps",
    content: [
      {
        type: "text",
        text: "I would say about now is when you know 75% of what you need to settle down here in MC&D. The rest can be found in things like the MC&D Handbook (found in our advertisement and underneath rules), and a few other documents.",
      },
      {
        type: "callout",
        calloutType: "success",
        text: "Thanks for willing to try out and participate in MC&D, we hope you make an impact on the capitalist cause!",
      },
      {
        type: "heading",
        text: "Quick Checklist",
      },
      {
        type: "list",
        items: [
          "✅ Complete Discord verification with /verify",
          "✅ Submit codename request and get approval",
          "✅ Get assigned to Wrecker Division (default for LR)",
          "✅ Read all information channels",
          "✅ Understand point system and promotion requirements",
          "✅ Learn shift logging procedures",
          "✅ Participate in deployments and events",
          "✅ Work towards your first promotion!",
        ],
      },
      {
        type: "text",
        text: "Welcome to Marshall, Carter, and Darke Ltd. - where profit meets prestige!",
      },
    ],
  },
]

import type { HandbookSection } from "./types"

export const HANDBOOK_SECTIONS: HandbookSection[] = [
  {
    id: "welcome",
    title: "Welcome to Marshall, Carter & Darke Ltd.",
    content: [
      {
        type: "text",
        text: "Are you a decently newer fella to custom site RP? Confused on what to do now that you have passed into MC&D? Need general assistance?",
      },
      {
        type: "text",
        text: "Fear not… this document was crafted just to help you progress and settle down with our company.",
      },
    ],
  },
  {
    id: "verification",
    title: "Verify",
    content: [
      {
        type: "text",
        text: "You have just joined the MC&D official Discord server, but you have access to barely any channels!",
      },
      {
        type: "text",
        text: "How can you fix this? Verify! Our server has a bot named 'Bloxlink' which enables you to verify and obtain the 'verified' role. All you have to do is run the command '/verify' in the following channel.",
      },
      {
        type: "text",
        text: "You should now have obtained the 'verified' role and have access to the following channels if not more!",
      },
    ],
  },
  {
    id: "codenames",
    title: "Codenames",
    content: [
      {
        type: "text",
        text: "Well now you have access to a whole bunch of new channels, what is next? Here at MC&D, and all other factions/departments throughout custom site RP, you'll need a codename.",
      },
      {
        type: "text",
        text: "Try and think of a unique, appropriate, and favorable codename you'd like to be referred to as by your MC&D comrades. Then, proceed to the following channel and read pinned messages. You should be able to find a codename request format. Here is that same format below if you cannot find it.",
      },
      {
        type: "code-block",
        language: "text",
        code: "FORMAT:\nDiscord Username: \nRoblox Username: \nCodename Request: ",
      },
      {
        type: "callout",
        calloutType: "warning",
        text: "NOTE: Your codename must be approved by HICOM+ to proceed to make a morph",
      },
      {
        type: "text",
        text: "You will be given the following roles shortly after your codename is requested, remain patient.",
      },
      {
        type: "list",
        items: [
          "[:] MC&D Shareholders [:]",
          "[:] Low Rank [:]",
          "[:] Recruit [:]",
          "[:] Wrecker Division [:]",
          "[:] Current Generation [:]",
        ],
      },
    ],
  },
  {
    id: "channels",
    title: "Discord Channels Guide",
    content: [
      {
        type: "text",
        text: "Navigate MC&D's Discord server efficiently with this comprehensive channel guide. Each channel serves a specific purpose in our corporate structure.",
      },
      {
        type: "discord-interface",
      },
      {
        type: "heading",
        text: "Educational & Social Channels",
      },
      {
        type: "list",
        items: ["#math-class - Mathematical discussions", "#count-to-503 - Community counting game", "#english-class - Language and communication", "#karaoke - Entertainment and team building"],
      },
      {
        type: "heading",
        text: "Information Channels",
      },
      {
        type: "list",
        items: ["#announcements - Official company updates", "#sub-announcements - Departmental notices", "#qna - Questions and assistance"],
      },
      {
        type: "heading",
        text: "Community Channels",
      },
      {
        type: "list",
        items: ["#hicom-shitposting - Leadership casual discussions", "#memory-lane - Company history and memorable moments"],
      },
      {
        type: "callout",
        calloutType: "info",
        text: "Don't hesitate to ask questions! Use the #qna channel for any inquiries about MC&D operations.",
      },
    ],
  },
  {
    id: "hierarchy",
    title: "Promotions",
    content: [
      {
        type: "text",
        text: "How can you get promoted? This section will revolve around one channel once again, and will focus on how to request a promotion.",
      },
      {
        type: "hierarchy-interface",
      },
      {
        type: "div",
      },
      {
        type: "text",
        text: "First, head to the promotion-request channel. Read the pinned messages to understand the format and requirements. The format is also provided below:",
      },
      {
        type: "code-block",
        language: "text",
        code: "FORMAT:\nDiscord Username: \nRoblox Username: \nCodename: \nCurrent Rank: \nRequested Rank: \nCurrent Points: \nAdditional Requirements Met: ",
      },
      {
        type: "callout",
        calloutType: "info",
        text: "Use the Format Generator in the Quick Tools section above to create properly formatted promotion requests. It includes all required fields and validation.",
      },
      {
        type: "text",
        text: "Make sure you meet all the point requirements and any additional requirements (like self deployments or applications) before requesting your promotion. HICOM+ will review your request and promote you if you qualify.",
      },
    ],
  },
  {
    id: "shift-logging",
    title: "Self Deploying and Points",
    content: [
      {
        type: "text",
        text: "How can you log a shift? This section will revolve around two channels once again, and will focus on how to run a self deployment and also request points for that hard work.",
      },
      {
        type: "text",
        text: "First, create a post designated for yourself in the shift-logs channel. Name it with your codename in \"s. The format to use for every single log in your own post, is in the pinned post of the shift-logs channel, but also below:",
      },
      {
        type: "code-block",
        language: "text",
        code: "FORMAT:\nCodename: \nCurrent Rank: \nDivision: \nTime: \nTasks/Notes: \nProof: (1+ Screenshots w/ Trident Timer)",
      },
      {
        type: "text",
        text: "Your Trident Timer can be begun in your shift-log post, using the command /shift manage command. The bot will allow you to begin your shift, and if the command is run again, give you the option to pause and take a break or end the shift. Handy right? This is what your shift will look like after you end it (ignore the 3 seconds 😭).",
      },
      {
        type: "text",
        text: "Be sure to remain productive throughout your shifts; live up to MC&D's purpose and reputation! Keep in mind, shifts do not include time spent in an official deployment, only time spent alone. USe the \"break\" feature of the bot to solve that.",
      },
      {
        type: "text",
        text: "Once you have logged your shift, it is time to request points for that shift. Head over to the point-request channel, and use the format in pinned messages over there. If not found, it is listed below.",
      },
      {
        type: "code-block",
        language: "text",
        code: "FORMAT:\nUsername:\nDivision:\nRank:\nPoints Requested:\nShift Log Link:\nPing:",
      },
      {
        type: "text",
        text: "Be sure to read pinned chats for rules of this complex channel as well! Note that for the shift log link, you must provide the EXACT shift log message within your individual shift post so those who are giving you points, can click on the link and head straight to the log. Find the following button when holding shift and your cursor is above your log message.",
      },
      {
        type: "text",
        text: "Once the individual message link is copied you may add it for your Shift Log Link in the format.",
      },
    ],
  },
  {
    id: "points",
    title: "Point System",
    content: [
      {
        type: "text",
        text: "Points are the primary currency for advancement within Marshall, Carter & Darke. Understanding the point system is crucial for your progression through our corporate hierarchy.",
      },
      {
        type: "heading",
        text: "Official Events (5 points per 30 minutes)",
      },
      {
        type: "list",
        items: ["Deployments (hosted by HR+)", "Training Sessions (hosted by HR+)", "Tryout Supervisions", "Special Operations"],
      },
      {
        type: "callout",
        calloutType: "success",
        text: "Points are automatically awarded after the event host logs the session. No additional action required from attendees.",
      },
      {
        type: "heading",
        text: "Self Deployments (3 points per 30 minutes)",
      },
      {
        type: "list",
        items: [
          "Must use Trident Timer system for accurate logging",
          "Requires screenshot evidence of activities",
          "Must submit properly formatted point requests",
          "Submit in designated logging channels only",
        ],
      },
      {
        type: "heading",
        text: "Special Recognition",
      },
      {
        type: "list",
        items: ['Anomalous Asset Interrogations - 5 points (flat rate)', 'Exceptional Performance Bonuses - Variable points'],
      },
      {
        type: "callout",
        calloutType: "info",
        text: "Calculation Example: 2.5 hour official deployment = 25 points | 1.5 hour self deployment = 9 points",
      },
    ],
  },
  {
    id: "hierarchy-detailed",
    title: "Global Hierarchy",
    content: [
      {
        type: "text",
        text: "MC&D operates on a structured hierarchy system with specific rank names and positions. Here's the complete global hierarchy structure:",
      },
      {
        type: "heading",
        text: "Executives",
      },
      {
        type: "list",
        items: [
          'Company CEO - "Sun" - Marshall',
          'Company COO - "Sky" - Carter',
          'Company Advisor - "Blade" - 3rd-in-Command',
        ],
      },
      {
        type: "heading",
        text: "High Command - 200 HP",
      },
      {
        type: "list",
        items: [
          'Head of Operations - Handpicked - Head High Command',
          'Force Leader of the WD - "Moonveil" - Handpicked - DL',
          'Finance Director of the AD - "Singularity" - Handpicked - CDL',
        ],
      },
      {
        type: "heading",
        text: "High Ranks - 200 HP",
      },
      {
        type: "list",
        items: [
          'Commander - 530 points + 10 deployments hosted - HR',
          'General - 480 points - HR',
          'Captain - 430 points + 3 deployments hosted - HR',
          'Colonel - 380 points - HR',
          'Major - 330 points + Pass High Rank Applications - HR',
        ],
      },
      {
        type: "heading",
        text: "Middle Ranks - 175 HP",
      },
      {
        type: "list",
        items: [
          'Lieutenant - 275 points - MR',
          'Sergeant - 240 points - MR',
          'Corporal - 205 points - MR',
          'Specialist - 170 points - MR',
          'Officer - 135 points + 3 self deployments - MR',
        ],
      },
      {
        type: "heading",
        text: "Low Ranks - 150 HP",
      },
      {
        type: "list",
        items: [
          'Senior Operative - 100 points - LR',
          'Operative - 75 points - LR',
          'Junior Operative - 50 points + 1 self deployment - LR',
          'Trainee - 25 points - LR',
          'Recruit - Pass Tryout/Application - LR',
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
    id: "morphs",
    title: "Morphs",
    content: [
      {
        type: "text",
        text: "We are getting to a little more complex step of settling into factions, morphs. Hopefully you are competent enough to understand the process.",
      },
      {
        type: "text",
        text: "Morphs are the way you represent your faction while on-site, and deploy. Let me show you how to make your morph, and also how to get morphed on-site. This process revolves around the following two channels.",
      },
      {
        type: "list",
        items: [
          "Step 1: Take the LR Morph format from morph-formats and copy it",
          "Step 2: Create a post in morphs-locker and name it after your codename (in \"s)",
          "Step 3: Paste the LR Morph format into the post details (DON'T SUBMIT YET!)",
          "Step 4: Change every \"user\" in the block of text, to your Roblox Username",
          "Step 5: Change \"Rank\" in the :permrtag command to Recruit",
          "Step 6: Change \"Codename\" in the :permntag command to your accepted codename",
          "Step 7: Submit the locker post, await a HICOM+ to stamp the \"Approved\" tag",
        ],
      },
      {
        type: "text",
        text: "Now how exactly do you get morphed on-site? Well, MC&D does grant mod perms to HR+, so if you see an HR+ online then they can morph you if they have received perms yet. If there is no HR+ on-site, then you have no choice but to resort to getting a morpher. How do we get one? Go to Site 64's main server and find the following channel.",
      },
      {
        type: "text",
        text: "Once you have reached this channel, copy and paste your morph in your locker and say \"!morpher\" in the in-game communications radio. Soon enough, with patience a member of the GMT (Game Moderation Team) or a different staff member, will teleport to you and use the morph you sent in the morphs channel, and they will morph you so you are ready to self deploy!",
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
  {
    id: "beginner-info",
    title: "Beginner Information",
    content: [
      {
        type: "text",
        text: "This is the end of the basic onboarding process. You should now have a good understanding of how MC&D operates and what is expected of you as a member.",
      },
      {
        type: "text",
        text: "Remember to stay active, participate in deployments, log your shifts properly, and work towards your promotions. If you have any questions, don't hesitate to ask in the appropriate channels.",
      },
      {
        type: "text",
        text: "Welcome to the team, and good luck with your career at Marshall, Carter, and Darke Ltd.!",
      },
    ],
  },
]

const data = 
{projects: [

    {
        key: "PKAVS",
        name: "project-website-pkavs",
        type: "Team-managed software",
        client: "PKAVS",
        role: "QA Tester",
        description: "Blah blah",
        skills: ["Acceptance Testing"],
        minHours: 5,
        maxHours: 10,
        timePeriod: "per week",
        required: "One person",
        buddying: false
    },
    {
        key: "SVA",
        name: "STA-volunteer Apps",
        type: "Team-managed software",
        client: "STA - internal",
        role: "Lead developer",
        description: "Blah blah",
        skills: ["React Native", "Node.js"],
        minHours: 5,
        maxHours: 10,
        timePeriod: "per week",
        required: "One person",
        buddying: true
    },

    {
        key: "SOLE",
        name: "SOLE",
        type: "Team-managed software",
        client: "STA - internal",
        role: "Lead test analyst",
        description: "The lead tester is a coordination and management role, so an understanding of and experience in a number of testing disciplines, rather than depth in any specific one.",
        skills: ["Acceptance Testing", "Unit Testing"],
        minHours: 5,
        maxHours: 10,
        timePeriod: "per week",
        required: "Multiple people",
        buddying: true
    }
]
}

export default data;
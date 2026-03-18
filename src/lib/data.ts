export const skillsData = {
  name: 'Skills',
  hexColor: '#b9ff00',
  hslColor: 'hsl(var(--accent))',
  icon: 'GiSkills',
  children: [
    {
      name: 'Front-End',
      code: '',
      hexColor: '#02fac0',
      hslColor: 'hsl(var(--skills-front-end))',
      icon: 'BsFileEarmarkCode',
      children: [
        {
          name: 'Web',
          code: '',
          hexColor: '#ffa600',
          hslColor: 'hsl(var(--skills-web))',
          icon: 'CgWebsite',
          children: [
            {
              name: 'React.js',
              code: '',
              hexColor: '#61DBFB',
              hslColor: 'hsl(var(--skills-react-js))',
              icon: 'FaReact',
              children: [
                { name: 'Flux', attr: 'Framework', icon: 'SiInfluxdb' },
                { name: 'Redux', attr: 'Framework', icon: 'SiRedux' },
              ],
            },
            { name: '', code: '' },
            { name: 'Angular', code: 'typescript', icon: 'SiAngular' },
            { name: 'Angular.js', code: '', icon: 'TbBrandAngular' },
            { name: 'ASP.NET', code: '', icon: 'SiDotnet' },
          ],
        },
        {
          name: 'Mobile',
          code: '',
          hexColor: '#ff6361',
          hslColor: 'hsl(var(--skills-mobile))',
          icon: 'MdMobileFriendly',
          children: [
            { name: 'Xamarin Forms', code: 'C#', icon: 'SiXamarin' },
            { name: 'Flutter', code: 'Dart', icon: 'SiFlutter' },
          ],
        },
        {
          name: 'Desktop',
          code: '',
          hexColor: '#c095e4',
          hslColor: 'hsl(var(--skills-desktop))',
          icon: 'AiOutlineDesktop',
          children: [
            { name: 'WPF', code: 'C#', icon: 'FaWpforms' },
            { name: 'Windows Forms', code: 'C#', icon: 'SiFormstack' },
          ],
        },
      ],
    },
    {
      name: 'Back-End',
      code: '',
      hexColor: '#5cb50e',
      hslColor: 'hsl(var(--skills-back-end))',
      icon: 'AiFillApi',
      children: [
        { name: 'Node', code: ['javascript', 'typescript'], icon: 'FaNodeJs' },
      ],
    },
    {
      name: 'Data',
      hexColor: '#f8cc1b',
      hslColor: 'hsl(var(--skills-data))',
      icon: 'AiFillDatabase',
      children: [
        { name: 'MS-SQL', icon: 'SiMicrosoftsqlserver' },
        { name: 'Oracle-SQL', icon: 'SiOracle' },
      ],
    },
    {
      name: 'Cloud',
      hexColor: '#1982c4',
      hslColor: 'hsl(var(--skills-cloud))',
      icon: 'BsFillCloudCheckFill',
      children: [
        { name: 'Azure', icon: 'SiMicrosoftazure' },
        { name: 'AWS', icon: 'FaAws' },
        { name: 'Docker', icon: 'FaDocker' },
        { name: 'Jenkins', icon: 'SiJenkins' },
      ],
    },
    {
      name: "IDE's & Tools",
      hexColor: '#fb6f92',
      hslColor: 'hsl(var(--skills-ide-tools))',
      icon: 'BsTools',
      children: [
        { name: 'Jira', icon: 'SiJirasoftware' },
        { name: 'SQL Server Mgmt. Studio', icon: 'AiOutlineConsoleSql' },
        { name: 'Visual Studio Code', icon: 'SiVisualstudiocode' },
        { name: 'Visual Studio', icon: 'SiVisualstudio' },
        { name: 'Source-tree', icon: 'FaSourcetree' },
        { name: 'Git', icon: 'AiFillGithub' },
      ],
    },
    {
      name: 'Languages',
      icon: 'MdLanguage',
      hexColor: '#c20c51',
      hslColor: 'hsl(var(--skills-languages))',
      children: [
        { name: 'javascript', icon: 'IoLogoJavascript', hexColor: '#EBD94E', hslColor: 'hsl(var(--skills-javascript))' },
        { name: 'typescript', icon: 'SiTypescript', hexColor: '#4272BA', hslColor: 'hsl(var(--skills-typescript))' },
        { name: 'C#', icon: 'SiCsharp', hexColor: '#4B9738', hslColor: 'hsl(var(--skills-c-sharp))' },
        { name: 'Dart', icon: 'SiDart', hexColor: '#275998', hslColor: 'hsl(var(--skills-dart))' },
      ],
    },
  ],
};

export const companiesData = [
  {
    id: 5,
    name: 'Teladoc Health Inc.',
    shortName: 'TDH',
    from: '03/28/2022',
    role: 'Software Engineer III',
    description: `
        •	Design and rewrite cool react components using both flux and redux.
        •	Work with the API team to design the control end points for performing CRUD operations.
        •	Follow best coding practices, perform peer code-reviews and utilize agile sprints for task creation.
        •	Setup docker and containerize the galaxy application.
        •	Support and Bug fixes`,
    descriptionArr: [
      `•	Design and rewrite cool react components using both flux and redux.`,
      `•	Work with the API team to design the control end points for performing CRUD operations.`,
      `•	Follow best coding practices, perform peer code-reviews and utilize agile sprints for task creation.`,
      `•	Setup docker and containerize the galaxy application.`,
      `•	Support and Bug fixes`,
    ],
  },
  {
    id: 4,
    name: 'DATIS HR Cloud Inc.',
    shortName: 'CC',
    from: '01/13/2020',
    to: '03/25/2022',
    role: 'Application Developer',
    description: `
        •	Design, develop, test & deploy components to handle Enterprise Payroll Systems Software.
        •	Design and develop REST API endpoints to perform CRUD operations on various micro services
        •	Support and Bug fixes`,
    descriptionArr: [
      `•	Design, develop, test & deploy components to handle Enterprise Payroll Systems Software.`,
      `•	Design and develop REST API endpoints to perform CRUD operations on various micro services`,
      `•	Support and Bug fixes`,
    ],
  },
  {
    id: 3,
    name: 'ManTech Enterprises Inc.',
    shortName: 'ManTechApps',
    from: '02/22/2018',
    to: '12/31/2019',
    role: 'Software Developer II',
    description: `
        •	Built cool React apps with routing, state management, error & exception handling.
        •	Built components for cross-platform mobile app and deploy to iOS and Android Store.
        •	REST APIs with Node and Express.
        •	Created stored procedures to extract data
        •	Custom report generation using pdf-make library.`,
    descriptionArr: [
      `•	Built cool React apps with routing, state management, error & exception handling.`,
      `•	Built components for cross-platform mobile app and deploy to iOS and Android Store.`,
      `•	REST APIs with Node and Express.`,
      `•	Created stored procedures to extract data`,
      `•	Custom report generation using pdf-make library.`,
    ],
  },
  {
    id: 2,
    name: 'Tampa1 Technology Solutions',
    shortName: 'T1D1',
    from: '05/22/2017',
    to: '12/08/2017',
    role: 'Technology Specialist Intern',
    description: `
        •	Build highly efficient and resilient apps to address client's concerns.
        •	Migrate the SQL server and generate daily, weekly & monthly reports.`,
    descriptionArr: [
      `•	Build highly efficient and resilient apps to address client's concerns.`,
      `•	Migrate the SQL server and generate daily, weekly & monthly reports.`,
    ],
  },
  {
    id: 1,
    name: 'Tata Consultancy Services',
    shortName: 'TCS',
    from: '06/04/2012',
    to: '10/03/2016',
    role: 'IT Analyst',
    description: `
        •	Involved in various phases of SDLC, created based solutions as per client requirements.
        •	App enhancements, Bug-fixes, process improvements.`,
    descriptionArr: [
      `•	Involved in various phases of SDLC, created based solutions as per client requirements.`,
      `•	App enhancements, Bug-fixes, process improvements.`,
    ],
  },
];

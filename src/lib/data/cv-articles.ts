import { Tech } from '$lib/utils/enums';

export type CvArticleData = {
	role: string;
	place: string;
	timeRange: string;
	description: string;
	tags: Tech[];
};

export default [
	{
		role: 'Tech Lead (Backend)',
		place: 'WeBeet.io',
		timeRange: 'March 2024 – Present',
		description: `
    Architected and implemented CI/CD pipelines leveraging Jenkins, GitHub Actions, Kubernetes, Docker, 
    and AWS to dramatically enhance deployment efficiency. Developed automated testing frameworks 
    using Jest and Cypress and trained the team in Test-Driven Development practices to improve 
    code reliability and maintainability. Provided technical leadership and support, particularly 
    in backend domains such as authentication, system integration, and security, fostering a collaborative 
    and high-performing development environment.
  `,
		tags: [
			Tech.Typescript,
			Tech.NodeJS,
			Tech.Jenkins,
			Tech.GitHubActions,
			Tech.Kubernetes,
			Tech.Docker,
			Tech.AWS,
			Tech.Jest,
			Tech.Cypress,
			Tech.SQL
		]
	},
	{
		role: 'Full Stack Developer',
		place: 'NewOrg Latam',
		timeRange: 'January 2024 – Present',
		description: `
    Led development of SaaS projects alongside two partners, focusing on intuitive, high-performing 
    UIs and robust backend systems. Utilized Rust (Actix) and Go for the backend and React (Remix), 
    Svelte, and HTMX on the frontend. Prioritized SSR and the "backend for your frontend" architecture 
    to keep state synchronized with the UI. Deployed applications on Cloudflare Workers for fast, distributed 
    frontends, leveraging V8 isolates for efficient edge network performance. Additionally, completed freelance 
    projects with a similar technology stack.
  `,
		tags: [
			Tech.Typescript,
			Tech.Svelte,
			Tech.Remix,
			Tech.React,
			Tech.HTMX,
			Tech.Rust,
			Tech.ActixWeb,
			Tech.Go,
			Tech.PostgreSQL,
			Tech.SQLite,
			Tech.CloudflareWorkers
		]
	},
	{
		role: 'Network Engineering',
		place: 'ITQ - Ministry of Defense Affiliated Program, Israel',
		timeRange: 'March 2024 - August 2024',
		description: `
      I wanted to learn more and practice infrastructure so I spent 700 hours learning 
      hands-on about a bunch of network technologies like VLANs, BGP, OSPF, and
      IPsec. Worked with things like routing, switching, and network security 
      emulating networks with GNS3, docker containers and VM technologies.
    `,
		tags: [
			Tech.Ansible,
			Tech.Docker,
			Tech.CiscoIOS,
			Tech.RESTCONF,
			Tech.NETCONF,
			Tech.VLANs,
			Tech.OSPF,
			Tech.BGP,
			Tech.GRE,
			Tech.IPsec,
			Tech.LACP,
			Tech.GNS3
		]
	},
	{
		role: 'Senior Full Stack Developer, Team Lead',
		place: 'Israeli Defence Forces',
		timeRange: 'February 2022 – January 2024',
		description: `
      Opened a new department and led a new team that built two mobile 
      and web data driven apps from scratch - end to end. We worked 
      on migrating operations to digital format to increase productivity,
      ease supervision, and collect operational data. We would derive 
      insights and display them on dashboards to enable adoption of  
      data-driven decision making. The apps are being used in production 
      environments.
    `,
		tags: [
			Tech.Azure,
			Tech.Typescript,
			Tech.React,
			Tech.ReactNative,
			Tech.NodeJS,
			Tech.Express,
			Tech.Python,
			Tech.Pandas,
			Tech.D3,
			Tech.PowerPlatform
		]
	},
	{
		role: 'IT Department Team Lead',
		place: 'Israeli Defence Forces',
		timeRange: 'September 2021 – February 2022',
		description: `
      I was promoted to Team Lead within 6 months of starting my service. Managed a team of
      20 people responsible for a large network and server setup. 
      In my time there I planned and oversaw an overhaul of building wide network infrastructure
      and over 400 work stations, making things much more stable and faster - reducing 
      the need for the large staff requirements. By the time I moved to my new department and to date, 
      the IT team consisted of just seven personel (less than 50% of where we started) and we didn't 
      really have much to do. I'm really proud of that :).
    `,
		tags: [
			Tech.CiscoIOS,
			Tech.Linux,
			Tech.ActiveDirectory,
			Tech.Microsoft365,
			Tech.SharePoint,
			Tech.PowerPlatform,
			Tech.PowerShell
		]
	},
	{
		role: 'Software Engineering',
		place: 'Yandex Practicum / TripleTen',
		timeRange: '2021 - 2022',
		description: `
      Took a year-long course where I learned full-stack development, focusing 
      on building applications from front to back using modern web technologies.
    `,
		tags: [
			Tech.JavaScript,
			Tech.React,
			Tech.Svelte,
			Tech.PostgreSQL,
			Tech.MongoDB,
			Tech.Mongoose,
			Tech.Express,
			Tech.NodeJS
		]
	},
	{
		role: 'Network Administrator',
		place: 'Israeli Defence Forces',
		timeRange: 'March 2021 – August 2021',
		description: `
      Promoted to lead the team within six months. I automated several processes 
      to make our work smoother and built SharePoint pages to help teams communicate 
      and share information easily.
    `,
		tags: [
			Tech.CiscoIOS,
			Tech.Linux,
			Tech.SharePoint,
			Tech.ActiveDirectory,
			Tech.PowerPlatform,
			Tech.WindowsServer,
			Tech.PowerShell,
			Tech.Python
		]
	},
	{
		role: 'Database Management',
		place: 'Israeli Defense Forces',
		timeRange: '2021',
		description: `
      Learned how to analyze data and manage relational databases. I also 
      worked with SharePoint and picked up skills in presenting data visually
      with PowerBI.
    `,
		tags: [Tech.PostgreSQL, Tech.SharePoint, Tech.Dataverse, Tech.PowerPlatform]
	},
	{
		role: 'Network Administration',
		place: 'Israeli Defense Forces',
		timeRange: '2021',
		description: `
      Gained practical knowledge of networks, Windows Server, and Active Directory 
      while working in network administration.
    `,
		tags: [Tech.WindowsServer, Tech.ActiveDirectory, Tech.Linux]
	},
	{
		role: 'Mathematics, Physics',
		place: 'Technion',
		timeRange: '2019',
		description: `
      Took courses in Mathematics and Physics to build a solid foundation in 
      analytical thinking.
    `,
		tags: [Tech.Analysis, Tech.Mathematics, Tech.Physics]
	}
] satisfies CvArticleData[];

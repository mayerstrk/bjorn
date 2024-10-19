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
		role: 'SaaS Full Stack Developer',
		place: 'SaaS Applications and Freelance',
		timeRange: 'January 2024 – Present',
		description: `
      Worked on two SaaS projects with a couple of partners. We focus on making things 
      easy for users and developers, improving performance, and making sure the 
      apps work well across different platforms. I use React Remix, 
      Svelte, and HTMX to build fast, efficient UIs while keeping state simple and as synced as possible by using SSR with the backend for your frontend concept with workers running V8 isolates on edge networks. Handled backend development 
      with Actix and Go. Also completed some freelance gigs on the side.
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
			Tech.SQLite
		]
	},
	{
		role: 'Network Engineering',
		place: 'ITQ - Ministry of Defense Affiliated Program, Israel',
		timeRange: 'March 2024 - August 2024',
		description: `
      I wanted to learn more about infrastructure so I spent 700 hours learning 
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
      and web apps from scratch - end to end. We worked on moving and 
      organizing operations to a custom app interface we built which allows 
      collection of data to perform analysis and derive insights. We would 
      automate the creation of dashboards to promote data-driven decisions.
      The apps are being used in production environments.
    `,
		tags: [
			Tech.Azure,
			Tech.Typescript,
			Tech.React,
			Tech.ReactNative,
			Tech.Python,
			Tech.Pandas,
			Tech.D3
		]
	},
	{
		role: 'IT Department Team Lead',
		place: 'Israeli Defence Forces',
		timeRange: 'September 2021 – February 2022',
		description: `
      I was promoted to Team Lead within 6 months of starting my service. Managed a team of
      20 people responsible for a large network and server setup. 
      In my time there I planned and oversaw a building wide network infrastructure and 
       work stations, making things much more stable and faster for 
      over 400 devices - reducing the need for the large staff requirement. By the time I moved 
      to the new department, the team consisted of 7 and we didn't have much to do. I'm
      really proud of that :).
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

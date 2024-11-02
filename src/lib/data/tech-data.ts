import { Tech } from '$lib/utils/enums';
import Neovim from '$lib/components/tech-logos/neovim-logo.svg.svelte';
import Ansible from '$lib/components/tech-logos/ansible-logo.svg.svelte';
import PopOS from '$lib/components/tech-logos/pop-os-logo.svg.svelte';
import Linux from '$lib/components/tech-logos/linux-logo.svg.svelte';
import Typescript from '$lib/components/tech-logos/typescript-logo.svg.svelte';
import Go from '$lib/components/tech-logos/go-logo.svg.svelte';
import Rust from '$lib/components/tech-logos/rust-logo.svg.svelte';
import ActixWeb from '$lib/components/tech-logos/actix-logo.svg.svelte';
import NodeJS from '$lib/components/tech-logos/node-logo.svg.svelte';
import NestJS from '$lib/components/tech-logos/nest-logo.svg.svelte';
import Express from '$lib/components/tech-logos/express-logo.svg.svelte';
import PostgreSql from '$lib/components/tech-logos/postgresql-logo.svg.svelte';
import Sqlite from '$lib/components/tech-logos/sqlite-logo.svg.svelte';
import MongoDb from '$lib/components/tech-logos/mongodb-logo.svg.svelte';
import Htmx from '$lib/components/tech-logos/htmx-logo.svg.svelte';
import Tailwind from '$lib/components/tech-logos/tailwind-logo.svg.svelte';
import Svelte from '$lib/components/tech-logos/svelte-logo.svg.svelte';
import Remix from '$lib/components/tech-logos/remix-logo.svg.svelte';
import React from '$lib/components/tech-logos/react-logo.svg.svelte';
import ReactRouter from '$lib/components/tech-logos/react-router-logo.svg.svelte';
import Zustand from '$lib/components/tech-logos/zustand-logo.svg.svelte';
import Redux from '$lib/components/tech-logos/redux-logo.svg.svelte';
import Docker from '$lib/components/tech-logos/docker-logo.svg.svelte';
import Nginx from '$lib/components/tech-logos/nginx-logo.svg.svelte';

type TechData = { name: Tech; component: typeof Typescript };

const envTechs: TechData[] = [
	{ name: Tech.Neovim, component: Neovim },
	{ name: Tech.Linux, component: Linux },
	{ name: Tech.PopOs, component: PopOS }
];

const techs: TechData[] = [
	{ name: Tech.Typescript, component: Typescript },
	{ name: Tech.Go, component: Go },
	{ name: Tech.Rust, component: Rust },
	{ name: Tech.ActixWeb, component: ActixWeb },
	{ name: Tech.NodeJS, component: NodeJS },
	{ name: Tech.NestJS, component: NestJS },
	{ name: Tech.Express, component: Express },
	{ name: Tech.PostgreSQL, component: PostgreSql },
	{ name: Tech.SQLite, component: Sqlite },
	{ name: Tech.HTMX, component: Htmx },
	{ name: Tech.Tailwind, component: Tailwind },
	{ name: Tech.Remix, component: Remix },
	{ name: Tech.Svelte, component: Svelte },
	{ name: Tech.React, component: React },
	{ name: Tech.ReactRouter, component: ReactRouter },
	{ name: Tech.Zustand, component: Zustand },
	{ name: Tech.Redux, component: Redux },
	{ name: Tech.MongoDB, component: MongoDb },
	{ name: Tech.Ansible, component: Ansible },
	{ name: Tech.Docker, component: Docker },
	{ name: Tech.Nginx, component: Nginx }
];

export { envTechs, techs };

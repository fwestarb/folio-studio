import {defineConfig} from '@playwright/test';
import {existsSync} from 'node:fs';
const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
export default defineConfig({testDir:'tests',workers:1,reporter:'list',outputDir:'.playwright-output',use:{baseURL:'http://127.0.0.1:8821',viewport:{width:1440,height:1000},launchOptions:{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH||(existsSync(edge)?edge:undefined)}},webServer:{command:'npm run dev -- --port 8821',url:'http://127.0.0.1:8821',reuseExistingServer:true}});

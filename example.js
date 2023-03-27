// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {removeGreenkeeper} from './lib/index.js';

// remark-usage-ignore-next
stubbedFs({'README.md': '', node_modules: stubbedFs.load('node_modules')});

// #### Execute

await removeGreenkeeper({projectRoot: process.cwd()});

// remark-usage-ignore-next
stubbedFs.restore();

// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {removeGreenkeeper} from './lib/index.cjs';

// remark-usage-ignore-next
stubbedFs({'README.md': ''});

// #### Execute

removeGreenkeeper({projectRoot: process.cwd()});

// remark-usage-ignore-next
stubbedFs.restore();

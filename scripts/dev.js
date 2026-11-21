#!/usr/bin/env node
// Automatically configure 10MB HTTP header buffer to prevent HTTP 431 on large cookies
process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --max-http-header-size=10485760';

// Require Next.js CLI
require('next/dist/bin/next');

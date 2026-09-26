#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const ORIGIN='https://skillrhub.com';
const errors=[];
const warnings=[];
const mainstreamIndex='sitemap.xml';

function read(file){return fs.readFileSync(path.join(ROOT,file),'utf8');}
function exists(file){return fs.existsSync(path.join(ROOT,file));}
function locs(xml){return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(m=>m[1].trim());}
function canon(html){return html.match(/<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*href=["']([^"']+)["']/i)?.[1]?.trim()||'';}
function noindex(html){return /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);}
function title(html){return (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();}
function desc(html){return html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1]?.trim()||'';}
function norm(u){try{const x=new URL(u);let p=x.pathname.replace(/\/index\.html$/i,'/');return x.origin+p.replace(/\/{2,}/g,'/');}catch{return u;}}
function urlToFile(u){
  const x=new URL(u);
  let p=decodeURIComponent(x.pathname);
  if(p==='/') return 'index.html';
  p=p.replace(/^\//,'');
  if(p.endsWith('/')) return p+'index.html';
  if(path.extname(p)) return p;
  if(exists(p+'.html')) return p+'.html';
  if(exists(path.join(p,'index.html'))) return path.join(p,'index.html');
  return p;
}

if(!exists('robots.txt')) errors.push('robots.txt missing');
else{
  const robots=read('robots.txt');
  if(!/^\s*User-agent:\s*\*\s*$/im.test(robots)||!/^\s*Allow:\s*\/\s*$/im.test(robots)) errors.push('robots.txt must allow mainstream crawlers');
  if(!robots.includes('Sitemap: https://skillrhub.com/sitemap.xml')) errors.push('robots.txt missing canonical sitemap declaration');
  if(/^\s*Disallow:\s*\/\s*$/im.test(robots)) errors.push('robots.txt contains a global Disallow: /');
}

if(exists('_headers')&&/\/\*[\s\S]*X-Robots-Tag:\s*[^\n]*(?:noindex|nofollow)/i.test(read('_headers'))) errors.push('global X-Robots-Tag block detected in _headers');

if(!exists(mainstreamIndex)) errors.push('sitemap.xml missing');

const childMaps=[];
if(exists(mainstreamIndex)){
  const rootMap=read(mainstreamIndex);
  for(const u of locs(rootMap)){
    const x=new URL(u);
    if(x.origin!==ORIGIN) errors.push('external sitemap in root index: '+u);
    const f=x.pathname.replace(/^\//,'');
    if(!exists(f)) errors.push('sitemap index references missing file: '+f);
    else childMaps.push(f);
  }
}

const seenUrls=new Map();
const canonicalOwners=new Map();
let pageCount=0;

for(const map of childMaps){
  for(const u of locs(read(map))){
    if(!u.startsWith(ORIGIN+'/')){errors.push(`${map}: external URL ${u}`);continue;}
    const n=norm(u);
    if(seenUrls.has(n)) errors.push(`duplicate sitemap URL: ${n} in ${seenUrls.get(n)} and ${map}`);
    else seenUrls.set(n,map);

    const file=urlToFile(u);
    if(!exists(file)){errors.push(`${map}: URL target missing for ${u} -> ${file}`);continue;}
    if(!/\.html?$/i.test(file)) continue;

    pageCount++;
    const html=read(file);
    if(noindex(html)) errors.push(`${file}: sitemap page is noindex`);
    const ca=canon(html);
    if(!ca) errors.push(`${file}: sitemap page missing canonical`);
    else{
      if(!ca.startsWith(ORIGIN+'/')&&ca!==ORIGIN+'/') errors.push(`${file}: canonical outside skillrhub.com -> ${ca}`);
      if(norm(ca)!==norm(u)) errors.push(`${file}: canonical does not match sitemap URL -> ${ca} vs ${u}`);
      const cn=norm(ca);
      if(canonicalOwners.has(cn)&&canonicalOwners.get(cn)!==file) errors.push(`duplicate canonical ${cn}: ${canonicalOwners.get(cn)} and ${file}`);
      else canonicalOwners.set(cn,file);
    }
    if(!title(html)) errors.push(`${file}: missing title`);
    if(!desc(html)) warnings.push(`${file}: missing meta description`);

    const m=file.match(/^(foundation|year(?:[1-9]|10))\/(maths|science|english)\/(ac9[a-z0-9]+)\/index\.html$/i);
    if(m){
      const code=m[3].toUpperCase();
      if(!html.toUpperCase().includes(code)) errors.push(`${file}: curriculum code ${code} not found in page HTML`);
    }
  }
}

const home=read('index.html');
if(noindex(home)) errors.push('homepage is noindex');
if(norm(canon(home))!==ORIGIN+'/') errors.push('homepage canonical must be https://skillrhub.com/');

console.log(`Search/AI integrity audit: sitemapPages=${pageCount} childSitemaps=${childMaps.length} errors=${errors.length} warnings=${warnings.length}`);
for(const e of errors.slice(0,300)) console.error('- '+e);
if(errors.length>300) console.error(`... ${errors.length-300} more errors`);
for(const w of warnings.slice(0,100)) console.warn('WARN: '+w);
if(warnings.length>100) console.warn(`... ${warnings.length-100} more warnings`);
if(errors.length) process.exit(1);

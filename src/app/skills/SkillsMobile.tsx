'use client';

import { useEffect, useRef } from 'react';
import styles from './SkillsMobile.module.css';

type Side = 'left' | 'right';

interface SkillNode {
  name: string;
  kids: (string | SkillNode)[];
}

interface Category {
  name: string;
  color: string;
  dark: string;
  side: Side | 'both';
  nodes?: SkillNode[];
  leftNodes?: SkillNode[];
  rightNodes?: SkillNode[];
}

const CATS: Category[] = [
  { name: 'Front-End', color: '#1D9E75', dark: '#04342C', side: 'both',
    leftNodes: [
      { name: 'Mobile',  kids: [{ name: 'Xamarin', kids: [] }, { name: 'Flutter', kids: [] }]},
      { name: 'Desktop', kids: [{ name: 'WPF', kids: [] }, { name: 'Win Forms', kids: [] }]},
    ],
    rightNodes: [
      { name: 'Web', kids: [
          { name: 'React.js', kids: [] },
          { name: 'Angular', kids: [] },
          { name: 'Angular.js', kids: [] },
          { name: 'ASP.NET', kids: [] },
        ]},
    ],
  },
  { name: 'Back-End', color: '#5cb50e', dark: '#0e2003', side: 'right', nodes: [
      { name: 'Node.js', kids: [] },
      { name: 'Spring Boot', kids: [] },
      { name: 'Express', kids: [] },
  ]},
  { name: 'AI Integration', color: '#a855f7', dark: '#1a0133', side: 'left', nodes: [
      { name: 'Claude', kids: [] },
      { name: 'ChatGPT', kids: [] },
      { name: 'Gemini', kids: [] },
      { name: 'MCP', kids: [] },
  ]},
  { name: 'Data', color: '#f8cc1b', dark: '#2a2100', side: 'right', nodes: [
      { name: 'MS-SQL', kids: [] },
      { name: 'Oracle-SQL', kids: [] },
      { name: 'MongoDB', kids: [] },
      { name: 'Firestore', kids: [] },
  ]},
  { name: 'Cloud', color: '#1982c4', dark: '#021525', side: 'left', nodes: [
      { name: 'Azure', kids: [] },
      { name: 'AWS', kids: [] },
      { name: 'Firebase', kids: [] },
      { name: 'Docker', kids: [] },
      { name: 'Jenkins', kids: [] },
  ]},
  { name: 'Tools', color: '#fb6f92', dark: '#25010f', side: 'right', nodes: [
      { name: 'Jira', kids: [] },
      { name: 'VS Code', kids: [] },
      { name: 'Vis. Studio', kids: [] },
      { name: 'Sourcetree', kids: [] },
      { name: 'Git', kids: [] },
  ]},
  { name: 'Languages', color: '#c20c51', dark: '#20010d', side: 'left', nodes: [
      { name: 'JavaScript', kids: [] },
      { name: 'TypeScript', kids: [] },
      { name: 'Java', kids: [] },
      { name: 'C#', kids: [] },
      { name: 'Dart', kids: [] },
  ]},
];

const SVG_W = 390;
const SPINE_X = SVG_W / 2;
const CB_W = 64, CB_H = 36;
const COL_W = [78, 68, 52];
const PILL_H = [23, 21, 19];
const PILL_RX = [13, 11, 10];
const COL_GAP = 8, ROW_GAP = 5, CAT_GAP = 16;

function hexRgb(hex: string): [number,number,number] {
  return [parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)];
}
function rgba(hex: string, a: number): string {
  const [r,g,b] = hexRgb(hex); return `rgba(${r},${g},${b},${a})`;
}
function darken(hex: string, amount: number): string {
  const [r,g,b] = hexRgb(hex);
  return `rgb(${Math.max(0,r-amount)},${Math.max(0,g-amount)},${Math.max(0,b-amount)})`;
}
interface PS { fill:string; stroke:string|null; sw:number; tf:string; fs:number; fw:number; }
function pillStyle(depth: number, color: string, isDark: boolean): PS {
  const tf = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.75)';
  if (isDark) {
    if (depth === 0) return { fill: rgba(color, 0.2), stroke: rgba(color, 0.6), sw: 0.9, tf, fs: 11, fw: 700 };
    if (depth === 1) return { fill: rgba(color, 0.12), stroke: rgba(color, 0.5), sw: 0.9, tf, fs: 10.5, fw: 600 };
    return { fill: 'none', stroke: rgba(color, 0.4), sw: 0.9, tf, fs: 10, fw: 500 };
  } else {
    if (depth === 0) return { fill: rgba(color, 0.35), stroke: rgba(color, 1), sw: 1.5, tf, fs: 11, fw: 700 };
    if (depth === 1) return { fill: rgba(color, 0.25), stroke: rgba(color, 0.9), sw: 1.5, tf, fs: 10.5, fw: 600 };
    return { fill: rgba(color, 0.15), stroke: rgba(color, 0.8), sw: 1.5, tf, fs: 10, fw: 500 };
  }
}

function getColX(side: Side, depth: number): number {
  const base = side==='left' ? SPINE_X-CB_W/2 : SPINE_X+CB_W/2;
  let offset = COL_GAP;
  for (let d=0;d<depth;d++) offset+=COL_W[d]+COL_GAP;
  return side==='left' ? base-offset-COL_W[depth] : base+offset;
}

function nodeBlockH(node: string|SkillNode, depth=0): number {
  const n = typeof node==='string' ? {name:node,kids:[]} : node;
  if (!n.kids||n.kids.length===0) return PILL_H[Math.min(depth,PILL_H.length-1)];
  let kH=0;
  n.kids.forEach((k,i)=>{ kH+=nodeBlockH(k,depth+1); if(i<n.kids.length-1) kH+=ROW_GAP; });
  return Math.max(kH,PILL_H[Math.min(depth,PILL_H.length-1)]);
}

function catBlockH(cat: Category): number {
  if (cat.side==='both') {
    const lH=(cat.leftNodes||[]).reduce((h,n,i)=>h+nodeBlockH(n,0)+(i<(cat.leftNodes||[]).length-1?ROW_GAP:0),0);
    const rH=(cat.rightNodes||[]).reduce((h,n,i)=>h+nodeBlockH(n,0)+(i<(cat.rightNodes||[]).length-1?ROW_GAP:0),0);
    return Math.max(lH,rH,CB_H);
  }
  let h=0;
  (cat.nodes||[]).forEach((n,i)=>{ h+=nodeBlockH(n,0); if(i<(cat.nodes||[]).length-1) h+=ROW_GAP; });
  return Math.max(h,CB_H);
}

function bez(x1:number,y1:number,x2:number,y2:number,color:string,op:number,sw=1): string {
  const mx=(x1+x2)/2;
  return `<path d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}" fill="none" stroke="${color}" stroke-width="${sw}" opacity="${op}"/>`;
}

function drawPill(x:number,y:number,w:number,h:number,rx:number,st:PS,text:string): string {
  let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${st.fill}"`;
  if(st.stroke) s+=` stroke="${st.stroke}" stroke-width="${st.sw}"`;
  s+=`/><text x="${x+w/2}" y="${y+h/2+0.5}" text-anchor="middle" dominant-baseline="middle" fill="${st.tf}" font-size="${st.fs}" font-weight="${st.fw}" font-family="-apple-system,sans-serif">${text}</text>`;
  return s;
}

interface NR { s:string; outerX:number; innerX:number; centerY:number; }
function drawNode(node:string|SkillNode, depth:number, startY:number, side:Side, color:string, isDark:boolean): NR {
  const n = typeof node==='string' ? {name:node,kids:[]} : node;
  const bH=nodeBlockH(n,depth), nCY=startY+bH/2;
  const d=Math.min(depth,COL_W.length-1);
  const w=COL_W[d],h=PILL_H[d],rx=PILL_RX[d];
  const x=getColX(side,depth), y=nCY-h/2;
  const st=pillStyle(depth,color,isDark);
  let s=drawPill(x,y,w,h,rx,st,n.name);
  const outerX=side==='left'?x+w:x;
  const innerX=side==='left'?x:x+w;
  const kids=n.kids||[];
  if(kids.length>0) {
    const connColor = isDark ? color : darken(color, 80);
    const connOpacity = isDark ? 0.3 : 0.9;
    let kidY=startY;
    kids.forEach(kid=>{
      const kbH=nodeBlockH(kid,depth+1);
      const {s:ks,outerX:kOX,centerY:kCY}=drawNode(kid,depth+1,kidY,side,color,isDark);
      s+=ks;
      s+=bez(innerX,nCY,kOX,kCY,connColor,connOpacity,depth===0?1:0.8);
      kidY+=kbH+ROW_GAP;
    });
  }
  return {s,outerX,innerX,centerY:nCY};
}

function buildSVG(isDark: boolean): {markup:string; totalH:number} {
  let totalH=20;
  const layouts=CATS.map(cat=>{ const h=catBlockH(cat); const r={cat,y:totalH,h}; totalH+=h+CAT_GAP; return r; });
  totalH+=20;
  let out=`<line x1="${SPINE_X}" y1="0" x2="${SPINE_X}" y2="${totalH}" stroke="rgba(128,128,128,${isDark ? 0.25 : 0.4})" stroke-width="2"/>`;
  layouts.forEach(({cat,y,h})=>{
    const {color,dark,side}=cat;
    const cbY=y+h/2-CB_H/2, cbCY=cbY+CB_H/2;
    const catEdgeX=side==='left'?SPINE_X-CB_W/2:SPINE_X+CB_W/2;
    out+=`<circle cx="${SPINE_X}" cy="${cbCY}" r="4" fill="${color}" opacity="0.6"/>`;
    out+=`<rect x="${SPINE_X-CB_W/2}" y="${cbY}" width="${CB_W}" height="${CB_H}" rx="5" fill="${color}"/>`;
    const words=cat.name.split(' '), half=Math.ceil(words.length/2);
    const lines=cat.name.length>9&&words.length>1?[words.slice(0,half).join(' '),words.slice(half).join(' ')]:[cat.name];
    if(lines.length===1) {
      out+=`<text x="${SPINE_X}" y="${cbCY+0.5}" text-anchor="middle" dominant-baseline="middle" fill="${dark}" font-size="10" font-weight="800" font-family="-apple-system,sans-serif">${lines[0]}</text>`;
    } else {
      out+=`<text x="${SPINE_X}" y="${cbCY-4.5}" text-anchor="middle" dominant-baseline="middle" fill="${dark}" font-size="9" font-weight="800" font-family="-apple-system,sans-serif">${lines[0]}</text>`;
      out+=`<text x="${SPINE_X}" y="${cbCY+4.5}" text-anchor="middle" dominant-baseline="middle" fill="${dark}" font-size="9" font-weight="800" font-family="-apple-system,sans-serif">${lines[1]}</text>`;
    }
    if(cat.side==='both') {
      const lNodes=cat.leftNodes||[], rNodes=cat.rightNodes||[];
      const lH=lNodes.reduce((acc,n,i)=>acc+nodeBlockH(n,0)+(i<lNodes.length-1?ROW_GAP:0),0);
      const rH=rNodes.reduce((acc,n,i)=>acc+nodeBlockH(n,0)+(i<rNodes.length-1?ROW_GAP:0),0);
      const connColor = isDark ? color : darken(color, 80);
      const connOpacity = isDark ? 0.3 : 0.9;
      let nodeY=y+h/2-lH/2;
      lNodes.forEach(node=>{ const bH=nodeBlockH(node,0); const {s,outerX,centerY}=drawNode(node,0,nodeY,'left',color,isDark); out+=s; out+=bez(outerX,centerY,SPINE_X-CB_W/2,cbCY,connColor,connOpacity,1.2); nodeY+=bH+ROW_GAP; });
      nodeY=y+h/2-rH/2;
      rNodes.forEach(node=>{ const bH=nodeBlockH(node,0); const {s,outerX,centerY}=drawNode(node,0,nodeY,'right',color,isDark); out+=s; out+=bez(outerX,centerY,SPINE_X+CB_W/2,cbCY,connColor,connOpacity,1.2); nodeY+=bH+ROW_GAP; });
    } else {
      const connColor = isDark ? color : darken(color, 80);
      const connOpacity = isDark ? 0.3 : 0.9;
      let nodeY=y;
      (cat.nodes||[]).forEach(node=>{ const bH=nodeBlockH(node,0); const {s,outerX,centerY}=drawNode(node,0,nodeY,side as Side,color,isDark); out+=s; out+=bez(outerX,centerY,catEdgeX,cbCY,connColor,connOpacity,1.2); nodeY+=bH+ROW_GAP; });
    }
  });
  return {markup:out,totalH};
}

export default function SkillsMobile() {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    function render() {
      if (!svgRef.current) return;
      const isDark = document.documentElement.getAttribute('color-scheme') === 'dark';
      const { markup, totalH } = buildSVG(isDark);
      svgRef.current.setAttribute('viewBox', `0 0 ${SVG_W} ${totalH}`);
      svgRef.current.setAttribute('height', String(totalH));
      svgRef.current.innerHTML = `<g class="${styles.animate}">${markup}</g>`;
    }
    render();
    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['color-scheme'] });
    return () => observer.disconnect();
  }, []);
  return (
    <div className={styles.root}>
      <p className={styles.title}>Skills &amp; Technologies</p>
      <svg ref={svgRef} className={styles.svg} width="100%" preserveAspectRatio="xMidYMid meet" />
    </div>
  );
}

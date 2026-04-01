'use client';

import { useEffect, useRef } from 'react';
import { Selection, select, zoom } from 'd3';
import './skills-big.scss';

// ── Types ─────────────────────────────────────────────────────────────────────

type Side = 'left' | 'right';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GSelection = Selection<SVGGElement, unknown, any, unknown>;

interface SkillNode {
  name: string;
  color?: string;
  weight?: number;
  children?: SkillNode[];
  // populated by layout phase
  _y?: number;
  _blockY?: number;
  _blockH?: number;
  _leafRows?: number;
  _side?: Side;
}

interface PillDef { w: number; h: number; rx: number; fs: number; fw: number; }

// ── Data ──────────────────────────────────────────────────────────────────────

const RIGHT: SkillNode[] = [
  { name: 'Front-End', color: '#1D9E75', weight: 1, children: [
      { name: 'Web', children: [
          { name: 'React.js', weight: 2, children: [
              { name: 'Next.js', weight: 2 }, { name: 'Redux' },
            ]},
          { name: 'Angular' },
          { name: 'Angular.js' }, { name: 'ASP.NET' },
        ]},
      { name: 'Mobile', children: [
          { name: 'Xamarin Forms' }, { name: 'Flutter' },
        ]},
      { name: 'Desktop', children: [
          { name: 'WPF' }, { name: 'Windows Forms' },
        ]},
    ]},
  { name: 'Back-End', color: '#5cb50e', weight: 1, children: [
      { name: 'Spring Boot', weight: 2 }, { name: 'Node', weight: 2 }, { name: 'Express' },
    ]},
  { name: 'Data', color: '#f8cc1b', weight: 1, children: [
      { name: 'MS-SQL' }, { name: 'Oracle-SQL' },
      { name: 'MongoDB', weight: 2 }, { name: 'Firestore' },
    ]},
];

const LEFT: SkillNode[] = [
  { name: 'Cloud', color: '#1982c4', weight: 1, children: [
      { name: 'Azure' }, { name: 'AWS', weight: 2 },
      { name: 'Firebase' }, { name: 'Docker', weight: 2 }, { name: 'Jenkins' },
    ]},
  { name: 'AI Integration', color: '#a855f7', weight: 2, children: [
      { name: 'Claude', weight: 2 }, { name: 'ChatGPT', weight: 2 },
      { name: 'Gemini' }, { name: 'MCP' },
    ]},
  { name: 'Languages', color: '#c20c51', weight: 1, children: [
      { name: 'JavaScript', weight: 2 }, { name: 'TypeScript', weight: 2 },
      { name: 'Java' }, { name: 'C#' },
    ]},
  { name: "IDE's & Tools", color: '#fb6f92', weight: 1, children: [
      { name: 'Jira' }, { name: 'VS Code', weight: 2 },
      { name: 'Git', weight: 2 },
    ]},
];

// ── Layout constants ──────────────────────────────────────────────────────────

const CAT_X = 185, SUB_X = 360, LEAF_X = 525, LEAF2_X = 660;

const PILL: Record<string, PillDef> = {
  root:  { w: 80,  h: 30, rx: 6,  fs: 12, fw: 700 },
  cat:   { w: 130, h: 30, rx: 6,  fs: 12, fw: 700 },
  sub:   { w: 120, h: 26, rx: 11, fs: 12, fw: 600 },
  leaf:  { w: 120, h: 24, rx: 10, fs: 12, fw: 600 },
  leaf2: { w: 90,  h: 22, rx: 9,  fs: 12, fw: 600 },
};

const ROW_GAP = 8, CAT_GAP = 20;

// ── Layout helpers ────────────────────────────────────────────────────────────

function countRows(node: SkillNode): number {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((s, c) => s + countRows(c), 0);
}

function layoutSide(categories: SkillNode[]): SkillNode[] {
  categories.forEach(cat => {
    let leafRows = 0;
    if (cat.children && cat.children.length > 0) {
      cat.children.forEach(sub => { leafRows += countRows(sub); });
    } else {
      leafRows = 1;
    }
    cat._leafRows = leafRows;
  });

  let y = 0;
  categories.forEach(cat => {
    const blockH = (cat._leafRows ?? 1) * (PILL.leaf.h + ROW_GAP);
    cat._y = y + blockH / 2;
    cat._blockH = blockH;
    cat._blockY = y;
    y += blockH + CAT_GAP;
  });

  const totalH = y - CAT_GAP;
  categories.forEach(cat => {
    cat._y = (cat._y ?? 0) - totalH / 2;
    cat._blockY = (cat._blockY ?? 0) - totalH / 2;
  });

  return categories;
}

function assignChildren(cat: SkillNode, side: Side): void {
  if (!cat.children || cat.children.length === 0) return;
  let leafY = cat._blockY ?? 0;

  cat.children.forEach(sub => {
    let subRows = 0;
    if (sub.children && sub.children.length > 0) {
      sub.children.forEach(leaf => {
        subRows += Math.max(1, leaf.children ? leaf.children.length : 0);
      });
    } else {
      subRows = 1;
    }
    const subH = subRows * (PILL.leaf.h + ROW_GAP) - ROW_GAP;
    sub._y = leafY + subH / 2;
    sub._blockY = leafY;
    sub._blockH = subH;
    sub._side = side;

    if (sub.children && sub.children.length > 0) {
      let curY = leafY;
      sub.children.forEach(leaf => {
        const leaf2Count = leaf.children && leaf.children.length > 0 ? leaf.children.length : 0;
        const leafRows = Math.max(1, leaf2Count);
        const leafBlockH = leafRows * (PILL.leaf.h + ROW_GAP) - ROW_GAP;
        leaf._y = curY + leafBlockH / 2;
        leaf._blockY = curY;
        leaf._blockH = leafBlockH;
        leaf._side = side;

        if (leaf.children && leaf.children.length > 0) {
          leaf.children.forEach((leaf2, li) => {
            leaf2._y = curY + li * (PILL.leaf.h + ROW_GAP) + PILL.leaf.h / 2;
            leaf2._side = side;
          });
        }
        curY += leafBlockH + ROW_GAP;
      });
    }
    leafY += subH + ROW_GAP;
  });

  cat._side = side;
}

// ── Layout computed once at module load ───────────────────────────────────────

const rightNodes = layoutSide(RIGHT);
const leftNodes  = layoutSide(LEFT);
rightNodes.forEach(cat => assignChildren(cat, 'right'));
leftNodes.forEach(cat  => assignChildren(cat, 'left'));

// ── Draw helpers ──────────────────────────────────────────────────────────────

function hexRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function rgba(hex: string, a: number): string {
  const [r, g, b] = hexRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

function isDarkColor(hex: string): boolean {
  const [r, g, b] = hexRgb(hex);
  return 0.299 * r + 0.587 * g + 0.114 * b < 155;
}

function bez(x1: number, y1: number, x2: number, y2: number): string {
  const cp1x = x1 + (x2 - x1) * 0.4;
  const cp2x = x1 + (x2 - x1) * 0.6;
  return `M${x1},${y1} C${cp1x},${y1} ${cp2x},${y2} ${x2},${y2}`;
}

function drawPill(
  sel: GSelection,
  x: number, y: number,
  sz: PillDef,
  fill: string,
  stroke: string | null,
  sw: number,
  tf: string,
  text: string,
  weight?: number,
): void {
  const fw = weight === 2 ? Math.min(sz.fw + 100, 700) : sz.fw;

  sel.append('rect')
    .attr('x', x - sz.w / 2).attr('y', y - sz.h / 2)
    .attr('width', sz.w).attr('height', sz.h).attr('rx', sz.rx)
    .attr('fill', fill)
    .attr('stroke', stroke ?? 'none')
    .attr('stroke-width', sw);

  sel.append('text')
    .attr('x', x).attr('y', y)
    .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
    .attr('fill', tf)
    .attr('font-size', sz.fs)
    .attr('font-weight', fw)
    .attr('font-family', '-apple-system, sans-serif')
    .text(text);
}

// ── Render ────────────────────────────────────────────────────────────────────

function renderChart(g: GSelection, isDark: boolean): void {
  const accentRaw = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const [h, s, l] = accentRaw.split(' ');
  const rootFill   = `hsla(${h}, ${s}, ${l}, 0.2)`;
  const rootStroke = `hsla(${h}, ${s}, ${l}, 0.7)`;
  const rootTf     = `hsla(${h}, ${s}, ${l}, 1)`;
  const tf0 = isDark ? 'rgba(255,255,255,0.9)'  : 'rgba(0,0,0,0.75)';
  const tf1 = isDark ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.65)';
  const OP  = { cat: isDark ? 0.4 : 0.7, sub: isDark ? 0.28 : 0.55, leaf: isDark ? 0.2 : 0.4 };
  const SW = 1.5;

  g.selectAll('*').remove();

  function renderSide(categories: SkillNode[], side: Side): void {
    const sign   = side === 'right' ? 1 : -1;
    const catX   = sign * CAT_X;
    const subX   = sign * SUB_X;
    const leafX  = sign * LEAF_X;
    const leaf2X = sign * LEAF2_X;

    categories.forEach(cat => {
      const color = cat.color!;
      const catY  = cat._y!;
      const catW = PILL.cat.w;

      g.append('path').attr('fill', 'none')
        .attr('stroke', rgba(color, OP.cat))
        .attr('stroke-width', SW)
        .attr('d', bez(sign * PILL.root.w / 2, 0, catX - sign * catW / 2, catY));

      const catTf = isDark ? '#fff' : (isDarkColor(color) ? '#fff' : '#1a1a1a');
      drawPill(g, catX, catY, PILL.cat, color, null, 0, catTf, cat.name, cat.weight);

      if (!cat.children || cat.children.length === 0) return;

      cat.children.forEach(sub => {
        const subY = sub._y!;

        g.append('path').attr('fill', 'none')
          .attr('stroke', rgba(color, OP.sub))
          .attr('stroke-width', SW)
          .attr('d', bez(catX + sign * catW / 2, catY, subX - sign * PILL.sub.w / 2, subY));

        drawPill(g, subX, subY, PILL.sub,
          rgba(color, isDark ? 0.18 : 0.15),
          rgba(color, isDark ? 0.55 : 0.85),
          isDark ? 0.9 : 1.3, tf0, sub.name, sub.weight);

        if (!sub.children || sub.children.length === 0) return;

        sub.children.forEach(leaf => {
          const leafY = leaf._y!;
          const leafW = PILL.leaf.w;

          g.append('path').attr('fill', 'none')
            .attr('stroke', rgba(color, OP.leaf))
            .attr('stroke-width', SW)
            .attr('d', bez(subX + sign * PILL.sub.w / 2, subY, leafX - sign * leafW / 2, leafY));

          drawPill(g, leafX, leafY, PILL.leaf,
            rgba(color, isDark ? 0.08 : 0.12),
            rgba(color, isDark ? 0.35 : 0.7),
            isDark ? 0.8 : 1.2, tf0, leaf.name, leaf.weight);

          if (leaf.children && leaf.children.length > 0) {
            leaf.children.forEach(leaf2 => {
              const leaf2Y = leaf2._y!;

              g.append('path').attr('fill', 'none')
                .attr('stroke', rgba(color, isDark ? 0.25 : 0.45))
                .attr('stroke-width', SW)
                .attr('d', bez(leafX + sign * leafW / 2, leafY, leaf2X - sign * PILL.leaf2.w / 2, leaf2Y));

              drawPill(g, leaf2X, leaf2Y, PILL.leaf2,
                rgba(color, isDark ? 0.12 : 0.1),
                rgba(color, isDark ? 0.5 : 0.65),
                isDark ? 0.9 : 1.2, tf1, leaf2.name, leaf2.weight);
            });
          }
        });
      });
    });
  }

  renderSide(rightNodes, 'right');
  renderSide(leftNodes, 'left');
  drawPill(g, 0, 0, PILL.root, rootFill, rootStroke, 1, rootTf, 'Skills', 1);
}

// ── Component ─────────────────────────────────────────────────────────────────

const SkillsBig = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function render() {
      const el = containerRef.current;
      if (!el || el.clientWidth === 0) return;

      const W = el.clientWidth;
      const H = window.innerHeight - 80;
      const isDark = document.documentElement.getAttribute('color-scheme') === 'dark';

      select(el).selectAll('svg').remove();

      const svg = select(el)
        .append('svg')
        .attr('width', W)
        .attr('height', H)
        .style('display', 'block');

      const zoomG = svg.append('g');

      svg.call(
        zoom<SVGSVGElement, unknown>().on('zoom', (e) => {
          zoomG.attr('transform', e.transform);
        }),
      );

      const g = zoomG
        .append('g')
        .attr('transform', `translate(${W / 2},${H / 2})`);

      renderChart(g, isDark);
    }

    setTimeout(render, 100);

    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['color-scheme', 'style'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="skills-big-wrapper" ref={containerRef}>
      <span className="skills-big-hint">scroll to zoom · drag to pan</span>
    </div>
  );
};

export default SkillsBig;

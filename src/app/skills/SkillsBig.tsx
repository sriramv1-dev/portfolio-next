'use client';

import { useEffect, useRef } from 'react';
import { hierarchy, select, tree, zoom } from 'd3';
import { skillsData } from '@/lib/data';
import { displayName, getRectColor, getPathColor, getTextColor } from '@/lib/utils';
import './skills-big.scss';

const SkillsBig = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = chartRef.current;
    if (!element) return;

    // Clear any previously rendered SVG before re-drawing
    select(element).selectAll('svg').remove();

    const width = 0.9 * document.body.clientWidth;
    const height = 800;
    const margin = { top: 25, right: 100, bottom: 25, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const treeLayout = tree().size([innerHeight, innerWidth]);
    const svg = select(element).append('svg');

    const zoomG = svg.attr('width', width).attr('height', height).append('g');

    const g = zoomG
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.call(
      zoom<SVGSVGElement, unknown>().on('zoom', (e) => {
        zoomG.attr('transform', e.transform);
      })
    );

    const root = hierarchy(skillsData as unknown);
    const paths = treeLayout(root as Parameters<typeof treeLayout>[0]).links();

    g.selectAll('path')
      .data(paths)
      .enter()
      .append('path')
      .attr('stroke-width', 1)
      .attr('stroke', (d) => getPathColor(d as never) ?? null)
      .attr('d', (d) =>
        (d?.target?.data as { name?: string })?.name?.length ?? 0 > 0
          ? `M${d.source.y + (displayName(d.source.data as never).length + 3) * 7.75},${d.source.x}
        C ${(d.source.y + d.target.y) / 2},${d.source.x}
          ${(d.source.y + d.target.y) / 2},${d.target.x}
          ${d.target.y},${d.target.x}`
          : null
      );

    g.selectAll('rect')
      .data(root.descendants())
      .enter()
      .append('rect')
      .attr('class', 'rect')
      .attr('transform', (d) => `translate(${d.y}, ${d.x})`)
      .attr('width', (d) => 10 + (displayName(d.data as never).length + 4) * 6.5)
      .attr('stroke', (d) => getRectColor(d as never) ?? null)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('y', () => -16);

    g.selectAll('circle')
      .data(root.descendants())
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('transform', (d) => `translate(${d.y}, ${d.x})`)
      .attr('r', (d) => (d?.parent ? 4 : 0))
      .attr('fill', (d) => getRectColor(d as never) ?? null)
      .attr('stroke', (d) => getRectColor(d as never) ?? null);

    g.selectAll('text')
      .data(root.descendants())
      .enter()
      .append('text')
      .attr('x', (d) => (d.y ?? 0) + displayName(d.data as never).length)
      .attr('y', (d) => d.x ?? 0)
      .attr('dy', '0.32em')
      .attr('fill', (d) => getTextColor(d as never) ?? null)
      .text(({ data }) => displayName(data as never));
  }, []);

  return (
    <div className="container skills-page">
      <div id="skills-chart" ref={chartRef}></div>
    </div>
  );
};

export default SkillsBig;

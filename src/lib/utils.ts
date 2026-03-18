const TEXT_COLOR = 'hsl(var(--txt))';

type D3Node = {
  data: { name: string; code?: string | string[]; hslColor?: string; children?: unknown[] };
  parent?: { data: { hslColor?: string } };
};

type D3Link = {
  source: D3Node & { y: number; x: number };
  target: D3Node & { y: number; x: number };
};

export const displayName = (data: { name: string; code?: string | string[] }) =>
  `${data.name}  ${data?.code ? '-' + data?.code?.toString() : ''}`;

export const getRectColor = (d: D3Node) =>
  d?.data?.children ? d?.data?.hslColor : 'none';

export const getPathColor = (d: D3Link) =>
  d?.target?.data?.children ? d?.target?.data?.hslColor : TEXT_COLOR;

export const getTextColor = (d: D3Node) => {
  if (d?.data?.hslColor) return d?.data?.hslColor;
  if (d.parent?.data?.hslColor) return d.parent?.data?.hslColor;
  return TEXT_COLOR;
};

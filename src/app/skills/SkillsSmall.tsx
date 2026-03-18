'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DynamicIcon from '@/components/DynamicIcon';
import { skillsData } from '@/lib/data';
import './skills-small.scss';

const DEFAULT_COLOR = 'hsl(var(--txt))';
const DEFAULT_ICON = 'IoExtensionPuzzleOutline';

type SkillNode = {
  name: string;
  hslColor?: string;
  icon?: string;
  children?: SkillNode[];
};

const SimpleLine = ({ color }: { color: string }) => (
  <svg height="10" width="35">
    <line x1="0" y1="0" x2="30" y2="0" stroke={color} strokeWidth="3" />
  </svg>
);

const Tree = ({ data = [], parentColor }: { data: SkillNode[]; parentColor: string }) => (
  <div className="d-tree">
    <ul>
      {data.map((tree) => (
        <TreeNode key={uuidv4()} node={tree} parentColor={parentColor} />
      ))}
    </ul>
  </div>
);

const TreeNode = ({
  node: { name, hslColor = DEFAULT_COLOR, icon = DEFAULT_ICON, children },
  parentColor = DEFAULT_COLOR,
}: {
  node: SkillNode;
  parentColor?: string;
}) => {
  const [childrenVisible, setChildrenVisible] = useState(true);
  const thisColor = hslColor === DEFAULT_COLOR ? parentColor : hslColor;
  const border = `1px solid ${thisColor}`;

  const handleClick = () => setChildrenVisible((v) => !v);

  return name !== '' ? (
    <li
      className="d-tree-node"
      style={{
        ...(!children && {
          border,
          borderRadius: '5px',
          padding: '.5rem 1rem 0.5rem 2rem',
        }),
        ...(children && {
          borderLeft: border,
          padding: '0.75rem 1rem',
        }),
        color: hslColor,
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center' }}
        onClick={children ? handleClick : undefined}
      >
        <span
          className={`d-tree-toggler ${childrenVisible && 'active'}`}
          style={{ paddingRight: '10px' }}
        >
          {children && <SimpleLine color={thisColor} />}
          <span style={{ color: thisColor, marginLeft: '15px' }}>
            <DynamicIcon name={icon} />
          </span>
        </span>
        <span style={{ paddingBottom: '10px' }}>{name}</span>
      </div>

      {children && childrenVisible && (
        <div className="d-tree-content">
          <ul className="d-tree-container">
            <Tree data={children} parentColor={hslColor} />
          </ul>
        </div>
      )}
    </li>
  ) : null;
};

const SkillsSmall = () => (
  <div className="container skills-page2">
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '95vh',
        marginBottom: '20px',
        overflowX: 'scroll',
      }}
    >
      <Tree data={[skillsData]} parentColor={DEFAULT_COLOR} />
    </div>
  </div>
);

export default SkillsSmall;

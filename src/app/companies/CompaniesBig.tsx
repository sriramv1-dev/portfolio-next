'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import './companies-big.scss';

const DATE_FORMAT = 'dd MMM yyyy';

type Company = {
  id: number;
  name: string;
  shortName: string;
  from: string;
  to?: string;
  role: string;
  description: string;
};

const CompaniesBig = ({ companies }: { companies: Company[] }) => {
  const [current, setCurrent] = useState(companies[0].id);

  const getCompany = ({ id, name, description, role, shortName, from, to }: Company) => (
    <li className="item" key={id}>
      <input
        type="radio"
        id={'radio_' + id}
        name="basic_carousel"
        value={name}
        onChange={() => setCurrent(id)}
        checked={current === id}
      />
      <label className={'label_' + shortName} htmlFor={'radio_' + id}>
        {name}
      </label>

      <div className={'content content_' + shortName}>
        <div className="company-logo"></div>
        <h3>{role}</h3>
        <div className="description">{description}</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            marginBottom: '10px',
          }}
        >
          <div>
            <h3>{format(new Date(from), DATE_FORMAT)}</h3>
          </div>
          <div>
            <h3>{to ? format(new Date(to), DATE_FORMAT) : 'Till Date'}</h3>
          </div>
        </div>
      </div>
    </li>
  );

  return (
    <div className="container companies-page">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          height: '100vh',
        }}
      >
        <div id="scene">
          <div id="left-zone">
            <ul className="list">
              {companies.map((company) => getCompany(company))}
            </ul>
          </div>
          <div id="middle-border"></div>
          <div id="right-zone"></div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesBig;

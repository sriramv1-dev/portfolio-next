import { format } from 'date-fns';
import './companies-small.scss';

const DATE_FORMAT = 'dd MMM yyyy';

type Company = {
  id: number;
  name: string;
  shortName: string;
  from: string;
  to?: string;
  role: string;
  descriptionArr: string[];
};

const duration = (from: string, to?: string) =>
  `${format(new Date(from), DATE_FORMAT)} to ` +
  (to ? `${format(new Date(to), DATE_FORMAT)}` : `till date`);

const CompaniesSmall = ({ companies }: { companies: Company[] }) => {
  return (
    <div className="container companies-page-small">
      {companies.map(({ id, name, descriptionArr, role, shortName, from, to }) => (
        <div key={`company-${id}-container`} className="timeline-container">
          <div key={`company-${id}-shortName`} className={`item_${shortName}`}>
            <div className={`company-logo_${shortName}`}></div>

            <div className="company-title">
              <div className="company-name">
                <p>{name}</p>
              </div>
              <div className="company-role">
                <span>{role}</span>
                <span>{duration(from, to)}</span>
              </div>
            </div>
            <div className="company-description">
              <p>{descriptionArr?.join('\r\n')}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompaniesSmall;

import './projects.scss';

export default function ProjectsPage() {
  return (
    <div className="container projects-page">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          height: '100vh',
        }}
      >
        <div className="text-zone">
          <h1>My Projects...</h1>
        </div>
      </div>
    </div>
  );
}

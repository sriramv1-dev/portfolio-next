import Link from 'next/link';
import MyLogo from '@/components/MyLogo';
import './home.scss';

export default function HomePage() {
  return (
    <div className="container home-page">
      <div className="box1">
        <h3>
          Hi.. <br /> I am
        </h3>
        <h1>Sriram Voonna</h1>
        <h2>Full Stack Developer / Javascript</h2>
        <Link href="/contact" className="flat-button">
          Contact Me
        </Link>
      </div>
      <div className="box2">
        <MyLogo />
      </div>
    </div>
  );
}

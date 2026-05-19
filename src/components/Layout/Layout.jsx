import { Outlet, NavLink } from 'react-router-dom';
import { FiHome, FiImage, FiMusic, FiPlay, FiMail } from 'react-icons/fi';
import './Layout.css';

const NAV_ITEMS = [
  { to: '/', icon: FiHome, label: '首页' },
  { to: '/gallery', icon: FiImage, label: '照片' },
  { to: '/music', icon: FiMusic, label: '音乐' },
  { to: '/game', icon: FiPlay, label: '游戏' },
  { to: '/letter', icon: FiMail, label: '情书' },
];

export default function Layout() {
  return (
    <div className="layout">
      <main className="layout-main">
        <Outlet />
      </main>
      <nav className="bottom-nav">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `nav-item${isActive ? ' nav-item--active' : ''}`
            }
          >
            <Icon className="nav-icon" size={22} />
            <span className="nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

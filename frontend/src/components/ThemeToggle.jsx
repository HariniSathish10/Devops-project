import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-3 py-2 rounded-lg border"
    >
      {darkMode ? '☀ Light' : '🌙 Dark'}
    </button>
  );
}

export default ThemeToggle;

import { useThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
  const { theme, actualTheme, setTheme } = useThemeContext();

  return {
    theme,
    actualTheme,
    setTheme,
    isDark: actualTheme === 'dark',
    isLight: actualTheme === 'light',
    isSystem: theme === 'system',
  };
};
// Token exports to be used in inline framer-motion styles
export const TOKENS = {
    colors: {
        dark: {
            bgPrimary: '#0a0a0f',
            bgSecondary: '#111118',
            bgTertiary: '#1a1a24',
            bgElevated: '#1f1f2e',
            bgOverlay: 'rgba(10,10,15,0.85)',
            borderSubtle: 'rgba(255,255,255,0.06)',
            borderDefault: 'rgba(255,255,255,0.10)',
            borderStrong: 'rgba(255,255,255,0.18)',
            borderFocus: '#7c6af7',
            textPrimary: '#f0f0f5',
            textSecondary: '#a0a0b5',
            textTertiary: '#6b6b80',
            textMuted: '#45455a',
            textInverted: '#0a0a0f',
            accentPrimary: '#7c6af7',
            accentSecondary: '#a78bfa',
            accentGlow: 'rgba(124,106,247,0.25)',
            accentSubtle: 'rgba(124,106,247,0.08)',
        },
        light: {
            bgPrimary: '#fafafa',
            bgSecondary: '#ffffff',
            bgTertiary: '#f4f4f8',
            bgElevated: '#ffffff',
            bgOverlay: 'rgba(250,250,250,0.90)',
            borderSubtle: 'rgba(0,0,0,0.05)',
            borderDefault: 'rgba(0,0,0,0.09)',
            borderStrong: 'rgba(0,0,0,0.15)',
            borderFocus: '#6d5ef5',
            textPrimary: '#0f0f14',
            textSecondary: '#3d3d52',
            textTertiary: '#7a7a95',
            textMuted: '#b0b0c5',
            textInverted: '#fafafa',
            accentPrimary: '#6d5ef5',
            accentSecondary: '#5b4de0',
            accentGlow: 'rgba(109,94,245,0.20)',
            accentSubtle: 'rgba(109,94,245,0.06)',
        }
    },
    semantic: {
        success: '#34d399',
        warning: '#fbbf24',
        error: '#f87171',
        info: '#60a5fa'
    }
};

export const getThemeToken = (theme: 'dark' | 'light', key: keyof typeof TOKENS.colors.dark) => {
    return TOKENS.colors[theme][key];
};

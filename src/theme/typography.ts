export const fontFamilies = {
  heading: 'Fredoka_700Bold',
  bodyRegular: 'Nunito_400Regular',
  bodySemiBold: 'Nunito_600SemiBold',
  bodyBold: 'Nunito_700Bold',
} as const;

export const fontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
} as const;

export const typography = {
  h1: { fontFamily: fontFamilies.heading, fontSize: fontSizes['4xl'] },
  h2: { fontFamily: fontFamilies.heading, fontSize: fontSizes['3xl'] },
  h3: { fontFamily: fontFamilies.heading, fontSize: fontSizes['2xl'] },
  h4: { fontFamily: fontFamilies.heading, fontSize: fontSizes.xl },
  h5: { fontFamily: fontFamilies.heading, fontSize: fontSizes.lg },
  bodyLarge: { fontFamily: fontFamilies.bodyRegular, fontSize: fontSizes.lg },
  body: { fontFamily: fontFamilies.bodyRegular, fontSize: fontSizes.md },
  bodySmall: { fontFamily: fontFamilies.bodyRegular, fontSize: fontSizes.sm },
  caption: { fontFamily: fontFamilies.bodyRegular, fontSize: fontSizes.xs },
  labelBold: { fontFamily: fontFamilies.bodyBold, fontSize: fontSizes.md },
  labelSemiBold: { fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.md },
  labelSmall: { fontFamily: fontFamilies.bodySemiBold, fontSize: fontSizes.sm },
} as const;

import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    brand: {
      mediumSunsetRed: string;
      swishRed: string;
      whiteLinen: string;
      linen: string;
      lightLinen: string;
      mediumLinen: string;
      darkLinen: string;
      whiteCoffee: string;
      lightCoffee: string;
      mediumCoffee: string;
      darkCoffee: string;
      deeperCoffee: string;
      whiteAntiFlash: string;
      lightAntiFlash: string;
      mediumAntiFlash: string;
      darkAntiFlash: string;
      deeperAntiFlash: string;
      whiteLotion: string;
      blackCharcoal: string;
      columbiaBlue: string;
      darkGreenStream: string;
      peach: string;
    };
  }

  interface ThemeOptions {
    brand?: Partial<Theme["brand"]>;
  }
}
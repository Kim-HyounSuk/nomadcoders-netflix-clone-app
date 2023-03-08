import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      dark: string;
      light: string;
    };
    white: {
      dark: string;
      light: string;
    };
  }
}

declare module "@tekord/build-info-generator" {
  export function generateBuildInfoString(
    mode: string,
    template?: string
  ): string;
}

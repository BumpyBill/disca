export default interface packageJSON {
  main: string;
  scripts: scripts;
}

interface scripts {
  start: string;
  build?: string;
}

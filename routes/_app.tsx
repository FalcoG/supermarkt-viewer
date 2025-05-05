import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fresh-projectsupermarkt-interface</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-white dark:bg-neutral-900 text-black dark:text-neutral-300">
        <Component />
      </body>
    </html>
  );
}

SkillrHub PWA setup

Upload these files to the website root:

/manifest.webmanifest
/service-worker.js
/pwa-register.js
/offline.html

Upload this folder to the website root:

/icons/
  icon-192.png
  icon-512.png
  icon-maskable-512.png
  apple-touch-icon.png

Add inside <head>:

<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#2457d6">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">

Add before </body>:

<script src="/pwa-register.js?v=1"></script>

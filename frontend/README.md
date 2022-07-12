# Live Elo Tennis App
***

## Dependency Version + Docs:
+ React: 18.2.0
  - https://reactjs.org/docs/create-a-new-react-app.html
+ Bootstrap: ^5.1.3
  - https://www.npmjs.com/package/bootstrap#quick-start
+ React Bootstrap: ^2.4.0
  - https://react-bootstrap.github.io/components/alerts
+ React Bootstrap Icons: ^1.8.4
  - https://www.npmjs.com/package/react-bootstrap-icons
+ React Router Bootstrap: ^0.26.1
  - https://isotropic.co/react-multiple-pages/
  - https://github.com/react-bootstrap/react-router-bootstrap
+ React Router Dom: ^5.0.1
  - https://v5.reactrouter.com/web/guides/quick-start

* * *

#### CSS:
+ /admin - (to be renamed)
  - main.css (main.css loaded on all index.js/all pages)

+ /index - (temp)

#### Pages:
/src - contains all pages (name pages as is, ex. admin-login.jsx = `localhost:3000/admin-login`)
+ index: routes
+ Layout: contains navbar and outlet
+ admin-login: admin login
+ charts: charts
+ NoPage: 404 page.

#### Fonts:
Current Fonts:
Source Sans Pro (All Weights)

Fonts are added as `<links>` in `public/index.html`
```html 
public/index.html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap" rel="stylesheet"> 
```


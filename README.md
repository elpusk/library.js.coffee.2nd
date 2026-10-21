# library.js.coffee.2nd

## Items

- javascript library for coffee manager 2nd.
- Webmapper v1.12 : setting device & update firmware.
- Webmsr-read v1.3 : magnetic card reading tester.
- Webibutton-read v1.3 : i-button reading tester.
- [Programming Guide for MSR](./doc/programming-guide-msr-read-app.md) - How to read a magnetic card.
- [Programming Guide for i-Button](./doc/programming-guide-ibutton-read-app.md) - How to read a i-Button key.

## current version

- javascript library for coffee manager 2nd. : v2.1 : get_device_list() supports multi-filters
- Webmapper v1.12 : supports lpu238( need cf2 server 2.5 greater then equal)
- Webmsr-read v1.3 : supports lpu238( need cf2 server 2.5 greater then equal)
- Webibutton-read v1.3 : supports lpu238( need cf2 server 2.5 greater then equal)

## tools

- [node.js](https://nodejs.org/)

- pnpm
  - `corepack enable`
  - `corepack prepare pnpm@latest --activate`

- installation dependecy: 
  - `pnpm install`

- more library
  - react-simple-keyboard 3.8 : `pnpm add react-simple-keyboard --filter webmapper`

## build

- build all : `pnpm run build`
- build library : `pnpm run build:lib`
- build webmapper : `pnpm run build:web`
- build webmsr-read : `pnpm run build:msr`
- build webibutton-read : `pnpm run build:msr`
- debug(webmapper) : `pnpm run dev`
- debug(webmsr-read) : `pnpm run dev:msr`
- debug(webibutton-read) : `pnpm run dev:ibutton`

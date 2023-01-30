# App development

This file contains some tips and guidelines on building our front-end React Native app.

- [Overview of directories](#overview-of-directories)
- [NativeBase](#nativebase)
  - [File locations, naming, moving and deleting](#file-locations-naming-moving-and-deleting)
  - [Icons](#icons)
- [Images](#images)

## Overview of directories

**Below is a brief rundown of the different directories inside `/app/src` and what they're for.**

(There are also some other files and folders inside `/app` but you mostly won't need to touch these, unless for instance you're installing new npm packages or changing settings affecting Android or iOS. Please see also the [NativeBase section](#nativebase) below -- some files are moving into the `NativeBase` directory.)

- `/Assets` -- fonts, images and other static files that are core to the app
- `/Components` -- custom components that make up different parts of an app screen, e.g. a date search that might belong inside an event search container
- `/Config` -- overall app configuration settings, e.g. the URL of the API
- `/Containers` -- screens content and logic
- `/Hooks` -- [React hooks](https://reactjs.org/docs/hooks-custom.html)
- `/NativeBase` -- assets, components and containers for the new app designs, using the NativeBase component library ([see more below](#nativebase))
- `/Navigators` -- defines the bottom tabs, which screens the user can navigate to within the app and which container to use for which screen
- `/Services` -- external services like our API, which we get projects and events data from
- `/Store` -- the [Redux store](https://medium.com/swlh/state-management-with-redux-react-native-a6369fcfe835) we use for more complex data sharing between containers/components
- `/Theme` -- existing (old) theme for controlling overall colours, fonts, spacing, etc - we are switching to handling this using NativeBase
- `/Translations` -- app text in different languages, currently we largely don't use this
- `/Types` -- some extra Typescript setup to enable different data types
- `/Utils` -- useful reusable functions to work with e.g. lists, searches, event dates and times

## NativeBase

We are moving to the [NativeBase](https://nativebase.io/) component library as part of implementing new app designs.  [Find the official docs here.](https://docs.nativebase.io/)

Please raise on the Slack channel any questions about how best we can use NativeBase, and how to keep coding approaches / ways of working consistent -- and add to this file updates that might help other people.  This is especially important while we're in the early stages of figuring it all out.

### File locations, naming, moving and deleting

Currently, while we are in the process of transitioning different parts of the app to NativeBase and the new app designs, please put new assets (e.g. images), components and containers inside the `app/src/NativeBase` directory (e.g. `app/src/NativeBase/Components`).

Parts of the app like `Config`, `Hooks`, `Services`, `Store` don't need to move.  There may be some other things where we need to make a judgement call.

If it makes sense to do so, you can a name new file the same as the old one it replaces (e.g. `app/src/Components/MyThing.tsx` can be `app/src/NativeBase/Components/MyThing.tsx`).

If an old non-NativeBase file is no longer needed in the app, please delete it as part of the pull request you're working on, so we don't have old files hanging around that aren't used any more.

### Icons

Icons we use in the app are normally from the Material Icons library, implemented using the [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) package.

To add an icon into your component:

- Add imports at the top of your file from NativeBase and the icons library:
  - `import { Icon } from 'native-base'` (or add this to your existing `native-base` import statement)
  - `import MaterialIcons from 'react-native-vector-icons/MaterialIcons'`

- Insert the `<Icon/>` component:
  - `<Icon as={MaterialIcons} name="xxxxxx" />`
  - Replace `xxxxxx` with the name of the icon you want to use:
    - To find the name of the icon you're looking for, inspect the icon in Figma, in the Design panel on the right-hand side of the screen, go down to the Export section, and you should see the name beginning with `material-symbols:`
    - If you're not sure exactly how the icon is named, go to [the MaterialIcons font library](https://fonts.google.com/icons?selected=Material+Icons) and you can browse/search.  Take the name as it appears there and convert it to kebab case -- e.g. for `Info` use `info`, for `Check Circle` use `check-circle`
  - See [the Icon docs](https://docs.nativebase.io/icon) for other properties you can set
  - See also [the IconButton component](https://docs.nativebase.io/icon-button)

## Images

For any images that are not photos and not icons -- for example, logos or any other vector designs -- it's better to use SVG format wherever possible.  SVGs are smaller in file size and can scale to any width and height on-screen.

PNG, JPEG, GIF, etc images are better suited to photos.  For icons use the NativeBase `<Icon />` component ([see above](#icons)).

We have the [react-native-svg](https://github.com/software-mansion/react-native-svg) package set up so you can use SVG images easily:

- Copy the .svg file into the `app/src/NativeBase/Assets/Images` directory (or a sub-directory)
- Import it at the top of your component file, e.g. `import StaLogoWide from '@/NativeBase/Assets/Images/Logos/sta-logo-wide.svg'`
- Use it like you would a normal component, e.g. `<StaLogoWide />`
- See `interface SvgProps` [in this file](https://github.com/software-mansion/react-native-svg/blob/main/src/elements/Svg.tsx) for common props you can use, and [here for touch events](https://github.com/software-mansion/react-native-svg/blob/main/USAGE.md#touch-events)

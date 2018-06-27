<div align="center">
  <h1>IMPORTED LIBRARY ✂</h1>
  <br/>
  <img src="./assets/imported-logo.png" alt="imported library" width="409" align="center">
  <br/>
  <br/>
  Dont code-split components - code split libraries 
  <br/>
  <br/>
  
  <a href="https://www.npmjs.com/package/react-imported-library">
    <img src="https://img.shields.io/npm/v/react-imported-library.svg?style=flat-square" />
  </a>
        
  <a href="https://travis-ci.org/theKashey/react-imported-library">
   <img src="https://travis-ci.org/theKashey/react-imported-library.svg?branch=master" alt="Build status">
  </a> 
    
  <img src="https://badges.greenkeeper.io/theKashey/react-imported-library.svg" />
    
  <br/>
</div>

Use the power of renderprop to delived a Library as a React component. Based on 
[React-imported-component](https://github.com/theKashey/react-imported-component). Support SSR and React Suspense.

- ⛅️ You can codesplit momentjs, you may async load any library and use it.
- 🏎 Sync on server, and for already loaded stuff, async on client.
- 🚀 Bundler-independent SSR (when used with react-imported-component).
- 🔒 Written in TypeScript.
 
## Usage

Have you heard, than moment.js is super hudge? Code split it!
```javascript
import {importedLibraryDefault, setConfig} from 'react-imported-library';

// do you need SSR support? Probably not (affects react-imported-component settings)
setConfig({SSR: false});

// this will import `default` export
const Moment = importedLibraryDefault( () => import('momentjs'));

<Moment>
 { (momentjs) => <span> {momentjs(date).format(FORMAT)}</span> }
</Moment>
```

May be you have a small library, you may use somewhere inside your components?

Codesplit it! 
```js
import {importedLibrary} from 'react-imported-library';
const Utils = importedLibrary( () => import('./utils.js'));

<Utils>
 { ({a,b,c }) => <span> {a(b+c())} </span> }
</Utils>
```

May be you also have to caclucate something heavy, not to do it on every `render`?
```js
// you may use "initialization hook" to offload some computations

<Utils
  initial={ ({a,b,c}) => ({ result: a(b+c()) })}
>
 {(_,state) => <span>{state.result}</span>} 
</Utils>


```

## API

- importedLibrary(`importer`, options?): Component
  - `importer` is an `import` statement, or any Promise resolver
  - options 
    - options.async:boolean - enables React.suspense, ie throws a Promise on loading
    - options.exportPicker - allows you to "pick" export from the original file
    
- importedLibraryDefault - is just importedLibrary with _exportPicker_ configured to pick `.default`

- Component
  - `initial: (library: T) => K;` - state initializator
  - `children: (library: T, state: K) => React.ReactNode` - function-as-children
  - `error: ReactComponent` - error indicator
  - `loading: ReactComponent` - __unthrottled__ loading indicator.       


## Licence
MIT

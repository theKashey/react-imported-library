import * as React from 'react';
import {Component} from 'react';
import {AppWrapper} from './styled';
import {importedLibrary, importedLibraryDefault} from "../src";


export interface AppState {

}

const AsyncJS = importedLibrary(() => import('./async'));

const SumJS = importedLibraryDefault(() => import('./async'));

export default class App extends Component <{}, AppState> {
  state: AppState = {};

  render() {
    return (
      <AppWrapper>
        <AsyncJS
          loading={() => <div>loading....</div>}
          error={() => <div>error....</div>}
        >
          {({one, two, default: sum}) => (
            <div>result {one()}+{two()} is: {sum(one(), two())}</div>
          )}
        </AsyncJS>

        <SumJS
        >
          {(sum) => (
            <div>result 1+1 is is: {sum(1, 1)}</div>
          )}
        </SumJS>

        <AsyncJS
          initial={(sum) => ({r: sum.default(1, 2)})}
        >
          {(sum, {r}: { r: number }) => (
            <div>initial sum 1+2 is is: {r}|{sum.default(1,2)}</div>
          )}
        </AsyncJS>

        <SumJS
          initial={(sum) => ({r: sum(1, 2)})}
        >
          {(sum, {r}: { r: number }) => (
            <div>initial sum 1+2 is is: {r}|{sum(1,2)}</div>
          )}
        </SumJS>

        <SumJS
          initial={() => ({a:42})}
        >
          {() => (
            <div></div>
          )}
        </SumJS>
      </AppWrapper>
    )
  }
}
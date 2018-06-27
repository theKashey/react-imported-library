import * as React from 'react';
import {Component} from 'react';
import imported from 'react-imported-component';
import {ReactElement} from "react";

export interface ComponentProps<T> {
  library: T;
}

export interface ImportedLibraryProps<T, K> {
  initial?: (library: T) => K;
  children: (library: T, state: K) => React.ReactNode;
}


export interface ImporterLibraryProps {
  error?: () => React.ReactNode;
  loading?: () => React.ReactNode;
}

export interface Options<T, K> {
  async?: boolean;
  exportPicker?: (a: T) => K;
}

export type InternalProps<T, K> = ComponentProps<T> & ImportedLibraryProps<T, K>;
export type LibraryProps<T, K> = ImporterLibraryProps & ImportedLibraryProps<T, K>;

export class ImportedLibrary<T, K> extends Component<InternalProps<T, K>, K> {
  constructor(props: InternalProps<T, K>) {
    super(props);
    const {library, initial} = this.props;
    if (initial) {
      this.state = initial(library)
    }
  }

  render() {
    return (this.props.children as any)(this.props.library, this.state) || null;
  }
}

function ItoI<T>(a: T) {
  return a;
}


interface State {
  [key: string]: any
}

export function importedLibrary<T, B=T>
(importer: () => Promise<T>, options: Options<T, B> = {})
  : (<K extends State>(props: LibraryProps<B, K>) => ReactElement<any> | null) {
  return imported(importer, {
    async: options.async,
    exportPicker: options.exportPicker || ItoI,
    render: (library, state, props: LibraryProps<T, any>) => {
      switch (state) {
        case "done":
          return <ImportedLibrary {...props} library={library}/>;
        case 'error':
          return props.error ? props.error() : null;
        case 'loading':
          return props.loading ? props.loading() : null;
        default:
          return null;
      }
    }
  }) as any;
}

export function importedLibraryDefault<T, B=T>
(importer: () => Promise<{ default: T }>, options: Options<T, B> = {})
  : (<K extends State>(props: LibraryProps<B, K>) => ReactElement<any> | null) {
  return importedLibrary(() => importer().then(data => data.default), options);
}
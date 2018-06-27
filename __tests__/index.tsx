import * as React from 'react';
import {mount} from 'enzyme';
import {importedLibrary, importedLibraryDefault, setConfiguration} from "../src";


describe('Specs', () => {

  setConfiguration({SSR: false});

  const asyncLibrary = () => Promise.resolve({
    add: (a: number, b: number) => a + b,
    default: () => 42
  });

  it('should import library', (done) => {
    const Lib = importedLibrary(asyncLibrary);

    const wrapper = mount(<Lib>{({add, default: a}) => <span>{add(a(), a())}</span>}</Lib>)

    return setTimeout(() => {
      expect(wrapper.update().html()).toBe("<span>84</span>");
      done();
    })
  });

  it('should import default library', (done) => {
    const Lib = importedLibraryDefault(asyncLibrary);

    const wrapper = mount(<Lib>{(a) => <span>{a()}</span>}</Lib>)

    return setTimeout(() => {
      expect(wrapper.update().html()).toBe("<span>42</span>");
      done();
    }, 1)
  });

  it('should calc default state library', (done) => {
    const Lib = importedLibraryDefault(asyncLibrary);

    const wrapper = mount(
      <Lib
        initial={a => ({r: a()})}
      >
        {(a, {r}:{r:number}) => <span>{a() + r}
      </span>}
      </Lib>
    );

    return setTimeout(() => {
      expect(wrapper.update().html()).toBe("<span>84</span>");
      done();
    }, 1)
  });
});

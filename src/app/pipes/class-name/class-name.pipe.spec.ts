import { ClassNamePipe } from './class-name.pipe';

describe('ClassNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ClassNamePipe();
    expect(pipe).toBeTruthy();
  });
});

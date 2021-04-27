import { JSDOM } from 'jsdom';
import { v4 as uuid } from 'uuid';
import { filesToImageObjects } from './useImages';

const { window } = new JSDOM('');

const basePath = 'blob:http//localhost:3000 ';
// Implmentation taken from https://github.com/GMartigny/crop-browser/blob/master/test/_set-env.js
window.URL.createObjectURL = () => {
  const url = `${basePath}/${uuid()}`;
  return url;
};

describe('transforms files to imageObjects correctly', () => {
  expect(1 + 1).toEqual(2);
  global.URL.createObjectURL = jest.fn(window.URL.createObjectURL);
  const files = [
    new window.File([' hey'], 'test'),
    new window.File([' hey'], 'test'),
    new window.File([' hey'], 'test'),
    new window.File([' hey'], 'test'),
    new window.File([' hey'], 'test'),
    new window.File([' hey'], 'test'),
  ];

  const testPaths = files.map(() => uuid());
  testPaths.pop();

  test('it transform correctly', () => {
    const imageObjects = filesToImageObjects(files);
    expect(imageObjects.length).toEqual(files.length);
    expect(imageObjects[0]).toMatchObject({
      file: files[0],
      path: expect.stringContaining(basePath),
    });
  });

  const imageObjects = filesToImageObjects(files, testPaths);
  test('retains existing paths', () => {
    expect(imageObjects[2].path).toEqual(testPaths[2]);
  });

  test('makes new path for none existing path', () => {
    expect(imageObjects[files.length - 1].path).toEqual(expect.stringContaining(basePath));
  });
});

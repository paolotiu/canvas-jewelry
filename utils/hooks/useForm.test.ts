import { JSDOM } from 'jsdom';
import { v4 as uuid } from 'uuid';
import { filesToImageObjects } from './useImages';

const { window } = new JSDOM('');

// Implmentation taken from https://github.com/GMartigny/crop-browser/blob/master/test/_set-env.js
window.URL.createObjectURL = () => {
  const url = `blob:http//localhost:3000/${uuid()}`;
  return url;
};

it('transforms files to imageObjects correctly', () => {
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

  const imageObjects = filesToImageObjects(files);
  expect(imageObjects.length).toEqual(files.length);
  expect(imageObjects[0]).toMatchObject({
    file: files[0],
    path: expect.stringContaining('blob:http//localhost:3000'),
  });
  expect(global.URL.createObjectURL).toBeCalledTimes(files.length);
});

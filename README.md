# jquery-mask-as-number
[![npm](https://img.shields.io/npm/dt/jquery-mask-as-number.svg)](https://www.npmjs.com/package/jquery-mask-as-number)
[![npm](https://img.shields.io/npm/v/jquery-mask-as-number.svg)](https://www.npmjs.com/package/jquery-mask-as-number)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Known Vulnerabilities](https://snyk.io/test/github/andrehtissot/jquery-mask-as-number/badge.svg?targetFile=package.json)](https://snyk.io/test/github/andrehtissot/jquery-mask-as-number?targetFile=package.json)

Simple mask jquery extension that ensures valid integer numbers in text inputs

Demo: https://jsfiddle.net/andretissot/9prtpcd5/

HTML5 number field only highlites invalid entry, but doesn't enforce the valid:

- On Chrome 55:<br />
![Inserting invalid numbers in chrome number fields](https://user-images.githubusercontent.com/1174345/33887303-a3d8fa4e-df49-11e7-92c7-88a2268b52f9.png)

- On Firefox 50:<br />
![Inserting invalid numbers in firefox number fields](https://user-images.githubusercontent.com/1174345/33887300-a01ead9a-df49-11e7-996a-c96d92b50342.png)

This jquery extension forces the input to only allow integer values, and minus if first character.

The input value is not limited by the Browser's maximum integer.

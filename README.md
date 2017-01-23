# jquery-mask-as-number
Simple mask jquery extension that ensures valid integer numbers in text inputs

Demo: https://jsfiddle.net/andretissot/9prtpcd5/

HTML5 number field only highlites invalid entry, but doesn't enforce the valid:

- On Chrome 55:<br />
![alt tag](https://raw.githubusercontent.com/andrehtissot/jquery-mask-as-number/master/.docs/number_input_on_chrome.png)

- On Firefox 50:<br />
![alt tag](https://raw.githubusercontent.com/andrehtissot/jquery-mask-as-number/master/.docs/number_input_on_firefox.png)

This jquery extension forces the input to only allow integer values, and minus if first character.

The input value is not limited by the Browser's maximum integer.

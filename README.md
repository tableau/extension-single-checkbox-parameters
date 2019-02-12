# Single Checkbox Parameters
This extension allows you to add a parameter to a Tableau dashboard and have the UI display in a single checkbox.  This [idea](https://community.tableau.com/ideas/2834) was originally proposed on Nov 24, 2013 and has 120 votes for it to be implemented.

## How to use an Extension
Download the Single Checkbox Parameter [manifest file](https://tableau.github.io/extension-single-checkbox-parameters/single-checkbox-parameter.trex). Open Tableau Desktop 2018.2 or higher, drag in the "Extension" object to a dashboard. Click "My Extensions" and find the manifest file (.trex) you downloaded above.

## Using the Single Checkbox Parameter Extension
1. Create a parameter with a list of 2 values.
2. Drag in a new Extension object to your dashboard.
3. Select the <a href='https://tableau.github.io/extension-single-checkbox-parameters/single-checkbox-parameter.trex'>manifest file</a> you downloaded.
4. Select the parameter you created above for the extension to manipulate.
5. Select the options as presented.
6. Click 'OK'.

## Known Bugs
* There is a known issues in Tableau 2018.2 running on Mac computers where the native dropdown (when selecting the parameter) cannot be chosen with the mouse.  Please use the keyboard to select the parameter.

* When selecting colors the event handler only fires the first time.  You cannot make multiple choices in the color palettes without closing and opening the color picker again.
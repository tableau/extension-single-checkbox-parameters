[![As-Is](https://img.shields.io/badge/Support%20Level-As--Is-e8762c.svg)](https://www.tableau.com/support-levels-it-and-developer-tools)

# Single Checkbox Parameters
This extension allows you to add a parameter to a Tableau dashboard and have the UI display in a single checkbox.  This [idea](https://community.tableau.com/ideas/2834) was originally proposed on Nov 24, 2013 and at the time had gathered 120 votes for it to be implemented.

## Using the Extension from Tableau Exchange (Recommended)
See the Tableau Help topic [Use Dashboard Extensions](https://help.tableau.com/current/pro/desktop/en-us/dashboard_extensions.htm) for directions. When presented with the list of available Dashboard Extensions, search for Single Checkbox Parameters to find and install this one.

### Using the Single Checkbox Parameter Extension
1. Create a parameter with a list of 2 values.
2. Drag in a new Extension object to your dashboard.
3. Select the <a href='https://tableau.github.io/extension-single-checkbox-parameters/single-checkbox-parameter.trex'>manifest file</a> you downloaded.
4. Select the parameter you created above for the extension to manipulate.
5. Select the options as presented.
6. Click 'OK'.

## Known Bugs
* There is a known issues in Tableau 2018.2 running on Mac computers where the native dropdown (when selecting the parameter) cannot be chosen with the mouse.  Please use the keyboard to select the parameter.
* When selecting colors the event handler only fires the first time.  You cannot make multiple choices in the color palettes without closing and opening the color picker again.

## Support
Tableau customers can contact the Tableau Support team for help.

For any local build or code related questions, please post to the [Issues](https://github.com/tableau/extension-single-checkbox-parameters/issues) tab here for community support.

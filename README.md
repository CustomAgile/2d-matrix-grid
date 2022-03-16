# 2D Matrix Grid

Grid that shows the count of artifacts where the field matches the displayed values for the selected fields on the X and Y Axis.  

![ScreenShot](/images/2d-matrix-grid.png)

### App Configuration
App Settings include:
* Model Name - the model type that the matrix will count items for.
* X Axis Field - The field who's allowed values to display along the (top) horizontal axis of the grid
* X Axis Values (optional) - The subset of values to display along the horizontal axis of the grid.  If this is blank, all values will be displayed.
* Y Axis Field - The field who's allowed values to display along the (left) vertical axis of the grid
* Y Axis Values (optional) - The subset of values to display along the vertical axis of the grid.  If this is blank, all values that are populated in at least one artifact will be displayed.**
* Include Blanks - Whether or not to include a columns\row for artifacts that are blank for the selected field(s) 
* Include Row Totals - Includes a total column as the last column of the grid. 
* Include Column Totals - Includes a total row as the last row of the grid.
* Sort By: Alphabetical or Total (count of items for each row)
* Sort Direction: Descending or Ascending sort
* Row Limit:  This will limit the number of rows to display and include in total calculations (if selected).  If this is blank, all rows will be displayed.  This will display the top N rows according to the sort by and sort direction settings. 
* Query - A Rally query to use to limit the data set displayed.  

![ScreenShot](/images/2d-matrix-settings.png)


## Development Notes

### First Load

If you've just downloaded this from github and you want to do development, 
you're going to need to have these installed:

 * node.js
 * grunt-cli
 * grunt-init
 
Since you're getting this from github, we assume you have the command line
version of git also installed.  If not, go get git.

If you have those three installed, just type this in the root directory here
to get set up to develop:

  npm install

### Structure

  * src/javascript:  All the JS files saved here will be compiled into the 
  target html file
  * src/style: All of the stylesheets saved here will be compiled into the 
  target html file
  * test/fast: Fast jasmine tests go here.  There should also be a helper 
  file that is loaded first for creating mocks and doing other shortcuts
  (fastHelper.js) **Tests should be in a file named <something>-spec.js**
  * test/slow: Slow jasmine tests go here.  There should also be a helper
  file that is loaded first for creating mocks and doing other shortcuts 
  (slowHelper.js) **Tests should be in a file named <something>-spec.js**
  * templates: This is where templates that are used to create the production
  and debug html files live.  The advantage of using these templates is that
  you can configure the behavior of the html around the JS.
  * config.json: This file contains the configuration settings necessary to
  create the debug and production html files.  Server is only used for debug,
  name, className and sdk are used for both.
  * package.json: This file lists the dependencies for grunt
  * auth.json: This file should NOT be checked in.  Create this to run the
  slow test specs.  It should look like:
    {
        "username":"you@company.com",
        "password":"secret"
    }
  
### Usage of the grunt file
#### Tasks
    
##### grunt debug

Use grunt debug to create the debug html file.  You only need to run this when you have added new files to
the src directories.

##### grunt build

Use grunt build to create the production html file.  We still have to copy the html file to a panel to test.

##### grunt test-fast

Use grunt test-fast to run the Jasmine tests in the fast directory.  Typically, the tests in the fast 
directory are more pure unit tests and do not need to connect to Rally.

##### grunt test-slow

Use grunt test-slow to run the Jasmine tests in the slow directory.  Typically, the tests in the slow
directory are more like integration tests in that they require connecting to Rally and interacting with
data.

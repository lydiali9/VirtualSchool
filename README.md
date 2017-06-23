Welcome to UNWomen • Virtual School Prototype!
==============================================

This prototype is being developed as a joint collaboration between
Pricewaterhouse Coopers and UNWomen as a means to deploy a scalable solution to
access learning solutions and materials throughout the globe - empowering men,
women, and children everywhere to enhance their own individual futures and the
future of society as a whole.

More details on this endeavor to come...

 

Getting Started
---------------

1.  After cloning the repository - you will need to install the node
    dev-dependency modules. Do this by navigating to the root of the repo:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$ git clone https://unw-redesign.visualstudio.com/DefaultCollection/Redesign/_git/Virtual%20School
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2.  Checkout the dev branch, currently used for active development

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$ git checkout dev
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

3.  Install Modules. Module installation is compatible with npm however we recommend utilizing YARN instead.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$ nn
$ yarn
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
OR (if you prefer old-fashioned)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$ npm install
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

4.  Finally, run npm start to run Gulp. Your finished site will be created in a
    folder called `dist`, viewable at this URL:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
http://localhost:3000
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

_ To create compressed, production-ready assets run `npm run build --production` _

* * *

## Structure ##

### **Base File Structure** ###
is located in the `src` folder and is comprised of five essential folder hierarchies:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/src/assets
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
_ Includes images, javascript, and sass files for compilation _

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/src/data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
_ YML files that comprise the "models" of the static site; Handlebars compiles HTML using these data files _

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/src/helpers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
_ Additional JS files to enhance pre-existing Handlebars and Panini helpers _

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/src/layouts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
_ Default Layout for all HTML pages _

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/src/pages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
_ Comprises each individual HTML page, typically composed of partials _

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/src/partials
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
_ (Modules) that can be re-used for functionality/UI layout _

### **Development Dependencies** ###
<p>Similarly to EmpowerWomen.org, UNW Virtual School is developed primarily using Foundation 6.2.3 by Zurb as its primary front-end framework. For further information, visit: **[Foundation for Sites](http://foundation.zurb.com/sites/docs)**.</p>

<p>Most customized and/or repeated demo elements are built out using panini and handlebars. The data for these items are located in YAML files. This demonstration information can be changed or modified at your discretion. The primary YAML files are:</p>

* **site-settings.yml** - Header/Navigation/Footer component content
* **data.yml** - Still in progress

### **SASS Style Structure** ###
_ To be completed soon _

#### Notes ####

** Files ported from EW Stylings **

<ol>
1. _layout.scss
2. _lists.scss
3. _social.scss
4. _typography.scss
</ol>

<ol>
1. _header.scss
2. _navigation-desktop.scss
3. _navigation.scss
4. _footer.scss
</ol>

** Files ported as partials ** _ (modified to accept Handlebars notation) _

<ol>
1. Header
2. Footer
</ol>

_ Global Sprite was modified for VS, along with several components; attempted to notate as much as possible _

# nebula-ui-library
This library is the Vue and Typescript component library for [Nebula](https://github.com/kozmoai/nebula) and [Nebula Cloud](https://www.nebula.io/cloud/). _The components and utilities in this project are not meant to be used independently_. 

## Install
```
npm i @kozmoai/nebula-ui-library --save --save-exact
```

## Developing with Nebula UI

If you plan to develop against the Nebula UI you can install the nebula-ui-library package locally.

We recommend using the cli and running

`npm i @kozmoai/nebula-ui-library@../../nebula-ui-library --save`

in the Nebula UI project where `../../nebula-ui-library` is the relative path from your Nebula UI project’s directory to the nebula-ui-library project directory. You can also use an absolute path. 

If you have done this succesfully, you should see your Nebula UI package.json and package-lock.json updated to show your local nebula-ui-library. 

<aside>
💡 Keep in mind this will update both the package.json and package-lock.json files. Be sure to not commit the changes to these two files.

💡 Linking a package this way is the safest as it avoids having to do an `npm i`.

</aside>

Then when linking nebula-ui-library to the prefect/UI project you can do the following:

In nebula-ui-library (this repo):

`npm run dev`

In [ui](https://github.com/kozmoai/nebula/tree/main/UI):

`npm run serve`

Now any change you make in nebula-ui-library will trigger a reload in UI. 

## Update
To update a package in a project you can either install `latest` or a specific version like

```
npm i @kozmoai/nebula-ui-library@latest --save --save-exact
```
OR
```
npm i @kozmoai/nebula-ui-library@0.1.60 --save --save-exact
```

## Versioning
This project does not follow SEM versioning and major, minor, and patch updates mostly signify progress toward objectives. Breaking changes are introduced regularly without releasing a major version. For more information, see the [Nebula versioning docs](https://docs.nebula.io/contributing/versioning/)

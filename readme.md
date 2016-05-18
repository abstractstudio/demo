# Abstract Engine Demo

This repository outlines a tutorial for how to use the Abstract Engine in your own web deployment. As of Wednesday, May 18, 2016, this demo uses the `development` branch of the Abstract Engine.

## Importing the Abstract Engine

The first step is including the engine as a submodule. To do this, run the following commands in the shell:

    $ git submodule add https://github.com/abstractstudio/abstractengine.git

To update the repository:

    $ git submodule update

And in case you're having any issues, to make sure the repository is on the right branch:

    $ cd abstractengine
    $ git checkout development

## Creating your game

To start, create the main HTML file that will contain your game. As it is the main page of the web directory, it is customary to call it `index.html`, however depending on your deployment specifications, you may decide to choose something else. 

## Using the Abstract Engine

The Abstract Engine should be initialized with a canvas element from the HTML page. Note that only `setup.js` has to be directly linked via HTML. All else is included automatically by the engine. The following is a simple template page that should work out of the box:

    <!-- index.html -->
    <html>
        <head>
            <title>Abstract Demo</title>
            <script type="text/javascript" src="abstractengine/setup.js"></script>
            <script type="text/javascript">
                function main() {
                    var canvas = document.getElementById("canvas");
                    var engine = new Engine(canvas);
                    engine.start();
                }
            </script>
        </head>
        <body onload="javascript: setup();">
            <canvas width="800" height="600" id="canvas"></canvas>
        </body>
    </html>

There are three important parts to this file. This first is the `<script>` block that includes `setup.js` from the Abstract Engine files. This include provides the `setup` function, which, on invocation, calls the starting hook described in the next paragraph after loading the core engine files. To make sure all of the elements in the page have loaded first, the `setup` method is called when the body loads.

The next is the `<script>` block that defines the `main` method. When the setup is executed, it looks for either a globally defined function called `main` or a hook function passed into the function itself. After all of the specified dependencies have successfully loaded into the page, this callback is called. In short, once the Abstract Engine has loaded all of the files necessary for it to run, it calls `main()`. In this particular example, the `main` method locates the canvas element on the page, initializes a new engine with it, and starts that engine instance.

The last important part of the template is the `<canvas>` block, which creates the canvas the engine will be using. As it is defined, the `main` method looks for the canvas element by searching the document for anything with and `id` of `"canvas"`. As this is the target canvas to run the engine in, it specifies `id="canvas"`.

## Including custom Javascript

There are two methods of adding external Javascript. The first is to extend the dependencies list of the setup object. When `setup` is called, it iterates through the list `setup.dependencies`, including each file. Here is an example:

    <html>
        <head>
            ...
            <script type="text/javascript" src="abstractengine/setup.js"></script>
            <script type="text/javascript">
                setup.dependencies.extend("demo.js");
                function main() {
                    var canvas = document.getElementById("canvas");
                    var engine = new Demo(canvas);
                    engine.start();
                }
            </script>
            ...
        </head>
        ...
    </html>

The second is for a small use case, which is when the core files of the engine are needed in the external script runtimes. This example changes the `onload` method of the `<body>` block so that an intermediate list of files can be loaded by the setup object before calling the anonymous main function. Note that this utilizes the optional argument to the `setup` function of a custom callback in place of a globally defined `main`.

    <html>
        <head>
            ...
            <script type="text/javascript">
                function onload() {
                    setup.require(["demo.js"], function() {
                        var canvas = document.getElementById("canvas");
                        var engine = new Engine(canvas);
                        engine.start();
                     }
                 }
             </script>
             ...
        </head>
        <body onload="javascript: onload();">
            ...
        </body>
    </html>

## Using the engine

The Abstract Engine has two main loops. The first is the update loop, which, by default, is run at an interval equating to 60 Hertz (updates per second). As it is mostly fixed, this loop should be used for input manipulation and processes such as physics simulation. The draw loop, on the other hand, is called natively, which means the framerate could vary. It is very roughly capped at 60 frames per second as well, but due to having to call the native frame queuing function, may exceed that depending on how powerful the machine is. Both methods, as used by the engine, can accept one argument that is the amount of time in milliseconds since the last call to that function. 

Here is an example that draws a square on the screen.

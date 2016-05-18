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

The last important part of the template is the `<canvas>` block, which defines the canvas the engine will be using. The `main` method looks for the canvas element by searching the document for anything with and `id` of `"canvas"`. As this is the target canvas to run the engine in, it specifies `id="canvas"`.

## Including custom Javascript


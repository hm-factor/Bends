# js_proj

## Concept:

Interactive art piece that takes coordinates (ideally you could type in a place by name and it would source the coordinates from google maps or something) and provides artsy topological map 
Slider to change granularity (how many ft/m between any two given lines)
Maybe a slider to control characteristics of the lines (color, styling, thickness)

## APIs:

Googlemaps (googlemaps may not actually store topological data in which case ???)
D3
Onwater (would be cool if I could fill areas with water with blue or some water-like animation) [bonus]
IP geolocation: could fetch lat/lon from user when the app is loaded and immediately display the topographic map of their area [bonus]

Look into poisson disk sampling

## MVPS (go into these in more depth):

Create topological maps (randomly?)
Provide a set of sliders and/or buttons to interact with parameters that affect the randomly generated image
Provide a set of coordinates and instead of a randomly generated topology, the topographical map centered around those coordinates will be generated (previous sliders/buttons still apply) 

## Timeline:

## Wireframe:

## Inspiration:
https://observablehq.com/@mbostock/perlin-noise-contours?collection=@observablehq/generative-art

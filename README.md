# d3cision

**disclaimer** This is on pre-ultra-alpha stage so this can be change dramatically.

## What is this?

This is a try for a d3 plugin for chart decision trees.

## How it looks?

Mmm... I don't know! Do you want to check?

https://rawgit.com/jbkunst/d3cision/master/index.html

## Some configurations parameters?

Yep.

- textnodesize. To set the size of the texts.
- shape. I don't know how to name this parameters and how to explain it in a simple way.
- sep. The separation in the inner and outside links. Number between 0 and inf.
- debug. To show what is going on in the script.

## How is the data to needed?

The usual recursive structure. Like the ultra know flare.json:

```
 "children": [
    {
      "name": 2,
      "size": 18,
      "depth": 2,
      "rule": "cyl < 7",
      "completerule": "cyl < 7",
      "terminal": false,
      "nchildren": 6,
      "summary": [
        {
          "minimum": 52,
          "q1": 72.25,
          "median": 101,
          "mean": 98.06,
          "q3": 110,
          "maximum": 175
        }
      ],
      "childrensid": [3, 6],
      "children": [ ...
```     


## References

- [A Visual Introduction to Machine Learning][1]
- [`rpart/ctree` to json format][2].
- [d3noob’s Block Simple d3.js tooltips][3].
- [Using a D3 Voronoi grid to improve a chart's interactive experience][5] and [d3-distanceLimitedVoronoi][4]
- [Nodelink selecting example][6]

[1]: http://www.r2d3.us/visual-intro-to-machine-learning-part-1/
[2]: http://stackoverflow.com/questions/34196611/converting-rpart-output-into-json-format-in-r
[3]: http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
[4]: https://github.com/Kcnarf/d3-distanceLimitedVoronoi
[5]: http://www.visualcinnamon.com/2015/07/voronoi.html
[6]: http://bl.ocks.org/anonymous/4229227

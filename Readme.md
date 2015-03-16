# Hot Module Replacement Example

```
$ ./bin/build --server 8000 //starts local server on port 8000 with webpack middleware
$ ./bin/build --deploy //uglifies JS, extracts CSS to separate stylesheet, and hashes file names
```
Loading bundles async into the client side router. With the code [here](https://github.com/dtothefp/webpack-middleware-test/blob/master/lib/index.js#L7) for hot-module-replacement I would expect livereload like behavior when anything changes in the views, but it's not happening.


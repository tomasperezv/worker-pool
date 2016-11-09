# worker-pool
Run processing tasks in background threads by using web workers

```javascript
  const worker = new WorkerPool();
  worker.run(() => {
    var result = 0;
    for (var i = 0; i < 100; i++) {
      result += i;
    }

    return result;
  })
  .then((result) => {
    console.log(result);
  });
```

## Fallback

If web-workers are not available the job will be run in the current
execution context.

## Build

```
npm run build
```

## Test locally

```
npm i --dev
npm run build
npm run server
```

Then visit http://localhost:9999/webpack-dev-server

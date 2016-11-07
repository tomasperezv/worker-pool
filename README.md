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

## Build

```
npm run build
```

## Test locally

```
npm run build
npm run server
```

Then visit http://localhost:9999/webpack-dev-server

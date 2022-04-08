export default function getTrueRandomInt(min = 0, max = 1, n = 1) {
  const BASE_URL = 'https://api.random.org/json-rpc/4/invoke'
  return new Promise((resolve, reject) => {
    if (
      typeof min !== 'number' ||
      typeof max !== 'number' ||
      typeof n !== 'number' ||
      n < 1
    )
      resolve([])
    else {
      fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'generateIntegers',
          params: {
            apiKey: '3b552159-39cc-42b4-b2f3-126b18e104eb',
            n: n,
            min: min,
            max: max,
            base: 10,
            replacement: true,
          },
          id: 1,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data.result.random.data)
        })
        .catch((error) => reject(error))
    }
  })
}

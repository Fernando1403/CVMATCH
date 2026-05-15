async function getCaktoToken() {
  const url = "https://api.cakto.com.br/public_api/token/";
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', '7u3JJvDqW3vc8LUdIQv8cBcZk5K9TNb5oZAvJI9F');
  params.append('client_secret', 'dfZ3Ei4rmUQQtXEG1vua2CZ3VKiRUEUYpwcZBPd1OuFumlBt3m3Saiv55R307NDb8s8uJhFDmrrZZGtdXzOTONiRHN4LB6GXuFPMA0yYk5M5p8buOJmTOQXDtNylpfPV');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

getCaktoToken();

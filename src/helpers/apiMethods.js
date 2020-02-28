export const BASEURL =
  "https://lasretradbackend.landlordstech.com/api/lasretrad";

// export const BASEURL = "http://192.168.10.100:80/api/lasretrad"

export const sendHttpRequestWithFormData = (method, url, data, authHeaders) => {
  //we send the fetch request and return the data
  console.log("this is the authHeaders", authHeaders);
  return fetch(url, {
    method: method,
    body: data,
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: data
      ? { Accept: "application/json", Authorization: authHeaders }
      : {}
  }).then(response => {
    if (
      response.ok === true ||
      response.status === parseInt(200) ||
      response.status === parseInt(201)
    ) {
      return response.json();
    } else {
      return response.json();
    }
  });
};

export const sendHttpRequestWithFormDataPut = (
  method,
  url,
  data,
  authHeaders
) => {
  //we send the fetch request and return the data
  console.log("this is the datassss coming to the fetch", data);
  for (var pair of data.entries()) {
    console.log("from put method", pair[0] + ", " + pair[1]);
  }
  return fetch(url, {
    method: "PUT",
    body: data,
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: data
      ? { Accept: "application/json", Authorization: authHeaders }
      : {}
  }).then(response => {
    if (
      response.ok === true ||
      response.status === parseInt(200) ||
      response.status === parseInt(201)
    ) {
      return response.json();
    } else {
      return response.json();
    }
  });
};

export const sendHttpRequestWithFormDataWithObject = (
  method,
  url,
  data,
  authHeaders
) => {
  //we send the fetch request and return the data
  console.log("this is the authHeaders", authHeaders);
  return fetch(url, {
    method: method,
    body: data,
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: data
      ? { Accept: "application/json", Authorization: authHeaders }
      : {}
  }).then(response => {
    console.log("this is the responsessss", response);
    if (
      response.ok === true ||
      response.status === parseInt(200) ||
      response.status === parseInt(201)
    ) {
      let obj1 = {
        response: response.json(),
        error: false
      };
      return obj1;
    } else {
      return response.json();
    }
  });
};
//then(response=> response.json().then(jsonified=>{console.log(jsonified)})

export const sendHttpRequestWithFormDataWithObjectGet = (
  method,
  url,
  authHeaders
) => {
  //we send the fetch request and return the data
  console.log("this is the authHeaders", authHeaders);
  return fetch(url, {
    method: method,
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: { Accept: "application/json", Authorization: authHeaders }
  }).then(
    response =>
      response.json().then(jsonsified => {
        return jsonsified;
      })
    //     console.log("this isthe response", response.status)
  );
};

export const sendHttpRequestWithFormDataWithObjectGetSingle = (
  method,
  url,
  authHeaders
) => {
  //we send the fetch request and return the data
  console.log("this is the authHeaders", authHeaders);
  return fetch(url, {
    method: method,
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: { Accept: "application/json", Authorization: authHeaders }
  }).then(
    response => response.json().then(jsonsified => jsonsified)
    //     console.log("this isthe response", response.status)
  );
};
export const sendHttpRequestWithFormDataWithoutHeaders = (
  method,
  url,
  data
) => {
  //we send the fetch request and return the data
  return fetch(url, {
    method: method,
    body: data,
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: data ? { Accept: "application/json" } : {}
  }).then(response => {
    console.log("ressponse", response);
    if (
      response.ok === true ||
      response.statusText !== "No Content" ||
      response.status === parseInt(200) ||
      response.status === parseInt(201)
    ) {
      return response.json();
    } else {
      return response.json();
    }
  });
};

export const sendHttpRequestWithFormDataWithoutHeadersLogin = (
  method,
  url,
  data
) => {
  //we send the fetch request and return the data
  return fetch(url, {
    method: method,
    body: data,
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: data ? { Accept: "application/json" } : {}
  }).then(response => {
    console.log("ressponse", response);
    if (
      response.ok === true ||
      response.statusText !== "No Content" ||
      response.status === parseInt(200) ||
      response.status === parseInt(201)
    ) {
      return response.json();
    } else {
      return "error";
    }
  });
};

export const sendHttpRequestGetSingle = (method, url) => {
  //we send the fetch request and return the data
  console.log("this is the authHeaders");
  return fetch(url, {
    method: method,
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: { Accept: "application/json" }
  }).then(response => {
    console.log("response", response);
    if (response.ok === true) {
      return response.json();
    } else return response.statusText;
  });
};

export const sendHttpRequestWithFormDataWithoutHeadersSearch = (
  method,
  url,
  data
) => {
  //we send the fetch request and return the data
  return fetch(url, {
    method: method,
    body: data,
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: data ? { Accept: "application/json" } : {}
  }).then(response => {
    console.log("ressponse", response);
    if (response.ok === true && response.statusText !== "No Content") {
      return response.json();
    } else {
      return "error";
    }
  });
};
// if(response.ok===true && response.statusText !== "No Content")

export const sendHttpRequestWithError = (method, url, data) => {
  //we send the fetch request and return the data
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: data
      ? { "Content-Type": "application/json", Accept: "application/json" }
      : {}
  }).then(response => {
    if (
      response.ok === true ||
      response.status === parseInt(200) ||
      response.status === parseInt(201)
    ) {
      return response.json();
    } else {
      return response.json();
    }
  });
};

export const sendHttpRequestWithErrorGet = (method, url) => {
  //we send the fetch request and return the data
  return fetch(url, {
    method: method
  }).then(response => {
    if (
      response.ok === true ||
      response.status === parseInt(200) ||
      response.status === parseInt(201)
    ) {
      return response.json();
    } else {
      return response.json();
    }
  });
};

export const s = (method, url, data, authHeaders) => {
  //we send the fetch request and return the data
  console.log("this is the authHeaders", authHeaders);
  return fetch(url, {
    method: method,
    body: data,
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: data
      ? { Accept: "application/json", Authorization: authHeaders }
      : {}
  }).then(response => {
    if (
      response.ok === true ||
      response.status === parseInt(200) ||
      response.status === parseInt(201)
    ) {
      let obj1 = {
        response: response.json(),
        error: false
      };
      return obj1;
    } else {
      let obj = {
        response: response.json(),
        error: true
      };
      return obj;
    }
  });
};

export const sendHttpRequest = (method, url, data) => {
  //we send the fetch request and return the data
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: data
      ? { "Content-Type": "application/json", Accept: "application/json" }
      : {}
  }).then(response => {
    if (
      response.ok === true ||
      response.status === parseInt(200) ||
      response.status === parseInt(201)
    ) {
      return response.json();
    } else {
      return response;
    }
  });
};

export const sendHttpRequestNoJSON = (method, url, data) => {
  //we send the fetch request and return the data
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    //we wanna check if data is set, if its set we use a tenary operator to get the datas
    headers: data
      ? { "Content-Type": "application/json", Accept: "application/json" }
      : {}
  }).then(response => {
    console.log(response);
    if (
      response.ok === true ||
      response.status === parseInt(200) ||
      response.status === parseInt(201)
    ) {
      return response;
    } else {
      return "error";
    }
  });
};

export const sendHttpRequestWithAuthHeaders = (method, url, data, token) => {
  //we send the fetch request and return the data
  console.log("from d fetch", method, data, token);
  return fetch(url, {
    method: method,

    body: JSON.stringify(data),
    headers: data
      ? { Accept: "application/json", Authorization: "Bearer " + token }
      : {}
  }).then(response => {
    console.log("this is the response from Fetch", response);
  });
};

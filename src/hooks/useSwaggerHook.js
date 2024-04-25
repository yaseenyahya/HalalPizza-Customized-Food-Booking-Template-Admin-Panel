import { useState } from 'react';
import { useSelector } from 'react-redux';

const useSwaggerRequest = (controller,stringfy  = true,headers = 'application/json') => {
  const config = useSelector((state) => state.OtherReducer.configData);
  const url = `${config.backend_domain}${config.backend_port !== '' ? ':' + config.backend_port : ''}`;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const makeRequest = async ({ method, requestData, parameters,additionalUrl }) => {
    setLoading(true);
const headerVar =  {
  

}
if (headers != 'multipart/form-data') {
  headerVar['Content-Type'] = headers;
}
    try {
      const requestUrl = `${url}${controller}${additionalUrl ? additionalUrl : ""}`;
      const requestOptions = {
        method,
        headers: headerVar,
        body: requestData ? (stringfy ?  JSON.stringify(requestData) :requestData )  : undefined,
      };

      // Append parameters to the URL for GET requests
      const finalUrl =
        method === 'GET' && parameters
          ? `${requestUrl}?${new URLSearchParams(parameters).toString()}`
          : requestUrl;

      const response = await fetch(finalUrl, requestOptions);

     

      const responseData = await response.json();
      if (!response.ok) {

        throw new Error(responseData.message);
      }
      setData(responseData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, makeRequest };
};

export default useSwaggerRequest;

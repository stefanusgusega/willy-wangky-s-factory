export const soapMessage = (func, params) => {
    var param = "";
    var i;
    for (i=0; i<params.length; i++){
	param+="<arg" + i + ">" + params[i] + "</arg"+i+">";
    }
    var message = `<?xml version='1.0' encoding='UTF-8'?>
		  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
			  <soap:Body>
				  
				  <ns2:`+func+` xmlns:ns2="http://factory/">`
					+ param +			
				  `</ns2:`+func+`>
				  
			  </soap:Body>
		  </soap:Envelope>`;
    return message;
}
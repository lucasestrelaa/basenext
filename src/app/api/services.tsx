import axios from "axios";

export const getConfigWhitelabel = async () => {
  try {
    let href = window.location.href.replace(/(\/+|\/*\#.*)$/, "");
    const response = await axios
      .get(`${href}/config-whitelabel.json`, {})
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    return response?.data;
  } catch (err) {
    console.log("error: ", err);
  }
};

export default interface interfacePayment {
  concl_inid_contratocliente: number;
  detalhePedidoVenda: [
    {
      rubri_inid_rubricaproduto: number;
      detpv_inqt_produto: number;
      detpv_dmtp_documentobeneficiario: string;
      detpv_binu_documentobeneficiario: string;
    }
  ];
}

const cepClient = axios.create({
  headers: {
    "content-type": "application/json",
  },
  baseURL: "https://viacep.com.br/ws/",
});

const federativeUnit = axios.create({
  headers: {
    "content-type": "application/json",
  },
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});

export const cepfunction = async (url: any, accessToken: any, cep: any) => {
  try {
    // const response = await cepClient.get(`${cep}/json`, {
    //console.log(`URL: ${url}ws_certificadodigital/`); //?servico=consultarEnderecoCEP&ambiente=H&cep=${cep}
    const response = await axios
      .get(`${url}ws_certificadodigital/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          servico: "consultarEnderecoCEP",
          ambiente: "H",
          cep: cep,
        },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    //console.log(response);
    return response?.data;
  } catch (err) {
    console.log("error: ", err);
  }
};

export const getFederativeUnit = async (url: any, accessToken: any) => {
  try {
    const response = await federativeUnit
      .get("/estados", {
        //axios.get(`${url}ws_certificadodigital/`, { //federativeUnit.get('/estados'
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          servico: "listarCidadesPorUF",
          ambiente: "H",
          uf: "DF",
        },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    return response?.data;
  } catch (err) {
    console.log("error: ", err);
  }
};

export const getPlaceType = async (url: any, accessToken: any) => {
  try {
    const response = await axios
      .get(`${url}ws_certificadodigital/`, {
        //federativeUnit.get('/estados'
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          servico: "listarTiposLogradouros",
          ambiente: "H",
        },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    return response?.data;
  } catch (err) {
    console.log("error: ", err);
  }
};

// export const getFederativeUnit = async (url: any, accessToken: any) => {
//   try {
//     const response = await federativeUnit.get('/estados', {
//     }).catch(
//       (error: any) => {
//         return { data: error?.response?.data };
//       }
//     );
//     return response?.data;
//   } catch (err) {
//     console.log("error: ", err);
//   }
// }

export const getPlanPayment = async (url: any, accessToken: any) => {
  try {
    const response = await axios
      .get(`${url}ws_planopagamento/`, {
        //?rubri_inid_rubricamodulo=385
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    return response?.data;
  } catch (err) {
    console.log("getPlanPayment", err);
  }
};

export const getProducts = async (
  url: any,
  accessToken: any,
  product: string
) => {
  try {
    const response = await axios
      .get(`${url}ws_produto/`, {
        //?rubri_inid_rubricamodulo=385
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    //console.log(response.data);
    return response?.data;
  } catch (err) {
    console.log("getProducts", err);
  }
};

export const getClient = async (url: any, accessToken: any, cliente: any) => {
  try {
    const response = await axios
      .get(`${url}ws_cliente/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: cliente,
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    return response?.data;
  } catch (err) {
    console.log("getClient", err);
  }
};

export const postClient = async (url: any, accessToken: any, cliente: any) => {
  try {
    const response = await axios
      .post(`${url}ws_contratocliente/`, cliente, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    return response?.data;
  } catch (err) {
    console.log("postClient", err);
  }
};

export const getContractClient = async (
  url: any,
  accessToken: any,
  cliente: any,
  idCliente?: any
) => {
  try {
    const response = await axios
      .get(`${url}ws_contratocliente/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          clien_inid_cliente:
            cliente?.clien_inid_cliente !== ""
              ? cliente?.clien_inid_cliente
              : idCliente,
          clien_dmtp_documento: cliente?.clien_dmtp_documento,
        },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    return response?.data;
  } catch (err) {
    console.log("getContractClient", err);
  }
};

export const postContractClient = async (
  url: any,
  accessToken: any,
  cliente: any
) => {
  try {
    const response = await axios
      .post(`${url}ws_contratocliente/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        body: cliente,
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    return response?.data;
  } catch (err) {
    console.log("postContractClient", err);
  }
};

export const postPaymentSlip = async (
  url: any,
  accessToken: any,
  data: any
) => {
  try {
    const response = await axios
      .post(`${url}ws_pedidovenda/`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    return response?.data;
  } catch (err) {
    console.log("postPaymentSlip", err);
  }
};

export const postSalesOrder = async (
  url: any,
  accessToken: any,
  ambient: string,
  salesOrder: any
) => {
  let dataSalesOrder = {
    pdven_inid_pedidovenda: salesOrder,
    ambient: ambient,
  };
  try {
    const response = await axios
      .post(`${url}ws_pagamentopedidovenda/`, dataSalesOrder, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    return response?.data;
  } catch (err) {
    console.log("postSalesOrder", err);
  }
};

//Shedule
export const getCheckPayment = async (
  url: any,
  accessToken: any,
  idPurchase?: any
) => {
  try {
    const response = await axios
      .get(`${url}ws_pedidovenda/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          pdven_inid_pedidovenda: idPurchase,
        },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    // console.log(response)
    return response?.data;
  } catch (err) {
    console.log("getCheckPayment", err);
  }
};

export const getCustomerContract = async (
  url: any,
  accessToken: any,
  idCostumer?: any
) => {
  try {
    const response = await axios
      .get(`${url}ws_contratocliente/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          concl_inid_contratocliente: idCostumer,
        },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    //console.log(response);
    return response?.data;
  } catch (err) {
    console.log("getCostumerContract", err);
  }
};

export const getCustomer = async (
  url: any,
  accessToken: any,
  idCostumer?: any
) => {
  try {
    const response = await axios
      .get(`${url}ws_cliente/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          clien_inid_cliente: 164,
        },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    //console.log(response);
    return response?.data;
  } catch (err) {
    console.log("getCostumer", err);
  }
};

export const getAvailableTimes = async (
  url: any,
  accessToken: any,
  dateSelected: any
) => {
  try {
    const response = await axios
      .get(`${url}ws_certificadodigital/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          servico: "consultarHorariosDia",
          dataAgenda: dateSelected,
        },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
    return response?.data;
  } catch (err) {
    console.log("getAvailableTimes", err);
  }
};

export const postScheduleAnIndividual = async (
  url: any,
  accessToken: any,
  data: any
) => {
  try {
    const response = await axios
      .post(`${url}ws_certificadodigital/`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .catch((error: any) => {
        return { data: error?.response?.data };
      });
      //console.log(response)
    return response?.data;
  } catch (err) {
    console.log("postScheduleAnIndividual", err);
  }
};

//other api
export const getHolydays = async (year: any) => {
  try {
    const response = await fetch(
      `https://brasilapi.com.br/api/feriados/v1/${year}`
    );
    const data = await response.json();
    const holidayDates = data.map((holiday: any) => {
      const [year, month, day] = holiday.date.split("-");
      return `${parseInt(month)}/${parseInt(day)}`; // Formato "Mês/Dia"
    });
    return holidayDates;
  } catch (error) {
    console.error("Erro ao buscar feriados:", error);
  }
};

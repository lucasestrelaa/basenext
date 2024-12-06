/*Criar validações de campos
    -email
    -telefone
    -nome
    -valor
*/
export default function teste(){
    return "teste"
}
function validaEmail(email: any){
    return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
}

const MONTHS = [
    '',
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ]
  
  const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  
  function getPercent(current: any, previous: any) {
    return (current / previous - 1) * 100
  }
  
  function formatMoney(value: any) {
    return moneyFormatter.format(value)
  }
  
  function formatPercent(value: any) {
    const symbol = value > 0 ? '+' : ''
    return symbol + value.toFixed(2).replace('.', ',') + '%'
  }
  
  function getMonth(monthNumber: any) {
    return MONTHS[monthNumber]
  }
  //documento beneficiário masca
  const formatDocument = (value: string): string => {
    value = value.replace(/\D/g, '');
    if (value.length <= 11) {
      // Formata CPF
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      // Formata CNPJ
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return value;
  };

  function formatData(dataNumber: any){
    var d = new Date(dataNumber),
    
    month = '' + (d.getMonth() + 1),
    day = '' + (d.getDate() + 1),
    year = d.getFullYear();

    console.log(d)

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return `${day}/${month}/${year}`;
  }

  function formatCEP(CEPNumber: any){
    return CEPNumber.replace(/(\d{5})(\d{3})/g, "$1-$2")
  }
  function formatPhone(phoneNumber: any){
    if(phoneNumber.length === 11){
      return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/g, "($1) $2-$3")
    }else{
      return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/g, "($1) $2-$3")
    }
  }
  function formatTrim(trimString: any){
    return trimString.trim()
  }
  function formatUpper(upperString: any){
    return upperString.toUpperCase()
  }
  function formatLower(lowerString: any){
    return lowerString.toLowerCase()
  }

  function formatNumber(numberToFormat: string){
    if(!numberToFormat){
      return ""
    }
    return numberToFormat.replace(/[^0-9,]*/g, '');
    
  }


export {validaEmail, formatMoney, formatPercent, getMonth, getPercent, formatDocument, formatData, formatCEP, formatPhone, formatTrim, formatUpper,formatLower, formatNumber}
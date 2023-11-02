export interface Transactions {
  data: [
    {
      "block": number,
      "hash": string,
      "timestamp": number,
      "ownerAddress": string,
      "toAddressList": [string],
      "toAddress": string,
      "contractType": number,
      "confirmed": boolean,
      "revert": boolean,
      "contractData": {
        "amount": number,
        "owner_address": string,
        "to_address": string
      },
      "SmartCalls": string,
      "Events": string,
      "id": string,
      "data": string,
      "fee": string,
      "contractRet": string,
      "result": string,
      "amount": string,
      "cheatStatus": boolean,
      "cost": {
        "net_fee": number,
        "energy_penalty_total": number,
        "energy_usage": number,
        "fee": number,
        "energy_fee": number,
        "energy_usage_total": number,
        "origin_energy_usage": number,
        "net_usage": number
      },
      "tokenInfo": {
        "tokenId": string,
        "tokenAbbr": string,
        "tokenName": string,
        "tokenDecimal": number,
        "tokenCanShow": number,
        "tokenType": string,
        "tokenLogo": string,
        "tokenLevel": string,
        "vip": boolean
      },
      "tokenType": string,
      "riskTransaction": boolean
    }
  ];
}

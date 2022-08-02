export const getMaterialMarket =`
  id
  seller {
  id
  }
  buyer {
  id
  }
  token {
  identifier
  }
  price
  addTimestamp
  soldTimestamp
  status
  orderId
  contract {
    sellingTotal
    soldTotal
  }
  amount

`
export const getMyMaterial =`
token {
  identifier
}
account {
  id
}
valueExact
`
export const getMySell =`
    seller {
        id
    }
    token {
        id
    }
    price
    priceExact
    buyer {
        id
    }
    addTimestamp
    soldTimestamp
    status
    contract {
        id
    }

    Name
    ModelId
    Attr
    SuitModelId
    Star
    Slot
    }
`
export const getEquipMarket =`
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
  contract {
      sellingTotal
      soldTotal
    }

  Name
  ModelId
  Attr
  Slot
  SuitModelId
  Star

`
export const getMyEquip =`
identifier
owner {
  id
}
attr {
  ModelId
  Name
  Attr
  SuitModelId
  Star
  Slot
}
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
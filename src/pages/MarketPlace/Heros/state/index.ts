export const getSql ={
    Market:`
    {
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
        Qualitity
        Star
        Ap
        Def
        HpMAX
        HpCurrent
        Luck
        Exp
        Level
        HeroId
      }
    `,
    MyNft:`
    {
        owner {
          id
        }
        identifier
        attr {
          Name
          ModelId
          Star
          Qualitity
          Ap
          Def
          HpMAX
          HpCurrent
          Luck
          Exp
          Level
          HeroId
        }
      }
    `,
    MySell:`
    {
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
        Qualitity
        Star
        Ap
        Def
        HpMAX
        HpCurrent
        Luck
        Exp
        Level
        HeroId
      }
    `
  
}

import Web3 from 'web3'
import BN from 'bn.js'
import { ContractAbi, GetNetworkConfig } from './contractConfig'
import mitt from './mitt'

interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

declare const window: Window & {
  ethereum: any
  mtweb3: any
}
interface Wallet {
  address: string
  network: string
  chainId: number
  busdBanalce: number
  ksBanalce: number
  isLogin: boolean
}

let ContractConfig = GetNetworkConfig()

export class WalletManager {
  // _instance
  static _instance: WalletManager

  // Wallet
  public walletInfo: Wallet

  public eimiier: any

  static get instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new WalletManager()
    this._instance.init()
    return this._instance
  }

  constructor() {
    const data: Wallet = {
      address: '',
      network: '',
      chainId: -1,
      busdBanalce: 0,
      ksBanalce: 0,
      isLogin: false,
    }

    this.walletInfo = data
  }

  public init() {
    this.eimiier = mitt()

    if (window && window.ethereum) {
      if (window.mtweb3 == null) {
        window.mtweb3 = new Web3(window.ethereum)

        // add event
        let onAccountChange = this.onAccountChange.bind(this)
        let emit = this.eimiier.emit.bind(this)
        window.ethereum.on('accountsChanged', function (accounts: any) {
          onAccountChange(accounts)
          emit('accountsChanged', accounts)
        })

        // network changed
        let onChainChanged = this.onChainChanged.bind(this)
        window.ethereum.on('chainChanged', function (chainId: any) {
          onChainChanged(chainId)
          emit('chainChanged', chainId)
        })

        // disconnect
        window.ethereum.on('disconnect', function (error: ProviderRpcError) {
          emit('disconnect', error)
        })
      }
    }
  }

  //onAccountChange
  private onAccountChange(accounts: any) {
    //   const balance = await web3.eth.getBalance(accounts[0])
    if (accounts.length > 0) {
      this.walletInfo.address = accounts[0].toLowerCase()
      this.walletInfo.isLogin = true
    } else {
      this.walletInfo.address = ''
      this.walletInfo.isLogin = false
    }
  }

  //chainChanged
  private onChainChanged(chainId: any) {
    if (this.walletInfo) {
      this.walletInfo.chainId = chainId
    }
  }

  //
  public async trySwitchNetwork() {
    const web3 = window.ethereum

    try {
      await web3.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ContractConfig.ChainId }],
      })
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await web3.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ContractConfig.ChainId,
                chainName: ContractConfig.ChainName,
                rpcUrls: [ContractConfig.ChainRpcUrl],
              },
            ],
          })
        } catch (addError) {
          // handle "add" error
          console.log('addError', addError)
        }
      }
      // handle other "switch" errors
    }
  }

  //getWallet
  public getWallet = async (request: boolean, callback: any) => {
    let provider = window.ethereum
    if (provider) {
      if (request) {
        try {
          await provider.request({
            method: 'eth_requestAccounts',
          })
        } catch (error) {
          callback(error, null)
          return
        }
      }

      try {
        const chainId = await provider.request({ method: 'eth_chainId' })
        this.onChainChanged(chainId)
      } catch (error) {
        callback(error, null)
        return
      }

      const web3 = window.mtweb3
      const accounts = await web3.eth.getAccounts()
      if (accounts.length > 0) {
        this.onAccountChange(accounts)
        callback(null, this.walletInfo)
      } else {
        callback(null, null)
      }
    } else {
      let err = new Error('no wallet detected!')
      callback(err, null)
    }
  }

  // buyOneNft
  public mintNft(buyNum: number, callback: any) {
    const web3 = window.mtweb3

    if (this.walletInfo == null) {
      let err = new Error('not connected!')
      callback(err, null)
      return
    }

    let tx = new web3.eth.Contract(ContractAbi.ksNFT, ContractConfig.KSNFT)
    let userWalletAddresss = this.walletInfo.address

    let buyPriceWei = web3.utils.toWei('0.2', 'ether')
    tx.methods
      .mint(buyNum)
      .send({ from: userWalletAddresss, value: buyPriceWei })
      .then((result: any) => {
        callback(null, result)
      })
      .catch((error: any) => {
        callback(error, null)
      })
  }

  // approveKstoken(){}
  public approveKstoken(callback: any) {
    const web3 = window.mtweb3

    if (this.walletInfo == null) {
      let err = new Error('not connected!')
      callback(err, null)
      return
    }

    let tx = new web3.eth.Contract(ContractAbi.ksToken, ContractConfig.KSToken)
    let userWalletAddresss = this.walletInfo.address
    let approveValueWei = web3.utils.toWei('999999999', 'ether')

    tx.methods
      .approve(ContractConfig.KSMarket, approveValueWei)
      .send({ from: userWalletAddresss })
      .then((result: any) => {
        callback(null, result)
      })
      .catch((error: any) => {
        callback(error, null)
      })
  }

  //授权nft
  // public approveAllKsNft(isEquip: boolean, callback:any)

  // 上架nft
  // public addListing(isEquip: boolean, nftId:string, listPrice:number, callback:any)

  // 改变nft售价
  // public changeListing(isEquip: boolean, nftId:string, listPrice:number, callback:any)

  // 取消nft卖出
  // public cancelListing(isEquip: boolean, nftId:string, callback:any)

  // 购买指定nft
  // public purchaseListing(isEquip: boolean, nftId:string, buyPrice:number, callback:any)

  // setApprovalForAll
  public approveAllKsNft(isEquip: boolean, callback: any) {
    const web3 = window.mtweb3

    if (this.walletInfo == null) {
      let err = new Error('not connected!')
      callback(err, null)
      return
    }

    let tx = new web3.eth.Contract(ContractAbi.ksNFT, ContractConfig.KSNFT)
    if (isEquip) {
      tx = new web3.eth.Contract(ContractAbi.ksEquip, ContractConfig.KSEquip)
    }

    let userWalletAddresss = this.walletInfo.address

    tx.methods
      .setApprovalForAll(ContractConfig.KSMarket, true)
      .send({ from: userWalletAddresss })
      .then((result: any) => {
        callback(null, result)
      })
      .catch((error: any) => {
        callback(error, null)
      })
  }

  // addListing
  public addListing(isEquip: boolean, nftId: string, listPrice: number, callback: any) {
    const web3 = window.mtweb3

    if (this.walletInfo == null) {
      let err = new Error('not connected!')
      callback(err, null)
      return
    }

    let tx = new web3.eth.Contract(ContractAbi.ksMarket, ContractConfig.KSMarket)
    let userWalletAddresss = this.walletInfo.address

    let targetContractAddr = ContractConfig.KSNFT
    if (isEquip) {
      targetContractAddr = ContractConfig.KSEquip
    }

    let listPriceWei = web3.utils.toWei(listPrice.toString(), 'ether')
    let newNftId = new BN(nftId)
    tx.methods
      .addListing(targetContractAddr, newNftId, listPriceWei)
      .send({ from: userWalletAddresss, gas: 200000 })
      .then((result: any) => {
        callback(null, result)
      })
      .catch((error: any) => {
        callback(error, null)
      })
  }

  // cancelListing
  public cancelListing(isEquip: boolean, nftId: string, callback: any) {
    const web3 = window.mtweb3

    if (this.walletInfo == null) {
      let err = new Error('not connected!')
      callback(err, null)
      return
    }

    let targetContractAddr = ContractConfig.KSNFT
    if (isEquip) {
      targetContractAddr = ContractConfig.KSEquip
    }

    let tx = new web3.eth.Contract(ContractAbi.ksMarket, ContractConfig.KSMarket)
    let userWalletAddresss = this.walletInfo.address

    tx.methods
      .cancelListing(targetContractAddr, nftId)
      .send({ from: userWalletAddresss })
      .then((result: any) => {
        callback(null, result)
      })
      .catch((error: any) => {
        callback(error, null)
      })
  }

  // purchaseListing
  public purchaseListing(isEquip: boolean, nftId: string, buyPrice: string, callback: any) {
    const web3 = window.mtweb3

    if (this.walletInfo == null) {
      let err = new Error('not connected!')
      callback(err, null)
      return
    }

    let targetContractAddr = ContractConfig.KSNFT
    if (isEquip) {
      targetContractAddr = ContractConfig.KSEquip
    }

    let tx = new web3.eth.Contract(ContractAbi.ksMarket, ContractConfig.KSMarket)
    let userWalletAddresss = this.walletInfo.address
    let buyPriceWei = web3.utils.toWei(buyPrice, 'ether')
    let newNftId = new BN(nftId)
    console.log(userWalletAddresss);

    tx.methods
      .purchaseListing(targetContractAddr, newNftId)
      .send({ from: userWalletAddresss, gas: 200000, value: buyPriceWei })
      .then((result: any) => {
        callback(null, result)
      })
      .catch((error: any) => {
        callback(error, null)
      })
  }

  // addToWallet
  // public addToWallet = async (network:string) => {
  //   let provider = window.ethereum;
  //   const contracts = [NetworkConfig[network].MouseHauntToken];
  //   for (const contract of contracts) {
  //     await provider?.request({
  //       method: "wallet_watchAsset",
  //       params: {
  //         type: "ERC20",
  //         options: {
  //           address: contract.address,
  //           symbol: contract.symbol,
  //           image: contract.image,
  //           decimals: contract.decimals,
  //         },
  //       },
  //     });
  //   }
  // };

  // changeNetwork = async () => {
  //   window.ethereum?.request({
  //     method: "wallet_switchEthereumChain",
  //     params: [{ chainId: network === "bscTestnet" ? "0x61" : "0x38" }],
  //   });
  // };

  // 1155
  // setApprovalForAll
  public approveAllKsMaterial(callback: any) {
    const web3 = window.mtweb3

    if (this.walletInfo == null) {
      let err = new Error('not connected!')
      callback(err, null)
      return
    }

    let tx = new web3.eth.Contract(ContractAbi.ksMaterial, ContractConfig.KSMaterial)

    let userWalletAddresss = this.walletInfo.address

    tx.methods
      .setApprovalForAll(ContractConfig.KSMarket, true)
      .send({ from: userWalletAddresss })
      .then((result: any) => {
        callback(null, result)
      })
      .catch((error: any) => {
        callback(error, null)
      })
  }

  // addListing1155
  public addListing1155(
    nftId: string,
    listPrice: number,
    amount: number,
    callback: any
  ) {
    const web3 = window.mtweb3

    if (this.walletInfo == null) {
      let err = new Error('not connected!')
      callback(err, null)
      return
    }

    let tx = new web3.eth.Contract(
      ContractAbi.ksMarket,
      ContractConfig.KSMarket
    )
    let userWalletAddresss = this.walletInfo.address

    let listPriceWei = web3.utils.toWei(listPrice.toString(), 'ether')
    let newNftId = new BN(nftId)
    tx.methods
      .addListing1155(ContractConfig.KSMaterial, newNftId, listPriceWei, amount)
      .send({ from: userWalletAddresss })
      .then((result: any) => {
        callback(null, result)
      })
      .catch((error: any) => {
        callback(error, null)
      })
  }

  // changeListing1155
  // orderIdx: the order of your list
  public changeListing1155(
    orderIdx: number,
    listPrice: number,
    amount: number,
    callback: any
  ) {
    const web3 = window.mtweb3

    if (this.walletInfo == null) {
      let err = new Error('not connected!')
      callback(err, null)
      return
    }

    let tx = new web3.eth.Contract(
      ContractAbi.ksMarket,
      ContractConfig.KSMarket
    )
    let userWalletAddresss = this.walletInfo.address

    let listPriceWei = web3.utils.toWei(listPrice.toString(), 'ether')
    tx.methods
      .changeListing1155(
        ContractConfig.KSMaterial,
        orderIdx,
        listPriceWei,
        amount
      )
      .send({ from: userWalletAddresss })
      .then((result: any) => {
        callback(null, result)
      })
      .catch((error: any) => {
        callback(error, null)
      })
  }

  // cancelListing1155
  public cancelListing1155(orderIdx: number, callback: any) {
    const web3 = window.mtweb3

    if (this.walletInfo == null) {
      let err = new Error('not connected!')
      callback(err, null)
      return
    }

    let tx = new web3.eth.Contract(
      ContractAbi.ksMarket,
      ContractConfig.KSMarket
    )
    let userWalletAddresss = this.walletInfo.address

    tx.methods
      .cancelListing1155(ContractConfig.KSMaterial, orderIdx)
      .send({ from: userWalletAddresss })
      .then((result: any) => {
        callback(null, result)
      })
      .catch((error: any) => {
        callback(error, null)
      })
  }

  // purchaseListing1155
  public purchaseListing1155(
    orderIdx: string,
    buyAmount: number,
    totalPrice: string,
    callback: any
  ) {
    const web3 = window.mtweb3

    if (this.walletInfo == null) {
      let err = new Error('not connected!')
      callback(err, null)
      return
    }

    let tx = new web3.eth.Contract(
      ContractAbi.ksMarket,
      ContractConfig.KSMarket
    )
    let userWalletAddresss = this.walletInfo.address
    let buyPriceWei = web3.utils.toWei(totalPrice, 'ether')

    tx.methods
      .purchaseListing1155(ContractConfig.KSMaterial, orderIdx, buyAmount)
      .send({ from: userWalletAddresss, value: buyPriceWei })
      .then((result: any) => {
        callback(null, result)
      })
      .catch((error: any) => {
        callback(error, null)
      })
  }
}

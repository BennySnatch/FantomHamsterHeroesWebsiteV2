import { ethers,BigNumber, Contract } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { metadataFromId, metadataFromUri } from "./utils";

export const getSupply= async function(contract: any){
    const totalSupply = await contract.totalSupply();
    return BigNumber.from(totalSupply).toNumber()
}
export const getPrice= async function(contract: any){
    const price = await contract.price();
    return formatUnits(BigNumber.from(price),18)
}
export const saleStatus= async function(contract: any){
    const isPaused = await contract.paused();
    return isPaused
}

export const getOwnedIDs=async function(contract:any, addr:string){
    let ids = await contract.macawsOwned(addr);
    return ids
}



export const buyHams= async function(contract: any, price:any, amount:any){
const totalPrice=(price*amount).toString()
    try{
    let overrides = {
        value: ethers.utils.parseEther(totalPrice)  
    };
    let transaction = await contract.buyMacaws(amount, overrides)
    let tx = await transaction.wait()

    return tx.transactionHash

    }catch(e){
        window.alert("Something went wrong!Please try again")
        return null
    }
}


export const getUri= async function(id:any,contract:any){
    const totalSupply = await contract.totalSupply();
    if(id<=BigNumber.from(totalSupply).toNumber()){
        const res=await fetch(`/api/yo/api/${id}`)
        const uri=await res.json()
        return uri
    }
    else{
        return null
    }
}
export const getAllUris= async function(ids:any,contract:any){
    const uris=[]
    const totalSupply = await contract.totalSupply();
    for (let i = 0; i < ids.length; i++) {
        if(i<=BigNumber.from(totalSupply).toNumber()){
            const res=await fetch(`/api/yo/api/${i}`)
            const {id}=await res.json()
            uris.push(id)
        }
    }
    return uris
}


export const getOwnedMetas= async function(ids:any){
    type Meta = {
        name: string;
        description: string;
        image: string;
      };
    const uris:Meta[]=[]
    for (let i = 0; i < ids.length; i++) {
       const meta = await metadataFromId(ids[i])
       uris.push(meta)
    }
    return uris
}

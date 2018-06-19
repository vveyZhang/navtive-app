import { district } from './district'

import { city } from './city'

import { province } from './province'



let areaArray = [];
for (let proItem of province) {
    areaArray.push({
        label: proItem.name,
        value: proItem.name,
        children:findCity(proItem.id)
    })
}
function filterDistrict(array){
    const newArray=[];
    for(let item of array){
        newArray.push({
            value:item.name,
            label:item.name,
        })
    }
    return newArray
}
function findDistrict(id){
    for( let i in district ){
        if(id==i) return filterDistrict(district[i])
    }
}
function filterCit(array){
    const newArray=[];
    for(let item of array){
        newArray.push({
            value:item.name,
            label:item.name,
            children:findDistrict(item.id)
        })
    }
    return newArray
}
function findCity(id){
    for( let i in city ){
        if(id==i){
            return filterCit(city[i])
        } 
    }
}
export default areaArray
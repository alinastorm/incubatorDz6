import { Filter } from "mongodb";
import { AdapterType, IObject } from "../types/types";

// implements AdapterType
class DbInMemory {
    data: IObject = {}

    connect() { }

    readAll(collectionName: string, filter?: Filter<IObject>, sortBy?: string, sortDirection?: number) {
        const collection: IObject[] = this.data[collectionName]
        const result: IObject = []
        const filterMethods: IObject = {
            "$regex": (collection: any[]) => {

            },
            '$or': (valueFilter: IObject[]) => {//[{ blog: 'id' }, { Id: 'id' }] 
                collection.filter((elCollection) => { //{blog:'id',name:''}
                    return valueFilter.some((elFilter) => {//{ blog: 'id' }                    
                        return Object.entries(elCollection).some(([key, value]) => {//[ key:blog value: id]
                            return elFilter[key] === value
                        })
                    })
                })
            },
            '$options': () => { }
        }
        const query = {}

        if (filter) {
            Object.entries(filter).forEach(([key, value]: [key: string, value: any]) => {
                const method = filterMethods[key]
                method(value)
            })
        }

        return this.data[collectionName]
        // варианты
        // { name: { $regex: searchNameTerm, $options: 'i' } }
        // { blogId: 'id' }
        // { email: { $regex: searchEmailTerm, $options: 'i' } }
        // { $or: [{ blogId: 'id' }, { blogId: 'id' }] }

    }

    readOne(collectionName: string, id: string) {
        return this.data[collectionName].find((elem: any) => id === elem.id)
    }
    // readCount(collectionName: string, filter?: Filter<IObject>){
    //     return this.data[collectionName].length
    // }
    createOne(collectionName: string, element: IObject) {
        return this.data[collectionName].push(element)
    }

    updateOne(collectionName: string, id: string, data: IObject) {
        return this.data[collectionName].find((elem: any, index: number) => {
            if (id === elem.id) {
                this.data[collectionName][index] = { ...this.data[collectionName][index], ...data }
            }
        })
    }
    replaceOne(collectionName: string, id: string, data: IObject) {
        return this.data[collectionName].find((elem: any, index: number) => {
            if (id === elem.id) {
                this.data[collectionName][index] = data
            }
        })
    }
    deleteOne(collectionName: string, id: string) {
        return this.data[collectionName].find((elem: any, index: number) => {
            if (id === elem.id) {
                this.data[collectionName].splice(index, 1)
                return true
            }
        })
    }

    deleteAll(collectionName: string) { return this.data[collectionName] = [] }

    // readAll(collectionName: string, filter?: Filter<IObject>, sortBy?: string, sortDirection?: number): any
    // readAllOrByPropPaginationSort(collectionName: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: 1 | -1, filter?: Filter<IObject>): any
    // readCount(collectionName: string, filter?: Filter<IObject>): any

}

export default new DbInMemory()
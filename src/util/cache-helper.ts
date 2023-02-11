export const getCacheList = (key: string): any => {
    const data = localStorage.getItem(key)
    if (data) {
        const output = JSON.parse(data)
        return output
    }
    return []
}

export const setItemInCacheList = (key: string, data: any) => {
    const dataList: any = localStorage.getItem(key)
    if (dataList) {
        const output = JSON.parse(dataList)
        output.push(data)
        localStorage.setItem(key, JSON.stringify(output))
    } else {
        const newList = []
        newList.push(data)
        localStorage.setItem(key, JSON.stringify(newList))
    }
}
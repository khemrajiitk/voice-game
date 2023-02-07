export interface Grid {
    id: string
    picked: boolean
    includeObject: boolean
    position: Position
}

export interface Position {
    x: number
    y: number
}
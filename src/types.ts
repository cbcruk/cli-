import { ISize } from 'image-size/dist/types/interface'

export interface Options {
  json: boolean
  scss: boolean
  watch: boolean
  outDir: string
}

export type Images = {
  [k: string]: ISize
}

import { atom } from 'jotai'
import type { Photo } from '@prisma/client'

export const photosAtom = atom<Photo[]>([])

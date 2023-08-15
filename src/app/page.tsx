import ImagesContainer from '@/components/ImagesContainer'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'

export default async function Home() {
    const photos = await prisma.photo.findMany()
    const session = await getServerAuthSession()

    return <ImagesContainer images={photos} session={session} />
}

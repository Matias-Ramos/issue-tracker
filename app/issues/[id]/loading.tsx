import { Flex, Card } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetail = () => {
  return (
    <>
      <Skeleton width="5rem"/>
      <Flex className="space-x-3 gap-x-2" my="2">
        <Skeleton width="3rem"/>
        <Skeleton width="7rem"/>
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3}/> 
      </Card>
    </>
  )
}

export default LoadingIssueDetail
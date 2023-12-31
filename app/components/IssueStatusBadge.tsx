import { Status } from "@prisma/client"
import { Badge } from "@radix-ui/themes"

const statusMap: Record<Status, { label: string, color: 'red' | 'orange' | 'green'}> = {
    OPEN: { label: 'Open', color: 'red'},
    IN_PROGRESS: { label: 'In progress', color: 'orange'},
    CLOSED: { label: 'Closed', color: 'green'}
}

const IssueStatusBadge = ({ status }: { status: Status}) => (
    <Badge color={statusMap[status].color}>
        {statusMap[status].label}
    </Badge>
)

export default IssueStatusBadge



import {Text} from "@/components/typography/Text"
import {Button} from "@/components/ui/button"
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons"

interface PaginationProps {
    itemCount: number,
    pageSize: number,
    currentPage: number,
}
const Pagination = ({itemCount, pageSize, currentPage}: PaginationProps) => {
    //  Get the current pageCount and round the value
    const pageCount: number = Math.ceil(itemCount / pageSize)

    // If the page count is less than 1 then don't render a pagination component
    if (pageCount <= 1) return null

    return (
        <div className="flex items-center gap-2">
            <Text variant="small">Page {currentPage} of {pageCount} </Text>

            <Button variant="secondary" disabled={currentPage === 1}>
                <DoubleArrowLeftIcon />
            </Button>

            <Button variant="secondary" disabled={currentPage === 1}>
                <ChevronLeftIcon />
            </Button>

            <Button variant="secondary" disabled={currentPage === pageCount}>
                <ChevronRightIcon />
            </Button>

            <Button variant="secondary" disabled={currentPage === pageCount}>
                <DoubleArrowRightIcon />
            </Button>
        </div>
    )
}

export default Pagination
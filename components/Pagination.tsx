"use client"
import {Text} from "@/components/typography/Text"
import {Button} from "@/components/ui/button"
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons"
import {ReadonlyURLSearchParams, useRouter, useSearchParams} from "next/navigation"
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime"

interface PaginationProps {
    itemCount: number,
    pageSize: number,
    currentPage: number,
}
const Pagination = ({itemCount, pageSize, currentPage}: PaginationProps) => {
    //  init a router instance and grab the current search params below
    const router: AppRouterInstance = useRouter()
    const searchParams: ReadonlyURLSearchParams = useSearchParams()

    //  Get the current pageCount and round the value
    const pageCount: number = Math.ceil(itemCount / pageSize)

    // If the page count is less than 1 then don't render a pagination component
    if (pageCount <= 1) return null

    const changePage = (page: number) => {
        const params: URLSearchParams = new URLSearchParams
        params.set("page", page.toString())
        router.push("?" + params.toString())
    }

    return (
        <div className="flex items-center gap-2">
            <Text variant="small">Page {currentPage} of {pageCount} </Text>

            <Button variant="secondary" disabled={currentPage === 1} onClick={() => changePage(1)}>
                <DoubleArrowLeftIcon />
            </Button>

            <Button variant="secondary" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
                <ChevronLeftIcon />
            </Button>

            <Button variant="secondary" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
                <ChevronRightIcon />
            </Button>

            <Button variant="secondary" disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
                <DoubleArrowRightIcon />
            </Button>
        </div>
    )
}

export default Pagination
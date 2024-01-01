"use client"
import React, {useState} from 'react'
import {Button} from "@/components/ui/button"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useRouter} from "next/navigation"
import axios from "axios"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import {Issue} from "@prisma/client"
import Spinner from "@/components/ui/Spinner"

const DeleteIssueButton = ({issue}: {issue: Issue}) => {
    const issueId: number = issue.id
    const issueTitle: string = issue.title

    const { toast } = useToast()
    const router = useRouter()
    const [error, setError] = useState(false)
    const [isDeleting, setDeleting] = useState(false)

    const deleteIssue = async () =>  {
        try {
            setDeleting(true)
            await axios.delete('/api/issues/' + issueId)
            router.push('/issues')
            router.refresh()
            toast({
                variant: "default",
                title: `${issueTitle}`,
                description: "Has been successfully deleted.",
                action: <ToastAction altText="Okay.">Okay.</ToastAction>
            })
        } catch (e) {
            setDeleting(false)
            setError(true)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "This issue couldn't be deleted. Click cancel below and try again.",
                action: <ToastAction altText="Okay." onClick={() => {
                    setError(false)
                }}>Okay.</ToastAction>,
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting}>
                    Delete Issue
                    {isDeleting && <Spinner />}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Issue Deletion</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this issue?
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button type="submit" variant="destructive" onClick={deleteIssue}>Delete Issue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteIssueButton
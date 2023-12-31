"use client"
import React from 'react'
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
import axios from "axios";

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
    const router = useRouter()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete Issue</Button>
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

                    <Button type="submit" variant="destructive" onClick={async ()=> {
                        await axios.delete('/api/issues/' + issueId)
                        router.push('/issues')
                        router.refresh()
                    }}>Delete Issue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteIssueButton
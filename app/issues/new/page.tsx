'use client'
import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import dynamic from 'next/dynamic'
import axios from "axios"
import {useForm, Controller} from "react-hook-form"
import "easymde/dist/easymde.min.css"
import {useRouter} from "next/navigation"
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime"
import {useState} from "react"
import {toast} from "sonner";


interface IssueForm {
    title: string,
    description: string,
}
const NewIssuePage = () => {
    //  Use the router to push the new route to the issues page after submission
    const router: AppRouterInstance = useRouter()

    //  Needed to dynamically import to avoid forced server side rendering
    const SimpleMDE = dynamic(() => import('react-simplemde-editor'),
        {
            ssr: false,
            loading: () => <h3 className="text-primary text-2xl">Loading Markdown Editor...</h3>
        })

    // Destructure the register from react-hook-form
    const {register, control, handleSubmit} = useForm<IssueForm>()

    const [error, setError] = useState('')
    return (
        <div>
            <form
                className="grid max-w-xl gap-1.5 space-y-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push('/issues')
                    } catch (error) {
                        const errorText = "Unexpected error occurred"
                        setError(errorText)
                        toast.error(errorText, {
                            description: "Try submitting again or send email at: contact@jesusperez.dev",
                            action: {
                                label: "Okay",
                                onClick: () => null,
                            },
                        })
                    }
                })}
            >
                <Input placeholder="Title" {...register('title')}  />

                {/* react-hook-form controls the field on the simplemde editor, to retrieve that input*/}
                <Controller
                    name="description"
                    control={control}
                    render={ ( {field} ) => (
                        <SimpleMDE placeholder="Write Your Issue Description Here..." {...field}/>
                    )}
                />

                <Button variant="primaryBlue" className="w-1/4">Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage
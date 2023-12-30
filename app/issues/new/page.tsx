'use client'
import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import {useForm, Controller} from "react-hook-form"
import "easymde/dist/easymde.min.css"
import {useRouter} from "next/navigation"
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime"
import {useState} from "react"
import {toast} from "sonner"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {createIssueSchema} from "@/app/validationSchemas"
import SimpleMDE from "react-simplemde-editor"
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/ui/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>  // Infer type automatically from our validation schema

const NewIssuePage = () => {
    //  Use the router to push the new route to the issues page after submission
    const router: AppRouterInstance = useRouter()

    // Destructure the register from react-hook-form
    const {register,
        control,
        handleSubmit,
        formState: { errors }} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    })

    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    //  Handle form submission logic below
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
        } catch (error) {
            setSubmitting(false)
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
    })

    return (
        <div>
            <form
                className="grid max-w-xl gap-1.5 space-y-3"
                onSubmit={onSubmit}
            >
                <Input placeholder="Title" {...register('title')}  />

                {/*Throw an error message if there is no title provided*/}
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                {/* react-hook-form controls the field on the simplemde editor, to retrieve that input*/}
                <Controller
                    name="description"
                    control={control}
                    render={ ( {field} ) => (
                        <SimpleMDE placeholder="Write Your Issue Description Here..." {...field}/>
                    )}
                />
                {/*Throw an error message if there is no description provided*/}
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button
                    variant="primaryBlue" className="w-1/3" disabled={isSubmitting}
                >
                    Submit New Issue &nbsp; {isSubmitting && <Spinner/>}
                </Button>
            </form>
        </div>
    )
}

export default NewIssuePage